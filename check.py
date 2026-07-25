import os, re
base = '.'
htmls = []
for r, d, fs in os.walk(base):
    for f in fs:
        if f.endswith('.html'):
            htmls.append(os.path.join(r, f))
res = set()
for h in htmls:
    with open(h, encoding='utf-8', errors='ignore') as f:
        content = f.read()
    links = re.findall(r'href=[\'\"]([^\'\"]+)[\'\"]', content)
    for link in links:
        if not link.startswith('http') and not link.startswith('#') and not link.startswith('javascript'):
            res.add((h, link))
for h, link in res:
    target = link.split('#')[0].split('?')[0]
    if target == '': continue
    target_path = os.path.join(os.path.dirname(h), target)
    if not os.path.exists(target_path):
        print(f'{h}: missing {link}')
