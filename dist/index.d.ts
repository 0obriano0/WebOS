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
}
declare class WindowManager {
    private readonly _wins;
    private _zCounter;
    private _cascadeCount;
    private readonly _container;
    private readonly _throttleMs;
    private readonly _isolated;
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
    private _deactivateOthers;
    private _focusTopWindow;
}

export { EventBus, WindowManager, eventBus };
export type { EventCallback, SlotType, WinEvent, WindowConfig, WindowState };
