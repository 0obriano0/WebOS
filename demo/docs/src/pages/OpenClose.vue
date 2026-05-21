<template>
  <div class="page">
    <div class="page-badge">
      <span class="badge badge-green">{{ t('openclose.badge') }}</span>
    </div>
    <h1>{{ t('openclose.h1') }}</h1>
    <p v-html="t('openclose.intro')"></p>

    <DemoViewport ref="viewport" @reset="reset">
      <template #controls>
        <button class="btn" v-for="n in [1,2,3]" :key="n" @click="openWin(n)">
          {{ t('openclose.openWin') }} {{ n }}
        </button>
        <button class="btn btn-danger" @click="wm?.destroy()">{{ t('openclose.closeAll') }}</button>
      </template>
    </DemoViewport>

    <h2>{{ t('openclose.h2Open') }}</h2>
    <table class="api-table">
      <thead><tr><th>{{ t('openclose.th.behaviour') }}</th><th>{{ t('common.description') }}</th></tr></thead>
      <tbody>
        <tr>
          <td>{{ t('openclose.newId') }}</td>
          <td>{{ t('openclose.newId.desc') }}</td>
        </tr>
        <tr>
          <td>{{ t('openclose.existId') }}</td>
          <td v-html="t('openclose.existId.desc')"></td>
        </tr>
        <tr>
          <td>{{ t('openclose.retVal') }}</td>
          <td v-html="t('openclose.retVal.desc')"></td>
        </tr>
      </tbody>
    </table>

    <h2>{{ t('openclose.h2Close') }}</h2>
    <p>{{ t('openclose.closeDesc') }}</p>
    <p v-html="t('openclose.closeAllDesc')"></p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { WindowManager } from '@webos/core/WindowManager'
import DemoViewport from '../components/DemoViewport.vue'
import { useDocCode } from '../composables/useDocCode'
import { useLocale } from '../composables/useLocale'

const { setCode } = useDocCode()
const { t } = useLocale()
const viewport = ref<InstanceType<typeof DemoViewport> | null>(null)
let wm: WindowManager | null = null

const TITLES = ['Sales Report', 'User Settings', 'Log Viewer']
const ICONS  = ['📊', '⚙️', '📋']

function initWM() {
  const container = viewport.value?.container
  if (!container) return
  wm = new WindowManager({ container, isolated: true })
}

function reset() { wm?.destroy(); initWM() }

function openWin(n: number) {
  if (!wm) return
  const id = `win-${n}`
  const body = document.createElement('div')
  body.style.cssText = 'padding:16px;'
  body.innerHTML = `<p style="margin:0;font-size:24px">${ICONS[n-1]}</p>
    <p><strong>${TITLES[n-1]}</strong></p>
    <p style="color:#888;font-size:12px">id: "${id}"</p>`
  wm.open({ id, title: TITLES[n-1], content: body, width: 260, height: 160 })
}

onMounted(() => {
  initWM()
  setCode([
    {
      name: 'main.ts',
      lang: 'typescript',
      code: `import { WindowManager } from '@webos/core/WindowManager'

const wm = new WindowManager()

// ── open() ────────────────────────────────────────────
const content = document.createElement('div')
content.textContent = 'Window content'

const state = wm.open({
  id: 'report',          // unique identifier
  title: 'Sales Report',
  content,
  x: 80,   y: 60,        // initial position (optional — cascades if omitted)
  width: 480, height: 360,
})

// Calling open() again with the same id:
// → restores if minimized, then focuses. No duplicate window created.
wm.open({ id: 'report', title: 'Sales Report', content })

// ── close() ───────────────────────────────────────────
wm.close('report')    // remove one window

// ── destroy() — close all ──────────────────────────────
wm.destroy()`,
    },
  ])
})

onUnmounted(() => wm?.destroy())
</script>

<style scoped>
.page { max-width: 760px; }
.btn {
  padding: 5px 14px;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.1s;
}
.btn:hover { background: var(--color-primary-hover); }
.btn-danger { background: #dc2626; }
.btn-danger:hover { background: #b91c1c; }
</style>
