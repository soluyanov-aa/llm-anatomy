import test from 'node:test';
import assert from 'node:assert/strict';
import {demoMoe,demoDense} from '../src/demo.js';
import {tensorsForComponent,mapChildren,buildMapScene,MAX_SCENE_NODES} from '../src/model-map.js';
const names=(m,n)=>tensorsForComponent(m,n).map(t=>t.name);
const tensor=name=>({name,shape:[4,4],dtype:'F16'});

test('GGUF embeddings, norms and output have distinct tensor ownership',()=>{
 assert.deepEqual(names(demoMoe,{name:'Embeddings'}),['token_embd.weight']);
 assert.deepEqual(names(demoMoe,{name:'LM Head'}),['output.weight']);
 assert.deepEqual(names(demoMoe,{name:'Final Norm'}),['output_norm.weight']);
 assert.deepEqual(names(demoMoe,{name:'Attention Norm',layer:0}),['blk.0.attn_norm.weight']);
 assert.deepEqual(names(demoMoe,{name:'FFN Norm',layer:0}),['blk.0.ffn_norm.weight']);
 assert.equal(names(demoMoe,{name:'Attention',layer:0}).length,4);
 assert.equal(names(demoDense,{name:'FFN',layer:0}).length,3);
});
test('HF and GPT layer names work without leaking other layers',()=>{
 const m={tensors:['model.embed_tokens.weight','model.norm.weight','lm_head.weight','model.layers.0.input_layernorm.weight','model.layers.0.post_attention_layernorm.weight','model.layers.0.self_attn.q_proj.weight','model.layers.1.self_attn.q_proj.weight','transformer.h.0.attn.c_attn.weight','transformer.h.0.ln_1.weight'].map(tensor)};
 assert.deepEqual(names(m,{name:'Embeddings'}),['model.embed_tokens.weight']);
 assert.deepEqual(names(m,{name:'Attention',layer:0}),['model.layers.0.self_attn.q_proj.weight','transformer.h.0.attn.c_attn.weight']);
 assert.deepEqual(names(m,{name:'Attention Norm',layer:0}),['model.layers.0.input_layernorm.weight','transformer.h.0.ln_1.weight']);
});
test('separate experts only own their weights; packed weights are explicitly shared',()=>{
 const m={tensors:[0,1].flatMap(i=>['up_proj','down_proj','gate_proj'].map(p=>tensor(`model.layers.0.mlp.experts.${i}.${p}.weight`)))};
 for(const i of [0,1]) {
  const found=names(m,{name:`Expert ${i}`,layer:0,expert:i});
  assert.equal(found.length,3);assert.ok(found.every(n=>n.includes(`experts.${i}.`)));
 }
 const shared=mapChildren(demoMoe,[{name:'Expert 3',layer:0,expert:3}]);
 assert.equal(shared.length,3);assert.ok(shared.every(n=>n.info.includes('Общий тензор экспертов')));
 assert.ok(shared.every(n=>!n.name.includes('gate_inp')));
});
test('heads disclose that projection tensors are shared',()=>{
 const items=mapChildren(demoMoe,[{name:'Q Head 0',kind:'head',layer:0}]);
 assert.equal(items.length,4);assert.ok(items.every(n=>n.info.includes('срез головы не определён')));
});
test('scene stays bounded while preserving all root layers and allowing drill-down',()=>{
 const m={...demoMoe,layers:500,heads:64,kvHeads:8,experts:256};
 const scene=buildMapScene(m,[]);
 assert.ok(scene.nodes.length<=MAX_SCENE_NODES);assert.equal(scene.truncated,true);
 assert.equal(scene.nodes.filter(n=>n.kind==='blocks'&&n.parent===null).length,500);
 const nested=buildMapScene(m,[{name:'Layer 499',kind:'blocks',layer:499}]);
 assert.ok(nested.nodes.some(n=>n.name==='Expert 255'));
 assert.ok(nested.nodes.some(n=>n.name==='Q Head 63'));
 assert.equal(nested.truncated,false);
});
