import { MDX } from 'js-mdict';
import { mkdir, writeFile } from 'node:fs/promises';

const [, , source, destination = 'public/dictionary'] = process.argv;
if (!source) throw new Error('Usage: node scripts/prepare-dictionary.mjs <dictionary.mdx> [destination]');
const dictionary = new MDX(source);
const buckets = new Map();
let cachedIndex = -1;
let cachedBlock;
const items = [...dictionary.keywordList].sort((a, b) => a.recordStartOffset - b.recordStartOffset);
for (const item of items) {
  const index = dictionary.reduceRecordBlockInfo(item.recordStartOffset);
  const info = dictionary.recordInfoList[index];
  if (index !== cachedIndex) {
    const bytes = dictionary.scanner.readBuffer(dictionary._recordBlockStartOffset + info.packAccumulateOffset, info.packSize);
    cachedBlock = dictionary.decompressBuff(bytes, info.unpackSize);
    cachedIndex = index;
  }
  const start = item.recordStartOffset - info.unpackAccumulatorOffset;
  const end = item.recordEndOffset - info.unpackAccumulatorOffset;
  if (start < 0 || end < start || end > cachedBlock.length) throw new Error(`Record spans a block or has invalid offsets: ${item.keyText}`);
  const definition = dictionary.meta.decoder.decode(cachedBlock.subarray(start, end)).replace(/\0+$/, '');
  const first = item.keyText.trim().toLowerCase()[0] || '';
  const bucket = /^[a-z]$/.test(first) ? first : 'other';
  if (!buckets.has(bucket)) buckets.set(bucket, []);
  buckets.get(bucket).push([item.keyText, definition]);
}
await mkdir(destination, { recursive: true });
for (const [bucket, entries] of buckets) await writeFile(`${destination}/${bucket}.json`, JSON.stringify(entries), 'utf8');
console.log(`Prepared ${items.length} entries in ${buckets.size} local dictionary files.`);
