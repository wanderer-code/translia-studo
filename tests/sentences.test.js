import test from 'node:test';
import assert from 'node:assert/strict';
import { splitSentences, matchSentence } from '../src/sentences.js';

test('splits English and Persian sentence endings without splitting decimals or titles', () => {
  const english = 'Dr. Smith paid 1.5 dollars. Did he win? Yes!';
  const persian = 'دکتر اسمیت ۱٫۵ دلار پرداخت کرد. آیا او برد؟ بله!';
  assert.deepEqual(splitSentences(english).map((s) => s.text.trim()), ['Dr. Smith paid 1.5 dollars.', 'Did he win?', 'Yes!']);
  assert.deepEqual(splitSentences(persian).map((s) => s.text.trim()), ['دکتر اسمیت ۱٫۵ دلار پرداخت کرد.', 'آیا او برد؟', 'بله!']);
  assert.equal(splitSentences(english).map((s) => s.text).join(''), english);
});

test('labels unequal sentence counts as estimated and handles missing sides', () => {
  assert.deepEqual(matchSentence('One. Two.', 'یک. دو.', 1), { sourceIndex: 1, translationIndex: 1, certain: true, sourceCount: 2, translationCount: 2 });
  assert.equal(matchSentence('One. Two.', 'یک جمله.', 0).certain, false);
  assert.equal(matchSentence('', 'یک جمله.', 0), null);
});

test('ends sentences after contractions', () => {
  assert.equal(splitSentences("It wasn't. The lesson is simple.").length, 2);
});

test('keeps attached footnote markers at the end of the preceding sentence', () => {
  assert.deepEqual(splitSentences('جمله تمام شد.۱۲ جمله بعدی آمد.').map((s) => s.text.trim()), ['جمله تمام شد.۱۲', 'جمله بعدی آمد.']);
});
