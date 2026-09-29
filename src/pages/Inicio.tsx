import { Link } from "react-router-dom";
import SectionLabel from "@/components/SectionLabel";
import Button from "@/components/Button";
import PackRow from "@/components/PackRow";
import Reveal from "@/components/Reveal";
import MaskReveal from "@/components/MaskReveal";
import HeroFrame from "@/components/HeroFrame";
import { comboPacks } from "@/config/site.config";
import { getPortfolioItems } from "@/lib/content";

export default function Inicio() {
  const portfolio = getPortfolioItems().slice(0, 3);

  return (
    <div>
      <HeroFrame>
        <Reveal>
          <SectionLabel number="01" label="Desarrollo + Marketing" />
        </Reveal>
        <h1 className="mt-6 font-display text-display">
          <MaskReveal trigger="mount" delay={0.1}>
            Hacemos crecer tu negocio
          </MaskReveal>
          <MaskReveal trigger="mount" delay={0.22}>
            <span className="[-webkit-text-stroke:1px_#F5F5F5] text-transparent">online</span>
          </MaskReveal>
        </h1>
        <Reveal delay={0.4} className="mt-6 max-w-xl">
          <p className="text-lg text-muted">
            Web y marketing digital en un solo lugar, sin vueltas. Vos te enfocás en tu negocio, nosotros en que se vea y te
            encuentren.
          </p>
        </Reveal>
        <Reveal delay={0.5} className="mt-10 flex flex-wrap gap-4">
          <Button to="/servicios">Quiero mi web ↘</Button>
          <Button to="/stack-advisor" variant="secondary">
            Descubrí tu pack ideal
          </Button>
        </Reveal>
      </HeroFrame>

      <Reveal className="px-[5vw] py-24">
        <SectionLabel number="02" label="Packs" />
        <h2 className="mt-4 font-display text-4xl md:text-6xl">Elegí cómo arrancar</h2>
      </Reveal>
      <div>
        {comboPacks.map((pack, i) => (
          <Reveal key={pack.id} delay={i * 0.06}>
            <PackRow
              index={String(i + 1).padStart(2, "0")}
              name={pack.name}
              description={pack.includes}
              highlighted={pack.recommended}
            />
          </Reveal>
        ))}
      </div>
      <div className="px-[5vw] py-8">
        <Button to="/servicios" variant="ghost">
          Ver todos los packs y precios ↘
        </Button>
      </div>

      <Reveal className="border-t border-line px-[5vw] py-24">
        <SectionLabel number="03" label="Stack Advisor" />
        <h2 className="mt-4 max-w-2xl font-display text-4xl md:text-6xl">
          ¿No sabés qué necesitás? Respondé 4 preguntas.
        </h2>
        <p className="mt-6 max-w-lg text-muted">
          Te recomendamos el pack ideal para tu negocio en menos de un minuto, sin compromiso.
        </p>
        <div className="mt-8">
          <Button to="/stack-advisor">Empezar ↘</Button>
        </div>
      </Reveal>

      {portfolio.length > 0 && (
        <Reveal className="border-t border-line px-[5vw] py-24">
          <SectionLabel number="04" label="Portfolio" />
          <h2 className="mt-4 font-display text-4xl md:text-6xl">Algunos proyectos</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {portfolio.map((item) => (
              <Link key={item.slug} to="/portfolio" className="group border border-line p-6 hover:border-accent transition-colors">
                <p className="text-[11px] uppercase tracking-[0.08em] text-muted">[ {item.category} ]</p>
                <p className="mt-3 font-display text-2xl">{item.title}</p>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal className="border-t border-line px-[5vw] py-24 text-center">
        <h2 className="font-display text-4xl md:text-6xl">¿Hablamos por WhatsApp?</h2>
        <div className="mt-8 flex justify-center">
          <Button to="/contacto">Contactar ↘</Button>
        </div>
      </Reveal>
    </div>
  );
}
