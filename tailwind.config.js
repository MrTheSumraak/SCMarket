/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        qhd: '2560px',
      },
      colors: {
        accentProfile: '#3557c8',
        glowUnusualBG: '#9f288f',
        glowLegendaryBG: '#9f9b28',
        glowRareBG: '#9f2828',
        glowCommonBG: '#3557c8',
        glowNewbieBG: '#45a226',
        glowDefault: '#a3a3a3',
      },
      spacing: {
        xs: 'clamp(0.3rem,0.7vw,0.75rem)', // ~12px
        base: 'clamp(0.75rem,0.94vw,1rem)', // ~16px
        lg: 'clamp(0.6rem,1.042vw,1.25rem)', // ~20px
        xl: 'clamp(0.8rem,1.25vw,1.5rem)', // ~24px
        '2xl': 'clamp(1.2rem,1.458vw,1.75rem)', // ~28px
        '3xl': 'clamp(1.7rem,2.5vw,3rem)', // ~48px
        '4xl': 'clamp(2rem,3.33vw,4rem)', // ~64px
      },
      fontSize: {
        xsText: 'clamp(0.2rem,0.7vw,0.75rem)',
        baseText: 'clamp(0.3rem,0.94vw,1rem)',
        lgText: 'clamp(0.6rem,1.042vw,1.25rem)',
        xlText: 'clamp(0.6rem,1.25vw,1.5rem)',
        '2xlText': 'clamp(0.8rem,1.458vw,1.75rem)',
        '3xlText': 'clamp(1.7rem,2.5vw,3rem)',
        '4xlText': 'clamp(2rem,3.33vw,4rem)',
      },
    },
  },
  plugins: [],
};
