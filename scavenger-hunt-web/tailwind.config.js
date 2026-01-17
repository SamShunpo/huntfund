/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        admin: {
          primary: '#2563eb', // blue-600
          bg: '#f8fafc', // slate-50
          secondary: '#475569', // slate-600
        },
        game: {
          primary: '#f59e0b', // amber-500
          bg: '#1c1917', // stone-900
          secondary: '#d97706', // amber-600
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      backgroundImage: {
        'parchment': "url('https://www.transparenttextures.com/patterns/aged-paper.png')", // Placeholder
      }
    },
  },
  plugins: [],
}
