import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import DemoBadge from "@/components/DemoBadge";
import { useSeo } from "@/lib/useSeo";

// PROYECTO DE MUESTRA — "Bianchi & Elizalde Abogados" es un estudio ficticio, armado
// para mostrar cómo quedaría una landing de servicios profesionales (pack "Landing",
// ver src/config/site.config.ts). Ningún dato acá es real: ni el nombre del estudio,
// ni los números, ni los medios de contacto. Paleta y tipografía (serif del sistema)
// a propósito distintas de la identidad de Coding Click, para que se sienta como la
// marca de otro negocio y no como una sección más del sitio de la agencia.

const areas = [
  {
    title: "Derecho Laboral",
    body: "Despidos, indemnizaciones, accidentes de trabajo y negociación colectiva. Representamos tanto a trabajadores como a empresas.",
  },
  {
    title: "Civil y Sucesiones",
    body: "Herencias, divisiones de bienes, contratos y reclamos entre particulares, con acompañamiento desde la primera consulta hasta el cierre.",
  },
  {
    title: "Comercial y Societario",
    body: "Constitución de sociedades, contratos entre empresas, y resolución de conflictos societarios.",
  },
  {
    title: "Accidentes y Mala Praxis",
    body: "Reclamos por accidentes de tránsito, siniestros y mala praxis médica, con peritos propios para cada caso.",
  },
];

const proceso = [
  { step: "01", title: "Consulta inicial", body: "Nos contás tu situación sin cargo y sin compromiso, en persona o por videollamada." },
  { step: "02", title: "Análisis del caso", body: "Revisamos la documentación y te damos un diagnóstico realista: qué se puede hacer y qué tiempos manejar." },
  { step: "03", title: "Estrategia a medida", body: "Armamos el camino concreto a seguir, con los costos y pasos claros desde el principio." },
  { step: "04", title: "Acompañamiento", body: "Te mantenemos al tanto en cada instancia, hasta que el caso se resuelve." },
];

export default function EstudioLegal() {
  useSeo({
    title: "Bianchi & Elizalde Abogados (demo)",
    description: "Proyecto de muestra de landing para estudio jurídico, hecho por Coding Click.",
    path: "/demos/estudio-legal",
    noindex: true,
  });
  const [formNote, setFormNote] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1B33] font-sans text-[#E9E4D8]">
      <DemoBadge />

      {/* Nav en-universo */}
      <header className="sticky top-9 z-40 border-b border-[#1E3157] bg-[#0B1B33]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-serif text-lg tracking-wide text-[#E9E4D8]">
            Bianchi <span className="text-[#C7A24A]">&amp;</span> Elizalde
          </span>
          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.12em] text-[#AEB6C9] md:flex">
            <a href="#areas" className="hover:text-[#C7A24A]">Áreas</a>
            <a href="#proceso" className="hover:text-[#C7A24A]">Cómo trabajamos</a>
            <a href="#contacto" className="hover:text-[#C7A24A]">Contacto</a>
          </nav>
          <a
            href="#contacto"
            className="border border-[#C7A24A] px-4 py-2 text-xs uppercase tracking-wide text-[#C7A24A] transition-colors hover:bg-[#C7A24A] hover:text-[#0B1B33]"
          >
            Consulta inicial
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(199,162,74,0.18), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C7A24A]">Estudio jurídico — Buenos Aires</p>
          <h1 className="mt-5 font-serif text-4xl leading-tight text-[#F5F1E6] sm:text-5xl md:text-6xl">
            Defendemos lo que te costó construir.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#AEB6C9] md:text-lg">
            Asesoramiento legal claro y directo, sin vueltas, para personas y empresas que necesitan
            resolver un conflicto o prevenirlo antes de que ocurra.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="bg-[#C7A24A] px-6 py-3 text-sm uppercase tracking-wide text-[#0B1B33] transition-opacity hover:opacity-90"
            >
              Agendá tu consulta
            </a>
            <a
              href="#areas"
              className="border border-[#3A4E78] px-6 py-3 text-sm uppercase tracking-wide text-[#E9E4D8] transition-colors hover:border-[#C7A24A] hover:text-[#C7A24A]"
            >
              Ver áreas de práctica
            </a>
          </div>
        </div>
      </section>

      {/* Áreas de práctica */}
      <section id="areas" className="border-t border-[#1E3157] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C7A24A]">Áreas de práctica</p>
          <h2 className="mt-3 font-serif text-3xl text-[#F5F1E6] md:text-4xl">En qué podemos ayudarte</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-[#1E3157] sm:grid-cols-2">
            {areas.map((a) => (
              <div key={a.title} className="bg-[#0B1B33] p-8">
                <h3 className="font-serif text-xl text-[#F5F1E6]">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#AEB6C9]">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section id="proceso" className="border-t border-[#1E3157] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C7A24A]">Cómo trabajamos</p>
          <h2 className="mt-3 font-serif text-3xl text-[#F5F1E6] md:text-4xl">Cuatro pasos, sin sorpresas</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-4">
            {proceso.map((p) => (
              <div key={p.step}>
                <span className="font-serif text-3xl text-[#3A4E78]">{p.step}</span>
                <h3 className="mt-3 text-base uppercase tracking-wide text-[#F5F1E6]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#AEB6C9]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto en-universo — decorativo a propósito, no envía datos a ningún lado */}
      <section id="contacto" className="border-t border-[#1E3157] px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C7A24A]">Contacto</p>
          <h2 className="mt-3 font-serif text-3xl text-[#F5F1E6] md:text-4xl">Hablemos de tu caso</h2>
          <p className="mt-4 text-sm text-[#AEB6C9]">
            Primera consulta sin cargo. Respondemos dentro de las 24hs hábiles.
          </p>
          <form
            className="mx-auto mt-10 grid max-w-md gap-4 text-left"
            onSubmit={(e) => {
              e.preventDefault();
              setFormNote(true);
            }}
          >
            <input
              type="text"
              placeholder="Nombre"
              className="border border-[#3A4E78] bg-transparent px-4 py-3 text-sm text-[#E9E4D8] placeholder:text-[#5B6472] focus:border-[#C7A24A] focus:outline-none"
            />
            <input
              type="text"
              placeholder="Contanos brevemente tu situación"
              className="border border-[#3A4E78] bg-transparent px-4 py-3 text-sm text-[#E9E4D8] placeholder:text-[#5B6472] focus:border-[#C7A24A] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#C7A24A] px-6 py-3 text-sm uppercase tracking-wide text-[#0B1B33] transition-opacity hover:opacity-90"
            >
              Enviar
            </button>
            {formNote && (
              <p className="text-xs text-[#AEB6C9]">
                Este formulario es parte de la maqueta de muestra — en tu sitio real quedaría conectado a tu WhatsApp o tu email.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer en-universo, minimal */}
      <footer className="border-t border-[#1E3157] px-6 py-10 text-center text-xs text-[#5B6472]">
        Bianchi &amp; Elizalde Abogados — contenido de ejemplo, no es un estudio real.
      </footer>

      {/* Cierre con la marca real de Coding Click — acá sí es un CTA funcional */}
      <section className="bg-bg px-6 py-20 text-center">
        <p className="text-[11px] uppercase tracking-[0.08em] text-muted">[ Coding Click ]</p>
        <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl text-ink md:text-4xl">
          ¿Querés un sitio así para tu estudio, consultorio o negocio?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted">
          Esto es exactamente lo que incluye el pack Landing. Lo armamos a tu medida, con tu marca real.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/contacto" variant="primary">Quiero uno así</Button>
          <Link to="/portfolio" className="text-sm text-muted underline underline-offset-4 hover:text-ink">
            Ver más proyectos de muestra
          </Link>
        </div>
      </section>
    </div>
  );
}
