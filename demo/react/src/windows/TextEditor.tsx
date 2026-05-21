import { useState } from 'react'

export default function TextEditor() {
  const [text, setText] = useState('')

  return (
    <div style={{
      padding: 12, height: '100%', display: 'flex', flexDirection: 'column',
      gap: 8, fontFamily: 'Segoe UI, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, fontSize: 13, color: '#333' }}>📝 文字編輯器</span>
        <span style={{ fontSize: 11, color: '#888' }}>{text.length} 字元</span>
      </div>
      <textarea
        style={{
          flex: 1, resize: 'none', border: '1px solid #ddd', borderRadius: 4,
          padding: 10, fontSize: 13, fontFamily: 'inherit', outline: 'none',
          lineHeight: 1.6,
        }}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="請輸入文字... （最小化後重新打開，內容仍保留）"
      />
    </div>
  )
}
