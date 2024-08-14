/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    
    extend: {
      fontFamily:{
        kanit:["Kanit","sans-serif"],
        

      }
    },
  },
  plugins: [require('daisyui'),],
}

