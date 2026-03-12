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
        sans: ['"DM Sans"', "sans-serif"],
        serif: ["Fraunces", "serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0a0a0f",
          2: "#1c1c28",
          3: "#2e2e42",
        },
        mist: {
          DEFAULT: "#f5f4f0",
          2: "#ede9e3",
        },
        cream: "#faf8f4",
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e8c96a",
        },
        teal: {
          DEFAULT: "#2d8f7b",
          light: "#3dba9e",
        },
        coral: {
          DEFAULT: "#e8634a",
          light: "#f28469",
        },
        sand: "#d4b896",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        soft: "0 8px 32px rgba(10,10,15,0.12)",
        hard: "0 20px 60px rgba(10,10,15,0.18)",
        xl: "0 32px 80px rgba(10,10,15,0.25)",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
