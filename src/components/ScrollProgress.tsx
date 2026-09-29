import { useEffect, useRef } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        bar.style.transform = `scaleY(${self.progress})`;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="fixed right-3 top-0 z-40 hidden h-screen w-px bg-line md:block" aria-hidden="true">
      <div ref={barRef} className="h-full w-full origin-top bg-accent" style={{ transform: "scaleY(0)" }} />
    </div>
  );
}
