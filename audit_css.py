import os
import re

projects = ['project1-expense-tracker', 'project2-coliving-manager', 'project3-office-order']

for proj in projects:
    print(f'=== Audit {proj} ===')
    html_path = os.path.join(proj, 'index.html')
    css_path = os.path.join(proj, 'styles.css')
    
    if not os.path.exists(html_path) or not os.path.exists(css_path):
        print('Files not found')
        continue
        
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    with open(css_path, 'r', encoding='utf-8') as f:
        css = f.read()
        
    # Extract classes from HTML
    html_classes = set()
    # Simple regex for class attribute, handles both single and double quotes
    for match in re.finditer(r'class=(["\'])(.*?)\1', html):
        for cls in match.group(2).split():
            html_classes.add(cls)
            
    # Extract defined classes in CSS
    css_classes = set()
    # Basic dot class parsing
    for match in re.finditer(r'\.([a-zA-Z0-9_-]+)', css):
        css_classes.add(match.group(1))
        
    missing = html_classes - css_classes
    # Ignore ph- icons, utilities that might be inline or standard
    missing = {c for c in missing if not c.startswith('ph-') and c != 'ph' and not c.startswith('fa-') and c != 'fas'}
    print(f'Classes in HTML but missing in CSS: {sorted(missing)}\n')
