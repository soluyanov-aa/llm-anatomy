import {getLayerIndex, validateModelStructure} from './model-schema.js';

function tensorRole(name) {
 const leaf=name.replace(/\.(weight|bias)$/,'');
 if (/(?:^|\.)(token_embd|embed_tokens|word_embeddings|wte)$/.test(leaf)) return 'embedding';
 if (/(?:^|\.)(output|lm_head)$/.test(leaf)) return 'output';
 if (getLayerIndex(name)===null && /(?:^|\.)(output_norm|norm|ln_f|final_layernorm)$/.test(leaf)) return 'finalNorm';
 if (/(?:^|\.)(attn_norm|input_layernorm|ln_1|attention_norm)$/.test(leaf)) return 'attentionNorm';
 if (/(?:^|\.)(ffn_norm|post_attention_layernorm|ln_2)$/.test(leaf)) return 'ffnNorm';
 if (/(?:self_attn|attention|attn)(?:\.|_)/.test(leaf)) return 'attention';
 if (/(?:^|\.)(?:ffn_|mlp\.|feed_forward\.|block_sparse_moe\.|experts\.)/.test(leaf)) return 'ffn';
 return 'unknown';
}

export function tensorsForComponent(m, component) {
 return m.tensors.filter(t=>{
  if (getLayerIndex(t.name)!==(component.layer??null)) return false;
  const role=tensorRole(t.name);
  if (component.expert!=null) {
   const expert=t.name.match(/(?:^|\.)experts\.(\d+)\./);
   return role==='ffn' && (expert ? Number(expert[1])===component.expert : /ffn_(up|down|gate)_exps\./.test(t.name));
  }
  if (component.kind==='head') return role==='attention';
  const roles={'Embeddings':'embedding','Final Norm':'finalNorm','LM Head':'output','Attention Norm':'attentionNorm','FFN Norm':'ffnNorm','Attention':'attention','FFN':'ffn','MoE':'ffn'};
  return role===roles[component.name];
 });
}

export function mapChildren(m,path) {
 const last=path.at(-1);
 if (!last) return [{name:'Embeddings',kind:'tensors'},...Array.from({length:m.layers},(_,i)=>({name:`Layer ${i}`,kind:'blocks',layer:i})),{name:'Final Norm',kind:'tensors'},{name:'LM Head',kind:'tensors'}];
 if (last.kind==='blocks') return ['Attention Norm','Attention','FFN Norm',m.isMoe?'MoE':'FFN'].map(name=>({name,kind:name==='MoE'?'experts':name==='Attention'?'heads':'tensors',layer:last.layer}));
 if (last.kind==='heads') return [...Array.from({length:m.heads},(_,i)=>({name:`Q Head ${i}`,kind:'head',layer:last.layer})),...Array.from({length:m.kvHeads},(_,i)=>({name:`KV Head ${i}`,kind:'head',layer:last.layer}))].map(n=>({...n,info:'Голова внимания — вычислительная часть. Ниже показаны общие тензоры Attention; срез конкретной головы не определён.'}));
 if (last.kind==='experts') return Array.from({length:m.experts},(_,i)=>({name:`Expert ${i}`,kind:'tensors',layer:last.layer,expert:i}));
 if (last.kind==='tensor') return Array.from({length:64},(_,i)=>({name:`Элемент ${i}`,kind:'particle',info:'Схематический элемент. Значение веса не прочитано.'}));
 if (last.kind==='particle') return [];
 return tensorsForComponent(m,last).map(t=>{
  const shared=last.expert!=null&&/ffn_(up|down|gate)_exps\./.test(t.name);
  const note=shared?` · Общий тензор экспертов; выбран Expert ${last.expert}, срез не выделен.`:last.kind==='head'?' · Общий тензор Attention; срез головы не определён.':'';
  return {name:t.name,kind:'tensor',info:`${t.shape.join(' × ')} · ${t.dtype}${note}`,tensor:t};
 });
}

export const MAX_SCENE_NODES=12000;
export function buildMapScene(m,path) {
 validateModelStructure(m);
 const nodes=[],queue=[];
 let truncated=false;
 const add=(n,x,y,z,size,parent,level,route)=>{
  if (nodes.length>=MAX_SCENE_NODES) {truncated=true;return;}
  const id=nodes.length;
  nodes.push({...n,x,y,z,size,parent,level,route});
  if (level<2&&['blocks','heads','experts','tensor'].includes(n.kind)) queue.push(id);
 };
 const roots=mapChildren(m,path),count=Math.min(roots.length,MAX_SCENE_NODES);
 truncated=roots.length>count;
 roots.slice(0,count).forEach((n,i)=>{
  const angle=i*2.39996,radius=count>12?Math.sqrt((i+1)/count)*330:220;
  add(n,Math.cos(angle)*radius,(i-(count-1)/2)*Math.min(50,620/Math.max(1,count)),Math.sin(angle)*radius,n.kind==='blocks'?22:13,null,0,[...path,n]);
 });
 // Breadth first: reserve all top-level objects before adding nested detail.
 for (const id of queue) {
  if (nodes.length>=MAX_SCENE_NODES) {truncated=true;break;}
  const parent=nodes[id],subs=mapChildren(m,parent.route);
  for(let j=0;j<subs.length;j++) {
   if (nodes.length>=MAX_SCENE_NODES) {truncated=true;break;}
   const sub=subs[j],angle=j/Math.max(1,subs.length)*Math.PI*2;
   const radius=parent.level===1?(parent.kind==='experts'?26:20):parent.kind==='blocks'?48:70;
   add(sub,parent.x+Math.cos(angle)*radius,parent.y+Math.sin(angle)*radius,parent.z+Math.sin(angle*2)*10,parent.level===1?2:sub.kind==='heads'?9:5,id,parent.level+1,[...parent.route,sub]);
  }
 }
 return {nodes,truncated};
}
