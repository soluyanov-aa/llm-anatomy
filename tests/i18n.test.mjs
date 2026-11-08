import test from 'node:test';
import assert from 'node:assert/strict';
import {messages} from '../src/translations.js';
import {setLanguage,getLanguage,t,translateDescription} from '../src/i18n.js';
test('all translated messages have English and Chinese with matching placeholders',()=>{
 const placeholders=text=>[...text.matchAll(/\{(\d+)\}/g)].map(m=>m[1]).sort();
 for(const [key,entry] of Object.entries(messages))for(const code of ['en','zh']){assert.ok(entry[code],`${code}: ${key}`);assert.deepEqual(placeholders(entry[code]),placeholders(key),key)}
});
test('language switching interpolates text and rejects unsupported languages',()=>{
 try{setLanguage('en');assert.equal(t('Открыть модель'),'Open model');assert.equal(t('{0} из {1} экспертов',2,8),'2 of 8 experts');assert.equal(translateDescription('Layer 12'),'Layer 12');setLanguage('zh');assert.equal(t('Открыть модель'),'打开模型');assert.equal(translateDescription('Layer 12'),'第 12 层');assert.equal(translateDescription('Элемент 3'),'元素 3');setLanguage('invalid');assert.equal(getLanguage(),'zh');assert.equal(t('Unknown technical string'),'Unknown technical string')}finally{setLanguage('ru')}
});
