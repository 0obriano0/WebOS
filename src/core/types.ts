// ============================================================
// DeskPane — Core Type Definitions
// ============================================================

/** 視窗內容的渲染策略 */
export type SlotType = 'dom' | 'vue' | 'react';

/** 視窗完整狀態 */
export interface WindowState {
  id: string;
  title: string;
  /** 視窗圖示：emoji 字元或圖片 URL，供 Dock 同步使用 */
  icon?: string;
  /**
   * Dock / 工具列顯示用的短標籤。
   * 有值時 Dock 優先顯示此欄位，否則 fallback 到 title。
   */
  label?: string;
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
  /**
   * 允許使用者調整視窗大小（拖曳邊框 + 最大化按鈕）。
   * 預設 true。設為 false 時邊框不可拖曳、最大化按鈕 disabled。
   */
  resizable: boolean;
  /**
   * 父視窗 ID。設定後此視窗成為子視窗，不在 Dock 獨立顯示。
   * 子視窗隨父視窗最小化 / restore，z-index 永遠高於父視窗。
   */
  parentId?: string;
  /**
   * 獨佔模式（Modal）。需同時設定 parentId。
   * true = 父視窗加上半透明遮罩，必須先關閉此子視窗才能操作父視窗。
   * 預設 false。
   */
  modal: boolean;
  /** 傳遞給內部組件的初始參數 */
  props?: Record<string, unknown>;
  /** 最大化 / 最小化前的幾何快照，用於 restore */
  _savedGeometry?: { x: number; y: number; width: number; height: number };
}

/** open() 時傳入的設定（id 與 content 必填） */
export interface WindowConfig {
  id: string;
  title: string;
  /** 視窗圖示：emoji 字元或圖片 URL，供 Dock 自動同步使用 */
  icon?: string;
  /**
   * Dock / 工具列顯示用的短標籤。
   * 有值時 Dock 優先顯示此欄位，否則 fallback 到 title。
   */
  label?: string;
  slotType?: SlotType;
  content: any;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  props?: Record<string, unknown>;
  /**
   * 允許使用者調整視窗大小（拖曳邊框 + 最大化按鈕）。
   * 預設 true。設為 false 時邊框不可拖曳、最大化按鈕 disabled。
   */
  resizable?: boolean;
  /**
   * 父視窗 ID。設定後此視窗成為子視窗，不在 Dock 獨立顯示。
   * 子視窗隨父視窗最小化 / restore，z-index 永遠高於父視窗。
   */
  parentId?: string;
  /**
   * 獨佔模式（Modal）。需同時設定 parentId。
   * true = 父視窗加上半透明遮罩，必須先關閉此子視窗才能操作父視窗。
   * 預設 false。
   */
  modal?: boolean;
}

/** 事件巴士回呼型別 */
export type EventCallback<T = unknown> = (data: T) => void;
