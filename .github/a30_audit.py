import re
from pathlib import Path

ROOT = Path('.')
index = (ROOT/'index.html').read_text(encoding='utf-8')
start = index.index('<section class="section work" id="work"')
end_candidates = [p for p in [index.find('<section class="section ', start + 1), index.find('<section class="contact', start + 1)] if p != -1]
end = min(end_candidates) if end_candidates else len(index)
work = index[start:end]
card_pattern = re.compile(r'<article class="([^"]*project[^"]*)"([^>]*)>(.*?)</article>', re.S)

def clean(s):
    return re.sub(r'<[^>]+>', '', s or '').replace('&amp;', '&').strip()

def has_any(text, terms):
    t = text.lower()
    return any(term.lower() in t for term in terms)

cards = []
for i, m in enumerate(card_pattern.finditer(work), 1):
    body = m.group(3)
    h = re.search(r'<h3>(.*?)</h3>', body, re.S)
    if not h: continue
    name = clean(h.group(1))
    hrefs = re.findall(r'href="([^"]+)"', body)
    case = next((x for x in hrefs if x.startswith('case-study-') and x.endswith('.html')), None)
    figma = next((x for x in hrefs if 'figma.com/' in x), None)
    live = next((x for x in hrefs if x.startswith('http') and 'figma.com/' not in x and 'github.com/' not in x), None)
    source = next((x for x in hrefs if 'github.com/' in x), None)
    case_text = ''
    if case and (ROOT/case).exists():
        case_text = (ROOT/case).read_text(encoding='utf-8')
    markers = {
        'A27': 'A27_SENIOR_DECISION_EVIDENCE' in case_text,
        'A26': 'A26_MEASUREMENT_TARGETS' in case_text,
        'business': has_any(case_text, ['Business goal','business context','Product goal','Commercial','business value']),
        'options': has_any(case_text, ['Option A','Option B','rejected','alternatives + trade-offs']),
        'validation': has_any(case_text, ['VALIDATION STATUS','PLANNED_VALIDATION','0 verified sessions','usability','validation plan']),
        'states': has_any(case_text, ['empty state','loading state','error','recovery','disabled','offline','retry']),
        'system': has_any(case_text, ['design system','component','token','system + delivery','reusable']),
        'engineering': has_any(case_text, ['ENGINEERING REALITY','technical','implementation','responsive prototype','source code']),
    }
    # conservative artifact maturity: never infer user skill or commercial impact.
    if not case:
        level = 2 if live else 1
    else:
        score = sum(markers.values())
        if markers['A27'] and markers['A26'] and markers['business'] and markers['options'] and markers['engineering'] and markers['states']:
            level = 5 if markers['validation'] else 4
        elif score >= 5:
            level = 4
        elif score >= 3:
            level = 3
        else:
            level = 2
    cards.append((i,name,case,live,figma,source,level,markers))

print(f'A30_VISIBLE_PROJECTS={len(cards)}')
for i,name,case,live,figma,source,level,markers in cards:
    print(f'{i:02d}|{name}|L{level}|case={bool(case)}|live={bool(live)}|figma={bool(figma)}|source={bool(source)}|' + ','.join(k for k,v in markers.items() if v))

print('A30_GAPS')
for _,name,case,live,figma,source,level,markers in cards:
    gaps=[]
    if not case: gaps.append('NO_LOCAL_CASE')
    if not live: gaps.append('NO_LIVE')
    if not figma: gaps.append('NO_FIGMA_LINK')
    if case:
        for key in ['business','options','validation','states','system','engineering']:
            if not markers[key]: gaps.append('CASE_'+key.upper())
    print(name + ' :: ' + (', '.join(gaps) if gaps else 'NO_STRUCTURAL_GAP'))
