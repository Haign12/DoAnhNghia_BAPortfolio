import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add Tailwind & Alpine CDNs to <head>
head_addition = '''
  <!-- Tailwind CSS & Alpine.js -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <style>
    /* Prevent vanilla CSS clashes */
    .view-section { display: none; }
    .view-section.active { display: block; }
  </style>
'''
if 'tailwindcss' not in html:
    html = html.replace('</head>', head_addition + '</head>')

# 2. Add x-data to body
html = html.replace('<body>', '<body x-data="{ sidebarToggle: false, darkMode: false }">')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
