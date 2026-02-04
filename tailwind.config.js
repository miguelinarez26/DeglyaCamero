/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Vitalidad Sofisticada Palette (Strict)
        "structure": "#1B6CA8", // Teal 700 (Primary Headers/Nav)
        "conversion": "#E3B346", // Yellow 500 (Action Buttons)
        "canvas": "#F9F9F7", // Stone 50 (Backgrounds)
        "accent": "#44403C", // Stone 700 (Typography)

        // Semantic & Compatibility overrides
        "primary": "#1B6CA8", // Structure
        "secondary": "#E3B346", // Conversion
        "surface-light": "#F9F9F7", // Canvas
        "surface-dark": "#1B6CA8", // Structure (as per 'Fondos oscuros')
        "background-light": "#F9F9F7", // Canvas
        "text-light": "#44403C", // Accent
      },
      // Map gray to stone for consistent warm greys
      colors: {
        gray: require('tailwindcss/colors').stone,
      },
      fontFamily: {
        "sans": ["Nunito", "sans-serif"],
        "display": ["Playfair Display", "serif"],
        "body": ["Nunito", "sans-serif"],
      },
    },
    plugins: [],
  }
}
