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
  const [mobileOpen, setMobileOpen] = useState(false);
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

  // Cerrar el menú mobile si la ventana pasa a tamaño desktop (evita que quede abierto
  // "de fondo" si alguien rota el celular o achica la ventana en un monitor grande).
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      ref={sentinelRef}
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || mobileOpen ? "border-line bg-bg/95 backdrop-blur" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-none items-center justify-between px-[5vw] py-5">
        <NavLink
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2 font-display text-lg lowercase text-ink"
        >
          <img src={brand.logoSrc} alt="" className="h-11 w-11" />
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
        <div className="flex items-center gap-5">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs uppercase tracking-wide text-accent"
          >
            <span className="underline underline-offset-4">WhatsApp</span>
            <span aria-hidden="true">↘</span>
          </a>
          {/* Botón hamburguesa: solo en mobile, donde el <nav> de arriba está oculto (md:flex) y
              hasta ahora no había ninguna forma de llegar a Servicios/Portfolio/Nosotros/Blog/
              Contacto desde el celular salvo escribiendo la URL a mano. */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="relative flex h-4 w-6 flex-col justify-between md:hidden"
          >
            <span
              className={`h-px w-full bg-ink transition-transform duration-200 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span className={`h-px w-full bg-ink transition-opacity duration-200 ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
            <span
              className={`h-px w-full bg-ink transition-transform duration-200 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav id="mobile-nav" className="flex flex-col border-t border-line px-[5vw] py-2 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `border-b border-line py-4 text-sm uppercase tracking-wide ${
                  isActive ? "text-accent" : "text-ink hover:text-accent transition-colors"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
