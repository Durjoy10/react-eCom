/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Poppins', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      fontSize: {
        '2xs': '0.65rem',
        'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          hover: '#4338ca',
        },
        secondary: '#10b981',
        accent: '#f59e0b',
        background: '#f9fafb',
        foreground: '#111827',
        card: '#ffffff',
        'card-foreground': '#1f2937',
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#4f46e5',
        muted: {
          foreground: '#6b7280',
        },
      },
      borderRadius: {
        DEFAULT: '0.75rem',
      },
    },
  },
  plugins: [],
}
