/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure your paths are correct
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Adding Montserrat
      },
    },
  },
  plugins: [require("@tailwindcss/typography")], // Added Typography Plugin
};
