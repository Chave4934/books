const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8000';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base);
  const curriculum=await page.evaluate(()=>window.CURRICULUM);
  for(const [id,ts]of Object.entries(curriculum))for(const t of ts.filter(t=>t.kind==='grammar'&&!['posesivos','plural'].includes(t.id))){
   for(const mode of [1,2,4,5]){const prefixes=t.variants[mode].map(q=>id==='ruso'?q.prompt.split(/\s(?:я|ты|она|мы|они|Анна|Дети)\s/i)[0]:q.prompt.split(',')[0]);assert.equal(new Set(prefixes).size,5,`${id}/${t.id}/${mode}`);}
   if(t.formats[0]==='choice'){for(const q of t.variants['1']){assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert.equal(q.options.filter(a=>a===q.answer).length,1);}}
  }
  assert.deepEqual(curriculum.espanol[0].variants['1'][0].options,['estudio','estudias','estudia']);
  assert.equal(curriculum.espanol.find(t=>t.id==='indefinido').variants['1'][0].wrong,'estudiaste');
  for(const [id,summaries]of Object.entries({espanol:['Help in English','Смотреть перевод на русском'],ingles:['Ver traducción en español','Смотреть перевод на русском'],ruso:['Ver traducción en español','Help in English']})){
   await page.goto(`${base}/#/${id}/actividades/rutina/1`);await page.locator('.instruction-help').last().waitFor();assert.deepEqual(await page.locator('.instruction-help summary').allTextContents(),summaries);assert.equal(await page.locator('.instruction-help[open]').count(),0);
   for(let i=0;i<2;i++){await page.locator('.instruction-help summary').nth(i).click();assert.equal(await page.locator('.instruction-help p').nth(i).isVisible(),true);}
   const english=page.locator('.instruction-help[lang=en] p');if(await english.count()){assert.match(await english.textContent(),new RegExp(id==='espanol'?'in Spanish':'in Russian'));assert.doesNotMatch(await english.textContent(),/with or without/);}
   for(const [topic,mode]of [['colores',2],['frutas',5]]){await page.goto(`${base}/#/${id}/actividades/${topic}/${mode}`);await page.locator('#exercise').waitFor();assert.equal(await page.locator('.inline-gap').count(),0);const legends=await page.locator('.question legend').allTextContents();legends.forEach(text=>{assert.match(text,/:$/);assert.doesNotMatch(text,/::/);});}
   await page.goto(`${base}/#/${id}/actividades/frutas/1`);await page.locator('.scrambled').last().waitFor();assert.ok(await page.locator('.letter-gap').count()>0);assert.doesNotMatch(await page.locator('#exercise').textContent(),/□/);
   for(const [topic,mode]of [['frutas',4],['ropa',3]]){
    await page.goto(`${base}/#/${id}/actividades/${topic}/${mode}`);await page.locator('.fruit-card').last().waitFor();assert.equal(await page.locator('#exercise select').count(),0);const t=curriculum[id].find(t=>t.id===topic),item=t.variants[mode][0];await page.locator(`.fruit-card[data-fruit="${item.key}"]`).focus();await page.keyboard.press('Enter');await page.locator('.basket-target[data-question="0"]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('[name=q0]').inputValue(),item.answer);assert.equal(await page.locator('.basket-target[data-question="0"] img').count(),1);await page.locator('#exercise button[type=reset]').click();assert.equal(await page.locator('.basket-target img').count(),0);assert.equal(await page.locator('[name=q0]').inputValue(),'');
   }
  }
  await page.goto(`${base}/#/espanol/actividades/animales`);const dog=await page.locator('.welcome-icon img').boundingBox();await page.goto(`${base}/#/espanol/actividades/frutas`);const apple=await page.locator('.welcome-icon img').boundingBox();assert.equal(dog.width,apple.width);assert.equal(dog.height,apple.height);assert.ok(dog.width<=100);
  await page.goto(`${base}/#/espanol/actividades/animales/1`);assert.ok((await page.locator('#exercise-stage img').first().boundingBox()).width<=160);
  const legacy=await browser.newContext();await legacy.addInitScript(()=>localStorage.setItem('chavebooks-progress-v1',JSON.stringify({'espanol/ropa/ilustrada-v2/1':true,'espanol/ropa/ilustrada-v2/3':true})));const l=await legacy.newPage();await l.goto(`${base}/#/espanol/actividades/ropa`);await l.locator('.completion-badge').waitFor();assert.equal(await l.locator('.completion-badge').textContent(),'1 / 5');await legacy.close();
  for(const width of [320,375]){await page.setViewportSize({width,height:812});for(const id of Object.keys(curriculum))for(const [t,m]of [['colores',2],['ropa',3],['frutas',4],['animales',''],['rutina',1]]){await page.goto(`${base}/#/${id}/actividades/${t}/${m}`);await page.locator('#section-content > *').first().waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${id}/${t}/${width}`);}}
  await page.setViewportSize({width:1280,height:900});await page.goto(`${base}/#/espanol/actividades/presente/1`);await page.screenshot({path:'/tmp/chavebooks-polish-grammar.png',fullPage:true});assert.deepEqual(errors,[]);console.log('PASS: varied time markers, three grammar choices, native-language help links, consistent colon prompts, short missing-letter strokes, image-only fruit/clothes matching, matching thumbnail sizes, selective progress migration and mobile layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
