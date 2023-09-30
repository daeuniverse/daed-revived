import { Config } from 'tailwindcss'
import shadcnPreset from './modules/tailwindcss-shadcn-preset'

export default {
  presets: [shadcnPreset],
  content: ['src/**/*.{ts,tsx,css}']
} satisfies Config
