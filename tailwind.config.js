import colors from 'tailwindcss/colors';
import tailwindAnimate from 'tailwindcss-animate';

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
        // Golden Harvest Palette (Premium Organic)
        "structure": "#2F3E30", // Deep Olive (Nav/Headers)
        "conversion": "#D4A373", // Harvest Gold (Buttons/Accents)
        "canvas": "#F9F7F2", // Warm Alabaster (Backgrounds)
        "accent": "#4A403A", // Dark Taupe (Typography)

        // Semantic & Compatibility overrides
        "primary": "#2F3E30", // Structure
        "secondary": "#D4A373", // Conversion
        "surface-light": "#F9F7F2", // Canvas
        "surface-dark": "#2F3E30", // Structure
        "background-light": "#F9F7F2", // Canvas
        "text-light": "#4A403A", // Accent

        // Map gray to stone for consistent warm greys
        gray: colors.stone,
      },
      fontFamily: {
        "sans": ["Nunito", "sans-serif"],
        "display": ["Playfair Display", "serif"],
        "body": ["Nunito", "sans-serif"],
      },
    },
    plugins: [
      tailwindAnimate,
    ],
  }
}
