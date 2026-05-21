import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import os from 'node:os'
import path from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@webos': fileURLToPath(new URL('../../src', import.meta.url)),
    },
  },
  // Dropbox 同步安全：將 Vite 快取移至系統暫存目錄
  cacheDir: path.join(os.tmpdir(), 'vite-webos-docs'),
  server: {
    port: 3002,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
})
