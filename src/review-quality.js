const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(str) {
  return String(str).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

function normalizeDigitsToAscii(str) {
  return String(str)
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
}

export function computeWordDiff(rawText, editedText) {
  const rawWords = (rawText || '').trim().split(/\s+/).filter(Boolean);
  const editedWords = (editedText || '').trim().split(/\s+/).filter(Boolean);
  const dp = Array(rawWords.length + 1)
    .fill(null)
    .map(() => Array(editedWords.length + 1).fill(0));

  for (let i = 1; i <= rawWords.length; i++) {
    for (let j = 1; j <= editedWords.length; j++) {
      if (rawWords[i - 1] === editedWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = rawWords.length;
  let j = editedWords.length;
  const tokens = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && rawWords[i - 1] === editedWords[j - 1]) {
      tokens.unshift({ type: 'same', value: rawWords[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      tokens.unshift({ type: 'added', value: editedWords[j - 1] });
      j--;
    } else {
      tokens.unshift({ type: 'removed', value: rawWords[i - 1] });
      i--;
    }
  }
  return tokens;
}

export function runSegmentQA(segment, glossary) {
  const warnings = [];
  const enText = segment.english || '';
  const faText = segment.editedPersian || '';

  const enNumbers = enText.match(/\d+(?:[:.,]\d+)?%?/g) || [];
  const normalizedFa = normalizeDigitsToAscii(faText).replace(/[٬,\s]/g, '').replace(/٫/g, '.').replace(/٪/g, '%').replace(/درصد/g, '%');

  enNumbers.forEach((num) => {
    const cleanNum = num.replace(/,/g, '');
    if (!normalizedFa.includes(cleanNum)) {
      warnings.push({
        id: `qa-num-${segment.id}-${num}`,
        segmentId: segment.id,
        segmentIndex: segment.index,
        type: 'number',
        message: `Missing number or format "${num}" in segment #${segment.index}.`,
        suggestion: toPersianDigits(num),
      });
    }
  });

  glossary.forEach((term) => {
    const regex = new RegExp(`\\b${term.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    const normalizeTerm = (value) => value.normalize('NFKC').replace(/[ًٌٍَُِّْٔ\u200c\u200f]/g, '').replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/\s/g, '');
    const normalizedFaClean = normalizeTerm(faText);
    const termFaClean = normalizeTerm(term.fa);
    if (
      regex.test(enText) &&
      faText.trim().length > 0 &&
      !normalizedFaClean.includes(termFaClean)
    ) {
      warnings.push({
        id: `qa-gloss-${segment.id}-${term.id}`,
        segmentId: segment.id,
        segmentIndex: segment.index,
        type: 'glossary',
        message: `Term "${term.en}" expects "${term.fa}"`,
        suggestion: term.fa,
      });
    }
  });

  return warnings;
}

