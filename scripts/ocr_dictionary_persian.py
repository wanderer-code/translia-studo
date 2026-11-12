"""Complete the Persian OCR layer for the local Hezareh-A SQLite dictionary."""

from __future__ import annotations

import json
import math
import os
import re
import sqlite3
import sys
import tempfile
from pathlib import Path

import numpy as np
import pdfplumber
import pypdfium2 as pdfium


POS_CODES = {"n", "npl", "v", "vt", "vi", "adj", "adv", "prep", "conj", "pron", "det", "int", "aux", "art", "num"}
ASCII_HEAD = re.compile(r"^[A-Za-z][A-Za-z'-]*")
ARABIC = re.compile(r"[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]")


def add_missing_right_column_entries(db: sqlite3.Connection, pdf_path: Path) -> int:
    """The original segmenter missed the right column because Persian glyphs
    sometimes begin left of the English headword anchor. Find bold Arial heads
    in the right-column gutter and retain a full column crop for each one.
    """
    added = 0
    with pdfplumber.open(pdf_path) as pdf:
        for page_number, page in enumerate(pdf.pages, start=1):
            words = page.extract_words(extra_attrs=["fontname", "size"])
            headers = []
            for word in words:
                if not (35 <= word["top"] <= page.height - 34):
                    continue
                if not (page.width * 0.46 <= word["x0"] <= page.width * 0.515):
                    continue
                if "Arial" not in word["fontname"] or "Bold" not in word["fontname"]:
                    continue
                if word["size"] < 6.5:
                    continue
                match = ASCII_HEAD.match(word["text"])
                if not match:
                    continue
                headword = match.group(0).strip("-'")
                if not headword:
                    continue
                headers.append((float(word["top"]), float(word["x0"]), headword, word))

            headers.sort(key=lambda item: (item[0], item[1]))
            unique = []
            for candidate in headers:
                if unique and abs(candidate[0] - unique[-1][0]) < 2.5:
                    if candidate[1] < unique[-1][1]:
                        unique[-1] = candidate
                else:
                    unique.append(candidate)

            # Existing right-column blocks are identified from source bounds.
            existing = db.execute(
                "SELECT source_bbox_json FROM entries WHERE source_page = ?",
                (page_number,),
            ).fetchall()
            seen_tops = []
            for (bbox_text,) in existing:
                try:
                    bbox = json.loads(bbox_text)
                    if bbox.get("column") == "right":
                        seen_tops.append(float(bbox["bounds"][1]))
                except (ValueError, TypeError, KeyError, IndexError):
                    pass

            for index, (top, left, headword, word) in enumerate(unique):
                if any(abs(top - existing_top) < 4 for existing_top in seen_tops):
                    continue
                bottom = unique[index + 1][0] - 2.5 if index + 1 < len(unique) else page.height - 34
                if bottom <= top:
                    continue
                crop = page.crop((page.width * 0.46, top, page.width, bottom))
                raw_text = (crop.extract_text(layout=False) or "").strip()
                if not raw_text:
                    continue
                bbox = {
                    "column": "right",
                    "bounds": [round(page.width * 0.46, 2), round(top, 2), round(page.width, 2), round(bottom, 2)],
                }
                db.execute(
                    """INSERT INTO entries(headword, source_page, source_order,
                       source_bbox_json, raw_text, extraction_status)
                       VALUES (?, ?, ?, ?, ?, 'needs_review')""",
                    (headword, page_number, 1_000_000 + added, json.dumps(bbox), raw_text),
                )
                entry_id = db.execute("SELECT last_insert_rowid()").fetchone()[0]
                # Keep the print's pronunciation as it appeared in the crop;
                # OCR will also preserve it in the complete transcript.
                if "/" in word["text"]:
                    pronunciation = word["text"][word["text"].find("/"):].strip()
                    if pronunciation:
                        db.execute(
                            "INSERT INTO pronunciations(entry_id, pronunciation) VALUES (?, ?)",
                            (entry_id, pronunciation),
                        )
                pos_words = [
                    item for item in words
                    if item["text"].strip(".,;:").lower() in POS_CODES
                    and item["x0"] >= page.width - 18
                    and top - 2 <= item["top"] <= min(bottom, top + 5)
                ]
                if pos_words:
                    pos = min(pos_words, key=lambda item: abs(item["top"] - top))["text"].strip(".,;:")
                    db.execute("UPDATE entries SET part_of_speech = ? WHERE id = ?", (pos, entry_id))
                added += 1
            db.commit()
    return added


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: ocr_dictionary_persian.py SOURCE.pdf DATABASE.sqlite")
    pdf_path = Path(sys.argv[1]).resolve()
    database_path = Path(sys.argv[2]).resolve()
    if not pdf_path.is_file() or not database_path.is_file():
        raise SystemExit("PDF or SQLite database is missing")

    # Paddle's legacy dataset helper probes the user profile for an optional
    # cache. Keep all runtime/cache writes within this project instead.
    runtime_tmp = Path.cwd() / "tmp" / "paddle-tmp"
    runtime_tmp.mkdir(parents=True, exist_ok=True)
    tempfile.tempdir = str(runtime_tmp)
    os.environ.setdefault("PADDLE_PDX_CACHE_HOME", str(Path.cwd() / "tmp" / "paddlex-cache"))
    original_access = os.access
    user_home = os.path.normcase(os.path.abspath(os.path.expanduser("~")))
    os.access = lambda path, mode, *args, **kwargs: (
        False if os.path.normcase(os.path.abspath(os.fspath(path))) == user_home
        else original_access(path, mode, *args, **kwargs)
    )
    from paddleocr import PaddleOCR
    os.access = original_access

    os.environ.setdefault("PADDLE_PDX_MODEL_SOURCE", "huggingface")
    os.environ.setdefault("PADDLE_PDX_DISABLE_MODEL_SOURCE_CHECK", "True")
    ocr = PaddleOCR(
        device="cpu", text_detection_model_name="PP-OCRv5_mobile_det",
        text_recognition_model_name="arabic_PP-OCRv5_mobile_rec",
        text_det_limit_side_len=640, enable_mkldnn=False, cpu_threads=4,
        use_doc_orientation_classify=False, use_doc_unwarping=False,
        use_textline_orientation=False, text_recognition_batch_size=16,
    )
    ocr.paddlex_pipeline.batch_sampler.batch_size = 4

    connection = sqlite3.connect(database_path)
    connection.execute("PRAGMA foreign_keys = ON")
    added = add_missing_right_column_entries(connection, pdf_path)
    connection.execute(
        """CREATE TABLE IF NOT EXISTS entry_ocr (
            entry_id INTEGER PRIMARY KEY REFERENCES entries(id) ON DELETE CASCADE,
            recognized_text TEXT NOT NULL,
            persian_text TEXT NOT NULL,
            average_confidence REAL,
            model TEXT NOT NULL,
            status TEXT NOT NULL
        )"""
    )
    connection.commit()

    rows = connection.execute(
        "SELECT id, source_page, source_bbox_json FROM entries ORDER BY source_page, source_order, id"
    ).fetchall()
    pages = pdfium.PdfDocument(str(pdf_path))
    stored = {item[0] for item in connection.execute("SELECT entry_id FROM entry_ocr").fetchall()}
    page_map: dict[int, list[tuple[int, str, list[float]]]] = {}
    for entry_id, page_number, bbox_text in rows:
        try:
            obj = json.loads(bbox_text)
            column, bounds = obj.get("column", "left"), list(map(float, obj["bounds"]))
        except (ValueError, TypeError, KeyError):
            column, bounds = "left", [0.0, 35.0, 212.0, 630.0]
        page_map.setdefault(page_number, []).append((entry_id, column, bounds))

    todo_pages = [
        number for number, items in sorted(page_map.items())
        if not all(entry_id in stored for entry_id, _, _ in items)
    ]
    crop_dir = Path.cwd() / "tmp" / "ocr-column-crops"
    crop_dir.mkdir(parents=True, exist_ok=True)
    scale, chunk_height, overlap = 4.0, 110.0, 12.0
    segments_done = enriched = no_persian = 0

    for page_number in todo_pages:
        page = pages[page_number - 1]
        image = page.render(scale=scale).to_pil().convert("RGB")
        page_width, page_height = page.get_width(), page.get_height()
        sx, sy = image.width / page_width, image.height / page_height
        page_entries = page_map[page_number]
        accumulated: dict[int, list[tuple[str, float]]] = {
            entry_id: [] for entry_id, _, _ in page_entries
        }
        segments = []
        y0 = 35.0
        while y0 < page_height - 34:
            y1 = min(page_height - 34, y0 + chunk_height)
            for column, x0, x1 in (
                ("left", 0.0, page_width * 0.49),
                ("right", page_width * 0.46, page_width),
            ):
                path = crop_dir / f"page-{page_number:03d}-{column}-{int(y0):03d}.png"
                image.crop((
                    max(0, math.floor(x0 * sx)), max(0, math.floor(y0 * sy)),
                    min(image.width, math.ceil(x1 * sx)), min(image.height, math.ceil(y1 * sy)),
                )).save(path, format="PNG")
                segments.append((column, y0, y1, path))
            if y1 >= page_height - 34:
                break
            y0 = y1 - overlap

        for batch_start in range(0, len(segments), 4):
            batch = segments[batch_start:batch_start + 4]
            results = list(ocr.predict([str(spec[3]) for spec in batch]))
            if len(results) != len(batch):
                raise RuntimeError(f"OCR returned {len(results)} results for {len(batch)} segments on page {page_number}")
            for (column, seg_y0, _, path), result in zip(batch, results):
                for text, score, box in zip(
                    result.get("rec_texts", []), result.get("rec_scores", []), result.get("rec_boxes", [])
                ):
                    text = str(text).strip()
                    if not text:
                        continue
                    coords = box.tolist() if hasattr(box, "tolist") else box
                    center_y = seg_y0 + ((float(coords[1]) + float(coords[3])) / 2) / sy
                    candidates = [
                        (entry_id, bounds) for entry_id, entry_column, bounds in page_entries
                        if entry_column == column and bounds[1] - 2 <= center_y <= bounds[3] + 2
                    ]
                    if candidates:
                        entry_id, _ = min(
                            candidates,
                            key=lambda item: abs(center_y - (item[1][1] + item[1][3]) / 2),
                        )
                        item = (text, float(score))
                        if item not in accumulated[entry_id]:
                            accumulated[entry_id].append(item)
                path.unlink(missing_ok=True)
            segments_done += len(batch)

        for entry_id, _, _ in page_entries:
            lines = accumulated[entry_id]
            recognized_text = "\n".join(text for text, _ in lines)
            persian_text = "\n".join(text for text, _ in lines if ARABIC.search(text))
            confidence = sum(score for _, score in lines) / len(lines) if lines else None
            status = "ocr_extracted" if persian_text else "ocr_no_persian_detected"
            connection.execute(
                """INSERT OR REPLACE INTO entry_ocr
                   (entry_id, recognized_text, persian_text, average_confidence, model, status)
                   VALUES (?, ?, ?, ?, ?, ?)""",
                (entry_id, recognized_text, persian_text, confidence,
                 "PaddleOCR PP-OCRv5 mobile detector + Arabic/Persian recognizer", status),
            )
            if persian_text:
                connection.execute("DELETE FROM senses WHERE entry_id = ?", (entry_id,))
                connection.execute(
                    "INSERT INTO senses(entry_id, sense_number, meaning_fa) VALUES (?, 1, ?)",
                    (entry_id, persian_text),
                )
                connection.execute("UPDATE entries SET extraction_status = 'ocr_extracted' WHERE id = ?", (entry_id,))
                enriched += 1
            else:
                connection.execute("UPDATE entries SET extraction_status = 'ocr_needs_review' WHERE id = ?", (entry_id,))
                no_persian += 1
        connection.commit()
        stored.update(entry_id for entry_id, _, _ in page_entries)
        print(
            f"OCR progress: page {page_number}/{max(page_map)}; {segments_done} segments; "
            f"{enriched} entries with Persian text; {no_persian} needing review",
            flush=True,
        )
        del image
    connection.execute(
        "INSERT OR REPLACE INTO metadata(key, value) VALUES (?, ?)",
        ("ocr_conversion", "PaddleOCR PP-OCRv5 mobile detector + Arabic/Persian recognizer; 4x column-segment crops; original PDF text and source bounds retained"),
    )
    connection.execute(
        "INSERT OR REPLACE INTO metadata(key, value) VALUES (?, ?)",
        ("right_column_entries_added", str(added)),
    )
    connection.commit()
    print(json.dumps({
        "pdf": str(pdf_path), "database": str(database_path), "entries_total": len(rows),
        "new_right_column_entries": added, "ocr_segments_this_run": segments_done,
        "persian_entries_with_ocr": enriched, "entries_needing_review": no_persian,
        "pages_missing_ocr": len(page_map) - len(stored),
    }, ensure_ascii=True))
    connection.close()


if __name__ == "__main__":
    main()
