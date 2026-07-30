import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add tailwind config for dark mode strategy 'class'
tailwind_config = """
  <!-- Tailwind CSS & Alpine.js -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {}
      }
    }
  </script>
"""
html = re.sub(r'<!-- Tailwind CSS & Alpine.js -->\s*<script src="https://cdn.tailwindcss.com"></script>', tailwind_config, html)

# 2. Remove !important from body and .app-layout
html = re.sub(r'body \{ background: var\(--bg-main\) !important; color: var\(--text-primary\) !important;', 'body { background: var(--bg-main); color: var(--text-primary);', html)
html = re.sub(r'\.app-layout \{ display: flex; min-height: 100vh; padding: 0; gap: 0; background: var\(--bg-main\) !important; align-items: flex-start; \}', '.app-layout { display: flex; min-height: 100vh; padding: 0; gap: 0; background: var(--bg-main); align-items: flex-start; }', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
