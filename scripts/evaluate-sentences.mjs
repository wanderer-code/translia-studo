import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { mkdirSync, unlinkSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { splitSentences } from '../src/sentences.js';

if (process.argv.length !== 6) throw new Error('Provide PDF2 DOCX2 PDF3 DOCX3 paths.');
const extracted = spawnSync('python', ['scripts/extract-lesson-files.py', ...process.argv.slice(2)], { encoding: 'utf8', maxBuffer: 10_000_000 });
if (extracted.status !== 0) throw new Error(extracted.stderr);
const files = JSON.parse(extracted.stdout);
mkdirSync('node_modules/.cache', { recursive: true });
const output = 'node_modules/.cache/translia-datasets.cjs';
await build({ entryPoints: ['src/App.jsx'], outfile: output, bundle: true, platform: 'node', format: 'cjs', packages: 'external', logLevel: 'silent' });
const require = createRequire(import.meta.url);
const { LESSON_2_SEGMENTS, LESSON_3_SEGMENTS } = require('../' + output);
unlinkSync(output);
for (const [index, segments] of [LESSON_2_SEGMENTS, LESSON_3_SEGMENTS].entries()) {
  const counts = segments.map((s) => [splitSentences(s.english).length, splitSentences(s.editedPersian).length]);
  const matching = counts.filter(([en, fa]) => en === fa && en > 0).length;
  const start = performance.now();
  for (let n = 0; n < 100; n++) for (const segment of segments) { splitSentences(segment.english); splitSentences(segment.editedPersian); }
  const milliseconds = (performance.now() - start) / 100;
  const reference = files[index];
  const normalize = (text) => text.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  const sourceText = normalize(reference.english), targetText = normalize(reference.persian);
  const sourceSnippetsFound = segments.filter((s) => sourceText.includes(normalize(s.english).slice(0, 60))).length;
  const targetMissingSegments = segments.flatMap((s, i) => targetText.includes(normalize(s.rawPersian).slice(0, 60)) ? [] : [i + 1]);
  const targetSnippetsFound = segments.length - targetMissingSegments.length;
  console.log(JSON.stringify({ lesson: index + 2, pdfPages: reference.pages, pdfCharacters: reference.english.length, docxCharacters: reference.persian.length, alignedParagraphs: segments.length, sourceSnippetsFound, targetSnippetsFound, targetMissingSegments, equalSentenceCounts: matching, differentSentenceCounts: segments.length - matching, millisecondsPerFullLesson: +milliseconds.toFixed(2), mismatchSegments: counts.flatMap(([en, fa], i) => en !== fa ? [{ segment: i + 1, english: en, persian: fa }] : []) }));
}
