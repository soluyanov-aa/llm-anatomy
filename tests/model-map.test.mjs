import test from 'node:test';
import assert from 'node:assert/strict';
import {tensorsForComponent} from '../src/model-map.js';
const names=(m,n)=>tensorsForComponent(m,n).map(t=>t.name);
const tensor=name=>({name,shape:[4,4],dtype:'F16'});
test('HF and GPT layer names work without leaking other layers',()=>{
 const m={tensors:['model.embed_tokens.weight','model.norm.weight','lm_head.weight','model.layers.0.input_layernorm.weight','model.layers.0.post_attention_layernorm.weight','model.layers.0.self_attn.q_proj.weight','model.layers.1.self_attn.q_proj.weight','transformer.h.0.attn.c_attn.weight','transformer.h.0.ln_1.weight'].map(tensor)};
 assert.deepEqual(names(m,{name:'Embeddings'}),['model.embed_tokens.weight']);
 assert.deepEqual(names(m,{name:'Attention',layer:0}),['model.layers.0.self_attn.q_proj.weight','transformer.h.0.attn.c_attn.weight']);
 assert.deepEqual(names(m,{name:'Attention Norm',layer:0}),['model.layers.0.input_layernorm.weight','transformer.h.0.ln_1.weight']);
});
