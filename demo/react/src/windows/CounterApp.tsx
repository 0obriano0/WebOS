import { useState } from 'react'

const btnStyle: React.CSSProperties = {
  width: 44, height: 44, fontSize: 22, border: '1px solid #ddd',
  borderRadius: 8, background: '#f8f8f8', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

export default function CounterApp() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
      padding: 24, textAlign: 'center', fontFamily: 'Segoe UI, sans-serif',
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16,
    }}>
      <h2 style={{ margin: 0, fontSize: 16, color: '#333' }}>🔢 React 計數器</h2>
      <div style={{ fontSize: 64, fontWeight: 700, color: '#4a90e2', lineHeight: 1 }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button style={btnStyle} onClick={() => setCount(c => c - 1)}>－</button>
        <button
          style={{ ...btnStyle, background: '#f0f0f0', fontSize: 13 }}
          onClick={() => setCount(0)}
        >重置</button>
        <button style={btnStyle} onClick={() => setCount(c => c + 1)}>＋</button>
      </div>
      <p style={{ fontSize: 11, color: '#aaa', margin: 0 }}>
        最小化後重新打開，數值仍保留
      </p>
    </div>
  )
}
