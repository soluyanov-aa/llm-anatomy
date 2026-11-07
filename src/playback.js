// Each animation effect starts a fresh clock while the caller retains route progress.
export function createPlaybackClock() {
 let previous=null;
 return (now,running,visible=true)=>{
  if (!visible) {previous=null;return 0;}
  const elapsed=previous===null?0:Math.max(0,Math.min(100,now-previous));
  previous=now;
  return running?elapsed:0;
 };
}
