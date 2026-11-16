#!/usr/bin/env python3
"""Validate the supplied CSV and generate gallery metadata and WebP previews.

Requires ImageMagick's identify/convert commands for preview generation.
Original image files are never modified.
"""
from pathlib import Path
import csv
import json
import subprocess
from collections import Counter

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets/projects/3d_printing'
CSV_PATH = ASSETS / 'image-index.csv'
OUTPUT = ROOT / 'assets/optimized/3d_printing'
FEATURED = 'automated-four-point-probe-motorized-mount.jpg'
COLUMNS = ['original_filename', 'portfolio_filename', 'display_title', 'gallery_category']

def dimensions(path):
    return tuple(map(int, subprocess.check_output(
        ['identify', '-ping', '-format', '%w %h', str(path)], text=True).split()))

def main():
    with CSV_PATH.open(newline='', encoding='utf-8-sig') as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != COLUMNS:
            raise ValueError(f'Expected CSV columns {COLUMNS}; got {reader.fieldnames}')
        rows = list(reader)
    if not rows:
        raise ValueError('The image index is empty.')
    for column in ('original_filename', 'portfolio_filename'):
        duplicates = [name for name, count in Counter(row[column] for row in rows).items() if count > 1]
        if duplicates:
            raise ValueError(f'Duplicate {column}: {duplicates}')
    for row in rows:
        if any(not row[column].strip() for column in COLUMNS):
            raise ValueError(f'Empty metadata field: {row}')
        name = row['portfolio_filename']
        if Path(name).name != name or not (ASSETS / name).is_file():
            raise ValueError(f'Missing final asset: {name}. Preserve the original and copy it to this name first.')
    OUTPUT.mkdir(parents=True, exist_ok=True)
    images = []
    for row in rows:
        source = ASSETS / row['portfolio_filename']
        source_width, source_height = dimensions(source)
        variants = []
        for requested in ((360, 720, 1200) if source.name == FEATURED else (360, 720)):
            destination = OUTPUT / f'{source.stem}-{requested}.webp'
            subprocess.run(['convert', str(source), '-auto-orient', '-strip', '-resize', f'{requested}x>',
                            '-quality', '82', str(destination)], check=True)
            width, height = dimensions(destination)
            variants.append({'src': './' + destination.relative_to(ROOT).as_posix(), 'width': width, 'height': height})
        images.append({**row, 'src': './' + source.relative_to(ROOT).as_posix(),
                       'width': source_width, 'height': source_height,
                       'thumbnail': variants[0]['src'],
                       'thumbnail_width': variants[0]['width'], 'thumbnail_height': variants[0]['height'],
                       'srcset': ', '.join(f"{item['src']} {item['width']}w" for item in variants)})
    counts = Counter(row['gallery_category'] for row in rows)
    first = list(counts)
    categories = [{'name': name, 'count': counts[name]}
                  for name in sorted(counts, key=lambda name: (-counts[name], first.index(name)))]
    data = {'source': 'image-index.csv', 'image_count': len(images), 'featured_filename': FEATURED, 'categories': categories, 'images': images}
    (ASSETS / 'gallery.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Validated {len(images)} images in {len(categories)} categories; generated gallery.json and responsive previews.')

if __name__ == '__main__':
    main()
