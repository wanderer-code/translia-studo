import React, { useEffect, useMemo, useState } from 'react';
import { BookText, Search, X } from 'lucide-react';
import { normalize, baseWord, findExactEntries } from './dictionary-search.js';

const buckets = new Map();

async function loadBucket(word) {
  const first = normalize(word)[0] || '';
  const bucket = /^[a-z]$/.test(first) ? first : 'other';
  if (!buckets.has(bucket)) {
    const promise = fetch(`${import.meta.env.BASE_URL}dictionary/${bucket}.json`).then((response) => {
      if (!response.ok) throw new Error('Dictionary files are missing');
      return response.json();
    }).catch((error) => { buckets.delete(bucket); throw error; });
    buckets.set(bucket, promise);
  }
  return buckets.get(bucket);
}

function parseDefinition(html) {
  const safe = html.replace(/<\s*(?:link|img|iframe|object|embed)\b[^>]*>/gi, '')
    .replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '');
  const doc = new DOMParser().parseFromString(safe, 'text/html');
  const nodes = [...doc.body.querySelectorAll('.entry, .phonetic, .pos, .def, .enex, .faex, .phrase, .phrasedef')];
  if (nodes.length) return nodes.map((node) => ({ kind: node.className.split(/\s+/)[0], text: (node.textContent || '').trim() })).filter((item) => item.text);
  const text = (doc.body.textContent || '').trim();
  return text ? [{ kind: 'def', text }] : [];
}

function DictionaryEntry({ entry }) {
  const lines = useMemo(() => parseDefinition(entry[1]), [entry]);
  return <article className="dictionary-entry">
    <h3 className="dictionary-headword" dir="ltr">{entry[0]}</h3>
    {lines.filter((line) => line.kind !== 'entry').map((line, i) => {
      const persian = ['def', 'faex', 'phrasedef'].includes(line.kind);
      return <p key={i} className={`dictionary-${line.kind}`} dir={persian ? 'rtl' : 'ltr'}>{line.text}</p>;
    })}
  </article>;
}

export default function DictionaryPanel({ onClose }) {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const trimmed = normalize(query);
  useEffect(() => {
    let active = true;
    if (!trimmed) { setEntries([]); setLoading(false); setError(''); return () => { active = false; }; }
    setLoading(true);
    setError('');
    const timer = setTimeout(async () => {
      try {
        const result = await loadBucket(trimmed);
        if (active) setEntries(result);
      } catch {
        if (active) { setEntries([]); setError('Dictionary data is unavailable. Prepare it from your MDX file using the instructions in the README.'); }
      } finally { if (active) setLoading(false); }
    }, 120);
    return () => { active = false; clearTimeout(timer); };
  }, [trimmed]);

  const matches = useMemo(() => {
    if (!trimmed || loading) return [];
    return findExactEntries(entries, trimmed);
  }, [entries, trimmed, loading]);
  const suggestions = useMemo(() => {
    if (!trimmed || loading || matches.length) return [];
    const seen = new Set();
    return entries.filter(([word]) => {
      const key = baseWord(word);
      if (!key.startsWith(trimmed) || seen.has(key)) return false;
      seen.add(key); return true;
    }).slice(0, 30);
  }, [entries, trimmed, loading, matches.length]);

  return <aside className="dictionary-panel" aria-label="English to Persian dictionary">
    <div className="dictionary-header"><div className="flex items-center gap-2"><BookText size={15}/><strong>Dictionary</strong></div>
      <button type="button" onClick={onClose} aria-label="Close dictionary" className="dictionary-close"><X size={16}/></button></div>
    <div className="dictionary-search"><label htmlFor="dictionary-query">English to Persian</label><div className="dictionary-search-box"><Search size={15}/>
      <input id="dictionary-query" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search an English word..." autoComplete="off" /></div></div>
    <div className="dictionary-results" aria-live="polite">
      {!trimmed && <p className="dictionary-message">Enter an English word to see its Persian meanings.</p>}
      {loading && <p className="dictionary-message">Searching dictionary...</p>}
      {error && <p className="dictionary-message">{error}</p>}
      {!loading && !error && trimmed && !matches.length && !suggestions.length && <p className="dictionary-message">No matching entries found.</p>}
      {matches.map((entry, index) => <DictionaryEntry key={`${entry[0]}-${index}`} entry={entry} />)}
      {!!suggestions.length && <><p className="dictionary-message">Related headwords</p>{suggestions.map(([word]) => <button type="button" className="dictionary-suggestion" key={word} onClick={() => setQuery(baseWord(word))}>{word}</button>)}</>}
    </div>
  </aside>;
}
