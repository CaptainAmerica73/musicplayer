/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["Comfortaa", "sans-serif"],
      },
      keyframes: {
        text: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-150%)" },
        },
      },
      animation: {
        text: "text 8s linear infinite",
      },
    },
  },
  plugins: [],
};
