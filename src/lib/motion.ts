import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sistema de movimiento único del sitio — ver docs/03-marca-y-diseno.md.
// Nunca inventar timings nuevos por componente: usar estos.
export const DURATION = { micro: 0.18, section: 0.55, page: 0.35 };
export const GSAP_EASE = "power3.out";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDesktopPointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 768;
}

export { gsap, ScrollTrigger };
