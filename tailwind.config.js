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
        "primary": "#1B6CA8", // Teal Profundo - Dominante/Autoridad
        "secondary": "#E3B346", // Amarillo Mostaza - Acción/Botones
        "tertiary": "#8B5A2B", // Madera - Base/Calidez
        "background-light": "#FDF6E9", // Crema - Lienzo
        "background-dark": "#1C1917", // Warm dark charcoal
        "surface-light": "#FFFFFF",
        "surface-dark": "#292524",
        "text-light": "#4A4036",
        "text-dark": "#E7E5E4",
        // Keeping legacy names just in case, mapped to new palette
        "deglya-teal": "#1B6CA8",
        "deglya-mustard": "#E3B346",
        "deglya-wood": "#8B5A2B",
        "deglya-cream": "#FDF6E9",
        "deglya-terracota": "#D1BFA7",
        // New Booking Identity
        "booking-primary": "#3730A3", // Indigo
        "booking-primary": "#3730A3", // Indigo
        "booking-secondary": "#0D9488", // Teal
        // Premium Palette
        "cream": "#F5F1E9",
        "gold": {
          "DEFAULT": "#B8860B",
          "hover": "#966D09"
        },
        "deep-teal": "#2F4F4C",
        "muted-teal": "#4A7C77",
        fontFamily: {
          "sans": ["Nunito", "sans-serif"],
          "display": ["Playfair Display", "serif"],
          "body": ["Nunito", "sans-serif"],
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
