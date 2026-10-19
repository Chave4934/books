const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8000';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base);
  const topics=await page.evaluate(()=>Object.fromEntries(Object.entries(window.CURRICULUM).map(([id,ts])=>[id,ts.find(t=>t.id==='rutina')])));
  for(const [id,topic]of Object.entries(topics)){
   assert.equal(topic.title,{espanol:'Acciones habituales',ingles:'Everyday actions',ruso:'Повседневные действия'}[id]);assert.equal(topic.items.length,12);assert.equal(new Set(Object.values(topic.variants).flat().map(i=>i.key)).size,12);
   assert.deepEqual(topic.formats,['identify','actionstory','memory','order','crossword']);
   for(let mode=1;mode<=5;mode++){
    await page.goto(`${base}/#/${id}/actividades/rutina/${mode}`);await page.waitForFunction(mode=>document.querySelector('.exercise-steps [aria-current]')?.textContent.trim().startsWith(String(mode)),mode);
    if(mode===3){assert.equal(await page.locator('.memory-card').count(),24);continue;}
    assert.equal(await page.locator('#exercise-stage img').count(),6);
    await page.evaluate(()=>document.querySelectorAll('#exercise-stage img').forEach(i=>i.loading='eager'));await page.waitForFunction(()=>[...document.querySelectorAll('#exercise-stage img')].every(i=>i.complete&&i.naturalWidth>0));
    if(mode===2){
     assert.equal(await page.locator('.action-story-gap input').count(),6);assert.equal(await page.locator('.action-story-gap img').count(),6);
     for(let i=0;i<6;i++)await page.locator(`[name="q${i}"]`).fill(i===0?'incorrecto':topic.variants['2'][i].answer);
     await page.locator('#exercise button[type="submit"]').click();assert.match(await page.locator('#result').textContent(),/5 de 6|5 of 6|5 из 6/);assert.equal(await page.locator('.solution:visible').count(),0);
     await page.locator('.feedback .reveal-solution').click();assert.match(await page.locator('.solution:visible').textContent(),new RegExp(topic.variants['2'][0].answer));
     await page.locator('[name="q0"]').fill(topic.variants['2'][0].answer);await page.locator('#exercise button[type="submit"]').click();assert.match(await page.locator('#result').textContent(),/6 de 6|6 of 6|6 из 6/);await page.locator('#book-recommendation .related-book').waitFor();
     await page.locator('#exercise button[type="reset"]').click();assert.equal(await page.locator('[name="q0"]').inputValue(),'');
    }
   }
  }
  for(const item of topics.espanol.items){const res=await page.request.get(`${base}/assets/acciones/${item.key}.png`);assert.equal(res.status(),200);}
  for(const width of [320,375]){await page.setViewportSize({width,height:812});for(const id of Object.keys(topics))for(let mode=1;mode<=5;mode++){await page.goto(`${base}/#/${id}/actividades/rutina/${mode}`);await page.waitForFunction(mode=>document.querySelector('.exercise-steps [aria-current]')?.textContent.trim().startsWith(String(mode)),mode);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${id}/${mode}/${width}`);}}
  const legacy=await browser.newContext();await legacy.addInitScript(()=>localStorage.setItem('chavebooks-progress-v1',JSON.stringify({'espanol/rutina/1':true})));const l=await legacy.newPage();await l.goto(`${base}/#/espanol/actividades/rutina`);await l.locator('.completion-badge').waitFor();assert.equal(await l.locator('.completion-badge').textContent(),'0 / 5');await legacy.close();
  await page.setViewportSize({width:1280,height:900});await page.goto(`${base}/#/espanol/actividades/rutina/2`);await page.locator('.action-story-gap').last().scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/chavebooks-actions.png',fullPage:true});
  assert.deepEqual(errors,[]);console.log('PASS: all 12 action images, 15 lessons, illustrated present-tense stories, optional solutions, reset, recommendations, legacy progress and mobile layouts.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
