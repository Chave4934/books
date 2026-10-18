const languages = {
  espanol: { name: 'Español', native: 'Hola', code: 'ES', htmlLang: 'es', tone: 'peach', description: 'Conecta con nuevas historias, culturas y personas.' },
  ingles: { name: 'Inglés', native: 'Hello', code: 'EN', htmlLang: 'en', tone: 'sage', description: 'Abre la puerta a un mundo de posibilidades.' },
  ruso: { name: 'Ruso', native: 'Привет', code: 'RU', htmlLang: 'ru', tone: 'lavender', description: 'Descubre otro alfabeto, otra forma de expresarte.' }
};
const main = document.querySelector('main');
let currentLanguage;
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function home() {
  document.title = 'chavebooks · Un idioma, mil posibilidades';
  main.innerHTML = `<section class="hero wrap"><div class="hero-copy"><p class="eyebrow"><span class="small-star">✳</span> TU PRÓXIMA AVENTURA EMPIEZA AQUÍ</p><h1>Un idioma.<br>Mil <em>posibilidades.</em></h1><p class="hero-description">Cada palabra es una puerta que se abre.<br>Aprende, practica y descubre el placer de comunicarte en otro idioma.</p><a class="button dark" href="#idiomas">Encuentra tu idioma <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a><p class="hero-note"><span aria-hidden="true">✦</span> Sin prisas. A tu ritmo. Contigo.</p></div><div class="hero-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><span class="art-star">✳</span><div class="speech speech-es">Hola<span>¡Qué bueno verte!</span></div><div class="speech speech-en">Hello<span>Nice to meet you.</span></div><div class="speech speech-ru" lang="ru">Привет<span>Рада тебя видеть!</span></div><div class="art-caption">DISTINTAS PALABRAS. INFINITAS CONEXIONES.</div><span class="tiny-star">✧</span></div></section><section id="idiomas" class="languages-section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">ELIGE TU CAMINO</p><h2>¿Qué idioma quieres estudiar?</h2></div><p>Un pequeño paso hoy.<br>Una nueva conversación mañana.</p></div><div class="language-grid">${Object.entries(languages).map(([id,l],i)=>`<a class="language-card ${l.tone}" href="#/${id}/actividades"><div class="card-top"><span class="language-code">${l.code}</span><span class="card-number">0${i+1}</span></div><div class="native" ${id==='ruso'?'lang="ru"':''}>${l.native}<span aria-hidden="true">${['✺','✳','✧'][i]}</span></div><h3>${l.name}</h3><span class="home-activity-count">10 temas · 50 actividades</span><p>${l.description}</p><div class="card-bottom">Estudiar ${l.name.toLowerCase()}<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></div></a>`).join('')}</div><aside class="litres-notice" aria-labelledby="litres-notice-title"><p class="eyebrow">ANTES DE COMPRAR TUS LIBROS</p><h2 id="litres-notice-title">¿LitRes aparece en ruso? Puedes traducirla.</h2><p>Los enlaces de nuestros libros te llevan a LitRes, una plataforma rusa, por lo que la página de compra aparecerá en ruso. Puedes traducirla fácilmente con Google Chrome: abre el menú de los tres puntos, selecciona <strong>«Traducir»</strong> y elige <strong>español</strong> u otro idioma que prefieras. También puedes usar el icono de traducción si aparece en la barra de direcciones.</p><p class="litres-note">La traducción cambia el idioma de la página de compra; el libro sigue estando en el idioma indicado en su ficha.</p></aside><div class="learning-note"><span aria-hidden="true">♡</span><p>No necesitas saberlo todo para empezar.<br><strong>Solo necesitas curiosidad.</strong></p><span class="note-line"></span><p class="note-right">Actividades para practicar.<br>Libros para ir un poco más allá.</p></div></div></section>`;
}
function languagePage(id, tab, topicId, modeId) {
  const l = languages[id]; currentLanguage = id;
  document.title = `${l.name} · ${tab==='libros'?'Libros':'Actividades'} | chavebooks`;
  main.innerHTML = `<div class="wrap detail"><a class="back" href="#idiomas">← Todos los idiomas</a><section class="language-banner ${l.tone}"><div><p class="eyebrow">TU ESPACIO PARA APRENDER · ${l.code}</p><h1>${l.name}<span class="banner-native" ${id==='ruso'?'lang="ru"':''}>${l.native}</span></h1><p>${l.description}</p></div><span class="banner-star" aria-hidden="true">✳</span></section><nav class="tabs" aria-label="Secciones de ${l.name}"><a href="#/${id}/actividades" ${tab==='actividades'?'aria-current="page"':''}>Actividades <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a><a href="#/${id}/libros" ${tab==='libros'?'aria-current="page"':''}>Libros <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a></nav><div id="section-content"></div></div>`;
  if(tab==='libros') renderBooks(id); else renderActivities(id, topicId, modeId);
}
const MODES = {
  grammar: [
    ['Elige la forma correcta', 'Completa cada frase eligiendo una de las dos opciones.', '◉'],
    ['Completa las frases', 'Escribe la forma que falta. Usa la pista entre paréntesis.', '✍'],
    ['Un pequeño texto', 'Completa los cinco huecos para dar sentido a esta pequeña historia.', '▤'],
    ['Pon las palabras en orden', 'Pulsa las palabras para construir la frase. Pulsa una palabra elegida para devolverla.', '⇄'],
    ['Detective de errores', 'La palabra marcada es incorrecta. Reescribe la frase completa con la forma correcta.', '⌕']
  ],
  vocabulary: [
    ['¿Qué ves?', 'Mira la ilustración y escribe la palabra en el idioma que estudias. Si necesitas ayuda, abre la pista.', '◉'],
    ['Cada palabra con su significado', 'Relaciona cada descripción con la palabra que le corresponde.', '⇄'],
    ['Adivina la palabra', 'Lee la pista y elige la palabra correcta.', '?'],
    ['Palabras en contexto', 'Escribe la palabra que completa cada frase. Usa las cinco palabras del banco.', '▤'],
    ['Letras revueltas', 'Ordena mentalmente las letras y escribe la palabra. Los puntos indican espacios.', '✦']
  ]
};
let completed = {};
try { const saved = JSON.parse(localStorage.getItem('chavebooks-progress-v1') || '{}'); if(saved && typeof saved === 'object' && !Array.isArray(saved)) completed = saved; } catch {}
function activityKey(id, topic, mode) { return `${id}/${topic}/${mode}`; }
function isDone(id, topic, mode) { return completed[activityKey(id,topic,mode)] === true; }
function topicDone(id, topic) { return [1,2,3,4,5].filter(mode=>isDone(id,topic,mode)).length; }
function topicPath(id, topic) { return `#/${id}/actividades/${topic}`; }
function shuffled(values, seed=0) {
  const out = [...values];
  // Deterministic Fisher–Yates keeps choices stable while reviewing an answer.
  let state = seed + 163;
  for(let i=out.length-1;i>0;i--) { state=(Math.imul(state,1664525)+1013904223)>>>0; const j=state%(i+1); [out[i],out[j]]=[out[j],out[i]]; }
  return out;
}
function renderActivities(id, topicId, modeId) {
  const topics = window.CURRICULUM[id];
  const content = document.querySelector('#section-content');
  if(!topicId) {
    const count = topics.reduce((n,t)=>n+topicDone(id,t.id),0);
    content.innerHTML = `<div class="activity-heading"><div><p class="eyebrow">HOY, ¿QUÉ TE APETECE PRACTICAR?</p><h2>Tu próxima pequeña conquista.</h2><p>Escoge un tema y descubre cinco formas de practicarlo. Puedes empezar por donde quieras.</p></div><span class="level">10 temas · 50 actividades</span></div><div class="catalog-summary"><span>✦ Tu camino en ${languages[id].name.toLowerCase()}</span><strong>${count} / 50 completadas</strong><progress aria-label="Actividades completadas" max="50" value="${count}"></progress></div>${['grammar','vocabulary'].map(kind=>`<section class="topic-section" aria-labelledby="heading-${kind}"><div class="topic-section-title"><h3 id="heading-${kind}">${kind==='grammar'?'Juega con la gramática':'Palabras para tu mundo'}</h3><span>5 temas para explorar</span></div><div class="topic-grid">${topics.filter(t=>t.kind===kind).map(t=>`<a class="topic-card" href="${topicPath(id,t.id)}"><span class="topic-icon" aria-hidden="true">${t.icon}</span><span class="level">${t.level}</span><h3>${t.title}</h3><p>5 actividades · ${topicDone(id,t.id)} completadas</p><span class="topic-open">Explorar el tema <span aria-hidden="true">→</span></span></a>`).join('')}</div></section>`).join('')}<p class="progress-note">Tu progreso se guarda en este navegador cuando completas una actividad con todas las respuestas correctas. No se sincroniza con otros dispositivos; si el navegador bloquea el almacenamiento, no se conservará.</p>`;
    return;
  }
  const topic=topics.find(t=>t.id===topicId);
  if(!topic || (modeId && !/^[1-5]$/.test(modeId))) {
    content.innerHTML=`<div class="empty-books"><h2>No encontramos esta actividad.</h2><p>Elige otro tema para seguir aprendiendo.</p><a class="button dark" href="#/${id}/actividades">Ver todos los temas</a></div>`; return;
  }
  const modes=MODES[topic.kind];
  document.title=`${topic.title} · ${languages[id].name} | chavebooks`;
  if(!modeId) {
    content.innerHTML=`<a class="back topic-back" href="#/${id}/actividades">← Todos los temas</a><div class="topic-welcome"><span class="welcome-icon" aria-hidden="true">${topic.icon}</span><div><p class="eyebrow">${topic.kind==='grammar'?'TALLER DE GRAMÁTICA':'TALLER DE VOCABULARIO'} · ${topic.level}</p><h2>${topic.title}</h2><p>Cinco maneras de aprender. Elige tu actividad de hoy.</p></div><span class="completion-badge">${topicDone(id,topic.id)} / 5</span></div><aside class="topic-tip"><strong>Una pista para empezar</strong><p>${topic.tip}</p></aside><div class="mode-grid">${modes.map(([title,description,icon],i)=>`<a class="mode-card" href="${topicPath(id,topic.id)}/${i+1}"><span class="mode-index">ACTIVIDAD 0${i+1} ${isDone(id,topic.id,i+1)?'· ✓ COMPLETADA':''}</span><span class="mode-icon" aria-hidden="true">${icon}</span><h3>${title}</h3><p>${description}</p><span class="topic-open">${isDone(id,topic.id,i+1)?'Volver a practicar':'¡Vamos allá!'} <span aria-hidden="true">→</span></span></a>`).join('')}</div>`;
    return;
  }
  renderExercise(id,topic,Number(modeId));
}
function normalizeAnswer(value) {
  return String(value).normalize('NFC').toLocaleLowerCase().replace(/ё/g,'е').replace(/[.,!?¡¿;:«»“”"]/g,'').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
}
function fullSentence(item) { return item.prompt.replace('___',item.answer); }
function expectedAnswers(topic, mode, item) {
  if(topic.kind==='grammar' && (mode===4 || mode===5)) return [fullSentence(item)];
  return [item.answer,...(item.aliases||[])];
}
function renderExercise(id,topic,mode) {
  const content=document.querySelector('#section-content');
  const [title,instruction]=MODES[topic.kind][mode-1];
  const vocabulary=topic.kind==='vocabulary';
  const targetLang=languages[id].htmlLang;
  const textMode=!vocabulary&&mode===3;
  let questions=topic.items.map((item,i)=>{
    let prompt=item.prompt, control='';
    const field=`q${i}`;
    if(vocabulary&&mode===1) {
      prompt=`¿Cómo se dice? · Imagen ${i+1}`;
      control=`<div class="picture-card"><span class="vocab-picture" role="img" aria-label="${escapeHTML(item.clue)}">${item.image}</span><details><summary>Necesito una pista</summary><p>${item.clue}</p></details></div>`;
    } else if(vocabulary&&(mode===2||mode===3)) prompt=item.clue;
    else if(vocabulary&&mode===5) { prompt=item.clue; control=`<p class="scrambled" lang="${targetLang}">${escapeHTML(shuffled(Array.from(item.answer),i+11).join('').replace(/ /g,'·'))}</p>`; }
    else if(!vocabulary&&mode===2) prompt=`${item.prompt} (${item.hint})`;
    else if(!vocabulary&&mode===5) prompt=item.prompt.replace('___',`<mark>${escapeHTML(item.wrong)}</mark>`);
    if((!vocabulary&&mode===1)||(vocabulary&&mode===3)) {
      const options=shuffled(vocabulary?topic.items.map(x=>x.answer):[item.answer,item.wrong],i+mode);
      control+=`<div class="answers">${options.map(option=>`<label><input type="radio" name="${field}" value="${escapeHTML(option)}" required><span lang="${targetLang}">${escapeHTML(option)}</span></label>`).join('')}</div>`;
    } else if(vocabulary&&mode===2) {
      control+=`<select id="answer-${i}" name="${field}" required lang="${targetLang}" aria-labelledby="question-${i}"><option value="">Elige una palabra</option>${shuffled(topic.items.map(x=>x.answer),i+mode).map(a=>`<option value="${escapeHTML(a)}">${escapeHTML(a)}</option>`).join('')}</select>`;
    } else if(!vocabulary&&mode===4) {
      prompt='Construye la frase con todas las palabras.';
      control+=`<div class="word-slots" id="slots-${i}" aria-label="Tu frase" lang="${targetLang}"></div><div class="word-bank" data-question="${i}" lang="${targetLang}">${shuffled(fullSentence(item).split(' '),i+9).map((word,j)=>`<button type="button" class="word-token" data-token="${j}" data-word="${escapeHTML(word)}" aria-label="Añadir ${escapeHTML(word)}">${escapeHTML(word)}</button>`).join('')}</div><input type="hidden" name="${field}" id="answer-${i}"><p class="word-help">Puedes pulsar las palabras de tu frase para cambiarlas de sitio.</p>`;
    } else {
      control+=`<input class="written-answer" id="answer-${i}" name="${field}" type="text" required autocomplete="off" autocapitalize="off" spellcheck="false" lang="${targetLang}" aria-labelledby="question-${i}" ${!vocabulary&&mode===5?'placeholder="Escribe la frase corregida"':'placeholder="Escribe tu respuesta"'}>`;
    }
    if(!vocabulary&&mode===1) control+=`<p class="grammar-hint">Pista: ${escapeHTML(item.hint)}</p>`;
    if(!vocabulary&&mode===3) control+=`<p class="grammar-hint">${escapeHTML(item.hint)}</p>`;
    return `<fieldset class="question ${textMode?'text-question':''}"><legend id="question-${i}"><span class="question-number">0${i+1}</span> <span ${!vocabulary&&mode!==4?'lang="'+targetLang+'"':''}>${prompt}</span></legend>${control}<p class="feedback" id="feedback-${i}" aria-live="polite"></p></fieldset>`;
  }).join('');
  content.innerHTML=`<a class="back topic-back" href="${topicPath(id,topic.id)}">← Las cinco actividades de ${topic.title}</a><div class="exercise-heading"><p class="eyebrow">${topic.title} · ACTIVIDAD ${mode} DE 5</p><h2>${title}</h2><p>${instruction}</p></div><div class="exercise-steps" aria-label="Las cinco actividades">${MODES[topic.kind].map(([name],i)=>`<a href="${topicPath(id,topic.id)}/${i+1}" aria-label="Actividad ${i+1}: ${name}" ${mode===i+1?'aria-current="page"':''}>${i+1}${isDone(id,topic.id,i+1)?'<span aria-hidden="true">✓</span>':''}</a>`).join('')}</div><aside class="topic-tip"><strong>Recuerda</strong><p>${topic.tip}</p></aside>${vocabulary&&mode===4?`<div class="vocabulary-bank"><strong>Banco de palabras</strong><p lang="${targetLang}">${shuffled(topic.items.map(x=>x.answer),4).map(w=>`<span>${escapeHTML(w)}</span>`).join('')}</p></div>`:''}<form id="exercise"><div class="exercise-meta"><span>${textMode?'Una pequeña historia, cinco huecos':'Cinco pequeños retos'}</span><span>Sin límite de tiempo · ${topic.level}</span></div><div class="${textMode?'story-sheet':''}">${questions}</div><div class="exercise-actions"><button class="button dark" type="submit">Comprobar respuestas →</button><button class="reset" type="reset">Volver a empezar ↺</button></div><div id="result" class="result" role="status" aria-live="polite"></div></form><div class="exercise-next"><a href="${topicPath(id,topic.id)}">Ver las cinco actividades</a>${mode<5?`<a href="${topicPath(id,topic.id)}/${mode+1}">Siguiente actividad →</a>`:`<a href="#/${id}/actividades">Elegir otro tema →</a>`}</div>`;
  const form=document.querySelector('#exercise');
  const clearFeedback=()=>{form.querySelectorAll('.feedback').forEach(el=>{el.textContent='';el.className='feedback';});document.querySelector('#result').textContent='';};
  form.querySelectorAll('.word-bank').forEach(bank=>{
    const i=Number(bank.dataset.question), slots=document.querySelector(`#slots-${i}`), input=document.querySelector(`#answer-${i}`);
    const sync=()=>{input.value=[...slots.querySelectorAll('button')].map(b=>b.dataset.word).join(' ');clearFeedback();};
    bank.addEventListener('click',event=>{
      const button=event.target.closest('button'); if(!button || button.disabled) return;
      const chosen=button.cloneNode(true); chosen.setAttribute('aria-label',`Quitar ${button.dataset.word}`);
      button.disabled=true; slots.append(chosen);
      chosen.addEventListener('click',()=>{button.disabled=false;chosen.remove();sync();button.focus();}); sync();
    });
  });
  form.addEventListener('input',clearFeedback);
  form.addEventListener('change',clearFeedback);
  form.addEventListener('reset',()=>{
    clearFeedback();form.querySelectorAll('.word-slots').forEach(el=>el.replaceChildren());form.querySelectorAll('.word-bank button').forEach(b=>b.disabled=false);
  });
  form.addEventListener('submit',event=>{
    event.preventDefault();const data=new FormData(form);let score=0;
    if(topic.items.some((_,i)=>!String(data.get(`q${i}`)||'').trim())) {
      document.querySelector('#result').textContent='Completa las cinco respuestas antes de comprobar.';return;
    }
    topic.items.forEach((item,i)=>{
      const correct=expectedAnswers(topic,mode,item).some(answer=>normalizeAnswer(answer)===normalizeAnswer(data.get(`q${i}`)));
      if(correct) score++;
      const feedback=document.querySelector(`#feedback-${i}`);
      feedback.textContent=`${correct?'✓ ¡Correcto!':'Revisa tu respuesta. Solución: '+expectedAnswers(topic,mode,item)[0]+'.'} ${vocabulary?item.clue:'Pista: '+item.hint+'.'}`;
      feedback.className=`feedback ${correct?'correct':'incorrect'}`;
    });
    if(score===5) {completed[activityKey(id,topic.id,mode)]=true;try{localStorage.setItem('chavebooks-progress-v1',JSON.stringify(completed));}catch{} }
    document.querySelector('#result').textContent=`${score} de 5 respuestas correctas. ${score===5?'¡Actividad completada! Puedes seguir con el siguiente reto.':'Lee las soluciones y vuelve a intentarlo. Cada intento te ayuda a aprender.'}`;
  });
}

function renderBooks(id) {
  const books = (window.LIBROS || []).filter(b=>b.language===id);
  const content = document.querySelector('#section-content');
  content.innerHTML = `<div class="activity-heading"><div><p class="eyebrow">SIGUE DESCUBRIENDO</p><h2>Una página más cerca.</h2><p>Libros para acompañarte en tu aprendizaje de ${languages[id].name.toLowerCase()}.</p></div></div>${books.length?'<div class="book-grid"></div>':'<div class="empty-books"><span class="book-symbol" aria-hidden="true">▤</span><h3>Libros de ruso: pronto disponibles</h3><p>Pronto encontrarás aquí una selección de libros y sus enlaces de compra en LitRes. Mientras tanto, puedes seguir practicando.</p><a class="button dark" href="#/'+id+'/actividades">Ir a las actividades <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a></div>'}`;
  books.forEach(b=>{const article=document.createElement('article'); article.className='book-card'; article.innerHTML=`<span class="eyebrow">LIBRO · ${languages[id].name}</span><h3>${escapeHTML(b.title)}</h3><p>${escapeHTML(b.description||'')}</p>`;try { const url=new URL(b.url); if(url.protocol==='https:' && /(^|\.)litres\.(ru|com)$/.test(url.hostname)){const link=document.createElement('a');link.className='button dark';link.href=url.href;link.target='_blank';link.rel='noopener noreferrer';link.innerHTML='Ver en LitRes <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';link.setAttribute('aria-label',`Ver ${b.title} en LitRes (se abre en otra pestaña)`);article.append(link);} } catch {} content.querySelector('.book-grid').append(article); });
}
function route() {
  const parts=location.hash.replace(/^#\/?/,'').split('/');
  document.body.dataset.language = languages[parts[0]] ? parts[0] : '';
  if(languages[parts[0]]) languagePage(parts[0],parts[1]==='libros'?'libros':'actividades',parts[2],parts[3]); else home();
  if(location.hash==='#idiomas') requestAnimationFrame(()=>document.querySelector('#idiomas').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})); else window.scrollTo(0,0);
}
window.addEventListener('hashchange',()=>{route();main.focus({preventScroll:true});});
route();
