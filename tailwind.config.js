/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors here if needed to match Marjorie style
        // For now, we'll stick to defaults and use black/white
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example font
      }
    },
  },
  plugins: [],
}
