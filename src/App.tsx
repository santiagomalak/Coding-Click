import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SiteLayout from "@/layouts/SiteLayout";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { ScrollTrigger } from "@/lib/motion";
import Inicio from "@/pages/Inicio";
import Servicios from "@/pages/Servicios";
import StackAdvisorPage from "@/pages/StackAdvisor";
import Portfolio from "@/pages/Portfolio";
import Nosotros from "@/pages/Nosotros";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contacto from "@/pages/Contacto";
import NotFound from "@/pages/NotFound";
import EstudioLegal from "@/pages/demos/EstudioLegal";

export default function App() {
  useSmoothScroll();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Proyectos de muestra (src/pages/demos/*): fuera de SiteLayout a propósito —
          tienen su propia marca ficticia, no el header/footer/cursor de Coding Click.
          Ver docs/05-pendientes-y-decisiones.md y src/components/DemoBadge.tsx. */}
      <Route path="/demos/estudio-legal" element={<EstudioLegal />} />

      <Route element={<SiteLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/stack-advisor" element={<StackAdvisorPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
