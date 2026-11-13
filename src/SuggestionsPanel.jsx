import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Lightbulb, X } from 'lucide-react';
import { matchSentence, splitSentences } from './sentences.js';

const normalize = (text) => text.normalize('NFKC').toLowerCase().trim().replace(/[’‘]/g, "'").replace(/[–—]/g, '-').replace(/^[\s•●▪]+/, '').replace(/^\d{1,2}\s+(?=\p{L})/u, '').replace(/([.!?]['"’”»)]?)\d{1,2}$/u, '$1').replace(/\s+/g, ' ').trim();

// The first paragraph has four source sentences; some styles combine the first
// two or split the third. These ranges were checked against the document.
const FIRST_PARAGRAPH_RANGES = [
  [[0], [1], [2], [3]], [[0], [1], [2], [3]], [[0], [0], [1], [2]],
  [[0], [1], [2], [3]], [[0], [0], [1], [2]], [[0], [0], [1], [2]],
  [[0], [1], [2], [3]], [[0], [0], [1], [2]], [[0], [1], [2, 3], [4]],
  [[0], [1], [2], [3]],
];

export default function SuggestionsPanel({ segment, selectedSentence, onClose }) {
  const [paragraphs, setParagraphs] = useState(null);
  const [error, setError] = useState(false);
  const [width, setWidth] = useState(360);
  const dragCleanup = useRef(null);
  const resultsRef = useRef(null);
  useEffect(() => {
    let active = true;
    fetch(`${import.meta.env.BASE_URL}suggestions/lesson-3.json`)
      .then((response) => { if (!response.ok) throw new Error('Missing suggestions'); return response.json(); })
      .then((data) => { if (active) setParagraphs(data); })
      .catch(() => { if (active) setError(true); });
    return () => { active = false; dragCleanup.current?.(); };
  }, []);

  const match = useMemo(() => {
    if (!paragraphs || !segment || !selectedSentence) return null;
    const selected = selectedSentence.sourceIndex != null ? selectedSentence.sourceIndex : matchSentence(segment.english, segment.editedPersian, selectedSentence.index)?.sourceIndex;
    const sentence = splitSentences(segment.english)[selected];
    if (!sentence) return null;
    const key = normalize(sentence.text);
    const candidates = paragraphs.flatMap((paragraph) => splitSentences(paragraph.english).flatMap((part, index) => normalize(part.text) === key ? [{ paragraph, index, sentence: part.text.trim() }] : []));
    if (candidates.length === 1) return candidates[0];
    const exact = candidates.filter(({ paragraph }) => normalize(paragraph.english) === normalize(segment.english));
    if (exact.length === 1) return exact[0];
    const blockSentences = splitSentences(segment.english).map((part) => normalize(part.text));
    const scored = candidates.map((candidate) => ({ candidate, score: splitSentences(candidate.paragraph.english).filter((part) => blockSentences.includes(normalize(part.text))).length })).sort((a, b) => b.score - a.score);
    return scored.length && scored[0].score > 1 && (scored.length === 1 || scored[0].score > scored[1].score) ? scored[0].candidate : null;
  }, [paragraphs, segment, selectedSentence]);

  useEffect(() => { if (resultsRef.current) resultsRef.current.scrollTop = 0; }, [segment?.id, selectedSentence?.index, selectedSentence?.sourceIndex]);

  const startResize = (event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = width;
    const move = (e) => setWidth(Math.max(280, Math.min(window.innerWidth * 0.7, startWidth + startX - e.clientX)));
    const stop = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', stop); dragCleanup.current = null; };
    dragCleanup.current?.();
    dragCleanup.current = stop;
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
  };

  return <aside className="dictionary-panel suggestions-panel" style={{ width: `min(${width}px, 85vw)` }} aria-label="Translation suggestions">
    <div className="suggestions-resize" onPointerDown={startResize} title="Drag to resize panel" />
    <div className="dictionary-header"><div className="flex items-center gap-2"><Lightbulb size={15}/><strong>Translation suggestions</strong></div>
      <button type="button" onClick={onClose} aria-label="Close translation suggestions" className="dictionary-close"><X size={16}/></button></div>
    <div ref={resultsRef} className="dictionary-results suggestions-results" aria-live="polite">
      {error ? <p className="dictionary-message">Lesson 3 suggestions could not be loaded.</p> : !paragraphs ? <p className="dictionary-message">Loading suggestions…</p> : !segment || !selectedSentence ? <p className="dictionary-message">Select a sentence in either block to see Lesson 3 suggestions.</p> : !match ? <p className="dictionary-message">No matching Lesson 3 sentence found. Select an English sentence from the lesson.</p> : <>
        <div className="suggestions-context"><span>LESSON 3 · PARAGRAPH {match.paragraph.number}</span></div>
        <p className="suggestions-note">Suggestions follow sentence order. Some styles combine or split sentences.</p>
        {match.paragraph.suggestions.map((suggestion, index) => {
          const sourceCount = splitSentences(match.paragraph.english).length;
          const parts = splitSentences(suggestion.text);
          const aligned = sourceCount === parts.length;
          const reviewed = match.paragraph.number === 1 ? FIRST_PARAGRAPH_RANGES[index]?.[match.index] : null;
          const ranges = reviewed || (aligned ? [match.index] : null);
          const combined = reviewed && (reviewed.length > 1 || (parts.length === 3 && match.index < 2));
          const style = suggestion.style.match(/^(.*?)([A-Za-z].*)$/);
          const heading = <div className="suggestion-style"><span lang="fa" dir="rtl">{style ? style[1].trim() : suggestion.style}</span>{style && <span lang="en" dir="ltr">{style[2].trim()}</span>}</div>;
          return <article className="suggestion-card" key={index}>
            {heading}
            {ranges ? <>{combined && <div className="suggestion-scope">Includes combined or split sentences</div>}<p lang="fa" dir="rtl">{ranges.map((part) => parts[part]?.text.trim()).filter(Boolean).join(' ')}</p></> : <details className="suggestion-fallback"><summary>Show full paragraph</summary><p lang="fa" dir="rtl">{suggestion.text}</p></details>}
          </article>;
        })}
        <section className="suggestions-tips" lang="fa" dir="rtl"><h3>نکات ترجمه</h3>{match.paragraph.tips.map((tip, index) => <p key={index}>{tip}</p>)}</section>
      </>}
    </div>
  </aside>;
}
