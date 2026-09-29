from pathlib import Path

root = Path(__file__).resolve().parents[1]
index_path = root / 'index.html'
qa_path = root / 'qa' / 'portfolio-v5.spec.mjs'

html = index_path.read_text(encoding='utf-8')
old = '<button class="filter" aria-pressed="false" data-filter="culture">Culture &amp; Experimental <b>1</b></button>'
new = '<button class="filter" aria-pressed="false" data-filter="culture">Culture &amp; Experimental <b>2</b></button>'
if old not in html:
    if new not in html:
        raise SystemExit('Culture filter source count not found')
else:
    html = html.replace(old, new, 1)

if html.count('<span class="project-no">') != 14:
    raise SystemExit(f'Expected 14 raw project numbers, found {html.count("<span class=\"project-no\">")}')
if html.count('data-project="hue-between-river-citadel"') != 1:
    raise SystemExit('Expected exactly one static Huế project card')
if '<a href="#">Case ↗</a>' in html:
    raise SystemExit('Raw Case placeholder remains')
if 'portfolio-product-upgrade.js' in html:
    raise SystemExit('Runtime source-truth patch reference remains')

index_path.write_text(html, encoding='utf-8')

qa = qa_path.read_text(encoding='utf-8')
needle = "    expect(source).toContain('data-project=\"hue-between-river-citadel\"');\n"
addition = "    expect(source).toContain('data-project=\"hue-between-river-citadel\"');\n    expect(source).toContain('Culture &amp; Experimental <b>2</b>');\n    expect((source.match(/<span class=\"project-no\">/g) || []).length).toBe(14);\n"
if addition not in qa:
    if needle not in qa:
        raise SystemExit('Raw source test insertion point not found')
    qa = qa.replace(needle, addition, 1)
qa_path.write_text(qa, encoding='utf-8')

print('A21 postcheck fixed Culture filter count and hardened raw-source count assertions')
