<template>
  <div class="form-app">
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label>姓名 <span class="req">*</span></label>
        <input v-model.trim="form.name" type="text" placeholder="請輸入姓名"
               :class="{ error: errors.name }" />
        <span class="err-msg" v-if="errors.name">{{ errors.name }}</span>
      </div>
      <div class="field">
        <label>部門</label>
        <select v-model="form.dept">
          <option>財務部</option>
          <option>研發部</option>
          <option>業務部</option>
          <option>人資部</option>
        </select>
      </div>
      <div class="field">
        <label>Email <span class="req">*</span></label>
        <input v-model.trim="form.email" type="text" placeholder="user@example.com"
               :class="{ error: errors.email }" />
        <span class="err-msg" v-if="errors.email">{{ errors.email }}</span>
      </div>
      <div class="field">
        <label>備註</label>
        <input v-model="form.note" type="text" placeholder="（選填）" />
      </div>
      <button type="submit" class="btn-submit">送出</button>
    </form>

    <transition name="fade">
      <div v-if="submitted" class="success-msg">
        ✅ 已送出！姓名：{{ submitted.name }}，部門：{{ submitted.dept }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({ name: '', dept: '財務部', email: '', note: '' })
const errors = reactive({ name: '', email: '' })
const submitted = ref<{ name: string; dept: string } | null>(null)

function validate() {
  errors.name = form.name ? '' : '姓名為必填'
  errors.email = form.email
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : '請輸入有效 Email'
    : 'Email 為必填'
  return !errors.name && !errors.email
}

function handleSubmit() {
  if (!validate()) return
  submitted.value = { name: form.name, dept: form.dept }
  setTimeout(() => (submitted.value = null), 3000)
}
</script>

<style scoped>
.form-app { padding: 16px; }
form { display: flex; flex-direction: column; gap: 10px; }
.field { display: flex; flex-direction: column; gap: 3px; }
label { font-size: 12px; color: #666; font-weight: 500; }
.req { color: #e53935; }
input, select {
  padding: 7px 10px;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.15s;
}
input:focus, select:focus { border-color: #1a73e8; }
input.error { border-color: #e53935; }
.err-msg { font-size: 11px; color: #e53935; }
.btn-submit {
  margin-top: 4px;
  padding: 9px;
  background: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.15s;
}
.btn-submit:hover { background: #1558b0; }
.success-msg {
  margin-top: 12px;
  padding: 10px 12px;
  background: #e8f5e9;
  border-radius: 6px;
  font-size: 13px;
  color: #2e7d32;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
