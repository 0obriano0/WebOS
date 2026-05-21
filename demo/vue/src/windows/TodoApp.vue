<template>
  <div class="todo-app">
    <div class="input-row">
      <input
        v-model.trim="newTodo"
        placeholder="新增待辦事項..."
        @keydown.enter="addTodo"
      />
      <button class="btn-add" @click="addTodo" :disabled="!newTodo">新增</button>
    </div>

    <div class="filter-row">
      <button
        v-for="f in filters"
        :key="f.value"
        :class="['filter-btn', { active: filter === f.value }]"
        @click="filter = f.value"
      >{{ f.label }}（{{ f.count }}）</button>
    </div>

    <transition-group name="list" tag="div" class="todo-list">
      <div
        v-for="item in filteredTodos"
        :key="item.id"
        class="todo-item"
        :class="{ done: item.done }"
      >
        <input type="checkbox" v-model="item.done" />
        <span class="todo-text">{{ item.text }}</span>
        <button class="btn-del" @click="remove(item.id)">✕</button>
      </div>
    </transition-group>

    <div v-if="filteredTodos.length === 0" class="empty">
      {{ filter === 'done' ? '尚無已完成項目' : filter === 'pending' ? '全部完成！🎉' : '新增第一個待辦事項' }}
    </div>

    <div class="footer" v-if="todos.length">
      <span>剩餘 {{ pendingCount }} / {{ todos.length }} 項</span>
      <button class="btn-clear-done" @click="clearDone" :disabled="doneCount === 0">
        清除已完成
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Todo { id: number; text: string; done: boolean }

const todos = ref<Todo[]>([
  { id: 1, text: '探索 WebOS-Core 功能', done: false },
  { id: 2, text: '嘗試最大化 / 最小化視窗', done: false },
])
let nextId = 3
const newTodo = ref('')
type FilterType = 'all' | 'pending' | 'done'

interface FilterDef { value: FilterType; label: string; count: number }

const filter = ref<FilterType>('all')

const filters = computed<FilterDef[]>(() => [
  { value: 'all',     label: '全部',   count: todos.value.length },
  { value: 'pending', label: '待辦',   count: pendingCount.value },
  { value: 'done',    label: '已完成', count: doneCount.value },
])

const pendingCount = computed(() => todos.value.filter(t => !t.done).length)
const doneCount    = computed(() => todos.value.filter(t => t.done).length)

const filteredTodos = computed(() => {
  if (filter.value === 'pending') return todos.value.filter(t => !t.done)
  if (filter.value === 'done')    return todos.value.filter(t => t.done)
  return todos.value
})

function addTodo() {
  if (!newTodo.value) return
  todos.value.push({ id: nextId++, text: newTodo.value, done: false })
  newTodo.value = ''
}

function remove(id: number) {
  todos.value = todos.value.filter(t => t.id !== id)
}

function clearDone() {
  todos.value = todos.value.filter(t => !t.done)
}
</script>

<style scoped>
.todo-app {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow: hidden;
}
.input-row { display: flex; gap: 6px; }
.input-row input {
  flex: 1;
  padding: 7px 10px;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  font-size: 13px;
  outline: none;
}
.input-row input:focus { border-color: #1a73e8; }
.btn-add {
  padding: 7px 14px;
  background: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}
.btn-add:disabled { background: #b0c4e0; cursor: default; }

.filter-row { display: flex; gap: 4px; }
.filter-btn {
  flex: 1;
  padding: 4px 0;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  background: #fff;
  font-size: 11px;
  cursor: pointer;
  color: #666;
  transition: background 0.1s;
}
.filter-btn.active { background: #e8f0fe; color: #1a73e8; border-color: #aac4f5; font-weight: 600; }

.todo-list { display: flex; flex-direction: column; gap: 4px; flex: 1; overflow-y: auto; }
.todo-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 6px;
  background: #f9f9f9;
  border: 1px solid #eee;
  transition: background 0.15s;
}
.todo-item.done { background: #f0fdf4; border-color: #d1fae5; }
.todo-item.done .todo-text { text-decoration: line-through; color: #aaa; }
.todo-text { flex: 1; font-size: 13px; }
.btn-del {
  border: none;
  background: transparent;
  color: #ccc;
  cursor: pointer;
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 3px;
}
.btn-del:hover { color: #e53935; background: #fce4e4; }

.empty { color: #bbb; font-size: 13px; text-align: center; padding: 20px 0; }

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #999;
}
.btn-clear-done {
  padding: 3px 10px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  background: #fff;
  font-size: 11px;
  cursor: pointer;
  color: #666;
}
.btn-clear-done:disabled { opacity: 0.4; cursor: default; }

.list-enter-active, .list-leave-active { transition: all 0.25s ease; }
.list-enter-from { opacity: 0; transform: translateX(-10px); }
.list-leave-to   { opacity: 0; transform: translateX(10px); }
</style>
