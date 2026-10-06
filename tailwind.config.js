/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0B0D11',
          900: '#111319',
          800: '#191D26',
          700: '#262B37',
          600: '#3D4454',
          500: '#5F687C',
        },
        gold: {
          50: '#FAF6EF',
          100: '#F5ECDF',
          200: '#EBD8BE',
          300: '#DEC29A',
          400: '#D2AC76',
          500: '#C59A5F', // Primary Champagne Gold
          600: '#B0834B',
          700: '#8E6738',
          800: '#6C4E2B',
          900: '#4D371E',
        },
        ivory: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EDE0CF',
          400: '#E0CEB7',
        },
        sand: {
          100: '#F7F5F0',
          200: '#EFECE4',
          300: '#E3DFD5',
          400: '#C8C2B5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(15, 17, 21, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)',
        'luxury-hover': '0 25px 50px -12px rgba(15, 17, 21, 0.16), 0 0 1px rgba(0, 0, 0, 0.1)',
        'gold-glow': '0 4px 20px -2px rgba(197, 154, 95, 0.25)',
      }
    },
  },
  plugins: [],
}
