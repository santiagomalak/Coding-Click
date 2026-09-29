import { useEffect, useRef } from "react";
import { gsap, isDesktopPointer, prefersReducedMotion } from "@/lib/motion";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, [data-cursor='interactive']";

export default function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDesktopPointer() || prefersReducedMotion()) return;
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const quickX = gsap.quickTo(wrapper, "x", { duration: 0.15, ease: "power3.out" });
    const quickY = gsap.quickTo(wrapper, "y", { duration: 0.15, ease: "power3.out" });

    function onMove(e: MouseEvent) {
      quickX(e.clientX);
      quickY(e.clientY);
    }
    function onOver(e: Event) {
      if ((e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) {
        inner!.classList.add("scale-100");
        inner!.classList.remove("scale-[0.14]");
      }
    }
    function onOut(e: Event) {
      if ((e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) {
        inner!.classList.remove("scale-100");
        inner!.classList.add("scale-[0.14]");
      }
    }

    document.body.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div ref={wrapperRef} aria-hidden="true" className="custom-cursor-dot pointer-events-none fixed left-0 top-0 z-[100] hidden">
      <div
        ref={innerRef}
        className="h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-[0.14] rounded-full bg-ink transition-transform duration-200 ease-out [mix-blend-mode:difference]"
      />
    </div>
  );
}
