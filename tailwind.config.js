/** @type {import('tailwindcss').Config} */
const v = (n) => `rgb(var(--${n}) / <alpha-value>)`
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#0d013a', 900: '#160b4d', 800: '#28256a', 700: '#2b2d8b', 600: '#374ea1' },
        mint: { 500: '#66c18c', 400: '#7fcd9f', 600: '#4fa874', 100: '#e3f4ea' },
        bg: v('bg'), surface: v('surface'), ink: v('ink'), muted: v('muted'), line: v('line'), brand: v('brand'), accent: v('accent'), 'on-brand': v('on-brand'),
      },
      fontFamily: { display: 'var(--font-display)', body: 'var(--font-body)', mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'] },
      borderRadius: { t: 'var(--radius)' },
      maxWidth: { site: '1280px' },
    },
  },
  plugins: [],
}
