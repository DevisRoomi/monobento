/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        mono: {
          bg: '#080808',
          card: '#111111',
          cardHover: '#161616',
          border: '#222222',
          borderHover: '#333333',
          muted: '#888888',
          text: '#eeeeee',
          highlight: '#ffffff',
        }
      }
    },
  },
  plugins: [],
}
