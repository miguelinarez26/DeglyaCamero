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
        // Wellness Bliss Palette
        "wellness-bg": "#FDFBF7",
        "wellness-heading": "#1E1B1B",
        "wellness-body": "#212121",
        "wellness-cta-start": "#D96B2F",
        "wellness-cta-end": "#D35355",
        "wellness-accent": "#EDE2D7",

        // Semantic & Compatibility overrides
        "structure": "#1E1B1B",
        "conversion": "#D96B2F",
        "canvas": "#FDFBF7",
        "accent": "#212121",

        "primary": "#1E1B1B", // Structure
        "secondary": "#D96B2F", // Conversion
        "surface-light": "#FDFBF7", // Canvas
        "surface-dark": "#1E1B1B", // Structure
        "background-light": "#FDFBF7", // Canvas
        "text-light": "#212121", // Accent

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
