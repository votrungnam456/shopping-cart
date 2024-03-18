const { default: color } = require('./src/assets/tailwind/color');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { colors: color, },
  },
  plugins: [],
}

