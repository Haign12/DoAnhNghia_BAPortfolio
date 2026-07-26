import os
import re

files = ["case-study-p1.html", "case-study-p2.html", "case-study-p3.html"]

nav_replacement = """  <nav class="sticky-nav">
    <a href="index.html" class="nav-brand" style="display:flex; align-items:center; gap:8px;">
      <i class="ph ph-arrow-left"></i> <span data-i18n="nav.back">Portfolio</span>
    </a>
    <div style="display: flex; align-items: center; gap: 12px; margin-left: auto;">
      <div class="lang-switcher" style="display: flex; gap: 6px; font-size: 13px; font-weight: 600;">
        <span id="lang-vi" style="cursor: pointer; opacity: 0.5;">VI</span>
        <span style="opacity: 0.3;">|</span>
        <span id="lang-en" style="cursor: pointer; font-weight: bold;">EN</span>
      </div>
    </div>
  </nav>"""

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Replace nav
    content = re.sub(r'<nav class="sticky-nav">.*?</nav>', nav_replacement, content, flags=re.DOTALL)
    
    # 2. Remove old back-link
    content = re.sub(r'<a href="index\.html#ba-projects" class="back-link">.*?</a>', '', content, flags=re.DOTALL)

    with open(file, "w", encoding="utf-8") as f:
        f.write(content)
print("Updated navbars and back links.")
