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
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        // fontWeight 300 (Light) por default: es el peso pensado para este tamaño gigante
        // (ver docs/03-marca-y-diseno.md "Space Grotesk Light"), antes quedaba en 400
        // regular porque no se especificaba y ahora sí se carga el peso 300 de verdad.
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
