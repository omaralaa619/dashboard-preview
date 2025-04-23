/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        prim: "#8b5a47",
        sec: "#f2e9e2",
        acc: "#333333",
        buttonSec: "#b79e8c",
      },
      transitionDuration: {
        3000: "3000ms",
      },
    },
  },
  plugins: [],
};
