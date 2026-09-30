import { Suspense, lazy, useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const AmbientOrbsScene = lazy(() => import("./AmbientOrbsScene"));

// `three` pesa bastante, así que estas esferas decorativas (siempre montadas globalmente)
// se cargan en un chunk aparte, un instante después del primer render — no bloquean el bundle
// crítico ni el LCP de la home. Bajo prefers-reduced-motion no se cargan ni se montan.
export default function AmbientOrbs() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const idle = "requestIdleCallback" in window ? window.requestIdleCallback : (cb: () => void) => setTimeout(cb, 200);
    const cancel = "cancelIdleCallback" in window ? window.cancelIdleCallback : clearTimeout;
    const id = idle(() => setReady(true));
    return () => cancel(id as number);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <AmbientOrbsScene />
    </Suspense>
  );
}
