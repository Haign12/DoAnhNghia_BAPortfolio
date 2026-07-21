import os
import re
import glob

base = r"c:\Users\LENOVO\Documents\GitHub\DoAnhNghia_BAPortfolio"

# The demo bar HTML snippet
demo_bar_html = '''<!-- Portfolio Demo Bar -->
<div class="portfolio-demo-bar">
  <div class="demo-info">
    <span class="live-dot"></span>
    <span class="demo-text">Interactive Prototype</span>
  </div>
  <a href="https://haign12.github.io/DoAnhNghia_BAPortfolio/" class="back-portfolio-btn">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
    Back to Portfolio
  </a>
</div>
<!-- End: Portfolio Demo Bar -->
'''

# The demo bar CSS
demo_bar_css = '''
/* --- PORTFOLIO DEMO BAR --- */
body {
  padding-top: 48px !important;
}

.portfolio-demo-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background-color: #111111;
  border-bottom: 1px solid #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  z-index: 99999;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
}

.demo-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.live-dot {
  width: 8px;
  height: 8px;
  background-color: #00e676;
  border-radius: 50%;
  box-shadow: 0 0 8px #00e676;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0.5; }
}

.demo-text {
  color: #a1a1aa;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.back-portfolio-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 6px 16px;
  border-radius: 100px;
  transition: all 0.2s ease;
}

.back-portfolio-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transform: translateX(-2px);
}
'''

# ========== PROJECT 1 ==========
p1_dir = os.path.join(base, "project1-expense-tracker")
p1_files = glob.glob(os.path.join(p1_dir, "*.html"))

for f in p1_files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    # Remove any existing demo bar
    content = re.sub(r'<!-- Portfolio Demo Bar -->.*?<!-- End: Portfolio Demo Bar -->\s*', '', content, flags=re.DOTALL)
    
    # Add demo bar right after <body>
    content = content.replace('<body>', '<body>\n' + demo_bar_html)
    
    # Restore the original Logo (undo the arrow-left replacement)
    old_logo = re.compile(r'<a href="\.\./index\.html#ba-projects" class="sidebar-logo"[^>]*>\s*<i class="ph ph-arrow-left"[^>]*></i>\s*<span class="tooltip">Portfolio</span>\s*</a>', re.DOTALL)
    new_logo = '''<div class="sidebar-logo">
      <i class="ph ph-hexagon" style="font-size: 22px;"></i>
    </div>'''
    content = old_logo.sub(new_logo, content)
    
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)

# Add CSS to P1 styles.css
p1_css = os.path.join(p1_dir, "styles.css")
with open(p1_css, 'r', encoding='utf-8') as f:
    css = f.read()
# Remove old demo bar css if exists
css = re.sub(r'/\* --- PORTFOLIO DEMO BAR ---.*?(?=\n/\*|\Z)', '', css, flags=re.DOTALL)
# Remove the sidebar-logo link styles we added earlier
css = re.sub(r'\.sidebar-logo:hover \{[^}]+\}\n', '', css)
css = re.sub(r'\.sidebar-logo\[data-tooltip\]:hover \.tooltip \{[^}]+\}\n', '', css)
css += demo_bar_css
with open(p1_css, 'w', encoding='utf-8') as f:
    f.write(css)

print("Project 1: Done")

# ========== PROJECT 2 ==========
p2_dir = os.path.join(base, "project2-coliving-manager")
p2_files = glob.glob(os.path.join(p2_dir, "*.html"))

for f in p2_files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    # Remove existing demo bar
    content = re.sub(r'<!-- Portfolio Demo Bar -->.*?<!-- End: Portfolio Demo Bar -->\s*', '', content, flags=re.DOTALL)
    
    # Add demo bar right after <body>
    content = content.replace('<body>', '<body>\n' + demo_bar_html)
    
    # Remove the old floating back button
    content = re.sub(
        r'\s*<!-- System Floating Back Button -->\s*<a href="\.\./index\.html#ba-projects" class="portfolio-fab"[^>]*>.*?</a>',
        '', content, flags=re.DOTALL
    )
    
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)

# Add CSS to P2 styles.css
p2_css = os.path.join(p2_dir, "styles.css")
with open(p2_css, 'r', encoding='utf-8') as f:
    css = f.read()
css = re.sub(r'/\* --- PORTFOLIO DEMO BAR ---.*?(?=\n/\*|\Z)', '', css, flags=re.DOTALL)
css += demo_bar_css
with open(p2_css, 'w', encoding='utf-8') as f:
    f.write(css)

print("Project 2: Done")

# ========== PROJECT 3 ==========
p3_dir = os.path.join(base, "project3-office-order")
p3_file = os.path.join(p3_dir, "index.html")

with open(p3_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove existing demo bar
content = re.sub(r'<!-- Portfolio Demo Bar -->.*?<!-- End: Portfolio Demo Bar -->\s*', '', content, flags=re.DOTALL)

# Add demo bar right after <body>
content = content.replace('<body>', '<body>\n' + demo_bar_html)

# Remove the old back button in topbar
content = re.sub(
    r'\s*<a href="\.\./index\.html#ba-projects" class="topbar-back">\s*<div class="portfolio-fab-icon">.*?</a>',
    '', content, flags=re.DOTALL
)

with open(p3_file, 'w', encoding='utf-8') as f:
    f.write(content)

# Add CSS to P3 styles.css
p3_css = os.path.join(p3_dir, "styles.css")
with open(p3_css, 'r', encoding='utf-8') as f:
    css = f.read()
css = re.sub(r'/\* --- PORTFOLIO DEMO BAR ---.*?(?=\n/\*|\Z)', '', css, flags=re.DOTALL)
css += demo_bar_css
with open(p3_css, 'w', encoding='utf-8') as f:
    f.write(css)

print("Project 3: Done")
print("All 3 projects updated!")
