/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./config/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      screens: {
        "2xl": "1040px",
        xl: ["1040px", "20px"],
        lg: "1040px",
      },
      padding: {
        DEFAULT: "2rem",
        "2xl": "0rem",
      },
    },
    extend: {
      colors: {
        primary: "#C8B48C",
        "primary-hover": "#b4a27e",
        "primary-active": "#a09070",
        "primary-light-hover": "#faf8f4",
        "primary-light-active": "#f4f0e8",
        secondary: "#78A0AA",
        "secondary-hover": "#6c9099",
        "secondary-active": "#608088",
        "secondary-light-hover": "#f0f4f5",
        "secondary-light-active": "#e2e9eb",
        "secondary-1": "#86A6AD",
        black: "#333333",
        "black-hover": "#474747",
        "black-active": "#5c5c5c",
        "transparent-hover": "#ebebeb",
        "transparent-active": "#d6d6d6",
        "dark-grey": "#6D7D8B",
      },
      fontSize: {
        h1: ["2.5rem", "3rem"],
        h2: ["2.0625rem", "2.5rem"],
        h3: ["1.75rem", "1.8125rem"],
        h4: ["1.4375rem", "1.8125rem"],
        h5: ["1.1875rem", "1.8125rem"],
        body: ["1rem", "1.8125rem"],
        caption: ["0.75rem", "1.125rem"],
        subtitle: ["0.875rem", "1.5625rem"],
        categoryTitle: ["2.3006rem", "3.625rem"],
        productCardTitle: ["1.125rem", "2rem"],
      },
      lineHeight: {
        h1: "3rem",
        h2: "2.5rem",
        h3: "2.125rem",
        h4: "3rem",
        h5: "1.8125rem",
        body: "1.8125rem",
        caption: "1.125rem",
      },
      fontFamily: {
        sans: ["Avenir", "Noto Sans TC", "sans-serif"],
        serif: ["Avenir", "Noto Serif TC", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
