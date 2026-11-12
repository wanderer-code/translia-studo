import { useEffect, useRef } from 'react';

const activeRanges = new Map();
function refreshMarks() {
  if (!globalThis.CSS?.highlights || !globalThis.Highlight) return;
  const ranges = [...activeRanges.values()].flat();
  if (ranges.length) globalThis.CSS.highlights.set('saved-text-marks', new Highlight(...ranges));
  else globalThis.CSS.highlights.delete('saved-text-marks');
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
    return () => { activeRanges.delete(key.current); refreshMarks(); };
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
