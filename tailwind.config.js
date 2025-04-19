/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['"Palatino Linotype"', '"Book Antiqua"', 'Palatino', 'serif'],
        'sans': ['Roboto', '"Segoe UI"', 'Arial', 'sans-serif'],
        'hebrew': ['Calibri', '"Open Sans Hebrew"', 'Arial', 'sans-serif'],
      },
      colors: {
        'amber': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'parchment': {
          light: '#f9f5eb',
          DEFAULT: '#f5f0e0',
          dark: '#e8e0c9',
        }
      },
      backgroundImage: {
        'parchment-texture': "url('https://www.transparenttextures.com/patterns/parchment.png')",
      },
    },
  },
  plugins: [],
}
