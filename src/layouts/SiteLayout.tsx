import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CustomCursor from "@/components/CustomCursor";
import AmbientOrbs from "@/components/AmbientOrbs";
import ClickRipple from "@/components/ClickRipple";
import ScrollProgress from "@/components/ScrollProgress";

// Todo el "chrome" propio de Coding Click (header, footer, cursor custom, esferas
// ambientales, WhatsApp flotante) vive acá adentro. Las páginas del sitio real van
// anidadas con <Outlet/>. Los proyectos de muestra (src/pages/demos/*) NO usan este
// layout — tienen su propia identidad visual y no deben verse con la marca de Coding
// Click encima (ver DemoBadge.tsx para el único elemento que sí comparten: el aviso
// de que es una muestra).
export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AmbientOrbs />
      <CustomCursor />
      <ClickRipple />
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
