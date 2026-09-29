import SectionLabel from "@/components/SectionLabel";
import { getPortfolioItems } from "@/lib/content";

export default function Portfolio() {
  const items = getPortfolioItems();

  return (
    <div className="px-[5vw] py-24">
      <SectionLabel number="04" label="Portfolio" />
      <h1 className="mt-4 font-display text-4xl md:text-6xl">Proyectos</h1>

      {items.length === 0 ? (
        <p className="mt-16 max-w-md text-muted">
          Todavía no hay proyectos cargados acá. Los vamos a ir sumando a medida que entreguemos los primeros trabajos —
          cada uno se agrega como un archivo en <code className="text-ink">src/content/portfolio</code>, sin tocar el diseño.
        </p>
      ) : (
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.slug} className="group border border-line p-6 hover:border-accent transition-colors">
              <p className="text-[11px] uppercase tracking-[0.08em] text-muted">[ {item.category} ]</p>
              <h2 className="mt-3 font-display text-2xl">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
