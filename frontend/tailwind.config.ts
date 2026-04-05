import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        protest: {
          red:         '#FF1F1F',
          'red-dim':   '#FF4444',
          'red-dark':  '#3D0808',
          gold:        '#F5C518',
          'gold-dim':  '#C9A015',
          'gold-dark': '#3A2800',
          bg:          '#060608',
          'bg-card':   '#0A0A10',
          'bg-el':     '#12121C',
          border:      '#1C1C28',
          text:        '#F0EDE8',
          muted:       '#70707A',
          dim:         '#A0A0A8',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        sans:    ['var(--font-syne)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-space-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
