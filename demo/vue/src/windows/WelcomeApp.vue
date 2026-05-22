<template>
  <div class="welcome">
    <h2>🖥 WebOS-Core</h2>
    <p>框架無關的網頁視窗管理引擎 <code>v0.1.0</code></p>
    <ul>
      <li>✅ 純 TypeScript，零框架依賴</li>
      <li>✅ 拖曳 / 縮放 / 置頂 / 最小化 / 最大化</li>
      <li>✅ <strong>Snap 吸附</strong>：拖曳靠近邊緣自動對齊</li>
      <li>✅ Keep-Alive：最小化不銷毀 Vue 元件狀態</li>
      <li>✅ 跨視窗 EventBus</li>
      <li>✅ Vue 3 Composable 整合</li>
      <li>✅ <strong>主題切換</strong>：點擊 Dock 下方 ☀️/🌙 切換亮/暗色主題</li>
    </ul>
    <p class="hint">點擊左側 Dock 圖示開啟應用程式 👈</p>
  </div>
</template>

<style scoped>
.welcome {
  padding: 20px;
  line-height: 1.8;
}
h2 {
  margin-top: 0;
  color: #1a73e8;
  font-size: 1.3rem;
}
ul {
  padding-left: 20px;
  color: #555;
  margin: 10px 0;
}
code {
  background: #f0f4ff;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.85em;
  color: #1a73e8;
}
.hint {
  margin-top: 12px;
  color: #888;
  font-size: 0.9rem;
}
</style>
