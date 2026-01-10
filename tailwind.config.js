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
        "deglya-teal": "#1B6CA8", // Dominant/Authority
        "deglya-mustard": "#E3B346", // Action/Conversion
        "deglya-wood": "#8B5A2B", // Base/Warmth
        "deglya-cream": "#FDF6E9", // Canvas/Background
        "deglya-terracota": "#D1BFA7", // Soft Terracota/Sand
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"],
        "display": ["Outfit", "sans-serif"],
        "body": ["Roboto", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [],
}
