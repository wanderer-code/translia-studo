"""Import a two-column PDF dictionary into a reviewable SQLite database.

The PDF uses a two-column layout with mixed English and Persian typography. This
The importer archives the source PDF and every page's extractable text, then
segments candidate entries by page and column while retaining source bounds.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sqlite3
from pathlib import Path

import pdfplumber


SCHEMA = """
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS source_pages (
    page_number INTEGER PRIMARY KEY,
    extracted_text TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS source_documents (
    id INTEGER PRIMARY KEY,
    filename TEXT NOT NULL,
    page_count INTEGER NOT NULL,
    sha256 TEXT NOT NULL,
    pdf_bytes BLOB NOT NULL
);
CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY,
    headword TEXT NOT NULL,
    homograph_number INTEGER,
    part_of_speech TEXT,
    grammar_notes TEXT,
    source_page INTEGER NOT NULL REFERENCES source_pages(page_number),
    source_order INTEGER NOT NULL,
    source_bbox_json TEXT NOT NULL,
    raw_text TEXT NOT NULL,
    extraction_status TEXT NOT NULL DEFAULT 'needs_review'
);
CREATE TABLE IF NOT EXISTS pronunciations (
    id INTEGER PRIMARY KEY,
    entry_id INTEGER NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    pronunciation TEXT NOT NULL,
    region_or_variant TEXT
);
CREATE TABLE IF NOT EXISTS forms (
    id INTEGER PRIMARY KEY,
    entry_id INTEGER NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    form_type TEXT NOT NULL,
    form_text TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS senses (
    id INTEGER PRIMARY KEY,
    entry_id INTEGER NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    sense_number INTEGER,
    meaning_fa TEXT,
    definition_en TEXT,
    usage_notes TEXT
);
CREATE TABLE IF NOT EXISTS examples (
    id INTEGER PRIMARY KEY,
    sense_id INTEGER REFERENCES senses(id) ON DELETE CASCADE,
    entry_id INTEGER NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    english_text TEXT,
    persian_text TEXT,
    example_type TEXT
);
CREATE TABLE IF NOT EXISTS entry_relations (
    id INTEGER PRIMARY KEY,
    entry_id INTEGER NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    related_headword TEXT NOT NULL,
    relation_type TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS labels (
    id INTEGER PRIMARY KEY,
    entry_id INTEGER NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    label_type TEXT NOT NULL,
    label_text TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS reference_notes (
    id INTEGER PRIMARY KEY,
    page_number INTEGER NOT NULL REFERENCES source_pages(page_number),
    note_type TEXT NOT NULL,
    content TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS metadata (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);
"""


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", type=Path, help="source PDF dictionary")
    parser.add_argument(
        "database", type=Path,
        nargs="?",
        default=Path("public/dictionary/hezare-a.sqlite"),
        help="SQLite output path (default: public/dictionary/hezare-a.sqlite)",
    )
    args = parser.parse_args()
    if not args.pdf.is_file():
        parser.error(f"PDF not found: {args.pdf}")

    args.database.parent.mkdir(parents=True, exist_ok=True)
    source_bytes = args.pdf.read_bytes()
    with pdfplumber.open(args.pdf) as pdf, sqlite3.connect(args.database) as db:
        db.executescript(SCHEMA)
        db.execute("DELETE FROM entries")
        db.execute("DELETE FROM source_pages")
        db.execute("DELETE FROM source_documents")
        db.execute(
            "INSERT INTO source_documents(filename, page_count, sha256, pdf_bytes) VALUES (?, ?, ?, ?)",
            (args.pdf.name, len(pdf.pages), hashlib.sha256(source_bytes).hexdigest(), source_bytes),
        )
        for page_number, page in enumerate(pdf.pages, start=1):
            db.execute(
                "INSERT INTO source_pages(page_number, extracted_text) VALUES (?, ?)",
                (page_number, page.extract_text(layout=False) or ""),
            )

        # Find bold headword starts in each of the two printed columns, then
        # preserve each block with its page and bounding box. Do not guess at
        # Persian meanings: this PDF's embedded font map corrupts some text.
        source_order = 0
        inserted_entries = 0
        for page_number, page in enumerate(pdf.pages, start=1):
            words = page.extract_words(extra_attrs=["fontname", "size"])
            body_words = [
                w for w in words
                if 35 <= w["top"] <= page.height - 34 and w["size"] >= 6
            ]
            left_starts = [w["x0"] for w in body_words if w["x0"] < 90]
            right_starts = [
                w["x0"] for w in body_words
                if page.width * 0.44 < w["x0"] < page.width * 0.64
            ]
            columns = [
                ("left", 0, page.width * 0.49, min(left_starts, default=0)),
                ("right", page.width * 0.49, page.width, min(right_starts, default=page.width)),
            ]
            for column_name, x0, x1, start_x in columns:
                if column_name == "left" and left_starts:
                    start_x = min(left_starts)
                elif column_name == "right" and right_starts:
                    start_x = min(right_starts)
                anchors = []
                for word in words:
                    if (
                        word["top"] < 35
                        or word["top"] > page.height - 34
                        or word["size"] < 7
                        or abs(word["x0"] - start_x) > 12
                        or not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9'.,:/()!?-]*", word["text"])
                    ):
                        continue
                    has_pronunciation = any(
                        "/" in nearby["text"]
                        and nearby["x0"] > word["x1"]
                        and nearby["x0"] < x1
                        and abs(nearby["top"] - word["top"]) <= 18
                        for nearby in words
                    )
                    if "Bold" not in word["fontname"] and not has_pronunciation and "/" not in word["text"]:
                        continue
                    # Merge adjacent bold tokens from the same line, which
                    # covers multi-word headwords such as "from A to B".
                    line_words = [
                        w for w in words
                        if abs(w["top"] - word["top"]) <= 2.5
                        and x0 <= w["x0"] < min(x1, word["x0"] + 85)
                        and (w is word or "Bold" in w["fontname"] or (w["size"] <= 7 and w["text"].isdigit()))
                    ]
                    line_words.sort(key=lambda w: w["x0"])
                    phrase_parts = []
                    previous_x1 = None
                    for token in line_words:
                        if previous_x1 is not None and token["x0"] - previous_x1 > 5:
                            break
                        phrase_parts.append(token["text"])
                        previous_x1 = token["x1"]
                    headword = " ".join(phrase_parts).strip()
                    pronunciation_parts = []
                    if "/" in word["text"] and word["text"].find("/") > 0:
                        pronunciation_parts.append(word["text"][word["text"].find("/"):])
                    for token in words:
                        if (
                            "/" in token["text"]
                            and token["x0"] > word["x1"]
                            and token["x0"] < x1 - 20
                            and abs(token["top"] - word["top"]) <= 4.5
                        ):
                            pronunciation_parts.append(token["text"][token["text"].find("/"):])
                    pronunciation = " ".join(pronunciation_parts).strip()
                    headword = headword.split("/", 1)[0].strip()
                    headword = re.sub(r"(?<=[a-z])(?=[A-Z])", " ", headword)
                    headword = re.sub(r"\bA (\d)\b", r"A\1", headword)
                    headword = re.sub(r"\bfrom Ato B\b", "from A to B", headword)
                    if headword:
                        anchors.append((word["top"], word["x0"], headword, pronunciation))

                # A headword can have more than one bold token at the same
                # baseline. Keep the leftmost candidate only.
                anchors.sort(key=lambda a: (a[0], a[1]))
                unique = []
                for anchor in anchors:
                    if unique and abs(anchor[0] - unique[-1][0]) < 2:
                        if anchor[1] < unique[-1][1]:
                            unique[-1] = anchor
                    else:
                        unique.append(anchor)

                for index, (top, left, headword, pronunciation) in enumerate(unique):
                    bottom = unique[index + 1][0] - 2.5 if index + 1 < len(unique) else page.height - 34
                    if bottom <= top:
                        continue
                    source_order += 1
                    crop = page.crop((x0, top, x1, bottom))
                    raw_text = (crop.extract_text(layout=False) or "").strip()
                    if not raw_text:
                        source_order -= 1
                        continue
                    bbox = [round(x0, 2), round(top, 2), round(x1, 2), round(bottom, 2)]
                    db.execute(
                        """INSERT INTO entries(
                               headword, source_page, source_order, source_bbox_json,
                               raw_text, extraction_status
                           ) VALUES (?, ?, ?, ?, ?, 'needs_review')""",
                        (headword, page_number, source_order,
                         json.dumps({"column": column_name, "bounds": bbox}), raw_text),
                    )
                    inserted_entries += 1
                    entry_id = db.execute("SELECT last_insert_rowid()").fetchone()[0]
                    if pronunciation:
                        db.execute(
                            "INSERT INTO pronunciations(entry_id, pronunciation) VALUES (?, ?)",
                            (entry_id, pronunciation),
                        )
                    pos_codes = {"n", "npl", "v", "vt", "vi", "adj", "adv", "prep", "conj", "pron", "det", "int", "aux", "art", "num"}
                    pos_words = [
                        w for w in words
                        if w["text"].strip(".,;:").lower() in pos_codes
                        and w["x0"] >= x1 - 18
                        and top - 2 <= w["top"] <= min(bottom, top + 5)
                    ]
                    if pos_words:
                        pos_word = min(pos_words, key=lambda w: abs(w["top"] - top))
                        db.execute(
                            "UPDATE entries SET part_of_speech = ? WHERE id = ?",
                            (pos_word["text"].strip(".,;:"), entry_id),
                        )

        db.executemany(
            "INSERT OR REPLACE INTO metadata(key, value) VALUES (?, ?)",
            [
                ("source_filename", args.pdf.name),
                ("source_page_count", str(len(pdf.pages))),
                ("conversion_stage", "all pages archived; entry blocks segmented from the two-column layout"),
                ("text_extraction_note", "Embedded font mapping corrupts some extracted Persian characters; structured Persian senses need OCR or manual correction against the preserved PDF."),
            ],
        )

    print(json.dumps({
        "database": str(args.database.resolve()),
        "pages_archived": len(pdf.pages),
        "segmented_entries": inserted_entries,
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
