// ============================================================
// DeskPane — Global Event Bus
// 跨視窗事件系統，允許不同視窗間即時資料聯動
// ============================================================

import { EventCallback } from './types.js';

export class EventBus {
  private readonly _listeners = new Map<string, Set<EventCallback<any>>>();

  /** 訂閱事件 */
  on<T = unknown>(event: string, cb: EventCallback<T>): () => void {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event)!.add(cb as EventCallback<any>);
    // 回傳取消訂閱函式
    return () => this.off(event, cb);
  }

  /** 取消訂閱 */
  off<T = unknown>(event: string, cb: EventCallback<T>): void {
    this._listeners.get(event)?.delete(cb as EventCallback<any>);
  }

  /** 發送事件 */
  emit<T = unknown>(event: string, data?: T): void {
    this._listeners.get(event)?.forEach(cb => {
      try {
        cb(data);
      } catch (e) {
        console.error(`[EventBus] Error in handler for "${event}":`, e);
      }
    });
  }

  /** 清除特定事件的所有訂閱 */
  clear(event: string): void {
    this._listeners.delete(event);
  }

  /** 清除全部訂閱 */
  clearAll(): void {
    this._listeners.clear();
  }
}

/** 全域單例 */
export const eventBus = new EventBus();
