import os
import re

# 1. Update Project 1
p1_dir = 'project1-expense-tracker'
if os.path.exists(p1_dir):
    # CSS
    css_path = os.path.join(p1_dir, 'styles.css')
    with open(css_path, 'r', encoding='utf-8') as f:
        css = f.read()
    
    css = re.sub(r'position: fixed;\s*bottom: 32px;\s*left: 32px;\s*z-index: 9999;', '', css)
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)

    # HTML
    html_path = os.path.join(p1_dir, 'index.html')
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Extract the FAB from the bottom
    fab_match = re.search(r'  <!-- System Floating Back Button -->.*?</a>', html, flags=re.DOTALL)
    if fab_match:
        fab_html = fab_match.group(0)
        # Remove from bottom
        html = html.replace(fab_html, '')
        
        # Replace logo
        logo_regex = r'<div class="sidebar-brand">.*?</div>'
        html = re.sub(logo_regex, fab_html, html, flags=re.DOTALL)
        
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html)

# 2. Update Project 2
p2_dir = 'project2-coliving-manager'
if os.path.exists(p2_dir):
    # CSS
    css_path = os.path.join(p2_dir, 'styles.css')
    with open(css_path, 'r', encoding='utf-8') as f:
        css = f.read()
    
    css = re.sub(r'position: fixed;\s*bottom: 32px;\s*left: 32px;\s*z-index: 9999;', '', css)
    # Give it white background for dark nav in P2? Or just let it be translucent. Translucent is fine.
    # Actually, in P2 dark nav, rgba(255,255,255,0.2) is perfect.
    
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)

    for file in ['dashboard.html', 'index.html', 'rooms.html', 'tenants.html']:
        path = os.path.join(p2_dir, file)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                html = f.read()
            
            # Extract FAB
            fab_match = re.search(r'  <!-- System Floating Back Button -->.*?</a>', html, flags=re.DOTALL)
            if fab_match:
                fab_html = fab_match.group(0)
                # Remove from bottom
                html = html.replace(fab_html, '')
                
                # Replace logo
                logo_regex = r'<div class="nav-brand">.*?</span>\s*</div>'
                html = re.sub(logo_regex, fab_html, html, flags=re.DOTALL)
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(html)

print('Success')
