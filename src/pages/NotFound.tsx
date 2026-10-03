import { Link } from "react-router-dom";
import SectionLabel from "@/components/SectionLabel";
import Button from "@/components/Button";
import { useSeo } from "@/lib/useSeo";

// Ruta catch-all ("*" en App.tsx). No existía ninguna, así que una URL mal escrita o un link
// roto renderizaba el <main> vacío (header y footer solos, nada en el medio) en vez de avisar
// algo. Con vercel.json redirigiendo todo a index.html, esta es la que ahora atrapa cualquier
// ruta que no matchee ninguna página real.
export default function NotFound() {
  useSeo({
    title: "Página no encontrada",
    description: "La página que buscás no existe o fue movida.",
  });

  return (
    <div className="px-[5vw] py-24">
      <SectionLabel number="—" label="404" />
      <h1 className="mt-4 max-w-2xl font-display text-4xl md:text-6xl">Esta página no existe</h1>
      <p className="mt-6 max-w-md text-muted">
        Puede que el link esté roto o que la página se haya movido. Volvé al inicio o escribinos si buscabas algo puntual.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button to="/">Volver al inicio ↘</Button>
        <Button to="/contacto" variant="secondary">
          Contactar
        </Button>
      </div>
    </div>
  );
}
