// rollup.lib.config.mjs — Library build
// Outputs:
//   dist/webos-core.es.js        ES Module  (import { WindowManager } from '...')
//   dist/webos-core.es.min.js    ES Module  (minified)
//   dist/webos-core.umd.js       UMD bundle (<script src="..."> → window.WebOS)
//   dist/webos-core.umd.min.js   UMD bundle (minified)
//   dist/index.d.ts              TypeScript declaration

import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'

const input = 'src/index.ts'
const external = ['vue', 'react', 'react-dom']   // peer deps — not bundled

export default [
  // ── ESM + UMD (unminified) ──────────────────────────────
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
  // ── ESM + UMD (minified) ────────────────────────────────
  {
    input,
    external,
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationMap: false,
        sourceMap: false,
      }),
      terser(),
    ],
    output: [
      {
        file: 'dist/webos-core.es.min.js',
        format: 'es',
        sourcemap: false,
      },
      {
        file: 'dist/webos-core.umd.min.js',
        format: 'umd',
        name: 'WebOS',
        globals: { vue: 'Vue', react: 'React', 'react-dom': 'ReactDOM' },
        sourcemap: false,
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
