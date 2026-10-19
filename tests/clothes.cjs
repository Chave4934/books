const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8000';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);
  const topics=await page.evaluate(()=>Object.fromEntries(Object.entries(window.CURRICULUM).map(([id,ts])=>[id,ts.find(t=>t.id==='ropa')])));
  for(const [id,topic]of Object.entries(topics)){
   assert.equal(topic.items.length,12);assert.deepEqual(topic.formats,['picturechoice','wordsearch','basket','context','memory']);
   assert.equal(new Set(Object.values(topic.variants).flat().map(i=>i.key)).size,12);
   const orders=await page.evaluate(id=>window.CURRICULUM[id].filter(t=>t.kind==='vocabulary').map(t=>t.formats.join('/')),id);assert.equal(new Set(orders).size,orders.length);
   for(const mode of [1,2,3,4]){
    await page.goto(`${base}/#/${id}/actividades/ropa/${mode}`);await page.waitForFunction(mode=>document.querySelector('.exercise-steps [aria-current]')?.textContent.trim().startsWith(String(mode)),mode);
    await page.evaluate(()=>document.querySelectorAll('#exercise-stage img').forEach(i=>i.loading='eager'));
    await page.waitForFunction(()=>[...document.querySelectorAll('#exercise-stage img')].every(i=>i.complete&&i.naturalWidth>0));assert.equal(await page.locator('#exercise-stage .activity-image').count(),6);
    if(mode===1){assert.equal(await page.locator('input[type="radio"]').count(),18);const options=await page.evaluate(()=>[...document.querySelectorAll('fieldset')].map(f=>[...f.querySelectorAll('input')].map(i=>i.value)));options.forEach((opts,i)=>{assert.equal(new Set(opts).size,3);assert.equal(opts.filter(o=>o===topic.variants['1'][i].answer).length,1);});}
    if(mode===3){const first=topic.variants['3'][0];await page.locator(`.fruit-card[data-fruit="${first.key}"]`).click();await page.locator('.basket-target[data-question="0"]').click();assert.equal(await page.locator('[name="q0"]').inputValue(),first.answer);await page.locator('#exercise button[type="reset"]').click();assert.equal(await page.locator('[name="q0"]').inputValue(),'');}
   }
   await page.goto(`${base}/#/${id}/actividades/ropa/5`);await page.locator('#memory-board[aria-busy="false"]').waitFor();assert.equal(await page.locator('.memory-card').count(),24);
   await page.evaluate(topic=>{const deck=shuffled(topic.variants['5'].flatMap((item,i)=>[{pair:i,side:'word'},{pair:i,side:'meaning'}]),7);for(let i=0;i<12;i++)deck.forEach((card,j)=>{if(card.pair===i)document.querySelector(`[data-card="${j}"]`).click();});},topic);
   await page.evaluate(()=>document.querySelectorAll('.memory-card img').forEach(i=>i.loading='eager'));await page.waitForFunction(()=>[...document.querySelectorAll('.memory-card img')].every(i=>i.complete&&i.naturalWidth>0));assert.equal(await page.locator('.memory-card img').count(),12);assert.match(await page.locator('#result').textContent(),/12 de 12 parejas|12 of 12 pairs|12 из 12 пар/);
  }
  await page.goto(`${base}/#/espanol/actividades/ropa/3`);await page.locator('#exercise').waitFor();for(let i=0;i<6;i++){const item=topics.espanol.variants['3'][i];await page.locator(`.fruit-card[data-fruit="${item.key}"]`).click();await page.locator(`.basket-target[data-question="${i}"]`).click();}await page.locator('#exercise button[type="submit"]').click();assert.match(await page.locator('#result').textContent(),/6 de 6/);
  await page.goto(`${base}/#/espanol/actividades/ropa/4`);await page.locator('#exercise').waitFor();for(let i=0;i<6;i++)await page.locator(`[name="q${i}"]`).fill(i===3?'remera':i===5?'botines':topics.espanol.variants['4'][i].answer);await page.locator('#exercise button[type="submit"]').click();assert.match(await page.locator('#result').textContent(),/6 de 6|6 of 6|6 из 6/);
  await page.goto(`${base}/#/ingles/actividades/ropa/4`);await page.locator('#exercise').waitFor();for(let i=0;i<6;i++)await page.locator(`[name="q${i}"]`).fill(i===3?'T‑shirt':i===4?'pants':i===5?'boots':topics.ingles.variants['4'][i].answer);await page.locator('#exercise button[type="submit"]').click();assert.match(await page.locator('#result').textContent(),/6 de 6|6 of 6|6 из 6/);
  await page.locator('[name="q0"]').fill('hat');await page.locator('#exercise button[type="submit"]').click();assert.match(await page.locator('#result').textContent(),/5 de 6|5 of 6|5 из 6/);assert.equal(await page.locator('.solution:visible').count(),0);await page.locator('.feedback .reveal-solution').click();assert.match(await page.locator('.solution:visible').textContent(),/scarf/);await page.locator('#exercise button[type="reset"]').click();assert.equal(await page.locator('[name="q0"]').inputValue(),'');assert.equal(await page.locator('.solution:visible').count(),0);
  for(const item of topics.espanol.items){const r=await page.request.get(`${base}/assets/ropa/${item.key}.png`);assert.equal(r.status(),200,item.key);assert.equal(r.headers()['content-type'],'image/png');}
  const legacy=await browser.newContext();await legacy.addInitScript(()=>localStorage.setItem('chavebooks-progress-v1',JSON.stringify({'espanol/ropa/1':true})));const l=await legacy.newPage();await l.goto(`${base}/#/espanol/actividades/ropa`);await l.locator('.completion-badge').waitFor();assert.equal(await l.locator('.completion-badge').textContent(),'0 / 5');assert.equal(await l.evaluate(()=>JSON.parse(localStorage.getItem('chavebooks-progress-v1'))['espanol/ropa/1']),true);await legacy.close();
  for(const width of [320,375]){await page.setViewportSize({width,height:812});for(const id of Object.keys(topics))for(const mode of [1,2,3,4,5]){await page.goto(`${base}/#/${id}/actividades/ropa/${mode}`);await page.waitForFunction(mode=>document.querySelector('.exercise-steps [aria-current]')?.textContent.trim().startsWith(String(mode)),mode);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${id}/${mode}/${width}`);}}
  await page.setViewportSize({width:1440,height:1000});await page.goto(`${base}/#/espanol/actividades/ropa/1`);await page.locator('#exercise-stage .activity-image').last().scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/chavebooks-clothes.png',fullPage:true});
  assert.deepEqual(errors,[]);console.log('PASS: 12 original clothing images, unique topic sequence, 3-option quizzes, 24-card memory, regional synonyms and Unicode hyphens, reset, optional solutions, legacy progress and all 15 lessons on mobile.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
