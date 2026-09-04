from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
CSS = ROOT / 'case-study.css'
HTMLS = [
    ROOT / 'case-study-luxroom.html',
    ROOT / 'case-study-atelier.html',
    ROOT / 'case-study-studioos.html',
    ROOT / 'case-study-vas-education.html',
    ROOT / 'case-study-ux.html',
]

FONT_URL = 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap'

css = CSS.read_text(encoding='utf-8')

old_root = ''':root {
  --bg: #ffffff;
  --surface: #ffffff;
  --text: #111111;
  --muted: #666666;
  --line: #e6e6e6;
  --line-strong: #b8b8b8;
  --accent-soft: #111111;
  --accent: #111111;
  --inverse-bg: #ffffff;
  --inverse-text: #111111;
  --serif: "Inter", Arial, sans-serif;
  --sans: "Inter", Arial, sans-serif;
  --mono: "Inter", Arial, sans-serif;
  --ease: cubic-bezier(.22, 1, .36, 1);
  color-scheme: light;
}

[data-theme="dark"] {
  --bg: #111111;
  --surface: #171717;
  --text: #f5f5f5;
  --muted: #b5b5b5;
  --line: #303030;
  --line-strong: #555555;
  --accent-soft: #f5f5f5;
  --accent: #f5f5f5;
  --inverse-bg: #111111;
  --inverse-text: #f5f5f5;
  color-scheme: dark;
}
'''

new_root = ''':root {
  --bg: #f7f6f2;
  --surface: #fbfaf7;
  --text: #111111;
  --muted: #6f6d67;
  --line: rgba(17, 17, 17, .15);
  --line-strong: rgba(17, 17, 17, .35);
  --accent-soft: #111111;
  --accent: #111111;
  --inverse-bg: #111111;
  --inverse-text: #f5f3ec;
  --serif: "Instrument Serif", Georgia, serif;
  --sans: "DM Sans", Arial, sans-serif;
  --mono: "DM Mono", ui-monospace, monospace;
  --ease: cubic-bezier(.22, 1, .36, 1);
  color-scheme: light;
}

[data-theme="dark"] {
  --bg: #111111;
  --surface: #171717;
  --text: #f5f3ec;
  --muted: #aaa79f;
  --line: rgba(245, 243, 236, .14);
  --line-strong: rgba(245, 243, 236, .34);
  --accent-soft: #f5f3ec;
  --accent: #f5f3ec;
  --inverse-bg: #f5f3ec;
  --inverse-text: #111111;
  color-scheme: dark;
}
'''

if old_root not in css:
    raise SystemExit('Expected minimal root token block not found')
css = css.replace(old_root, new_root, 1)
css = css.replace(
    '.case-thesis em { color: var(--text); font-family: var(--sans); font-weight: 600; font-style: normal; }',
    '.case-thesis em { color: var(--text); font-family: var(--serif); font-weight: 400; font-style: italic; }'
)
css = css.replace(
    '.change-thesis em { color: var(--text); font-family: var(--sans); font-weight: 600; font-style: normal; }',
    '.change-thesis em { color: var(--text); font-family: var(--serif); font-weight: 400; font-style: italic; }'
)
css = css.replace(
    '.vas-visual-copy strong em { color: #e4c979; font-family: var(--serif); font-weight: 500; }',
    '.vas-visual-copy strong em { color: #e4c979; font-family: var(--serif); font-weight: 400; font-style: italic; }'
)
CSS.write_text(css, encoding='utf-8')

font_pattern = re.compile(r'https://fonts\.googleapis\.com/css2\?family=[^\"\']+&display=swap')
for path in HTMLS:
    text = path.read_text(encoding='utf-8')
    text, count = font_pattern.subn(FONT_URL, text, count=1)
    if count != 1:
        raise SystemExit(f'Expected one Google Fonts URL in {path.name}, found {count}')
    text = re.sub(r'case-study\.css\?v=[^\"\']+', 'case-study.css?v=20260904-art-directed-v1', text, count=1)
    path.write_text(text, encoding='utf-8')

print('Updated shared case typography and font loading.')
