import React,{useEffect,useRef,useState} from 'react';
import {Globe,Check} from 'lucide-react';
import {LANGUAGES,setLanguage} from './i18n.js';
import {useLanguage} from './useLanguage.js';
export default function LanguageSelector(){
 const language=useLanguage(),[open,setOpen]=useState(false),root=useRef(),trigger=useRef();
 const active=LANGUAGES.find(item=>item.code===language);
 useEffect(()=>{
  if(!open)return;
  root.current.querySelector('[role="menuitemradio"][aria-checked="true"]')?.focus();
  const close=e=>{if(!root.current.contains(e.target))setOpen(false)};
  const escape=e=>{if(e.key==='Escape'){e.preventDefault();setOpen(false);trigger.current?.focus()}};
  document.addEventListener('pointerdown',close);document.addEventListener('keydown',escape);
  return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',escape)};
 },[open]);
 const label={ru:'Язык интерфейса',en:'Interface language',zh:'界面语言'}[language];
 return <div className="language-selector" ref={root} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false)}}><button ref={trigger} className="language-trigger icon-btn" aria-label={`${label}: ${active.name}`} title={label} aria-haspopup="menu" aria-expanded={open} onClick={()=>setOpen(!open)}><Globe size={17}/><span aria-hidden="true">{active.flag}</span></button>{open&&<div className="language-menu" role="menu" aria-label={label} onKeyDown={e=>{const items=[...root.current.querySelectorAll('[role="menuitemradio"]')],index=items.indexOf(document.activeElement);if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();items[e.key==='Home'?0:e.key==='End'?items.length-1:(index+(e.key==='ArrowDown'?1:items.length-1))%items.length]?.focus()}}}>{LANGUAGES.map(item=><button role="menuitemradio" aria-checked={item.code===language} key={item.code} onClick={()=>{setLanguage(item.code);setOpen(false);trigger.current?.focus()}}><span aria-hidden="true">{item.flag}</span><span lang={item.code}>{item.name}</span>{item.code===language&&<Check size={15}/>}</button>)}</div>}</div>;
}
