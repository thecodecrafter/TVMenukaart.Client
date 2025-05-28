/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/icons/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    darkTheme: "light",
  },
  theme: {
    fontFamily: {
      sfpro: ["SF-Pro-Rounded-Variable", "sans-serif"],
      quicksand: ["Quicksand-Variable", "sans-serif"],
    },
    colors: {
      blue: colors.red,
      ...colors,
    },
    screens: {
      sm: "640px", // Mobile
      md: "768px", // Small tablet
      lg: "1024px", // Normal tablet
      xl: "1280px", // Laptop
      "2xl": "1536px", // Desktop
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
