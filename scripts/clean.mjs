// scripts/clean.mjs
// 清除 dist/，自動重試（處理 Dropbox 同步鎖定問題）

import fs from 'fs'
import path from 'path'

const TARGET = 'dist'
const MAX_RETRY = 5
const RETRY_DELAY = 800  // ms

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function removeDir(dir, attempt = 1) {
  if (!fs.existsSync(dir)) {
    console.log(`✓ dist/ 已不存在，略過清除`)
    return
  }
  try {
    fs.rmSync(dir, { recursive: true, force: true })
    console.log(`✓ dist/ 清除完成`)
  } catch (err) {
    if ((err.code === 'EBUSY' || err.code === 'EPERM') && attempt < MAX_RETRY) {
      console.log(`⚠ dist/ 被鎖定（Dropbox 同步中），${RETRY_DELAY}ms 後重試 (${attempt}/${MAX_RETRY})...`)
      await sleep(RETRY_DELAY)
      await removeDir(dir, attempt + 1)
    } else {
      throw err
    }
  }
}

await removeDir(TARGET)
