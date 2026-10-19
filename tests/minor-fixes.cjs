const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8000';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const p=await browser.newPage({viewport:{width:375,height:812}});
  await p.goto(base);
  const data=await p.evaluate(()=>window.CURRICULUM);
  const clothes=data.ruso.find(t=>t.id==='ropa');
  for(const items of [clothes.items,...Object.values(clothes.variants)])for(const item of items.filter(i=>i.asset==='ropa/zapatos')){
   assert.equal(item.answer,'ботинки');assert.ok(item.aliases.includes('сапоги'));assert.ok(!item.aliases.includes('обувь'));
  }
  await p.goto(`${base}/#/ruso/actividades/ropa/4`);
  const items=clothes.variants['4'],index=items.findIndex(i=>i.asset==='ropa/zapatos');assert.ok(index>=0);
  for(let i=0;i<items.length;i++)await p.locator(`[name=q${i}]`).fill(items[i].answer);
  for(const [answer,correct] of [['обувь',false],['сапоги',true],['ботинки',true]]){
   await p.locator(`[name=q${index}]`).fill(answer);await p.locator('#exercise button[type=submit]').click();
   assert.equal(await p.locator('.feedback.incorrect').count(),correct?0:1);
  }
  for(const [id,prompt,answer] of [['present-perfect','Today, they ___ the door twice.','have closed'],['present-continuous','At the moment, they ___ the door.','are closing']]){
   const topic=data.ingles.find(t=>t.id===id);assert.equal(topic.variants['5'].at(-1).prompt,prompt);assert.equal(topic.variants['5'].at(-1).answer,answer);
   await p.goto(`${base}/#/ingles/actividades/${id}/5`);
   for(let i=0;i<5;i++)await p.locator(`[name=q${i}]`).fill(topic.variants['5'][i].answer);
   await p.locator('#exercise button[type=submit]').click();assert.equal(await p.locator('.feedback.correct').count(),5);
  }
  assert.match(data.ruso.find(t=>t.id==='frutas').tip,/Бананы.*виноград/);
  // Audit every lesson: native radio controls use their associated full-size labels.
  for(const [id,topics] of Object.entries(data))for(const topic of topics)for(let mode=1;mode<=5;mode++){
   await p.goto(`${base}/#/${id}/actividades/${topic.id}/${mode}`);
   await p.waitForFunction(({id,topic,mode})=>activeLesson?.id===id&&activeLesson?.topic.id===topic&&activeLesson?.mode===mode,{id,topic:topic.id,mode});
   const small=await p.locator('button, a[href], summary, select, input:not([type=hidden])').evaluateAll(nodes=>nodes.filter(el=>{
    if(!el.getClientRects().length||el.closest('[hidden]'))return false;
    const target=/^(radio|checkbox)$/.test(el.type)?el.closest('label')||el:el;
    return target.getBoundingClientRect().height<40;
   }).map(el=>el.outerHTML.slice(0,120)));
   assert.deepEqual(small,[],`${id}/${topic.id}/${mode}: touch heights`);
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   assert.ok((await p.locator('.instruction-help summary').first().boundingBox()).height>=44);
  }
  await p.goto(`${base}/#/ingles/libros`);
  assert.equal(await p.locator('.book-card .book-audience').count(),0);
  assert.equal(await p.locator('.book-group > h3').count(),2);
  assert.equal(await p.evaluate(()=>window.LIBROS.every(b=>Object.hasOwn(b,'cover'))),true);
  const book=p.locator('#book-74602999');
  for(const field of ['book','media']){
   await p.evaluate(field=>{
    const b=window.LIBROS.find(b=>b.id==='74602999');b.cover=field==='book'?'assets/ropa/vestido.png':null;
    window.MEDIA.covers[b.id]=field==='media'?'assets/frutas/manzana.png':null;renderBooks('ingles');
   },field);
   await book.scrollIntoViewIfNeeded();await book.locator('img.book-cover').waitFor();
   await book.locator('img.book-cover').evaluate(img=>img.decode());
   assert.match(await book.locator('img.book-cover').getAttribute('src'),field==='book'?/vestido/:/manzana/);
  }
  await p.evaluate(()=>{const b=window.LIBROS.find(b=>b.id==='74602999');b.cover='assets/no-cover-yet.webp';window.MEDIA.covers[b.id]=null;renderBooks('ingles');});
  await book.scrollIntoViewIfNeeded();await book.locator('.typographic-cover').waitFor();
  assert.equal(await p.locator('.book-card .book-highlights').count(),1);assert.equal(await p.locator('.book-card .book-meta span').count(),2);
  await p.goto(`${base}/#/espanol/actividades/animales/resumen`);
  assert.match(await p.locator('.related-book h3').textContent(),/Sigue con Español para niños/);
  assert.doesNotMatch(await p.locator('.related-book h3').textContent(),/[А-Яа-я]/);
  await p.goto(`${base}/#/espanol/libros`);assert.equal(await p.locator('.book-card h3').textContent(),'Испанский для детей');
  // Hold downloads to inspect reserved frames before an image can paint.
  const slow=await browser.newPage({viewport:{width:375,height:812}});let release;
  const held=new Promise(resolve=>release=resolve);
  await slow.route(/\.(png|webp)$/,async route=>{await held;await route.continue();});
  await slow.goto(`${base}/#/espanol/actividades/animales/1`,{waitUntil:'domcontentloaded'});
  const first=slow.locator('#exercise-stage img').first();await first.waitFor();
  const before=await first.boundingBox();assert.ok(before.width>0&&before.height>0);
  assert.equal(await first.getAttribute('loading'),'eager');assert.ok(await first.getAttribute('width'));assert.ok(await first.getAttribute('height'));
  assert.notEqual(await first.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(255, 255, 255)');
  release();await first.evaluate(img=>img.decode());assert.deepEqual(await first.boundingBox(),before);
  for(const width of [375,1440]){
   await slow.setViewportSize({width,height:900});await slow.goto(`${base}/#/espanol/actividades/colores/4`);
   assert.equal(await slow.locator('#exercise-stage img').evaluateAll(images=>images.filter(img=>{const r=img.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;}).every(img=>img.loading==='eager')),true);
  }
  console.log('PASS: seven minor fixes, real answer grading, all 150 lesson touch areas, both cover sources and missing-image fallback, optional metadata, Spanish recommendation and stable image frames before/after download.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
