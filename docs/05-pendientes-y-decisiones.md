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

## Falta definir (Santiago)
- **Nombre final**: ¿"Coding Click" queda o cambia? Todo el copy y la config están armados para que cambiarlo sea editar un solo archivo.
- **Logo definitivo**: hoy hay placeholder. Ver brief de logo en `03-marca-y-diseno.md`.
- **Número de WhatsApp real** (hoy provisorio en la config).
- **Redes sociales** de la agencia (links reales para el footer).
- **Precios definitivos** (hoy son rangos orientativos, ver `02-packs-y-precios.md`).
- **Contenido real de Portfolio**: al menos 2–3 proyectos reales para lanzar (con imagen, tipo de proyecto, breve descripción).
- **Contenido real de Blog**: al menos 1–2 posts para no lanzar la página vacía (o placeholders si se prefiere arrancar así).
- **Fuente tipográfica**: propuesta Space Grotesk / Syne (display) + Inter (cuerpo), todas gratuitas en Google Fonts — confirmar o proponer otra.
- **Formulario de contacto**: Formspree vs Web3Forms (ambos gratis; Web3Forms no requiere cuenta compleja ni backend).
- **FAQ**: ¿vive dentro de Servicios o de Contacto?
- **Onboarding de clientes**: revisar y ajustar el borrador de `04-onboarding-clientes.md`.
