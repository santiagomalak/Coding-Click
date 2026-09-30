# Pendientes y decisiones

## Ya decidido (log)
- **2026-09-29** — Estructura del sitio: multi-página (Inicio, Servicios/Packs, Stack Advisor, Portfolio, Nosotros, Blog, Contacto), header sticky + footer global. Portfolio y Blog son páginas propias, no secciones menores.
- **2026-09-29** — Copy base de los 4 packs de desarrollo + 3 niveles de marketing + branding + 4 combinados, con qué incluye / para quién / qué no incluye cada uno (ver `02-packs-y-precios.md`).
- **2026-09-29** — Sistema visual v1: modo oscuro únicamente, fondo #050505, acento único lima #C6FF3D, sin gradientes de color, sin cards con borde grande (filas full-width en su lugar).
- **2026-09-29** — Layout: hero enmarcado (marco redondeado sutil) que se abre al scroll hacia full-bleed en el resto del sitio.
- **2026-09-29** — Motion: Lenis + GSAP ScrollTrigger, cursor custom de 8px→56px con `mix-blend-mode: difference`, ripple de acento al click, CTAs magnéticos, marquee para logos/herramientas.
- **2026-09-29** — Modo claro: queda documentado (paleta propuesta en `03-marca-y-diseno.md`) pero se posterga a después del lanzamiento.
- **2026-09-29** — Repo de GitHub: **privado**. Conexión a Vercel: Santiago la hace él mismo una vez que haya una base del proyecto lista.
- **2026-09-30** — Esferas 3D: se separan en dos capas (esferas ambientales estáticas en las esquinas de todo el sitio + ball-pit con física real solo en el footer), después de revisar cuadro por cuadro un video real del shot de Kynesys que mostró que la referencia NO tiene física (es estática + un morph de geometría por sección que decidimos no copiar). Material: negro clearcoat + rim light en ambas capas, nunca lima de relleno. Detalle completo en `03-marca-y-diseno.md` → "Elementos 3D".
- **2026-09-30** — Esferas 3D, segunda vuelta: por feedback de Santiago viendo el deploy ("se traban", "no me gusta una por esquina"), se corrigió un bug real de física (arrancaban superpuestas) y se rediseñaron como objetos de tamaños/formas variados con física real que se sueltan desde arriba al centro (ya no ancladas a las esquinas) — ahora las dos capas (ambiente + footer) comparten el mismo motor.
- **2026-09-30** — Tipografía: **confirmada** Space Grotesk (títulos, peso Light/300 por default en el tamaño display) + Inter (cuerpo) — ya estaban en el código pero nunca se cargaban de verdad (faltaba el link a Google Fonts en `index.html`), corregido.
- **2026-09-30** — Texto secundario: gris con un toque sutil de verde lima (`#93987F`, antes `#8A8A8A` neutro) + `text-shadow` sutil en todo el texto del sitio, para que no se pierda contra las esferas 3D de fondo.
- **2026-09-30** — Esferas 3D, tercera vuelta: se confirmó en el sitio en vivo (no solo como riesgo teórico) que las esferas ambientales, al asentarse por gravedad contra el borde real del viewport, tapaban el logo/copyright del footer y los CTA del hero según scroll. Se corrigió en dos partes: (1) se atenúan a opacidad 0 cuando el footer se acerca (`IntersectionObserver`); (2) el piso de la física se subió a la mitad de la mitad inferior del viewport en general, dejando libre la franja de abajo donde suele haber UI.
- **2026-09-30** — Titular del hero: la línea "Hacemos crecer tu negocio" pasa de peso 300 (Light) a 400 (Regular) — en Light la "g" de Space Grotesk se leía casi como "q" a ese tamaño (bug de legibilidad de la fuente, no un typo). "online" suma efecto vidrio (panel esmerilado + distorsión SVG sutil) y el trazo pasa a ser lima animado: titilea irregular al entrar (como neón mal conectado) y se asienta en un pulso parejo en loop.
- **2026-09-30** — Marquee de stack/herramientas: fade en los bordes (antes se cortaba en seco) + cada 4to ítem en lima fijo como acento, en vez de todo gris parejo.

## Falta definir (Santiago)
- **Nombre final**: ¿"Coding Click" queda o cambia? Todo el copy y la config están armados para que cambiarlo sea editar un solo archivo.
- **Logo definitivo**: hoy hay placeholder. Ver brief de logo en `03-marca-y-diseno.md`.
- **Número de WhatsApp real** (hoy provisorio en la config).
- **Redes sociales** de la agencia (links reales para el footer).
- **Precios definitivos** (hoy son rangos orientativos, ver `02-packs-y-precios.md`).
- **Contenido real de Portfolio**: al menos 2–3 proyectos reales para lanzar (con imagen, tipo de proyecto, breve descripción).
- **Contenido real de Blog**: al menos 1–2 posts para no lanzar la página vacía (o placeholders si se prefiere arrancar así).
- **Formulario de contacto**: Formspree vs Web3Forms (ambos gratis; Web3Forms no requiere cuenta compleja ni backend).
- **FAQ**: ¿vive dentro de Servicios o de Contacto?
- **Onboarding de clientes**: revisar y ajustar el borrador de `04-onboarding-clientes.md`.
