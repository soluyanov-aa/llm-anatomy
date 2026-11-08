import test from 'node:test';
import assert from 'node:assert/strict';
import {createMapFocus,entityType} from '../src/map-focus.js';
import {buildMapScene} from '../src/model-map.js';

const nodes=[{kind:'blocks',name:'Layer 0'},{kind:'heads',name:'Attention'},{kind:'blocks',name:'Layer 1'},{kind:'tensors',name:'Final Norm'}];
const edges=[{source:0,target:1},{source:0,target:2},{source:2,target:3}];
test('type focus selects every match, dims others even during playback, and dims mixed edges',()=>{
 const focus=createMapFocus(nodes,edges,null,'layer');
 assert.deepEqual([...focus.matches],[0,2]);
 assert.deepEqual(nodes.map((_,i)=>focus.nodeAlpha(i,true)),[1,.15,1,.15]);
 assert.deepEqual(edges.map(e=>focus.edgeAlpha(e.source,e.target)),[.12,1,.12]);
 assert.deepEqual([...focus.availableTypes],['layer','attention','norm']);
 assert.equal(focus.availableTypes.has('expert'),false);
});
test('switching types and clearing focus restore the expected node and edge brightness',()=>{
 const attention=createMapFocus(nodes,edges,null,'attention');
 assert.deepEqual(nodes.map((_,i)=>attention.nodeAlpha(i)),[.15,1,.15,.15]);
 const cleared=createMapFocus(nodes,edges,null);
 assert.deepEqual(nodes.map((_,i)=>cleared.nodeAlpha(i)),[1,1,1,1]);
 assert.equal(cleared.nodeAlpha(0,true),.3);
 assert.equal(cleared.edgeAlpha(0,1,.25),.25);
});
test('individual selection preserves neighbor focus and only incident edges',()=>{
 const focus=createMapFocus(nodes,edges,nodes[0]);
 assert.deepEqual([...focus.matches],[0,1,2]);
 assert.deepEqual(nodes.map((_,i)=>focus.nodeAlpha(i)),[1,1,1,.15]);
 assert.equal(focus.edgeAlpha(2,3),.12);
 assert.equal(focus.edgeAlpha(0,1),1);
});
test('empty scenes and selections from previous scenes are safe',()=>{
 assert.equal(createMapFocus([],[],null,'tensor').matches.size,0);
 assert.equal(createMapFocus(nodes,edges,{...nodes[0]}).nodeAlpha(3),1);
});
test('real scene classifies components independently from translated labels',()=>{
 const model={layers:2,hidden:16,ffn:32,context:128,vocab:64,heads:2,kvHeads:1,experts:0,activeExperts:0,isMoe:false,tensors:[]};
 const {nodes,edges=[]}=buildMapScene(model,[]);
 const focus=createMapFocus(nodes,edges,null,'norm');
 assert.equal(focus.matches.size,5);
 assert.equal(nodes.filter(n=>entityType(n)==='layer').length,2);
 assert.ok(focus.availableTypes.has('q'));
 assert.ok(focus.availableTypes.has('kv'));
});
