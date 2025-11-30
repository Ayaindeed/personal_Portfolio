import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        arch: {
          blue: "#1793d1",
          dark: "#0f0f0f",
          darker: "#000000",
          accent: "#00d4ff",
          text: "#e0e0e0",
          border: "#333333",
        },
      },
      fontFamily: {
        mono: ["Fira Code", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundColor: {
        terminal: "#0a0e27",
      },
    },
  },
  plugins: [],
};

export default config;
