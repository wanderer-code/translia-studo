import test from 'node:test';
import assert from 'node:assert/strict';
import { findExactEntries, baseWord } from '../src/dictionary-search.js';

test('groups numbered versions and case variants without including prefix matches', () => {
  const entries = [['be', 'a'], ['be 1', 'b'], ['BE (2)', 'c'], ['be [3]', 'd'], ['been', 'e']];
  assert.deepEqual(findExactEntries(entries, ' Be ').map(([word]) => word), ['be', 'be 1', 'BE (2)', 'be [3]']);
  assert.deepEqual(findExactEntries(entries, 'be 2').map(([word]) => word), ['be', 'be 1', 'BE (2)', 'be [3]']);
  assert.equal(baseWord(' Apple   1 '), 'apple');
});
