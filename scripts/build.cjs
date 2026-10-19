// Publish only the runtime site. Source artwork, tests and documentation stay in the repository.
const fs=require('node:fs');const path=require('node:path');
const root=path.resolve(__dirname,'..'),output=path.join(root,'dist');
const runtime=['index.html','404.html','app.js','activities.js','learning.js','localization.js','media.js','books.js','analytics.js','styles.css','favicon.svg'];
fs.rmSync(output,{recursive:true,force:true});fs.mkdirSync(output,{recursive:true});
for(const name of runtime)fs.copyFileSync(path.join(root,name),path.join(output,name));
let imageBytes=0;
function copyAssets(source,target){
 fs.mkdirSync(target,{recursive:true});
 for(const entry of fs.readdirSync(source,{withFileTypes:true})){
  if(entry.name==='mejoradas'||entry.name==='README.md')continue;
  const src=path.join(source,entry.name),dest=path.join(target,entry.name);
  if(entry.isDirectory()){copyAssets(src,dest);continue;}
  if(!entry.isFile()||path.relative(root,src).replaceAll('\\','/')==='assets/social/chavebooks.svg')continue;
  const ext=path.extname(entry.name).toLowerCase(),image=['.png','.webp','.jpg','.jpeg','.svg'].includes(ext),font=ext==='.woff2',license=entry.name.startsWith('OFL-')&&ext==='.txt';
  if(!image&&!font&&!license)continue;
  fs.copyFileSync(src,dest);if(image)imageBytes+=fs.statSync(src).size;
 }
}
copyAssets(path.join(root,'assets'),path.join(output,'assets'));
if(imageBytes>=3_000_000)throw Error(`Published images exceed the 3 MB budget: ${imageBytes} bytes`);
console.log(`Built dist/: runtime files and public assets only; images ${(imageBytes/1_000_000).toFixed(2)} MB.`);
