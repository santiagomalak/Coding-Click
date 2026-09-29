import SectionLabel from "@/components/SectionLabel";

const pasos = [
  { n: "01", t: "Contacto inicial", d: "Por WhatsApp, formulario, o habiendo hecho el Stack Advisor." },
  { n: "02", t: "Entendemos tu negocio", d: "Charla breve para saber qué necesitás realmente." },
  { n: "03", t: "Propuesta", d: "Pack sugerido y precio final." },
  { n: "04", t: "Manos a la obra", d: "50% al iniciar, arrancamos con el desarrollo (y marketing si aplica)." },
  { n: "05", t: "Entrega", d: "50% restante al entregar. Mantenimiento y marketing continúan si los contrataste." },
];

export default function Nosotros() {
  return (
    <div className="px-[5vw] py-24">
      <SectionLabel number="03" label="Nosotros" />
      <h1 className="mt-4 max-w-2xl font-display text-4xl md:text-6xl">
        Dos personas, un plan completo para tu negocio
      </h1>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div className="border-t border-line pt-6">
          <p className="text-[11px] uppercase tracking-[0.08em] text-muted">[ Desarrollo ]</p>
          <p className="mt-3 text-lg">
            Todo lo técnico: sitios web, e-commerce, sistemas a medida, automatizaciones y mantenimiento.
          </p>
        </div>
        <div className="border-t border-line pt-6">
          <p className="text-[11px] uppercase tracking-[0.08em] text-muted">[ Marketing ]</p>
          <p className="mt-3 text-lg">
            Redes, contenido y branding — coordina directo con el negocio cuando el pack incluye marketing.
          </p>
        </div>
      </div>

      <div className="mt-24">
        <p className="text-[11px] uppercase tracking-[0.08em] text-muted">[ Cómo trabajamos ]</p>
        {pasos.map((paso) => (
          <div key={paso.n} className="flex gap-6 border-b border-line py-6">
            <span className="text-sm text-muted">{paso.n}</span>
            <div>
              <p className="font-display text-xl">{paso.t}</p>
              <p className="mt-1 text-sm text-muted">{paso.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
