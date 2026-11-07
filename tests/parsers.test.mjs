import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {openModelFiles,parseGGUF} from '../src/parsers.js';
const config=value=>new File([JSON.stringify(value)],'config.json');
const u32=n=>{const b=Buffer.alloc(4);b.writeUInt32LE(n);return b};
const u64=n=>{const b=Buffer.alloc(8);b.writeBigUInt64LE(BigInt(n));return b};
const str=s=>Buffer.concat([u64(Buffer.byteLength(s)),Buffer.from(s)]);
function safeFile(tensors){const h=Buffer.from(JSON.stringify(tensors));return new File([u64(h.length),h,Buffer.alloc(Object.keys(tensors).length*2)],'model.safetensors')}
const legacy={TextDecoder,TextEncoder,File};vm.createContext(legacy);vm.runInContext(await readFile(new URL('../standalone/parser.js',import.meta.url),'utf8'),legacy);
for(const [label,open] of [['React',openModelFiles],['standalone',legacy.openModelFiles]]) {
 test(`${label}: invalid counts fail during import, before rendering`,async()=>{
  for(const value of [-1,1.5,100000,'not a number']) await assert.rejects(open([config({num_hidden_layers:value})]),/layers/);
  await assert.rejects(open([new File(['{"num_hidden_layers":1e309}'],'config.json')]),/layers/);
  for(const field of ['num_attention_heads','num_key_value_heads','num_experts','num_experts_per_tok']) await assert.rejects(open([config({[field]:100000})]),/Некорректный параметр/);
  await assert.rejects(open([config({num_attention_heads:4,num_key_value_heads:8})]),/KV/);
 });
 test(`${label}: 150000 tensors infer layers without exceeding argument limits`,async()=>{
  const entries=Object.fromEntries(Array.from({length:150000},(_,i)=>[`model.layers.${i%48}.w${i}.weight`,{dtype:'F16',shape:[1],data_offsets:[i*2,i*2+2]}]));
  const model=await open([safeFile(entries)]);
  assert.equal(model.layers,48);assert.equal(model.tensors.length,150000);assert.equal(model.params,150000);
 });
 test(`${label}: config-only size is distinct from known weight bytes`,async()=>{
  const cfg=config({model_type:'llama',num_hidden_layers:1,hidden_size:4,num_attention_heads:2});
  const alone=await open([cfg]);assert.equal(alone.weightsSize,null);assert.equal(alone.fileSize,cfg.size);
  const sf=safeFile({'model.layers.0.self_attn.q_proj.weight':{dtype:'F16',shape:[1],data_offsets:[0,2]}});
  const complete=await open([sf,cfg]);assert.equal(complete.weightsSize,sf.size);assert.equal(complete.heads,2);
 });
}
test('valid GGUF v3 still reads tensor shapes and metadata',async()=>{
 const file=new File([Buffer.from('GGUF'),u32(3),u64(1),u64(2),str('general.architecture'),u32(8),str('llama'),str('llama.block_count'),u32(4),u32(1),str('blk.0.attn_q.weight'),u32(2),u64(4),u64(4),u32(1),u64(0)],'model.gguf');
 const model=await parseGGUF(file);assert.equal(model.layers,1);assert.equal(model.params,16);assert.equal(model.weightsSize,file.size);
});
