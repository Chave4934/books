const languages = {
  espanol: { name: 'Español', native: 'Hola', code: 'ES', htmlLang: 'es', tone: 'peach', description: 'Conecta con nuevas historias, culturas y personas.' },
  ingles: { name: 'Inglés', native: 'Hello', code: 'EN', htmlLang: 'en', tone: 'sage', description: 'Abre la puerta a un mundo de posibilidades.' },
  ruso: { name: 'Ruso', native: 'Привет', code: 'RU', htmlLang: 'ru', tone: 'lavender', description: 'Descubre otro alfabeto, otra forma de expresarte.' }
};
const main = document.querySelector('main');
let currentLanguage;
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function home() {
  document.title = 'chavebooks · Aprende, juega y descubre.';
  main.innerHTML = `<section class="welcome-strip wrap"><div><p class="eyebrow">BIENVENIDOS A CHAVEBOOKS</p><h1>Aprende, juega y descubre.</h1><p>Actividades ilustradas y libros para tus próximos pasos.</p></div><div class="welcome-greetings" aria-hidden="true"><span>Hola</span><span>Hello</span><span lang="ru">Привет</span></div></section><section id="idiomas" class="languages-section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">ELIGE TU CAMINO</p><h2>¿Qué idioma quieres estudiar?</h2></div><p>Un pequeño paso hoy.<br>Una nueva conversación mañana.</p></div><div class="language-grid">${Object.entries(languages).map(([id,l],i)=>`<a class="language-card ${l.tone}" href="#/${id}/actividades"><div class="card-top"><span class="language-code">${l.code}</span><span class="card-number">0${i+1}</span></div><div class="native" ${id==='ruso'?'lang="ru"':''}>${l.native}<span aria-hidden="true">${['✺','✳','✧'][i]}</span></div><h3>${l.name}</h3><span class="home-activity-count">10 temas · 50 actividades</span><p>${l.description}</p><div class="card-bottom">Estudiar ${l.name.toLowerCase()}<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></div></a>`).join('')}</div><aside class="litres-notice" aria-labelledby="litres-notice-title"><p class="eyebrow">ANTES DE COMPRAR TUS LIBROS</p><h2 id="litres-notice-title">¿LitRes aparece en ruso? Puedes traducirla.</h2><p>Los enlaces de nuestros libros te llevan a LitRes, una plataforma rusa, por lo que la página de compra aparecerá en ruso. Puedes traducirla fácilmente con Google Chrome: abre el menú de los tres puntos, selecciona <strong>«Traducir»</strong> y elige <strong>español</strong> u otro idioma que prefieras. También puedes usar el icono de traducción si aparece en la barra de direcciones.</p><p class="litres-note">La traducción cambia el idioma de la página de compra; el libro sigue estando en el idioma indicado en su ficha.</p></aside><div class="learning-note"><span aria-hidden="true">♡</span><p>No necesitas saberlo todo para empezar.<br><strong>Solo necesitas curiosidad.</strong></p><span class="note-line"></span><p class="note-right">Actividades para practicar.<br>Libros para ir un poco más allá.</p></div></div></section>`;
}
function languagePage(id, tab, topicId, modeId) {
  const l = languages[id]; currentLanguage = id;activeLesson=null;
  document.title = `${l.name} · ${tab==='libros'?'Libros':'Actividades'} | chavebooks`;
  main.innerHTML = `<div class="wrap detail"><a class="back" href="#idiomas">← Todos los idiomas</a><section class="language-banner ${l.tone}"><div><p class="eyebrow">TU ESPACIO PARA APRENDER · ${l.code}</p><h1>${l.name}<span class="banner-native" ${id==='ruso'?'lang="ru"':''}>${l.native}</span></h1><p>${l.description}</p></div><span class="banner-star"><svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" aria-hidden="true"><path d="M50 8v84M8 50h84M20 20l60 60M20 80l60-60"/></svg></span></section><nav class="tabs" aria-label="Secciones de ${l.name}"><a href="#/${id}/actividades" ${tab==='actividades'?'aria-current="page"':''}>Actividades <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a><a href="#/${id}/libros" ${tab==='libros'?'aria-current="page"':''}>Libros <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a></nav><div id="section-content"></div></div>`;
  if(tab==='libros') renderBooks(id,topicId); else {document.querySelector('#section-content').lang=l.htmlLang;renderActivities(id, topicId, modeId);translateLesson();}
}
function bookCover(book) {
 const cover=mediaPath('covers',book.id);
 return cover?`<img class="book-cover" src="${escapeHTML(cover)}" alt="Portada de ${escapeHTML(book.title)}" loading="lazy">`:`<div class="book-cover typographic-cover" aria-hidden="true"><span>chavebooks</span><svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 24c15-4 28-1 40 8 12-9 25-12 40-8v67c-15-4-28-1-40 8-12-9-25-12-40-8V24ZM60 32v67M30 42c8-1 15 1 21 5M30 56c8-1 15 1 21 5M70 47c6-4 13-6 21-5M70 61c6-4 13-6 21-5"/></svg></div>`;
}
function bookSubtitle(book){const text=book.titleEs||book.subtitle;return text?`<p class="book-subtitle" lang="es">${escapeHTML(text)}</p>`:'';}
function bookExtras(book){
 const tags=[book.format,Number.isInteger(book.pages)&&book.pages>0?`${book.pages} páginas`:null].filter(Boolean);
 return `${tags.length?`<div class="book-meta">${tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div>`:''}${book.highlights?`<p class="book-highlights">${escapeHTML(book.highlights)}</p>`:''}${Array.isArray(book.topics)&&book.topics.length?`<p class="book-topics"><strong>Temas:</strong> ${book.topics.map(escapeHTML).join(' · ')}</p>`:''}`;
}
function renderBooks(id,selectedBook) {
 const books=(window.LIBROS||[]).filter(b=>b.language===id),content=document.querySelector('#section-content');
 const audiences=[...new Set(books.map(b=>b.audience))].sort((a,b)=>Number(books.find(x=>x.id===selectedBook)?.audience===b)-Number(books.find(x=>x.id===selectedBook)?.audience===a)||a.localeCompare(b,'es'));
 const varying=['age','level'].filter(field=>new Set(books.map(b=>b[field]).filter(Boolean)).size>1);
 content.innerHTML=`<div class="activity-heading"><div><p class="eyebrow">DE LA PANTALLA A TUS PRÓXIMAS AVENTURAS</p><h2>Libros para aprender jugando.</h2><p>Descubre historias, palabras y actividades para seguir aprendiendo ${languages[id].name.toLowerCase()}.</p></div></div>${books.length?`<aside class="purchase-notice"><strong>Antes de ir a LitRes</strong><p>LitRes es una plataforma rusa y la página de compra aparece en ruso. En Chrome, abre el menú de tres puntos, pulsa «Traducir» y elige tu idioma. Traducir la página no cambia el idioma del libro: revisa la etiqueta de cada edición.</p></aside>${audiences.length>1?`<div class="book-filters" role="group" aria-label="Filtrar por público"><button type="button" data-audience="all" aria-pressed="true">Todos (${books.length})</button>${audiences.map(a=>`<button type="button" data-audience="${escapeHTML(a)}" aria-pressed="false">Para ${escapeHTML(a)} (${books.filter(b=>b.audience===a).length})</button>`).join('')}</div>`:''}<p id="book-count" role="status" aria-live="polite"></p><div id="book-results"></div>`:`<div class="empty-books"><h3>Libros de ruso: pronto disponibles</h3><p>Estamos preparando nuevas aventuras. Mientras tanto, puedes seguir practicando.</p><a class="button dark" href="#/${id}/actividades">Ir a las actividades →</a></div>`}`;
 if(!books.length)return;
 const draw=filter=>{
  const shown=books.filter(b=>filter==='all'||b.audience===filter),results=content.querySelector('#book-results');results.replaceChildren();content.querySelector('#book-count').textContent=`${shown.length} ${shown.length===1?'libro':'libros'}`;
  for(const audience of audiences){
   const group=shown.filter(b=>b.audience===audience).sort((a,b)=>Number(b.id===selectedBook)-Number(a.id===selectedBook)||Number(Boolean(b.series))-Number(Boolean(a.series))||a.title.localeCompare(b.title,'es'));
   if(!group.length)continue;
   const section=document.createElement('section');section.className='book-group';section.innerHTML=`<h3>Para ${escapeHTML(audience)}</h3><div class="book-grid"></div>`;results.append(section);
   for(const book of group){
    const article=document.createElement('article');article.className=`book-card${book.id===selectedBook?' recommended':''}`;article.id=`book-${book.id}`;
    const tags=varying.map(field=>book[field]).filter(Boolean);
    article.innerHTML=`${bookCover(book)}${book.series?`<p class="book-series">Serie ${escapeHTML(book.series)}</p>`:''}<h3${/[А-Яа-яЁё]/.test(book.title)?' lang="ru"':''}>${escapeHTML(book.title)}</h3>${bookSubtitle(book)}${tags.length?`<div class="book-meta">${tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div>`:''}<p class="book-audience">Para ${escapeHTML(book.audience)} que quieren aprender ${languages[id].name.toLowerCase()}.</p><p>${escapeHTML(book.description)}</p>${bookExtras(book)}`;
    try{const url=new URL(book.url);if(url.protocol==='https:'&&/(^|\.)litres\.(ru|com)$/.test(url.hostname)){
     const link=document.createElement('a');link.className='button dark';link.href=url.href;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Ver libro en LitRes →';link.setAttribute('aria-label',`Ver ${book.title} en LitRes (se abre en otra pestaña)`);link.addEventListener('click',()=>window.trackLearningEvent?.('LitRes Click',{book:book.id,language:id,source:'catalog'}));article.append(link);
    }}catch{}
    section.querySelector('.book-grid').append(article);
   }
  }
 };
 content.querySelectorAll('[data-audience]').forEach(button=>button.addEventListener('click',()=>{content.querySelectorAll('[data-audience]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));draw(button.dataset.audience);}));
 draw('all');
}

function route() {
  const parts=location.hash.replace(/^#\/?/,'').split('/');
  if(languages[parts[0]]&&parts[1]==='actividades'&&['comida','casa'].includes(parts[2])){parts[2]=parts[2]==='casa'?'colores':'frutas';history.replaceState(null,'',`#/${parts.join('/')}`);}
  document.body.dataset.exercise=languages[parts[0]]&&parts[1]==='actividades'&&/^[1-5]$/.test(parts[3]||'')?'true':'';
  document.body.dataset.language = languages[parts[0]] ? parts[0] : '';
  if(languages[parts[0]]) languagePage(parts[0],parts[1]==='libros'?'libros':'actividades',parts[2],parts[3]); else home();
  if(location.hash==='#idiomas') requestAnimationFrame(()=>document.querySelector('#idiomas').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})); else window.scrollTo({top:0,left:0,behavior:'instant'});
}
window.addEventListener('hashchange',()=>{route();main.focus({preventScroll:true});});
route();
