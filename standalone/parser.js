/* Header-only inspectors. No model weights are read. All parsing happens locally in the browser. */
const GGML_TYPES={0:'F32',1:'F16',2:'Q4_0',3:'Q4_1',6:'Q5_0',7:'Q5_1',8:'Q8_0',9:'Q8_1',10:'Q2_K',11:'Q3_K',12:'Q4_K',13:'Q5_K',14:'Q6_K',15:'Q8_K',16:'IQ2_XXS',17:'IQ2_XS',18:'IQ3_XXS',19:'IQ1_S',20:'IQ4_NL',21:'IQ3_S',22:'IQ2_S',23:'IQ4_XS',24:'I8',25:'I16',26:'I32',27:'I64',28:'F64',29:'IQ1_M',30:'BF16',31:'Q4_0_4_4',32:'Q4_0_4_8',33:'Q4_0_8_8',34:'TQ1_0',35:'TQ2_0'};
const typeSize={0:1,1:1,2:2,3:2,4:4,5:4,6:4,7:1,8:null,9:null,10:8,11:8,12:8};
const META_LIMIT=250000;
function cleanNum(n){ return Number.isFinite(n)?n:null }
class Cursor {
 constructor(file){this.file=file;this.pos=0;this.block=null;this.blockStart=-1;this.blockSize=131072;this.decoder=new TextDecoder();}
 async bytes(n){if(n<0||n>67108864||this.pos+n>this.file.size)throw Error('Некорректный или обрезанный заголовок файла');
  if(this.block && this.pos>=this.blockStart && this.pos+n<=this.blockStart+this.block.byteLength){let b=new Uint8Array(this.block,this.pos-this.blockStart,n);this.pos+=n;return b;}
  const start=this.pos; const len=Math.max(n,this.blockSize);const blob=await this.file.slice(start,Math.min(this.file.size,start+len)).arrayBuffer();this.block=blob;this.blockStart=start;this.pos+=n;return new Uint8Array(blob,0,n);
 }
 skip(n){if(n<0||this.pos+n>this.file.size)throw Error('GGUF содержит некорректную длину');this.pos+=n;}
 async num(n,signed=false,float=false){let a=await this.bytes(n),dv=new DataView(a.buffer,a.byteOffset,n); if(float) return n===4?dv.getFloat32(0,true):dv.getFloat64(0,true);if(n===1)return signed?dv.getInt8(0):dv.getUint8(0);if(n===2)return signed?dv.getInt16(0,true):dv.getUint16(0,true);if(n===4)return signed?dv.getInt32(0,true):dv.getUint32(0,true);return Number(signed?dv.getBigInt64(0,true):dv.getBigUint64(0,true));}
 async str(keep=true){const len=await this.num(8);if(!Number.isSafeInteger(len)||len>this.file.size)throw Error('Недопустимая длина строки GGUF');if(!keep||len>4096){this.skip(len);return len>4096?`[строка ${len} байт]`:'';}return this.decoder.decode(await this.bytes(len));}
 async value(t,depth=0){if(depth>3)throw Error('Слишком глубокий вложенный массив');if(t===8)return this.str();if(t===9){const itemType=await this.num(4),count=await this.num(8);if(!Number.isSafeInteger(count)||count>100000000)throw Error('Неверная длина массива');if(typeSize[itemType]){const len=count*typeSize[itemType];if(!Number.isSafeInteger(len))throw Error('Слишком длинный массив');if(count>24){this.skip(len);return {array:true,length:count,type:itemType};}let a=[];for(let i=0;i<count;i++)a.push(await this.value(itemType,depth+1));return a;}
 if(itemType===8){let a=[];for(let i=0;i<count;i++){if(count<=12)a.push(await this.str(true));else await this.str(false);}return count<=12?a:{array:true,length:count,type:itemType};}
 if(itemType===9)throw Error('Массив массивов GGUF пока не поддерживается');
 if(count>1000)throw Error('Неизвестный тип большого массива GGUF');let a=[];for(let i=0;i<count;i++)a.push(await this.value(itemType,depth+1));return a;
 }
 if(t===7)return !!(await this.num(1));if(t===6)return this.num(4,false,true);if(t===12)return this.num(8,false,true);
 if(t===0||t===1)return this.num(1,t===1);if(t===2||t===3)return this.num(2,t===3);if(t===4||t===5)return this.num(4,t===5);if(t===10||t===11)return this.num(8,t===11);throw Error('Неизвестный тип метаданных GGUF: '+t);
 }
}
const safeProduct=a=>a.reduce((p,n)=>Number.isSafeInteger(n)&&n>=0?p*n:0,1);
function tensorInfo(name,shape,dtype,bytes){return {name,shape,dtype,elements:safeProduct(shape),bytes:cleanNum(bytes)}}
function inferredFields(m,tensors,format,fileSize,fileName,partial=false){
 const arch=m['general.architecture']||m.model_type||m.architectures?.[0]||inferArchFromNames(tensors)||'Transformer';const a=String(arch).toLowerCase();
 const get=(suffix,more=[])=>m[`${arch}.${suffix}`]??m[`${a}.${suffix}`]??more.map(k=>m[k]).find(v=>v!=null);
 const sampleLayer=tensors.map(t=>getLayerIndex(t.name)).filter(x=>x!=null);
 const layers=Number(get('block_count',['num_hidden_layers','n_layer','n_layers'])??(sampleLayer.length?Math.max(...sampleLayer)+1:0));
 const hidden=Number(get('embedding_length',['hidden_size','n_embd'])||0);
 const heads=Number(get('attention.head_count',['num_attention_heads','n_head'])||0);
 const kvHeads=Number(get('attention.head_count_kv',['num_key_value_heads'])||heads);
 const experts=Number(get('expert_count',['num_experts','n_routed_experts','n_local_experts'])||0);
 const activeExperts=Number(get('expert_used_count',['num_experts_per_tok','num_experts_per_token'])||0);
 const ffn=Number(get('feed_forward_length',['intermediate_size'])||0);
 const context=Number(get('context_length',['max_position_embeddings','n_ctx'])||0);
 const vocab=Number(get('vocab_size',['vocab_size','padded_vocab_size'])||(m['tokenizer.ggml.tokens']?.length)||0);
 const isMoe=experts>0||tensors.some(t=>/\.experts\.|\.ffn_(up|down|gate)_exps|\.block_sparse_moe\.|\.mlp\.gate\./i.test(t.name))||/moe|mixtral|deepseek2/i.test(a);
 const detectedQuant=mostCommon(tensors.filter(t=>t.dtype.startsWith('Q')||t.dtype.startsWith('IQ')).map(t=>t.dtype));
 const quant=detectedQuant||mostCommon(tensors.map(t=>t.dtype))||m['general.file_type']||'—';
 const params=tensors.reduce((n,t)=>n+t.elements,0);
 return {id:'local',name:String(m['general.name']||m._name||fileName.replace(/\.(gguf|safetensors|json)$/i,'')||'Локальная модель'),fileName,format,source:'local',partial,arch:String(arch),isMoe,layers,hidden,heads,kvHeads,experts,activeExperts,ffn,context,vocab,quant,fileSize,params,tensors,metadata:m};
}
function getLayerIndex(name){let m=name.match(/(?:^|\.)(?:blk|layers|h|blocks)\.(\d+)\./);return m?Number(m[1]):null;}
function inferArchFromNames(tensors){let n=tensors[0]?.name||'';if(n.startsWith('blk.'))return 'gguf-unknown';if(n.startsWith('model.layers'))return 'llama-family';if(n.startsWith('transformer.h'))return 'gpt-family';return null;}
function mostCommon(a){let x=new Map();for(let v of a)x.set(v,(x.get(v)||0)+1);return [...x].sort((a,b)=>b[1]-a[1])[0]?.[0]}
async function parseGGUF(file){const c=new Cursor(file);let magic=new TextDecoder().decode(await c.bytes(4));if(magic!=='GGUF')throw Error('Не GGUF: неверная сигнатура');let version=await c.num(4),nT=await c.num(8),nM=await c.num(8);if(version<2||version>3)throw Error(`Версия GGUF ${version} не поддерживается (ожидается 2 или 3)`);if(nT>200000||nM>300000)throw Error('Слишком большое число записей заголовка');let metadata={_gguf_version:version};
 for(let i=0;i<nM;i++){let key=await c.str(true),type=await c.num(4);let keep=key.startsWith('general.')||key.includes('.expert')||key.includes('.attention.')||key.includes('.block_count')||key.includes('.embedding_length')||key.includes('.context_length')||key.includes('.feed_forward_length')||key==='tokenizer.ggml.tokens'||key==='tokenizer.ggml.model'; let value=await c.value(type);if(keep && Object.keys(metadata).length<META_LIMIT)metadata[key]=value;}
 let tensors=[];for(let i=0;i<nT;i++){let name=await c.str(true),nd=await c.num(4);if(nd>8)throw Error('Некорректная размерность тензора');let shape=[];for(let j=0;j<nd;j++)shape.push(await c.num(8));let dtype=GGML_TYPES[await c.num(4)]||'OTHER';let offset=await c.num(8);tensors.push(tensorInfo(name,shape,dtype,null));}
 return inferredFields(metadata,tensors,'GGUF',file.size,file.name,false);
}
async function parseSafeTensors(file){let header=new DataView(await file.slice(0,8).arrayBuffer());if(header.byteLength<8)throw Error('Файл SafeTensors слишком короткий');let size=Number(header.getBigUint64(0,true));if(!Number.isSafeInteger(size)||size<2||size>128*1024*1024||size+8>file.size)throw Error('Некорректная длина заголовка SafeTensors');let raw=await file.slice(8,8+size).text();let parsed=JSON.parse(raw);let tensors=[];for(const [name,v] of Object.entries(parsed)){if(name==='__metadata__')continue;if(!Array.isArray(v.shape)||typeof v.dtype!=='string')continue;let bytes=Array.isArray(v.data_offsets)?v.data_offsets[1]-v.data_offsets[0]:null;tensors.push(tensorInfo(name,v.shape,v.dtype,bytes));}
 return {tensors,metadata:parsed.__metadata__||{}};
}
async function openModelFiles(files){const source=Array.from(files||[]);if(!source.length)throw Error('Не выбраны файлы');const ggufs=source.filter(f=>/\.gguf$/i.test(f.name));const safes=source.filter(f=>/\.safetensors$/i.test(f.name));const configFile=source.find(f=>f.name==='config.json');let config={};if(configFile){try{config=JSON.parse(await configFile.text())}catch{throw Error('config.json не является корректным JSON')}}
 if(ggufs.length){let results=[];for(const f of ggufs.slice(0,32))results.push(await parseGGUF(f));let first=results[0];if(results.length>1){let known=new Set();let all=[];for(const r of results){for(const t of r.tensors){if(!known.has(t.name)){known.add(t.name);all.push(t)}}}first.tensors=all;first.params=all.reduce((n,t)=>n+t.elements,0);first.fileSize=results.reduce((n,r)=>n+r.fileSize,0);first.partial=ggufs.length>results.length;first.name=first.name.replace(/-\d+-of-\d+$/,'');}
 return first;}
 if(safes.length){let tensors=[],metadata={...config},sum=0;const names=new Set();for(const f of safes.slice(0,128)){const result=await parseSafeTensors(f);Object.assign(metadata,result.metadata);sum+=f.size;for(let t of result.tensors){if(!names.has(t.name)){names.add(t.name);tensors.push(t)}}}metadata._name=metadata._name||config._name||source[0].webkitRelativePath?.split('/')[0]||safes[0].name.replace(/\.safetensors$/i,'');return inferredFields(metadata,tensors,'SafeTensors',sum,safes.length===1?safes[0].name:`${safes.length} файлов SafeTensors`,safes.length>128);}
 if(configFile){return inferredFields({...config,_name:source[0].webkitRelativePath?.split('/')[0]||'Модель из config.json'},[],'Config JSON',configFile.size,configFile.name,true)}
 throw Error('Поддерживаются .gguf, .safetensors и папки с config.json');
}
