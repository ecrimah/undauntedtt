/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        handwriting: ['Pacifico', 'cursive'],
      },
      colors: {
        // Undaunted Treasure Trove brand palette — warm jewelry neutrals.
        // Each role has a stable name so designers / future devs don't
        // need to remember hex codes.
        brand: {
          // Backwards-compat alias mapped onto the new bronze CTA tone.
          DEFAULT: '#8e623b',
          // New role-based tokens (preferred — use these going forward).
          cream: '#efe7de',   // primary page background
          ice: '#edf2f5',     // secondary surface (cards, alt sections)
          taupe: '#c3b19b',   // muted surface, dividers, ghost buttons
          caramel: '#bd956a', // primary accent / link / hover
          bronze: '#8e623b',  // primary CTA / dark anchor / footer
          ink: '#1a1410',     // body text on cream
          gold: '#d4af37',    // tiny luxury highlight (stars, italics)
          // Legacy keys kept so nothing breaks before we finish migrating.
          light: '#c3b19b',
          dark: '#5e3f1f',
          accent: '#bd956a',
          muted: '#c3b19b',
        },
      },
    },
  },
  plugins: [],
}

