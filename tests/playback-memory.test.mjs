import test from 'node:test';
import assert from 'node:assert/strict';
import {createPlaybackClock} from '../src/playback.js';
import {estimateMemory} from '../src/memory.js';
import {demoDense} from '../src/demo.js';
test('animation uses frame deltas, never document uptime, on start and effect restart',()=>{
 let tick=createPlaybackClock();let progress=0;
 progress+=tick(100000,true);assert.equal(progress,0);
 progress+=tick(100016,true);assert.equal(progress,16);
 tick=createPlaybackClock();progress+=tick(200000,true);assert.equal(progress,16);
 progress+=tick(200016,true);assert.equal(progress,32);
});
test('paused and hidden time is excluded and long stalls are bounded',()=>{
 const tick=createPlaybackClock();assert.equal(tick(0,true),0);assert.equal(tick(16,true),16);
 assert.equal(tick(5000,false),0);assert.equal(tick(5016,true),16);
 assert.equal(tick(6000,true,false),0);assert.equal(tick(100000,true),0);assert.equal(tick(100016,true),16);
 assert.equal(tick(200000,true),100);
});
test('unknown or partial weights never produce placement totals',()=>{
 for(const m of [{...demoDense,format:'Config JSON',fileSize:89},{...demoDense,weightsSize:null},{...demoDense,partial:true}]){
  const r=estimateMemory(m,32768);assert.equal(r.weightsKnown,false);assert.equal(r.weights,null);assert.equal(r.buffer,null);assert.equal(r.total,null);assert.ok(r.kv>0);
 }
});
test('known weights preserve VRAM estimate and batch scaling',()=>{
 const a=estimateMemory(demoDense,32768,1),b=estimateMemory(demoDense,32768,2);
 assert.equal(a.weightsKnown,true);assert.equal(a.weights,5.1);assert.equal(b.kv,2*a.kv);assert.equal(a.total,a.weights+a.kv+a.buffer);
});
