import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        ink: "#F5F5F5",
        muted: "#8A8A8A",
        line: "#1F1F1F",
        accent: "#C6FF3D",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3rem, 9vw, 10rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
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
