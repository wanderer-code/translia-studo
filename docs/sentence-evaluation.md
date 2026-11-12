# Sentence matching evaluation

The evaluation used the supplied Lesson 2 and Lesson 3 PDFs and Persian DOCX files. The PDFs and Word files were extracted independently, and the sentence matcher was run on the app's pre-aligned paragraph datasets. For a coarse check that those datasets correspond to the references, the evaluation searched for the first 60 normalized characters of each paragraph in the extracted source text.

| Lesson | Aligned paragraphs | Equal detected sentence counts | Different counts | English prefixes found | Persian prefixes found |
| --- | ---: | ---: | ---: | ---: | ---: |
| 2 | 37 | 37 | 0 | 37 | 37 |
| 3 | 49 | 46 | 3 | 49 | 47 |

Lesson 3 segments 17, 19, and 39 have different detected sentence counts and are marked as estimated in the interface. The simple Persian prefix check did not find segments 20 and 43 exactly in the extracted DOCX text; this does not establish that the content is absent, since the comparison is sensitive to extraction and document differences.

Separately, running the existing PDF parser on the original PDFs produced 39 blocks for Lesson 2 and 56 for Lesson 3, versus 37 and 49 blocks in the pre-aligned samples. The parser's extracted text was unchanged by the page-metadata modification. Imported files therefore need alignment review; matching paragraph counts cannot be assumed. The import preview displays the extracted count before replacing a column.

Equal sentence counts do **not** establish that sentences have the same meaning or order. No human-annotated sentence alignment ground truth was supplied, so these figures are not an accuracy score. The matcher pairs by position, and the user should review the highlighted pair, especially when sentences have been combined, split, or reordered.

On this machine, 100 repeated passes over each complete embedded lesson averaged approximately 9 ms for Lesson 2 and 8 ms for Lesson 3. These are local JavaScript segmentation measurements, not end-to-end browser latency or a guarantee for other machines and document sizes.

To rerun the comparison, install Python's `pypdf` and pass the four input paths in this order:

```text
node scripts/evaluate-sentences.mjs <lesson2.pdf> <lesson2.docx> <lesson3.pdf> <lesson3.docx>
```

## Word page-number comparison

The two supplied DOCX files contain repeated standalone page-number pairs. The import now offers to exclude these candidates, with the user choosing whether to keep them. An independent XML extraction followed by the same candidate detector and cleanup found:

| Lesson | Nonempty Word paragraphs | Candidate page-number paragraphs | Remaining | Remaining paragraphs matching saved Persian at the same row after normalization |
| --- | ---: | ---: | ---: | ---: |
| 2 | 53 | 16 | 37 | 37 / 37 |
| 3 | 69 | 20 | 49 | 49 / 49 |

The comparison normalized Unicode and ignored non-letter and non-number characters. It does not prove identical formatting or exact punctuation. The PDF block discrepancies remain unresolved, and imported columns are still paired by position. Matching counts do not establish cross-language semantic alignment.
