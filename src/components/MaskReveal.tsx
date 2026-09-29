import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: "mount" | "scroll";
};

// Titulares que suben desde una máscara (overflow hidden), por línea, con stagger
// (pasar `delay` distinto a cada línea desde el componente padre).
export default function MaskReveal({ children, className, delay = 0, trigger = "scroll" }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner || prefersReducedMotion()) return;

    if (trigger === "mount") {
      gsap.fromTo(inner, { yPercent: 100 }, { yPercent: 0, duration: 0.7, delay, ease: "power3.out" });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.7, delay, ease: "power3.out", scrollTrigger: { trigger: outerRef.current, start: "top 85%" } }
      );
    });
    return () => ctx.revert();
  }, [delay, trigger]);

  return (
    <div ref={outerRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={innerRef} className="inline-block">
        {children}
      </div>
    </div>
  );
}
