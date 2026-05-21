<template>
  <div class="demo-shell">
    <div class="demo-toolbar">
      <span class="demo-label">▶ Live Demo</span>
      <slot name="controls" />
      <button class="btn-reset" @click="$emit('reset')" title="重置所有視窗">Reset</button>
    </div>
    <div ref="container" class="demo-viewport">
      <!-- WindowManager isolated container — windows are rendered here -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineEmits<{ (e: 'reset'): void }>()

const container = ref<HTMLElement | null>(null)
defineExpose({ container })
</script>

<style scoped>
.demo-shell {
  border: 1px solid var(--color-demo-border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--color-demo-bg);
  margin: 16px 0;
}

.demo-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f1f5f9;
  border-bottom: 1px solid var(--color-demo-border);
  flex-wrap: wrap;
}

.demo-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-right: 4px;
}

.demo-viewport {
  height: 380px;
  position: relative;
  overflow: hidden;
  background: #fafbfc;
}

.btn-reset {
  margin-left: auto;
  padding: 4px 12px;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  color: var(--color-text-muted);
  transition: background 0.1s;
}
.btn-reset:hover { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }
</style>
