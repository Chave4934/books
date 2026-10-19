const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8000';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.goto(base);
  const topics=await page.evaluate(()=>Object.fromEntries(Object.entries(window.CURRICULUM).map(([id,ts])=>[id,ts.find(t=>t.id==='frutas')])));
  assert.equal(await page.evaluate(()=>Object.values(window.CURRICULUM).some(ts=>ts.some(t=>t.id==='comida'))),false);
  assert.equal(await page.evaluate(()=>puzzleWord('piña')),'PIÑA');
  assert.equal(await page.evaluate(()=>puzzleWord('й')),'Й');
  assert.equal(await page.evaluate(()=>puzzleWord('limón')),'LIMON');
  for(const [id,topic]of Object.entries(topics)){
   assert.equal(topic.items.length,12);assert.deepEqual(topic.formats,['fruitletters','flashcards','crossword','basket','context']);
   assert.equal(new Set(Object.values(topic.variants).flat().map(i=>i.key)).size,12);
   await page.goto(`${base}/#/${id}/actividades`);await page.locator('.topic-card').last().waitFor();assert.equal(await page.locator('.topic-card').count(),10);await page.getByRole('heading',{name:'Las frutas',exact:true}).waitFor();
   for(const mode of [1,2,3,4,5]){
    await page.goto(`${base}/#/${id}/actividades/frutas/${mode}`);await page.waitForFunction(mode=>document.querySelector('.exercise-steps [aria-current]')?.textContent.trim().startsWith(String(mode)),mode);
    await page.evaluate(()=>document.querySelectorAll('#exercise-stage img').forEach(img=>img.loading='eager'));
    await page.waitForFunction(()=>[...document.querySelectorAll('#exercise-stage img')].every(i=>i.complete&&i.naturalWidth>0));
    if(mode===1){assert.equal(await page.locator('.scrambled').count(),6);assert.equal(await page.locator('.activity-image').count(),6);}
    if(mode===2){await page.locator('.flip-card').first().click();assert.equal(await page.locator('.flash-answer:visible').count(),1);assert.equal(await page.locator('.flash-answer:visible').textContent(),topic.variants['2'][0].answer);await page.locator('.flip-card').first().click();assert.equal(await page.locator('.flash-answer:visible').count(),0);}
   }
   await page.goto(`${base}/#/${id}/actividades/comida/3`);await page.locator('.crossword-grid').waitFor();assert.match(page.url(),/frutas\/3$/);assert.match(await page.locator('.exercise-heading').textContent(),/Las frutas/);
  }
  const spanish=topics.espanol;
  await page.goto(`${base}/#/espanol/actividades/frutas/4`);await page.locator('.fruit-card').last().waitFor();
  await page.locator('.fruit-card[data-fruit="mango"]').dragTo(page.locator('.basket-target[data-question="0"]'));
  assert.equal(await page.locator('[name="q0"]').inputValue(),'mango');
  await page.locator('.fruit-card[data-fruit="melocoton"]').focus();await page.keyboard.press('Enter');await page.locator('.basket-target[data-question="1"]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('[name="q1"]').inputValue(),'melocotón');
  await page.locator('#basket-select-2').selectOption('naranja');
  for(let i=3;i<6;i++){const item=spanish.variants['4'][i];await page.locator(`.fruit-card[data-fruit="${item.key}"]`).click();await page.locator(`.basket-target[data-question="${i}"]`).click();}
  await page.getByRole('button',{name:'Comprobar respuestas'}).click();assert.match(await page.locator('#result').textContent(),/6 de 6/);await page.locator('.related-book').waitFor();
  await page.locator('#basket-select-0').selectOption('naranja');await page.getByRole('button',{name:'Comprobar respuestas'}).click();assert.match(await page.locator('#result').textContent(),/5 de 6/);assert.equal(await page.locator('.solution:visible').count(),0);await page.getByRole('button',{name:'Ver solución',exact:true}).click();assert.match(await page.locator('.solution:visible').textContent(),/mango/);
  await page.getByRole('button',{name:'Volver a empezar',exact:true}).click();assert.equal(await page.locator('[name="q0"]').inputValue(),'');assert.equal(await page.locator('#basket-select-0').inputValue(),'');assert.equal(await page.locator('.fruit-card[aria-pressed="true"]').count(),0);
  await page.goto(`${base}/#/espanol/actividades/frutas/2`);await page.locator('#exercise').waitFor();for(let i=0;i<6;i++)await page.locator(`[name="q${i}"]`).fill(i===2?'durazno':spanish.variants['2'][i].answer);await page.getByRole('button',{name:'Comprobar respuestas'}).click();assert.match(await page.locator('#result').textContent(),/6 de 6/);
  for(const fruit of spanish.items){const r=await page.request.get(`${base}/assets/frutas/${fruit.key}.png`);assert.equal(r.status(),200,fruit.key);assert.equal(r.headers()['content-type'],'image/png');}
  for(const width of [320,375]){await page.setViewportSize({width,height:812});for(const id of Object.keys(topics))for(const mode of [1,2,3,4,5]){await page.goto(`${base}/#/${id}/actividades/frutas/${mode}`);await page.waitForFunction(mode=>document.querySelector('.exercise-steps [aria-current]')?.textContent.trim().startsWith(String(mode)),mode);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${id}/${mode}/${width}`);}}
  await page.setViewportSize({width:1440,height:1000});await page.goto(`${base}/#/espanol/actividades/frutas/4`);await page.locator('.fruit-card').last().waitFor();await page.screenshot({path:'/tmp/chavebooks-fruit-basket.png',fullPage:true});
  assert.deepEqual(errors,[]);console.log('PASS: 12 fruit originals in all 3 languages, varied formats, images load, drag/drop + keyboard + selectors, optional solutions, regional answers, old links, ñ/й and mobile layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
