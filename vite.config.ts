// noinspection JSUnusedGlobalSymbols

import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'

export default defineConfig(() => {
  return {
    base: './',
    resolve: { alias: { '~': path.resolve('src') } },
    build: { chunkSizeWarningLimit: Number.MAX_SAFE_INTEGER },
    plugins: [react(), splitVendorChunkPlugin()],
    test: { globals: true }
  }
})
