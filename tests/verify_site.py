#!/usr/bin/env python3
"""Check the generated example site without third-party Python packages."""
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

root = Path(sys.argv[1] if len(sys.argv) > 1 else 'public')

def require(condition, message):
    if not condition:
        raise AssertionError(message)

home = (root / 'index.html').read_text(encoding='utf-8')
require('NoteHarbor' in home and 'feature-card' in home, 'missing home content')
require('generated/search' in home, 'missing search bundle')
entries = json.loads((root / 'index.json').read_text(encoding='utf-8'))
require(any(e['title'] == '书写与排版' for e in entries), 'missing search entry')
require(all(e.get('ref') and e.get('title') and 'body' in e for e in entries), 'invalid search entry')
for path in ['docs/getting-started/index.html', 'docs/writing/index.html', 'docs/features/navigation/index.html', 'blog/a-place-to-think/index.html']:
    require((root / path).is_file(), f'missing example: {path}')
for path in ['index.xml', 'sitemap.xml']:
    ET.parse(root / path)
require('AzhengHub/docs' not in home, 'private repository must not be referenced')
print(f'Example site OK: {len(entries)} searchable pages; XML feeds parse successfully.')
