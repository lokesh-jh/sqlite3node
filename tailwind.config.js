/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{ejs,js}',    
    './views/includes/**/*.{ejs,js}',    
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

