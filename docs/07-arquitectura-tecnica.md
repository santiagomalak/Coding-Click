# Arquitectura técnica

## Stack (propuesto por Cowork, dentro del pedido original de "liviano y que Santiago domine")
- **Vite + React 18 + TypeScript** — build rápido, Santiago ya lo maneja.
- **React Router** para el multi-página (o file-based routing si se arma con un plugin liviano tipo `vite-plugin-pages`).
- **Tailwind CSS** para utilidades, con los tokens de `03-marca-y-diseno.md` (color, tipografía, espaciado) definidos como variables CSS / theme de Tailwind — nunca valores sueltos en los componentes.
- **Three.js (o su wrapper liviano React Three Fiber) u OGL** para las esferas 3D con física — a definir cuál rinde mejor una vez que se prototipe, empezando por OGL si el bundle size importa más que la comodidad de la API.
- **GSAP + ScrollTrigger + Lenis** para el motion (scroll suave, reveals, timelines).
- **Contenido editable sin tocar código**: Portfolio y Blog como archivos Markdown con front-matter (o JSON), leídos en build time — nunca texto fijo en los componentes.
- **Formulario de contacto**: Web3Forms o Formspree (pendiente de confirmar, ver `05-pendientes-y-decisiones.md`).
- Sin backend propio: sitio 100% estático.

## Estructura de carpetas (propuesta inicial, ajustable al prototipar)
```
/src
  /components   -> componentes reutilizables (botones, tarjetas, badges, cursor, esferas)
  /sections     -> bloques grandes de cada página (Hero, PacksOverview, StackAdvisorTeaser, etc.)
  /pages        -> una por ruta (Inicio, Servicios, StackAdvisor, Portfolio, Nosotros, Blog, Contacto)
  /content
    /portfolio  -> un .md por proyecto
    /blog       -> un .md por artículo
  /config
    site.config.ts   -> marca, colores, WhatsApp, redes, packs y precios (fuente única de verdad)
    stack-advisor-reglas.ts -> árbol de decisión del Advisor, separado del componente
  /styles       -> tokens (color, tipografía, espaciado, easings/duraciones de motion)
  /lib          -> hooks y utilidades (física de esferas, cursor custom, smooth scroll)
/public         -> logo placeholder, favicon, assets estáticos
```

## Plan de repo y deploy
1. **Fase de documentación** (hecha el 2026-09-29): consolidar todo el contexto en este kit de `.md`.
2. **Fase de base del proyecto**: scaffolding con Vite + React + TS + Tailwind, tokens de diseño cargados desde `03-marca-y-diseno.md`, estructura de carpetas de arriba, páginas vacías con la navegación armada. Sin motion ni 3D todavía — primero la base funcional.
3. **Repo de GitHub**: **privado**, se crea una vez que la base compila y corre en local.
4. **Deploy**: Santiago conecta el repo a Vercel él mismo (import directo desde GitHub, sin configuración especial al ser un sitio estático de Vite).
5. **Iteración**: sobre esa base se suman en orden: sistema de diseño completo (componentes + tokens), esferas 3D y motion, Stack Advisor, contenido de Portfolio/Blog, formulario de contacto.

## Handoff a Claude Code
Cuando la base y el repo estén listos, este kit (`00` a `07`) se usa como contexto persistente del proyecto (por ejemplo copiado o referenciado desde un `CLAUDE.md` en la raíz del repo), para que cualquier sesión de Claude Code arranque ya con toda la información sin tener que repetirla.
