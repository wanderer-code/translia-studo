// Keep original offsets so rendering the sentences never alters document text.
const ABBREVIATIONS = new Set(['mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'jr', 'st', 'vs', 'etc', 'e.g', 'i.e', 'u.s', 'u.k', 'fig', 'no']);

export function splitSentences(text = '') {
  const ranges = [];
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (!'.!?؟'.includes(char)) continue;
    if (char === '.') {
      if (/\d/.test(text[i - 1] || '') && /\d/.test(text[i + 1] || '')) continue;
      if (text[i + 1] === '.') continue;
      const prefix = text.slice(start, i).match(/([\p{L}]+(?:\.[\p{L}]+)*)$/u)?.[1]?.toLowerCase();
      const isInitial = prefix?.length === 1 && /[A-Za-z]/.test(prefix) && !/['’]/.test(text[i - 2] || '');
      if (prefix && (ABBREVIATIONS.has(prefix) || isInitial)) continue;
    }
    let end = i + 1;
    // Word exports sometimes attach a footnote number directly after a period.
    if (char === '.' && !/[0-9۰-۹٠-٩]/.test(text[i - 1] || '')) {
      const footnote = text.slice(end).match(/^[0-9۰-۹٠-٩]{1,2}(?=\s|$)/);
      if (footnote) end += footnote[0].length;
    }
    while (end < text.length && /[.!?؟”’»"')\]]/.test(text[end])) end++;
    if (end < text.length && !/\s/.test(text[end])) continue;
    if (text.slice(start, end).trim()) ranges.push({ start, end, text: text.slice(start, end) });
    start = end;
    i = end - 1;
  }
  if (text.slice(start).trim()) ranges.push({ start, end: text.length, text: text.slice(start) });
  return ranges;
}

export function matchSentence(source, translation, translationIndex) {
  const en = splitSentences(source);
  const fa = splitSentences(translation);
  if (!en.length || !fa[translationIndex]) return null;
  const certain = en.length === fa.length;
  const sourceIndex = certain ? translationIndex : Math.min(en.length - 1, Math.floor(translationIndex * en.length / fa.length));
  return { sourceIndex, translationIndex, certain, sourceCount: en.length, translationCount: fa.length };
}
