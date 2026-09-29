import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

// El hero arranca con un marco redondeado sutil (foco en la primera impresión) y se
// "abre" hacia full-bleed a medida que se scrollea, hasta fundirse con el resto del
// sitio. Ver docs/03-marca-y-diseno.md — "El marco del hero".
export default function HeroFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      // Sin motion: se muestra directo con el marco cerrado, sin animación.
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { marginLeft: "3vw", marginRight: "3vw", borderRadius: 24, borderWidth: 1 },
        {
          marginLeft: 0,
          marginRight: 0,
          borderRadius: 0,
          borderWidth: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="box-border mt-4 flex min-h-[92vh] flex-col justify-end overflow-hidden px-[5vw] pb-16 pt-32"
      style={{ marginLeft: "3vw", marginRight: "3vw", borderRadius: 24, borderWidth: 1, borderStyle: "solid", borderColor: "#1F1F1F" }}
    >
      {children}
    </div>
  );
}
