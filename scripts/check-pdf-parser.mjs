// Run with the original TSX and PDF paths after installing pdfjs-dist@3.11.174.
import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { readFile, mkdir, unlink } from 'node:fs/promises';

if (process.argv.length < 5) throw new Error('Provide original TSX and one or more PDF paths.');
const require = createRequire(import.meta.url);
const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');
global.window = { gsap: {}, pdfjsLib: {
  GlobalWorkerOptions: pdfjs.GlobalWorkerOptions,
  getDocument: (options) => {
    pdfjs.GlobalWorkerOptions.workerSrc = require.resolve('pdfjs-dist/legacy/build/pdf.worker.js');
    return pdfjs.getDocument(options);
  },
} };
await mkdir('node_modules/.cache', { recursive: true });
const paths = ['node_modules/.cache/translia-current.cjs', 'node_modules/.cache/translia-original.cjs'];
try {
  await Promise.all([build({ entryPoints: ['src/App.jsx'], outfile: paths[0], bundle: true, platform: 'node', format: 'cjs', packages: 'external', logLevel: 'silent' }), build({ entryPoints: [process.argv[2]], outfile: paths[1], bundle: true, platform: 'node', format: 'cjs', packages: 'external', logLevel: 'silent' })]);
  const current = require('../' + paths[0]);
  const original = require('../' + paths[1]);
  for (const path of process.argv.slice(3)) {
    const bytes = await readFile(path);
    const file = new File([bytes], path);
    const before = await original.extractCleanParagraphsFromPDF(file);
    const after = await current.extractCleanParagraphsFromPDF(file);
    const equal = JSON.stringify(before) === JSON.stringify(after);
    const pages = after.sourcePages;
    const validPages = pages?.length === after.length && pages.every((page, i) => Number.isInteger(page) && page > 0 && (i === 0 || page >= pages[i - 1]));
    console.log(JSON.stringify({ file: path, originalBlocks: before.length, currentBlocks: after.length, textUnchanged: equal, pageMetadataValid: validPages, lastPage: pages?.at(-1) }));
    if (!equal || !validPages || !after.length) process.exitCode = 1;
  }
} finally { await Promise.all(paths.map((path) => unlink(path).catch(() => {}))); }
