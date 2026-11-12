export const normalize = (value) => value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('en');
export const baseWord = (value) => normalize(value).replace(/\s*(?:\(\s*\d+\s*\)|\[\s*\d+\s*\]|\s+\d+)$/, '').trim();
export const findExactEntries = (entries, query) => entries.filter(([word]) => baseWord(word) === baseWord(query));
