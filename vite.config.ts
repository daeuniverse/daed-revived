// noinspection JSUnusedGlobalSymbols

import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'

export default defineConfig(() => {
  return {
    base: './',
    resolve: { alias: { '~': path.resolve('src') } },
    plugins: [react(), splitVendorChunkPlugin()],
    test: { globals: true }
  }
})
