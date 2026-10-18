# chavebooks

Web estática para estudiar español, inglés y ruso. Incluye diez temas por idioma, cinco actividades por tema (150 en total) y cinco preguntas por actividad. Las actividades permiten elegir respuestas, escribir, completar textos, ordenar frases, corregir errores, identificar ilustraciones y relacionar vocabulario. Cada idioma conserva su propio color pastel. El pie de todas las páginas enlaza a Instagram: @chave_books.

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
    language: 'ingles',
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

El contenido está en `activities.js` y la presentación y corrección en `app.js`. Cada idioma tiene cinco temas de gramática y cinco de vocabulario. En español, el presente regular e irregular se agrupa en un solo tema para incluir también indefinido, perfecto, imperfecto, futuro y las cinco áreas de vocabulario solicitadas. Inglés y ruso tienen sus propios temas gramaticales.

Cada tema tiene cinco modalidades con los mismos cinco ejemplos, para repasarlos desde distintas perspectivas. Las ilustraciones de vocabulario usan pictogramas emoji del dispositivo, con descripciones accesibles y pistas. No necesitan servicios externos ni generación de imágenes.

Las rutas son `#/ingles/actividades`, `#/ingles/actividades/ropa` y `#/ingles/actividades/ropa/1`, por ejemplo. Cada actividad tiene corrección, reinicio y enlaces para cambiar de actividad o tema. Las respuestas escritas toleran mayúsculas, espacios repetidos y puntuación final; en ruso se aceptan е y ё. En español se mantienen las tildes. Algunas palabras de vocabulario admiten variantes regionales explícitas.

Una actividad se marca como completada al obtener cinco respuestas correctas. Ese progreso se guarda solo en el almacenamiento local del navegador; no hay cuentas ni sincronización entre dispositivos. El bloqueo del almacenamiento no impide hacer las actividades.
