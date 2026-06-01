import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#14b8a6', // teal-500 — primärer CTA
          hover:   '#0d9488', // teal-600 — Hover-Zustand
          glow:    'rgba(20, 184, 166, 0.12)', // subtiles Leuchten für Karten/Icons
        },
        surface: {
          DEFAULT: '#111118', // erhöhte Flächen (Cards, Inputs)
          raised:  '#1c1c28', // noch weiter erhöht
          border:  '#2a2a3e', // Standard-Rahmenfarbe
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        btn:  '8px',
      },
      animation: {
        'fade-in':  'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
