// Run with Playwright available on NODE_PATH; see README.md.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8000';
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base);
    await page.locator('.language-card').last().waitFor();
    assert.equal(await page.locator('.language-card').count(), 3);
    assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), 'https://magnificent-empanada-bff6dc.netlify.app/assets/social/chavebooks.png');
    const curriculum = await page.evaluate(() => window.CURRICULUM);
    let count = 0;
    for (const [id, topics] of Object.entries(curriculum)) {
      assert.equal(topics.length, 10);
      for (const topic of topics) {
        if (topic.kind === 'grammar' && topic.variants) {
          const prompts = Object.values(topic.variants).flat().map(q => q.prompt);
          assert.equal(new Set(prompts).size, 25, `Repeated grammar prompt in ${id}/${topic.id}`);
        }
        for (let mode = 1; mode <= 5; mode++) {
          const format = topic.formats[mode - 1];
          await page.goto(`${base}/#/${id}/actividades/${topic.id}/${mode}`);
          await page.waitForFunction(({ title, format, mode }) => document.querySelector('.exercise-heading .eyebrow')?.textContent.includes(title) && document.querySelector('#exercise-stage')?.children.length > 0 && document.querySelector('.exercise-steps [aria-current]')?.textContent.trim().startsWith(String(mode)), { title: topic.title, format, mode });
          if(format==='memory')await page.locator('#memory-board[aria-busy="false"]').waitFor();
          await page.evaluate(({ id, topic, mode, format }) => {
            const items = topic.variants ? topic.variants[String(mode)] : topic.items;
            if (format === 'wordsearch') {
              const puzzle = makeWordSearch(items);
              for (const path of puzzle.placements) {
                for (const cell of [path[0], path.at(-1)]) document.querySelector(`.letter-grid [data-r="${cell.r}"][data-c="${cell.c}"]`).click();
              }
            } else if (format === 'crossword') {
              const puzzle = makeCrossword(items);
              puzzle.grid.forEach((row, r) => row.forEach((letter, c) => {
                if (letter) document.querySelector(`.crossword-cell [data-r="${r}"][data-c="${c}"]`).value = letter;
              }));
              document.querySelector('#crossword-form').requestSubmit();
            } else if (format === 'memory') {
              const deck = shuffled([...items, ...(topic.memoryExtra || [])].flatMap((item, i) => [{ pair: i, side: 'word', text: item.answer }, { pair: i, side: 'meaning', text: item.memoryClue }]), 7);
              for (let pair = 0; pair < (items.length + (topic.memoryExtra || []).length); pair++) deck.forEach((card, index) => { if (card.pair === pair) document.querySelector(`[data-card="${index}"]`).click(); });
            } else {
              items.forEach((item, i) => {
                let correct = item.answer;
                if (format === 'order') correct = item.prompt.replace('___', item.answer);
                if (format === 'truefalse') correct = String(topic.kind === 'vocabulary' ? topic.facts[i][1] : i % 2 === 0);
                const field = document.querySelector(`[name="q${i}"]`);
                if (field.type === 'radio') [...document.querySelectorAll(`[name="q${i}"]`)].find(el => el.value === correct).click();
                else if (format === 'order') {
                  const bank = document.querySelector(`.word-bank[data-question="${i}"]`);
                  correct.split(' ').forEach(word => [...bank.querySelectorAll('button')].find(b => !b.disabled && b.dataset.word === word).click());
                } else if(item.parts){const fields=[...document.querySelectorAll(`.colour-part[data-question="${i}"]`)];fields.forEach((field,j)=>{field.value=item.parts[j][0];field.dispatchEvent(new Event('input',{bubbles:true}));});}
                else field.value = correct;
              });
              document.querySelector('#exercise').requestSubmit();
            }
          }, { id, topic, mode, format });
          assert.match(await page.locator('#result').textContent(), /Actividad completada|Activity complete|Задание выполнено/i, `${id}/${topic.id}/${format}`);
          await page.locator('#book-recommendation .related-book').waitFor();
          count++;
        }
      }
      await page.goto(`${base}/#/${id}/actividades`);
      await page.locator('.catalog-summary').waitFor();
      assert.match(await page.locator('.catalog-summary').textContent(), /50 \/ 50/);
      await page.goto(`${base}/#/${id}/libros`);
      if (id === 'ruso') await page.getByRole('heading', { name: 'Libros de ruso: pronto disponibles' }).waitFor();
      else {
        await page.locator('.book-card').first().waitFor();
        assert.equal(await page.locator('.book-card').count(), id === 'ingles' ? 9 : 1);
        assert.equal(await page.locator('.litres-button-note').count(), 0);
        assert.equal(await page.locator('.purchase-notice').count(), 1);
      }
    }
    // Wrong answers never show a solution until explicitly requested.
    await page.goto(`${base}/#/espanol/actividades/presente/5`);
    await page.locator('#exercise').waitFor();
    for (let i = 0; i < 5; i++) await page.locator(`[name="q${i}"]`).fill('incorrecto');
    await page.getByRole('button', { name: 'Comprobar respuestas' }).click();
    assert.equal(await page.locator('.reveal-solution').count(), 5);
    assert.equal(await page.locator('.solution:visible').count(), 0);
    await page.locator('.reveal-solution').first().click();
    assert.equal(await page.locator('.solution:visible').count(), 1);
    assert.match(await page.locator('.solution:visible').textContent(), new RegExp(curriculum.espanol[0].variants['5'][0].answer));
    await page.locator('[name="q0"]').fill('estudio');
    assert.equal(await page.locator('.solution:visible').count(), 0);
    await page.getByRole('button', { name: 'Volver a empezar', exact: true }).click();
    assert.equal(await page.locator('[name="q0"]').inputValue(), '');
    // Detector accepts the replacement, not an entire rewritten sentence.
    const detective = curriculum.espanol[0].variants['5'];
    for (let i = 0; i < 5; i++) await page.locator(`[name="q${i}"]`).fill(detective[i].answer);
    await page.getByRole('button', { name: 'Comprobar respuestas' }).click();
    assert.match(await page.locator('#result').textContent(), /5 de 5/);
    // Audience and purchase notice remain next to all outgoing buttons.
    await page.goto(`${base}/#/ingles/libros/74602999`);
    await page.locator('.book-card').first().waitFor();
    assert.match(await page.locator('.book-card').first().textContent(), /Pluto in Autumn/);
    assert.match(await page.locator('.book-group > h3').first().textContent(), /hispanohablantes/);
    await page.evaluate(() => { window.testEvents=[];window.trackLearningEvent=(name,props)=>window.testEvents.push({name,props});document.addEventListener('click',event=>{if(event.target.closest('a[href*="litres.ru"]'))event.preventDefault();},true); });
    await page.locator('.book-card .button').first().click();
    assert.equal(await page.evaluate(()=>window.testEvents[0].name),'LitRes Click');
    assert.equal(await page.evaluate(()=>window.ANALYTICS_CONFIG.enabled),false);
    assert.equal(await page.locator('script[src*="plausible.io"]').count(),0);
    const social=await page.request.get(`${base}/assets/social/chavebooks.png`);
    assert.equal(social.status(),200);
    assert.equal(social.headers()['content-type'],'image/png');
    // Real uploaded images are used as soon as their paths are assigned.
    await page.evaluate(() => { window.MEDIA.vocabulary['colores/rojo'] = 'assets/social/chavebooks.png'; });
    await page.goto(`${base}/#/ingles/actividades/colores/1`);
    await page.locator('.activity-image').first().waitFor();
    assert.equal(await page.locator('.activity-image').count(), 12);
    assert.equal(await page.locator('.activity-image').first().getAttribute('src'), 'assets/social/chavebooks.png');
    const routes = ['', '#/ingles/actividades', '#/espanol/actividades/ropa/2', '#/ingles/actividades/frutas/3', '#/ruso/actividades/ropa/3', '#/ruso/actividades/presente/4', '#/ingles/libros'];
    for (const width of [320, 375]) {
      await page.setViewportSize({ width, height: 812 });
      for (const route of routes) {
        await page.goto(base + '/' + route);
        await page.waitForFunction(() => document.querySelector('main').children.length > 0);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Overflow ${width} ${route}`);
      }
    }
    assert.equal(count, 150);
    assert.deepEqual(errors, []);
    console.log('PASS: 150 activities; 375 distinct grammar prompts; word search, connected crosswords, variable-size memory; opt-in solutions, books, progress, own-image integration and mobile layout.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
