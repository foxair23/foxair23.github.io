#!/usr/bin/env python3
"""Add favicon <link> tags to every HTML page after the last stylesheet link."""

import os
import re
import glob

ROOT = '/home/user/foxair23.github.io'

FAVICON_BLOCK = (
    '  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">\n'
    '  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">\n'
    '  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png">\n'
    '  <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon-180.png">\n'
    '  <link rel="icon" type="image/png" sizes="512x512" href="/assets/favicon-512.png">'
)

html_files = sorted(set(
    glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True)
    + glob.glob(os.path.join(ROOT, '*.html'))
))

# Exclude design system files
html_files = [f for f in html_files if 'Castle Garage Design System' not in f]

changed = 0
skipped = 0

for path in html_files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'favicon.svg' in content:
        skipped += 1
        continue

    # Find the last <link rel="stylesheet"> line and insert after it
    # Match any <link ... stylesheet ... > tag (may span one line)
    matches = list(re.finditer(r'<link[^>]+stylesheet[^>]*>', content))
    if not matches:
        print(f'  no stylesheet link found: {os.path.relpath(path, ROOT)}')
        continue

    last_match = matches[-1]
    insert_pos = last_match.end()
    content = content[:insert_pos] + '\n' + FAVICON_BLOCK + content[insert_pos:]

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    changed += 1
    print(f'  updated: {os.path.relpath(path, ROOT)}')

print(f'\nDone. {changed} files updated, {skipped} already had favicons.')
