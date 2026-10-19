# chavebooks

Web estática para estudiar español, inglés y ruso. Incluye diez temas por idioma, cinco actividades por tema (150 en total) y retos y juegos de distintas duraciones. Las actividades permiten elegir respuestas, escribir, completar textos, ordenar frases, corregir errores, identificar ilustraciones y relacionar vocabulario. Cada idioma conserva su propio color pastel. El pie de todas las páginas enlaza a Instagram: @chave_books.

## Ver la web en tu ordenador

Desde la carpeta del repositorio:

```sh
python3 -m http.server 8000
```

Abre `http://localhost:8000`. No necesitas instalar dependencias ni configurar claves. Las fuentes de Google son opcionales: si no hay conexión, se usan fuentes del sistema.

## Netlify

La configuración está en `netlify.toml`: se publica la raíz del repositorio, sin comando de compilación. Si Netlify tiene una carpeta base configurada, debe apuntar a la raíz de este repositorio. Al subir los cambios a la rama que Netlify tenga conectada, Netlify podrá desplegarlos. Las subpáginas usan rutas con `#`, que funcionan también al recargar o compartir enlaces.

## Añadir tus libros de LitRes

1. Abre la página pública de venta de tu libro en LitRes y copia su dirección HTTPS. Utiliza la página del libro, no la de tu cuenta de autora ni un enlace privado.
2. Edita `books.js`. Añade un objeto por libro dentro de `window.LIBROS = []`, separándolos con comas:

```js
window.LIBROS = [
  {
    id: 'IDENTIFICADOR_LITRES',
    language: 'ingles',
    audience: 'hispanohablantes',
    age: 'Infantil',
    level: 'Primeros pasos',
    title: 'El título real de tu libro',
    description: 'Para quién es y qué aprenderá la persona que lo lea.',
    url: 'https://www.litres.ru/REEMPLAZAR-POR-LA-RUTA-REAL-DEL-LIBRO/'
  }
];
```

Conserva los libros existentes al añadir nuevos objetos. El enlace de arriba es solo una muestra de estructura: sustitúyelo por tu enlace real antes de publicarlo. Usa `espanol`, `ingles` o `ruso` en `language`. Se admiten enlaces HTTPS de `litres.ru`, `litres.com` y sus subdominios. Si tu enlace usa otro dominio, revisa su autenticidad antes de adaptar la validación en `app.js`.

3. Comprueba la sección Libros del idioma correspondiente y abre el botón «Ver en LitRes». La compra se realiza en LitRes, en otra pestaña; esta web no procesa pagos.
4. Guarda y sube los cambios a GitHub para que Netlify actualice la web.

No hay panel de administración: los textos y las actividades se editan en los archivos. Para cambiar el nombre de la web, actualiza `index.html` y los textos de marca y título en `app.js`.

## Clasificación del catálogo inicial

- Español: Испанский для детей.
- Ruso: sin libros por ahora; se muestra «Libros de ruso: pronto disponibles».
- Inglés: Pluto va a la playa; Плуто осенью; Pluto in Autumn; Colorea animales en inglés; Mi primer libro de vocabulario en inglés; Pluto at home; Pluto goes to the beach; Раскраска с животными. Учим английский!; Английский для детей.

La clasificación sigue el idioma que se aprende, aunque el título o las instrucciones estén escritos en otro idioma.

## Temas y actividades

El contenido está en `activities.js`, el motor de actividades en `learning.js` y la navegación general en `app.js`. Cada idioma tiene diez temas y cincuenta actividades. Cada actividad de gramática tiene cinco frases propias, sin repetir las de otras actividades del mismo tema. En español se mantienen los cinco temas de gramática y los cinco de vocabulario solicitados.

Los temas tienen formatos diferentes: sopa de letras con selección de extremos, crucigrama conectado, memory de 24 tarjetas, tarjetas que se voltean, verdadero/falso, horarios, escritura, relaciones y frases ordenadas. Las actividades de gramática incluyen solo la palabra base entre paréntesis, sin repetir la persona. En el detective se escribe solo el fragmento corregido. Los errores se marcan sin mostrar la solución hasta pulsar «Ver solución».

Las ilustraciones, portadas y miniaturas propias se configuran en `media.js`. Consulta [la guía de imágenes](assets/README.md). No quedan emojis de objetos o acciones. Mientras faltan las imágenes, los retos usan descripciones de texto; las tarjetas de libros usan un diseño tipográfico. No se afirma que las actividades sean páginas de muestra de los libros mientras no se hayan verificado su contenido e ilustraciones.

Las respuestas admiten mayúsculas, espacios repetidos y puntuación final. En ruso se aceptan е y ё. Las tildes se mantienen en los ejercicios de escritura en español; los juegos aceptan las vocales con tilde y las normalizan en la cuadrícula, conservando ñ y й. Las variantes regionales y ciertos órdenes alternativos correctos se declaran expresamente en el contenido, sin coincidencias aproximadas que pudieran dar por válida una respuesta incorrecta.

El progreso se guarda en el navegador al completar una actividad. No es un contador global ni una cuenta personal. Las personas que compartan navegador comparten contador. No se envían respuestas ni progreso a un servidor; bloquear el almacenamiento no impide practicar.

Después de completar una actividad, aparece un libro relacionado con su tema o un libro del idioma correspondiente. Ruso muestra que todavía no hay libros. La recomendación abre el catálogo con el libro recomendado en primer lugar. Las fichas incluyen público, descripción, nivel, espacio para la portada y aviso de traducción de LitRes junto al botón. Las etiquetas no inventan rangos de edad concretos.

## Comentarios

El bloque de comentarios y dudas enlaza a `https://www.instagram.com/chave_books/`. No hay un tablón público ni un formulario que recoja mensajes en esta web.

## Analítica opcional

La analítica está desactivada en `analytics.js`. La web no incluye estadísticas inventadas ni carga Plausible mientras `enabled` sea `false`.

Para usar Plausible, primero crea una cuenta y registra el dominio público. Verifica su código de integración actual con el proveedor, configura el dominio y activa `enabled`. La integración preparada emite `Activity Started`, `Activity Completed` y `LitRes Click` con identificadores de idioma, tema, formato o libro. No incluye nombres, respuestas del alumno ni datos escritos. Crea esos objetivos en el panel de Plausible y verifica que se reciben antes de confiar en los informes. Puede requerir una suscripción.

Como alternativa, puedes activar Netlify Analytics en el panel de Netlify; la disponibilidad y coste dependen del plan. Sus estadísticas de solicitudes no sustituyen por sí solas los eventos de clic o de actividades de esta aplicación con rutas `#`.

## Vista previa en redes

El favicon está en `favicon.svg`. Las etiquetas Open Graph y Twitter están en `index.html`, con la imagen de `assets/social/chavebooks.png`. Si cambias de dominio, actualiza el enlace canónico, `og:url`, las URL de imagen y el dominio de analítica. Las redes comparten la portada general porque las subpáginas usan fragmentos `#`.

## Comprobación en navegador

Inicia el servidor local como se indica arriba. Con Node y Chromium instalados, instala Playwright fuera del repositorio y ejecuta:

```sh
npm install --prefix /tmp/chavebooks-check --cache /tmp/chavebooks-npm-cache --no-package-lock playwright
NODE_PATH=/tmp/chavebooks-check/node_modules node tests/browser.cjs
```

`CHROMIUM_PATH` permite cambiar la ubicación de Chromium (por defecto `/usr/bin/chromium`); `TEST_BASE_URL` permite cambiar el servidor. La comprobación recorre las 150 actividades, las soluciones opcionales, el catálogo y las pantallas móviles.

## Colección de animales

El contenido del tema de animales está adaptado a los doce animales identificados en las ilustraciones de la autora. Cada idioma tiene cinco actividades con grupos variados, y un memory de doce parejas (24 tarjetas) que los reúne a todos. Los doce originales recibidos en un RAR están guardados y asignados en `media.js`, sin alterar sus píxeles. El inventario y la distribución por ejercicio se documentan en `assets/animales/README.md`. Las imágenes de otras categorías y las portadas siguen pendientes.

Para comprobar la colección original de animales, los sinónimos aceptados, las 24 tarjetas del memory y los quince ejercicios en móvil:

```sh
NODE_PATH=/tmp/chavebooks-check/node_modules node tests/animals.cjs
```

Las ilustraciones de animales mostradas en la web usan ahora las versiones de mayor resolución de `assets/animales/mejoradas/`, con fondo blanco y bordes reconstruidos. El león mejorado ya no contiene la marca oscura del borde. Los doce originales se conservan sin cambios; el proceso de mejora puede variar pequeños detalles.

## Las frutas, en lugar de La comida

Los doce originales de `Frutas.rar` están en `assets/frutas/`. Este tema reemplaza comida en español, inglés y ruso, manteniendo diez temas y cincuenta actividades por idioma. Incluye letras que faltan, tarjetas que se voltean, un crucigrama de seis palabras con imágenes, una cesta que funciona con arrastrar y soltar, pulsaciones, teclado o selectores, y frases para completar.

Cada ejercicio usa su propio grupo de frutas. El inventario, los nombres en los tres idiomas y la distribución están en `assets/frutas/README.md`. Los enlaces antiguos de comida llevan a frutas. Sus actividades se guardan con una clave nueva para no dar por completados ejercicios que el alumno no ha hecho.

Las pruebas específicas verifican también las variantes regionales, la carga de las doce imágenes, el reinicio de la cesta, las soluciones opcionales y la vista móvil:

```sh
NODE_PATH=/tmp/chavebooks-check/node_modules node tests/fruits.cjs
```

## La ropa con doce ilustraciones

Los doce originales de `Ropa.rar` están en `assets/ropa/`, con nombres, variantes y distribución documentados en `assets/ropa/README.md`. Las cinco actividades son elegir entre tres nombres, sopa de letras, tarjetas que se voltean, frases con imágenes y un memory de 24 tarjetas. Esta secuencia es diferente de las de los demás temas de vocabulario.

La ropa ilustrada tiene su propia revisión de progreso: completar los ejercicios antiguos no marca automáticamente como hechas estas actividades nuevas. Los registros previos y el progreso de los demás temas se conservan.

Para verificar las imágenes, las tres opciones del nuevo ejercicio, las variantes regionales, el reinicio, el progreso y la vista móvil:

```sh
NODE_PATH=/tmp/chavebooks-check/node_modules node tests/clothes.cjs
```

### Acciones habituales

El tema que antes era «La rutina diaria» mantiene la ruta `#/espanol/actividades/rutina` y ahora usa las doce ilustraciones de la autora en `assets/acciones/`. Sus cinco actividades por idioma combinan reconocimiento en infinitivo, una historia ilustrada en presente, memory de 24 tarjetas, frases para ordenar y crucigrama. Los temas gramaticales se conservan; el futuro inglés ahora usa planes con going to. Los archivos pequeños se muestran a tamaño moderado, sin interpolarlos ni modificar los originales. Verificación específica: `NODE_PATH=/tmp/chavebooks-check/node_modules node tests/actions.cjs`.

### Colores

«Colores» sustituye a «Partes de la casa» en los tres idiomas con doce pinturas de la autora, presentación con tarjetas, frases sobre ilustraciones, memory de 24 tarjetas, selección visual de pinturas y sopa de letras. `#/espanol/actividades/casa` redirige a `#/espanol/actividades/colores` sin aplicar el progreso antiguo al tema nuevo. Los colores de la sandía aceptan ambos órdenes y variantes equivalentes. Verificación específica: `NODE_PATH=/tmp/chavebooks-check/node_modules node tests/colors.cjs`.

## Navegación, idiomas y práctica (revisión de octubre de 2026)

La bienvenida se ha reducido y el ruso tiene un tono más morado. «Siguiente actividad» aparece antes del libro. Al completar las cinco actividades se ofrece una felicitación y un enlace destacado a `#/espanol/actividades/<tema>/resumen`, con un informe de práctica, otros temas y un libro relacionado.

Los menús generales permanecen en español. Las consignas, títulos de temas y pistas de inglés/ruso están en el idioma de estudio; la consigna principal tiene ayuda en español desplegable. `localization.js` mantiene los textos de interfaz y sus patrones numéricos; las frases y pistas educativas se escriben directamente en el idioma correspondiente en `activities.js`. Los textos dinámicos de la interfaz se traducen al renderizarse sin alterar valores de respuestas ni las ayudas marcadas `data-no-translate`.

Cada tema gramatical de verbos usa 25 verbos distintos, cinco por actividad. La segunda actividad contiene cinco ilustraciones de acciones de la autora; el relato del tercer ejercicio usa un grupo nuevo de verbos. Los temas rusos no verbales también cambian de sustantivos. La revisión `practica-v3` conserva el historial previo sin marcar como completado el contenido nuevo. El futuro inglés conserva la ruta `future` y practica `am/is/are going to`.

La sandía tiene dos campos largos unidos por «y», «and» o «и». Los huecos de frases se muestran como una línea larga. Las pistas de letras que faltan usan casillas, diferenciadas de los huecos para palabras completas. La cesta de frutas relaciona pedidos escritos con fotografías sin etiquetas de respuesta; admite ratón, arrastre, teclado y selectores.

Los crucigramas solo cruzan palabras perpendicularmente. La numeración sigue el orden de lectura; las pistas se agrupan y ordenan por horizontal/vertical. Elegir una pista resalta su palabra; escribir avanza a la siguiente casilla y las flechas permiten moverse. Las vocales con tilde se aceptan y se normalizan; ñ y й se conservan.

Los memory insertan y precargan las imágenes con carga inmediata antes de activar las tarjetas. Usan los PNG originales pequeños de animales para sus miniaturas de 85px; las vistas grandes mantienen las mejoras. Si falla una imagen, muestran su descripción. Los recortes solicitados de caminar/correr están en `assets/acciones/recortes/`; los originales permanecen intactos.

`chavebooks-progress-v1` conserva las actividades completadas. `chavebooks-attempts-v1` guarda solo contadores locales de comprobaciones, respuestas incorrectas, consultas de soluciones y parejas fallidas; no almacena las respuestas escritas ni las envía. El resumen no inventa notas para actividades antiguas sin datos. Los controles de reinicio por tema o idioma piden confirmación dentro de la página y borran únicamente el ámbito seleccionado. Reiniciar un formulario limpia sus respuestas; reiniciar el progreso del tema también borra sus contadores e historial local.

Verificación de estos recorridos: `NODE_PATH=/tmp/chavebooks-check/node_modules node tests/review.cjs`. Se conserva la prueba completa de 150 actividades en `tests/browser.cjs` y las pruebas específicas de los cinco temas ilustrados.
