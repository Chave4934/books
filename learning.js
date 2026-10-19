const FORMAT_INFO = {
  colorcontext: ['Los colores de tus ilustraciones', 'Mira cada dibujo y completa la frase en el idioma que estudias. En la sandía escribe los dos colores pedidos; el orden no importa.'],
  colorhunt: ['En busca del color', 'Lee el nombre del color y encuentra su mancha de pintura. Pulsa una imagen en cada reto.'],
  actionstory: ['Un día en imágenes', 'Completa esta historia en presente. Cada dibujo sustituye a la pista del verbo: escribe solo la forma que falta y fíjate en quién realiza la acción.'],
  picturechoice: ['Elige el nombre', 'Mira la ilustración y elige su nombre entre las tres opciones.'],
  fruitletters: ['Completa las letras', 'Mira la fruta, completa mentalmente las letras que faltan y escribe el nombre entero.'],
  basket: ['Prepara la cesta', 'Lee cada pedido y elige la imagen que corresponde. Pulsa una tarjeta y después su pedido, o arrástrala.'],
  choice: ['Elige la forma correcta', 'Elige la opción que completa cada frase.'],
  write: ['Completa las frases', 'Escribe solo la forma que falta. Entre paréntesis encontrarás el verbo o la palabra base.'],
  text: ['Un pequeño texto', 'Completa los huecos de esta historia. Usa la palabra base entre paréntesis.'],
  order: ['Pon las palabras en orden', 'Pulsa las palabras para formar una frase. Puedes devolverlas pulsando sobre ellas.'],
  letters: ['Reconstruye la palabra', 'Completa la frase. Las letras bajo la frase te ayudan a recordar la forma que falta.'],
  detective: ['Detective de errores', 'Corrige solo la palabra o el grupo de palabras marcado. No escribas toda la frase.'],
  identify: ['Lee y escribe', 'Lee la pista y escribe la palabra en el idioma que estudias.'],
  match: ['Une las ideas', 'Relaciona cada situación con la palabra o acción que le corresponde.'],
  context: ['Palabras en contexto', 'Completa cada frase con una palabra del banco. Lee los detalles: solo una encaja.'],
  truefalse: ['Verdadero o falso', 'Lee cada afirmación y decide si es verdadera o falsa.'],
  memory: ['Memory: veinte tarjetas', 'Encuentra diez parejas: una palabra y su significado. Pulsa dos tarjetas para descubrirlas.'],
  wordsearch: ['Sopa de letras', 'Busca las cinco palabras. Pulsa la primera letra y después la última. Pueden ir en horizontal, vertical o diagonal.'],
  crossword: ['Un pequeño crucigrama', 'Elige una pista para resaltar su palabra. Escribe una letra por casilla; las flechas te ayudan a moverte. Puedes usar tildes; la ñ se conserva.'],
  flashcards: ['Tarjetas para aprender', 'Piensa en la palabra, escríbela y comprueba tu respuesta. Si la necesitas, puedes voltear la tarjeta.'],
  sequence: ['Un día en orden', 'Lee el horario de este día y relaciona cada hora con la acción adecuada.']
};
let completed = {};
try { const saved = JSON.parse(localStorage.getItem('chavebooks-progress-v1') || '{}'); if(saved && typeof saved === 'object' && !Array.isArray(saved)) completed=saved; } catch {}
function activityKey(id,topic,mode) { const entry=window.CURRICULUM?.[id]?.find(t=>t.id===topic),revision=entry?.activityRevisions?.[String(mode)]||entry?.revision;return revision?`${id}/${topic}/${revision}/${mode}`:`${id}/${topic}/${mode}`; }
function isDone(id,topic,mode) { return completed[activityKey(id,topic,mode)]===true; }
function topicDone(id,topic) { return [1,2,3,4,5].filter(m=>isDone(id,topic,m)).length; }
function topicPath(id,topic) { return `#/${id}/actividades/${topic}`; }
function shuffled(values,seed=0) { const out=[...values];let state=seed+163;for(let i=out.length-1;i>0;i--){state=(Math.imul(state,1664525)+1013904223)>>>0;const j=state%(i+1);[out[i],out[j]]=[out[j],out[i]];}return out; }
function normalizeAnswer(value) { return String(value).normalize('NFC').toLocaleLowerCase().replace(/ё/g,'е').replace(/[.,!?¡¿;:«»“”"]/g,'').replace(/[’‘]/g,"'").replace(/[‐‑‒–—−]/g,'-').replace(/\s+/g,' ').trim(); }
function puzzleWord(value) { return normalizeAnswer(value).replace(/[áàäâ]/g,'a').replace(/[éèëê]/g,'e').replace(/[íìïî]/g,'i').replace(/[óòöô]/g,'o').replace(/[úùüû]/g,'u').replace(/[^\p{L}]/gu,'').toUpperCase(); }
function fullSentence(item) { return item.prompt.replace('___',item.answer); }
function activityItems(topic,mode) { return topic.variants ? topic.variants[String(mode)] : topic.items; }
function activityFormat(topic,mode) { return topic.formats[mode-1]; }
function topicIcon(topic) {
  const paths={grammar:'M5 18 16 7l3 3L8 21H5v-3ZM14 9l3 3M5 4h8M5 8h5',animales:'M8 14c-3 3-2 6 1 6 2 0 2-1 3-1s2 1 3 1c4 0 4-3 1-6-2-2-6-2-8 0ZM6 8v2M10 4v3M15 4v3M19 8v2',casa:'m3 11 9-8 9 8M5 10v11h14V10M10 21v-7h4v7',ropa:'m8 4-5 3 3 5 2-1v10h8V11l2 1 3-5-5-3c0 4-8 4-8 0Z',rutina:'M12 7v5l3 2M7 2 3 6M17 2l4 4M5 20l-1 2M19 20l1 2',frutas:'M12 7c-7-6-12 1-8 10 2 5 5 4 8 3 3 1 6 2 8-3 4-9-1-16-8-10ZM12 7c0-4 2-5 5-5M12 7c-2-3-4-3-6-3'};
  const cover=mediaPath('topics',topic.id);
  return cover?`<img class="topic-photo" src="${escapeHTML(cover)}" alt="" loading="lazy">`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${topic.id==='rutina'?'<circle cx="12" cy="13" r="8"/>':''}<path d="${paths[topic.kind==='grammar'?'grammar':topic.id]}"/></svg>`;
}
function mediaPath(group,key) {
  const path=window.MEDIA?.[group]?.[key];
  if(typeof path!=='string'||!path.trim())return null;
  // Own files on this site, or a public HTTPS image supplied by the author.
  if(/^https:\/\//.test(path))return path;
  if(/^(?:assets\/|\/assets\/)[\w\-./%]+$/i.test(path)&&!path.includes('..'))return path;
  return null;
}
function imageFor(item,small=false) {
  let path=mediaPath('vocabulary',item.asset);
  // The original animal PNGs are already the right size for an 85px memory card.
  if(small&&/^animales\/[a-z]+$/.test(item.asset))path=`assets/animales/${item.asset.split('/')[1]}.png`;
  return path?`<img class="activity-image" draggable="false" src="${escapeHTML(path)}" alt="${escapeHTML(item.clue||item.memoryClue||'')}" loading="${small?'eager':'lazy'}" decoding="async">`:'';
}
function formatInfo(topic,mode) {
  const format=activityFormat(topic,mode);
  if(format==='basket'&&topic.id==='ropa')return ['Prepara la maleta',FORMAT_INFO.basket[1]];
  if(format==='flashcards'&&topic.id==='colores')return ['Tu caja de colores','Descubre los doce colores. Mira cada pintura, escribe su nombre y, si lo necesitas, voltea la tarjeta para aprenderlo.'];
  if(format==='identify'&&topic.id==='rutina')return ['¿Qué está haciendo?',`Mira cada ilustración y escribe la acción en infinitivo en ${languages[currentLanguage].name.toLowerCase()}.`];
  if(format==='identify'&&activityItems(topic,mode).every(item=>mediaPath('vocabulary',item.asset)))return ['Mira y escribe','Mira cada ilustración y escribe la palabra. Puedes abrir una pista si la necesitas.'];
  if(format==='order'&&topic.id==='rutina')return ['Construye las frases','Mira la acción y pulsa todas las palabras para construir una frase. Empieza por la palabra con mayúscula y termina con la que lleva punto.'];
  if(format==='truefalse'&&topic.kind==='grammar')return ['¿Está bien escrito?','Decide si la frase es gramaticalmente correcta.'];
  if(format==='memory'){const count=activityItems(topic,mode).length+(topic.memoryExtra||[]).length;return [`Memory: ${count*2} tarjetas`,`Encuentra ${count} parejas: una palabra y su imagen o significado. Pulsa dos tarjetas para descubrirlas.`];}
  if(format==='wordsearch')return ['Sopa de letras',`Busca ${activityItems(topic,mode).length} palabras. Pulsa la primera letra y después la última. Pueden ir en horizontal, vertical o diagonal.`];
  return FORMAT_INFO[format];
}
function renderActivities(id,topicId,modeId) {
  const topics=window.CURRICULUM[id],content=document.querySelector('#section-content');
  if(!topicId) {
    const count=topics.reduce((n,t)=>n+topicDone(id,t.id),0);
    content.innerHTML=`<div class="activity-heading"><div><p class="eyebrow">HOY, ¿QUÉ TE APETECE PRACTICAR?</p><h2>Tu próxima pequeña conquista.</h2><p>Elige un tema: te esperan juegos, historias y nuevas formas de aprender.</p></div><span class="level">10 temas · 50 actividades</span></div><div class="catalog-summary"><span>Tu progreso en este navegador</span><strong>${count} / 50 completadas</strong><progress aria-label="Actividades completadas en este navegador" max="50" value="${count}"></progress></div>${['grammar','vocabulary'].map(kind=>`<section class="topic-section" aria-labelledby="heading-${kind}"><div class="topic-section-title"><h3 id="heading-${kind}">${kind==='grammar'?'Juega con la gramática':'Palabras para tu mundo'}</h3><span>5 temas para explorar</span></div><div class="topic-grid">${topics.filter(t=>t.kind===kind).map(t=>`<a class="topic-card" href="${topicPath(id,t.id)}"><span class="topic-icon">${topicIcon(t)}</span><span class="level">${t.level}</span><h3>${t.title}</h3><p>5 actividades · ${topicDone(id,t.id)} completadas</p><span class="topic-open">Explorar el tema <span aria-hidden="true">→</span></span></a>`).join('')}</div></section>`).join('')}${resetArea(id)}<p class="progress-note">Este contador es solo de este navegador y dispositivo, no de todos los visitantes. Si compartes el dispositivo, compartes el progreso. Se guarda al completar una actividad y no se sincroniza; si borras los datos del navegador, se pierde.</p>`;return;
  }
  const topic=topics.find(t=>t.id===topicId);
  if(topic&&modeId==='resumen'){renderTopicSummary(id,topic);return;}
  if(!topic||(modeId&&!/^[1-5]$/.test(modeId))) {content.innerHTML=`<div class="empty-books"><h2>No encontramos esta actividad.</h2><a class="button dark" href="#/${id}/actividades">Ver todos los temas</a></div>`;return;}
  document.title=`${topic.title} · ${languages[id].name} | chavebooks`;
  if(!modeId) {
    content.innerHTML=`<a class="back topic-back" href="#/${id}/actividades">← Todos los temas</a><div class="topic-welcome"><span class="welcome-icon">${topicIcon(topic)}</span><div><p class="eyebrow">${topic.kind==='grammar'?'GRAMÁTICA':'VOCABULARIO'} · ${topic.level}</p><h2>${topic.title}</h2><p>Elige tu actividad de hoy.</p></div><span class="completion-badge">${topicDone(id,topic.id)} / 5</span></div><div class="mode-grid">${topic.formats.map((format,i)=>{const [title,description]=formatInfo(topic,i+1);return `<a class="mode-card" href="${topicPath(id,topic.id)}/${i+1}"><span class="mode-index">ACTIVIDAD 0${i+1} ${isDone(id,topic.id,i+1)?'· COMPLETADA':''}</span><h3>${title}</h3><p>${description}</p><span class="topic-open">${isDone(id,topic.id,i+1)?'Volver a practicar':'¡Vamos allá!'} →</span></a>`;}).join('')}</div>${resetArea(id,topic.id)}`;return;
  }
  const mode=Number(modeId),format=activityFormat(topic,mode);
  window.trackLearningEvent?.('Activity Started',{language:id,topic:topic.id,format});
  renderExerciseShell(id,topic,mode);
  if(format==='wordsearch')renderWordSearch(id,topic,mode);
  else if(format==='crossword')renderCrossword(id,topic,mode);
  else if(format==='memory')renderMemory(id,topic,mode);
  else renderStandard(id,topic,mode);
}
let activeLesson=null;
let practice={};
try {const data=JSON.parse(localStorage.getItem('chavebooks-attempts-v1')||'{}');if(data&&typeof data==='object'&&!Array.isArray(data))practice=data;}catch{}
function savePractice(){try{localStorage.setItem('chavebooks-attempts-v1',JSON.stringify(practice));}catch{}}
function recordPractice(delta){
  if(!activeLesson)return;
  const {id,topic,mode}=activeLesson,key=activityKey(id,topic.id,mode),row=practice[key]||{};
  for(const [name,n]of Object.entries(delta)){const previous=Number(row[name]);row[name]=(Number.isFinite(previous)&&previous>=0?previous:0)+n;}
  practice[key]=row;savePractice();
}
function resetArea(id,topic='') {
 return `<div class="reset-area"><button type="button" class="reset" data-reset-progress="${id}/${topic}">${topic?'Reiniciar este tema':'Reiniciar progreso del idioma'}</button><div class="reset-confirmation" hidden></div></div>`;
}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-reset-progress]');if(!button)return;
 const scope=button.dataset.resetProgress,[id,topic]=scope.split('/');
 if(!window.CURRICULUM[id]||(topic&&!window.CURRICULUM[id].some(t=>t.id===topic)))return;
 const panel=button.nextElementSibling;panel.hidden=false;
 panel.innerHTML='<p>¿Reiniciar el progreso guardado? Solo afecta a esta selección en este navegador.</p><button type="button" class="button dark confirm-reset">Sí, reiniciar</button> <button type="button" class="reset cancel-reset">Cancelar</button>';
 panel.querySelector('.cancel-reset').onclick=()=>{panel.hidden=true;panel.replaceChildren();button.focus();};
 panel.querySelector('.confirm-reset').onclick=()=>{
  const prefix=topic?`${id}/${topic}/`:`${id}/`;
  for(const state of [completed,practice])for(const key of Object.keys(state))if(key.startsWith(prefix))delete state[key];
  try{localStorage.setItem('chavebooks-progress-v1',JSON.stringify(completed));}catch{}
  savePractice();route();document.querySelector('#section-content').scrollIntoView();
 };
});
function renderExerciseShell(id,topic,mode) {
 activeLesson={id,topic,mode};
 const [title,instruction]=formatInfo(topic,mode),code=languages[id].htmlLang;
 document.querySelector('#section-content').setAttribute('lang',code);
 const helpTargets=['espanol','ingles','ruso'].filter(target=>target!==id);
 const help=`<div class="instruction-helps">${helpTargets.map(target=>{
  const label={espanol:'Ver traducción en español',ingles:'Help in English',ruso:'Смотреть перевод на русском'}[target];
  let text=lessonText(instruction,target);
  // Generic writing instructions must name the language being studied, even in a translation.
  if(target==='ingles'&&id!=='ingles')text=text.replaceAll('in English',id==='espanol'?'in Spanish':'in Russian');
  if(target==='ruso'&&id!=='ruso')text=text.replaceAll('по-русски',id==='espanol'?'по-испански':'по-английски');
  return `<details class="instruction-help" data-no-translate lang="${languages[target].htmlLang}"><summary>${label}</summary><p>${escapeHTML(text)}</p></details>`;
 }).join('')}</div>`;

 document.querySelector('#section-content').innerHTML=`<a class="back topic-back" href="${topicPath(id,topic.id)}">← Las cinco actividades de ${topic.title}</a><div class="exercise-heading"><p class="eyebrow">${topic.title} · ACTIVIDAD ${mode} DE 5</p><h2>${title}</h2><p>${instruction}</p>${help}</div><div class="exercise-steps" aria-label="Las cinco actividades">${topic.formats.map((_,i)=>`<a href="${topicPath(id,topic.id)}/${i+1}" aria-label="Actividad ${i+1}: ${formatInfo(topic,i+1)[0]}" ${mode===i+1?'aria-current="page"':''}>${i+1}${isDone(id,topic.id,i+1)?'<span aria-hidden="true">✓</span>':''}</a>`).join('')}</div><div id="exercise-stage"></div><nav class="exercise-next" aria-label="Continuar practicando"><a href="${topicPath(id,topic.id)}">Ver las cinco actividades</a>${mode<5?`<a class="button dark" href="${topicPath(id,topic.id)}/${mode+1}">Siguiente actividad →</a>`:`<a class="button dark" href="#/${id}/actividades">Elegir otro tema →</a>`}</nav><div id="topic-celebration"></div><div id="book-recommendation"></div>`;
}
function finishActivity(id,topic,mode) {
 const key=activityKey(id,topic.id,mode),first=!completed[key];completed[key]=true;
 try {localStorage.setItem('chavebooks-progress-v1',JSON.stringify(completed));}catch{}
 if(first)window.trackLearningEvent?.('Activity Completed',{language:id,topic:topic.id,format:activityFormat(topic,mode)});
 const step=document.querySelector('.exercise-steps [aria-current]');if(step&&!step.querySelector('span'))step.insertAdjacentHTML('beforeend','<span aria-hidden="true">✓</span>');
 if(topicDone(id,topic.id)===5){const next=document.querySelector('.exercise-next .button');next.href=`${topicPath(id,topic.id)}/resumen`;next.textContent='Ver mi resumen →';document.querySelector('#topic-celebration').innerHTML=`<aside class="topic-celebration"><h2>¡Tema completado!</h2><p>Completaste las cinco actividades.</p><a class="button dark" href="${topicPath(id,topic.id)}/resumen">Ver mi resumen →</a></aside>`;}
 recommendBook(id,topic);
}
function renderTopicSummary(id,topic){
 document.title=`${{espanol:'Resumen',ingles:'Summary',ruso:'Итоги'}[id]} · ${topic.title} | chavebooks`;
 activeLesson=null;
 const other=window.CURRICULUM[id].filter(t=>t.id!==topic.id&&t.kind==='vocabulary').slice(0,4);
 const done=topicDone(id,topic.id)===5;
 document.querySelector('#section-content').innerHTML=`<a class="back" href="${topicPath(id,topic.id)}">← Las cinco actividades de ${topic.title}</a><section class="topic-celebration summary-page"><p class="eyebrow">${escapeHTML(topic.title)}</p><h2>${done?'¡Felicidades!':'Tu práctica, paso a paso'}</h2><p>${done?'Completaste las cinco actividades.':'Aún puedes seguir practicando este tema.'}</p><ol class="practice-report">${topic.formats.map((_,i)=>{const row=practice[activityKey(id,topic.id,i+1)],safe=key=>Number.isFinite(row?.[key])&&row[key]>=0?row[key]:0;return `<li><a href="${topicPath(id,topic.id)}/${i+1}">${i+1}. ${formatInfo(topic,i+1)[0]}</a><p>${row?`<span>Comprobaciones: ${safe('checks')}</span><span>Respuestas por revisar: ${safe('errors')}</span><span>Soluciones consultadas: ${safe('solutions')}</span>${row.memoryMisses?`<span>Parejas por revisar: ${safe('memoryMisses')}</span>`:''}`:'Sin datos de intentos anteriores.'}</p></li>`;}).join('')}</ol><p class="progress-note">El resumen cuenta las respuestas revisadas, no es una nota de examen.</p><a class="button dark" href="#/${id}/actividades">Elegir otro tema →</a>${resetArea(id,topic.id)}</section><h2 class="more-topics-heading">Más temas para explorar</h2><div class="topic-grid">${other.map(t=>`<a class="topic-card" href="${topicPath(id,t.id)}"><span class="topic-icon">${topicIcon(t)}</span><h3>${t.title}</h3><span class="topic-open">Explorar el tema →</span></a>`).join('')}</div><div id="book-recommendation"></div>`;
 recommendBook(id,topic);
}
function recommendBook(id,topic) {
  const target=document.querySelector('#book-recommendation');
  const related={animales:'74565343',colores:'74565262',ropa:'74565262',rutina:'74019993',frutas:'74565262'};
  const book=(window.LIBROS||[]).find(b=>b.language===id&&b.id===related[topic.id])||(window.LIBROS||[]).find(b=>b.language===id);
  if(!book){target.innerHTML=`<aside class="related-book no-book"><h3>¡Un paso más en tu aprendizaje!</h3><p>Los libros de ruso estarán disponibles próximamente. Mientras tanto, cuéntame qué actividad te gustaría practicar.</p><a href="https://www.instagram.com/chave_books/" target="_blank" rel="noopener noreferrer">Escríbeme en Instagram →</a></aside>`;return;}
  target.innerHTML=`<aside class="related-book"><div>${bookCover(book)}</div><section><p class="eyebrow">SIGUE APRENDIENDO</p><h3>¿Te gustó? Sigue con <em>${escapeHTML(book.title)}</em>.</h3>${bookSubtitle(book)}<p>${escapeHTML(book.description)}</p>${bookExtras(book)}<p class="book-audience">Para ${escapeHTML(book.audience)} que quieren aprender ${languages[id].name.toLowerCase()}.</p><a class="button dark" href="#/${id}/libros/${book.id}">Descubrir este libro →</a></section></aside>`;
}
function feedbackFor(element,correct,answers) {
  element.replaceChildren();element.className=`feedback ${correct?'correct':'incorrect'}`;
  const text=document.createElement('span');text.textContent=correct?'✓ ¡Correcto!':'Revisa tu respuesta. Puedes intentarlo otra vez.';element.append(text);
  if(!correct){const button=document.createElement('button');button.type='button';button.className='reveal-solution';button.textContent='Ver solución';button.setAttribute('aria-expanded','false');const solution=document.createElement('span');solution.className='solution';solution.hidden=true;button.addEventListener('click',()=>{if(solution.hidden)recordPractice({solutions:1});solution.hidden=!solution.hidden;solution.textContent=solution.hidden?'':`Solución: ${answers[0]}`;button.textContent=solution.hidden?'Ver solución':'Ocultar solución';button.setAttribute('aria-expanded',String(!solution.hidden));});element.append(button,solution);}
}
function expectedAnswers(topic,mode,item) {return activityFormat(topic,mode)==='order'?[fullSentence(item),...(item.orders||[])]:[item.answer,...(item.aliases||[])];}
function letterClue(answer){return Array.from(answer).map(letter=>/[aeiouáéíóúаеёиоуыэюя]/i.test(letter)?'<span class="letter-gap" aria-hidden="true"></span>':escapeHTML(letter)).join('');}
function renderStandard(id,topic,mode) {
  const format=activityFormat(topic,mode),items=activityItems(topic,mode),vocabulary=topic.kind==='vocabulary',lang=languages[id].htmlLang;
  const sequenceHours=['07:00','07:15','07:45','09:00','22:00'];
  const questions=items.map((source,i)=>{
    const item={...source};let prompt=item.prompt,control='',answers=expectedAnswers(topic,mode,item);
    if(format==='colorcontext'){
      prompt=escapeHTML(item.prompt);control=imageFor(item);
    }else if(format==='colorhunt'){
      prompt=`Encuentra: <strong lang="${lang}">${escapeHTML(item.answer)}</strong>`;
    }else if(format==='picturechoice'){
      prompt='';control=imageFor(item);
    }else if(format==='fruitletters'){
      prompt='';
      control=`${imageFor(item)}<p class="scrambled" lang="${lang}" aria-label="Nombre con letras que faltan">${letterClue(item.answer)}</p>`;
    }else if(format==='basket'){
      prompt=escapeHTML(item.orderLabel);
      control=`<div class="basket-order"><button type="button" class="basket-target" data-question="${i}" aria-label="Colocar fruta en el pedido ${i+1}"><span>Coloca aquí tu elección</span></button><input type="hidden" name="q${i}" id="answer-${i}"></div>`;
    }else if(format==='identify'){
      const image=imageFor(item);prompt=image?`Imagen ${i+1}`:item.clue;
      control=image?`<div class="picture-card">${image}<details><summary>Una pista</summary><p>${escapeHTML(item.clue)}</p></details></div>`:'';
    }else if(format==='match')prompt=topic.matchClues[i];
    else if(format==='flashcards') {prompt=topic.id==='colores'?'':item.flashClue||item.memoryClue;control=`${imageFor(item)}<div class="flashcard"><button type="button" class="flip-card" aria-expanded="false">Voltear tarjeta</button><span class="flash-answer" hidden></span></div>`;}
    else if(format==='truefalse') {
      if(vocabulary){if(topic.id==='animales')control=imageFor(item);prompt=`<strong lang="${lang}">${escapeHTML(item.answer)}</strong>: ${escapeHTML(topic.facts[i][0])}`;answers=[String(topic.facts[i][1])];}
      else {prompt=escapeHTML(item.prompt.replace('___',i%2===0?item.answer:item.wrong));answers=[String(i%2===0)];}
    }else if(format==='sequence'){prompt=`${sequenceHours[i]} · ${['Al salir de la cama','En la ducha, con agua y jabón','La primera comida del día','Con el libro para aprender','Con las luces apagadas para descansar'][i]}`;}
    else if(format==='detective')prompt=escapeHTML(item.prompt).replace('___',`<mark>${escapeHTML(item.wrong)}</mark>`);
    else if(['choice','write','text','letters'].includes(format))prompt=`${escapeHTML(item.prompt)}${topic.id==='plural'?'':` (${escapeHTML(item.hint)})`}`;
    if(topic.kind==='grammar'&&item.asset)control=imageFor(item)+control;
    if(format==='context'&&topic.id==='ropa')control=imageFor(item)+control;
    if(format==='letters')control+=`<p class="scrambled" lang="${lang}">${letterClue(item.answer)}</p>`;
    if(format==='colorhunt'){
      control=`<div class="color-hunt-options">${shuffled([item,...shuffled(topic.items.filter(color=>color.key!==item.key),i+31).slice(0,5)],i+11).map((color,j)=>`<label><input type="radio" name="q${i}" value="${escapeHTML(color.answer)}" required aria-label="${escapeHTML(color.clue)}"><span>${imageFor(color)}</span></label>`).join('')}</div>`;
    }else if(format==='choice'||format==='truefalse'||format==='picturechoice'){
      const options=format==='truefalse'?[['true',vocabulary?'Verdadero':'Correcta'],['false',vocabulary?'Falso':'Incorrecta']]:format==='picturechoice'?shuffled([item.answer,...shuffled(topic.items.filter(other=>other.key!==item.key),i+31).slice(0,2).map(other=>other.answer)],i+mode).map(option=>[option,option]):shuffled(item.options||[item.answer,item.wrong],i+mode).map(option=>[option,option]);
      control+=`<div class="answers">${options.map(([value,text])=>`<label><input type="radio" name="q${i}" value="${escapeHTML(value)}" required><span>${escapeHTML(text)}</span></label>`).join('')}</div>`;
    }else if(format==='match'||format==='sequence')control+=`<select id="answer-${i}" name="q${i}" required aria-labelledby="question-${i}" lang="${lang}"><option value="">Elige una opción</option>${shuffled(items.map(x=>x.answer),i+mode).map(a=>`<option value="${escapeHTML(a)}">${escapeHTML(a)}</option>`).join('')}</select>`;
    else if(format==='order'){
      prompt='';
      if(topic.id==='rutina')control=imageFor(item)+control;
      control+=`<div class="word-slots" id="slots-${i}" aria-label="Tu frase" lang="${lang}"></div><div class="word-bank" data-question="${i}" lang="${lang}">${shuffled(fullSentence(item).split(' '),i+9).map((word,j)=>`<button type="button" class="word-token" data-token="${j}" data-word="${escapeHTML(word)}" aria-label="Añadir ${escapeHTML(word)}">${escapeHTML(word)}</button>`).join('')}</div><input type="hidden" name="q${i}" id="answer-${i}">`;
    }else if(format==='actionstory'){
      prompt='';
      const parts=item.prompt.split('___');
      control=`<div class="action-story-line" lang="${lang}"><span>${escapeHTML(parts[0])}</span><span class="action-story-gap">${imageFor(item)}<input class="written-answer" id="answer-${i}" name="q${i}" type="text" required autocomplete="off" autocapitalize="off" spellcheck="false" lang="${lang}" aria-label="Verbo que falta en la parte ${i+1}" aria-describedby="story-${i}" placeholder="Verbo"></span><span>${escapeHTML(parts[1])}</span><span class="visually-hidden" id="story-${i}">${escapeHTML(item.prompt.replace('___','[hueco]'))}</span></div>`;
    }
    else if(format==='colorcontext'&&item.parts){
      const join=id==='ingles'?'and':id==='ruso'?'и':'y';
      control+=`<div class="two-colours"><input class="written-answer colour-part" data-question="${i}" data-part="0" type="text" required autocomplete="off" aria-label="Primer color" lang="${lang}"><span>${join}</span><input class="written-answer colour-part" data-question="${i}" data-part="1" type="text" required autocomplete="off" aria-label="Segundo color" lang="${lang}"><input type="hidden" id="answer-${i}" name="q${i}"></div>`;
    }else if(format!=='basket')control+=`<input class="written-answer" id="answer-${i}" name="q${i}" type="text" required autocomplete="off" autocapitalize="off" spellcheck="false" lang="${lang}" aria-labelledby="question-${i}" placeholder="${format==='detective'?'Solo la parte corregida':'Escribe tu respuesta'}">`;
    prompt=String(prompt||'');
    if(format==='colorcontext'||(format==='context'&&topic.id==='frutas'))prompt=prompt.replace(/\s*___[.!]?/g,'').trim().replace(/[.:]+$/,'')+':';
    else prompt=prompt.replaceAll('___','<span class="inline-gap" aria-label="Hueco"></span>');
    return {html:`<fieldset class="question"><legend id="question-${i}"><span class="question-number">0${i+1}</span> ${prompt}</legend>${control}<div class="feedback" id="feedback-${i}" aria-live="polite"></div></fieldset>`,answers};
  });
  const basketBank=format==='basket'?`<section class="basket-bank" aria-label="Tarjetas ilustradas"><p>Elige una tarjeta y después su pedido. También puedes arrastrar.</p><div class="fruit-cards">${shuffled(items,8).map(item=>`<button type="button" class="fruit-card" draggable="true" data-fruit="${escapeHTML(item.key)}" aria-pressed="false">${imageFor(item)}</button>`).join('')}</div><p id="basket-selection" role="status" aria-live="polite">Ninguna tarjeta seleccionada.</p></section>`:'';
  document.querySelector('#exercise-stage').innerHTML=`${basketBank}${format==='context'?`<div class="vocabulary-bank"><strong>Banco de palabras</strong><p lang="${lang}">${shuffled(items.map(x=>x.answer),4).map(w=>`<span>${escapeHTML(w)}</span>`).join('')}</p></div>`:''}<form id="exercise"><div class="exercise-meta"><span>${format==='text'?'Una historia con cinco huecos':`${questions.length} retos para practicar`}</span><span>${topic.level} · Sin prisas</span></div><div class="${['text','actionstory'].includes(format)?'story-sheet':''}">${questions.map(q=>q.html).join('')}</div><div class="exercise-actions"><button class="button dark" type="submit">Comprobar respuestas →</button><button class="reset" type="reset">Volver a empezar</button></div><div id="result" class="result" role="status" aria-live="polite"></div></form>`;
  const form=document.querySelector('#exercise');
  form.querySelectorAll('.colour-part').forEach(input=>input.addEventListener('input',()=>{const i=input.dataset.question,parts=[...form.querySelectorAll(`.colour-part[data-question="${i}"]`)].map(el=>el.value.trim());form.querySelector(`[name="q${i}"]`).value=parts.every(Boolean)?parts.join(id==='ingles'?' and ':id==='ruso'?' и ':' y '):'';}));
  const clear=()=>{form.querySelectorAll('.feedback').forEach(el=>{el.replaceChildren();el.className='feedback';});document.querySelector('#result').textContent='';document.querySelector('#book-recommendation').replaceChildren();};
  if(format==='basket') {
    let selected=null;
    const cards=[...document.querySelectorAll('.fruit-card')];
    const choose=key=>{selected=items.find(item=>item.key===key)||null;cards.forEach(card=>card.setAttribute('aria-pressed',String(card.dataset.fruit===key)));document.querySelector('#basket-selection').textContent=selected?`Has elegido: ${selected.answer}. Ahora elige su pedido.`:'Ninguna tarjeta seleccionada.';};
    const place=target=>{if(!selected){document.querySelector('#result').textContent='Elige primero una tarjeta.';return;}clear();document.querySelector(`#answer-${target.dataset.question}`).value=selected.answer;target.querySelector('span').innerHTML=imageFor(selected,true)||escapeHTML(selected.answer);target.classList.add('filled');choose(null);};
    cards.forEach(card=>{card.addEventListener('click',()=>choose(card.dataset.fruit));card.addEventListener('dragstart',event=>{choose(card.dataset.fruit);event.dataTransfer.setData('text/plain',card.dataset.fruit);event.dataTransfer.effectAllowed='copy';});});

    form.querySelectorAll('.basket-target').forEach(target=>{target.addEventListener('click',()=>place(target));target.addEventListener('dragover',event=>event.preventDefault());target.addEventListener('drop',event=>{event.preventDefault();const key=event.dataTransfer.getData('text/plain');if(items.some(item=>item.key===key)){choose(key);place(target);}});});
    form.addEventListener('reset',()=>{choose(null);form.querySelectorAll('.basket-target').forEach(target=>{target.classList.remove('filled');target.querySelector('span').textContent='Coloca aquí tu elección';});});
  }
  form.querySelectorAll('.flip-card').forEach((button,i)=>button.addEventListener('click',()=>{const answer=button.nextElementSibling;if(answer.hidden)recordPractice({solutions:1});answer.hidden=!answer.hidden;answer.textContent=answer.hidden?'':items[i].answer;button.textContent=answer.hidden?'Voltear tarjeta':'Ocultar palabra';button.setAttribute('aria-expanded',String(!answer.hidden));}));
  form.querySelectorAll('.word-bank').forEach(bank=>{
    const i=Number(bank.dataset.question),slots=document.querySelector(`#slots-${i}`),input=document.querySelector(`#answer-${i}`);
    const sync=()=>{input.value=[...slots.querySelectorAll('button')].map(b=>b.dataset.word).join(' ');clear();};
    bank.addEventListener('click',event=>{const button=event.target.closest('button');if(!button||button.disabled)return;const chosen=button.cloneNode(true);chosen.setAttribute('aria-label',`Quitar ${button.dataset.word}`);button.disabled=true;slots.append(chosen);chosen.addEventListener('click',()=>{button.disabled=false;chosen.remove();sync();button.focus();});sync();});
  });
  form.addEventListener('input',clear);form.addEventListener('change',clear);
  form.addEventListener('reset',()=>{clear();form.querySelectorAll('input[type="hidden"]').forEach(input=>{input.value='';input.defaultValue='';});form.querySelectorAll('.word-slots').forEach(el=>el.replaceChildren());form.querySelectorAll('.word-bank button').forEach(b=>b.disabled=false);form.querySelectorAll('.flash-answer').forEach(el=>{el.hidden=true;el.textContent='';});form.querySelectorAll('.flip-card').forEach(b=>{b.textContent='Voltear tarjeta';b.setAttribute('aria-expanded','false');});});
  form.addEventListener('submit',event=>{
    event.preventDefault();const values=new FormData(form);if(questions.some((_,i)=>!String(values.get(`q${i}`)||'').trim())){document.querySelector('#result').textContent='Completa todas las respuestas antes de comprobar.';return;}
    let score=0;questions.forEach((q,i)=>{const response=values.get(`q${i}`);const correct=q.answers.some(a=>normalizeAnswer(a)===normalizeAnswer(response));if(correct)score++;const solutions=format==='truefalse'?[vocabulary?(q.answers[0]==='true'?'Verdadero':'Falso'):`${q.answers[0]==='true'?'La frase es correcta.':'La frase es incorrecta.'} Forma correcta: ${fullSentence(items[i])}`]:q.answers;feedbackFor(document.querySelector(`#feedback-${i}`),correct,solutions);});
    document.querySelector('#result').textContent=`${score} de ${questions.length} respuestas correctas. ${score===questions.length?'¡Actividad completada!':'Puedes volver a intentarlo o abrir las soluciones que necesites.'}`;
    recordPractice({checks:1,errors:questions.length-score});
    if(score===questions.length)finishActivity(id,topic,mode);
  });
}
function renderMemory(id,topic,mode) {
 const items=[...activityItems(topic,mode),...(topic.memoryExtra||[])],cards=shuffled(items.flatMap((item,i)=>[{pair:i,side:'word',text:item.answer},{pair:i,side:'meaning',text:item.memoryClue}]),7);
 const stage=document.querySelector('#exercise-stage');
 stage.innerHTML=`<section class="puzzle-panel" id="memory-board" aria-busy="true"><p id="memory-loading" role="status">Cargando las imágenes…</p><div class="memory-grid">${cards.map((card,i)=>`<button class="memory-card" type="button" data-card="${i}" disabled aria-label="Tarjeta ${i+1}, oculta"><span class="memory-back" aria-hidden="true">?</span><span class="memory-front" hidden>${card.side==='meaning'?(imageFor(items[card.pair],true)||escapeHTML(card.text)):`<span lang="${languages[id].htmlLang}">${escapeHTML(card.text)}</span>`}</span></button>`).join('')}</div><div id="result" class="result" role="status" aria-live="polite">0 de ${items.length} parejas</div><div class="exercise-actions"><button type="button" class="reset" id="reset-game">Volver a empezar</button><button type="button" class="reveal-solution" id="memory-help" aria-expanded="false">Ver las parejas</button></div><div id="memory-solutions" hidden></div></section>`;
 let open=[],matches=0,locked=false;const buttons=[...stage.querySelectorAll('.memory-card')];
 const pictures=[...stage.querySelectorAll('img')];
 Promise.all(pictures.map(img=>new Promise(resolve=>{
  const ready=()=>{if(!img.naturalWidth)img.replaceWith(document.createTextNode(img.alt));resolve();};
  if(img.complete)ready();else{img.addEventListener('load',ready,{once:true});img.addEventListener('error',ready,{once:true});}
 }))).then(()=>{if(!stage.contains(buttons[0]))return;buttons.forEach(b=>b.disabled=false);stage.querySelector('#memory-board').setAttribute('aria-busy','false');stage.querySelector('#memory-loading').remove();});
 const close=index=>{const button=buttons[index];button.querySelector('.memory-front').hidden=true;button.querySelector('.memory-back').hidden=false;button.setAttribute('aria-label',lessonText(`Tarjeta ${index+1}, oculta`,id));button.classList.remove('flipped');};
 buttons.forEach((button,i)=>button.addEventListener('click',()=>{
  if(locked||button.disabled||open.includes(i))return;
  button.querySelector('.memory-front').hidden=false;button.querySelector('.memory-back').hidden=true;button.setAttribute('aria-label',cards[i].text);button.classList.add('flipped');open.push(i);
  if(open.length!==2)return;
  const [a,b]=open;recordPractice({checks:1});
  if(cards[a].pair===cards[b].pair){buttons[a].disabled=true;buttons[b].disabled=true;buttons[a].classList.add('matched');buttons[b].classList.add('matched');open=[];matches++;stage.querySelector('#result').textContent=`${matches} de ${items.length} parejas${matches===items.length?' · ¡Actividad completada!':''}`;if(matches===items.length)finishActivity(id,topic,mode);}
  else{locked=true;recordPractice({memoryMisses:1});stage.querySelector('#result').textContent=`${matches} de ${items.length} parejas. No forman pareja; prueba otras tarjetas.`;setTimeout(()=>{if(!stage.contains(buttons[0]))return;open.forEach(close);open=[];locked=false;},1100);}
 }));
 stage.querySelector('#reset-game').addEventListener('click',()=>{document.querySelector('#book-recommendation').replaceChildren();renderMemory(id,topic,mode);});
 stage.querySelector('#memory-help').addEventListener('click',event=>{const el=stage.querySelector('#memory-solutions');if(el.hidden)recordPractice({solutions:1});el.hidden=!el.hidden;event.target.setAttribute('aria-expanded',String(!el.hidden));el.innerHTML=el.hidden?'':`<ul>${items.map(item=>`<li>${escapeHTML(item.answer)} — ${escapeHTML(item.memoryClue)}</li>`).join('')}</ul>`;});
}
function makeWordSearch(items) {
  const words=items.map(item=>puzzleWord(item.answer)),size=Math.max(10,...words.map(w=>w.length+1));
  const grid=Array.from({length:size},()=>Array(size).fill('')),placements=[];
  const directions=[[0,1],[1,0],[1,1],[0,-1],[1,-1]];
  let state=87;const random=n=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state%n;};
  words.forEach(word=>{let placed=false;for(let attempt=0;attempt<500&&!placed;attempt++){
    const [dr,dc]=directions[random(directions.length)],r=random(size),c=random(size),cells=Array.from(word,(letter,k)=>({r:r+dr*k,c:c+dc*k,letter}));
    if(cells.every(p=>p.r>=0&&p.c>=0&&p.r<size&&p.c<size&&(!grid[p.r][p.c]||grid[p.r][p.c]===p.letter))){cells.forEach(p=>grid[p.r][p.c]=p.letter);placements.push(cells);placed=true;}
  }if(!placed)throw new Error('No se pudo crear la sopa de letras');});
  const alphabet=/[А-Я]/.test(words.join(''))?'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ':'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  grid.forEach(row=>row.forEach((_,c)=>{if(!row[c])row[c]=alphabet[random(alphabet.length)];}));return {grid,placements,size,words};
}
function renderWordSearch(id,topic,mode) {
  const items=activityItems(topic,mode),puzzle=makeWordSearch(items),found=new Set();let first=null;
  document.querySelector('#exercise-stage').innerHTML=`<section class="puzzle-panel"><div class="puzzle-clues">${items.map((item,i)=>`<div class="puzzle-clue" id="clue-${i}">${imageFor(item)||`<span>${escapeHTML(item.searchClue)}</span>`}<span class="found-label" aria-live="polite"></span></div>`).join('')}</div><p class="puzzle-instruction">Pulsa el inicio y el final de una palabra. En la cuadrícula se omiten espacios, guiones y tildes.</p><div class="grid-scroll"><div class="letter-grid" style="--grid-size:${puzzle.size}" aria-label="Sopa de letras">${puzzle.grid.flatMap((row,r)=>row.map((letter,c)=>`<button type="button" data-r="${r}" data-c="${c}" aria-label="Fila ${r+1}, columna ${c+1}: ${letter}">${letter}</button>`)).join('')}</div></div><div id="result" class="result" role="status" aria-live="polite">0 de ${items.length} palabras encontradas</div><div id="puzzle-feedback" class="feedback" aria-live="polite"></div><div class="exercise-actions"><button type="button" id="reset-game" class="reset">Volver a empezar</button><button type="button" id="puzzle-help" class="reveal-solution" aria-expanded="false">Ver solución</button></div><div id="puzzle-solution" hidden></div></section>`;
  const grid=document.querySelector('.letter-grid');
  const clearSelection=()=>grid.querySelectorAll('.selected').forEach(el=>el.classList.remove('selected'));
  grid.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;
    const r=Number(button.dataset.r),c=Number(button.dataset.c);document.querySelector('#puzzle-feedback').textContent='';
    if(!first){first={r,c};clearSelection();button.classList.add('selected');return;}
    const dr=r-first.r,dc=c-first.c,length=Math.max(Math.abs(dr),Math.abs(dc));
    if(!length){first=null;clearSelection();return;}
    const valid=dr===0||dc===0||Math.abs(dr)===Math.abs(dc);
    const cells=valid?Array.from({length:length+1},(_,k)=>({r:first.r+Math.sign(dr)*k,c:first.c+Math.sign(dc)*k})):[];
    const text=cells.map(p=>puzzle.grid[p.r][p.c]).join('');const index=puzzle.words.findIndex(word=>word===text||word===Array.from(text).reverse().join(''));
    clearSelection();first=null;
    if(index<0){recordPractice({checks:1,errors:1});document.querySelector('#puzzle-feedback').textContent='Revisa tu selección. Puedes intentarlo otra vez.';return;}
    if(found.has(index)){document.querySelector('#puzzle-feedback').textContent='Esa palabra ya está encontrada. Busca otra.';return;}
    recordPractice({checks:1});found.add(index);cells.forEach(p=>grid.querySelector(`[data-r="${p.r}"][data-c="${p.c}"]`).classList.add('found'));document.querySelector(`#clue-${index} .found-label`).textContent=`✓ ${items[index].answer}`;document.querySelector('#result').textContent=`${found.size} de ${items.length} palabras encontradas${found.size===items.length?' · ¡Actividad completada!':''}`;if(found.size===items.length)finishActivity(id,topic,mode);
  });
  document.querySelector('#reset-game').addEventListener('click',()=>{document.querySelector('#book-recommendation').replaceChildren();renderWordSearch(id,topic,mode);});
  document.querySelector('#puzzle-help').addEventListener('click',event=>{const el=document.querySelector('#puzzle-solution');if(el.hidden)recordPractice({solutions:1});el.hidden=!el.hidden;event.target.setAttribute('aria-expanded',String(!el.hidden));el.innerHTML=el.hidden?'':`<ul>${puzzle.placements.map((cells,i)=>`<li>${escapeHTML(items[i].answer)}: fila ${cells[0].r+1}, columna ${cells[0].c+1} → fila ${cells.at(-1).r+1}, columna ${cells.at(-1).c+1}.</li>`).join('')}</ul>`;});
}
function makeCrossword(items) {
  const size=31,grid=Array.from({length:size},()=>Array(size).fill('')),placements=[];
  const words=items.map((item,index)=>({word:puzzleWord(item.answer),index})).sort((a,b)=>b.word.length-a.word.length);
  function canPlace(word,r,c,dr,dc) {
    let crossings=0;
    if(r<1||c<11||r+dr*(word.length-1)>=size-1||c+dc*(word.length-1)>19)return false;
    if(grid[r-dr][c-dc]||grid[r+dr*word.length][c+dc*word.length])return false;
    for(let k=0;k<word.length;k++){const y=r+dr*k,x=c+dc*k,existing=grid[y][x];if(existing&&existing!==word[k])return false;
      if(existing){
        // A crossing must be perpendicular; two words cannot share a stretch of letters.
        if(placements.some(p=>p.dr===dr&&(dr===0?p.r===y&&x>=p.c&&x<p.c+p.word.length:p.c===x&&y>=p.r&&y<p.r+p.word.length)))return false;
        crossings++;
      }else if((dr===0&&(grid[y-1][x]||grid[y+1][x]))||(dc===0&&(grid[y][x-1]||grid[y][x+1])))return false;
    }return crossings>0;
  }
  const first=words.shift(),startC=Math.floor((size-first.word.length)/2);Array.from(first.word).forEach((l,k)=>grid[15][startC+k]=l);placements.push({...first,r:15,c:startC,dr:0,dc:1});
  let attempts=0;
  function connect(remaining) {
    if(!remaining.length)return true;
    if(++attempts>20000)return false;
    for(const entry of remaining) {
      const candidates=[],seen=new Set();
      for(let r=1;r<size-1;r++)for(let c=1;c<size-1;c++)if(grid[r][c])for(let k=0;k<entry.word.length;k++)if(entry.word[k]===grid[r][c])for(const [dr,dc] of [[1,0],[0,1]]) {
        const y=r-dr*k,x=c-dc*k,key=`${y}/${x}/${dr}`;
        if(!seen.has(key)&&canPlace(entry.word,y,x,dr,dc)){candidates.push({...entry,r:y,c:x,dr,dc});seen.add(key);}
      }
      for(const choice of candidates) {
        const added=[];
        Array.from(entry.word).forEach((letter,k)=>{const r=choice.r+choice.dr*k,c=choice.c+choice.dc*k;if(!grid[r][c])added.push([r,c]);grid[r][c]=letter;});
        placements.push(choice);
        if(connect(remaining.filter(word=>word!==entry)))return true;
        placements.pop();added.forEach(([r,c])=>grid[r][c]='');
      }
    }
    return false;
  }
  if(!connect(words))throw new Error('Crucigrama sin conexión');
  const cells=placements.flatMap(p=>Array.from(p.word,(_,k)=>({r:p.r+p.dr*k,c:p.c+p.dc*k}))),minR=Math.min(...cells.map(p=>p.r)),maxR=Math.max(...cells.map(p=>p.r)),minC=Math.min(...cells.map(p=>p.c)),maxC=Math.max(...cells.map(p=>p.c));
  return {grid: grid.slice(minR,maxR+1).map(row=>row.slice(minC,maxC+1)),placements:placements.map(p=>({...p,r:p.r-minR,c:p.c-minC})).sort((a,b)=>a.index-b.index)};
}
function renderCrossword(id,topic,mode) {
 const items=activityItems(topic,mode),puzzle=makeCrossword(items),numbers=new Map();
 const starts=[...new Set(puzzle.placements.map(p=>`${p.r},${p.c}`))].sort((a,b)=>{const [ar,ac]=a.split(',').map(Number),[br,bc]=b.split(',').map(Number);return ar-br||ac-bc;});
 starts.forEach((key,i)=>numbers.set(key,i+1));
 const ordered=puzzle.placements.map((p,i)=>({p,i})).sort((a,b)=>numbers.get(`${a.p.r},${a.p.c}`)-numbers.get(`${b.p.r},${b.p.c}`));
 document.querySelector('#exercise-stage').innerHTML=`<form class="puzzle-panel" id="crossword-form"><p class="crossword-status" aria-live="polite">Elige una pista</p><div class="grid-scroll"><div class="crossword-grid" style="--grid-size:${puzzle.grid[0].length}" aria-label="Crucigrama">${puzzle.grid.flatMap((row,r)=>row.map((letter,c)=>letter?`<label class="crossword-cell"><span>${numbers.get(`${r},${c}`)||''}</span><input type="text" maxlength="1" autocomplete="off" spellcheck="false" lang="${languages[id].htmlLang}" data-r="${r}" data-c="${c}" aria-label="Fila ${r+1}, columna ${c+1}"></label>`:'<span class="crossword-empty" aria-hidden="true"></span>')).join('')}</div></div><div class="crossword-clue-groups">${[0,1].map(dr=>`<section><h3>${dr?'Vertical':'Horizontal'}</h3><ul class="crossword-clues">${ordered.flatMap(({p,i})=>p.dr!==dr?[]:[`<li><button type="button" class="crossword-clue" data-word="${i}" aria-pressed="false"><strong>${numbers.get(`${p.r},${p.c}`)}.</strong>${imageFor(items[i])}<span>${escapeHTML(items[i].crosswordClue)} <small>(${p.word.length} letras)</small></span></button><div class="feedback" id="feedback-${i}" aria-live="polite"></div></li>`]).join('')}</ul></section>`).join('')}</div><div class="exercise-actions"><button class="button dark" type="submit">Comprobar respuestas →</button><button class="reset" type="reset">Volver a empezar</button></div><div id="result" class="result" role="status" aria-live="polite"></div></form>`;
 const form=document.querySelector('#crossword-form');let selected=0;
 const cellsFor=p=>Array.from(p.word,(_,k)=>form.querySelector(`[data-r="${p.r+p.dr*k}"][data-c="${p.c+p.dc*k}"]`));
 const select=(index,focus=false)=>{
  selected=index;const p=puzzle.placements[index];
  form.querySelectorAll('.crossword-cell').forEach(cell=>cell.classList.remove('word-active'));
  cellsFor(p).forEach(cell=>cell.parentElement.classList.add('word-active'));
  form.querySelectorAll('[data-word]').forEach(clue=>clue.setAttribute('aria-pressed',String(Number(clue.dataset.word)===index)));
  form.querySelector('.crossword-status').textContent=`${numbers.get(`${p.r},${p.c}`)} · ${lessonText(p.dr?'Vertical':'Horizontal',id)} · ${p.word.length} ${id==='ingles'?'letters':id==='ruso'?'букв':'letras'}`;
  if(focus)(cellsFor(p).find(cell=>!cell.value)||cellsFor(p)[0]).focus();
 };
 form.querySelectorAll('[data-word]').forEach(button=>button.onclick=()=>select(Number(button.dataset.word),true));
 const clear=()=>{form.querySelectorAll('.feedback').forEach(el=>el.replaceChildren());form.querySelector('#result').textContent='';document.querySelector('#book-recommendation').replaceChildren();};
 form.addEventListener('focusin',event=>{if(!event.target.matches('.crossword-cell input'))return;const index=puzzle.placements.findIndex((p,i)=>i===selected&&cellsFor(p).includes(event.target));if(index<0){const candidate=puzzle.placements.findIndex(p=>cellsFor(p).includes(event.target));if(candidate>=0)select(candidate);}});
 form.addEventListener('input',event=>{
  if(!event.target.matches('.crossword-cell input'))return;
  event.target.value=puzzleWord(event.target.value).slice(0,1);clear();
  const cells=cellsFor(puzzle.placements[selected]),at=cells.indexOf(event.target);if(event.target.value&&at>=0&&at<cells.length-1)cells[at+1].focus();
 });
 form.addEventListener('keydown',event=>{
  const input=event.target;if(!input.matches('.crossword-cell input'))return;
  const delta={ArrowRight:[0,1],ArrowLeft:[0,-1],ArrowDown:[1,0],ArrowUp:[-1,0]}[event.key];
  if(delta){event.preventDefault();form.querySelector(`[data-r="${Number(input.dataset.r)+delta[0]}"][data-c="${Number(input.dataset.c)+delta[1]}"]`)?.focus();}
  if(event.key==='Backspace'&&!input.value){const cells=cellsFor(puzzle.placements[selected]),i=cells.indexOf(input);if(i>0)cells[i-1].focus();}
 });
 form.addEventListener('reset',()=>{clear();select(0);});
 form.addEventListener('submit',event=>{
  event.preventDefault();let score=0;
  puzzle.placements.forEach((p,i)=>{const text=cellsFor(p).map(cell=>cell.value).join('');const correct=puzzleWord(text)===p.word;if(correct)score++;feedbackFor(form.querySelector(`#feedback-${i}`),correct,[items[i].answer]);});
  recordPractice({checks:1,errors:items.length-score});
  form.querySelector('#result').textContent=`${score} de ${items.length} palabras correctas. ${score===items.length?'¡Actividad completada!':'Revisa las casillas o abre una solución si la necesitas.'}`;
  if(score===items.length)finishActivity(id,topic,mode);
 });
 select(0);
}
