// ============================================================
// WebOS-Desktop — Public Entry Point
// ============================================================

export { Desktop } from './Desktop.js';
export { Dock } from './Dock.js';
export { DesktopIcon } from './DesktopIcon.js';
export { getDesktopCSS } from './styles.js';
export type {
  DesktopConfig,
  DockConfig,
  DockSyncOptions,
  DockSyncWindowEvent,
  DockItemConfig,
  DesktopIconConfig,
  DockPosition,
  WindowManagerLike,
} from './types.js';
