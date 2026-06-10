// ============================================================
// DeskPane — Runtime CSS injection helpers
// ============================================================

export interface InjectStyleOptions {
  id: string;
  css: string;
  hrefPart: string;
  fingerprint: string;
}

function isDeskPaneStyleNode(node: Element): boolean {
  if (node instanceof HTMLStyleElement) {
    if (node.dataset.dpStyle === 'true') return true;
    if (node.id.startsWith('dp-') && node.id.endsWith('-styles')) return true;
  }

  if (node instanceof HTMLLinkElement) {
    const href = node.getAttribute('href') ?? '';
    return href.includes('/deskpane') || href.includes('\\deskpane') || href.includes('deskpane');
  }

  return false;
}

function hasManualStyleLoaded(options: InjectStyleOptions): boolean {
  const hrefPart = options.hrefPart.toLowerCase();

  for (const node of Array.from(document.querySelectorAll('style,link[rel~="stylesheet"]'))) {
    if (node instanceof HTMLStyleElement) {
      if (node.id === options.id) return true;
      if (node.textContent?.includes(options.fingerprint)) return true;
      continue;
    }

    if (node instanceof HTMLLinkElement) {
      const href = (node.getAttribute('href') ?? '').toLowerCase();
      if (href.includes(hrefPart)) return true;
    }
  }

  return false;
}

function findInsertionAnchor(): Element | null {
  const styleNodes = Array.from(document.head.querySelectorAll('style,link[rel~="stylesheet"]'));
  return styleNodes.find(node => !isDeskPaneStyleNode(node)) ?? null;
}

/**
 * Injects DeskPane runtime CSS only when the same stylesheet is not already
 * present. Runtime CSS is inserted before app-level stylesheets so project
 * overrides imported later remain authoritative.
 */
export function injectRuntimeCSS(options: InjectStyleOptions): void {
  if (hasManualStyleLoaded(options)) return;

  const style = document.createElement('style');
  style.id = options.id;
  style.dataset.dpStyle = 'true';
  style.textContent = options.css;

  const anchor = findInsertionAnchor();
  document.head.insertBefore(style, anchor);
}
