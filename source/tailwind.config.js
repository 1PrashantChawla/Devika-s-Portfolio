/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#130F17",
        wine: "#270E17",
        burgundy: "#420E19",
        accent: "#E50925",
        rose: "#FF6475",
        muted: "#BDB4BD",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['Inter', "system-ui", "sans-serif"],
        serif: ['"Playfair Display"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
