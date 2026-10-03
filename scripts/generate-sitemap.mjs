// Genera public/sitemap.xml antes de cada build, a partir de las rutas estáticas de
// src/App.tsx + los slugs reales de src/content/blog y src/content/portfolio. Así el sitemap
// nunca queda desactualizado cuando Santiago suma un post o un proyecto — no hay que tocar
// este archivo a mano, se re-genera solo en cada `npm run build` (ver "prebuild" en package.json).
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function getSiteUrl() {
  const configRaw = readFileSync(join(root, "src/config/site.config.ts"), "utf-8");
  const match = configRaw.match(/export const siteUrl = "([^"]+)"/);
  if (!match) throw new Error("No se encontró siteUrl en src/config/site.config.ts");
  return match[1];
}

function getSlugs(dir) {
  const full = join(root, dir);
  if (!existsSync(full)) return [];
  return readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

const siteUrl = getSiteUrl();

// Rutas estáticas — si se agrega una página nueva en src/App.tsx, sumarla acá también.
const staticRoutes = ["/", "/servicios", "/stack-advisor", "/portfolio", "/nosotros", "/blog", "/contacto"];
const blogRoutes = getSlugs("src/content/blog").map((slug) => `/blog/${slug}`);

const allRoutes = [...staticRoutes, ...blogRoutes];

const urls = allRoutes
  .map((route) => {
    const priority = route === "/" ? "1.0" : route.startsWith("/blog/") ? "0.6" : "0.8";
    return `  <url>\n    <loc>${siteUrl}${route}</loc>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml generado con ${allRoutes.length} rutas (${blogRoutes.length} posts de blog).`);
