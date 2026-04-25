import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Your custom colors
      colors: {
        tembi: '#8B9660',
        darktembi: '#6E7A45',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // The font configuration
      fontFamily: {
        sans: ["var(--font-lato)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      // Add animations for scroll reveal
      animation: {
        fadeUp: "fadeUp 0.7s ease-out forwards",
        fadeIn: "fadeIn 0.7s ease-out forwards",
        slideLeft: "slideLeft 0.7s ease-out forwards",
        slideRight: "slideRight 0.7s ease-out forwards",
        scaleUp: "scaleUp 0.7s ease-out forwards",
        zoomIn: "zoomIn 0.7s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slideLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        scaleUp: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        zoomIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.75)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;