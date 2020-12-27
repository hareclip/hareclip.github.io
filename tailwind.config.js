const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      pinkred: {
        DEFAULT: '#EB7777',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
