const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8000';
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(base);
    const expected = ['perro','vaca','caballo','cerdo','conejo','elefante','gato','mono','oso','oveja','leon','pato'];
    const inventory = await page.evaluate(() => Object.fromEntries(Object.entries(window.CURRICULUM).map(([lang, topics]) => [lang, topics.find(t => t.id === 'animales')])));
    for (const [lang, topic] of Object.entries(inventory)) {
      assert.deepEqual(topic.items.map(a => a.key), expected);
      assert.equal(topic.formats.length, 5);
      assert.equal(new Set(Object.values(topic.variants).flat().map(a => a.key)).size, 12);
      assert.equal(topic.collectionStatus.imagesAvailable, true);
      for (const mode of [1,2,5]) {
        await page.goto(`${base}/#/${lang}/actividades/animales/${mode}`);
        await page.waitForFunction(mode => document.querySelector('.exercise-steps [aria-current]')?.textContent.trim().startsWith(String(mode)), mode);
        await page.locator('.activity-image').last().waitFor();
        assert.equal(await page.locator('#exercise-stage .activity-image').count(), 6);
        await page.evaluate(() => document.querySelectorAll('#exercise-stage img').forEach(img => img.loading='eager'));
        await page.waitForFunction(() => [...document.querySelectorAll('#exercise-stage img')].every(img => img.complete && Math.max(img.naturalWidth,img.naturalHeight) === 600));
      }
      await page.goto(`${base}/#/${lang}/actividades/animales/3`);
      await page.locator('#memory-board[aria-busy="false"]').waitFor();
      assert.equal(await page.locator('.memory-card').count(), 24);
      await page.evaluate(topic => {
        const items = topic.variants['3'];
        const cards = shuffled(items.flatMap((item, i) => [{pair:i,side:'word'}, {pair:i,side:'meaning'}]),7);
        for (let pair=0;pair<12;pair++) cards.forEach((card,index)=>{if(card.pair===pair)document.querySelector(`[data-card="${index}"]`).click();});
      }, topic);
      await page.evaluate(() => document.querySelectorAll('.memory-card img').forEach(img => img.loading='eager'));
      await page.waitForFunction(() => [...document.querySelectorAll('.memory-card img')].every(img => img.complete && img.naturalWidth >= 140));
      assert.equal(await page.locator('.memory-card img').count(), 12);
      assert.match(await page.locator('#result').textContent(), /12 de 12 parejas|12 of 12 pairs|12 из 12 пар/);
      assert.match(await page.locator('#result').textContent(), /Actividad completada|Activity complete|Задание выполнено/);
    }
    for (const animal of expected) {
      const response = await page.request.get(`${base}/assets/animales/${animal}.png`);
      assert.equal(response.status(), 200, animal);
      assert.equal(response.headers()['content-type'], 'image/png');
      const enhanced = await page.request.get(`${base}/assets/animales/optimizadas/${animal}.webp`);
      assert.equal(enhanced.status(),200,`${animal} enhanced`);
      assert.equal(enhanced.headers()['content-type'],'image/webp');
    }
    await page.goto(`${base}/#/ingles/actividades/animales/1`);
    await page.locator('#exercise').waitFor();
    const items=inventory.ingles.variants['1'];
    for (let i=0;i<items.length;i++) await page.locator(`[name="q${i}"]`).fill(items[i].key==='perro'?'puppy':items[i].answer);
    await page.locator('#exercise button[type="submit"]').click();
    assert.match(await page.locator('#result').textContent(), /6 de 6|6 of 6|6 из 6/);
    await page.locator('[name="q0"]').fill('elephant');
    await page.locator('#exercise button[type="submit"]').click();
    assert.match(await page.locator('#result').textContent(), /5 de 6|5 of 6|5 из 6/);
    assert.equal(await page.locator('.solution:visible').count(),0);
    await page.locator('.feedback .reveal-solution').click();
    assert.match(await page.locator('.solution:visible').textContent(), /dog/);
    for(const width of [320,375]) {
      await page.setViewportSize({width,height:812});
      for (const lang of Object.keys(inventory)) for (const mode of [1,2,3,4,5]) {
        await page.goto(`${base}/#/${lang}/actividades/animales/${mode}`);
        await page.waitForFunction(mode => document.querySelector('.exercise-steps [aria-current]')?.textContent.trim().startsWith(String(mode)), mode);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${lang}/${mode} at ${width}`);
      }
    }
    await page.setViewportSize({width:375,height:812});
    await page.goto(`${base}/#/espanol/actividades/animales/1`);
    await page.locator('.activity-image').last().waitFor();
    await page.screenshot({path:'/tmp/chavebooks-animals-mobile.png',fullPage:true});
    assert.deepEqual(errors,[]);
    console.log('PASS: 12 optimized 600px images load, originals retained, all animals covered in each language, 24-card memory, variants accepted, mistakes hide solutions, all 15 animal activities fit at 320/375px.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
