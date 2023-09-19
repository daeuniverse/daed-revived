import { defineConfig, splitVendorChunkPlugin } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  base: './',
  resolve: { alias: { '~': '/src' } },
  plugins: [solidPlugin(), splitVendorChunkPlugin()],
})
