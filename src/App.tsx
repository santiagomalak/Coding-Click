import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Inicio from "@/pages/Inicio";
import Servicios from "@/pages/Servicios";
import StackAdvisorPage from "@/pages/StackAdvisor";
import Portfolio from "@/pages/Portfolio";
import Nosotros from "@/pages/Nosotros";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contacto from "@/pages/Contacto";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
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
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
