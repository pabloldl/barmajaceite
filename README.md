# Bar Majaceite

Landing local de Bar Majaceite, realizada en HTML5, CSS3 y JavaScript vanilla. No requiere instalación, compilación, servicios externos de ejecución ni frameworks. Todo el proyecto está en esta carpeta; no se han modificado otros negocios ni realizado despliegues.

## Abrir

Abrir `index.html` con **Live Server** en VS Code. También puede abrirse directamente en el navegador. Para copiar automáticamente el teléfono, el navegador necesita un contexto seguro, como `localhost`; si la API no está disponible o se deniega, se muestra el número en un campo seleccionable.

Las fuentes y fotografías se sirven localmente. No hay analítica, cookies, formularios, llamadas a API, reservas ni WhatsApp. Los enlaces a Maps, Pexels y la carta se abren solamente al pulsarlos.

## Dirección creativa

**MAJACEITE / EL BAR DEL PUEBLO** se usa como concepto gráfico, sin atribuir historia, propiedad familiar, popularidad o un ambiente no comprobado al negocio. Portada con nombre horizontal, fotografía en una franja desplazada y anotaciones laterales. El recorrido pasa del nombre a una selección gastronómica, una invitación visual y una pieza de dirección y contacto inspirada en un resguardo.

Paleta: marfil `#F4EBDD`, azul mineral `#315A75`, coral `#D66A4E`, grafito `#282C2B`, blanco cálido `#FFFDF8`. Bricolage Grotesque para la identidad y DM Sans para lectura. El coral se reserva para acentos. Animación inicial tipográfica, acercamiento fotográfico discreto, filtros manuales y microinteracciones. Sin carruseles, parallax ni scroll interceptado. Se respeta `prefers-reduced-motion`.

## Investigación y criterio editorial

Investigación realizada el **27 de octubre de 2026**. Los resultados web y los directorios no prueban por sí solos la vigencia de una carta ni la apertura actual de un establecimiento.

| Dato | Fuente / decisión |
| --- | --- |
| Nombre, teléfono, dirección | Encargo: Bar Majaceite, Calle Jaén, 31, 11670 El Bosque, Cádiz; 655 360 519. Dirección y teléfono corroborados en [Kaliskka](https://es.kaliskka.es/bar-majaceite/); dirección también en [Restaurant Guru](https://es.restaurantguru.com/Bar-El-Majaceite-Spain). |
| Actividad | Bar. Coincide con el encargo y los directorios consultados. |
| Oferta publicada | [Carta de Bar Majaceite en Odibo](https://www.odibo.es/carta/index.php?short=barmajaceite), identificada por el nombre, El Bosque y el mismo teléfono 655360519. Incluye los seis platos mostrados y vinos tintos y blancos. Se presenta como selección de una carta publicada, sin afirmar disponibilidad actual, especialidades o precios vigentes. |
| Dirección discordante | Odibo indica Calle Jaén, 25, frente a la piscifactoría; otros directorios citan Camino de los Pescadores. Se conserva **Calle Jaén, 31**, facilitada expresamente para este proyecto y corroborada por dos directorios. Confirmar con el titular antes de una futura publicación. |
| Horarios | Los directorios ofrecen horarios diferentes. Odibo publica franjas de cocina sin fecha de vigencia. No se trasladan a la página ni a los metadatos. Se invita a consultar por teléfono. |
| Redes oficiales | No se identificó un perfil cuya titularidad pudiera corroborarse. No se añaden enlaces supuestos. |
| Servicios, terraza, reservas, entrega y accesibilidad física | Existen menciones contradictorias o no confirmadas por el titular. No se publican. |
| Fotografías reales | Se localizaron fotografías de terceros en directorios, sin permiso de reutilización verificable. No se descargaron ni se usaron. Se eligieron recursos licenciados con indicación visible de su carácter ilustrativo. |
| Opiniones e historia | No se reutilizan valoraciones, testimonios, premios, historia familiar ni años de actividad. |

El rastreador permitió consultar el contenido indexado de Odibo; una apertura directa devolvió error de conexión. No se incluye una copia local de la carta. El enlace queda disponible como fuente externa y se indica que puede cambiar.

## Fotografías y licencias

[Licencia Pexels](https://www.pexels.com/license/): permite uso y modificación, incluido uso comercial; no debe insinuarse respaldo por las personas o marcas fotografiadas. No se usan las imágenes como marca. Créditos visibles en el pie, además de esta documentación.

| Archivo servido | Autor / procedencia | Dimensiones decodificadas | Peso WebP |
| --- | --- | --- | --- |
| `img/cristal-y-luz.webp` | [Harper Sunday, Pexels 18275923](https://www.pexels.com/photo/glass-on-a-table-in-a-restaurant-18275923/) | 1600 × 1221 | 113 482 bytes |
| `img/sobremesa.webp` | [Fabian Reck, Pexels 18340390](https://www.pexels.com/photo/afternoon-sun-shining-through-the-window-into-the-restaurant-18340390/) | 1600 × 2400 | 157 392 bytes |

Originales JPG conservados en `img/`. Descarga desde `images.pexels.com` con parámetro de ancho 1600; firma JPEG validada y contenido decodificado en Chrome. Conversión real con canvas a WebP, calidad 0,83; originales y WebP mantienen las mismas dimensiones. Se aplica un recorte visual mediante `object-fit`, sin alterar lo que se atribuye al negocio. Las fotos no muestran platos supuestamente servidos ni el interior del establecimiento. Las dos imágenes WebP suman unos 265 KiB.

Fuentes descargadas del repositorio oficial [google/fonts](https://github.com/google/fonts): [Bricolage Grotesque](https://github.com/google/fonts/tree/main/ofl/bricolagegrotesque) y [DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans), bajo SIL Open Font License. Licencias completas junto a los archivos en `css/fonts/`. El favicon es un dibujo SVG propio.

## Revisión de originalidad

Se revisaron en modo lectura los HTML y CSS de las seis referencias presentes en el espacio de trabajo. No se ejecutaron ni se hizo una comparación visual completa de esas webs. No se ha copiado su código ni se han usado sus archivos como punto de partida.

| Referencia | Diferenciación comprobada en el código |
| --- | --- |
| Mesón Bar España | Su portada combina tarjeta superpuesta y fotografía. Aquí el nombre precede a una franja fotográfica desplazada; no hay tarjeta sobre la foto de portada. Bricolage Grotesque y DM Sans sustituyen a Bree y Figtree. |
| Tasquita El Callejón | Su rótulo y su tratamiento geométrico usan Archivo/Figtree. Aquí la familia es Bricolage Grotesque/DM Sans, hay un registro gastronómico interactivo y un contacto en forma de resguardo. No se repiten motivos de esquinas ni azulejos. |
| Abacería de Julián | Composición editorial de productos, Gloock e Instrument Sans. Aquí el discurso parte del bar y la selección de carta; cambia la tipografía, la jerarquía, la navegación y el contacto. |
| Venta Mateo | No se reutilizan su composición, imágenes ni sistema Barlow/Public. Se desarrolla una identidad tipográfica y un recorrido de comanda propios. |
| Café-Pub Andalucía | No hay hero fotográfico de fondo, tarjetas de momentos ni galería. Cambian la composición, fuentes, paleta, botones y footer. |
| Restaurante Hotel Puerta del Parque | No hay hero dividido, tres tarjetas de platos, sección panorámica ni diario fotográfico. Cambian la tipografía, la arquitectura y la pieza de contacto. |

La auditoría es una revisión concreta frente a estas seis referencias; no es una afirmación de originalidad absoluta respecto a todas las webs existentes. Los enlaces `tel:` y Maps mantienen los patrones estándar necesarios para funcionar.

## Pruebas ejecutadas

`qa/audit.cjs` abre Chrome headless con una instalación de Playwright ya existente en el equipo. No es una dependencia del sitio. Puede indicarse otra ruta de Playwright mediante `PLAYWRIGHT_PATH`; también debe adaptarse `executablePath` si se ejecuta en otro equipo. El servidor temporal se cierra al terminar. Ejecutar desde la carpeta:

```text
node qa/audit.cjs
```

Resultados en `qa/report.json`. Capturas locales en `qa/desktop-375.png`, `qa/desktop-768.png`, `qa/desktop-1440.png`, `qa/desktop-1920.png` y `qa/no-js-375.png`.

- Navegador real a 375, 768, 1440 y 1920 px: sin desbordamiento horizontal, con imágenes decodificadas y rutas válidas.
- Filtros ejecutados: todo (6), pescado/marisco (4), carnes (2), con estado `aria-pressed` y anuncio del resultado.
- Menú móvil: apertura por clic y teclado, cierre con Escape y retorno del foco, cierre tras enlace y foco en destino, clic exterior y cambio a escritorio.
- Scroll real al destino, enlaces internos existentes, enlaces de teléfono y direcciones de Maps inspeccionados.
- Escritura y lectura reales del portapapeles; también se fuerza la falta de API para probar el campo alternativo.
- Desplegables, primer foco de teclado en el enlace de salto y movimiento reducido comprobados.
- Contexto con JavaScript desactivado: navegación visible, seis platos visibles e imágenes cargadas. Se ocultan los controles que requieren JS.
- Sin errores JavaScript ni respuestas HTTP de error para los recursos locales. Comprobación de sintaxis con `node --check js/script.js`.

Se revisaron visualmente las capturas de escritorio y móvil. Estas pruebas no equivalen a una certificación WCAG ni sustituyen pruebas con lectores de pantalla. No se han realizado llamadas, visitas al bar, reservas ni recorridos reales en Google Maps. No se verifica que el sitio externo de la carta esté siempre disponible.

## SEO y futura publicación

Título y descripción locales, Open Graph, documento semántico en español y datos estructurados `BarOrPub` con teléfono y dirección, sin horarios ni servicios inferidos. Por petición, no se publica ni se añade un dominio ficticio. `og:image` queda con ruta relativa: al conocer el dominio de producción, establecer URL absoluta para esa imagen, `og:url` y canonical. Se ha evitado usar una fotografía ilustrativa como imagen del establecimiento en los datos estructurados.
