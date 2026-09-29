// Carga de contenido editable (portfolio y blog) sin tocar código.
// Cada proyecto/artículo es un archivo .md en src/content/*, con front-matter simple.
// Hoy ambas carpetas están vacías a propósito: no hay que inventar proyectos, clientes
// ni posts — Santiago suma los reales cuando los tenga (ver docs/05-pendientes-y-decisiones.md).

export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

const portfolioModules = import.meta.glob("/src/content/portfolio/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;
const blogModules = import.meta.glob("/src/content/blog/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;

function parseFrontMatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > -1) data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  });
  return { data, content: match[2].trim() };
}

export function getPortfolioItems(): PortfolioItem[] {
  return Object.entries(portfolioModules).map(([path, raw]) => {
    const { data } = parseFrontMatter(raw);
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    return {
      slug,
      title: data.title ?? slug,
      category: data.category ?? "",
      description: data.description ?? "",
    };
  });
}

export function getBlogPosts(): BlogPost[] {
  return Object.entries(blogModules)
    .map(([path, raw]) => {
      const { data, content } = parseFrontMatter(raw);
      const slug = path.split("/").pop()!.replace(/\.md$/, "");
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
