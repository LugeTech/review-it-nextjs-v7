/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mycolours: {
          dark: '#20272F',
          dark1: '#21202f',
          dark2: '#202f2f',
          primary: '#2e8555',
          secondary: '#4EC5F1',
          light: '#eee',
          grey: '#c8c9ca',
          c1: '#F18C8E',
          c2: '#F0B7A4',
          c3: '#F1D1B5',
          c4: '#568EA6',
          c5: '#305F72'


        }
      }
    },
  },
  plugins: [require('daisyui')],
}