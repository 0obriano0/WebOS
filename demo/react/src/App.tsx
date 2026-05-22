import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useWindowManager } from '@webos/adapters/react/useWindowManager'
import type { ReactWindowEntry } from '@webos/adapters/react/useWindowManager'
import { setTheme } from '@webos/themes/setTheme'

import WelcomeApp  from './windows/WelcomeApp'
import TextEditor  from './windows/TextEditor'
import FormApp     from './windows/FormApp'
import CounterApp  from './windows/CounterApp'
import TodoApp     from './windows/TodoApp'

interface AppDef {
  id: string
  label: string
  icon: string
  title: string
  component: React.ComponentType<any>
  width?: number
  height?: number
  x?: number
  y?: number
}

const APP_LIST: AppDef[] = [
  { id: 'welcome',     label: '桌面',   icon: '🖥', title: '歡迎使用 WebOS-Core', component: WelcomeApp,  width: 420, height: 320, x: 100, y: 60  },
  { id: 'text-win',    label: '文字',   icon: '📝', title: '文字編輯器',           component: TextEditor,  width: 420, height: 320, x: 140, y: 80  },
  { id: 'form-win',    label: '表單',   icon: '📋', title: '員工資料表單',          component: FormApp,     width: 360, height: 380, x: 180, y: 100 },
  { id: 'counter-win', label: '計數器', icon: '🔢', title: 'React 計數器',         component: CounterApp,  width: 320, height: 300, x: 220, y: 120 },
  { id: 'todo-win',    label: '待辦',   icon: '✅', title: '待辦清單',              component: TodoApp,     width: 360, height: 420, x: 260, y: 80  },
]

const APP_MAP = Object.fromEntries(APP_LIST.map(a => [a.id, a]))

export default function App() {
  const { wm, windows, openReactWindow, minimize, restore, focus, destroy } =
    useWindowManager({ throttleMs: 16, snap: true })

  const [logs, setLogs] = useState<string[]>(['📡 Event Log'])
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light'
    setThemeState(next)
    setTheme(next, { basePath: '/themes' })
  }, [theme])

  const openApp = (appId: string) => {
    const app = APP_MAP[appId]
    if (!app) return
    openReactWindow({
      id:        app.id,
      title:     app.title,
      component: app.component,
      width:     app.width,
      height:    app.height,
      x:         app.x,
      y:         app.y,
    })
  }

  useEffect(() => {
    const EVENTS = [
      'window:opened', 'window:closed', 'window:focused',
      'window:minimized', 'window:maximized', 'window:restored',
    ]
    EVENTS.forEach(ev => {
      wm.events.on(ev, (d: any) => {
        setLogs(prev => [`▶ ${ev} [${d?.id ?? ''}]`, ...prev.slice(0, 39)])
      })
    })
    // 啟動時開啟歡迎視窗
    openApp('welcome')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openIds = new Set(windows.map(w => w.id))

  function onTaskbarClick(win: ReactWindowEntry) {
    if (win.state.isMinimized) {
      restore(win.id)
      focus(win.id)
    } else if (win.state.isActive) {
      minimize(win.id)
    } else {
      focus(win.id)
    }
  }

  return (
    <div className="desktop">

      {/* ── 左側 Dock ── */}
      <nav id="app-dock">
        {APP_LIST.map(app => (
          <button
            key={app.id}
            className={`dock-item${openIds.has(app.id) ? ' running' : ''}`}
            title={app.title}
            onClick={() => openApp(app.id)}
          >
            <span className="dock-icon">{app.icon}</span>
            <span className="dock-label">{app.label}</span>
          </button>
        ))}

        <div className="dock-separator" />

        <button className="dock-item" title="關閉全部" onClick={() => destroy()}>
          <span className="dock-icon">💣</span>
          <span className="dock-label">關閉全部</span>
        </button>

        <div className="dock-separator" />

        <button
          className="dock-item"
          title={theme === 'light' ? '切換暗色' : '切換亮色'}
          onClick={toggleTheme}
        >
          <span className="dock-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
          <span className="dock-label">{theme === 'light' ? '暗色' : '亮色'}</span>
        </button>
      </nav>

      {/* ── 下方任務列 ── */}
      <div id="taskbar">
        {windows.map(win => (
          <button
            key={win.id}
            className={[
              'task-item',
              win.state.isActive    ? 'active'    : '',
              win.state.isMinimized ? 'minimized' : '',
            ].join(' ').trim()}
            onClick={() => onTaskbarClick(win)}
          >
            <span className="task-icon">{APP_MAP[win.id]?.icon ?? '🪟'}</span>
            {win.state.title}
          </button>
        ))}
      </div>

      {/* ── 事件 Log ── */}
      <div id="event-log">
        {logs.map((entry, i) => <p key={i}>{entry}</p>)}
      </div>

      {/* ── React Portals：渲染進 WM 管理的 DOM body ── */}
      {windows.map(win =>
        win.component
          ? createPortal(
              <win.component {...(win.props ?? {})} />,
              win.bodyEl,
              win.id
            )
          : null
      )}

    </div>
  )
}
