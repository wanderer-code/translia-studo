import { Document, Paragraph, TextRun, AlignmentType } from 'docx';

export function createPersianDocument(segments) {
  return new Document({ sections: [{ children: segments.map((segment) => new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.RIGHT,
    children: [new TextRun({ text: segment.editedPersian, rightToLeft: true, font: 'Vazirmatn', size: 26 })],
    spacing: { after: 240, line: 456 },
  })) }] });
}
