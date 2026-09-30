/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand system taken directly from the current logo (logo.svg /
        // "Vedhanth it solutions logo.svg"): deep navy #001736 (the
        // wordmark + mark) and accent green #0D3D0E (the "IT SOLUTIONS"
        // sub-wordmark). navy/green kept as the token names — green
        // replaces the earlier cyan/blue accent.
        navy: {
          900: '#001736', // exact logo navy — dark sections, headings
          800: '#243752',
          700: '#4C5D72',
          500: '#808B9A',
          100: '#F0F1F3',
        },
        green: {
          600: '#0A310B', // hover/darker shade
          500: '#0D3D0E', // exact logo accent green
          200: '#92A893',
        },
        // Accent system from the Figma design — warm amber/orange for CTAs,
        // links and eyebrow labels; rose for the "Touch" highlight word.
        accent: {
          600: '#c26f0d',
          500: '#e58411',
          100: '#fbe7cf',
        },
        rose: '#dd5471',
        paper: '#F7F7F5',
        ink: '#1C1A1A',
        inksoft: '#5C5758',
      },
      fontFamily: {
        // SF Pro per the Figma spec — falls back to the platform system font
        // stack (renders as SF Pro on Apple devices) and Inter elsewhere.
        display: [
          '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"',
          'Inter', 'Manrope', 'sans-serif',
        ],
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"',
          'Inter', 'sans-serif',
        ],
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
