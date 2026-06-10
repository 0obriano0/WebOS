import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

// Replicates the Rollup rawCss() plugin for Vite dev mode:
// CSS files imported from DeskPane TS source are returned as raw strings.
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
  plugins: [rawCssPlugin(), vue()],
  resolve: {
    alias: {
      '@deskpane': fileURLToPath(new URL('../../src', import.meta.url)),
    },
  },
  cacheDir: path.join(os.tmpdir(), 'vite-deskpane-vue-demo'),
  server: { port: 3001, open: true },
  build: { outDir: 'dist' },
})