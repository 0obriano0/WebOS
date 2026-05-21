const styles: React.CSSProperties = {
  padding: 24,
  fontFamily: 'Segoe UI, sans-serif',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}

export default function WelcomeApp() {
  return (
    <div style={styles}>
      <h2 style={{ margin: 0, fontSize: 18, color: '#333' }}>🖥 歡迎使用 WebOS-Core</h2>
      <p style={{ color: '#555', lineHeight: 1.7, margin: 0 }}>
        React 包裝層示範，展示核心特性：
      </p>
      <ul style={{ color: '#444', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
        <li>✅ <code>useWindowManager</code> hook</li>
        <li>✅ <code>createPortal</code> 將元件渲染進視窗 DOM</li>
        <li>✅ 狀態自動保留（最小化不銷毀元件）</li>
        <li>✅ <strong>Snap 吸附</strong>：拖曳靠近邊緣自動對齊</li>
      </ul>
      <p style={{ color: '#888', fontSize: 12, marginTop: 'auto' }}>
        點擊左側 Dock 開啟其他示範視窗 →
      </p>
    </div>
  )
}
