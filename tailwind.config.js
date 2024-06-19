/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        mainBlue: "#E1F1FF",
      },
      margin: {
        "7px": "7px",
      },
    },
  },
  plugins: [],
};
