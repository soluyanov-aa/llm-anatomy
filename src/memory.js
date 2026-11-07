export function estimateMemory(m, requested, batch=1) {
 const context=Math.min(requested,m.context||requested);
 const layers=m.layers||32, heads=m.heads||32, kvHeads=m.kvHeads||heads, d=m.hidden/heads||128;
 const kv=2*layers*kvHeads*d*context*batch*2/1024**3;
 const bytes=m.weightsSize !== undefined ? m.weightsSize : m.format==='Config JSON' ? null : m.fileSize;
 const weightsKnown=Number.isFinite(bytes)&&bytes>=0&&!m.partial;
 const weights=weightsKnown?bytes/1024**3:null;
 const buffer=weightsKnown?Math.max(1,weights*.08):null;
 return {context,kv,weights,buffer,total:weightsKnown?weights+kv+buffer:null,weightsKnown};
}
