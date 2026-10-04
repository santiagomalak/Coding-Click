# Marca y diseño — sistema visual v1 (definitivo para el lanzamiento)

Reemplaza la versión anterior de este documento (paleta violeta/galaxia). Se mantiene de esa primera referencia el fondo negro, las esferas 3D, el cursor custom, los titulares con outline y las etiquetas entre corchetes — lo demás se actualizó con el sistema "tech lab" que definimos con Santiago.

## Estado de la marca
- Nombre: "Coding Click" (PROVISORIO, se sigue definiendo — ver pendientes).
- Logo: lo está diseñando la persona a cargo de marketing. Mientras tanto usar `marca/logo-provisorio.svg`.
- Todo (nombre, logo, colores, tipografías, textos) se edita desde un único archivo de configuración (`site.config`), nunca hardcodeado en componentes.

## Personalidad y tono de voz
Moderna, segura y cercana. Habla claro, sin jerga. Transmite "hacemos todo por vos: web + marketing". Voseo rioplatense. Público NO técnico: la estética puede ser sofisticada, pero la lectura tiene que ser instantánea.

## Referencia visual
Inspiración (no copiar): sitio de Kynesys (diseño de Denys Ishchenko, Dribbble). Estética "tech lab" oscura y minimalista: negro profundo, tipografía gigante y fina, objetos 3D esféricos con física y microinteracciones de cursor.

## Modo de color: solo oscuro en v1
La v1 se lanza **únicamente en modo oscuro**. Un modo claro queda documentado más abajo como mejora futura, pero no se implementa ahora — motivo: el sistema de esferas 3D, el cursor con `mix-blend-mode: difference` y todo el motion están pensados para leerse sobre negro, y sumar un toggle día/noche desde el arranque agrega superficie de testing sin necesidad real para el público (pymes no técnicas). Los colores se definen igual como tokens, así que sumar el modo claro después no implica reescribir nada.

### Paleta oscura (v1, la que se implementa)
| Rol | Color |
|---|---|
| Fondo | #050505 |
| Texto principal | #F5F5F5 |
| Texto secundario | #93987F (gris con un toque sutil de verde lima — antes #8A8A8A neutro, cambiado 2026-09-30, ver nota abajo) |
| Líneas / divisores | #1F1F1F |
| Acento único | #C6FF3D (lima) |

Reglas: un único acento, usado con moderación (CTAs, hover, números clave, ripple del click, halos). Sin gradientes de color ni sombras DE COLOR — la profundidad sale de las luces del 3D y de los grises. Nunca el acento en párrafos largos ni texto chico. Excepción explícita a "sin sombras": todo el texto del sitio lleva una sombra NEGRA sutil (`text-shadow`, ver nota abajo) — no es una sombra de color, es puro contraste, invisible sobre el fondo negro y solo se nota donde el texto pasa sobre las esferas 3D.

**Nota 2026-09-30 (feedback de Santiago viendo el deploy con las esferas 3D)**: el texto secundario se perdía visualmente al pasar sobre las esferas de fondo (mucho contraste propio: zonas casi negras y brillos blancos intensos). Evaluamos beige y un lima más mate como alternativas de color — ninguna resuelve el problema de raíz porque es un problema de CONTRASTE LOCAL contra un fondo con brillo variable, no de qué matiz se elige (cualquier color de luminosidad media tiene el mismo problema). La solución real fue sumar `text-shadow: 0 1px 5px rgba(0,0,0,0.65)` en `body` (se hereda a todo el texto, ver `src/styles/index.css`) — como es negro y el fondo también es casi negro, no se nota en ningún lado EXCEPTO donde hace falta (sobre las esferas). Además, como ajuste de marca (no de legibilidad), el gris secundario pasó de neutro a un gris con un toque de verde lima.

### Paleta clara (documentada, NO implementar en v1)
| Rol | Color |
|---|---|
| Fondo | #FAF7F0 (beige) |
| Texto principal | #1A1A1A |
| Acento único | lima desaturado (bajar saturación del #C6FF3D para contraste AA sobre claro; no usarlo puro — pega muy fuerte sobre beige) |

## Tipografía
- **Display**: grotesca geométrica fina y ancha, 88–160px en desktop, tracking -0.03em, interlineado 0.95, peso Light (300). Era Space Grotesk; se cambió a **Outfit** el 2026-10-03 porque la "g" minúscula de Space Grotesk es un lazo cerrado que se lee ambiguo como "q" a este tamaño en los 5 pesos (glifo del diseño de la tipografía, no un bug de peso/carga — se comprobó renderizando "negocio" en los 5 pesos). Outfit mantiene el mismo espíritu geométrico con una "g" convencional y legible ya en Light.
- **Recurso firma**: en los titulares principales, la última línea sólida excepto una palabra clave en versión outline (`color: transparent` + `-webkit-text-stroke: 1px`).
- **Cuerpo**: Inter, 16–18px; bajadas destacadas en bold con interlineado 1.15.
- **Etiquetas de sección**: mayúsculas 11px, letter-spacing 0.08em, gris, entre corchetes y numeradas → `[ 01 — SERVICIOS ]`.
- **Nav y links chicos**: mayúsculas 11–12px.

## Layout

### El marco del hero (resolución acordada con Santiago)
El hero arranca **dentro de un marco redondeado sutil** (como se ve en la referencia de Kynesys) para concentrar el foco en la primera impresión. A medida que el usuario scrollea, ese marco se abre/desvanece (el padding y el radius se reducen progresivamente) y el resto de las secciones corren **full-bleed**, borde a borde, sin contenedor. Es una transición, no dos sistemas separados.

### El resto del sitio (post-hero)
- Grilla de 12 columnas, márgenes laterales de 5vw, full-bleed.
- Secciones separadas por líneas horizontales de 1px (look editorial/técnico), sin cards con bordes redondeados grandes ni fondos en caja.
- Mucho espacio negativo: las secciones principales ocupan como mínimo ~100vh en desktop.
- Composición asimétrica: titulares anclados abajo a la izquierda, textos de apoyo y CTAs en la columna derecha.
- Las listas de servicios o ítems (packs, portfolio) van como **filas full-width grandes** (número + nombre gigante + etiquetas), no como grillas de cards con borde.

## Elementos 3D (IMPLEMENTADO 2026-09-30 — leer antes de tocar esto)
Revisamos cuadro por cuadro una grabación de pantalla del shot real de Kynesys (no solo capturas fijas) para confirmar el comportamiento antes de programarlo. Conclusión: en la referencia, las esferas grandes de fondo NO tienen física ni reaccionan al mouse en ningún momento (se confirmó con el cursor pasando encima sin generar ninguna reacción) — son un render estático. La única "física" real de kynesys es la rotación lenta constante de un objeto orgánico central por sección, que además va cambiando de geometría (Morph → LQD → SysVault) con el scroll — eso es shader/morph target, no un motor de física. Con Santiago decidimos NO copiar ese morph entre formas (queda fuera de alcance por ahora) y separar el sistema en dos capas:

1. **Objetos de fondo ambientales, AHORA con física real** (`AmbientOrbs.tsx` / `AmbientOrbsScene.tsx`, montados en `App.tsx`, siempre presentes en todo el sitio) — segundo rediseño, 2026-09-30, pedido explícito de Santiago: "no me gusta que haya una en cada esquina, deberían aparecer de diversos tamaños y formas... como si las soltaran desde el medio arriba y caigan" + "mejor usar leyes de física reales... que realmente sirva". Reemplaza la versión anterior (4 esferas fijas por esquina, sin física, con deriva simulada por GSAP — quedó documentada en el historial de git si hace falta recuperar la idea). Ahora:
  - Motor de física real (`cannon-es`), el MISMO motor y el mismo ajuste de estabilidad que el ball-pit del footer (spawn en grilla sin superposición inicial + solver con 20 iteraciones — ver nota de estabilidad en `PhysicsBallPitScene.tsx`, es la misma clase de bug que se corrigió ahí).
  - 4 a 6 objetos (según mobile/desktop) de **tamaños variados** (radio aleatorio por objeto) y **formas variadas** (esfera lisa, acanalada tipo "Morph", blob con ruido tipo "LQD", facetada low-poly — mismos 4 generadores que antes).
  - Se sueltan desde arriba, cerca del centro horizontal (no ancladas a las esquinas), y caen con gravedad real hasta apilarse contra el piso y los bordes del viewport completo (no un contenedor chico como el footer).
  - Reaccionan al mouse (empuje suave) y al evento global `site:click-impulse` en TODA la página, igual que el footer — antes solo el footer tenía física real, ahora es un solo sistema consistente en toda la experiencia.
  - Simplificación a propósito: la forma visual es solo estética, el cuerpo físico de cada objeto sigue siendo una esfera simple (no vale la pena un hull real por forma en objetos de fondo tan chicos).
  - `position: fixed`, `-z-10`, `pointer-events: none` (así que nunca bloquean clicks en botones/links aunque se les superpongan visualmente). Se cargan en un chunk aparte vía `requestIdleCallback`. Se desactivan por completo con `prefers-reduced-motion`.
  - **A vigilar**: al asentarse, es esperable que terminen apilados contra el borde inferior del viewport (gravedad real) — como estos objetos están fijos al viewport y no a la página, en cualquier scroll (incluso al llegar al footer) van a aparecer apilados abajo de la pantalla, pudiendo superponerse visualmente con el ball-pit del footer o con el botón flotante de WhatsApp. Si se ve cargado o redundante al probarlo, hay que ajustar (bajar opacidad, correr el piso más arriba, o bajar la cantidad).
- **Próximo paso, todavía no implementado**: objetos 3D en el centro de secciones puntuales (lo que en la referencia es el "Morph"/"LQD"/"SysVault") — quedó mencionado por Santiago como posible siguiente iteración, no se hizo todavía.
2. **Ball-pit con física real** (`PhysicsBallPitScene.tsx` + `cannon-es`, solo en el footer, dentro de un contenedor de altura fija): acá sí caen, rebotan, se apilan, el mouse las empuja (radio de acción) y cada click dispara un impulso más fuerte via el evento global `"site:click-impulse"` (el mismo que ya dispara `ClickRipple.tsx`). Mismo material que las esferas ambientales — negro brillante con clearcoat, **nunca lima de relleno** (el lima solo aparece como luz de acento sutil y en el ripple de click, ver regla de "nunca el acento como color de relleno" más abajo). Se monta recién cuando el footer entra en viewport (`IntersectionObserver`, lazy vía `FooterBallPit.tsx`).
- Mobile: 2 esferas ambientales (en vez de 4) y 9 esferas en el ball-pit (en vez de 18). No hay imagen estática de fallback todavía — si en gama baja se ve pesado, es lo próximo a ajustar.
- Cada bloque destacado puede tener un objeto 3D propio en la misma línea visual (esfera con ondas deformadas, wireframe, partículas, nodos conectados) — **esto sigue sin implementarse**, es la idea del "morph" de kynesys que decidimos dejar afuera por ahora. Si se retoma: siempre monocromo, nunca con el acento como color de relleno.

## Concepto de marca: "el click"
- El cursor custom es el protagonista: un punto blanco de 8px que sobre elementos interactivos se agranda a un círculo de 56px con `mix-blend-mode: difference` (invierte lo que tapa).
- Al hacer click en cualquier parte se dispara un ripple circular del color de acento, y las esferas cercanas reciben un impulso hacia afuera.
- Logotipo "coding click" en minúscula, con un pequeño cursor de flecha integrado.
- Sobre imágenes o casos de portfolio, el cursor muestra una etiqueta ("Ver ↗").

## Motion
- Smooth scroll (Lenis) + animaciones ligadas al scroll (GSAP ScrollTrigger).
- Titulares: cada línea sube desde una máscara (`overflow: hidden`) con stagger.
- Párrafos y elementos: fade + `translateY(30px)`.
- Donde sume: secciones pinneadas con scroll horizontal, o timelines que se dibujan con el scroll.
- Easing `power3.out`, duraciones de 0.8–1.2s. Nada rebota salvo las esferas (física real, no easing con overshoot).

## Microinteracciones
- Links: subrayado que se dibuja de izquierda a derecha; la flecha ↘ rota a → en hover.
- Botones primarios: outline que se rellena con el acento en hover; los CTA principales son magnéticos (siguen levemente al cursor).
- Filas de lista (packs, portfolio): en hover se invierten (fondo blanco/lima, texto negro).
- Imágenes: en escala de grises por defecto, a color en hover.
- Header fijo y transparente que al scrollear pasa a negro con blur y una línea inferior de 1px.
- Barra fina de progreso de scroll en el borde derecho.
- Marquee infinito para listas de herramientas/logos (gris → blanco en hover).

## Rendimiento y accesibilidad (obligatorio)
- WebGL cargado de forma diferida (lazy); el texto y el contenido crítico aparecen primero.
- Mobile: titulares de 48–56px, sin cursor custom, menos esferas (o imagen estática en gama baja), los scroll horizontales pasan a verticales.
- Menú mobile fullscreen con links gigantes que entran con stagger.
- Respetar `prefers-reduced-motion` (sin física ni reveals).
- Animar solo `transform` y `opacity`.
- Contraste AA, foco visible. Buen puntaje Lighthouse móvil pese al motion.
- Consultar a Santiago antes de sumar dependencias pesadas nuevas.

## Adaptación a este público
Público no técnico: estética oscura y con carácter, pero textos MUY legibles. Los packs deben compararse de un vistazo (pack combinado destacado como recomendado). La estética nunca tapa la claridad comercial. No debe parecer una web cripto ni una plantilla genérica de agencia.

## Brief para el diseño del logo
Para quien lo diseña; el nombre es provisorio, así que conviene que el logo funcione con cambios.
- Concepto: apilar niveles (Stack) que suben (Levels): crecimiento ordenado, tecnología + marca.
- Debe funcionar en negro puro: versión blanca sobre fondo negro y versión de un solo color.
- Sobrio, geométrico y simple; legible a tamaño chico (favicon, avatar de redes).
- Versiones a entregar: logo horizontal, isotipo (solo símbolo) y versión monocromática, en SVG y PNG transparente.
- Evitar: clichés de "cohete" o "engranaje", degradados complejos y detalles finos que se pierdan en pantalla.
- Cuando se defina el nombre final, ajustar el wordmark manteniendo el isotipo si es posible.
