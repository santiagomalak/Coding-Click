import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        ink: "#F5F5F5",
        // Gris con un toque sutil de verde lima (era #8A8A8A neutro) — mismo nivel de
        // luminosidad, detalle de marca, decidido junto con la sombra de texto de arriba.
        muted: "#93987F",
        line: "#1F1F1F",
        accent: "#C6FF3D",
      },
      fontFamily: {
        // Antes era Space Grotesk: se cambió porque su "g" minúscula (un lazo cerrado, igual
        // en los 5 pesos) se leía ambigua como "q" en el titular del hero — comprobado
        // renderizando "negocio" en los 5 pesos disponibles, no era un bug de carga ni de
        // peso, es así el diseño de esa tipografía. Outfit mantiene el mismo aire geométrico
        // pero con g convencional. Decisión de Santiago, ver docs/05-pendientes-y-decisiones.md.
        display: ["'Outfit'", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        // fontWeight 300 (Light) por default — mismo criterio original (ver
        // docs/03-marca-y-diseno.md), ahora con Outfit en vez de Space Grotesk.
        display: [
          "clamp(3rem, 9vw, 10rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "300" },
        ],
      },
      transitionTimingFunction: {
        section: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
