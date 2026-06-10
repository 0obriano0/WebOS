import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

function rawCssPlugin() {
  return {
    name: 'vite-raw-css-for-deskpane',
    enforce: 'pre',
    load(id) {
      if (id.endsWith('.css') && id.includes('/WebOS/src/') && !id.includes('?')) {
        const content = fs.readFileSync(id, 'utf-8')
        return `export default ${JSON.stringify(content)}`
      }
    },
  }
}

export default defineConfig({
  plugins: [rawCssPlugin(), react()],
  resolve: {
    alias: {
      '@deskpane': fileURLToPath(new URL('../../src', import.meta.url)),
    },
  },
  cacheDir: path.join(os.tmpdir(), 'vite-deskpane-react-demo'),
  server: { port: 3002, open: true },
  build: { outDir: 'dist' },
})