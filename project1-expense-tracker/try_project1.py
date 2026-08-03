import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all view-sections and wrap their inner contents
# But wait, some sections already have a card background.
# We will just inject Tailwind CDN into project1 as well to support the layout classes
tailwind_script = '''
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      corePlugins: { preflight: false }
    }
  </script>
'''

if 'cdn.tailwindcss.com' not in content:
    content = content.replace('</head>', f'{tailwind_script}</head>')

# Wrap the contents of each .view-section
# To be safe, we will just find all <div id="view-..." class="view-section...">
# and inject the wrapper right inside them, wrapping their current content.
# Since python regex for HTML is tricky, we can do it via a simple replacement logic:
view_pattern = r'(<div id="view-[a-zA-Z0-9-]+" class="view-section(?: active)?">)\s*(?!<div class="mx-auto)([\s\S]*?)(?=</div>\s*<!-- ============ VIEW:)'
# Wait, this regex is too fragile.

print("Not applying to project1 yet. Too risky to break project1 layout blindly.")
