import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const script=fileURLToPath(new URL('../scripts/push-all.mjs',import.meta.url));
function fixture(){
 const root=mkdtempSync(join(tmpdir(),'llm-push-test-'));
 const git=args=>{const r=spawnSync('git',args,{cwd:root,encoding:'utf8'});assert.equal(r.status,0,r.stderr);return r.stdout.trim()};
 git(['init','-b','main','.']);git(['-c','user.name=Test','-c','user.email=test@example.invalid','commit','--allow-empty','-m','Initial']);git(['tag','snapshot']);
 for(const name of ['origin','github']){git(['init','--bare',`${name}.git`]);git(['remote','add',name,join(root,`${name}.git`)])}
 return {root,git,push:()=>spawnSync(process.execPath,[script],{cwd:root,encoding:'utf8'})};
}
test('push:all sends branch and lightweight tags to both remotes, origin first',()=>{
 const f=fixture();try{const result=f.push();assert.equal(result.status,0,result.stderr);assert.ok(result.stdout.indexOf('to origin')<result.stdout.indexOf('to github'));const sha=f.git(['rev-parse','HEAD']);for(const name of ['origin','github']){assert.equal(f.git([`--git-dir=${name}.git`,'rev-parse','refs/heads/main']),sha);assert.equal(f.git([`--git-dir=${name}.git`,'rev-parse','refs/tags/snapshot']),sha)}assert.equal(f.push().status,0)}finally{rmSync(f.root,{recursive:true,force:true})}
});
test('push:all continues after a failed remote and exits with failure',()=>{
 const f=fixture();try{f.git(['remote','add','broken',join(f.root,'missing.git')]);const result=f.push();assert.equal(result.status,1);assert.match(result.stdout,/broken: FAILED/);assert.match(result.stdout,/github: OK/);assert.equal(f.git(['--git-dir=github.git','rev-parse','main']),f.git(['rev-parse','HEAD']))}finally{rmSync(f.root,{recursive:true,force:true})}
});
test('push:all rejects detached HEAD before sending anything',()=>{
 const f=fixture();try{f.git(['checkout','--detach']);const result=f.push();assert.equal(result.status,1);assert.match(result.stderr,/check out a local branch/)}finally{rmSync(f.root,{recursive:true,force:true})}
});
