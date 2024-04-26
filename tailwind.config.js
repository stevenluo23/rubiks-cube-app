/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lcd: ["LCD", "Consolas"],
      },
      transitionProperty: {
        opacity: "opacity",
        visibility: "visibility",
      },
    },
  },
  plugins: [],
};
