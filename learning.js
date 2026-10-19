const FORMAT_INFO = {
  actionstory: ['Un día en imágenes', 'Completa esta historia en presente. Cada dibujo sustituye a la pista del verbo: escribe solo la forma que falta y fíjate en quién realiza la acción.'],
  picturechoice: ['Elige el nombre', 'Mira la ilustración y elige su nombre entre las tres opciones.'],
  fruitletters: ['Completa las letras', 'Mira la fruta, completa mentalmente las letras que faltan y escribe el nombre entero.'],
  basket: ['Prepara la cesta', 'Elige una tarjeta y pulsa el pedido con la misma fruta, o arrastra la tarjeta hasta él. Coloca cada fruta en su sitio.'],
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
  crossword: ['Un pequeño crucigrama', 'Lee las pistas y completa las casillas. Algunas palabras comparten letras. Escribe sin tildes en las vocales; conserva la ñ y la й.'],
  flashcards: ['Tarjetas para aprender', 'Piensa en la palabra, escríbela y comprueba tu respuesta. Si la necesitas, puedes voltear la tarjeta.'],
  sequence: ['Un día en orden', 'Lee el horario de este día y relaciona cada hora con la acción adecuada.']
};
let completed = {};
try { const saved = JSON.parse(localStorage.getItem('chavebooks-progress-v1') || '{}'); if(saved && typeof saved === 'object' && !Array.isArray(saved)) completed=saved; } catch {}
function activityKey(id,topic,mode) { const revision=window.CURRICULUM?.[id]?.find(t=>t.id===topic)?.revision;return revision?`${id}/${topic}/${revision}/${mode}`:`${id}/${topic}/${mode}`; }
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
function imageFor(item) { const path=mediaPath('vocabulary',item.asset);return path?`<img class="activity-image" src="${escapeHTML(path)}" alt="${escapeHTML(item.clue||item.memoryClue)}" loading="lazy">`:''; }
function formatInfo(topic,mode) {
  const format=activityFormat(topic,mode);
  if(format==='identify'&&topic.id==='rutina')return ['¿Qué está haciendo?','Mira cada ilustración y escribe la acción en infinitivo en el idioma que estudias; por ejemplo, saltar, jump o прыгать. En inglés puedes escribir el verbo con o sin «to».'];
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
    content.innerHTML=`<div class="activity-heading"><div><p class="eyebrow">HOY, ¿QUÉ TE APETECE PRACTICAR?</p><h2>Tu próxima pequeña conquista.</h2><p>Elige un tema: te esperan juegos, historias y nuevas formas de aprender.</p></div><span class="level">10 temas · 50 actividades</span></div><div class="catalog-summary"><span>Tu progreso en este navegador</span><strong>${count} / 50 completadas</strong><progress aria-label="Actividades completadas en este navegador" max="50" value="${count}"></progress></div>${['grammar','vocabulary'].map(kind=>`<section class="topic-section" aria-labelledby="heading-${kind}"><div class="topic-section-title"><h3 id="heading-${kind}">${kind==='grammar'?'Juega con la gramática':'Palabras para tu mundo'}</h3><span>5 temas para explorar</span></div><div class="topic-grid">${topics.filter(t=>t.kind===kind).map(t=>`<a class="topic-card" href="${topicPath(id,t.id)}"><span class="topic-icon">${topicIcon(t)}</span><span class="level">${t.level}</span><h3>${t.title}</h3><p>5 actividades · ${topicDone(id,t.id)} completadas</p><span class="topic-open">Explorar el tema <span aria-hidden="true">→</span></span></a>`).join('')}</div></section>`).join('')}<p class="progress-note">Este contador es solo de este navegador y dispositivo, no de todos los visitantes. Si compartes el dispositivo, compartís el progreso. Se guarda al completar una actividad y no se sincroniza; si borras los datos del navegador, se pierde.</p>`;return;
  }
  const topic=topics.find(t=>t.id===topicId);
  if(!topic||(modeId&&!/^[1-5]$/.test(modeId))) {content.innerHTML=`<div class="empty-books"><h2>No encontramos esta actividad.</h2><a class="button dark" href="#/${id}/actividades">Ver todos los temas</a></div>`;return;}
  document.title=`${topic.title} · ${languages[id].name} | chavebooks`;
  if(!modeId) {
    content.innerHTML=`<a class="back topic-back" href="#/${id}/actividades">← Todos los temas</a><div class="topic-welcome"><span class="welcome-icon">${topicIcon(topic)}</span><div><p class="eyebrow">${topic.kind==='grammar'?'GRAMÁTICA':'VOCABULARIO'} · ${topic.level}</p><h2>${topic.title}</h2><p>Elige tu actividad de hoy.</p></div><span class="completion-badge">${topicDone(id,topic.id)} / 5</span></div><div class="mode-grid">${topic.formats.map((format,i)=>{const [title,description]=formatInfo(topic,i+1);return `<a class="mode-card" href="${topicPath(id,topic.id)}/${i+1}"><span class="mode-index">ACTIVIDAD 0${i+1} ${isDone(id,topic.id,i+1)?'· COMPLETADA':''}</span><h3>${title}</h3><p>${description}</p><span class="topic-open">${isDone(id,topic.id,i+1)?'Volver a practicar':'¡Vamos allá!'} →</span></a>`;}).join('')}</div>`;return;
  }
  const mode=Number(modeId),format=activityFormat(topic,mode);
  window.trackLearningEvent?.('Activity Started',{language:id,topic:topic.id,format});
  renderExerciseShell(id,topic,mode);
  if(format==='wordsearch')renderWordSearch(id,topic,mode);
  else if(format==='crossword')renderCrossword(id,topic,mode);
  else if(format==='memory')renderMemory(id,topic,mode);
  else renderStandard(id,topic,mode);
}
function renderExerciseShell(id,topic,mode) {
  const [title,instruction]=formatInfo(topic,mode);
  document.querySelector('#section-content').innerHTML=`<a class="back topic-back" href="${topicPath(id,topic.id)}">← Las cinco actividades de ${topic.title}</a><div class="exercise-heading"><p class="eyebrow">${topic.title} · ACTIVIDAD ${mode} DE 5</p><h2>${title}</h2><p>${instruction}</p></div><div class="exercise-steps" aria-label="Las cinco actividades">${topic.formats.map((_,i)=>`<a href="${topicPath(id,topic.id)}/${i+1}" aria-label="Actividad ${i+1}: ${formatInfo(topic,i+1)[0]}" ${mode===i+1?'aria-current="page"':''}>${i+1}${isDone(id,topic.id,i+1)?'<span aria-hidden="true">✓</span>':''}</a>`).join('')}</div><div id="exercise-stage"></div><div id="book-recommendation"></div><div class="exercise-next"><a href="${topicPath(id,topic.id)}">Ver las cinco actividades</a>${mode<5?`<a href="${topicPath(id,topic.id)}/${mode+1}">Siguiente actividad →</a>`:`<a href="#/${id}/actividades">Elegir otro tema →</a>`}</div>`;
}
function finishActivity(id,topic,mode) {
  const key=activityKey(id,topic.id,mode),first=!completed[key];completed[key]=true;
  try {localStorage.setItem('chavebooks-progress-v1',JSON.stringify(completed));}catch{}
  if(first)window.trackLearningEvent?.('Activity Completed',{language:id,topic:topic.id,format:activityFormat(topic,mode)});
  recommendBook(id,topic);
}
function recommendBook(id,topic) {
  const target=document.querySelector('#book-recommendation');
  const related={animales:'74565343',casa:'74019993',ropa:'74565262',rutina:'74019993',frutas:'74565262'};
  const book=(window.LIBROS||[]).find(b=>b.language===id&&b.id===related[topic.id])||(window.LIBROS||[]).find(b=>b.language===id);
  if(!book){target.innerHTML=`<aside class="related-book no-book"><h3>¡Un paso más en tu aprendizaje!</h3><p>Los libros de ruso estarán disponibles próximamente. Mientras tanto, cuéntame qué actividad te gustaría practicar.</p><a href="https://www.instagram.com/chave_books/" target="_blank" rel="noopener noreferrer">Escríbeme en Instagram →</a></aside>`;return;}
  target.innerHTML=`<aside class="related-book"><div>${bookCover(book)}</div><section><p class="eyebrow">SIGUE APRENDIENDO</p><h3>¿Te gustó? Sigue con <em>${escapeHTML(book.title)}</em>.</h3><p>${escapeHTML(book.description)}</p><p class="book-audience">Para ${escapeHTML(book.audience)} que quieren aprender ${languages[id].name.toLowerCase()}.</p><a class="button dark" href="#/${id}/libros/${book.id}">Descubrir este libro →</a></section></aside>`;
}
function feedbackFor(element,correct,answers) {
  element.replaceChildren();element.className=`feedback ${correct?'correct':'incorrect'}`;
  const text=document.createElement('span');text.textContent=correct?'✓ ¡Correcto!':'Revisa tu respuesta. Puedes intentarlo otra vez.';element.append(text);
  if(!correct){const button=document.createElement('button');button.type='button';button.className='reveal-solution';button.textContent='Ver solución';button.setAttribute('aria-expanded','false');const solution=document.createElement('span');solution.className='solution';solution.hidden=true;button.addEventListener('click',()=>{solution.hidden=!solution.hidden;solution.textContent=solution.hidden?'':`Solución: ${answers[0]}`;button.textContent=solution.hidden?'Ver solución':'Ocultar solución';button.setAttribute('aria-expanded',String(!solution.hidden));});element.append(button,solution);}
}
function expectedAnswers(topic,mode,item) {return activityFormat(topic,mode)==='order'?[fullSentence(item),...(item.orders||[])]:[item.answer,...(item.aliases||[])];}
function renderStandard(id,topic,mode) {
  const format=activityFormat(topic,mode),items=activityItems(topic,mode),vocabulary=topic.kind==='vocabulary',lang=languages[id].htmlLang;
  const sequenceHours=['07:00','07:15','07:45','09:00','22:00'];
  const questions=items.map((source,i)=>{
    const item={...source};let prompt=item.prompt,control='',answers=expectedAnswers(topic,mode,item);
    if(format==='picturechoice'){
      prompt='¿Qué ves en la imagen?';control=imageFor(item);
    }else if(format==='fruitletters'){
      prompt='Escribe el nombre completo de esta fruta.';
      control=`${imageFor(item)}<p class="scrambled" lang="${lang}" aria-label="Nombre con letras que faltan">${escapeHTML(item.answer.replace(/[aeiouáéíóúаеёиоуыэюя]/gi,'_'))}</p>`;
    }else if(format==='basket'){
      prompt=escapeHTML(item.orderLabel);
      control=`<div class="basket-order">${imageFor(item)}<button type="button" class="basket-target" data-question="${i}" aria-label="Colocar fruta en el pedido ${i+1}"><span>Coloca aquí tu elección</span></button><label class="basket-select-label" for="basket-select-${i}">También puedes elegir aquí</label><select class="basket-select" id="basket-select-${i}" data-question="${i}"><option value="">Elige una fruta</option>${shuffled(items,i+2).map(fruit=>`<option value="${escapeHTML(fruit.key)}">${escapeHTML(fruit.answer)}</option>`).join('')}</select><input type="hidden" name="q${i}" id="answer-${i}"></div>`;
    }else if(format==='identify'){
      const image=imageFor(item);prompt=image?`Imagen ${i+1}`:item.clue;
      control=image?`<div class="picture-card">${image}<details><summary>Una pista</summary><p>${escapeHTML(item.clue)}</p></details></div>`:'';
    }else if(format==='match')prompt=topic.matchClues[i];
    else if(format==='flashcards') {prompt=item.flashClue||item.memoryClue;control=`${imageFor(item)}<div class="flashcard"><button type="button" class="flip-card" aria-expanded="false">Voltear tarjeta</button><span class="flash-answer" hidden></span></div>`;}
    else if(format==='truefalse') {
      if(vocabulary){if(topic.id==='animales')control=imageFor(item);prompt=`<strong lang="${lang}">${escapeHTML(item.answer)}</strong>: ${escapeHTML(topic.facts[i][0])}`;answers=[String(topic.facts[i][1])];}
      else {prompt=escapeHTML(item.prompt.replace('___',i%2===0?item.answer:item.wrong));answers=[String(i%2===0)];}
    }else if(format==='sequence'){prompt=`${sequenceHours[i]} · ${['Al salir de la cama','En la ducha, con agua y jabón','La primera comida del día','Con el libro para aprender','Con las luces apagadas para descansar'][i]}`;}
    else if(format==='detective')prompt=escapeHTML(item.prompt).replace('___',`<mark>${escapeHTML(item.wrong)}</mark>`);
    else if(['choice','write','text','letters'].includes(format))prompt=`${escapeHTML(item.prompt)} (${escapeHTML(item.hint)})`;
    if(format==='context'&&topic.id==='ropa')control=imageFor(item)+control;
    if(format==='letters')control+=`<p class="scrambled" lang="${lang}">${escapeHTML(item.answer.replace(/[aeiouáéíóúаеёиоуыэюя]/gi,'_'))}</p>`;
    if(format==='choice'||format==='truefalse'||format==='picturechoice'){
      const options=format==='truefalse'?[['true',vocabulary?'Verdadero':'Correcta'],['false',vocabulary?'Falso':'Incorrecta']]:format==='picturechoice'?shuffled([item.answer,...shuffled(topic.items.filter(other=>other.key!==item.key),i+31).slice(0,2).map(other=>other.answer)],i+mode).map(option=>[option,option]):shuffled([item.answer,item.wrong],i+mode).map(option=>[option,option]);
      control+=`<div class="answers">${options.map(([value,text])=>`<label><input type="radio" name="q${i}" value="${escapeHTML(value)}" required><span>${escapeHTML(text)}</span></label>`).join('')}</div>`;
    }else if(format==='match'||format==='sequence')control+=`<select id="answer-${i}" name="q${i}" required aria-labelledby="question-${i}" lang="${lang}"><option value="">Elige una opción</option>${shuffled(items.map(x=>x.answer),i+mode).map(a=>`<option value="${escapeHTML(a)}">${escapeHTML(a)}</option>`).join('')}</select>`;
    else if(format==='order'){
      prompt='Construye una frase con todas las palabras.';
      if(topic.id==='rutina')control=imageFor(item)+control;
      control+=`<div class="word-slots" id="slots-${i}" aria-label="Tu frase" lang="${lang}"></div><div class="word-bank" data-question="${i}" lang="${lang}">${shuffled(fullSentence(item).split(' '),i+9).map((word,j)=>`<button type="button" class="word-token" data-token="${j}" data-word="${escapeHTML(word)}" aria-label="Añadir ${escapeHTML(word)}">${escapeHTML(word)}</button>`).join('')}</div><input type="hidden" name="q${i}" id="answer-${i}">`;
    }else if(format==='actionstory'){
      prompt=`Parte ${i+1} de la historia`;
      const parts=item.prompt.split('___');
      control=`<div class="action-story-line" lang="${lang}"><span>${escapeHTML(parts[0])}</span><span class="action-story-gap">${imageFor(item)}<input class="written-answer" id="answer-${i}" name="q${i}" type="text" required autocomplete="off" autocapitalize="off" spellcheck="false" lang="${lang}" aria-label="Verbo que falta en la parte ${i+1}" aria-describedby="story-${i}" placeholder="Verbo"></span><span>${escapeHTML(parts[1])}</span><span class="visually-hidden" id="story-${i}">${escapeHTML(item.prompt.replace('___','[hueco]'))}</span></div>`;
    }
    else if(format!=='basket')control+=`<input class="written-answer" id="answer-${i}" name="q${i}" type="text" required autocomplete="off" autocapitalize="off" spellcheck="false" lang="${lang}" aria-labelledby="question-${i}" placeholder="${format==='detective'?'Solo la parte corregida':'Escribe tu respuesta'}">`;
    return {html:`<fieldset class="question"><legend id="question-${i}"><span class="question-number">0${i+1}</span> ${prompt}</legend>${control}<div class="feedback" id="feedback-${i}" aria-live="polite"></div></fieldset>`,answers};
  });
  const basketBank=format==='basket'?`<section class="basket-bank" aria-label="Tarjetas de frutas"><p>Elige una fruta y después su pedido. También puedes arrastrar.</p><div class="fruit-cards">${shuffled(items,8).map(item=>`<button type="button" class="fruit-card" draggable="true" data-fruit="${escapeHTML(item.key)}" aria-pressed="false">${imageFor(item)}<span lang="${lang}">${escapeHTML(item.answer)}</span></button>`).join('')}</div><p id="basket-selection" role="status" aria-live="polite">Ninguna tarjeta seleccionada.</p></section>`:'';
  document.querySelector('#exercise-stage').innerHTML=`${basketBank}${format==='context'?`<div class="vocabulary-bank"><strong>Banco de palabras</strong><p lang="${lang}">${shuffled(items.map(x=>x.answer),4).map(w=>`<span>${escapeHTML(w)}</span>`).join('')}</p></div>`:''}<form id="exercise"><div class="exercise-meta"><span>${format==='text'?'Una historia con cinco huecos':`${questions.length} retos para practicar`}</span><span>${topic.level} · Sin prisas</span></div><div class="${['text','actionstory'].includes(format)?'story-sheet':''}">${questions.map(q=>q.html).join('')}</div><div class="exercise-actions"><button class="button dark" type="submit">Comprobar respuestas →</button><button class="reset" type="reset">Volver a empezar</button></div><div id="result" class="result" role="status" aria-live="polite"></div></form>`;
  const form=document.querySelector('#exercise');
  const clear=()=>{form.querySelectorAll('.feedback').forEach(el=>{el.replaceChildren();el.className='feedback';});document.querySelector('#result').textContent='';document.querySelector('#book-recommendation').replaceChildren();};
  if(format==='basket') {
    let selected=null;
    const cards=[...document.querySelectorAll('.fruit-card')];
    const choose=key=>{selected=items.find(item=>item.key===key)||null;cards.forEach(card=>card.setAttribute('aria-pressed',String(card.dataset.fruit===key)));document.querySelector('#basket-selection').textContent=selected?`Has elegido: ${selected.answer}. Ahora elige su pedido.`:'Ninguna tarjeta seleccionada.';};
    const place=target=>{if(!selected){document.querySelector('#result').textContent='Elige primero una tarjeta de fruta.';return;}clear();document.querySelector(`#answer-${target.dataset.question}`).value=selected.answer;target.querySelector('span').textContent=selected.answer;target.classList.add('filled');document.querySelector(`#basket-select-${target.dataset.question}`).value=selected.key;choose(null);};
    cards.forEach(card=>{card.addEventListener('click',()=>choose(card.dataset.fruit));card.addEventListener('dragstart',event=>{choose(card.dataset.fruit);event.dataTransfer.setData('text/plain',card.dataset.fruit);event.dataTransfer.effectAllowed='copy';});});
    form.querySelectorAll('.basket-select').forEach(select=>select.addEventListener('change',()=>{if(select.value){choose(select.value);place(form.querySelector(`.basket-target[data-question="${select.dataset.question}"]`));}}));
    form.querySelectorAll('.basket-target').forEach(target=>{target.addEventListener('click',()=>place(target));target.addEventListener('dragover',event=>event.preventDefault());target.addEventListener('drop',event=>{event.preventDefault();const key=event.dataTransfer.getData('text/plain');if(items.some(item=>item.key===key)){choose(key);place(target);}});});
    form.addEventListener('reset',()=>{choose(null);form.querySelectorAll('.basket-target').forEach(target=>{target.classList.remove('filled');target.querySelector('span').textContent='Coloca aquí tu elección';});});
  }
  form.querySelectorAll('.flip-card').forEach((button,i)=>button.addEventListener('click',()=>{const answer=button.nextElementSibling;answer.hidden=!answer.hidden;answer.textContent=answer.hidden?'':items[i].answer;button.textContent=answer.hidden?'Voltear tarjeta':'Ocultar palabra';button.setAttribute('aria-expanded',String(!answer.hidden));}));
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
    if(score===questions.length)finishActivity(id,topic,mode);
  });
}
function renderMemory(id,topic,mode) {
  const items=[...activityItems(topic,mode),...(topic.memoryExtra||[])],cards=shuffled(items.flatMap((item,i)=>[{pair:i,side:'word',text:item.answer},{pair:i,side:'meaning',text:item.memoryClue}]),7);
  document.querySelector('#exercise-stage').innerHTML=`<section class="puzzle-panel"><p class="memory-note">Empareja las ${items.length} palabras con sus imágenes o significados. Una tarjeta muestra la palabra y la otra, su pareja.</p><div class="memory-grid">${cards.map((card,i)=>`<button class="memory-card" type="button" data-card="${i}" aria-label="Tarjeta ${i+1}, oculta"><span aria-hidden="true">?</span></button>`).join('')}</div><div id="result" class="result" role="status" aria-live="polite">0 de ${items.length} parejas</div><div class="exercise-actions"><button type="button" class="reset" id="reset-game">Volver a empezar</button><button type="button" class="reveal-solution" id="memory-help" aria-expanded="false">Ver las parejas</button></div><div id="memory-solutions" hidden></div></section>`;
  let open=[],matches=0,locked=false;const buttons=[...document.querySelectorAll('.memory-card')];
  buttons.forEach((button,i)=>button.addEventListener('click',()=>{
    if(locked||button.disabled||open.includes(i))return;
    const image=cards[i].side==='meaning'?imageFor(items[cards[i].pair]):'';if(image)button.innerHTML=image;else button.textContent=cards[i].text;button.setAttribute('aria-label',cards[i].text);button.classList.add('flipped');open.push(i);
    if(open.length===2){const [a,b]=open;if(cards[a].pair===cards[b].pair){buttons[a].disabled=true;buttons[b].disabled=true;buttons[a].classList.add('matched');buttons[b].classList.add('matched');open=[];matches++;document.querySelector('#result').textContent=`${matches} de ${items.length} parejas${matches===items.length?' · ¡Actividad completada!':''}`;if(matches===items.length)finishActivity(id,topic,mode);}else{locked=true;document.querySelector('#result').textContent=`${matches} de ${items.length} parejas. No forman pareja; prueba otras tarjetas.`;setTimeout(()=>{for(const index of open){buttons[index].textContent='?';buttons[index].setAttribute('aria-label',`Tarjeta ${index+1}, oculta`);buttons[index].classList.remove('flipped');}open=[];locked=false;},1100);}}
  }));
  document.querySelector('#reset-game').addEventListener('click',()=>{document.querySelector('#book-recommendation').replaceChildren();renderMemory(id,topic,mode);});
  document.querySelector('#memory-help').addEventListener('click',event=>{const el=document.querySelector('#memory-solutions');el.hidden=!el.hidden;event.target.setAttribute('aria-expanded',String(!el.hidden));el.innerHTML=el.hidden?'':`<ul>${items.map(item=>`<li>${escapeHTML(item.answer)} — ${escapeHTML(item.memoryClue)}</li>`).join('')}</ul>`;});
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
    if(index<0){document.querySelector('#puzzle-feedback').textContent='Revisa tu selección. Puedes intentarlo otra vez.';return;}
    if(found.has(index)){document.querySelector('#puzzle-feedback').textContent='Esa palabra ya está encontrada. Busca otra.';return;}
    found.add(index);cells.forEach(p=>grid.querySelector(`[data-r="${p.r}"][data-c="${p.c}"]`).classList.add('found'));document.querySelector(`#clue-${index} .found-label`).textContent=`✓ ${items[index].answer}`;document.querySelector('#result').textContent=`${found.size} de ${items.length} palabras encontradas${found.size===items.length?' · ¡Actividad completada!':''}`;if(found.size===items.length)finishActivity(id,topic,mode);
  });
  document.querySelector('#reset-game').addEventListener('click',()=>{document.querySelector('#book-recommendation').replaceChildren();renderWordSearch(id,topic,mode);});
  document.querySelector('#puzzle-help').addEventListener('click',event=>{const el=document.querySelector('#puzzle-solution');el.hidden=!el.hidden;event.target.setAttribute('aria-expanded',String(!el.hidden));el.innerHTML=el.hidden?'':`<ul>${puzzle.placements.map((cells,i)=>`<li>${escapeHTML(items[i].answer)}: fila ${cells[0].r+1}, columna ${cells[0].c+1} → fila ${cells.at(-1).r+1}, columna ${cells.at(-1).c+1}.</li>`).join('')}</ul>`;});
}
function makeCrossword(items) {
  const size=31,grid=Array.from({length:size},()=>Array(size).fill('')),placements=[];
  const words=items.map((item,index)=>({word:puzzleWord(item.answer),index})).sort((a,b)=>b.word.length-a.word.length);
  function canPlace(word,r,c,dr,dc) {
    let crossings=0;
    if(r<1||c<1||r+dr*(word.length-1)>=size-1||c+dc*(word.length-1)>=size-1)return false;
    if(grid[r-dr][c-dc]||grid[r+dr*word.length][c+dc*word.length])return false;
    for(let k=0;k<word.length;k++){const y=r+dr*k,x=c+dc*k,existing=grid[y][x];if(existing&&existing!==word[k])return false;
      if(existing)crossings++;else if((dr===0&&(grid[y-1][x]||grid[y+1][x]))||(dc===0&&(grid[y][x-1]||grid[y][x+1])))return false;
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
  const items=activityItems(topic,mode),puzzle=makeCrossword(items),numbers=new Map();puzzle.placements.forEach((p,i)=>numbers.set(`${p.r},${p.c}`,[numbers.get(`${p.r},${p.c}`),i+1].filter(Boolean).join(",")));
  document.querySelector('#exercise-stage').innerHTML=`<form class="puzzle-panel" id="crossword-form"><div class="grid-scroll"><div class="crossword-grid" style="--grid-size:${puzzle.grid[0].length}" aria-label="Crucigrama">${puzzle.grid.flatMap((row,r)=>row.map((letter,c)=>letter?`<label class="crossword-cell"><span>${numbers.get(`${r},${c}`)||''}</span><input type="text" maxlength="1" autocomplete="off" spellcheck="false" data-r="${r}" data-c="${c}" aria-label="Fila ${r+1}, columna ${c+1}"></label>`:'<span class="crossword-empty"></span>')).join('')}</div></div><ol class="crossword-clues">${puzzle.placements.map((p,i)=>`<li>${imageFor(items[i])}${escapeHTML(items[i].crosswordClue)} <small>(${p.dr?'Vertical':'Horizontal'}, ${p.word.length} letras)</small><div class="feedback" id="feedback-${i}" aria-live="polite"></div></li>`).join('')}</ol><div class="exercise-actions"><button class="button dark" type="submit">Comprobar respuestas →</button><button class="reset" type="reset">Volver a empezar</button></div><div id="result" class="result" role="status" aria-live="polite"></div></form>`;
  const form=document.querySelector('#crossword-form');const clear=()=>{form.querySelectorAll('.feedback').forEach(el=>el.replaceChildren());document.querySelector('#result').textContent='';document.querySelector('#book-recommendation').replaceChildren();};
  form.addEventListener('input',event=>{event.target.value=puzzleWord(event.target.value).slice(0,1);clear();});form.addEventListener('reset',clear);
  form.addEventListener('submit',event=>{event.preventDefault();let score=0;puzzle.placements.forEach((p,i)=>{const text=Array.from(p.word,(_,k)=>form.querySelector(`[data-r="${p.r+p.dr*k}"][data-c="${p.c+p.dc*k}"]`).value).join('');const correct=puzzleWord(text)===p.word;if(correct)score++;feedbackFor(document.querySelector(`#feedback-${i}`),correct,[items[i].answer]);});document.querySelector('#result').textContent=`${score} de ${items.length} palabras correctas. ${score===items.length?'¡Actividad completada!':'Revisa las casillas o abre una solución si la necesitas.'}`;if(score===items.length)finishActivity(id,topic,mode);});
}
