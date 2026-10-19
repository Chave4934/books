# Imágenes propias de chavebooks

Puedes adjuntar las imágenes en el chat o subirlas a estas carpetas desde GitHub. PNG, JPG y WebP son adecuados. Usa archivos finales sin datos personales y nombres cortos, sin espacios ni tildes. Para publicar solo hacen falta los archivos, no una cuenta de almacenamiento ni claves.

Después de subirlos, asigna sus rutas en `media.js`, sustituyendo los `null`. Ejemplo:

```js
"ropa/1": "assets/ropa/vestido.webp"
```

Se reutiliza cada ilustración en los tres idiomas. Los textos alternativos y las pistas están en `activities.js`.

## Vocabulario: claves de `window.MEDIA.vocabulary`

| Carpeta / clave | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| animales | Ver colección de doce animales en `animales/README.md` | — | — | — | — |
| casa | dormitorio completo | cocina | baño | salón | jardín |
| ropa | vestido | pantalones | camiseta | zapatillas | abrigo |
| rutina | persona despertándose | persona duchándose | persona desayunando | persona estudiando | persona durmiendo |
| frutas | Ver colección de doce frutas en `frutas/README.md` | — | — | — | — |

Las escenas de casa deben mostrar habitaciones completas, no una cama aislada para representar un dormitorio. Las de rutina deben mostrar una persona realizando la acción; un despertador o un bol por sí solos no la explican.

En ropa, el memory tiene otras cinco palabras. El de animales usa los doce originales recibidos. Sus claves 6–10 corresponden a:

- ropa: falda, sombrero, calcetines, bufanda, guantes;

Antes de adaptar el contenido a un libro, confirma la lista de animales, objetos o acciones que contiene esa edición. La lista actual es material independiente; no debe anunciarse como una muestra literal del libro hasta usar sus mismos elementos e ilustraciones.

## Portadas: `window.MEDIA.covers`

Sube las portadas a `assets/portadas/` y asigna las rutas a las claves con el identificador de LitRes. Por ejemplo:

```js
"74602999": "assets/portadas/pluto-in-autumn.webp"
```

Los identificadores, títulos, público y descripciones están en `books.js`. Hasta recibir las portadas, las tarjetas usan un diseño tipográfico de la web, sin afirmar que sea la portada original.

## Imágenes de los temas

`window.MEDIA.topics` permite añadir una imagen propia a la tarjeta de un tema, por ejemplo `"animales": "assets/temas/animales.webp"`. Hasta entonces se muestran iconos vectoriales sencillos, no emojis.

## Compartir en redes

`social/chavebooks.png` es la imagen general de vista previa, de 1200 × 630 píxeles. Su fuente editable es `social/chavebooks.svg`. No contiene portadas ni imágenes de los libros. Al actualizarla, puede que las redes sociales mantengan temporalmente una copia anterior en su caché.

La colección de animales usa claves semánticas (`animales/perro`, `animales/leon`, etc.), no las claves numéricas antiguas. Consulta [su inventario y distribución](animales/README.md). Los doce originales de animales ya están guardados y asignados en la web. La colección de frutas también tiene sus doce originales asignados; consulta `frutas/README.md`. Casa, ropa, rutina y portadas conservan sus rutas sin asignar hasta recibir sus archivos.
