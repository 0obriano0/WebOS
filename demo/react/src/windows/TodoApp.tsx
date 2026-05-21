import { useState } from 'react'

export default function TodoApp() {
  const [items, setItems] = useState<string[]>([])
  const [input, setInput] = useState('')

  const add = () => {
    if (!input.trim()) return
    setItems(v => [...v, input.trim()])
    setInput('')
  }

  const remove = (idx: number) => setItems(v => v.filter((_, i) => i !== idx))

  return (
    <div style={{ padding: 16, fontFamily: 'Segoe UI, sans-serif' }}>
      <h3 style={{ margin: '0 0 12px', fontSize: 15, color: '#333' }}>✅ 待辦清單</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="新增項目... (Enter)"
          style={{
            flex: 1, padding: '6px 10px', border: '1px solid #ddd',
            borderRadius: 4, fontSize: 13, outline: 'none',
          }}
        />
        <button
          onClick={add}
          style={{
            padding: '6px 14px', background: '#4a90e2', color: '#fff',
            border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13,
          }}
        >新增</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 0', borderBottom: '1px solid #f0f0f0', fontSize: 13,
          }}>
            <span style={{ color: '#333' }}>• {item}</span>
            <button
              onClick={() => remove(i)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#f44', fontSize: 16, lineHeight: 1,
              }}
            >✕</button>
          </li>
        ))}
        {items.length === 0 && (
          <li style={{ color: '#aaa', fontSize: 12, padding: '8px 0' }}>
            尚無待辦項目，試著新增一筆
          </li>
        )}
      </ul>
    </div>
  )
}
