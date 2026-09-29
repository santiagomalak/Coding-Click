import { NavLink } from "react-router-dom";
import { brand } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const links = [
  { to: "/servicios", label: "Servicios" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/0 bg-bg/80 backdrop-blur transition-colors">
      <div className="mx-auto flex max-w-none items-center justify-between px-[5vw] py-5">
        <NavLink to="/" className="font-display text-lg lowercase text-ink">
          {brand.name}
        </NavLink>
        <nav className="hidden gap-8 text-xs uppercase tracking-wide md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "text-accent" : "text-ink hover:text-accent")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-wide text-accent underline underline-offset-4"
        >
          WhatsApp ↘
        </a>
      </div>
    </header>
  );
}
