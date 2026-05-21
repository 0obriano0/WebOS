// ============================================================
// WebOS-Core — Core Type Definitions
// ============================================================

/** 視窗內容的渲染策略 */
export type SlotType = 'dom' | 'vue' | 'react';

/** 視窗完整狀態 */
export interface WindowState {
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
  _savedGeometry?: { x: number; y: number; width: number; height: number };
}

/** open() 時傳入的設定（id 與 content 必填） */
export interface WindowConfig {
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
export type EventCallback<T = unknown> = (data: T) => void;
