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
    },
  },
  plugins: [],
};
