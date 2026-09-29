# Coding Click — contexto para Claude Code

Sitio web de servicios de una agencia de desarrollo + marketing (Santiago, full stack, y su novia, marketing digital). Público: emprendedores y pymes argentinas, no técnicos. Venta por WhatsApp.

**Antes de cambiar copy, precios, estructura o dirección visual: es contenido ya decidido con Santiago. Si algo no coincide con lo que pide, avisar antes de tocarlo — no asumir.**

## Leer primero
1. `docs/00-README.md` — índice y estado del proyecto.
2. `docs/05-pendientes-y-decisiones.md` — qué ya se decidió (log) y qué falta que Santiago defina.
3. `docs/03-marca-y-diseno.md` — sistema visual completo (única fuente de verdad de diseño).
4. `docs/02-packs-y-precios.md`, `docs/06-stack-advisor.md`, `docs/07-arquitectura-tecnica.md` — según la tarea.

## Estado actual del código
Scaffold funcional en Vite + React 18 + TypeScript + Tailwind (`npm install && npm run dev`). Todas las páginas y rutas existen y compilan (`npm run build` sin errores). Packs, precios y datos de contacto viven en `src/config/site.config.ts` — única fuente de verdad, nunca hardcodear esos datos en componentes.

**Todavía NO implementado** (ver `docs/03-marca-y-diseno.md` para el detalle exacto de cada uno):
- Esferas 3D con física (Three.js/OGL) en hero y footer.
- Motion real: Lenis (smooth scroll) + GSAP ScrollTrigger, reveals de scroll, stagger de titulares.
- Cursor custom (8px → 56px, `mix-blend-mode: difference`), ripple de click, CTAs magnéticos.
- La transición del marco del hero (rounded-3xl) abriéndose a full-bleed con el scroll — hoy está estático.
- Marquee infinito, header que pasa a blur+negro al scrollear, barra de progreso de scroll.
- Conexión real del formulario de contacto (Formspree o Web3Forms — sin definir, ver pendientes).
- Contenido real de Portfolio y Blog (hoy vacío a propósito — NO inventar proyectos ni posts).

## Reglas que no se negocian
- No inventar testimonios, clientes, métricas ni logros.
- No mostrar el reparto interno de ingresos entre Santiago y su novia.
- Modo oscuro únicamente por ahora — el modo claro está documentado en `docs/03-marca-y-diseno.md` pero no se implementa hasta que Santiago lo pida.
- Portfolio y Blog se editan sumando archivos en `src/content/portfolio` y `src/content/blog`, nunca escribiendo contenido directo en componentes.
