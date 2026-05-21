// ============================================================
// WebOS-Core — Global Event Bus
// 跨視窗事件系統，允許不同視窗間即時資料聯動
// ============================================================
class EventBus {
    constructor() {
        this._listeners = new Map();
    }
    /** 訂閱事件 */
    on(event, cb) {
        if (!this._listeners.has(event)) {
            this._listeners.set(event, new Set());
        }
        this._listeners.get(event).add(cb);
        // 回傳取消訂閱函式
        return () => this.off(event, cb);
    }
    /** 取消訂閱 */
    off(event, cb) {
        this._listeners.get(event)?.delete(cb);
    }
    /** 發送事件 */
    emit(event, data) {
        this._listeners.get(event)?.forEach(cb => {
            try {
                cb(data);
            }
            catch (e) {
                console.error(`[EventBus] Error in handler for "${event}":`, e);
            }
        });
    }
    /** 清除特定事件的所有訂閱 */
    clear(event) {
        this._listeners.delete(event);
    }
    /** 清除全部訂閱 */
    clearAll() {
        this._listeners.clear();
    }
}
/** 全域單例 */
const eventBus = new EventBus();

// ============================================================
// WebOS-Core — Drag & Resize Handler
// 支援滑鼠與觸控，內建 Throttle 確保巨量表格不卡頓
// ============================================================
/** 簡易節流 */
function throttle(fn, ms) {
    let last = 0;
    return function (...args) {
        const now = performance.now();
        if (now - last >= ms) {
            last = now;
            fn.apply(this, args);
        }
    };
}
class DragResizeHandler {
    constructor(winEl, headerEl, opts = {}) {
        // 拖曳狀態
        this._dragging = false;
        this._dragOffX = 0;
        this._dragOffY = 0;
        // 縮放狀態
        this._resizing = false;
        this._resizeEdge = null;
        this._resizeStartX = 0;
        this._resizeStartY = 0;
        this._resizeStartRect = { x: 0, y: 0, w: 0, h: 0 };
        this._winEl = winEl;
        this._headerEl = headerEl;
        this._opts = {
            throttleMs: opts.throttleMs ?? 16,
            resizeBorderPx: opts.resizeBorderPx ?? 8,
            minWidth: opts.minWidth ?? 200,
            minHeight: opts.minHeight ?? 120,
            containerEl: opts.containerEl,
            onDragStart: opts.onDragStart ?? (() => { }),
            onDrag: opts.onDrag ?? (() => { }),
            onDragEnd: opts.onDragEnd ?? (() => { }),
            onResizeStart: opts.onResizeStart ?? (() => { }),
            onResize: opts.onResize ?? (() => { }),
            onResizeEnd: opts.onResizeEnd ?? (() => { }),
        };
        const throttledMove = throttle(this._handleMove.bind(this), this._opts.throttleMs);
        this._onMouseMoveBound = throttledMove;
        this._onMouseUpBound = this._handleUp.bind(this);
        this._onTouchMoveBound = (e) => {
            const t = e.touches[0];
            throttledMove({ clientX: t.clientX, clientY: t.clientY });
        };
        this._onTouchEndBound = this._handleUp.bind(this);
        this._attachEvents();
    }
    _attachEvents() {
        // 標題列 → 拖曳
        this._headerEl.addEventListener('mousedown', this._onHeaderMouseDown.bind(this));
        this._headerEl.addEventListener('touchstart', this._onHeaderTouchStart.bind(this), { passive: true });
        // 視窗邊框 → 縮放
        this._winEl.addEventListener('mousedown', this._onWinMouseDown.bind(this));
        this._winEl.addEventListener('mousemove', this._updateResizeCursor.bind(this));
    }
    _onHeaderMouseDown(e) {
        if (e.target.closest('.wos-btn'))
            return; // 忽略按鈕點擊
        e.preventDefault();
        this._startDrag(e.clientX, e.clientY);
        document.addEventListener('mousemove', this._onMouseMoveBound);
        document.addEventListener('mouseup', this._onMouseUpBound, { once: true });
    }
    _onHeaderTouchStart(e) {
        const t = e.touches[0];
        this._startDrag(t.clientX, t.clientY);
        document.addEventListener('touchmove', this._onTouchMoveBound, { passive: true });
        document.addEventListener('touchend', this._onTouchEndBound, { once: true });
    }
    _startDrag(clientX, clientY) {
        const rect = this._winEl.getBoundingClientRect();
        this._dragging = true;
        this._dragOffX = clientX - rect.left;
        this._dragOffY = clientY - rect.top;
        this._winEl.style.userSelect = 'none';
        this._opts.onDragStart();
    }
    _onWinMouseDown(e) {
        const edge = this._getResizeEdge(e);
        if (!edge)
            return;
        e.preventDefault();
        this._startResize(edge, e.clientX, e.clientY);
        document.addEventListener('mousemove', this._onMouseMoveBound);
        document.addEventListener('mouseup', this._onMouseUpBound, { once: true });
    }
    _startResize(edge, clientX, clientY) {
        const rect = this._winEl.getBoundingClientRect();
        this._resizing = true;
        this._resizeEdge = edge;
        this._resizeStartX = clientX;
        this._resizeStartY = clientY;
        this._resizeStartRect = {
            x: rect.left,
            y: rect.top,
            w: rect.width,
            h: rect.height,
        };
        this._winEl.style.userSelect = 'none';
        this._opts.onResizeStart();
    }
    _handleMove(e) {
        if (this._dragging) {
            const { left, top } = this._getContainerRect();
            const x = e.clientX - this._dragOffX - left;
            const y = e.clientY - this._dragOffY - top;
            this._winEl.style.left = `${x}px`;
            this._winEl.style.top = `${y}px`;
            this._opts.onDrag(x, y);
        }
        else if (this._resizing && this._resizeEdge) {
            this._applyResize(e.clientX, e.clientY);
        }
    }
    _applyResize(clientX, clientY) {
        const dx = clientX - this._resizeStartX;
        const dy = clientY - this._resizeStartY;
        const { x, y, w, h } = this._resizeStartRect;
        const { minWidth, minHeight } = this._opts;
        const edge = this._resizeEdge;
        let newX = x, newY = y, newW = w, newH = h;
        if (edge.includes('e'))
            newW = Math.max(minWidth, w + dx);
        if (edge.includes('s'))
            newH = Math.max(minHeight, h + dy);
        if (edge.includes('w')) {
            newW = Math.max(minWidth, w - dx);
            newX = x + (w - newW);
        }
        if (edge.includes('n')) {
            newH = Math.max(minHeight, h - dy);
            newY = y + (h - newH);
        }
        // 轉換為容器相對座標（isolated 模式下 newX/newY 是 viewport 座標）
        const { left: cLeft, top: cTop } = this._getContainerRect();
        this._winEl.style.left = `${newX - cLeft}px`;
        this._winEl.style.top = `${newY - cTop}px`;
        this._winEl.style.width = `${newW}px`;
        this._winEl.style.height = `${newH}px`;
        this._opts.onResize(newX - cLeft, newY - cTop, newW, newH);
    }
    _handleUp() {
        if (this._dragging) {
            this._dragging = false;
            this._winEl.style.userSelect = '';
            this._opts.onDragEnd();
        }
        if (this._resizing) {
            this._resizing = false;
            this._resizeEdge = null;
            this._winEl.style.userSelect = '';
            this._opts.onResizeEnd();
        }
        document.removeEventListener('mousemove', this._onMouseMoveBound);
        document.removeEventListener('touchmove', this._onTouchMoveBound);
    }
    _getContainerRect() {
        if (this._opts.containerEl) {
            const r = this._opts.containerEl.getBoundingClientRect();
            return { left: r.left, top: r.top };
        }
        return { left: 0, top: 0 };
    }
    _getResizeEdge(e) {
        const rect = this._winEl.getBoundingClientRect();
        const b = this._opts.resizeBorderPx;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const right = rect.width - x;
        const bottom = rect.height - y;
        // 標題列內不啟動縮放
        if (e.target.closest('.wos-header'))
            return null;
        const onN = y <= b;
        const onS = bottom <= b;
        const onW = x <= b;
        const onE = right <= b;
        if (onN && onW)
            return 'nw';
        if (onN && onE)
            return 'ne';
        if (onS && onW)
            return 'sw';
        if (onS && onE)
            return 'se';
        if (onN)
            return 'n';
        if (onS)
            return 's';
        if (onW)
            return 'w';
        if (onE)
            return 'e';
        return null;
    }
    _updateResizeCursor(e) {
        if (this._dragging || this._resizing)
            return;
        const edge = this._getResizeEdge(e);
        const cursors = {
            n: 'n-resize', s: 's-resize', e: 'e-resize', w: 'w-resize',
            ne: 'ne-resize', nw: 'nw-resize', se: 'se-resize', sw: 'sw-resize',
        };
        this._winEl.style.cursor = edge ? cursors[edge] : 'default';
    }
    destroy() {
        document.removeEventListener('mousemove', this._onMouseMoveBound);
        document.removeEventListener('mouseup', this._onMouseUpBound);
        document.removeEventListener('touchmove', this._onTouchMoveBound);
        document.removeEventListener('touchend', this._onTouchEndBound);
    }
}

// ============================================================
// WebOS-Core — DOM Window Renderer
// 負責建立視窗外殼 DOM 節點、注入樣式
// ============================================================
const STYLE_ID = 'wos-core-styles';
const BASE_CSS = `
.wos-window {
  position: fixed;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: 4px solid #d0d0d0;
  border-radius: 6px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  background: #d0d0d0;
  overflow: hidden;
  min-width: 200px;
  min-height: 120px;
  transition: box-shadow 0.15s;
}
.wos-window.wos-active {
  border-color: #b0b8c8;
  box-shadow: 0 8px 36px rgba(0,0,0,0.28);
}
.wos-window.wos-minimized {
  display: none !important;
}
.wos-window.wos-maximized {
  left: 72px !important;
  top: 0 !important;
  width: calc(100vw - 72px) !important;
  height: calc(100vh - 48px) !important;
  border-radius: 0;
  border-width: 0;
}
/* ── Isolated container mode ──────────────────────────── */
.wos-isolated {
  position: relative;
  overflow: hidden;
}
.wos-isolated .wos-window {
  position: absolute;
}
.wos-isolated .wos-window.wos-maximized {
  left: 0 !important;
  top: 0 !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 0;
}
/* ─────────────────────────────────────────────────────── */
.wos-header {
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 36px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  cursor: move;
  user-select: none;
  flex-shrink: 0;
}
.wos-title {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.wos-btn {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #555;
  margin-left: 2px;
  transition: background 0.1s;
}
.wos-btn:hover { background: #e0e0e0; }
.wos-btn.wos-btn-close:hover { background: #ff5f57; color: #fff; }
.wos-body {
  flex: 1;
  overflow: auto;
  position: relative;
  background: #fff;
}
`;
function injectStyles() {
    if (document.getElementById(STYLE_ID))
        return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = BASE_CSS;
    document.head.appendChild(style);
}
/** 建立視窗外殼 DOM，回傳各主要元素參照 */
function createWindowDOM(state) {
    const root = document.createElement('div');
    root.className = 'wos-window';
    root.dataset.wosId = state.id;
    applyGeometry(root, state);
    root.style.zIndex = String(state.zIndex);
    // ── Header ──
    const header = document.createElement('div');
    header.className = 'wos-header';
    const title = document.createElement('span');
    title.className = 'wos-title';
    title.textContent = state.title;
    const btnMin = createButton('－', 'wos-btn-min', '最小化');
    const btnMax = createButton('□', 'wos-btn-max', '最大化');
    const btnClose = createButton('✕', 'wos-btn-close', '關閉');
    header.append(title, btnMin, btnMax, btnClose);
    // ── Body ──
    const body = document.createElement('div');
    body.className = 'wos-body';
    root.append(header, body);
    // 注入視窗內容（DOM 型別）
    if (state.slotType === 'dom' && state.content instanceof HTMLElement) {
        body.appendChild(state.content);
    }
    return { root, header, title, body, btnMin, btnMax, btnClose };
}
function createButton(text, cls, ariaLabel) {
    const btn = document.createElement('button');
    btn.className = `wos-btn ${cls}`;
    btn.textContent = text;
    btn.setAttribute('aria-label', ariaLabel);
    return btn;
}
/** 將 WindowState 的幾何資訊套用到 DOM 元素 */
function applyGeometry(el, state) {
    if (state.x !== undefined)
        el.style.left = `${state.x}px`;
    if (state.y !== undefined)
        el.style.top = `${state.y}px`;
    if (state.width !== undefined)
        el.style.width = `${state.width}px`;
    if (state.height !== undefined)
        el.style.height = `${state.height}px`;
}

// ============================================================
// WebOS-Core — WindowManager
// 核心大腦：管理所有視窗的生命週期與狀態
// ============================================================
const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 480;
const BASE_Z = 100;
const CASCADE_OFFSET = 30;
class WindowManager {
    constructor(opts = {}) {
        this._wins = new Map();
        this._zCounter = BASE_Z;
        this._cascadeCount = 0;
        this._container = opts.container ?? document.body;
        this._throttleMs = opts.throttleMs ?? 16;
        this._isolated = opts.isolated ?? false;
        this.events = new EventBus();
        injectStyles();
        if (this._isolated) {
            this._container.classList.add('wos-isolated');
        }
    }
    // ─────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────
    /**
     * 開啟視窗。若 ID 已存在，恢復並聚焦；否則建立新視窗。
     */
    open(config) {
        const existing = this._wins.get(config.id);
        if (existing) {
            this.restore(config.id);
            this.focus(config.id);
            return existing.state;
        }
        const offset = (this._cascadeCount++ % 10) * CASCADE_OFFSET;
        const state = {
            id: config.id,
            title: config.title,
            slotType: config.slotType ?? 'dom',
            content: config.content,
            x: config.x ?? 60 + offset,
            y: config.y ?? 60 + offset,
            width: config.width ?? DEFAULT_WIDTH,
            height: config.height ?? DEFAULT_HEIGHT,
            zIndex: ++this._zCounter,
            isMaximized: false,
            isMinimized: false,
            isActive: true,
            props: config.props,
        };
        const elements = createWindowDOM(state);
        this._container.appendChild(elements.root);
        const dragResize = new DragResizeHandler(elements.root, elements.header, {
            throttleMs: this._throttleMs,
            containerEl: this._isolated ? this._container : undefined,
            onDrag: (x, y) => {
                state.x = x;
                state.y = y;
                this.events.emit('window:moved', { ...state });
            },
            onResize: (x, y, w, h) => {
                state.x = x;
                state.y = y;
                state.width = w;
                state.height = h;
                this.events.emit('window:resized', { ...state });
            },
        });
        // 綁定標題列按鈕
        elements.btnMin.addEventListener('click', () => this.minimize(state.id));
        elements.btnMax.addEventListener('click', () => {
            if (state.isMaximized) {
                // 標題列按鈕點還原：強制完整還原到最大化前的幾何
                state.isMaximized = false; // 清掉旗標讓 restore() 走完整還原路徑
                this.restore(state.id);
            }
            else {
                this.maximize(state.id);
            }
        });
        elements.btnClose.addEventListener('click', () => this.close(state.id));
        // 點擊視窗任意處 → 聚焦
        elements.root.addEventListener('mousedown', () => this.focus(state.id), true);
        const managed = { state, elements, dragResize };
        this._wins.set(state.id, managed);
        this._deactivateOthers(state.id);
        elements.root.classList.add('wos-active');
        this.events.emit('window:opened', { ...state });
        return state;
    }
    /**
     * 關閉並銷毀視窗
     */
    close(id) {
        const win = this._wins.get(id);
        if (!win)
            return;
        win.dragResize.destroy();
        win.elements.root.remove();
        this._wins.delete(id);
        this.events.emit('window:closed', { id });
        // 聚焦最後一個存活視窗
        this._focusTopWindow();
    }
    /**
     * 聚焦視窗：置頂 zIndex，設定 isActive
     */
    focus(id) {
        const win = this._wins.get(id);
        if (!win || win.state.isActive)
            return;
        this._deactivateOthers(id);
        win.state.zIndex = ++this._zCounter;
        win.state.isActive = true;
        win.elements.root.style.zIndex = String(win.state.zIndex);
        win.elements.root.classList.add('wos-active');
        if (win.state.isMinimized)
            this.restore(id);
        this.events.emit('window:focused', { ...win.state });
    }
    /**
     * 最小化（隱藏 DOM，保留狀態）
     */
    minimize(id) {
        const win = this._wins.get(id);
        if (!win || win.state.isMinimized)
            return;
        win.state.isMinimized = true;
        win.elements.root.classList.add('wos-minimized');
        this.events.emit('window:minimized', { ...win.state });
        this._focusTopWindow();
    }
    /**
     * 最大化
     */
    maximize(id) {
        const win = this._wins.get(id);
        if (!win)
            return;
        // 若已最大化但被最小化，只需還原（顯示最大化視窗）
        if (win.state.isMaximized) {
            if (win.state.isMinimized)
                this.restore(id);
            return;
        }
        // 儲存幾何快照
        win.state._savedGeometry = {
            x: win.state.x, y: win.state.y,
            width: win.state.width, height: win.state.height,
        };
        win.state.isMaximized = true;
        win.state.isMinimized = false;
        win.elements.root.classList.remove('wos-minimized');
        win.elements.root.classList.add('wos-maximized');
        win.elements.btnMax.textContent = '❐';
        win.elements.btnMax.setAttribute('aria-label', '還原');
        this.focus(id);
        this.events.emit('window:maximized', { ...win.state });
    }
    /**
     * 還原：
     * - 若視窗是「最大化狀態下被最小化」→ 僅移除最小化，保持最大化
     * - 若只是最大化 → 還原到最大化前的幾何
     * - 若只是最小化 → 還原到原始幾何
     */
    restore(id) {
        const win = this._wins.get(id);
        if (!win)
            return;
        const wasMaximized = win.state.isMaximized;
        win.state.isMinimized = false;
        win.elements.root.classList.remove('wos-minimized');
        if (wasMaximized) {
            // 最大化狀態：只解除最小化，維持最大化視覺
            win.elements.root.classList.add('wos-maximized');
            this.events.emit('window:restored', { ...win.state });
            return;
        }
        // 完全還原（從最大化按鈕點還原，或單純取消最小化）
        win.state.isMaximized = false;
        win.elements.root.classList.remove('wos-maximized');
        win.elements.btnMax.textContent = '□';
        win.elements.btnMax.setAttribute('aria-label', '最大化');
        if (win.state._savedGeometry) {
            const g = win.state._savedGeometry;
            win.state.x = g.x;
            win.state.y = g.y;
            win.state.width = g.width;
            win.state.height = g.height;
            applyGeometry(win.elements.root, win.state);
            delete win.state._savedGeometry;
        }
        this.events.emit('window:restored', { ...win.state });
    }
    /** 取得視窗目前狀態快照（唯讀副本） */
    getState(id) {
        const win = this._wins.get(id);
        return win ? { ...win.state } : undefined;
    }
    /** 取得視窗 Body DOM 節點，供外部 Wijmo / jQuery 附加內容 */
    getBodyElement(id) {
        return this._wins.get(id)?.elements.body;
    }
    /** 取得所有視窗 ID 清單 */
    getWindowIds() {
        return [...this._wins.keys()];
    }
    /** 更新視窗標題 */
    setTitle(id, title) {
        const win = this._wins.get(id);
        if (!win)
            return;
        win.state.title = title;
        win.elements.title.textContent = title;
    }
    /** 銷毀所有視窗，清除事件 */
    destroy() {
        [...this._wins.keys()].forEach(id => this.close(id));
        this.events.clearAll();
        if (this._isolated) {
            this._container.classList.remove('wos-isolated');
        }
    }
    // ─────────────────────────────────────────
    // Private helpers
    // ─────────────────────────────────────────
    _deactivateOthers(exceptId) {
        this._wins.forEach((win, id) => {
            if (id !== exceptId && win.state.isActive) {
                win.state.isActive = false;
                win.elements.root.classList.remove('wos-active');
            }
        });
    }
    _focusTopWindow() {
        let topId = null;
        let topZ = -1;
        this._wins.forEach((win, id) => {
            if (!win.state.isMinimized && win.state.zIndex > topZ) {
                topZ = win.state.zIndex;
                topId = id;
            }
        });
        if (topId !== null) {
            const win = this._wins.get(topId);
            win.state.isActive = false; // reset so focus() triggers
            this.focus(topId);
        }
    }
}

export { EventBus, WindowManager, eventBus };
//# sourceMappingURL=webos-core.es.js.map
