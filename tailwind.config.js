/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a2a54',
          800: '#0e3567',
          700: '#164a8a',
          500: '#2569b3',
          100: '#e8f0fa',
        },
        cyan: {
          600: '#12879a',
          500: '#1aa8bd',
          200: '#8fe0ec',
        },
        paper: '#f6f5f1',
        ink: '#152436',
        inksoft: '#5b6b7c',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
