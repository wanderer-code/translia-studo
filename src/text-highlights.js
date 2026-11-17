import { useEffect, useRef } from 'react';

const activeRanges = new Map();
function refreshMarks() {
  if (!globalThis.CSS?.highlights || !globalThis.Highlight) return;
  const ranges = [...activeRanges.values()].flat();
  if (ranges.length) globalThis.CSS.highlights.set('saved-text-marks', new Highlight(...ranges));
  else globalThis.CSS.highlights.delete('saved-text-marks');
}

export function mergeLineRects(rects) {
  const sorted = rects.filter((rect) => rect.width > 0 && rect.height > 0)
    .map(({ left, right, top, bottom }) => ({ left, right, top, bottom }))
    .sort((a, b) => a.top - b.top || a.left - b.left);
  const merged = [];
  for (const rect of sorted) {
    const previous = merged[merged.length - 1];
    if (previous && Math.abs(previous.top - rect.top) < 2 && Math.abs(previous.bottom - rect.bottom) < 2 && rect.left <= previous.right + 4) {
      previous.right = Math.max(previous.right, rect.right);
    } else merged.push(rect);
  }
  return merged;
}

export function updateMarksForEdit(marks = [], before, after) {
  if (before === after) return marks;
  let prefix = 0;
  while (prefix < before.length && prefix < after.length && before[prefix] === after[prefix]) prefix++;
  let suffix = 0;
  while (suffix < before.length - prefix && suffix < after.length - prefix && before[before.length - 1 - suffix] === after[after.length - 1 - suffix]) suffix++;
  const oldEnd = before.length - suffix;
  const delta = after.length - before.length;
  return marks.flatMap((mark) => {
    if (mark.end <= prefix) return [mark];
    if (mark.start >= oldEnd) return [{ ...mark, start: mark.start + delta, end: mark.end + delta }];
    return [];
  });
}

export function useTextMarks(rootRef, text, marks, dependencies = []) {
  const key = useRef(Symbol());
  useEffect(() => {
    const root = rootRef.current?.querySelector('.highlight-editor-mirror') || rootRef.current;
    if (!root || !globalThis.CSS?.highlights || !globalThis.Highlight || root.textContent !== text) {
      activeRanges.delete(key.current); refreshMarks(); return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let position = 0, node;
    while ((node = walker.nextNode())) { nodes.push({ node, start: position, end: position + node.length }); position += node.length; }
    const ranges = [];
    for (const mark of marks || []) {
      if (mark.start < 0 || mark.end > text.length || mark.start >= mark.end || text.slice(mark.start, mark.end) !== mark.text) continue;
      const first = nodes.find((n) => mark.start >= n.start && mark.start < n.end);
      const last = nodes.find((n) => mark.end > n.start && mark.end <= n.end);
      if (!first || !last) continue;
      const range = document.createRange();
      range.setStart(first.node, mark.start - first.start); range.setEnd(last.node, mark.end - last.start); ranges.push(range);
    }
    activeRanges.set(key.current, ranges); refreshMarks();
    const container = rootRef.current;
    const layer = document.createElement('div');
    layer.className = 'saved-mark-layer';
    layer.setAttribute('aria-hidden', 'true');
    container.appendChild(layer);
    const draw = () => {
      const bounds = container.getBoundingClientRect();
      const boxes = ranges.flatMap((range) => mergeLineRects([...range.getClientRects()]));
      layer.replaceChildren(...boxes.map((box) => {
        const mark = document.createElement('span');
        mark.className = 'saved-mark-box';
        mark.style.left = `${box.left - bounds.left - 2}px`;
        mark.style.top = `${box.top - bounds.top}px`;
        mark.style.width = `${box.right - box.left + 4}px`;
        mark.style.height = `${box.bottom - box.top}px`;
        return mark;
      }));
    };
    draw();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(draw);
    observer?.observe(container);
    window.addEventListener('resize', draw);
    document.fonts?.addEventListener('loadingdone', draw);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', draw);
      document.fonts?.removeEventListener('loadingdone', draw);
      layer.remove();
      activeRanges.delete(key.current); refreshMarks();
    };
  }, [rootRef, text, marks, ...dependencies]);
}

export function captureTextSelection(root, text) {
  const active = document.activeElement;
  if (active instanceof HTMLTextAreaElement && root.contains(active)) {
    const start = active.selectionStart, end = active.selectionEnd;
    return start < end ? { start, end, text: text.slice(start, end) } : null;
  }
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || !selection.rangeCount) return null;
  const range = selection.getRangeAt(0);
  if (!root.contains(range.startContainer) || !root.contains(range.endContainer) || root.textContent !== text) return null;
  const prefix = range.cloneRange(); prefix.selectNodeContents(root); prefix.setEnd(range.startContainer, range.startOffset);
  const start = prefix.toString().length, end = start + range.toString().length;
  return start < end ? { start, end, text: text.slice(start, end) } : null;
}
