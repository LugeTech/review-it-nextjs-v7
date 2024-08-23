// noinspection SpellCheckingInspection

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // or 'media' if you want to respect system
  theme: {

    extend: {
      colors: {
        myTheme: {
          reviewBlue: "#2563EB",
          lightbg: "#fdfdfd",
          primary: "#6e9bd3",
          secondary: "#a5c6e3",
          accent: "#7d73d1",
          neutral: "#151628",
          "base-100": "#ffffff",
          info: "#92bae3",
          success: "#44da8a",
          warning: "#ce7a12",
          error: "#f7365d",
          dark: "#20272F",
          dark1: "#21202f",
          dark2: "#202f2f",
          light: "#FfFfFf",
          grey: "#c8c9ca",
          niceGrey: "#333644",
          niceBlack: "#2b2d38",
          darkTextBody: "#d4d4d4",
          lightTextBody: "#20272F",
          white: "#ffffff",
          complementary: "#ff8c42",
          ratingRed: "#ef4444", // Adjusted from bg-red-600
          ratingOrange: "#f97316", // Adjusted from bg-orange-500
          ratingYellow: "#eab308", // Adjusted from bg-yellow-500
          ratingLightGreen: "#84cc16", // Adjusted from bg-lime-500
          ratingGreen: "#22c55e", // Adjusted from bg-green-500
        },
      },
    },
  },
  //light used to be eee
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
