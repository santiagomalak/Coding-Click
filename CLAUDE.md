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

**Ya implementado** (2026-09-29, segunda vuelta):
- Smooth scroll (Lenis) + GSAP ScrollTrigger, sincronizados vía `src/lib/useSmoothScroll.ts`.
- Reveals de scroll (`Reveal.tsx`: fade + translateY) y titulares por línea desde máscara (`MaskReveal.tsx`).
- Cursor custom 8px → 56px con `mix-blend-mode: difference` (`CustomCursor.tsx`, solo desktop).
- CTAs magnéticos en botones primarios (`useMagnetic.ts`).
- Header que pasa a blur + fondo oscuro al scrollear (`Header.tsx`).
- Barra de progreso de scroll a la derecha (`ScrollProgress.tsx`).
- Transición del marco del hero (rounded-3xl) abriéndose a full-bleed con el scroll (`HeroFrame.tsx`).
- Ripple de click: cada click dibuja un anillo lima que se expande y desaparece (`ClickRipple.tsx`), y además dispara un `CustomEvent` global `"site:click-impulse"` con `{x, y}` — ahora sí escuchado por el ball-pit del footer (ver abajo).
- Marquee infinito de stack/herramientas (`Marquee.tsx`) en la home, debajo del botón "Ver todos los packs y precios". Lista nombres de tecnologías/canales (React, WhatsApp Business, Meta Ads, etc.), NO logos de clientes — no inventar clientes.
- Esferas 3D en dos capas separadas (`three` + `cannon-es`) — leer el detalle completo en `docs/03-marca-y-diseno.md` sección "Elementos 3D" antes de tocar nada acá, incluye por qué se separó así (se revisó un video real del shot de referencia, no solo capturas):
  - `AmbientOrbs.tsx` / `AmbientOrbsScene.tsx`: esferas negras decorativas ancladas a las esquinas, montadas globalmente en `App.tsx`, sin física, solo rotación lenta + parallax sutil de mouse. Cargan en un chunk aparte vía `requestIdleCallback`.
  - `PhysicsBallPitScene.tsx` (+ `FooterBallPit.tsx` como wrapper lazy): ball-pit con física real (`cannon-es`) solo en el footer — caen, rebotan, se apilan, se empujan con el mouse y con el evento `site:click-impulse`. Se monta recién cuando el footer entra en viewport.
  - Ambas usan el mismo material (negro clearcoat + rim light) — el lima NUNCA es el color de relleno de las esferas, solo aparece como luz de acento sutil y en el ripple.
  - Mobile: menos esferas en ambas capas (no hay imagen estática de fallback todavía, ver pendientes).
  - Todo respeta `prefers-reduced-motion` (no se monta nada, ni siquiera se pide el chunk de three.js).
- Todo el resto de motion respeta `prefers-reduced-motion` (se desactiva por completo) y el cursor/magnético solo corren en `pointer: fine` + desktop.

**Todavía NO implementado** (ver `docs/03-marca-y-diseno.md` para el detalle exacto de cada uno):
- El "morph" entre geometrías 3D por sección (Morph → LQD → SysVault de la referencia Kynesys) — decidido explícitamente fuera de alcance por ahora.
- Fallback de imagen estática para gama baja en las esferas 3D (hoy el fallback mobile es simplemente menos esferas, no una imagen).
- Conexión real del formulario de contacto (Formspree o Web3Forms — sin definir, ver pendientes).
- Contenido real de Portfolio y Blog (hoy vacío a propósito — NO inventar proyectos ni posts).

## Reglas que no se negocian
- No inventar testimonios, clientes, métricas ni logros.
- No mostrar el reparto interno de ingresos entre Santiago y su novia.
- Modo oscuro únicamente por ahora — el modo claro está documentado en `docs/03-marca-y-diseno.md` pero no se implementa hasta que Santiago lo pida.
- Portfolio y Blog se editan sumando archivos en `src/content/portfolio` y `src/content/blog`, nunca escribiendo contenido directo en componentes.
