#!/usr/bin/env python3
"""Fix design gaps: footer (3-col), trust strip, service-area photo cards."""

import os
import re
import glob

ROOT = '/home/user/foxair23.github.io'

# ── Trust strip replacement (index.html only) ─────────────────────────────
NEW_TRUST_INNER = '''<div class="trust-strip-inner">
        <div class="trust-strip-item"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Same-Day Service</div>
        <div class="trust-strip-item"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> Family-Owned &amp; Operated</div>
        <div class="trust-strip-item"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> Licensed &amp; Insured</div>
        <div class="trust-strip-item"><svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Since 1981</div>
        <div class="trust-strip-item"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> CSLB #1154002 &middot; C-61/D-28</div>
      </div>'''

# ── Service-area photo card grid (used in index.html #areas and service-areas/index.html) ──
def area_card_grid(prefix=''):
    """prefix = relative path prefix ('' for root, '../' for subdirs)"""
    cards = [
        ('san-diego.html', 'san-diego.jpg', 'San Diego'),
        ('escondido.html', 'escondido.jpg', 'Escondido'),
        ('oceanside.html', 'oceanside.jpeg', 'Oceanside'),
        ('carlsbad.html', 'carlsbad.png', 'Carlsbad'),
        ('encinitas.html', 'encinitas.webp', 'Encinitas'),
        ('north-county.html', 'north-county.webp', 'North County'),
        ('temecula.html', 'temecula.jpg', 'Temecula'),
        ('murrieta.html', 'murrieta.jpg', 'Murrieta'),
        ('fallbrook.html', 'fallbrook.jpg', 'Fallbrook'),
        ('bonsall.html', 'bonsall.avif', 'Bonsall'),
        ('riverside-county.html', 'riverside-county.jpg', 'Riverside County'),
        ('corona.html', 'corona.jpeg', 'Corona'),
    ]
    lines = ['<div class="areas-card-grid">']
    for slug, photo, label in cards:
        lines.append(
            f'        <a href="{prefix}service-areas/{slug}" class="area-card">'
            f'<img src="{prefix}assets/photos/service-areas/{photo}" alt="{label} garage door service" loading="lazy">'
            f'<div class="label"><span>{label}</span><span class="arrow">&rarr;</span></div></a>'
        )
    lines.append('      </div>')
    return '\n'.join(lines)

# ── Collect all HTML files ────────────────────────────────────────────────
html_files = sorted(
    glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True)
    + glob.glob(os.path.join(ROOT, '*.html'))
)
html_files = list(set(html_files))  # deduplicate

changed_count = 0

for path in sorted(html_files):
    with open(path, 'r', encoding='utf-8') as f:
        original = f.read()
    content = original

    # ── 1. Trust strip (index.html only) ───────────────────────────────
    if path == os.path.join(ROOT, 'index.html'):
        content = re.sub(
            r'<div class="trust-strip-inner">.*?</div>',
            NEW_TRUST_INNER,
            content,
            flags=re.DOTALL
        )
        # Fix hero trust item: "40+ Years" → "45+ Years"
        content = content.replace('40+ Years Experience', '45+ Years Experience')
        # Fix testimonial: remove veteran-owned reference
        content = content.replace(
            '"Veteran-owned and it shows in their work ethic. On time, professional, no BS. They diagnosed the problem quickly and fixed it at a fair price. Exactly what you want in a service company."',
            '"Family-owned and the pride shows in their work ethic. On time, professional, no BS. They diagnosed the problem quickly and fixed it at a fair price. Exactly what you want in a service company."'
        )

    # ── 2. Remove footer-social div ────────────────────────────────────
    content = re.sub(
        r'\s*<div class="footer-social">.*?</div>',
        '',
        content,
        flags=re.DOTALL
    )

    # ── 3. Remove "Service Areas" footer column ────────────────────────
    # Match <div>\n...<h4>Service Areas</h4>...(footer-links block)...</div>
    content = re.sub(
        r'\s*<div>\s*<h4>Service Areas</h4>.*?</div>\s*</div>',
        '',
        content,
        flags=re.DOTALL
    )

    # ── 4. Simplify footer-bottom (remove badges, simplify copyright) ──
    # Remove the footer-badges div
    content = re.sub(
        r'\s*<div class="footer-badges">.*?</div>',
        '',
        content,
        flags=re.DOTALL
    )
    # Simplify the footer-bottom <p> text
    content = re.sub(
        r'<p>&copy; 2026 Castle Garage Inc\. All rights reserved\. \|.*?</p>',
        '<p>&copy; 2026 Castle Garage Inc. CSLB #1154002 (C-61/D-28).</p>',
        content,
        flags=re.DOTALL
    )

    # ── 5. Remove Schedule Service CTA button from footer Contact column ──
    content = re.sub(
        r'\s*<a href="[^"]*" class="btn btn-primary btn-sm" style="margin-top:16px;width:100%;text-align:center;" data-track="schedule">Schedule Service</a>',
        '',
        content
    )

    # ── 6. Homepage: replace service-areas text grid with photo cards ──
    if path == os.path.join(ROOT, 'index.html'):
        content = re.sub(
            r'<div class="areas-grid-home">.*?</div>',
            area_card_grid(prefix=''),
            content,
            flags=re.DOTALL
        )
        # Remove the map iframe block (it's below the card grid in the reference)
        # Actually, keep the map - just remove the old text grid wrapper text
        # The map remains as a useful addition

    # ── 7. service-areas/index.html: replace areas-list with photo cards ──
    if path == os.path.join(ROOT, 'service-areas', 'index.html'):
        content = re.sub(
            r'<div class="areas-list"[^>]*>.*?</div>',
            area_card_grid(prefix='../'),
            content,
            flags=re.DOTALL
        )

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        changed_count += 1
        print(f'  updated: {os.path.relpath(path, ROOT)}')

print(f'\nDone. {changed_count} files updated.')
