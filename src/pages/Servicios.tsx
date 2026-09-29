import SectionLabel from "@/components/SectionLabel";
import PackRow from "@/components/PackRow";
import Button from "@/components/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import {
  devPacks,
  maintenancePack,
  marketingPacks,
  brandingPack,
  comboPacks,
  commercialRules,
} from "@/config/site.config";

export default function Servicios() {
  return (
    <div>
      <section className="px-[5vw] pb-16 pt-24">
        <SectionLabel number="01" label="Servicios" />
        <h1 className="mt-4 max-w-2xl font-display text-4xl md:text-6xl">
          Elegí el pack que mejor encaja con tu negocio
        </h1>
      </section>

      <section>
        <h2 className="px-[5vw] pb-6 text-xs uppercase tracking-[0.08em] text-muted">Desarrollo (pago único)</h2>
        {devPacks.map((pack, i) => (
          <div key={pack.id} className="border-b border-line px-[5vw] py-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-4">
                <span className="text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-3xl md:text-5xl">{pack.name}</span>
              </div>
              <span className="text-sm text-accent">{pack.priceRange}</span>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-muted">{pack.audience}</p>
            <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
              <div>
                <p className="text-muted">Incluye</p>
                <ul className="mt-1 list-inside list-disc">
                  {pack.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-muted">No incluye</p>
                <ul className="mt-1 list-inside list-disc text-muted">
                  {pack.excludes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <Button href={buildWhatsAppUrl(`Hola! Me interesa el pack ${pack.name}. ¿Podemos hablar?`)} external variant="ghost">
                Consultar por {pack.name} ↘
              </Button>
            </div>
          </div>
        ))}
        <div className="border-b border-line px-[5vw] py-6 text-sm text-muted">
          <span className="text-ink">{maintenancePack.name}</span> — {maintenancePack.includes.join(", ")} — {maintenancePack.priceRange}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="px-[5vw] pb-6 text-xs uppercase tracking-[0.08em] text-muted">Marketing (mensual)</h2>
        {marketingPacks.map((pack, i) => (
          <div key={pack.id} className="border-b border-line px-[5vw] py-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-4">
                <span className="text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-3xl md:text-5xl">{pack.name}</span>
              </div>
              <span className="text-sm text-accent">{pack.priceRange}</span>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-muted">{pack.audience}</p>
            <ul className="mt-2 list-inside list-disc text-sm">
              {pack.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="border-b border-line px-[5vw] py-6 text-sm text-muted">
          <span className="text-ink">{brandingPack.name}</span> — {brandingPack.includes.join(", ")} — {brandingPack.priceRange}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="px-[5vw] pb-6 text-xs uppercase tracking-[0.08em] text-muted">Combinados</h2>
        {comboPacks.map((pack, i) => (
          <PackRow
            key={pack.id}
            index={String(i + 1).padStart(2, "0")}
            name={pack.name}
            description={`${pack.includes} — ${pack.audience}`}
            highlighted={pack.recommended}
          />
        ))}
      </section>

      <section className="border-t border-line px-[5vw] py-12 text-sm text-muted">
        <ul className="list-inside list-disc space-y-1">
          {commercialRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
