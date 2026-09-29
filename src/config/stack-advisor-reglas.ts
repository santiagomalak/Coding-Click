// Árbol de reglas del Stack Advisor — separado del componente para poder ajustarlo
// sin tocar la UI. Ver docs/06-stack-advisor.md para la especificación completa.
// TODO: falta implementar el componente del cuestionario que consume estas reglas.

export type Respuestas = {
  tieneWeb: "no-tengo" | "vieja" | "funciona-bien";
  necesidad: "mostrar" | "vender" | "a-medida";
  redes: "no-publico" | "sin-estrategia" | "quiero-mejorar" | "ya-tengo-manager";
  urgencia: "asap" | "1-2-meses" | "sin-apuro";
};

export type Recomendacion = {
  packId: string;
  incluyeMarketing: boolean;
};

export function recomendar(respuestas: Respuestas): Recomendacion {
  if (respuestas.necesidad === "a-medida") {
    return { packId: "a-medida-combo", incluyeMarketing: false };
  }
  if (respuestas.tieneWeb === "no-tengo" && respuestas.necesidad === "mostrar") {
    return { packId: "lanzamiento", incluyeMarketing: true };
  }
  if ((respuestas.tieneWeb === "no-tengo" || respuestas.tieneWeb === "vieja") && respuestas.necesidad === "vender") {
    return { packId: "ventas", incluyeMarketing: true };
  }
  if (respuestas.tieneWeb === "funciona-bien" && respuestas.redes !== "ya-tengo-manager") {
    return { packId: "presencia-combo", incluyeMarketing: true };
  }
  return { packId: "presencia-combo", incluyeMarketing: respuestas.redes !== "ya-tengo-manager" };
}
