const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8000';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base);
  const topics=await page.evaluate(()=>Object.fromEntries(Object.entries(window.CURRICULUM).map(([id,ts])=>[id,ts.find(t=>t.id==='colores')])));
  for(const [id,topic]of Object.entries(topics)){
   assert.equal(topic.items.length,12);assert.equal(new Set(Object.values(topic.variants).flat().filter(i=>i.asset.startsWith('colores/')).map(i=>i.key)).size,12);
   const sequences=await page.evaluate(id=>window.CURRICULUM[id].filter(t=>t.kind==='vocabulary').map(t=>t.formats.join('/')),id);assert.equal(new Set(sequences).size,5);
   await page.goto(`${base}/#/${id}/actividades/casa/1`);await page.locator('.flip-card').last().waitFor();assert.equal(new URL(page.url()).hash,`#/${id}/actividades/colores/1`);assert.equal(await page.locator('.flip-card').count(),12);
   await page.locator('.flip-card').first().click();assert.equal(await page.locator('.flash-answer:visible').textContent(),topic.items[0].answer);await page.locator('#exercise button[type="reset"]').click();assert.equal(await page.locator('.flash-answer:visible').count(),0);
   const regionals={espanol:{marron:'café',morado:'violeta',rosa:'rosado',celeste:'azul claro'},ingles:{gris:'gray',celeste:'sky blue'},ruso:{amarillo:'желтый',negro:'черный'}};
   for(let i=0;i<12;i++)await page.locator(`[name="q${i}"]`).fill(regionals[id][topic.items[i].key]||topic.items[i].answer);
   await page.locator('#exercise button[type="submit"]').click();assert.match(await page.locator('#result').textContent(),/12 de 12|12 of 12|12 из 12/);
   for(let mode=1;mode<=5;mode++){
    await page.goto(`${base}/#/${id}/actividades/colores/${mode}`);await page.waitForFunction(mode=>document.querySelector('.exercise-steps [aria-current]')?.textContent.trim().startsWith(String(mode)),mode);
    if(mode===3){assert.equal(await page.locator('.memory-card').count(),24);continue;}
    await page.evaluate(()=>document.querySelectorAll('#exercise-stage img').forEach(i=>i.loading='eager'));await page.waitForFunction(()=>[...document.querySelectorAll('#exercise-stage img')].every(i=>i.complete&&i.naturalWidth>0));
    assert.equal(await page.locator('#exercise-stage img').count(),mode===1?12:mode===4?36:6);
    if(mode===2){
     const reversed={espanol:'verde y roja',ingles:'green and red',ruso:'зелёный и красный'};
     const pair=reversed[id].split(id==='ingles'?' and ':id==='ruso'?' и ':' y ');
     await page.locator('.colour-part').nth(0).fill(pair[0]);await page.locator('.colour-part').nth(1).fill(pair[1]);
     for(let i=1;i<6;i++)await page.locator(`[name="q${i}"]`).fill(topic.variants['2'][i].answer);
     await page.locator('#exercise button[type="submit"]').click();assert.match(await page.locator('#result').textContent(),/6 de 6|6 of 6|6 из 6/);
     await page.locator('.colour-part').first().fill('incorrecto');await page.locator('#exercise button[type="submit"]').click();assert.match(await page.locator('#result').textContent(),/5 de 6|5 of 6|5 из 6/);assert.equal(await page.locator('.solution:visible').count(),0);await page.locator('.feedback .reveal-solution').click();assert.match(await page.locator('.solution:visible').textContent(),new RegExp(topic.variants['2'][0].answer));
     await page.locator('#exercise button[type="reset"]').click();assert.equal(await page.locator('[name="q0"]').inputValue(),'');
    }
    if(mode===4){
     assert.equal(await page.locator('.color-hunt-options input').count(),36);
     for(let i=0;i<6;i++)await page.locator(`[name="q${i}"]`).filter({visible:true}).evaluateAll((inputs,answer)=>inputs.find(input=>input.value===answer).click(),topic.variants['4'][i].answer);
     await page.locator('#exercise button[type="submit"]').click();assert.match(await page.locator('#result').textContent(),/6 de 6|6 of 6|6 из 6/);await page.locator('#exercise button[type="reset"]').click();assert.equal(await page.locator('.color-hunt-options input:checked').count(),0);
    }
   }
  }
  for(const item of topics.espanol.items){const r=await page.request.get(`${base}/assets/colores/${item.key}.png`);assert.equal(r.status(),200);}
  for(const width of [320,375]){await page.setViewportSize({width,height:812});for(const id of Object.keys(topics))for(let mode=1;mode<=5;mode++){await page.goto(`${base}/#/${id}/actividades/colores/${mode}`);await page.waitForFunction(mode=>document.querySelector('.exercise-steps [aria-current]')?.textContent.trim().startsWith(String(mode)),mode);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${id}/${mode}/${width}`);}}
  const legacy=await browser.newContext();await legacy.addInitScript(()=>localStorage.setItem('chavebooks-progress-v1',JSON.stringify({'espanol/casa/1':true})));const l=await legacy.newPage();await l.goto(`${base}/#/espanol/actividades/casa`);await l.locator('.completion-badge').waitFor();assert.equal(await l.locator('.completion-badge').textContent(),'0 / 5');await legacy.close();
  await page.setViewportSize({width:1280,height:900});await page.goto(`${base}/#/espanol/actividades/colores/4`);await page.locator('.color-hunt-options').last().scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/chavebooks-colors.png',fullPage:true});
  assert.deepEqual(errors,[]);console.log('PASS: twelve original paints, fifteen illustrated lessons, regional colour names, two-colour answer orders, 24-card memory, visual selection and reset, old routes/progress and mobile layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
