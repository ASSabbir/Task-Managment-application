/** @type {import('tailwindcss').Config} */
import daisyui from './node_modules/daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "primary": '"Montserrat", serif',
        "secondary": '"Poppins", serif'
      },
      colors:{
        'color1': '#2E403E',
        'color2': '#355152',
        'medium':'#1A5C3E',
        'color3': '#3FA7AB',
        'color4': '#689BA3',
    },
  },
  plugins: [daisyui],
}}

