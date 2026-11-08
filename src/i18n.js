import {messages} from './translations.js';
export const LANGUAGES=[{code:'ru',name:'Русский',flag:'🇷🇺',locale:'ru-RU'},{code:'en',name:'English',flag:'🇬🇧',locale:'en-US'},{code:'zh',name:'中文',flag:'🇨🇳',locale:'zh-CN'}];
export const LANGUAGE_KEY='llm-anatomy-language';
const valid=code=>LANGUAGES.some(item=>item.code===code);
let language='ru';try{const stored=globalThis.localStorage?.getItem(LANGUAGE_KEY);if(valid(stored))language=stored}catch{}
const listeners=new Set();
export const getLanguage=()=>language;
export const getLocale=()=>LANGUAGES.find(item=>item.code===language).locale;
export function subscribeLanguage(listener){listeners.add(listener);return()=>listeners.delete(listener)}
export function setLanguage(code){
 if(!valid(code))return;
 language=code;try{globalThis.localStorage?.setItem(LANGUAGE_KEY,code)}catch{}
 if(typeof document!=='undefined'){document.documentElement.lang=code==='zh'?'zh-CN':code;document.title='LLM Anatomy — '+t('Интерактивный исследователь моделей')}
 listeners.forEach(listener=>listener());
}
export function t(key,...values){
 const trimmed=key.trim(),entry=messages[key]||messages[trimmed];
 let text=language==='ru'?key:entry?.[language]??key;
 if(language!=='ru'&&!messages[key]&&entry)text=key.slice(0,key.indexOf(trimmed))+text+key.slice(key.indexOf(trimmed)+trimmed.length);
 return text.replace(/\{(\d+)\}/g,(match,index)=>values[index]===undefined?match:String(values[index]));
}
const escapePattern=text=>text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const patterns=Object.keys(messages).filter(key=>/\{\d+\}/.test(key)).map(key=>({key,regex:new RegExp(escapePattern(key).replace(/\\\{\d+\\\}/g,'(.+?)')+'$')}));
// Only call for generated descriptions, never user-provided model/tensor names.
export function translateDescription(text){
 if(!text||language==='ru')return text;
 if(messages[text])return t(text);
 for(const {key,regex} of patterns){const match=text.match(regex);if(match)return text.slice(0,match.index)+t(key,...match.slice(1));}
 for(const key of Object.keys(messages).filter(k=>k.length>30&&!k.includes('{')).sort((a,b)=>b.length-a.length))if(text.includes(key))return text.replace(key,t(key));
 return text;
}
if(typeof document!=='undefined'){document.documentElement.lang=language==='zh'?'zh-CN':language;document.title='LLM Anatomy — '+t('Интерактивный исследователь моделей')}
