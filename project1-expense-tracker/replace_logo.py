import os
import re
import glob

base_dir = r"c:\Users\LENOVO\Documents\GitHub\DoAnhNghia_BAPortfolio\project1-expense-tracker"
html_files = glob.glob(os.path.join(base_dir, "*.html"))

logo_pattern = re.compile(r'<div class="sidebar-logo">\s*<i class="ph ph-hexagon" style="font-size: 22px;"></i>\s*</div>', re.MULTILINE)
new_logo = '''    <a href="../index.html#ba-projects" class="sidebar-logo" data-tooltip="Back to Portfolio">
      <i class="ph ph-arrow-left" style="font-size: 22px;"></i>
      <span class="tooltip">Portfolio</span>
    </a>'''

bottom_pattern = re.compile(r'\s*<div class="sidebar-bottom">\s*<a href="\.\./index\.html#ba-projects" class="sidebar-back" data-tooltip="Portfolio">\s*<i class="ph ph-arrow-left" style="font-size: 20px;"></i>\s*<span class="tooltip">Back to Portfolio</span>\s*</a>\s*</div>', re.MULTILINE | re.DOTALL)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = logo_pattern.sub(new_logo, content)
    content = bottom_pattern.sub('', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

# Update CSS
styles_path = os.path.join(base_dir, "styles.css")
with open(styles_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Make sidebar-logo act like a link with a tooltip
if 'sidebar-logo[data-tooltip]' not in css:
    css = css.replace('.sidebar-logo {', '.sidebar-logo {\n  text-decoration: none;\n  position: relative;\n  cursor: pointer;')
    css = css.replace('.sidebar-logo svg { color: #fff; }', '.sidebar-logo svg { color: #fff; }\n.sidebar-logo:hover { opacity: 0.9; transform: translateY(-1px); transition: all 0.2s; }\n.sidebar-logo[data-tooltip]:hover .tooltip {\n  opacity: 1;\n  transform: translateX(0);\n}')

with open(styles_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Logo replaced and CSS updated successfully.")
