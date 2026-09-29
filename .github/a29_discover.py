import re
from pathlib import Path

html = Path('index.html').read_text(encoding='utf-8')
start = html.index('<section class="section work" id="work">')
end_candidates = [p for p in [html.find('<section class="section ', start + 1), html.find('<section class="contact', start + 1)] if p != -1]
end = min(end_candidates) if end_candidates else len(html)
work = html[start:end]

cards = re.findall(r'<article class="([^"]*project[^"]*)"([^>]*)>(.*?)</article>', work, re.S)
print(f'A29_DISCOVERED_CARDS={len(cards)}')
for i, (classes, attrs, body) in enumerate(cards, 1):
    name_m = re.search(r'<h3>(.*?)</h3>', body, re.S)
    type_m = re.search(r'<span class="project-type">(.*?)</span>', body, re.S)
    summary_m = re.search(r'<p class="project-summary">(.*?)</p>', body, re.S) or re.search(r'<p>(.*?)</p>', body, re.S)
    data_project = re.search(r'data-project="([^"]+)"', attrs)
    name = re.sub('<[^>]+>', '', name_m.group(1)).strip() if name_m else 'UNKNOWN'
    ptype = re.sub('<[^>]+>', '', type_m.group(1)).strip() if type_m else 'UNKNOWN'
    summary = re.sub('<[^>]+>', '', summary_m.group(1)).strip() if summary_m else ''
    print(f'{i:02d}|{name}|{ptype}|data={data_project.group(1) if data_project else ""}|classes={classes}|summary={summary[:180]}')
