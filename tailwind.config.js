// noinspection SpellCheckingInspection

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        myTheme: {
          primary: "#6e9bd3",
          secondary: "#ba98f2",
          accent: "#4930a5",
          neutral: "#151628",
          "base-100": "#ffffff",
          info: "#92bae3",
          success: "#44da8a",
          warning: "#ce7a12",
          error: "#f7365d",
          dark: "#20272F",
          dark1: "#21202f",
          dark2: "#202f2f",
          light: "#fff",
          grey: "#c8c9ca",
        },
      },
    },
  },
  //light used to be eee
  plugins: [require("daisyui")],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
