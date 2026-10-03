import { useEffect } from "react";
import { siteUrl } from "@/config/site.config";

type SeoOptions = {
  title: string;
  description: string;
  /** Path relativo (ej. "/servicios") para el <link rel="canonical">. Default: la ruta actual. */
  path?: string;
};

/**
 * Setea <title> y <meta name="description"> por página, vía JS (no hay server-side rendering
 * en esta SPA). Esto sirve para Google (Googlebot sí ejecuta JS al indexar) y para la pestaña
 * del navegador, pero OJO: NO sirve para el preview de WhatsApp/Facebook — esos bots no
 * ejecutan JS y solo leen el <head> estático de index.html (ver los tags og: ahí, que por eso
 * son los mismos para todo el sitio). Ver docs/05-pendientes-y-decisiones.md.
 */
export function useSeo({ title, description, path }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} — Coding Click`;
    document.title = fullTitle;

    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.setAttribute("name", "description");
      document.head.appendChild(descTag);
    }
    descTag.setAttribute("content", description);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", `${siteUrl}${path ?? window.location.pathname}`);
  }, [title, description, path]);
}
