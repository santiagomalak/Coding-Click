import { useState } from "react";
import SectionLabel from "@/components/SectionLabel";
import Button from "@/components/Button";
import { contact } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Contacto() {
  const [sent, setSent] = useState(false);

  // TODO: conectar a Formspree o Web3Forms (ver docs/05-pendientes-y-decisiones.md).
  // Por ahora el submit solo muestra un mensaje de confirmación en pantalla.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="px-[5vw] py-24">
      <SectionLabel number="07" label="Contacto" />
      <h1 className="mt-4 max-w-2xl font-display text-4xl md:text-6xl">Hablemos de tu negocio</h1>

      <div className="mt-16 grid gap-16 md:grid-cols-2">
        <div>
          <p className="text-muted">La forma más rápida de contactarnos:</p>
          <div className="mt-4">
            <Button href={buildWhatsAppUrl()} external>
              Escribinos por WhatsApp ↘
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted">
            O por mail a{" "}
            <a href={`mailto:${contact.email}`} className="text-ink underline underline-offset-4 hover:text-accent">
              {contact.email}
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {sent ? (
            <p className="text-accent">¡Gracias! Te contactamos a la brevedad.</p>
          ) : (
            <>
              <input required name="name" placeholder="Nombre" className="border-b border-line bg-transparent py-3 outline-none focus:border-accent" />
              <input required type="email" name="email" placeholder="Email" className="border-b border-line bg-transparent py-3 outline-none focus:border-accent" />
              <textarea required name="message" placeholder="Contanos sobre tu negocio" rows={4} className="border-b border-line bg-transparent py-3 outline-none focus:border-accent" />
              <button type="submit" className="mt-4 self-start border border-accent px-5 py-3 text-sm uppercase tracking-wide text-accent hover:bg-accent hover:text-bg transition-colors">
                Enviar
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
