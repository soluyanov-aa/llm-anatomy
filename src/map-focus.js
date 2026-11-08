export function entityType(n){if(n.kind==='particle')return 'particle';if(n.kind==='tensor')return 'tensor';if(n.kind==='blocks')return 'layer';if(n.name.startsWith('KV Head'))return 'kv';if(n.name.startsWith('Q Head'))return 'q';if(n.name.startsWith('Expert'))return 'expert';if(/Norm/.test(n.name))return 'norm';if(n.name==='Attention')return 'attention';if(/FFN|MoE/.test(n.name))return 'ffn';if(n.name==='Embeddings')return 'embedding';if(n.name==='LM Head')return 'output';return 'tensor'}
export function createMapFocus(nodes,edges,selected,activeType=null){
 const types=nodes.map(entityType),availableTypes=new Set(types);
 const selectedIndex=nodes.indexOf(selected),hasSelection=selectedIndex>=0;
 const matches=new Set();
 if(activeType)types.forEach((type,i)=>{if(type===activeType)matches.add(i)});
 else if(hasSelection){
  matches.add(selectedIndex);
  edges.forEach(({source,target})=>{if(source===selectedIndex)matches.add(target);if(target===selectedIndex)matches.add(source)});
 }
 const edgeMatches=(source,target)=>activeType?matches.has(source)&&matches.has(target):hasSelection&&(source===selectedIndex||target===selectedIndex);
 return {types,availableTypes,matches,
  nodeAlpha:(index,playbackDim=false)=>activeType||hasSelection?(matches.has(index)?1:.15):playbackDim?.3:1,
  edgeAlpha:(source,target,idleAlpha=1)=>activeType||hasSelection?(edgeMatches(source,target)?1:.12):idleAlpha,
  edgeMatches,
 };
}
