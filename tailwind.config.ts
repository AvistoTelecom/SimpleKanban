import type {Config} from 'tailwindcss'

export default {
  content: ['index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
} satisfies Config
