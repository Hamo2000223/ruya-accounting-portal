import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "rgb(10 12 18)",
          raised: "rgb(18 21 30)",
          overlay: "rgb(26 30 42)",
        },
        accent: {
          DEFAULT: "rgb(34 211 238)",
          muted: "rgb(6 182 212)",
        },
      },
      boxShadow: {
        glow: "0 0 60px -12px rgb(34 211 238 / 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
