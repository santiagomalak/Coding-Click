import { brand, contact } from "@/config/site.config";

export default function Footer() {
  return (
    <footer className="border-t border-line px-[5vw] py-16">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        <p className="font-display text-2xl lowercase">{brand.name}</p>
        <div className="flex flex-col gap-2 text-sm text-muted">
          <a href={`mailto:${contact.email}`} className="hover:text-accent">
            {contact.email}
          </a>
          {contact.socials.instagram && (
            <a href={contact.socials.instagram} className="hover:text-accent">
              Instagram
            </a>
          )}
          {contact.socials.linkedin && (
            <a href={contact.socials.linkedin} className="hover:text-accent">
              LinkedIn
            </a>
          )}
        </div>
      </div>
      <p className="mt-12 text-xs text-muted">© {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.</p>
    </footer>
  );
}
