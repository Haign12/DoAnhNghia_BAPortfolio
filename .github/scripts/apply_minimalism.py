from pathlib import Path
import re

INTER_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise SystemExit(f'missing replacement target: {label}')
    return text.replace(old, new, 1)


for path in [Path('index.html'), *sorted(Path('.').glob('case-study-*.html'))]:
    text = path.read_text(encoding='utf-8')
    text = re.sub(r'https://fonts.googleapis.com/css2\?family=DM\+Mono[^"\s]+display=swap', INTER_URL, text)
    text = text.replace('styles.css?v=20260903-luxury-editorial-v1', 'styles.css?v=20260904-minimal-v1')
    text = text.replace('case-study.css?v=20260903-luxury-editorial-v1', 'case-study.css?v=20260904-minimal-v1')
    path.write_text(text, encoding='utf-8')

path = Path('styles.css')
text = path.read_text(encoding='utf-8')
text = replace_once(text, ''':root {
  --bg: #f5f1e8;
  --surface: #fbf8f2;
  --text: #151412;
  --muted: #6f6a61;
  --line: #d8d0c3;
  --line-strong: #aaa093;
  --accent-soft: #c6a978;
  --accent: #7a5e3b;
  --inverse-bg: #151412;
  --inverse-text: #f5f1e8;
  --serif: "Noto Serif Display", Georgia, serif;
  --sans: "DM Sans", Arial, sans-serif;
  --mono: "DM Mono", monospace;''', ''':root {
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
  --mono: "Inter", Arial, sans-serif;''', 'home light tokens')
text = replace_once(text, '''[data-theme="dark"] {
  --bg: #171512;
  --surface: #201d18;
  --text: #f2ecdf;
  --muted: #aaa296;
  --line: #39342d;
  --line-strong: #645c51;
  --accent-soft: #c6a978;
  --accent: #d1b27d;
  --inverse-bg: #f2ecdf;
  --inverse-text: #171512;''', '''[data-theme="dark"] {
  --bg: #111111;
  --surface: #171717;
  --text: #f5f5f5;
  --muted: #b5b5b5;
  --line: #303030;
  --line-strong: #555555;
  --accent-soft: #f5f5f5;
  --accent: #f5f5f5;
  --inverse-bg: #111111;
  --inverse-text: #f5f5f5;''', 'home dark tokens')
text = replace_once(text, '''h1 em, h2 em, .more-work-title em, .contact-copy h2 em {
  font-family: var(--serif);
  font-weight: 500;
  font-style: italic;
}''', '''h1 em, h2 em, .more-work-title em, .contact-copy h2 em {
  font-family: var(--sans);
  font-weight: 600;
  font-style: normal;
}''', 'sans headings')
text = replace_once(text, '''.project-folio { display: grid; gap: clamp(92px, 10vw, 148px); }
.folio-item { display: grid; }
.folio-media,
.vas-preview {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--surface);
  text-decoration: none;
}''', '''.project-folio { display: grid; gap: clamp(78px, 7vw, 108px); }
.folio-item { display: grid; }
.folio-media,
.vas-preview {
  position: relative;
  width: min(100%, 1040px);
  margin-inline: auto;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--surface);
  text-decoration: none;
}
.folio-meta,
.folio-caption {
  width: min(100%, 1040px);
  margin-inline: auto;
}''', 'thumbnail frame scale')
text = text.replace('.folio-media-tall { width: 82%; margin-left: auto; }', '.folio-media-tall { width: min(100%, 920px); margin-inline: auto; }')
text = text.replace('.folio-media-wide { width: 91%; }', '.folio-media-wide { width: min(100%, 1040px); margin-inline: auto; }')
text = text.replace('  min-height: 540px;\n', '  min-height: 430px;\n', 1)
text = text.replace('  color: #f7f0e7;\n  background: #8f2028;\n  border-color: #7b1a2b;\n', '  color: #111111;\n  background: #ffffff;\n  border-color: var(--line);\n', 1)
text = text.replace('  border: 1px solid rgba(247, 240, 231, .22);', '  border: 1px solid rgba(17, 17, 17, .12);', 1)
text = text.replace('  box-shadow: 0 0 0 70px rgba(247, 240, 231, .05), 0 0 0 140px rgba(247, 240, 231, .03);', '  box-shadow: 0 0 0 70px rgba(17, 17, 17, .025), 0 0 0 140px rgba(17, 17, 17, .015);', 1)
text = text.replace('color: rgba(247, 240, 231, .72)', 'color: rgba(17, 17, 17, .58)', 1)
text = text.replace('.vas-preview-title em { color: #e4c979; font-family: var(--serif); font-weight: 500; }', '.vas-preview-title em { color: #111111; font-family: var(--sans); font-weight: 600; font-style: normal; }')
text = text.replace('border-top: 1px solid rgba(247, 240, 231, .28)', 'border-top: 1px solid rgba(17, 17, 17, .16)', 1)
text = text.replace('.secondary-link:hover,\n.folio-actions a:hover,\n.archive-link:hover { color: var(--accent); }', '.secondary-link:hover,\n.folio-actions a:hover,\n.archive-link:hover { color: var(--text); opacity: .58; }')
text = text.replace('.contact-email:hover { color: var(--accent-soft); }', '.contact-email:hover { color: var(--inverse-text); opacity: .58; }')
text = text.replace('.contact-links a:hover { color: var(--accent-soft); }', '.contact-links a:hover { color: var(--inverse-text); opacity: .58; }')
path.write_text(text, encoding='utf-8')

path = Path('case-study.css')
text = path.read_text(encoding='utf-8')
text = replace_once(text, ''':root {
  --bg: #f5f1e8;
  --surface: #fbf8f2;
  --text: #151412;
  --muted: #6f6a61;
  --line: #d8d0c3;
  --line-strong: #aaa093;
  --accent-soft: #c6a978;
  --accent: #7a5e3b;
  --inverse-bg: #151412;
  --inverse-text: #f5f1e8;
  --serif: "Noto Serif Display", Georgia, serif;
  --sans: "DM Sans", Arial, sans-serif;
  --mono: "DM Mono", monospace;''', ''':root {
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
  --mono: "Inter", Arial, sans-serif;''', 'case light tokens')
text = replace_once(text, '''[data-theme="dark"] {
  --bg: #171512;
  --surface: #201d18;
  --text: #f2ecdf;
  --muted: #aaa296;
  --line: #39342d;
  --line-strong: #645c51;
  --accent-soft: #c6a978;
  --accent: #d1b27d;
  --inverse-bg: #f2ecdf;
  --inverse-text: #171512;''', '''[data-theme="dark"] {
  --bg: #111111;
  --surface: #171717;
  --text: #f5f5f5;
  --muted: #b5b5b5;
  --line: #303030;
  --line-strong: #555555;
  --accent-soft: #f5f5f5;
  --accent: #f5f5f5;
  --inverse-bg: #111111;
  --inverse-text: #f5f5f5;''', 'case dark tokens')
text = text.replace('.case-thesis em { color: var(--accent); font-family: var(--serif); font-weight: 500; }', '.case-thesis em { color: var(--text); font-family: var(--sans); font-weight: 600; font-style: normal; }')
text = text.replace('.change-thesis em { color: var(--accent); font-family: var(--serif); }', '.change-thesis em { color: var(--text); font-family: var(--sans); font-weight: 600; font-style: normal; }')
text = text.replace('.case-action:hover { color: var(--accent); }', '.case-action:hover { color: var(--text); opacity: .58; }')
path.write_text(text, encoding='utf-8')
