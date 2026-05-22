// ============================================================
// WebOS-Core — Theme Switcher
// 動態切換主題 CSS 的工具函式
// ============================================================

/** 內建主題名稱 */
export type WosThemePreset = 'light' | 'dark';

export interface SetThemeOptions {
  /**
   * 主題 CSS 檔案所在目錄路徑（不含結尾 `/`）。
   * 預設為 `'themes'`，對應 `dist/themes/` 相對位置。
   */
  basePath?: string;
  /**
   * 用來識別主題 `<link>` 元素的 id。
   * 預設為 `'wos-theme'`。
   */
  linkId?: string;
}

/**
 * 動態切換 WebOS 主題。
 *
 * 第一次呼叫時，若頁面中不存在指定 id 的 `<link>` 元素，
 * 會自動建立一個並插入 `<head>`。
 *
 * @param preset  `'light'` 或 `'dark'`
 * @param options 選填設定（basePath / linkId）
 *
 * @example
 * // ESM
 * import { setTheme } from 'webos-core';
 * setTheme('dark');
 *
 * // UMD
 * WebOS.setTheme('dark');
 *
 * // 自訂路徑（例如主題放在 /assets/themes/）
 * setTheme('dark', { basePath: '/assets/themes' });
 */
export function setTheme(preset: WosThemePreset, options: SetThemeOptions = {}): void {
  const { basePath = 'themes', linkId = 'wos-theme' } = options;
  const href = `${basePath}/${preset}.css`;

  let link = document.getElementById(linkId) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  if (link.getAttribute('href') !== href) {
    link.href = href;
  }
}
