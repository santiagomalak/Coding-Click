import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const PhysicsBallPitScene = lazy(() => import("./PhysicsBallPitScene"));

// Carga la escena de física recién cuando el footer entra en viewport, para no sumar peso
// al bundle inicial. Bajo prefers-reduced-motion no se monta nada (queda el fondo estático del contenedor).
export default function FooterBallPit() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {visible && (
        <Suspense fallback={null}>
          <PhysicsBallPitScene />
        </Suspense>
      )}
    </div>
  );
}
