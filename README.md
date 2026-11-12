# Translia EN → FA Studio

A bilingual English to Persian translation review workspace. The app keeps English source blocks and Persian translation blocks aligned while providing document import, glossary support, review comments, and quality checks.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

On Windows, the translator icon in the top toolbar opens ChatGPT, DeepL, Google Translate, and Abadis in a separate Chrome incognito window. The launcher runs as part of the local Vite server (`npm run dev` or `npm run preview`), uses fixed website addresses, and requires Chrome in a standard installation folder. This feature is unavailable when the built files are hosted without that local server.

## Included lessons

- Lesson 2: *Don't be a sucker* — Prisoner's Dilemma (37 aligned segments)
- Lesson 3: *Sometimes it's better to be chicken* — Game of Chicken (49 aligned segments)

The parsers are in `src/parsers.js`, saved lessons in `src/lesson-data.js`, and review checks in `src/review-quality.js`. The PDF and DOCX upload parsers load their browser-side libraries on demand. The remaining application state and interface are in `src/App.jsx`.

## Reviewing

- Use **+ Project** to create a separate workspace. Lesson and project changes are saved in this browser. **Backup** downloads all projects as JSON; **Restore** imports that backup.
- Set each segment to Unreviewed, In progress, Needs attention, or Approved. The progress indicator counts approved segments.
- Select text in an English or Persian block, then click the highlighter icon in that block's toolbar. Use the eraser icon to remove that block's text highlights. Highlights are saved with the project; editing inside a marked passage removes that mark.
- Enable **Sentence highlight** and place the caret in a Persian sentence to highlight the English sentence at the corresponding position. You can edit the Persian text while highlighting is enabled. Matching is based on sentence order and can be wrong when a translation combines or rearranges sentences.
- Use the review filter to find a status or active QA warnings. Alt+Up and Alt+Down navigate between visible segments. Warnings can be dismissed with a reason and restored later.
- Word imports can identify repeated sequences of duplicated standalone page numbers and ask whether to exclude them; choosing Cancel keeps them. Import previews show extracted block counts before replacing a column. Blocks are still paired by position and may need alignment review. Export produces a Persian `.docx`; paragraph content is retained, but original document formatting is not preserved.
- For projects with at least 100 rows, supported browsers automatically defer rendering offscreen rows. Large-book performance has not been benchmarked.

Run the checks with `npm test` (the Word archive check uses Python's standard library). See [the sentence evaluation](docs/sentence-evaluation.md) for the lesson comparison and its limitations.

## Dictionary

Open **Dictionary** from the left rail to search English headwords and read Persian meanings. Numbered variants are grouped with their base word. Search runs locally after preparation; no dictionary query is sent to a service.

The converted dictionary is personal data and is excluded from Git. If the prepared data is not present, generate it from your own MDX file:

```bash
node scripts/prepare-dictionary.mjs "path/to/Aryanpour Dictionary.mdx"
```

This creates the local files in `public/dictionary/`. The MDX file is not uploaded. Dictionary entries are displayed as text; external images, audio and dictionary-specific styling are not included.
