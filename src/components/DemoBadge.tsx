import { Link } from "react-router-dom";

// Aviso fijo obligatorio en TODA página de demo (src/pages/demos/*): deja clarísimo
// que es un proyecto de muestra ficticio hecho por Coding Click para mostrar lo que
// podríamos construir — no un negocio real. Vive afuera del layout del sitio real
// (SiteLayout) a propósito, para no mezclar la marca de Coding Click con la marca
// ficticia de la demo, pero este aviso sí tiene que estar siempre visible.
export default function DemoBadge() {
  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex items-center justify-center gap-3 bg-accent px-4 py-2 text-center text-[11px] font-medium uppercase tracking-wide text-bg sm:text-xs">
      <span>Proyecto de muestra hecho por Coding Click — no es un negocio real</span>
      <Link to="/portfolio" className="underline underline-offset-2 whitespace-nowrap">
        Volver al portfolio
      </Link>
    </div>
  );
}
