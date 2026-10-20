import type { Config } from 'tailwindcss';

/**
 * Apple-inspired token set. Every colour is a CSS variable so the same utility
 * works in light and dark mode; the raw hexes live in globals.css.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'var(--surface)',
        'surface-alt': 'var(--surface-alt)',
        'surface-dark': '#000000',
        ink: 'var(--text)',
        'ink-secondary': 'var(--text-secondary)',
        line: 'var(--border)',
        accent: 'var(--accent)',
        'accent-on-dark': '#2997FF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 7.2vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
        h1: ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.07', letterSpacing: '-0.02em', fontWeight: '600' }],
        h2: ['clamp(2rem, 3.6vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        h3: ['clamp(1.5rem, 2.2vw, 1.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        tagline: ['clamp(1.1875rem, 1.6vw, 1.3125rem)', { lineHeight: '1.38', fontWeight: '400' }],
        body: ['1.0625rem', { lineHeight: '1.5' }],
        small: ['0.875rem', { lineHeight: '1.45' }],
        metric: ['clamp(2.75rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '600' }],
      },
      maxWidth: {
        content: '1080px',
        prose: '680px',
      },
      spacing: {
        band: '7.5rem',
        'band-sm': '4.5rem',
      },
      borderRadius: {
        card: '18px',
      },
      boxShadow: {
        card: '0 18px 40px -18px rgb(0 0 0 / 0.22)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
