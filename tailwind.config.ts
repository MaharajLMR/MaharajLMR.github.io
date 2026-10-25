import type { Config } from 'tailwindcss';

/**
 * Paper and ink. Instrument Serif for display, Geist for everything UI, Geist
 * Mono for anything numeric or label-shaped. Colours are CSS variables so one
 * utility covers light and dark; the hexes live in globals.css.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        'surface-alt': 'var(--alt)',
        ink: 'var(--ink)',
        'ink-secondary': 'var(--muted)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.6rem, 7vw, 5.25rem)', { lineHeight: '0.98', letterSpacing: '-0.02em', fontWeight: '400' }],
        h1: ['clamp(2.1rem, 4.6vw, 3.4rem)', { lineHeight: '1.04', letterSpacing: '-0.02em', fontWeight: '400' }],
        h2: ['clamp(1.75rem, 3vw, 2.4rem)', { lineHeight: '1.08', letterSpacing: '-0.015em', fontWeight: '400' }],
        h3: ['clamp(1.25rem, 1.8vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
        lede: ['clamp(1.125rem, 1.5vw, 1.3125rem)', { lineHeight: '1.45', fontWeight: '400' }],
        tagline: ['clamp(1.125rem, 1.5vw, 1.3125rem)', { lineHeight: '1.45', fontWeight: '400' }],
        body: ['1.0625rem', { lineHeight: '1.55' }],
        small: ['0.9375rem', { lineHeight: '1.5' }],
        micro: ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.14em' }],
        metric: ['clamp(2.4rem, 4.4vw, 3.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '400' }],
      },
      maxWidth: {
        content: '1120px',
        prose: '68ch',
      },
      spacing: {
        band: '8.5rem',
        'band-sm': '5rem',
      },
      borderRadius: {
        chip: '2px',
        card: '10px',
      },
      boxShadow: {
        card: '0 1px 2px rgb(0 0 0 / 0.04)',
        lift: '0 12px 32px -20px rgb(0 0 0 / 0.30)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
