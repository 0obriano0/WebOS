# WebOS-Core

A **framework-agnostic** web virtual desktop window management engine.

The core handles all window lifecycle, drag/resize, focus, and z-order — your UI framework handles the content.

[![npm version](https://img.shields.io/npm/v/webos-core.svg)](https://www.npmjs.com/package/webos-core)
[![license](https://img.shields.io/npm/l/webos-core.svg)](LICENSE)

---

## Features

- ✅ Open, close, minimize, maximize, restore windows
- ✅ Drag & resize with throttling (60 fps by default)
- ✅ Focus / z-order management
- ✅ Event bus — subscribe to any window lifecycle event
- ✅ Isolated mode — embed a desktop inside any page element
- ✅ Vue 3 adapter — `useWindowManager` composable + `KeepAlive` support
- ✅ ES Module + UMD builds — works with bundlers or plain `<script>` tags
- ⬜ React adapter (planned)

---

## Installation

### npm

```bash
npm install webos-core
```

### CDN / Script Tag (UMD)

```html
<script src="dist/webos-core.umd.js"></script>
```

---

## Quick Start

### ES Module (Vite / Webpack / native `type="module"`)

```typescript
import { WindowManager } from 'webos-core'

const wm = new WindowManager({
  container: document.getElementById('desktop')!,
  isolated: true,
})

const el = document.createElement('div')
el.style.padding = '20px'
el.innerHTML = '<h3>Hello, World!</h3>'

wm.open({ id: 'hello', title: 'My Window', content: el })
```

### Script Tag (ES5 / no build step)

```html
<!DOCTYPE html>
<html>
<body>
  <div id="desktop" style="width:100vw; height:100vh; position:relative;"></div>

  <script src="dist/webos-core.umd.js"></script>
  <script>
    var wm = new window.WebOS.WindowManager({
      container: document.getElementById('desktop'),
      isolated: true
    })

    var el = document.createElement('div')
    el.style.padding = '20px'
    el.textContent = 'Hello from UMD!'

    wm.open({ id: 'hello', title: 'My Window', content: el })
  </script>
</body>
</html>
```

### Vue 3

```typescript
// vite.config.ts — add alias
// resolve: { alias: { '@webos': '/path/to/webos-core/src' } }

import { useWindowManager } from '@webos/adapters/vue/useWindowManager'
import { Teleport, KeepAlive } from 'vue'
```

```vue
<template>
  <div ref="desktop" class="desktop">
    <button @click="wm?.open({ id: 'w1', title: 'Window', content: bodyEl })">
      Open Window
    </button>

    <Teleport v-for="win in windows" :key="win.id" :to="win.bodyEl">
      <KeepAlive>
        <MyComponent />
      </KeepAlive>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useWindowManager } from '@webos/adapters/vue/useWindowManager'

const { wm, windows, desktop } = useWindowManager()
</script>
```

---

## API Reference

### `new WindowManager(options?)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `container` | `HTMLElement` | `document.body` | Desktop container element |
| `isolated` | `boolean` | `false` | Constrain windows to container (`position: absolute`) |
| `throttleMs` | `number` | `16` | Drag/resize throttle interval (ms) |

### Methods

| Method | Description |
|--------|-------------|
| `wm.open(config)` | Open a window (restores & focuses if ID already exists) |
| `wm.close(id)` | Close and remove a window |
| `wm.minimize(id)` | Minimize a window |
| `wm.maximize(id)` | Maximize a window |
| `wm.restore(id)` | Restore from minimized or maximized |
| `wm.focus(id)` | Bring window to front |
| `wm.getState(id)` | Get current `WindowState` |
| `wm.getBodyElement(id)` | Get the window's content `HTMLElement` |
| `wm.destroy()` | Destroy all windows and clean up DOM |

### `WindowConfig`

```typescript
interface WindowConfig {
  id: string          // Unique window ID (required)
  title: string       // Window title bar text
  content: any        // HTMLElement (or Vue/React component)
  x?: number          // Initial X position (px)
  y?: number          // Initial Y position (px)
  width?: number      // Initial width (px), default 640
  height?: number     // Initial height (px), default 480
  props?: Record<string, unknown>  // Props passed to component content
}
```

### Events

```typescript
wm.events.on('window:opened',    (state) => { /* ... */ })
wm.events.on('window:closed',    (state) => { /* ... */ })
wm.events.on('window:focused',   (state) => { /* ... */ })
wm.events.on('window:minimized', (state) => { /* ... */ })
wm.events.on('window:maximized', (state) => { /* ... */ })
wm.events.on('window:restored',  (state) => { /* ... */ })
wm.events.on('window:moved',     (state) => { /* ... */ })
wm.events.on('window:resized',   (state) => { /* ... */ })
```

---

## Build Output

| File | Format | Size | Use when |
|------|--------|------|----------|
| `dist/webos-core.es.js` | ESM | ~24 KB | Vite / Webpack / `type="module"` |
| `dist/webos-core.umd.js` | UMD | ~26 KB | Script tag, jQuery, legacy pages |
| `dist/index.d.ts` | TypeScript | ~4 KB | IDE autocomplete & type checking |

---

## Building from Source

```bash
# Install dependencies
npm install

# Build ES + UMD bundles
npm run build:lib

# TypeScript compile only
npm run build
```

> **Note:** Requires Node.js 18+. The library build uses Rollup and works on any Node 18+ version.

---

## Browser Support

Any modern browser supporting ES2017 (`async/await`, `Map`, `Set`).  
UMD bundle also works in older environments when transpiled by your build tool.

---

## License

MIT
