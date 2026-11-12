import test from 'node:test';
import assert from 'node:assert/strict';
import { findRepeatedPageNumberCandidates } from '../src/parsers.js';

test('finds repeated sequential page numbers while keeping other paragraphs', () => {
  const rows = ['Title', '1', '1', 'Text', '۲', '۲', 'More text', '٣', '٣', '1955'];
  assert.deepEqual(findRepeatedPageNumberCandidates(rows).map(({ index }) => index), [1, 2, 4, 5, 7, 8]);
});

test('does not flag isolated or non-sequential numbers', () => {
  assert.deepEqual(findRepeatedPageNumberCandidates(['1', '1', 'text', '3', '3', 'text', '1955']), []);
  assert.deepEqual(findRepeatedPageNumberCandidates(['1', '1', '2', '2']), []);
});
