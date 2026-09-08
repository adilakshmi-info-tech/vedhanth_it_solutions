/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand system per the design brief: primary blue #008CC1, deep
        // black #231F20 (both taken directly from the logo). Kept under
        // the existing navy/cyan token names so every file that already
        // uses them picks up the new brand automatically.
        navy: {
          900: '#231F20', // brief's deep black — dark sections, headings
          800: '#332D2E',
          700: '#4A4344',
          500: '#6B6364',
          100: '#EFEEEE',
        },
        cyan: {
          600: '#006C97', // hover/darker shade
          500: '#008CC1', // exact brief primary blue
          200: '#8FD3EA',
        },
        paper: '#F7F7F5',
        ink: '#1C1A1A',
        inksoft: '#5C5758',
      },
      fontFamily: {
        // Geometric sans throughout, per the brief — Manrope for display
        // (extra-bold headings), Inter for body copy.
        display: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 400ms ease',
      },
    },
  },
  plugins: [],
};
