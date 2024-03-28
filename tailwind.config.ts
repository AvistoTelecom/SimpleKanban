import type { Config } from 'tailwindcss';

export default {
  content: ['index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        hide: 'rgba(0,0,0,0.4)',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dracula'],
  },
} satisfies Config;
