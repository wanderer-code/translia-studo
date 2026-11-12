import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { Packer } from 'docx';
import { createPersianDocument } from '../src/word-export.js';

test('exports a real Word archive containing right-to-left Persian text', async () => {
  const buffer = await Packer.toBuffer(createPersianDocument([{ editedPersian: 'سلام <جهان> & دوست' }]));
  assert.equal(buffer.subarray(0, 2).toString(), 'PK');
  const inspection = spawnSync('python', ['-c', 'import io,sys,zipfile; z=zipfile.ZipFile(io.BytesIO(sys.stdin.buffer.read())); sys.stdout.buffer.write(z.read("word/document.xml"))'], { input: buffer, encoding: 'utf8' });
  assert.equal(inspection.status, 0, inspection.stderr);
  assert.match(inspection.stdout, /سلام &lt;جهان&gt; &amp; دوست/);
  assert.match(inspection.stdout, /<w:bidi\b/);
});
