/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lcd: ["LCD", "Consolas", "Menlo", "Courier", "monospace"],
      },
      transitionProperty: {
        opacity: "opacity",
        visibility: "visibility",
      },
      width: {
        inherit: "inherit",
      },
      screens: {
        "max-md": { max: "768px" },
        "max-lg": { max: "1024px" },
      },
    },
  },
  plugins: [],
};
