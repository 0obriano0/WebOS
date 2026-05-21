<template>
  <nav class="side-nav">
    <div
      v-for="cat in nav"
      :key="cat.label"
      class="nav-category"
    >
      <div class="nav-cat-label">{{ cat.label }}</div>
      <ul class="nav-items">
        <li
          v-for="item in cat.items"
          :key="item.id"
          class="nav-item"
          :class="{ active: item.id === active }"
          @click="$emit('update:active', item.id)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { NavCategory } from '../nav-config'

defineProps<{
  nav: NavCategory[]
  active: string
}>()
defineEmits<{
  (e: 'update:active', id: string): void
}>()
</script>

<style scoped>
.side-nav {
  padding: 12px 0;
}

.nav-category {
  margin-bottom: 4px;
}

.nav-cat-label {
  padding: 6px 16px 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.nav-items {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  padding: 7px 20px;
  cursor: pointer;
  font-size: 13px;
  color: var(--color-text);
  border-left: 3px solid transparent;
  transition: background 0.12s, color 0.12s;
}

.nav-item:hover {
  background: #e9ecef;
}

.nav-item.active {
  background: #dbeafe;
  color: var(--color-primary);
  border-left-color: var(--color-primary);
  font-weight: 600;
}
</style>
