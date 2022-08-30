/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        dark: '0 2px 2px rgba(0, 0, 0, 0.45)',
        'dark-less': '0 2px 2px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        secular: ['Secular One', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
