import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        diwali: {
          dark: "#070B19",
          navy: "#10172D",
          indigo: "#151B38",
          card: "rgba(16, 23, 45, 0.75)",
          gold: "#D6A84B",
          goldLight: "#FFE6A0",
          goldMuted: "#B88E39",
          cream: "#FFF5E5",
          muted: "#B9B7B0",
          amber: "#FF9E2C",
          flame: "#FF5E1E",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        playfair: ["'Playfair Display'", "serif"],
        handwriting: ["'Great Vibes'", "'Alex Brush'", "'Dancing Script'", "cursive"],
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        diya: "0 0 35px 8px rgba(255, 158, 44, 0.35), 0 0 70px 15px rgba(214, 168, 75, 0.15)",
        goldGlow: "0 0 25px rgba(214, 168, 75, 0.45)",
        card: "0 10px 40px -10px rgba(0, 0, 0, 0.75), inset 0 1px 0 0 rgba(255, 230, 160, 0.15)",
      },
      animation: {
        flicker: "flameFlicker 2.2s infinite ease-in-out",
        "float-slow": "floatSlow 5s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};

export default config;
