import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import os from 'node:os'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 直接引用 WebOS-Core TypeScript 原始碼，Vite 負責編譯
      '@webos': fileURLToPath(new URL('../../src', import.meta.url)),
    },
  },
  // 將 Vite 快取移到系統暫存目錄，避免 Dropbox 同步鎖定檔案
  cacheDir: path.join(os.tmpdir(), 'vite-webos-react-demo'),
  server: {
    port: 3002,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
})
