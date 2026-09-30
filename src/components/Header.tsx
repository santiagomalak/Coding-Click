import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { brand } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

const links = [
  { to: "/servicios", label: "Servicios" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top -10",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
    return () => trigger.kill();
  }, []);

  return (
    <header
      ref={sentinelRef}
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-bg/90 backdrop-blur" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-none items-center justify-between px-[5vw] py-5">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg lowercase text-ink">
          <img src={brand.logoSrc} alt="" className="h-7 w-7" />
          {brand.name}
        </NavLink>
        <nav className="hidden gap-8 text-xs uppercase tracking-wide md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "text-accent" : "text-ink hover:text-accent transition-colors")}
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
