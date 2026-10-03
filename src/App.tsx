import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CustomCursor from "@/components/CustomCursor";
import AmbientOrbs from "@/components/AmbientOrbs";
import ClickRipple from "@/components/ClickRipple";
import ScrollProgress from "@/components/ScrollProgress";
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

export default function App() {
  useSmoothScroll();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <AmbientOrbs />
      <CustomCursor />
      <ClickRipple />
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/stack-advisor" element={<StackAdvisorPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
