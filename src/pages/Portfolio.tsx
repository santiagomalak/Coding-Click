import { Link } from "react-router-dom";
import SectionLabel from "@/components/SectionLabel";
import { getPortfolioItems } from "@/lib/content";
import { useSeo } from "@/lib/useSeo";

// Proyectos de muestra: maquetas con marca ficticia armadas para mostrar capacidad de
// desarrollo por tipo de pack (ver src/config/site.config.ts → devPacks), no trabajos de
// clientes reales. Decisión y detalle completo en docs/05-pendientes-y-decisiones.md.
// Se suman acá a mano (son solo 3) en vez de por el sistema de markdown de content.ts,
// que queda reservado para proyectos reales de clientes.
type SampleProject = {
  title: string;
  pack: string;
  description: string;
  href?: string; // si no tiene, todavía no está armado — se muestra como "Próximamente"
};

const sampleProjects: SampleProject[] = [
  {
    title: "Bianchi & Elizalde Abogados",
    pack: "Pack Landing",
    description: "Landing de servicios profesionales para un estudio jurídico ficticio.",
    href: "/demos/estudio-legal",
  },
  {
    title: "Tienda de indumentaria",
    pack: "Pack E-commerce",
    description: "Catálogo + carrito para una marca de moda ficticia.",
  },
  {
    title: "Turnos para gimnasio",
    pack: "Pack A medida",
    description: "Sistema de reserva de clases y cupos para un gimnasio ficticio.",
  },
];

export default function Portfolio() {
  useSeo({
    title: "Portfolio de proyectos",
    description: "Proyectos de desarrollo web realizados por Coding Click.",
    path: "/portfolio",
  });
  const items = getPortfolioItems();

  return (
    <div className="px-[5vw] py-24">
      <SectionLabel number="04" label="Portfolio" />
      <h1 className="mt-4 font-display text-4xl md:text-6xl">Proyectos</h1>

      <section className="mt-16">
        <h2 className="font-display text-2xl md:text-3xl">Proyectos de muestra</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Maquetas con marca ficticia, una por cada tipo de pack, para que veas cómo se podría
          ver tu proyecto antes de arrancar.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sampleProjects.map((p) =>
            p.href ? (
              <Link
                key={p.title}
                to={p.href}
                className="group border border-line p-6 transition-colors hover:border-accent"
              >
                <p className="text-[11px] uppercase tracking-[0.08em] text-muted">[ {p.pack} ]</p>
                <h3 className="mt-3 font-display text-2xl text-ink group-hover:text-accent">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.description}</p>
                <span className="mt-4 inline-block text-xs uppercase tracking-wide text-accent">Ver demo ↘</span>
              </Link>
            ) : (
              <div key={p.title} className="border border-line p-6 opacity-50">
                <p className="text-[11px] uppercase tracking-[0.08em] text-muted">[ {p.pack} ]</p>
                <h3 className="mt-3 font-display text-2xl text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.description}</p>
                <span className="mt-4 inline-block text-xs uppercase tracking-wide text-muted">Próximamente</span>
              </div>
            )
          )}
        </div>
      </section>

      <section className="mt-24">
        <h2 className="font-display text-2xl md:text-3xl">Trabajos con clientes</h2>
        {items.length === 0 ? (
          <p className="mt-6 max-w-md text-muted">
            Todavía no hay trabajos de clientes reales cargados acá — los vamos a ir sumando a medida que
            entreguemos los primeros proyectos.
          </p>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.slug} className="group border border-line p-6 hover:border-accent transition-colors">
                <p className="text-[11px] uppercase tracking-[0.08em] text-muted">[ {item.category} ]</p>
                <h2 className="mt-3 font-display text-2xl">{item.title}</h2>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
