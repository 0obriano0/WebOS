// ============================================================
// WebOS-Core — DOM Window Renderer
// 負責建立視窗外殼 DOM 節點、注入樣式
// ============================================================

import { WindowState } from '../core/types.js';
import BASE_CSS from '../styles/webos-core.css';

const STYLE_ID = 'wos-core-styles';

/** 回傳 Core CSS 字串，供 injectStyles:false 的使用者自行管理樣式注入 */
export function getCoreCSS(): string {
  return BASE_CSS;
}

export function injectStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = BASE_CSS;
  document.head.appendChild(style);
}

export interface WindowElements {
  root: HTMLElement;
  header: HTMLElement;
  title: HTMLElement;
  body: HTMLElement;
  btnMin: HTMLButtonElement;
  btnMax: HTMLButtonElement;
  btnClose: HTMLButtonElement;
}

/** 建立視窗外殼 DOM，回傳各主要元素參照 */
export function createWindowDOM(state: WindowState): WindowElements {
  const root = document.createElement('div');
  root.className = 'wos-window';
  if (state.parentId) root.classList.add('wos-child-window');
  root.dataset.wosId = state.id;
  if (state.parentId) root.dataset.wosParentId = state.parentId;
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

  if (!state.resizable) {
    btnMax.disabled = true;
    btnMax.title = '此視窗不可調整大小';
  }

  // 子視窗：隱藏最小化按鈕（符合 Windows 對話框習慣）
  if (state.parentId) {
    btnMin.style.display = 'none';
    btnMin.setAttribute('aria-hidden', 'true');
  }

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

/**
 * 建立 Modal 遮罩層（覆蓋父視窗內容，不可操作）。
 * 需插入父視窗的 root 元素內。
 */
export function createModalOverlay(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'wos-modal-overlay';
  el.setAttribute('aria-hidden', 'true');
  return el;
}

function createButton(text: string, cls: string, ariaLabel: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = `wos-btn ${cls}`;
  btn.textContent = text;
  btn.setAttribute('aria-label', ariaLabel);
  return btn;
}

/** 將 WindowState 的幾何資訊套用到 DOM 元素 */
export function applyGeometry(el: HTMLElement, state: Partial<Pick<WindowState, 'x' | 'y' | 'width' | 'height'>>): void {
  if (state.x !== undefined) el.style.left = `${state.x}px`;
  if (state.y !== undefined) el.style.top = `${state.y}px`;
  if (state.width !== undefined) el.style.width = `${state.width}px`;
  if (state.height !== undefined) el.style.height = `${state.height}px`;
}
