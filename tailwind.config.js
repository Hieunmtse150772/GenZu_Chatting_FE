/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        mainBlue: '#E1F1FF',
        lightTheme: '#DEE4E7',
        darkTheme: '#37474F',
      },
      margin: {
        '7px': '7px',
      },
      width: {
        '22rem': '22rem',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('preline/plugin')],
}
