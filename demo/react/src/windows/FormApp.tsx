import { useState } from 'react'

interface FormData { name: string; email: string; role: string }

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '7px 10px', border: '1px solid #ddd',
  borderRadius: 4, fontSize: 13, outline: 'none', boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 12, color: '#666', fontWeight: 600, marginBottom: 4,
}

export default function FormApp() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', role: 'developer' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const update = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = () => {
    if (!form.name.trim() || !form.email.includes('@')) {
      setError('⚠ 請填寫姓名及有效的 Email')
      return
    }
    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ padding: 20, textAlign: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
        <p style={{ color: '#4caf50', fontWeight: 600, fontSize: 15, marginBottom: 12 }}>
          ✅ 提交成功！
        </p>
        <pre style={{
          textAlign: 'left', fontSize: 12, background: '#f8f8f8',
          padding: 12, borderRadius: 6, color: '#444',
        }}>
          {JSON.stringify(form, null, 2)}
        </pre>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', role: 'developer' }) }}
          style={{ marginTop: 12, padding: '6px 16px', cursor: 'pointer', borderRadius: 4, border: '1px solid #ddd', background: '#fff' }}
        >重置表單</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 16, fontFamily: 'Segoe UI, sans-serif' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 15, color: '#333' }}>📋 員工資料表單</h3>

      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>姓名 *</label>
        <input style={inputStyle} value={form.name} onChange={e => update('name', e.target.value)} placeholder="請輸入姓名" />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Email *</label>
        <input style={inputStyle} value={form.email} onChange={e => update('email', e.target.value)} placeholder="example@email.com" type="email" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>職位</label>
        <select
          style={{ ...inputStyle }}
          value={form.role}
          onChange={e => update('role', e.target.value)}
        >
          <option value="developer">工程師</option>
          <option value="designer">設計師</option>
          <option value="manager">主管</option>
        </select>
      </div>

      {error && (
        <p style={{ color: '#f44', fontSize: 12, margin: '0 0 10px' }}>{error}</p>
      )}

      <button
        onClick={submit}
        style={{
          width: '100%', padding: '9px', background: '#4a90e2', color: '#fff',
          border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13, fontWeight: 600,
        }}
      >提交</button>
    </div>
  )
}
