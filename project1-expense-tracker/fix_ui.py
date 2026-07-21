import os
import re

base_dir = r"c:\Users\LENOVO\Documents\GitHub\DoAnhNghia_BAPortfolio\project1-expense-tracker"

# 1. Update styles.css
styles_path = os.path.join(base_dir, "styles.css")
with open(styles_path, 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace("--text-secondary: #6B6378;", "--text-secondary: #595959;")
css = css.replace("--text-muted: #9E96AA;", "--text-muted: #737373;")
css = re.sub(r'\.kpi-card\.featured\s*\{[^}]+\}', '.kpi-card.featured {\n  background: linear-gradient(135deg, var(--purple-500), var(--purple-300));\n  border-color: transparent;\n  color: #fff;\n}', css)
css = re.sub(r'\.sidebar-nav-item\.active\s*\{', '.sidebar-nav-item.active::before {\n  content: \'\';\n  position: absolute;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  height: 24px;\n  width: 4px;\n  background: var(--purple-500);\n  border-radius: 0 4px 4px 0;\n}\n.sidebar-nav-item.active {', css)
css = re.sub(r'\.tooltip\s*\{[^\}]+background:\s*var\(--sidebar-bg\);[^\}]+color:\s*#fff;', '.tooltip {\n  position: absolute;\n  left: calc(100% + 12px);\n  top: 50%;\n  transform: translateX(-8px) translateY(-50%);\n  background: #1F2937;\n  color: #fff;\n  padding: 6px 12px;\n  border-radius: 8px;', css)

if '.btn-outline' not in css:
    css += "\n.btn-outline {\n  background: transparent;\n  color: var(--purple-500);\n  border: 1.5px solid var(--purple-500);\n}\n.btn-outline:hover {\n  background: var(--purple-100);\n}\n"

if '.btn-link' not in css:
    css += "\n.btn-link {\n  background: transparent;\n  border: none;\n  text-decoration: underline;\n  cursor: pointer;\n  padding: 0;\n  height: auto;\n}\n.text-red { color: var(--red-500); }\n"

css = re.sub(r'(\.form-input\s*\{)', r'\1\n  height: 42px;', css)
css = re.sub(r'(\.btn\s*\{)', r'\1\n  height: 42px;', css)

css = css.replace("background: var(--bg-main);\n  color: var(--text-secondary);", "background: #FCE8E8;\n  color: var(--red-500);")

with open(styles_path, 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Update index.html
index_path = os.path.join(base_dir, "index.html")
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('points="0,14 10,16 20,12 30,18 40,20 50,16 60,22"', 'points="0,22 10,20 20,24 30,16 40,18 50,10 60,4"')
html = html.replace('class="btn btn-primary" style="margin-right: 12px;">Download CSV', 'class="btn btn-outline" style="margin-right: 12px;">Download CSV')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)

# 3. Update analytics.html and cashflow.html
for file in ["analytics.html", "cashflow.html"]:
    filepath = os.path.join(base_dir, file)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace("barThickness: 18", "barThickness: 36")
        content = content.replace("backgroundColor: '#2D2838'", "backgroundColor: '#1F2937'")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

# 4. Update transactions.html
tx_path = os.path.join(base_dir, "transactions.html")
if os.path.exists(tx_path):
    with open(tx_path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace("-$", "$")
    with open(tx_path, 'w', encoding='utf-8') as f:
        f.write(content)

# 5. Update subscriptions.html
sub_path = os.path.join(base_dir, "subscriptions.html")
if os.path.exists(sub_path):
    with open(sub_path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('class="btn btn-danger"', 'class="btn btn-link text-red"')
    with open(sub_path, 'w', encoding='utf-8') as f:
        f.write(content)

# 6. Update app.js (tooltip color just in case)
app_path = os.path.join(base_dir, "app.js")
if os.path.exists(app_path):
    with open(app_path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace("backgroundColor: '#2D2838'", "backgroundColor: '#1F2937'")
    with open(app_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updates applied successfully.")
