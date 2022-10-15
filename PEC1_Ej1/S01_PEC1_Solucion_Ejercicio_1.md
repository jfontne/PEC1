# Ejercicio 1 - Parte teórica
## La aparición de HTML5/CSS3/JS ha supuesto el nacimiento del desarrollo front-end moderno.
### ¿Cuál es la ventaja del uso de etiquetas semánticas? Nombra y explica al menos 3 de estas ventajas.
1. Posicionamiento: Los buscadores pueden localizar mejor los contenidos importantes dentro de un documento.
2. Practicidad: Todo documento bién organizado, p.e. mediante listas numeradas `<ol>`o viñetas `<ul>`, nos permite saber que todo ese contenido va realicionado de manera ordenada.
3. Reusabilidad: En los primeros tiempos del mundo web, prácticamente todo el contenido se realizaba en un archivo HTML, se mezclaba el contenido con la presentación (tipos de letra, colores, tamaños, etc.) siendo muy difícil poder realizar simples modificaciones y también ver el contenido de la página, con la aparición de CSS en archivos externos podemos separar la parte de estructura y contenido de la parte púramente de presentación.
4. Accesibilidad: Para personas ciegas la lectura de documentos bién estructurados semánticamente será mucho más entendedora que un documento sin estructura semántica.

### Cita al menos 3 APIs HTML5 y explica brevemente su funcionalidad.
1. El DOM (Modelo de Objeto de Documento) API te permite manipular, crear, remover y cambiar códigos escritos en lenguaje HTML y CSS, incluso aplicando dinámicamente nuevos estilos a tu página web, etc. Cada vez que, por ejemplo, aparezca un aviso (popup) en una página web o se muestre nuevo contenido, la DOM API actúa.
2. La Gelocation API recupera información geográfica. Así es como Google Maps es capaz de encontrar tu ubicación y mostrarla en un
mapa.
3. La Canvas y WebGL APIs permiten crear gráficos 2D y 3D animados.
4. APIs de Audio y Vídeo como HTMLMediaElement y WebRTC permite hacer cosas realmente interesantes con multimedia, p.ej. escuchar un
audio o un vídeo, grabar un vídeo con tu webcam, etc.

### Cita qué opción ofrece CSS3 para conseguir que se apliquen diferentes estilos CSS sobre el mismo elemento en su visualización en diferentes dispositivos (diferentes tamaños de pantalla).
* Las media queries `@media` nos permite "preguntar" que tipo de pantalla tenemos para aplicar diferentes estilos que se adapten mejor a esa pantalla. la sintaxis básica podría ser la siguiente.
~~~
@media (min-width: 700px) { codigo CSS }; //En este caso se activarà el codigo CSS si la pantalla tiene una resolución mínima e 700px
~~~
  * Hay diferentes tipos de `@media`:
    * all: Para cualquier tipo de salida.
    * screen: Que afecta a la salida en pantalla.
    * print: Enfocado a la salida por impresora.
    * speech: Para salida por sintetizador de voz.

[Fuente MDN web docs](https://developer.mozilla.org/es/docs/Web/CSS/Media_Queries/Using_media_queries)

## El lenguaje CSS es muy rígido, poco práctico y ordenado a la hora de programar. Para evitar este problema se han creado los preprocesadores CSS, que ofrecen evidentes ventajas.
### Cita al menos 2 de estos preprocesadores.
1. SASS
2. LESS
3. STYLUS

### Cita al menos 4 ventajas que ofrecen estos preprocesadores.
1. Código mucho más fácil y simple.
2. Uso de herramientas más complejas.
3. Uso de variables como un lenguaje de programación.
   1. Ejemplo:

~~~
   $color-fondos: #F55;
    h1 {
      background-color: $color-fondos;
    }
~~~

4. sñlkflñsdfk

### Explica brevemente en qué consisten los sourcemaps.
* El sourcemap es un índice/enlace entre el codigo escrito originalmente y el código resultante para la web. Una vez en producción el código generado, comprimido y ofuscado se puede volver ilegible para su depuración. Si necesitases debuguear algo no serías capaz sin la ayuda de un sourcemap. Este le dice a la herramienta depuradora como volver a reconstruir el código para que sea legible, ofreciéndotelo así para su posterior debugueo.

### Explica qué es un transpilador.
* Un transpilador transforma un codigo escrito en un lenguaje a otro normalmente de más bajo nivel. Esto puede ser muy útil, por ejemplo, para transformar un codigo escrito que no sea compatible con navegadores actuales a codigo que sea 100% compatible.

[fuente: wikipedia](https://es.wikipedia.org/wiki/Transpilador)

## El flujo de trabajo profesional en front-end hace indispensable el uso de herramientas como controles de versiones y herramientas de gestión de módulos.
### Cita al menos dos sistemas de control de versiones y dos herramientas de gestión de módulos.
* skdfjlsfjlsdfj

### Cita y explica al menos 3 comandos de Git.
* vamos a ver tres comandos báicos de git

~~~
git add README.md
//Marcamos un fichero modificado para subirlo a nuestro repositorio

git commit -m "Nova versió del fitxer README.md"
//Antes de poder subir el fichero tenemos que comentarlo para ver un pequeño comentario orientativo

git push https://github.com/jfontne/PEC1
//Aquí realizamos la subida del fichero/s marcados anteriormente a nuestro repositorio
~~~

### Cita y explica brevemente las características más definitorias de WebPack.
* klsjflskjflsdjf