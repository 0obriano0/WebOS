<template>
  <div class="code-panel">
    <div class="code-panel-empty" v-if="!files.length">
      <span>← 選擇左側示例後顯示原始碼</span>
    </div>
    <template v-else>
      <!-- File tabs -->
      <div class="code-tabs">
        <button
          v-for="f in files"
          :key="f.name"
          class="code-tab"
          :class="{ active: activeFile === f.name }"
          @click="activeFile = f.name"
        >{{ f.name }}</button>
        <button class="copy-btn" title="Copy code" @click="copyCode">
          {{ copied ? '✓ Copied' : 'Copy' }}
        </button>
      </div>
      <!-- Code area -->
      <div class="code-scroll">
        <pre class="hljs-pre"><code
          class="hljs"
          v-html="highlighted"
        /></pre>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import 'highlight.js/styles/github-dark.min.css'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)       // HTML / Vue template
hljs.registerLanguage('css', css)

import type { CodeFile } from '../composables/useDocCode'

const props = defineProps<{ files: CodeFile[] }>()

const activeFile = ref('')
const copied = ref(false)

watch(() => props.files, (files) => {
  activeFile.value = files[0]?.name ?? ''
}, { immediate: true })

const currentFile = computed(() =>
  props.files.find(f => f.name === activeFile.value)
)

const highlighted = computed(() => {
  const f = currentFile.value
  if (!f) return ''
  const lang = f.lang === 'vue' ? 'xml' : f.lang
  try {
    return hljs.highlight(f.code.trim(), { language: lang }).value
  } catch {
    return hljs.highlightAuto(f.code.trim()).value
  }
})

async function copyCode() {
  const code = currentFile.value?.code ?? ''
  await navigator.clipboard.writeText(code.trim())
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<style scoped>
.code-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-code-bg);
  color: var(--color-code-text);
}

.code-panel-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6272a4;
  font-size: 13px;
  padding: 20px;
  text-align: center;
}

/* Tabs */
.code-tabs {
  display: flex;
  align-items: center;
  gap: 2px;
  background: #181825;
  padding: 6px 8px 0;
  border-bottom: 1px solid #313244;
  flex-shrink: 0;
}

.code-tab {
  padding: 5px 14px;
  background: transparent;
  border: none;
  border-radius: 4px 4px 0 0;
  color: #6272a4;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.1s, background 0.1s;
}
.code-tab:hover { color: #cdd6f4; background: #1e1e2e; }
.code-tab.active { color: #cdd6f4; background: #1e1e2e; border-bottom: 2px solid #89b4fa; }

.copy-btn {
  margin-left: auto;
  padding: 4px 10px;
  background: #313244;
  border: none;
  border-radius: 4px;
  color: #a6adc8;
  font-size: 11px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.1s;
}
.copy-btn:hover { background: #45475a; color: #cdd6f4; }

/* Code scroll */
.code-scroll {
  flex: 1;
  overflow: auto;
}

.hljs-pre {
  margin: 0;
  padding: 16px;
  background: transparent !important;
  font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
  font-size: 12.5px;
  line-height: 1.6;
  tab-size: 2;
}

.hljs-pre code.hljs {
  background: transparent !important;
  padding: 0;
  font-size: inherit;
  color: var(--color-code-text);
}
</style>
