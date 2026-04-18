/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'qhd': '2560px',
      },
      colors: {
        accentProfile: '#3557c8',
      }
    },
  },
  plugins: [],
}
