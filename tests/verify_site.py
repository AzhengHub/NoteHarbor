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
require('NoteHarbor' in home and 'feature-card' in home, 'missing home cards')
require('generated/search' in home, 'missing search bundle')
require('brand-avatar' in home and '/avatar.svg' in home, 'missing optional avatar demo')

entries = json.loads((root / 'index.json').read_text(encoding='utf-8'))
require(any(e['title'] == '短代码' for e in entries), 'missing search entry')
require(any(e['title'] == '可选头像' for e in entries), 'missing search entry')
require(all(e.get('ref') and e.get('title') and 'body' in e for e in entries), 'invalid search entry')

pages = [
    'docs/getting-started/index.html',
    'docs/configuration/index.html',
    'docs/navigation/index.html',
    'docs/writing/index.html',
    'docs/shortcodes/index.html',
    'docs/home/index.html',
    'docs/avatar/index.html',
    'docs/footer/index.html',
    'docs/search/index.html',
    'docs/deploy/index.html',
    'docs/faq/index.html',
    'blog/a-place-to-think/index.html',
    'blog/keep-notes-reusable/index.html',
]
for path in pages:
    require((root / path).is_file(), f'missing example: {path}')

shortcodes = (root / 'docs/shortcodes/index.html').read_text(encoding='utf-8')
require('alert-warning' in shortcodes and 'collapse-block' in shortcodes, 'shortcode demos missing')
require('term-window' in shortcodes, 'terminal demo missing')

for path in ['index.xml', 'sitemap.xml']:
    ET.parse(root / path)

require('AzhengHub/docs' not in home, 'private repository must not be referenced')
print(f'Example site OK: {len(entries)} searchable pages, {len(pages)} example pages; XML feeds parse.')
