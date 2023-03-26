/* eslint-disable */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        graphik: ["Graphik", "sans-serif"],
      },
      colors: {
        primary:{
          DEFAULT: '#FF0000',
          50: '#FFB8B8',
          100: '#FFA3A3',
          200: '#FF7A7A',
          300: '#FF5252',
          400: '#FF2929',
          500: '#FF0000',
          600: '#C70000',
          700: '#8F0000',
          800: '#570000',
          900: '#1F0000'
        },
        secondary: {
          DEFAULT: '#242222',
          50: '#827B7C',
          100: '#787172',
          200: '#635D5E',
          300: '#4E4A4A',
          400: '#393636',
          500: '#242222',
          600: '#212020',
          700: '#1F1D1D',
          800: '#1C1B1B',
          900: '#1A1818'
        },
        tertiary: {
          50: '#FFFFFF',
          100: '#FAFFFE',
          200: '#D2FFF2',
          300: '#A9FFE7',
          400: '#80FFDB',
          500: '#48FFCB',
          600: '#10FFBB',
          700: '#00D79A',
          800: '#009F72',
          900: '#006649'
        },
        gray: {
          500: "#BFD7FF",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require('flowbite/plugin')],
};
