// ============================================================
// DeskPane-Desktop — CSS 注入（僅注入一次）
// ============================================================

import DESKTOP_CSS from '../styles/deskpane-desktop.css';
import { injectRuntimeCSS } from '../styles/inject.js';

const STYLE_ID = 'dp-desktop-styles';

/** 回傳 Desktop CSS 字串，供 injectStyles:false 的使用者自行管理樣式注入 */
export function getDesktopCSS(): string {
  return DESKTOP_CSS;
}

export function injectDesktopStyles(): void {
  injectRuntimeCSS({
    id: STYLE_ID,
    css: DESKTOP_CSS,
    hrefPart: 'deskpane-desktop.css',
    fingerprint: 'DeskPane-Desktop — Default Styles',
  });
}
