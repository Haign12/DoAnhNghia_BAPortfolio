import re

with open('index.html', 'r', encoding='utf-8') as f:
    idx_content = f.read()

# Add darkMode: 'class' to tailwind config
idx_content = idx_content.replace('tailwind.config = {', "tailwind.config = {\n      darkMode: 'class',")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(idx_content)

with open('app.js', 'r', encoding='utf-8') as f:
    app_content = f.read()

# Fix list-style in breadcrumb
app_content = app_content.replace('<ol class="flex items-center gap-1.5">', '<ol class="flex items-center gap-1.5 list-none m-0 p-0">')

# Also fix any potential outline on buttons
app_content = app_content.replace('<button class="inline-flex', '<button class="inline-flex focus:outline-none')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_content)

print("Fixed dark mode issue and list styling")
