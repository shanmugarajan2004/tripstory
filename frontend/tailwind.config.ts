import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
        serif: ['"Space Grotesk"', "sans-serif"],
      },
      colors: {
        background: "#050505",
        foreground: "#f8f9fa",
        card: "#0d0d0f",
        cardBorder: "#1f1f2e",
        primary: "#3b82f6",
        cyan: "#06b6d4",
        purple: "#8b5cf6",
        muted: "#8A8F98",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.5)",
        cyanGlow: "0 0 20px rgba(6, 182, 212, 0.4)",
        glass: "inset 0 1px 1px rgba(255, 255, 255, 0.1)",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
