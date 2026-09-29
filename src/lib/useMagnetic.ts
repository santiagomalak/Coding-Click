import { useEffect, type RefObject } from "react";
import { gsap, isDesktopPointer, prefersReducedMotion, GSAP_EASE } from "./motion";

// CTAs magnéticos: siguen levemente al cursor dentro de su propia área.
export function useMagnetic(ref: RefObject<HTMLElement>, strength = 0.35) {
  useEffect(() => {
    if (!isDesktopPointer() || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const quickX = gsap.quickTo(el, "x", { duration: 0.3, ease: GSAP_EASE });
    const quickY = gsap.quickTo(el, "y", { duration: 0.3, ease: GSAP_EASE });

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      quickX(relX * strength);
      quickY(relY * strength);
    }
    function onLeave() {
      quickX(0);
      quickY(0);
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, strength]);
}
