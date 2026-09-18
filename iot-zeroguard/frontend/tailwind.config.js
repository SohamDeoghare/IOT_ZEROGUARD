/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        teal: {
          400: '#2DD4BF',
          500: '#14B8A6',
        },
        indigo: {
          500: '#6366F1',
        },
        green: {
          500: '#22C55E',
        },
        amber: {
          500: '#F59E0B',
        },
        red: {
          500: '#EF4444',
        },
        purple: {
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
