# Revisión de calidad de chavebooks

## Resultado

Los 20 puntos de la lista se han aplicado o resuelto con criterio editorial. No hay cambios de implementación pendientes. Las 60 ilustraciones originales se han comparado por SHA-256 con la versión anterior y siguen intactas. Se conservan `chavebooks-progress-v1`, `practica-v3` y las revisiones existentes de los temas.

La versión para publicar se genera con `node scripts/build.cjs` en `dist/`. Contiene **2,31 MB de imágenes**, incluidas la vista previa social y las miniaturas, frente a unos 9,8 MB en el árbol completo anterior. Las versiones grandes se conservan en el repositorio y no se distribuyen con el sitio.

## Lista de tareas

| Punto | Resultado |
|---|---|
| 1 | Ana y los demás nombres propios se conservan con mayúscula. |
| 2 | Consejos coherentes en español, ejemplos presentes en el contenido y consejos útiles por tema de vocabulario. |
| 3 | Nota de progreso con tuteo uniforme y traducciones de inglés/ruso. |
| 4 | Una sola consigna visible en cada memory. |
| 5 | Eliminadas las formas artificiales señaladas. Se usan errores habituales de aprendiz o formas reales; se conserva una única respuesta correcta. |
| 6 | Eliminados los alias shoes/shoe/zapatos/zapato para botas. La imagen real `assets/ropa/zapatos.png` muestra botines con cordones: se mantiene **ботинки**, sin introducir сапоги como equivalente. |
| 7 | Escenarios variados para las historias y marcadores compatibles; perfecto tratado como informe de acciones recientes, no como narración cerrada; English sustituye a Spanish en las frases de aprendizaje de inglés. |
| 8 | Banner oculto y navegación compacta solo en pantallas móviles de ejercicio; el h2 queda a la vista. |
| 9 | Los seis crucigramas caben a 320, 360 y 375 px sin scroll horizontal; casillas de al menos 28 px. |
| 10 | Enlaces solicitados de al menos 44 px y texto de interfaz de al menos 12 px, incluidos los números de casillas. |
| 11 | Seis opciones únicas por reto de color: 36 imágenes, con conjuntos de distractores distintos. |
| 12 | Doce derivados WebP de 600 px y menos de 120 KB cada uno; juntos ocupan unos 148 KB. Los memory mantienen sus miniaturas pequeñas. |
| 13 | Portadas provisionales con marca y dibujo neutro; etiquetas uniformes ocultas y un único aviso de LitRes encima de la lista. |
| 14 | Filtros por público y agrupación de los libros de Pluto, conservando el acceso al libro recomendado. |
| 15 | Metadatos opcionales; solo el libro confirmado añade PDF, 78 páginas, más de 300 palabras y sus cinco temas. |
| 16 | Campo titleEs para los títulos rusos, mostrado en catálogo y recomendaciones. |
| 17 | Eliminada la promesa de temas no confirmados del resumen. Solo se muestran los topics del libro que los tiene verificados. |
| 18 | Publicación por lista permitida en dist; README, tests, scripts, diseños y archivos grandes archivados quedan fuera. Incluye una página 404. |
| 19 | PNG social de 1200×630, titular actual, fuentes reales Manrope y DM Sans y tres ilustraciones derivadas. Metadatos OG/Twitter coherentes. |
| 20 | Títulos de pestaña específicos para resúmenes, traducidos según el idioma de estudio. |

La vista previa social tiene una nueva composición derivada del perro, el elefante y la fresa de la autora. La composición del fondo se creó con la herramienta de imágenes; el texto se renderizó con las fuentes reales, alojadas localmente y acompañadas de sus licencias. No se modificaron los archivos originales de esas ilustraciones.

## Pruebas ejecutadas

Todas las pruebas siguientes finalizaron correctamente. La comprobación final usa un servidor local de `dist/`, la misma carpeta que Netlify publicará.

| Prueba | Comprobación |
|---|---|
| tests/content.cjs | Bloque 1: nombres, consejos, errores plausibles, rechazo de alias incorrectos, memory y claves. |
| tests/mobile.cjs | Bloque 2: título visible, seis crucigramas sin scroll horizontal, objetivos táctiles, texto ≥12 px, 36 imágenes y presupuesto por animal. |
| tests/books.cjs | Bloque 3: filtros, series, datos opcionales verificados, títulos traducidos y aviso único. |
| tests/publish.cjs | Bloque 4: rutas internas HTTP 404, recursos públicos y fuentes, imagen OG 1200×630, títulos de resumen e imágenes <3 MB. |
| tests/browser.cjs | 150 actividades completables y 375 enunciados gramaticales distintos; progreso, libros, soluciones y móviles. |
| tests/animals.cjs | Imágenes optimizadas, memory, variantes de respuestas y 15 actividades de animales. |
| tests/fruits.cjs | 15 actividades, arrastre, pulsaciones, teclado, soluciones y variantes regionales. |
| tests/clothes.cjs | 15 actividades de ropa, pedidos ilustrados, opciones, memoria y conservación de progreso. |
| tests/actions.cjs | 15 actividades de acciones, historias, imágenes, soluciones y móvil. |
| tests/colors.cjs | 15 actividades de colores, formatos, variantes, respuestas dobles y móvil. |
| tests/review.cjs | Recorridos completos, verbos variados, informe, reinicios aislados, teclado y crucigramas. |
| tests/polish.cjs | Expresiones temporales, tres opciones, dos ayudas, pedidos por imágenes y miniaturas. |

Además: build de producción correcto, comprobación de sintaxis de JavaScript y `git diff --check` sin errores.

## Límites y comprobaciones externas

- No se ha podido verificar el despliegue público desde este entorno: la conexión a `magnificent-empanada-bff6dc.netlify.app` devuelve un error de conexión (`URLError`). Las comprobaciones HTTP y de funcionamiento citadas corresponden al paquete de producción local. La publicación real y las cachés de vista previa dependen del despliegue automático de Netlify y de las redes sociales.
- Los campos adicionales de los demás libros quedan sin rellenar hasta que la autora aporte datos confirmados, tal como pide la lista. No es una funcionalidad pendiente: ya se admiten esos campos.

## Archivos modificados o añadidos

- `.gitignore`
- `404.html`
- `QUALITY_REPORT.md`
- `README.md`
- `activities.js`
- `app.js`
- `assets/animales/optimizadas/caballo.webp`
- `assets/animales/optimizadas/cerdo.webp`
- `assets/animales/optimizadas/conejo.webp`
- `assets/animales/optimizadas/elefante.webp`
- `assets/animales/optimizadas/gato.webp`
- `assets/animales/optimizadas/leon.webp`
- `assets/animales/optimizadas/mono.webp`
- `assets/animales/optimizadas/oso.webp`
- `assets/animales/optimizadas/oveja.webp`
- `assets/animales/optimizadas/pato.webp`
- `assets/animales/optimizadas/perro.webp`
- `assets/animales/optimizadas/vaca.webp`
- `assets/fonts/OFL-dm-sans.txt`
- `assets/fonts/OFL-manrope.txt`
- `assets/fonts/dm-sans-latin-wght-normal.woff2`
- `assets/fonts/manrope-cyrillic-wght-normal.woff2`
- `assets/fonts/manrope-latin-wght-normal.woff2`
- `assets/social/chavebooks.png`
- `books.js`
- `design/social-background.webp`
- `design/social.html`
- `index.html`
- `learning.js`
- `localization.js`
- `media.js`
- `netlify.toml`
- `scripts/build.cjs`
- `scripts/render-social.cjs`
- `styles.css`
- `tests/animals.cjs`
- `tests/books.cjs`
- `tests/browser.cjs`
- `tests/clothes.cjs`
- `tests/colors.cjs`
- `tests/content.cjs`
- `tests/mobile.cjs`
- `tests/polish.cjs`
- `tests/publish.cjs`
