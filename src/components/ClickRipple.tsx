import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

// Ripple circular de acento en cada click. Dispara además un CustomEvent
// ("site:click-impulse") con la posición del click, para que las esferas 3D
// (cuando se implementen) puedan reaccionar empujándose hacia afuera.
export default function ClickRipple() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const container = containerRef.current;
    if (!container) return;

    function onClick(e: MouseEvent) {
      const ripple = document.createElement("div");
      ripple.style.position = "absolute";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = "14px";
      ripple.style.height = "14px";
      ripple.style.marginLeft = "-7px";
      ripple.style.marginTop = "-7px";
      ripple.style.borderRadius = "9999px";
      ripple.style.border = "1px solid #C6FF3D";
      container!.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 0.9 },
        {
          scale: 14,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );

      window.dispatchEvent(new CustomEvent("site:click-impulse", { detail: { x: e.clientX, y: e.clientY } }));
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" />;
}
