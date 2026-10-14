/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#F6F4EC',
        card: '#FFFEF9',
        ink: '#18332A',
        muted: '#66766F',
        line: '#DDE4DC',
        leaf: {
          50: '#EEF7F0',
          100: '#D8ECDA',
          500: '#4E8B60',
          600: '#3D7450',
          700: '#315D42',
        },
        warning: {
          50: '#FFF6DF',
          600: '#956816',
        },
        danger: {
          50: '#FCEBE8',
          600: '#A7473E',
        },
      },
      borderRadius: {
        card: '24px',
        control: '16px',
      },
    },
  },
  plugins: [],
};
