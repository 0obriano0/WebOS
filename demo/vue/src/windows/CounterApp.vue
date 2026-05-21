<template>
  <div class="counter-app">
    <div class="count-display">{{ count }}</div>
    <div class="btn-row">
      <button class="btn-dec" @click="count > 0 && count--">－</button>
      <button class="btn-inc" @click="count++">＋</button>
    </div>
    <button class="btn-reset" @click="reset">重置</button>
    <p class="note">最小化後再還原，計數不會重置 ✓</p>
    <div class="history">
      <div class="history-title">操作歷程</div>
      <div class="history-list">
        <div v-for="(item, i) in history" :key="i" class="history-item">
          <span class="ts">{{ item.time }}</span>
          <span class="val" :class="item.delta > 0 ? 'up' : item.delta < 0 ? 'down' : 'reset'">
            {{ item.delta > 0 ? `+${item.delta}` : item.delta === 0 ? '重置' : item.delta }}
            → {{ item.value }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface HistoryItem { time: string; value: number; delta: number }

const count = ref(0)
const history = ref<HistoryItem[]>([])

function now() {
  return new Date().toLocaleTimeString('zh-TW', { hour12: false })
}

watch(count, (val, old) => {
  history.value.unshift({ time: now(), value: val, delta: val - old })
  if (history.value.length > 20) history.value.pop()
})

function reset() {
  const prev = count.value
  count.value = 0
  history.value.unshift({ time: now(), value: 0, delta: -prev })
  if (history.value.length > 20) history.value.pop()
}
</script>

<style scoped>
.counter-app {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 100%;
  overflow-y: auto;
}
.count-display {
  font-size: 64px;
  font-weight: 800;
  color: #1a73e8;
  line-height: 1;
  min-width: 120px;
  text-align: center;
}
.btn-row { display: flex; gap: 12px; }
.btn-dec, .btn-inc {
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
  transition: transform 0.1s, background 0.1s;
  font-weight: 700;
}
.btn-dec { background: #fce4e4; color: #c62828; }
.btn-dec:hover { background: #ffcdd2; transform: scale(1.08); }
.btn-inc { background: #e3f2fd; color: #1565c0; }
.btn-inc:hover { background: #bbdefb; transform: scale(1.08); }
.btn-reset {
  padding: 5px 18px;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  background: #fff;
  font-size: 12px;
  cursor: pointer;
  color: #666;
}
.btn-reset:hover { background: #f5f5f5; }
.note { font-size: 11px; color: #aaa; margin: 0; }
.history { width: 100%; }
.history-title { font-size: 11px; color: #999; font-weight: 600; margin-bottom: 4px; }
.history-list { display: flex; flex-direction: column; gap: 2px; max-height: 100px; overflow-y: auto; }
.history-item { display: flex; gap: 8px; font-size: 11px; font-family: monospace; }
.ts { color: #bbb; }
.up   { color: #1565c0; }
.down { color: #c62828; }
.reset { color: #888; }
</style>
