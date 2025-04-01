/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        raleway: ["Raleway", "sans-serif"]
      },
      colors: {
        green: {
          light: '#80e0a7',  // verde más suave
          DEFAULT: '#34D399', // verde principal
          dark: '#059669',    // verde oscuro para detalles
        },
        gray: {
          light: '#f1f5f9',   // gris claro
          DEFAULT: '#d1d5db',  // gris estándar
        },
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-lg': '0 6px 12px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
