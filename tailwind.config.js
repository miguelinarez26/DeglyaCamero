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

        // Identidad Visual Stitch Replicación (Exacta)
        "deglya-primary": "#C89F70",     // Oro/Beige
        "deglya-accent": "#2F3E35",      // Verde Bosque Oscuro
        "deglya-surface": "#F8F6F2",     // Crema/Off-white
        "deglya-typography": "#2D3748",  // Text Dark
        "deglya-soft-gold": "#EADBC8",   // Lighter gold
        "deglya-dark": "#161E1A",        // Sidebar Dark
        "deglya-footer-dark": "#1F2923", // Background Dark
        // Stitch Reference Palette (Technological/Modern)
        "stitch-neon": "#46ec13",
        "stitch-dark-bg": "#0a0a0a",
        "stitch-card": "#181818",

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
        "sans": ["Lato", "sans-serif"],
        "display": ["Playfair Display", "serif"],
        "body": ["Lato", "sans-serif"],
      },
    },
    plugins: [
      tailwindAnimate,
    ],
  }
}
