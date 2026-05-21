// rollup.lib.config.mjs — Library build
// Outputs:
//   dist/webos-core.es.js    ES Module  (import { WindowManager } from '...')
//   dist/webos-core.umd.js   UMD bundle (<script src="..."> → window.WebOS)
//   dist/index.d.ts          TypeScript declaration

import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

const input = 'src/index.ts'
const external = ['vue', 'react', 'react-dom']   // peer deps — not bundled

export default [
  // ── ESM + UMD ──────────────────────────────────────────
  {
    input,
    external,
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationMap: false,
        sourceMap: true,
      }),
    ],
    output: [
      {
        file: 'dist/webos-core.es.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'dist/webos-core.umd.js',
        format: 'umd',
        name: 'WebOS',          // → window.WebOS in browser
        globals: { vue: 'Vue', react: 'React', 'react-dom': 'ReactDOM' },
        sourcemap: true,
      },
    ],
  },
  // ── TypeScript declarations ─────────────────────────────
  {
    input,
    external,
    plugins: [dts()],
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
  },
]
