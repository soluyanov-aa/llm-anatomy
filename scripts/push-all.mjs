import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const quote=value=>"'"+value.replaceAll("'","'\\''")+"'";
const helper=fileURLToPath(new URL('./git-credential.mjs',import.meta.url));
const config=['-c','credential.helper=','-c',`credential.helper=!${quote(process.execPath)} ${quote(helper)}`];
const git=args=>spawnSync('git',[...config,...args],{encoding:'utf8',env:{...process.env,GIT_TERMINAL_PROMPT:'0'}});
const branchResult=git(['symbolic-ref','--quiet','--short','HEAD']);
if(branchResult.status!==0){console.error('Cannot push: check out a local branch first.');process.exit(1)}
const branch=branchResult.stdout.trim(),remoteResult=git(['remote']);
if(remoteResult.status!==0){console.error('Cannot list Git remotes.');process.exit(1)}
const remotes=remoteResult.stdout.trim().split('\n').filter(Boolean).sort((a,b)=>a==='origin'?-1:b==='origin'?1:a.localeCompare(b));
if(!remotes.length){console.error('No Git remotes configured.');process.exit(1)}
let failed=false;
for(const remote of remotes){
 console.log(`\nPushing ${branch} and tags to ${remote}…`);
 let ok=true;
 for(const refspec of [`refs/heads/${branch}:refs/heads/${branch}`,'--tags']){
  const result=git(['push',remote,refspec]);
  if(result.stdout)process.stdout.write(result.stdout);
  if(result.stderr)process.stderr.write(result.stderr);
  if(result.status!==0){ok=false;failed=true}
 }
 console.log(`${remote}: ${ok?'OK':'FAILED'}`);
}
process.exitCode=failed?1:0;
