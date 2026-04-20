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
        glowUnusualBG: '#9f288f',
        glowLegendaryBG: '#9f9b28',
        glowRareBG: '#9f2828',
        glowCommonBG: '#3557c8',
        glowNewbieBG: '#45a226',
        glowDefault: '#a3a3a3',
      }
    },
  },
  plugins: [],
}
