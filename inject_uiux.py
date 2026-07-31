import re

with open('uiux-portfolio.html', 'r', encoding='utf-8') as f:
    uiux_content = f.read()

with open('index.html', 'r', encoding='utf-8') as f:
    idx_content = f.read()

match = re.search(r'(<section class=\"projects\" id=\"uiux-projects\"[\s\S]*?</section>)', uiux_content)
if not match:
    print('Could not find uiux-projects in uiux-portfolio.html')
    exit(1)

uiux_section = match.group(1)

if 'id=\"uiux-projects\"' in idx_content:
    print('Already in index.html')
else:
    idx_content = idx_content.replace('<footer id=\"contact\">', f'{uiux_section}\n\n    <footer id=\"contact\">')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(idx_content)
    print('Injected successfully!')
