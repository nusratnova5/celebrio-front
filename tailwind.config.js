/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Primary: '#FFFFFF',  
        accent: '#7E505F', 
         gray: '#F1F4F1',  
      },
      
    },
  },
  plugins: [require('daisyui'),],
}

