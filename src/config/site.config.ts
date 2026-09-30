// Fuente única de verdad para marca, contacto, packs y precios.
// Editar acá — nunca hardcodear estos datos en componentes o páginas.
// Ver docs/02-packs-y-precios.md y docs/05-pendientes-y-decisiones.md para lo que falta confirmar.

export const brand = {
  name: "Coding Click", // PROVISORIO — ver docs/05-pendientes-y-decisiones.md
  tagline: "Desarrollo web + marketing, todo en un solo lugar",
  logoSrc: "/logo-isotipo-vidrio.svg", // isotipo real (versión vidrio, entregado por Maia — marca/coding-click-4a)
};

export const contact = {
  whatsappNumber: "5493834553249", // Número real de Santiago (WhatsApp personal)
  whatsappDefaultMessage: "Hola! Me interesa saber más sobre sus servicios.",
  email: "hola@codingclick.com.ar", // PROVISORIO
  socials: {
    instagram: "", // PROVISORIO
    linkedin: "", // PROVISORIO
  },
};

export type DevPack = {
  id: string;
  name: string;
  audience: string;
  includes: string[];
  excludes: string[];
  priceRange: string;
};

export const devPacks: DevPack[] = [
  {
    id: "landing",
    name: "Landing page",
    audience: "Negocios que arrancan o necesitan una sola página enfocada en conseguir contactos o ventas rápido",
    includes: ["Una página enfocada en conversión", "Textos guía", "Formulario/CTA de contacto", "Optimizada para mobile", "Publicación online"],
    excludes: ["Múltiples páginas", "Panel de administración", "Carrito de compras"],
    priceRange: "USD 150–400",
  },
  {
    id: "institucional",
    name: "Sitio institucional",
    audience: "Negocios que necesitan presencia completa: quiénes son, qué ofrecen, cómo contactarlos",
    includes: ["Diseño multi-página (Inicio, Nosotros, Servicios, Contacto)", "Formulario de contacto", "SEO básico"],
    excludes: ["Carrito de compras", "Pasarela de pagos", "Automatizaciones"],
    priceRange: "USD 300–700",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    audience: "Negocios que venden productos y quieren vender online",
    includes: ["Catálogo de productos", "Carrito", "Checkout", "Integración de pagos", "Panel básico de gestión"],
    excludes: ["Integraciones complejas con sistemas externos (se cotizan aparte)", "Logística/envíos automatizados salvo a medida"],
    priceRange: "USD 600–1.500",
  },
  {
    id: "a-medida",
    name: "A medida",
    audience: "Negocios con necesidades específicas: sistemas internos, automatizaciones, integraciones",
    includes: ["Relevamiento y desarrollo a medida"],
    excludes: ["Precio fijo — se cotiza por reunión"],
    priceRange: "Desde USD 800",
  },
];

export const maintenancePack = {
  name: "Mantenimiento (opcional)",
  audience: "Cualquier cliente con sitio activo",
  includes: ["Actualizaciones", "Cambios de contenido", "Soporte técnico"],
  priceRange: "USD 20–60/mes",
};

export type MarketingPack = {
  id: string;
  name: string;
  audience: string;
  includes: string[];
  priceRange: string;
};

export const marketingPacks: MarketingPack[] = [
  {
    id: "presencia",
    name: "Presencia",
    audience: "Negocios que recién arrancan en redes",
    includes: ["1 red social", "~8 piezas/mes", "Publicación y respuesta a mensajes"],
    priceRange: "USD 150–200/mes",
  },
  {
    id: "crecimiento",
    name: "Crecimiento",
    audience: "Negocios que quieren crecer con más consistencia",
    includes: ["2 redes", "12–16 piezas", "1 sesión de contenido en el negocio", "Reporte mensual"],
    priceRange: "USD 250–320/mes",
  },
  {
    id: "completo",
    name: "Completo",
    audience: "Negocios que buscan resultados serios y están dispuestos a invertir en ads",
    includes: ["3 redes", "~20 piezas", "2 sesiones de contenido", "Campañas pagas gestionadas (inversión aparte)", "Reporte y ajustes"],
    priceRange: "USD 400–500/mes",
  },
];

export const brandingPack = {
  name: "Branding inicial (extra único)",
  audience: "Quien no tiene identidad visual definida",
  includes: ["Logo", "Paleta", "Tipografías", "Guía básica"],
  priceRange: "USD 100–300",
};

export type ComboPack = {
  id: string;
  name: string;
  includes: string;
  audience: string;
  recommended?: boolean;
};

export const comboPacks: ComboPack[] = [
  {
    id: "lanzamiento",
    name: "Lanzamiento",
    includes: "Landing + branding básico + setup de redes + 1 mes de Presencia",
    audience: "Quien arranca de cero y quiere salir con todo listo",
  },
  {
    id: "presencia-combo",
    name: "Presencia",
    includes: "Sitio institucional + branding + Crecimiento (mín. 3 meses)",
    audience: "Negocio ya establecido que quiere reforzar su imagen digital completa",
  },
  {
    id: "ventas",
    name: "Ventas",
    includes: "E-commerce + Completo (mín. 3 meses) + ads",
    audience: "Quien quiere vender online en serio",
    recommended: true,
  },
  {
    id: "a-medida-combo",
    name: "A medida",
    includes: "Combinación definida según reunión",
    audience: "Necesidades específicas",
  },
];

export const commercialRules = [
  "Descuento de 10–15% sobre la parte de desarrollo si se contrata marketing con un mínimo de 3 meses.",
  "Desarrollo se cobra 50% al iniciar y 50% al entregar.",
  "Todos los precios en USD, orientativos y editables desde esta configuración.",
];
