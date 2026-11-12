"""Extract text layers from supplied PDFs and paragraphs from Word files for evaluation."""
import json
import sys
import zipfile
import xml.etree.ElementTree as ET
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')
result = []
for pdf_path, docx_path in zip(sys.argv[1::2], sys.argv[2::2]):
    reader = PdfReader(pdf_path)
    english = '\n'.join(page.extract_text() or '' for page in reader.pages)
    with zipfile.ZipFile(docx_path) as archive:
        root = ET.fromstring(archive.read('word/document.xml'))
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    persian = [''.join(node.text or '' for node in paragraph.findall('.//w:t', ns)) for paragraph in root.findall('.//w:body/w:p', ns)]
    result.append({'pages': len(reader.pages), 'english': english, 'persian': '\n'.join(p for p in persian if p.strip())})
print(json.dumps(result, ensure_ascii=False))
