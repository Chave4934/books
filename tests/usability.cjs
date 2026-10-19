const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8000';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const p=await browser.newPage({viewport:{width:375,height:812}}),errors=[];
  p.on('pageerror',error=>errors.push(error.message));
  await p.goto(base);const data=await p.evaluate(()=>window.CURRICULUM);
  async function lesson(id,topic,mode){
   await p.goto(`${base}/#/${id}/actividades/${topic}/${mode}`);
   await p.waitForFunction(({id,topic,mode})=>activeLesson?.id===id&&activeLesson?.topic.id===topic&&activeLesson?.mode===mode,{id,topic,mode});
  }
  for(const width of [320,360,375,1280]){
   await p.setViewportSize({width,height:900});
   for(const id of ['espanol','ingles','ruso'])for(const [topic,mode] of [['animales',5],['colores',5],['ropa',2]]){
    await lesson(id,topic,mode);
    assert.equal(await p.locator('.grid-scroll').evaluate(el=>el.scrollWidth<=el.clientWidth),true,`${width}/${id}/${topic}: no inner scroll`);
    const fits=await p.locator('.letter-grid').evaluate(grid=>{
     const box=grid.getBoundingClientRect();return [...grid.children].every(el=>{
      const r=el.getBoundingClientRect();return r.left>=box.left-.5&&r.right<=box.right+.5&&r.height>=44;
     });
    });assert.equal(fits,true,`${width}/${id}/${topic}: all cells fit and remain 44px tall`);
    assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   }
  }
  // Keyboard interaction still selects the endpoints of a word in the compact grid.
  await lesson('espanol','ropa',2);
  const endpoints=await p.evaluate(()=>{const t=window.CURRICULUM.espanol.find(t=>t.id==='ropa');const cells=makeWordSearch(activityItems(t,2)).placements[0];return [cells[0],cells.at(-1)];});
  for(const cell of endpoints){await p.locator(`.letter-grid [data-r="${cell.r}"][data-c="${cell.c}"]`).focus();await p.keyboard.press('Enter');}
  assert.equal(await p.locator('.found-label').filter({hasText:'✓'}).count(),1);
  for(const id of ['espanol','ingles','ruso']){
   const topic=data[id].find(t=>t.id==='frutas');
   for(const item of topic.variants['4'])assert.doesNotMatch(item.orderLabel,/\s+[.,!?]/);
   for(const width of [320,375,1280]){
    await p.setViewportSize({width,height:900});await lesson(id,'frutas',4);
    const target=p.locator('.basket-target[data-question="0"]');
    const frame=()=>p.locator('.basket-target').evaluateAll(nodes=>nodes.map(el=>({height:el.getBoundingClientRect().height,top:el.getBoundingClientRect().top+scrollY})));
    const before=await frame(),item=topic.variants['4'][0];
    await p.locator(`.fruit-card[data-fruit="${item.key}"]`).click();await target.click();
    await target.locator('img').evaluate(img=>img.decode());
    assert.deepEqual(await frame(),before,`${id}/${width}: placing a card keeps every order in place`);
    for(const selector of ['.fruit-card','.fruit-card .activity-image','.basket-target.filled','.basket-target.filled .activity-image']){
     assert.equal(await p.locator(selector).first().evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(255, 255, 255)');
    }
    await p.locator('#exercise button[type=reset]').click();assert.deepEqual(await frame(),before);
   }
  }
  for(const [id,title] of [['espanol','Actividad no encontrada'],['ingles','Activity not found'],['ruso','Задание не найдено']]){
   for(const path of ['inexistente/1','animales/9','animales/error']){
    await p.goto(`${base}/#/${id}/actividades/${path}`);
    await p.waitForFunction(title=>document.title===`${title} | chavebooks`,title);
    assert.equal(await p.locator('.empty-books h2').count(),1);
   }
  }
  for(const topic of data.ruso){
   await p.goto(`${base}/#/ruso/actividades/${topic.id}/resumen`);
   await p.locator('.practice-report a').last().waitFor();
   const titles=await p.locator('.practice-report a').allTextContents();assert.equal(titles.length,5);
   titles.forEach(title=>{assert.match(title,/[А-Яа-яЁё]/);assert.doesNotMatch(title,/Tu caja|Los colores|En busca|Un pequeño|Completa|Tarjetas|Sopa de letras|Pon las palabras/);});
  }
  await p.goto(`${base}/#/ruso/actividades/colores/resumen`);
  assert.equal(await p.locator('.practice-report a').first().textContent(),'1. Твоя коробка красок');
  await p.goto(`${base}/#/ingles/actividades/colores/resumen`);
  assert.equal(await p.locator('.practice-report a').first().textContent(),'1. Your paint box');
  assert.deepEqual(errors,[]);
  console.log('PASS: all nine word searches fit 320/360/375px and desktop with 44px-high cells; keyboard selection, punctuation, stable basket placement/reset, matching image backgrounds, invalid-route titles and all Russian summary headings.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
