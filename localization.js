// Textos de interfaz de las actividades. Los menús generales siguen en español.
const LESSON_STRINGS = new Map([
  [
    "Los colores de tus ilustraciones",
    [
      "Colours in your pictures",
      "Цвета на картинках"
    ]
  ],
  [
    "Mira cada dibujo y completa la frase en el idioma que estudias. En la sandía escribe los dos colores pedidos; el orden no importa.",
    [
      "Look at each picture and complete the sentence. For the watermelon, write both colours: the flesh and the rind.",
      "Посмотри на картинку и дополни предложение. Для арбуза сначала назови цвет мякоти, затем цвет корки."
    ]
  ],
  [
    "En busca del color",
    [
      "Find the colour",
      "Найди цвет"
    ]
  ],
  [
    "Lee el nombre del color y encuentra su mancha de pintura. Pulsa una imagen en cada reto.",
    [
      "Read the colour and choose the matching patch of paint.",
      "Прочитай название цвета и выбери подходящую краску."
    ]
  ],
  [
    "Un día en imágenes",
    [
      "A day in pictures",
      "День в картинках"
    ]
  ],
  [
    "Completa esta historia en presente. Cada dibujo sustituye a la pista del verbo: escribe solo la forma que falta y fíjate en quién realiza la acción.",
    [
      "Complete the story in the present tense. Each picture is a verb clue. Write only the missing verb form and check who is doing the action.",
      "Дополни рассказ в настоящем времени. Картинка подсказывает глагол. Напиши только нужную форму и обрати внимание на того, кто выполняет действие."
    ]
  ],
  [
    "Elige el nombre",
    [
      "Choose the name",
      "Выбери название"
    ]
  ],
  [
    "Mira la ilustración y elige su nombre entre las tres opciones.",
    [
      "Look at the picture and choose its name from three options.",
      "Посмотри на картинку и выбери название из трёх вариантов."
    ]
  ],
  [
    "Completa las letras",
    [
      "Complete the letters",
      "Вставь буквы"
    ]
  ],
  [
    "Mira la fruta, completa mentalmente las letras que faltan y escribe el nombre entero.",
    [
      "Look at the fruit and the letter clues, then write its whole name.",
      "Посмотри на фрукт и подсказку с буквами, затем напиши название целиком."
    ]
  ],
  [
    "Prepara la cesta",
    [
      "Pack the basket",
      "Собери корзину"
    ]
  ],
  [
    "Lee cada pedido y coloca la tarjeta de la fruta que se pide. Puedes pulsar, arrastrar o usar el selector.",
    [
      "Read each order and match it with the right fruit card. You can click, drag or use the menu.",
      "Прочитай заказ и подбери карточку с нужным фруктом. Можно нажимать, перетаскивать или выбирать из списка."
    ]
  ],
  [
    "Elige la forma correcta",
    [
      "Choose the correct form",
      "Выбери правильную форму"
    ]
  ],
  [
    "Elige la opción que completa cada frase.",
    [
      "Choose the option that completes each sentence.",
      "Выбери вариант, который дополняет предложение."
    ]
  ],
  [
    "Completa las frases",
    [
      "Complete the sentences",
      "Дополни предложения"
    ]
  ],
  [
    "Escribe solo la forma que falta. Entre paréntesis encontrarás el verbo o la palabra base.",
    [
      "Write only the missing form. The base word is in brackets.",
      "Напиши только пропущенную форму. Исходное слово дано в скобках."
    ]
  ],
  [
    "Un pequeño texto",
    [
      "A short story",
      "Небольшой рассказ"
    ]
  ],
  [
    "Completa los huecos de esta historia. Usa la palabra base entre paréntesis.",
    [
      "Complete the gaps in the story. Use the base word in brackets.",
      "Заполни пропуски в рассказе. Используй слово в скобках."
    ]
  ],
  [
    "Pon las palabras en orden",
    [
      "Put the words in order",
      "Расставь слова по порядку"
    ]
  ],
  [
    "Pulsa las palabras para formar una frase. Puedes devolverlas pulsando sobre ellas.",
    [
      "Click the words to build a sentence. Click a chosen word to put it back.",
      "Нажимай на слова, чтобы составить предложение. Нажми на выбранное слово, чтобы вернуть его."
    ]
  ],
  [
    "Reconstruye la palabra",
    [
      "Rebuild the word",
      "Восстанови слово"
    ]
  ],
  [
    "Completa la frase. Las letras bajo la frase te ayudan a recordar la forma que falta.",
    [
      "Complete the sentence. The letters below help you remember the missing form.",
      "Дополни предложение. Буквы внизу помогут вспомнить нужную форму."
    ]
  ],
  [
    "Detective de errores",
    [
      "Error detective",
      "Детектив ошибок"
    ]
  ],
  [
    "Corrige solo la palabra o el grupo de palabras marcado. No escribas toda la frase.",
    [
      "Correct only the highlighted word or phrase. Do not rewrite the whole sentence.",
      "Исправь только выделенное слово или словосочетание. Не переписывай всё предложение."
    ]
  ],
  [
    "Lee y escribe",
    [
      "Read and write",
      "Прочитай и напиши"
    ]
  ],
  [
    "Lee la pista y escribe la palabra en el idioma que estudias.",
    [
      "Read the clue and write the word in English.",
      "Прочитай подсказку и напиши слово по-русски."
    ]
  ],
  [
    "Une las ideas",
    [
      "Match the ideas",
      "Соедини по смыслу"
    ]
  ],
  [
    "Relaciona cada situación con la palabra o acción que le corresponde.",
    [
      "Match each situation to the right word or action.",
      "Подбери к каждой ситуации нужное слово или действие."
    ]
  ],
  [
    "Palabras en contexto",
    [
      "Words in context",
      "Слова в контексте"
    ]
  ],
  [
    "Completa cada frase con una palabra del banco. Lee los detalles: solo una encaja.",
    [
      "Complete each sentence with a word from the bank. Read the details carefully.",
      "Вставь в каждое предложение слово из списка. Внимательно прочитай подсказки."
    ]
  ],
  [
    "Verdadero o falso",
    [
      "True or false",
      "Верно или неверно"
    ]
  ],
  [
    "Lee cada afirmación y decide si es verdadera o falsa.",
    [
      "Read each statement and decide whether it is true or false.",
      "Прочитай утверждение и реши, верно оно или нет."
    ]
  ],
  [
    "Sopa de letras",
    [
      "Word search",
      "Поиск слов"
    ]
  ],
  [
    "Un pequeño crucigrama",
    [
      "Picture crossword",
      "Кроссворд с картинками"
    ]
  ],
  [
    "Elige una pista para resaltar su palabra. Escribe una letra por casilla; las flechas te ayudan a moverte. Puedes usar tildes; la ñ se conserva.",
    [
      "Choose a clue to highlight its word. Write one letter in each square; use the arrow keys to move. Accented vowels are accepted.",
      "Выбери подсказку, чтобы выделить слово. Впиши по одной букве в клетку; перемещайся стрелками. Буква й сохраняется; ё можно писать как е."
    ]
  ],
  [
    "Tarjetas para aprender",
    [
      "Learning cards",
      "Карточки для изучения"
    ]
  ],
  [
    "Piensa en la palabra, escríbela y comprueba tu respuesta. Si la necesitas, puedes voltear la tarjeta.",
    [
      "Think of the word, write it and check your answer. Turn the card over if you need help.",
      "Вспомни слово, напиши его и проверь ответ. Если нужна помощь, переверни карточку."
    ]
  ],
  [
    "Tu caja de colores",
    [
      "Your paint box",
      "Твоя коробка красок"
    ]
  ],
  [
    "Descubre los doce colores. Mira cada pintura, escribe su nombre y, si lo necesitas, voltea la tarjeta para aprenderlo.",
    [
      "Discover twelve colours. Look at the paint, write its name and turn the card over if you need help.",
      "Познакомься с двенадцатью цветами. Посмотри на краску, напиши название и переверни карточку, если нужна помощь."
    ]
  ],
  [
    "¿Qué está haciendo?",
    [
      "What is the action?",
      "Что он делает?"
    ]
  ],
  [
    "Mira y escribe",
    [
      "Look and write",
      "Посмотри и напиши"
    ]
  ],
  [
    "Mira cada ilustración y escribe la palabra. Puedes abrir una pista si la necesitas.",
    [
      "Look at each picture and write the word in English. Open a clue if you need help.",
      "Посмотри на картинку и напиши слово по-русски. Если нужно, открой подсказку."
    ]
  ],
  [
    "Construye las frases",
    [
      "Build the sentences",
      "Составь предложения"
    ]
  ],
  [
    "Mira la acción y pulsa todas las palabras para construir una frase. Empieza por la palabra con mayúscula y termina con la que lleva punto.",
    [
      "Look at the action and use all the words to build a sentence. Start with a capital letter and end with the word that has a full stop.",
      "Посмотри на действие и составь предложение из всех слов. Начни со слова с заглавной буквы и закончи словом с точкой."
    ]
  ],
  [
    "¿Está bien escrito?",
    [
      "Is it correct?",
      "Правильно ли написано?"
    ]
  ],
  [
    "Decide si la frase es gramaticalmente correcta.",
    [
      "Decide whether the grammar is correct.",
      "Реши, правильно ли построено предложение."
    ]
  ],
  [
    "Una pista",
    [
      "A clue",
      "Подсказка"
    ]
  ],
  [
    "Voltear tarjeta",
    [
      "Turn the card over",
      "Перевернуть карточку"
    ]
  ],
  [
    "Ocultar palabra",
    [
      "Hide the word",
      "Скрыть слово"
    ]
  ],
  [
    "Ver solución",
    [
      "Show answer",
      "Показать ответ"
    ]
  ],
  [
    "Ocultar solución",
    [
      "Hide answer",
      "Скрыть ответ"
    ]
  ],
  [
    "✓ ¡Correcto!",
    [
      "✓ Correct!",
      "✓ Правильно!"
    ]
  ],
  [
    "Revisa tu respuesta. Puedes intentarlo otra vez.",
    [
      "Check your answer. You can try again.",
      "Проверь ответ. Можно попробовать ещё раз."
    ]
  ],
  [
    "Revisa tu selección. Puedes intentarlo otra vez.",
    [
      "Check your selection. Try again.",
      "Проверь выделение. Попробуй ещё раз."
    ]
  ],
  [
    "Esa palabra ya está encontrada. Busca otra.",
    [
      "You have already found that word. Find another one.",
      "Это слово уже найдено. Найди другое."
    ]
  ],
  [
    "Comprobar respuestas →",
    [
      "Check answers →",
      "Проверить ответы →"
    ]
  ],
  [
    "Volver a empezar",
    [
      "Start again",
      "Начать заново"
    ]
  ],
  [
    "Completa todas las respuestas antes de comprobar.",
    [
      "Complete all the answers before checking.",
      "Заполни все ответы перед проверкой."
    ]
  ],
  [
    "Puedes volver a intentarlo o abrir las soluciones que necesites.",
    [
      "Try again or reveal the answers you need.",
      "Попробуй ещё раз или открой нужные ответы."
    ]
  ],
  [
    "¡Actividad completada!",
    [
      "Activity complete!",
      "Задание выполнено!"
    ]
  ],
  [
    "Elegir otro tema →",
    [
      "Choose another topic →",
      "Выбрать другую тему →"
    ]
  ],
  [
    "Siguiente actividad →",
    [
      "Next activity →",
      "Следующее задание →"
    ]
  ],
  [
    "Ver las cinco actividades",
    [
      "See the five activities",
      "Все пять заданий"
    ]
  ],
  [
    "Escribe tu respuesta",
    [
      "Write your answer",
      "Напиши ответ"
    ]
  ],
  [
    "Solo la parte corregida",
    [
      "Only the corrected part",
      "Только исправленная часть"
    ]
  ],
  [
    "Elige una opción",
    [
      "Choose an option",
      "Выбери вариант"
    ]
  ],
  [
    "Verdadero",
    [
      "True",
      "Верно"
    ]
  ],
  [
    "Falso",
    [
      "False",
      "Неверно"
    ]
  ],
  [
    "Correcta",
    [
      "Correct",
      "Правильно"
    ]
  ],
  [
    "Incorrecta",
    [
      "Incorrect",
      "Неправильно"
    ]
  ],
  [
    "Verbo",
    [
      "Verb",
      "Глагол"
    ]
  ],
  [
    "Banco de palabras",
    [
      "Word bank",
      "Список слов"
    ]
  ],
  [
    "Tu frase",
    [
      "Your sentence",
      "Твоё предложение"
    ]
  ],
  [
    "No forman pareja; prueba otras tarjetas.",
    [
      "Not a pair; try other cards.",
      "Это не пара; попробуй другие карточки."
    ]
  ],
  [
    "Ver las parejas",
    [
      "Show the pairs",
      "Показать пары"
    ]
  ],
  [
    "Horizontal",
    [
      "Across",
      "По горизонтали"
    ]
  ],
  [
    "Vertical",
    [
      "Down",
      "По вертикали"
    ]
  ],
  [
    "Elige una pista",
    [
      "Choose a clue",
      "Выбери подсказку"
    ]
  ],
  [
    "Revisa las casillas o abre una solución si la necesitas.",
    [
      "Check the squares or reveal an answer if you need it.",
      "Проверь клетки или открой ответ, если нужна помощь."
    ]
  ],
  [
    "Pulsa el inicio y el final de una palabra. En la cuadrícula se omiten espacios, guiones y tildes.",
    [
      "Click the first and last letter of a word. Spaces, hyphens and vowel accents are omitted in the grid.",
      "Нажми на первую и последнюю буквы слова. Пробелы и дефисы в сетке не используются."
    ]
  ],
  [
    "Coloca aquí tu elección",
    [
      "Place your choice here",
      "Помести выбранную карточку сюда"
    ]
  ],
  [
    "También puedes elegir aquí",
    [
      "Or choose from this menu",
      "Или выбери из списка"
    ]
  ],
  [
    "Elige una fruta",
    [
      "Choose a fruit",
      "Выбери фрукт"
    ]
  ],
  [
    "Ninguna tarjeta seleccionada.",
    [
      "No card selected.",
      "Карточка не выбрана."
    ]
  ],
  [
    "Elige primero una tarjeta de fruta.",
    [
      "Choose a fruit card first.",
      "Сначала выбери карточку с фруктом."
    ]
  ],
  [
    "Elige una fruta y después su pedido. También puedes arrastrar.",
    [
      "Choose a fruit and then its written order. You can also drag it.",
      "Выбери фрукт, затем его заказ. Можно также перетаскивать карточки."
    ]
  ],
  [
    "Reiniciar este tema",
    [
      "Reset this topic",
      "Начать тему заново"
    ]
  ],
  [
    "Reiniciar progreso del idioma",
    [
      "Reset language progress",
      "Сбросить прогресс языка"
    ]
  ],
  [
    "¿Reiniciar el progreso guardado? Solo afecta a esta selección en este navegador.",
    [
      "Reset saved progress? Only this selection in this browser will be affected.",
      "Сбросить сохранённый прогресс? Изменится только выбранный раздел в этом браузере."
    ]
  ],
  [
    "Sí, reiniciar",
    [
      "Yes, reset",
      "Да, сбросить"
    ]
  ],
  [
    "Cancelar",
    [
      "Cancel",
      "Отмена"
    ]
  ],
  [
    "¡Tema completado!",
    [
      "Topic complete!",
      "Тема завершена!"
    ]
  ],
  [
    "Ver mi resumen →",
    [
      "See my summary →",
      "Посмотреть итоги →"
    ]
  ],
  [
    "¡Felicidades!",
    [
      "Congratulations!",
      "Поздравляем!"
    ]
  ],
  [
    "Completaste las cinco actividades.",
    [
      "You completed all five activities.",
      "Ты выполнил все пять заданий."
    ]
  ],
  [
    "Tu práctica, paso a paso",
    [
      "Your practice, step by step",
      "Твоя практика шаг за шагом"
    ]
  ],
  [
    "Aún puedes seguir practicando este tema.",
    [
      "You can keep practising this topic.",
      "Ты можешь продолжить эту тему."
    ]
  ],
  [
    "Sin datos de intentos anteriores.",
    [
      "No details saved for earlier attempts.",
      "Данные о прошлых попытках не сохранены."
    ]
  ],
  [
    "El resumen cuenta las respuestas revisadas, no es una nota de examen.",
    [
      "This summary counts checked answers; it is not an exam grade.",
      "Здесь показаны результаты проверок, а не экзаменационная оценка."
    ]
  ],
  [
    "Más temas para explorar",
    [
      "More topics to explore",
      "Другие темы"
    ]
  ],
  [
    "En mis libros también encontrarás propuestas sobre la casa, la ciudad, las verduras, las profesiones, las emociones y la naturaleza.",
    [
      "My books also offer ways to explore the home, the city, vegetables, jobs, feelings and nature.",
      "В моих книгах есть и другие темы: дом, город, овощи, профессии, эмоции и природа."
    ]
  ],
  [
    "SIGUE APRENDIENDO",
    [
      "KEEP LEARNING",
      "ПРОДОЛЖАЙ УЧИТЬСЯ"
    ]
  ],
  [
    "GRAMÁTICA",
    [
      "GRAMMAR",
      "ГРАММАТИКА"
    ]
  ],
  [
    "VOCABULARIO",
    [
      "VOCABULARY",
      "СЛОВАРНЫЙ ЗАПАС"
    ]
  ],
  [
    "Juega con la gramática",
    [
      "Play with grammar",
      "Играй с грамматикой"
    ]
  ],
  [
    "Palabras para tu mundo",
    [
      "Words for your world",
      "Слова вокруг тебя"
    ]
  ],
  [
    "← Todos los temas",
    [
      "← All topics",
      "← Все темы"
    ]
  ],
  [
    "Elige tu actividad de hoy.",
    [
      "Choose an activity for today.",
      "Выбери задание на сегодня."
    ]
  ],
  [
    "¡Vamos allá!",
    [
      "Let’s go!",
      "Начнём!"
    ]
  ],
  [
    "Volver a practicar",
    [
      "Practise again",
      "Повторить"
    ]
  ],
  [
    "Tu progreso en este navegador",
    [
      "Your progress in this browser",
      "Твой прогресс в этом браузере"
    ]
  ],
  [
    "HOY, ¿QUÉ TE APETECE PRACTICAR?",
    [
      "WHAT WILL YOU PRACTISE TODAY?",
      "ЧТО ПОТРЕНИРУЕМ СЕГОДНЯ?"
    ]
  ],
  [
    "Tu próxima pequeña conquista.",
    [
      "Your next little achievement.",
      "Твой следующий маленький успех."
    ]
  ],
  [
    "Elige un tema: te esperan juegos, historias y nuevas formas de aprender.",
    [
      "Choose a topic for games, stories and new ways to learn.",
      "Выбери тему: тебя ждут игры, истории и новые способы учиться."
    ]
  ],
  [
    "5 temas para explorar",
    [
      "5 topics to explore",
      "5 тем для изучения"
    ]
  ],
  [
    "Explorar el tema",
    [
      "Explore this topic",
      "Открыть тему"
    ]
  ],
  [
    "Sin prisas",
    [
      "At your own pace",
      "В своём темпе"
    ]
  ],
  [
    "Tarjetas de frutas",
    [
      "Fruit cards",
      "Карточки с фруктами"
    ]
  ],
  [
    "Primer color",
    [
      "First colour",
      "Первый цвет"
    ]
  ],
  [
    "Segundo color",
    [
      "Second colour",
      "Второй цвет"
    ]
  ],
  [
    "Ver traducción al español",
    [
      "Spanish help",
      "Помощь на испанском"
    ]
  ]
]);
LESSON_STRINGS.set('Encuentra:', ['Find:', 'Найди:']);
LESSON_STRINGS.set('Cargando las imágenes…', ['Loading the pictures…', 'Загрузка картинок…']);
LESSON_STRINGS.set('¿Te gustó? Sigue con', ['Enjoyed it? Keep learning with', 'Понравилось? Продолжай учиться с']);
LESSON_STRINGS.set('Descubrir este libro →', ['Discover this book →', 'Посмотреть книгу →']);
LESSON_STRINGS.set('Hueco', ['Gap', 'Пропуск']);
LESSON_STRINGS.set('Las cinco actividades', ['The five activities', 'Пять заданий']);
LESSON_STRINGS.set('Continuar practicando', ['Keep practising', 'Продолжить практику']);
LESSON_STRINGS.set('Nombre con letras que faltan', ['Name with missing letters', 'Название с пропущенными буквами']);
LESSON_STRINGS.set('Lee cada pedido y elige la imagen que corresponde. Pulsa una tarjeta y después su pedido, o arrástrala.', ['Read each order and choose its picture. Click a card and then its order, or drag it there.', 'Прочитай заказ и выбери подходящую картинку. Нажми на карточку, затем на заказ или перетащи её.']);
LESSON_STRINGS.set('Prepara la maleta', ['Pack your suitcase', 'Собери чемодан']);
LESSON_STRINGS.set('Tarjetas ilustradas', ['Picture cards', 'Карточки с картинками']);
LESSON_STRINGS.set('Elige una tarjeta y después su pedido. También puedes arrastrar.', ['Choose a picture card, then its order. You can also drag it.', 'Выбери карточку, затем её заказ. Можно также перетаскивать карточки.']);
LESSON_STRINGS.set('Elige primero una tarjeta.', ['Choose a card first.', 'Сначала выбери карточку.']);
LESSON_STRINGS.set('Este contador es solo de este navegador y dispositivo, no de todos los visitantes. Si compartes el dispositivo, compartes el progreso. Se guarda al completar una actividad y no se sincroniza; si borras los datos del navegador, se pierde.', ['This progress belongs to this browser and device. If you share the device, you share the progress. It is saved when an activity is completed and does not sync; clearing browser data removes it.', 'Прогресс сохраняется только в этом браузере и на этом устройстве. Если вы пользуетесь одним устройством, прогресс будет общим. Он сохраняется после выполнения задания и не синхронизируется; очистка данных браузера удаляет его.']);
function lessonText(value,id=currentLanguage) {
 if(id==='espanol'||!id)return value;
 const col=id==='ingles'?0:1,trimmed=value.trim(),pair=LESSON_STRINGS.get(trimmed);
 if(pair)return value.replace(trimmed,pair[col]);
 const rules=[
 [/^VOCABULARIO · (.*)$/,level=>[`VOCABULARY · ${level}`,`СЛОВАРНЫЙ ЗАПАС · ${level}`]],
 [/^GRAMÁTICA · (.*)$/,level=>[`GRAMMAR · ${level}`,`ГРАММАТИКА · ${level}`]],
 [/^La frase es (correcta|incorrecta)\. Forma correcta: (.*)$/, (state,x)=>[`The sentence is ${state==='correcta'?'correct':'incorrect'}. Correct form: ${x}`,`Предложение ${state==='correcta'?'правильное':'неправильное'}. Правильная форма: ${x}`]],
 [/^(A[12]|B[12]) · Sin prisas$/,x=>[`${x} · At your own pace`,`${x} · В своём темпе`]],
 [/^(\d+) \/ 50 completadas$/,n=>[`${n} / 50 complete`,`${n} / 50 выполнено`]],
 [/^\((\d+) letras\)$/,n=>[`(${n} letters)`,`(${n} букв)`]],
 [/^Verbo que falta en la parte (\d+)$/,n=>[`Missing verb ${n}`,`Пропущенный глагол ${n}`]],
 [/^Memory: (\d+) tarjetas$/,n=>[`Memory: ${n} cards`,`Мемори: ${n} карточки`]],
 [/^Encuentra (\d+) parejas: una palabra y su imagen o significado\. Pulsa dos tarjetas para descubrirlas\.$/,n=>[`Find ${n} pairs: a word and its picture. Turn over two cards at a time.`,`Найди ${n} пар: слово и картинку. Переворачивай по две карточки.`]],
 [/^Busca (\d+) palabras\. Pulsa la primera letra y después la última\. Pueden ir en horizontal, vertical o diagonal\.$/,n=>[`Find ${n} words. Click the first and last letters. Words can run across, down or diagonally.`,`Найди ${n} слов. Нажми на первую и последнюю буквы. Слова идут по горизонтали, вертикали или диагонали.`]],
 [/^(\d+) retos para practicar$/,n=>[`${n} practice challenges`,`${n} заданий для практики`]],
 [/^(\d+) de (\d+) respuestas correctas\. (.*)$/, (a,b,tail)=>[`${a} of ${b} answers correct. ${lessonText(tail,id)}`,`Правильных ответов: ${a} из ${b}. ${lessonText(tail,id)}`]],
 [/^(\d+) de (\d+) palabras correctas\. (.*)$/, (a,b,tail)=>[`${a} of ${b} words correct. ${lessonText(tail,id)}`,`Правильных слов: ${a} из ${b}. ${lessonText(tail,id)}`]],
 [/^(\d+) de (\d+) parejas(.*)$/, (a,b,tail)=>[`${a} of ${b} pairs${tail? ' · '+lessonText(tail.replace(/^[ .·]+/,''),id):''}`,`${a} из ${b} пар${tail? ' · '+lessonText(tail.replace(/^[ .·]+/,''),id):''}`]],
 [/^(\d+) de (\d+) palabras encontradas(.*)$/, (a,b,tail)=>[`${a} of ${b} words found${tail?' · '+lessonText(tail.replace(/^[ .·]+/,''),id):''}`,`Найдено слов: ${a} из ${b}${tail?' · '+lessonText(tail.replace(/^[ .·]+/,''),id):''}`]],
 [/^Solución: (.*)$/,x=>[`Answer: ${lessonText(x,id)}`,`Ответ: ${lessonText(x,id)}`]],
 [/^Actividad (\d+): (.*)$/, (n,x)=>[`Activity ${n}: ${lessonText(x,id)}`,`Задание ${n}: ${lessonText(x,id)}`]],
 [/^(.*) · ACTIVIDAD (\d+) DE 5$/, (x,n)=>[`${x} · ACTIVITY ${n} OF 5`,`${x} · ЗАДАНИЕ ${n} ИЗ 5`]],
 [/^← Las cinco actividades de (.*)$/,x=>[`← Five activities: ${x}`,`← Пять заданий: ${x}`]],
 [/^Empareja las (\d+) palabras con sus imágenes o significados\. Una tarjeta muestra la palabra y la otra, su pareja\.$/,n=>[`Match ${n} words to their pictures. Turn over two cards at a time.`,`Найди картинки к ${n} словам. Переворачивай по две карточки.`]],
 [/^Tarjeta (\d+), oculta$/,n=>[`Card ${n}, face down`,`Карточка ${n}, закрыта`]],
 [/^Imagen (\d+)$/,n=>[`Picture ${n}`,`Картинка ${n}`]],
 [/^Fila (\d+), columna (\d+)(.*)$/, (r,c,x)=>[`Row ${r}, column ${c}${x}`,`Строка ${r}, столбец ${c}${x}`]],
 [/^Has elegido: (.*)\. Ahora elige su pedido\.$/,x=>[`Selected: ${x}. Now choose its order.`,`Выбрано: ${x}. Теперь выбери заказ.`]],
 [/^Añadir (.*)$/,x=>[`Add ${x}`,`Добавить ${x}`]],
 [/^Quitar (.*)$/,x=>[`Remove ${x}`,`Убрать ${x}`]],
 [/^ACTIVIDAD 0(\d+)(.*)$/, (n,x)=>[`ACTIVITY 0${n}${x?' · COMPLETED':''}`,`ЗАДАНИЕ 0${n}${x?' · ВЫПОЛНЕНО':''}`]],
 [/^5 actividades · (\d+) completadas$/,n=>[`5 activities · ${n} complete`,`5 заданий · выполнено: ${n}`]],
 [/^10 temas · 50 actividades$/,()=>['10 topics · 50 activities','10 тем · 50 заданий']],
 [/^Mira cada ilustración y escribe la acción en infinitivo en (.*)\.$/,name=>[`Look at each picture and write the action in ${{español:'Spanish',inglés:'English',ruso:'Russian'}[name]}. Use the infinitive${name==='inglés'?', with or without “to”':''}.`,`Посмотри на картинку и напиши действие ${{español:'по-испански',inglés:'по-английски',ruso:'по-русски'}[name]} в неопределённой форме.`]],
 [/^Respuestas por revisar: (\d+)$/,n=>[`Answers to review: ${n}`,`Ответов для повторения: ${n}`]],
 [/^Comprobaciones: (\d+)$/,n=>[`Checks: ${n}`,`Проверок: ${n}`]],
 [/^Soluciones consultadas: (\d+)$/,n=>[`Answers revealed: ${n}`,`Открыто ответов: ${n}`]],
 [/^Parejas por revisar: (\d+)$/,n=>[`Mismatched pairs: ${n}`,`Несовпавших пар: ${n}`]],
 [/^Encuentra: $/,()=>['Find: ','Найди: ']],
 [/^ y $/,()=>[' and ',' и ']]
 ];
 for(const [pattern,fn]of rules){const m=trimmed.match(pattern);if(m)return value.replace(trimmed,fn(...m.slice(1))[col]);}
 return value;
}
function translateLesson(root=document.querySelector('#section-content')) {
 const id=currentLanguage;if(!root||id==='espanol'||!id)return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
 while(walker.nextNode())nodes.push(walker.currentNode);
 for(const node of nodes){if(node.parentElement.closest('[data-no-translate],script,style'))continue;const next=lessonText(node.nodeValue,id);if(next!==node.nodeValue)node.nodeValue=next;}
 for(const el of root.querySelectorAll('[aria-label],[placeholder]')){if(el.closest('[data-no-translate]'))continue;for(const attr of ['aria-label','placeholder']){if(!el.hasAttribute(attr))continue;const val=el.getAttribute(attr),next=lessonText(val,id);if(next!==val)el.setAttribute(attr,next);}}
}
let translationQueued=false;
const lessonObserver=new MutationObserver(()=>{if(translationQueued)return;translationQueued=true;queueMicrotask(()=>{translationQueued=false;translateLesson();});});
lessonObserver.observe(document.querySelector('main'),{childList:true,subtree:true,characterData:true});
