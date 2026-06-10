// ============================================================
// DeskPane-Desktop — CSS 注入（僅注入一次）
// ============================================================

import DESKTOP_CSS from '../styles/deskpane-desktop.css';

const STYLE_ID = 'dp-desktop-styles';

/** 回傳 Desktop CSS 字串，供 injectStyles:false 的使用者自行管理樣式注入 */
export function getDesktopCSS(): string {
  return DESKTOP_CSS;
}

export function injectDesktopStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = DESKTOP_CSS;
  document.head.appendChild(style);
}
