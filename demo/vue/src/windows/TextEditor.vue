<template>
  <div class="text-editor">
    <div class="toolbar">
      <span class="char-count">
        字數：<strong>{{ charCount }}</strong>
        &nbsp;|&nbsp;行數：<strong>{{ lineCount }}</strong>
      </span>
      <button class="btn-clear" @click="content = ''">清除</button>
    </div>
    <textarea
      v-model="content"
      placeholder="開始輸入文字...&#10;&#10;拖曳標題列可移動視窗，拖曳邊框可縮放。&#10;最小化後再還原，內容完整保留 ✓"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const content = ref('')

const charCount = computed(() => content.value.length)
const lineCount = computed(() => content.value === '' ? 0 : content.value.split('\n').length)
</script>

<style scoped>
.text-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px;
  gap: 8px;
}
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}
.btn-clear {
  padding: 3px 10px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
  color: #555;
  transition: background 0.1s;
}
.btn-clear:hover { background: #f5f5f5; }
textarea {
  flex: 1;
  resize: none;
  padding: 10px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 13px;
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  outline: none;
  transition: border-color 0.15s;
}
textarea:focus { border-color: #1a73e8; }
</style>
