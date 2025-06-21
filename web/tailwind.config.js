/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'tablet': '768px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      colors: {
        primary: '#fe2c55',
        secondary: '#25f4ee',
        dark: '#161823',
      },
      height: {
        'screen-mobile': '100vh',
        'screen-safe': 'calc(100vh - env(safe-area-inset-bottom))',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-delay': 'bounce 1s infinite 0.1s',
        'spin-delay': 'spin 1s linear infinite 0.15s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const animationDelayUtilities = {
        '.animation-delay-75': {
          'animation-delay': '75ms',
        },
        '.animation-delay-150': {
          'animation-delay': '150ms',
        },
        '.animation-delay-300': {
          'animation-delay': '300ms',
        },
      }
      addUtilities(animationDelayUtilities)
    }
  ],
} 