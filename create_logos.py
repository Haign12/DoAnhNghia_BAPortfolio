import os
import re
import glob

base = r"c:\Users\LENOVO\Documents\GitHub\DoAnhNghia_BAPortfolio"

# ========== PROJECT 1 ==========
p1_dir = os.path.join(base, "project1-expense-tracker")
p1_files = glob.glob(os.path.join(p1_dir, "*.html"))

p1_svg = '''<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fill-opacity="0.95"/>
          <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.75"/>
          <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.75"/>
        </svg>'''

for f in p1_files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    # Replace the hexagon icon inside sidebar-logo
    content = re.sub(
        r'(<div class="sidebar-logo">\s*)<i class="ph ph-hexagon"[^>]*></i>(\s*</div>)',
        r'\1' + p1_svg + r'\2',
        content
    )
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)

print("P1 Done")

# ========== PROJECT 2 ==========
p2_dir = os.path.join(base, "project2-coliving-manager")
p2_files = glob.glob(os.path.join(p2_dir, "*.html"))

p2_logo = '''<div class="nav-brand">
      <div class="nav-brand-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 10L12 3L21 10" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 10V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V10" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 21V14H15V21" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="nav-brand-name">Co<span style="color: #60A5FA;">Space.</span></span>
    </div>'''

for f in p2_files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    # Check if nav-brand exists
    if 'class="nav-brand"' not in content:
        # Insert before nav-links
        content = re.sub(
            r'(<nav class="top-nav">\s*)(<div class="nav-links">)',
            r'\1' + p2_logo + r'\n    \2',
            content
        )
    else:
        # Replace existing nav-brand block
        content = re.sub(
            r'<div class="nav-brand">.*?</span>\s*</div>',
            p2_logo,
            content,
            flags=re.DOTALL
        )
    
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)

print("P2 Done")

# ========== PROJECT 3 ==========
p3_dir = os.path.join(base, "project3-office-order")
p3_files = glob.glob(os.path.join(p3_dir, "*.html"))

p3_logo = '''<div class="topbar-logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 8L12 13L3 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 16V8L12 3L3 8V16L12 21L21 16Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 21V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="topbar-title">Order<span style="color: var(--teal);">Flow</span></div>'''

for f in p3_files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    content = re.sub(
        r'<div class="topbar-logo">.*?<div class="topbar-title">OrderFlow</div>',
        p3_logo,
        content,
        flags=re.DOTALL
    )
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)

print("P3 Done")
