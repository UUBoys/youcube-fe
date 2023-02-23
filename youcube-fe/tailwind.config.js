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
        primary: {
          DEFAULT: '#5E60CE',
          50: '#EBEBF9',
          100: '#DBDCF4',
          200: '#BCBDEB',
          300: '#9D9EE1',
          400: '#7D7FD8',
          500: '#5E60CE',
          600: '#393BBB',
          700: '#2C2E90',
          800: '#1F2065',
          900: '#12123A'
        },
        secondary: {
          50: '#C6E3F4',
          100: '#B5DBF1',
          200: '#93CAEB',
          300: '#70B9E4',
          400: '#4EA8DE',
          500: '#268FCE',
          600: '#1E6E9E',
          700: '#154D6F',
          800: '#0C2C40',
          900: '#030B10'
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
