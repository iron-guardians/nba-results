/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceFromCurrent: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        alphaBlink: {
          '0%, 100%': { 'opacity' : '1' },
          '50%': { 'opacity' : '0.5' },
        },
      },
      animation: {
        bounceFromCurrent: 'bounceFromCurrent 0.85s infinite ease-in-out',
        alphaBlink: 'alphaBlink 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}

