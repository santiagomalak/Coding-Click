# Brief del proyecto: sitio web de servicios de Coding Click

## 1. Contexto
Santiago es desarrollador full stack (React, TypeScript, Node.js, automatizaciones con n8n/Make/Bitrix24). Lanza junto a su novia, que está por recibirse de marketing digital, una agencia que ofrece un plan completo para negocios: desarrollo web + marketing y branding. Sin nicho definido: trabajan con cualquier rubro. Mercado inicial: emprendedores y pymes de Argentina, vendiendo por contacto directo y WhatsApp.

Roles:
- Santiago: todo lo técnico (webs, e-commerce, sistemas a medida, automatizaciones, mantenimiento).
- Su novia: marketing, redes, contenido y branding. Coordina con el negocio y genera contenido cuando el pack incluye marketing.
- El reparto de ingresos en packs combinados NO está definido. No mencionarlo en la web.

## 2. Objetivo de la web
Vitrina de servicios completa: que el visitante entienda qué ofrecemos, compare packs, pruebe el Stack Advisor (ver `06-stack-advisor.md`) y contacte por WhatsApp. Ahora sí incluye un portfolio propio y un blog, además de los packs.

## 3. Público y tono
Dueños de negocios y emprendedores NO técnicos. Español rioplatense (voseo), simple, cercano y profesional, sin jerga ni promesas exageradas.

## 4. Servicios
Ver `02-packs-y-precios.md`.

## 5. Proceso de trabajo (respetar el orden)
1. Antes de escribir código, proponer: estructura del sitio, copy base de cada pack (qué incluye, para quién es, qué NO incluye) y dirección visual/motion con 2 variantes de acento. Esperar aprobación.
2. Ante cualquier ambigüedad, preguntar antes de asumir.
3. Con todo aprobado, construir.
4. Entregar README con instrucciones de edición y deploy.

## 5.1 Estructura del sitio (multi-página)
Es un sitio de varias páginas, no todo en una sola. Estructura tentativa (proponer mejoras):
- **Inicio:** propuesta de valor, resumen de packs, CTA al Stack Advisor y a WhatsApp.
- **Servicios/Packs:** detalle de desarrollo, marketing y combinados (ver `02-packs-y-precios.md`).
- **Stack Advisor:** herramienta interactiva de recomendación (ver `06-stack-advisor.md`). Puede vivir como sección de Inicio y como página propia con más detalle.
- **Portfolio:** proyectos propios y de la agencia. Empieza con pocos ítems reales; dejar preparado para sumar más sin tocar código (lista de datos, no hardcodeado en el HTML).
- **Nosotros:** quiénes son, roles de cada uno, forma de trabajo.
- **Blog:** artículos simples (consejos de marketing, casos, novedades). Pensarlo como contenido editable fácilmente (archivos markdown o CMS liviano), no como texto fijo en el código.
- **Contacto:** WhatsApp, formulario y datos de la agencia.
- **Preguntas frecuentes:** puede ser una sección dentro de Servicios o Contacto, no hace falta página aparte.

## 6. Requisitos técnicos
- Configuración centralizada en un único archivo (`site.config.ts` o `.json`): marca, eslogan, logo, colores, WhatsApp, redes, packs y precios.
- Blog y portfolio como **contenido editable sin tocar código**: cada artículo/proyecto es un archivo de datos (markdown o JSON) separado del diseño. Nada de texto de blog o portfolio escrito directo en los componentes.
- El Stack Advisor es un componente propio, con su propia lógica separada del resto del sitio (ver `06-stack-advisor.md`).
- Logo placeholder (`marca/logo-provisorio.svg`) hasta tener el definitivo.
- Stack liviano que Santiago domine (React/TypeScript; se puede proponer Astro o Vite + React). Sitio estático, hosting gratuito o muy barato (Vercel, Netlify o Cloudflare Pages).
- Responsive, mobile first.
- SEO básico: meta tags, Open Graph, sitemap, HTML semántico, accesibilidad razonable.
- WhatsApp: botón flotante siempre visible + botones por pack con mensaje prellenado (pack elegido e interés en sumar marketing). Número provisorio, viene de la config.
- Formulario de contacto simple como alternativa (Formspree/Web3Forms o mail; consultar).
- Sin dependencias pesadas ni innecesarias.

## 7. Diseño y motion
Ver `03-marca-y-diseno.md` (obligatorio leerlo).

## 8. Qué NO hacer
- No inventar testimonios, clientes, métricas ni logros.
- No mostrar el reparto interno de ingresos ni datos personales.
- No usar imágenes con derechos: placeholders o recursos libres.
- No copiar el sitio de referencia.
- No construir nada antes de la aprobación de estructura, copy y dirección visual.

## 9. Entregables
1. Propuesta de estructura + copy + dirección visual y motion (para aprobar).
2. Sitio completo funcionando en local.
3. Archivo de configuración documentado.
4. README con edición y deploy.
5. Lista de pendientes que debe completar Santiago (ver `05-pendientes-y-decisiones.md`).
