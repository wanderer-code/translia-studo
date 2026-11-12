import { ExternalLibCache, loadExternalScript } from './external-libraries.js';

// ============================================================================
// 1. REAL BINARY PDF (.pdf) & WORD (.docx) PARSER ENGINE
//    - Learned from Both Lesson 2 (02-1.pdf / Persian .docx) & Lesson 3 (03.pdf / Persian .docx)
// ============================================================================

export function isBinaryGarbageLine(str) {
  if (!str) return true;
  const trimmed = str.trim();
  if (!trimmed) return true;
  if (
    /^%PDF-/i.test(trimmed) ||
    /^PK[\x03\x04\x05\x06\uFFFD]/.test(trimmed) ||
    /\[Content_Types\]\.xml/i.test(trimmed) ||
    /\b\d+\s+\d+\s+obj\b/.test(trimmed) ||
    /\bendobj\b|\bstream\b|\bendstream\b|\/FlateDecode|\/MediaBox|\/Font|\/ExtGState|\/Parent|\/Type\/Page/i.test(trimmed)
  ) {
    return true;
  }
  const replacementCount = (trimmed.match(/\uFFFD/g) || []).length;
  const controlChars = (trimmed.match(/[\x00-\x08\x0E-\x1F]/g) || []).length;
  if (replacementCount + controlChars > trimmed.length * 0.12) return true;
  return false;
}

const BULLET_MARKER_REGEX = /^([•●○▪▫▸▹►▻❖✦✓✔✗✘\-–—*+])\s+/;
const NUMBERED_MARKER_REGEX = /^(\(?\d+[0-9\u06F0-\u06F9]*[.)\]]|\(?[a-zA-Z][.)\]]|\(?[ivxIVX]+[.)\]])\s+/;
const PERSIAN_LIST_MARKER_REGEX = /^([۰-۹0-9]+[-.)]|الف\)|ب\)|ج\)|د\)|[•●▪\-–—])\s+/;

export function detectIsListItem(text) {
  if (!text) return false;
  const trimmed = text.trim();
  if (BULLET_MARKER_REGEX.test(trimmed)) return true;
  if (NUMBERED_MARKER_REGEX.test(trimmed)) return true;
  if (PERSIAN_LIST_MARKER_REGEX.test(trimmed)) return true;
  if (/^(if\s+(one|both|neither)|•\s+|-\s+)/i.test(trimmed) && trimmed.length < 420) {
    return true;
  }
  return false;
}

export function cleanPersianDocxArtifacts(text) {
  if (!text) return '';
  let cleaned = text.replace(/\u200F/g, '').replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
  cleaned = cleaned.replace(
    /(^|\s)(?:(\d)\2|([1-9]\d)\3)(?=[\u0600-\u06FF«"'])/g,
    '$1'
  );
  return cleaned.trim();
}

function detachTrailingBodyFromFinalListItem(itemText) {
  const trimmed = itemText.trim();
  if (!detectIsListItem(trimmed)) return [trimmed];

  const sentenceBreakRegex =
    /^([•●▪\-–—*+]\s+[^.!؟]+[.!؟])\s+((?:The\s+prisoners|Notice\s+that|Based\s+on\s+this|We\s+seem\s+to|So,\s+in\s+the\s+Game|Alex\s+and\s+Bob|How\s+should|This\s+is\s+the|Let's\s+begin|In\s+the\s+modern|Of\s+course)[\s\S]+)$/;
  const match = trimmed.match(sentenceBreakRegex);
  if (match) {
    return [match[1].trim(), match[2].trim()];
  }
  return [trimmed];
}

export function splitParagraphIntoListSegments(text, isDocxSource = false) {
  if (!text) return [];
  const trimmed = text.trim();
  if (!trimmed) return [];

  if (isDocxSource) {
    if ((trimmed.match(/[•●▪]/g) || []).length >= 2) {
      return trimmed
        .split(/(?=[•●▪])/g)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [trimmed];
  }

  let segments = [];
  const colonBeforeBulletMatch = trimmed.match(/^([\s\S]*?[:：])\s*([•●○▪▫▸▹►▻❖✦]\s+[\s\S]+)$/);
  if (colonBeforeBulletMatch && !detectIsListItem(colonBeforeBulletMatch[1])) {
    segments.push(colonBeforeBulletMatch[1].trim());
    const remainder = colonBeforeBulletMatch[2].trim();
    segments.push(...splitParagraphIntoListSegments(remainder, false));
    return segments;
  }

  if ((trimmed.match(/[•●▪]/g) || []).length >= 2) {
    const rawBullets = trimmed
      .split(/(?=[•●▪])/g)
      .map((s) => s.trim())
      .filter(Boolean);

    for (const b of rawBullets) {
      segments.push(...detachTrailingBodyFromFinalListItem(b));
    }
    return segments;
  }

  if (
    trimmed.includes(';') &&
    /;\s*(?:and\s+)?(if\s+(?:one|both|neither)|•|\(\w\)|\d+\.|و\s+اگر|در\s+صورتی)/i.test(trimmed)
  ) {
    let leadIn = '';
    let bodyToSplit = trimmed;
    const leadColonIdx = trimmed.indexOf(':');
    const firstIfIdx = trimmed.search(/\b(if\s+(?:one|both|neither)|اگر\s+(?:یکی|هر\s+دو|هیچ))/i);
    if (leadColonIdx !== -1 && firstIfIdx !== -1 && leadColonIdx < firstIfIdx) {
      leadIn = trimmed.slice(0, leadColonIdx + 1).trim();
      bodyToSplit = trimmed.slice(leadColonIdx + 1).trim();
    }

    const parts = bodyToSplit
      .split(/;\s+(?:and\s+)?(?=(?:if\s+(?:one|both|neither)|•|\(\w\)|\d+\.|و\s+اگر|در\s+صورتی|اگر\s+))/i)
      .map((s, idx, arr) => {
        const clean = s.trim();
        const withSemi = idx < arr.length - 1 && !clean.endsWith(';') ? `${clean};` : clean;
        return withSemi.startsWith('•') ? withSemi : `• ${withSemi}`;
      })
      .filter(Boolean);

    if (parts.length > 1) {
      const expanded = [];
      if (leadIn) expanded.push(leadIn);
      for (const p of parts) {
        expanded.push(...detachTrailingBodyFromFinalListItem(p));
      }
      return expanded;
    }
  }

  return detachTrailingBodyFromFinalListItem(trimmed);
}

function isStandalonePageNumberOrHeader(lineText, lineIndex, totalLinesOnPage) {
  const t = lineText.trim();
  if (!t) return true;
  const isEdgeLine = lineIndex === 0 || lineIndex === totalLinesOnPage - 1;
  if (!isEdgeLine) return false;
  if (/^(?:page\s*)?[-–—]?\s*\d+\s*(?:of\s*\d+)?\s*[-–—]?$/i.test(t)) {
    return true;
  }
  return false;
}

function shouldStitchAcrossPageBreak(currentParagraphText, nextLineText) {
  if (!currentParagraphText || !nextLineText) return false;
  const prev = currentParagraphText.trim();
  const next = nextLineText.trim();
  if (!prev || !next) return false;

  if (
    BULLET_MARKER_REGEX.test(next) ||
    NUMBERED_MARKER_REGEX.test(next) ||
    PERSIAN_LIST_MARKER_REGEX.test(next) ||
    /^(chapter|lesson|section|part|table|figure)\s+\d+/i.test(next)
  ) {
    return false;
  }

  if (prev.length < 45 && !/[.,;?!:]$/.test(prev)) return false;
  if (/[:：]$/.test(prev)) return false;

  const endsWithTerminalPunctuation = /[.!?؟"”'’)\]](?:\s*\d+)?$/.test(prev);
  const endsWithHyphen = /[-–­]$/.test(prev);
  const startsWithLowercase = /^[a-z\u0600-\u06FF]/.test(next) && !/^[A-Z]/.test(next);

  if (endsWithHyphen || !endsWithTerminalPunctuation || startsWithLowercase) {
    return true;
  }
  return false;
}

function joinLinesCleanly(accumulatedText, nextLineText) {
  const prev = accumulatedText.trimEnd();
  const next = nextLineText.trim();
  if (!prev) return next;
  if (!next) return prev;

  if (/[-­]$/.test(prev) && /^[a-z]/.test(next)) {
    const wordBeforeHyphen = prev.slice(0, -1).split(/\s+/).pop() || '';
    const commonCompoundPrefixes =
      /^(game|self|well|non|pre|post|co|re|inter|multi|cross|counter|common|high|low|long|short|one|two|three|hard|free|over|under|clear|ground|forty|twenty|thirty)$/i;
    if (commonCompoundPrefixes.test(wordBeforeHyphen)) {
      return `${prev}${next}`;
    }
    return `${prev.slice(0, -1)}${next}`;
  }

  return `${prev} ${next}`;
}

function isShortOutcomeBulletHeader(text) {
  const t = (text || '').trim();
  return /^•\s+[A-Z][^.!?:]{3,42};\s+[A-Z][^.!?:]{3,42}\.$/.test(t);
}

export async function extractCleanParagraphsFromPDF(file, autoSplitLists = true) {
  try {
    if (!ExternalLibCache.pdfjs) {
      await loadExternalScript(
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
        'pdfjsLib'
      );
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      ExternalLibCache.pdfjs = window.pdfjsLib;
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await ExternalLibCache.pdfjs.getDocument({ data: arrayBuffer }).promise;
    const rawParagraphs = [];
    const rawParagraphPages = [];

    let currentPara = '';
    let currentParaPage = 1;
    const pushParagraph = () => {
      rawParagraphs.push(currentPara.trim());
      rawParagraphPages.push(currentParaPage);
    };
    let inListBlock = false;
    let lastParaFontSize = null;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      const rawItems = textContent.items
        .filter((it) => typeof it.str === 'string' && it.str.length > 0)
        .map((it) => {
          const x = it.transform ? it.transform[4] : 0;
          const y = it.transform ? it.transform[5] : 0;
          const fontSize = Math.abs(it.transform ? it.transform[3] : 11) || it.height || 11;
          const width = it.width || it.str.length * (fontSize * 0.52);
          return {
            str: it.str,
            x,
            maxX: x + width,
            y,
            height: fontSize,
          };
        });

      rawItems.sort((a, b) => {
        if (Math.abs(b.y - a.y) > 3.5) return b.y - a.y;
        return a.x - b.x;
      });

      const lines = [];
      let currentLine = [];
      let lastY = null;

      const flushVisualLine = (itemsInLine, yCoord) => {
        if (itemsInLine.length === 0) return;
        itemsInLine.sort((a, b) => a.x - b.x);
        const lineText = itemsInLine
          .map((i) => i.str)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (!lineText) return;
        const minX = itemsInLine[0].x;
        const maxX = Math.max(...itemsInLine.map((i) => i.maxX));
        const avgFontSize =
          itemsInLine.reduce((acc, i) => acc + i.height, 0) / itemsInLine.length;
        lines.push({
          text: lineText,
          minX,
          maxX,
          y: yCoord,
          height: avgFontSize,
        });
      };

      for (const item of rawItems) {
        if (!item.str.trim() && currentLine.length === 0) continue;
        if (lastY !== null && Math.abs(item.y - lastY) > Math.max(3.8, item.height * 0.42)) {
          flushVisualLine(currentLine, lastY);
          currentLine = [];
        }
        currentLine.push(item);
        lastY = item.y;
      }
      flushVisualLine(currentLine, lastY);

      const contentLines = lines.filter(
        (ln, idx) => !isStandalonePageNumberOrHeader(ln.text, idx, lines.length)
      );
      if (contentLines.length === 0) continue;

      const sortedMinX = contentLines.map((l) => l.minX).sort((a, b) => a - b);
      const baselineLeftX = sortedMinX[Math.floor(sortedMinX.length * 0.15)] || 0;

      const sortedMaxX = contentLines.map((l) => l.maxX).sort((a, b) => a - b);
      const baselineRightX = sortedMaxX[Math.floor(sortedMaxX.length * 0.85)] || 400;

      let prevLine = null;

      for (let lineIdx = 0; lineIdx < contentLines.length; lineIdx++) {
        const line = contentLines[lineIdx];
        const text = line.text;
        const isFirstLineOfNewPage = lineIdx === 0 && pageNum > 1;

        const isExplicitListLine =
          BULLET_MARKER_REGEX.test(text) ||
          NUMBERED_MARKER_REGEX.test(text) ||
          PERSIAN_LIST_MARKER_REGEX.test(text);

        const leftIndentDelta = line.minX - baselineLeftX;
        const hasFirstLineIndent = leftIndentDelta >= 6.5 && leftIndentDelta <= 42;
        const isDeepListIndent = leftIndentDelta > 12;

        const verticalGap = prevLine ? Math.abs(prevLine.y - line.y) : 0;
        const isLargeVerticalGap = prevLine !== null && verticalGap > line.height * 1.55;

        const hasFontSizeShift =
          lastParaFontSize !== null && Math.abs(line.height - lastParaFontSize) > 1.15;

        const prevTrimmed = currentPara.trim();
        const prevEndsWithColon = /[:：]$/.test(prevTrimmed);
        const prevEndedSentence = /[.!?؟"”'’)\]](?:\s*\d+)?$/.test(prevTrimmed);
        const prevEndedListClause = /[.;!؟]$/.test(prevTrimmed);

        const prevLineStoppedShort =
          prevLine !== null && baselineRightX - prevLine.maxX > 26 && prevEndedSentence;

        const prevWasShortOutcomeBullet = isShortOutcomeBulletHeader(prevTrimmed);

        const isReturningToBodyFromList =
          inListBlock &&
          !isExplicitListLine &&
          (!isDeepListIndent || prevWasShortOutcomeBullet) &&
          prevEndedListClause;

        const startsNewBookParagraph =
          !inListBlock &&
          !isExplicitListLine &&
          prevEndedSentence &&
          (hasFirstLineIndent || prevLineStoppedShort || prevEndsWithColon);

        const startsNewListBlock =
          isExplicitListLine || (isDeepListIndent && (prevEndsWithColon || isLargeVerticalGap));

        if (isFirstLineOfNewPage && currentPara) {
          if (
            !startsNewListBlock &&
            !startsNewBookParagraph &&
            !isReturningToBodyFromList &&
            shouldStitchAcrossPageBreak(currentPara, text)
          ) {
            currentPara = joinLinesCleanly(currentPara, text);
          } else {
            pushParagraph();
            currentPara =
              isExplicitListLine && !text.startsWith('•') && BULLET_MARKER_REGEX.test(text)
                ? text.replace(BULLET_MARKER_REGEX, '• ')
                : text;
            currentParaPage = pageNum;
            inListBlock = isExplicitListLine;
            lastParaFontSize = line.height;
          }
          prevLine = line;
          continue;
        }

        if (
          startsNewListBlock ||
          isLargeVerticalGap ||
          prevEndsWithColon ||
          isReturningToBodyFromList ||
          startsNewBookParagraph ||
          hasFontSizeShift
        ) {
          if (currentPara.trim()) {
            pushParagraph();
          }
          currentPara =
            isExplicitListLine && !text.startsWith('•') && BULLET_MARKER_REGEX.test(text)
              ? text.replace(BULLET_MARKER_REGEX, '• ')
              : text;
          currentParaPage = pageNum;
          inListBlock = isExplicitListLine || (inListBlock && isDeepListIndent && !prevWasShortOutcomeBullet);
          lastParaFontSize = line.height;
        } else {
          if (!currentPara) {
            currentPara = text;
            currentParaPage = pageNum;
            inListBlock = isExplicitListLine;
            lastParaFontSize = line.height;
          } else {
            currentPara = joinLinesCleanly(currentPara, text);
            const looksLikeHeading =
              currentPara.length < 55 &&
              !/[.,;:]$/.test(currentPara) &&
              /^(lesson|chapter|section|part|figure|table)\b/i.test(currentPara);
            if (looksLikeHeading) {
              pushParagraph();
              currentPara = '';
              inListBlock = false;
            }
          }
        }

        prevLine = line;
      }
    }

    if (currentPara.trim()) {
      pushParagraph();
    }

    const cleaned = rawParagraphs.map((text, index) => ({ text, page: rawParagraphPages[index] })).filter((p) => !isBinaryGarbageLine(p.text));
    if (!autoSplitLists) {
      const text = cleaned.map((p) => p.text);
      Object.defineProperty(text, 'sourcePages', { value: cleaned.map((p) => p.page) });
      return text;
    }

    const finalSegments = [];
    const sourcePages = [];
    for (const para of cleaned) {
      const subItems = splitParagraphIntoListSegments(para.text, false);
      finalSegments.push(...subItems);
      sourcePages.push(...subItems.map(() => para.page));
    }
    Object.defineProperty(finalSegments, 'sourcePages', { value: sourcePages });
    return finalSegments;
  } catch (err) {
    console.warn('PDF extraction fallback:', err);
    return [];
  }
}

// Repeated sequential pairs are a strong clue, but a user must confirm removal.
export function findRepeatedPageNumberCandidates(paragraphs) {
  const numeric = [];
  const digits = '\u06f0\u06f1\u06f2\u06f3\u06f4\u06f5\u06f6\u06f7\u06f8\u06f9\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669';
  paragraphs.forEach((text, index) => {
    const value = text.trim().replace(/[\u06f0-\u06f9\u0660-\u0669]/g, c => String(digits.indexOf(c) % 10));
    if (/^\d{1,4}$/.test(value)) numeric.push({ index, value: Number(value) });
  });
  const candidates = [];
  for (let i = 0; i + 5 < numeric.length;) {
    const start = i;
    while (i + 1 < numeric.length && numeric[i].value === numeric[i + 1].value &&
      numeric[i + 1].index === numeric[i].index + 1 &&
      (i === start || numeric[i].value === numeric[i - 1].value + 1)) i += 2;
    if (i - start >= 6) candidates.push(...numeric.slice(start, i));
    if (i === start) i++;
  }
  return candidates;
}

export async function extractCleanParagraphsFromDocx(file, autoSplitLists = true) {
  const arrayBuffer = await file.arrayBuffer();

  try {
    if (!ExternalLibCache.jszip) {
      await loadExternalScript(
        'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
        'JSZip'
      );
      ExternalLibCache.jszip = window.JSZip;
    }
    const zip = await ExternalLibCache.jszip.loadAsync(arrayBuffer);
    const docXmlFile = zip.file('word/document.xml');
    if (docXmlFile) {
      const xmlText = await docXmlFile.async('string');
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
      const pNodes = xmlDoc.getElementsByTagName('w:p');
      const paragraphs = [];

      for (let i = 0; i < pNodes.length; i++) {
        const pNode = pNodes[i];
        const numPrNodes = pNode.getElementsByTagName('w:numPr');
        const isWordListParagraph = numPrNodes && numPrNodes.length > 0;

        const tNodes = pNode.getElementsByTagName('w:t');
        let paraText = '';
        for (let j = 0; j < tNodes.length; j++) {
          paraText += tNodes[j].textContent || '';
        }
        const cleaned = cleanPersianDocxArtifacts(paraText);
        if (cleaned && !isBinaryGarbageLine(cleaned)) {
          const formatted =
            isWordListParagraph && !detectIsListItem(cleaned) ? `• ${cleaned}` : cleaned;
          if (autoSplitLists) {
            paragraphs.push(...splitParagraphIntoListSegments(formatted, true));
          } else {
            paragraphs.push(formatted);
          }
        }
      }
      if (paragraphs.length > 0) return paragraphs;
    }
  } catch (zipErr) {
    console.warn('JSZip DOCX parse fallback to mammoth:', zipErr);
  }

  try {
    if (!ExternalLibCache.mammoth) {
      await loadExternalScript(
        'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js',
        'mammoth'
      );
      ExternalLibCache.mammoth = window.mammoth;
    }
    const result = await ExternalLibCache.mammoth.extractRawText({ arrayBuffer });
    if (result && result.value) {
      const lines = result.value
        .split(/\r?\n+/)
        .map((p) => cleanPersianDocxArtifacts(p))
        .filter((p) => p.length > 0 && !isBinaryGarbageLine(p));
      if (lines.length > 0) return lines;
    }
  } catch (mammothErr) {
    console.warn('Mammoth parse error:', mammothErr);
  }

  return [];
}

