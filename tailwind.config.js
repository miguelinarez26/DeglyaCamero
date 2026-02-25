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

        // Semantic & Compatibility overrides (Dashboards)
        "primary": "#2F3E30",
        "secondary": "#D4A373",
        "surface-light": "#F9F7F2",
        "surface-dark": "#2F3E30",
        "background-light": "#F9F7F2",
        "text-light": "#4A403A",

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
