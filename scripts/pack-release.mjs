// scripts/pack-release.mjs
// 將 dist/ 複製到 release/deskpane-vX.X.X/
// 執行後把整個 release/ 資料夾給同事即可

import fs from 'fs'
import path from 'path'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
const version = pkg.version
const releaseName = `deskpane-v${version}`
const releaseDir = path.join('release', releaseName)

// ── 清除舊的同版本 release ──────────────────────────
if (fs.existsSync(releaseDir)) {
  fs.rmSync(releaseDir, { recursive: true, force: true })
}
fs.mkdirSync(releaseDir, { recursive: true })

// ── 複製 dist/ ─────────────────────────────────────
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

copyDir('dist', path.join(releaseDir, 'dist'))

// ── 複製 README.md ─────────────────────────────────
if (fs.existsSync('README.md')) {
  fs.copyFileSync('README.md', path.join(releaseDir, 'README.md'))
}

// ── 產生精簡版 package.json（只留使用者需要的欄位）──
const slimPkg = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  main: pkg.main,
  module: pkg.module,
  types: pkg.types,
  exports: pkg.exports,
  license: pkg.license,
}
fs.writeFileSync(
  path.join(releaseDir, 'package.json'),
  JSON.stringify(slimPkg, null, 2)
)

// ── 列出產出的檔案 ─────────────────────────────────
console.log(`\n✅ Release 打包完成：release/${releaseName}/\n`)
function listFiles(dir, indent = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      console.log(`${indent}📁 ${entry.name}/`)
      listFiles(path.join(dir, entry.name), indent + '  ')
    } else {
      const size = (fs.statSync(path.join(dir, entry.name)).size / 1024).toFixed(1)
      console.log(`${indent}📄 ${entry.name}  (${size} KB)`)
    }
  }
}
listFiles(releaseDir)
console.log(`\n👉 把 release/${releaseName}/ 整個資料夾給同事即可\n`)
