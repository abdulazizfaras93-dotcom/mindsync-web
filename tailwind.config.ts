import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ms: {
          'green-900': '#0F2E22',
          'green-800': '#153E2D',
          'green-700': '#1C5038',
          'gold-600':  '#BF8D38',
          'gold-400':  '#D4A85A',
          'ivory-0':   '#FBFAF5',
          'ivory-100': '#F5F3EC',
          'ivory-200': '#EAE7DC',
          'ink-900':   '#0E1512',
          'ink-600':   '#4A5550',
        },
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        arabic:  ['Noto Kufi Arabic', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'fade-in':   'fadeIn 0.4s ease forwards',
        'pulse-dot': 'pulseDot 2s infinite',
      },
      keyframes: {
        fadeUp:   { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
      },
    },
  },
  plugins: [],
}
export default config
