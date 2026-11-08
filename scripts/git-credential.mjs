// Git invokes this helper directly. Its stdout is the credential protocol, never a log.
import {readFile} from 'node:fs/promises';
import {homedir} from 'node:os';
import {join} from 'node:path';

if(process.argv[2]==='get') {
 let input='';for await(const chunk of process.stdin)input+=chunk;
 const fields=Object.fromEntries(input.split('\n').filter(Boolean).map(line=>{const index=line.indexOf('=');return [line.slice(0,index),line.slice(index+1)]}));
 const services={
  'gitlab.derebass.ru':{key:'derebass_gitlab',username:'oauth2'},
  'github.com':{key:'github',username:'x-access-token'},
  'gitverse.ru':{key:'gitvers',username:'sameza'}
 };
 const service=fields.protocol==='https'?services[fields.host]:null;
 if(service)try {
  const path=process.env.LLM_ANATOMY_CREDENTIALS||join(homedir(),'PROJECTS','agents-mds','AGENTS.creds.json');
  const entry=JSON.parse(await readFile(path,'utf8')).credentials?.[service.key];
  if(!entry?.env_value)throw new Error('missing');
  if(entry.expires_at&&Date.parse(entry.expires_at)<=Date.now())throw new Error('expired');
  if(/[\r\n]/.test(entry.env_value))throw new Error('invalid');
  process.stdout.write(`username=${service.username}\npassword=${entry.env_value}\n\n`);
 }catch {
  process.stderr.write(`Credential unavailable for ${fields.host}\n`);process.exitCode=1;
 }
}
