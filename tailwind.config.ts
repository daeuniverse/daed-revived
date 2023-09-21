import daisyui from 'daisyui'
import { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{css,ts,tsx}'],
  plugins: [daisyui],
  daisyui: { themes: true }
} as Config
