import devtools from 'solid-devtools/vite'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  base: './',
  resolve: { alias: { '~': '/src' } },
  plugins: [devtools({ autoname: true }), solid(), splitVendorChunkPlugin()]
})
