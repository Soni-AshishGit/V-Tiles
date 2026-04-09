/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1A1A1A",
        emerald: {
          dark: "#042F2E",
        },
        gold: "#D4AF37",
      },
      fontFamily: {
        gujarati: ["Hind Vadodara", "sans-serif"],
        english: ["Inter", "sans-serif"],
        signature: ["Great Vibes", "cursive"],
      },
    },
  },
  plugins: [],
}
