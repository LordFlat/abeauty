import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F5F0',
        beige: '#EFE4D3',
        ivory: '#FFFDF9',
        ink: '#3B3027',
        'ink-soft': '#6B6258',
        line: '#D9CFC3',
        gold: '#A88A63',
        'gold-hover': '#8E7354',
        'footer-bg': '#2C241E',
        'footer-text': '#F6F1EA',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
    },
  },
  plugins: [],
};

export default config;
