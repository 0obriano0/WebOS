/** 視窗內容的渲染策略 */
type SlotType = 'dom' | 'vue' | 'react';
/** 視窗完整狀態 */
interface WindowState {
    id: string;
    title: string;
    slotType: SlotType;
    /** 視窗內容：HTMLElement | Vue 元件定義 | React 元件 */
    content: any;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    isMaximized: boolean;
    isMinimized: boolean;
    isActive: boolean;
    /** 傳遞給內部組件的初始參數 */
    props?: Record<string, unknown>;
    /** 最大化 / 最小化前的幾何快照，用於 restore */
    _savedGeometry?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
/** open() 時傳入的設定（id 與 content 必填） */
interface WindowConfig {
    id: string;
    title: string;
    slotType?: SlotType;
    content: any;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    props?: Record<string, unknown>;
}
/** 事件巴士回呼型別 */
type EventCallback<T = unknown> = (data: T) => void;

declare class EventBus {
    private readonly _listeners;
    /** 訂閱事件 */
    on<T = unknown>(event: string, cb: EventCallback<T>): () => void;
    /** 取消訂閱 */
    off<T = unknown>(event: string, cb: EventCallback<T>): void;
    /** 發送事件 */
    emit<T = unknown>(event: string, data?: T): void;
    /** 清除特定事件的所有訂閱 */
    clear(event: string): void;
    /** 清除全部訂閱 */
    clearAll(): void;
}
/** 全域單例 */
declare const eventBus: EventBus;

/** WindowManager 事件清單 */
type WinEvent = 'window:opened' | 'window:closed' | 'window:focused' | 'window:minimized' | 'window:maximized' | 'window:restored' | 'window:moved' | 'window:resized';
interface WindowManagerOptions {
    /** 視窗容器，預設為 document.body */
    container?: HTMLElement;
    /** 節流毫秒數，預設 16 */
    throttleMs?: number;
    /**
     * Isolated 模式：視窗改用 position:absolute，限制在容器範圍內。
     * 適合文件頁面的內嵌 demo 區塊，或頁面中的局部桌面。
     * 啟用後容器會自動加上 wos-isolated CSS class。
     */
    isolated?: boolean;
    /**
     * 啟用視窗拖曳時的 Snap 吸附功能，預設 true。
     * 拖曳到容器邊緣或其他視窗邊緣時，自動對齊並顯示藍色 guide 線。
     */
    snap?: boolean;
    /**
     * Snap 吸附感應距離（px），預設 20。
     * 視窗距離吸附目標小於此值時觸發吸附。
     */
    snapThreshold?: number;
}
declare class WindowManager {
    private readonly _wins;
    private _zCounter;
    private _cascadeCount;
    private readonly _container;
    private readonly _throttleMs;
    private readonly _isolated;
    private readonly _snapEnabled;
    private readonly _snapThreshold;
    private _guideV;
    private _guideH;
    readonly events: EventBus;
    constructor(opts?: WindowManagerOptions);
    /**
     * 開啟視窗。若 ID 已存在，恢復並聚焦；否則建立新視窗。
     */
    open(config: WindowConfig): WindowState;
    /**
     * 關閉並銷毀視窗
     */
    close(id: string): void;
    /**
     * 聚焦視窗：置頂 zIndex，設定 isActive
     */
    focus(id: string): void;
    /**
     * 最小化（隱藏 DOM，保留狀態）
     */
    minimize(id: string): void;
    /**
     * 最大化
     */
    maximize(id: string): void;
    /**
     * 還原：
     * - 若視窗是「最大化狀態下被最小化」→ 僅移除最小化，保持最大化
     * - 若只是最大化 → 還原到最大化前的幾何
     * - 若只是最小化 → 還原到原始幾何
     */
    restore(id: string): void;
    /** 取得視窗目前狀態快照（唯讀副本） */
    getState(id: string): Readonly<WindowState> | undefined;
    /** 取得視窗 Body DOM 節點，供外部 Wijmo / jQuery 附加內容 */
    getBodyElement(id: string): HTMLElement | undefined;
    /** 取得所有視窗 ID 清單 */
    getWindowIds(): string[];
    /** 更新視窗標題 */
    setTitle(id: string, title: string): void;
    /** 銷毀所有視窗，清除事件 */
    destroy(): void;
    /** 延遲建立 snap guide 元素（僅需要時才建立） */
    private _ensureGuides;
    /** 根據 SnapResult 顯示 / 隱藏 guide 線 */
    private _updateSnapGuides;
    /** 拖曳結束時隱藏所有 guide 線 */
    private _hideSnapGuides;
    private _deactivateOthers;
    private _focusTopWindow;
}

interface SnapRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface SnapGuide {
    /** 'v' = 垂直線（固定 x），'h' = 水平線（固定 y） */
    axis: 'v' | 'h';
    /** 線在容器座標系的位置（px） */
    pos: number;
}
interface SnapResult {
    x: number;
    y: number;
    guides: SnapGuide[];
}
/**
 * 計算拖曳視窗的吸附位置。
 *
 * @param drag          拖曳中視窗的建議位置與大小
 * @param containerSize 容器的寬高（isolated 用容器；否則用 viewport）
 * @param others        其他非最小化 / 非最大化視窗的位置與大小
 * @param threshold     吸附感應距離（px）
 */
declare function snapPosition(drag: SnapRect, containerSize: {
    width: number;
    height: number;
}, others: SnapRect[], threshold: number): SnapResult;

/** 內建主題名稱 */
type WosThemePreset = 'light' | 'dark';
interface SetThemeOptions {
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
declare function setTheme(preset: WosThemePreset, options?: SetThemeOptions): void;

export { EventBus, WindowManager, eventBus, setTheme, snapPosition };
export type { EventCallback, SetThemeOptions, SlotType, SnapGuide, SnapRect, SnapResult, WinEvent, WindowConfig, WindowState, WosThemePreset };
