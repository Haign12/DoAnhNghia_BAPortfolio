import re
import os

filepath = r"c:\Users\LENOVO\Documents\GitHub\DoAnhNghia_BAPortfolio\index.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Reveal CSS with cubic-bezier
content = re.sub(
    r'\.reveal \{\s*opacity: 0;\s*transform: translateY\(20px\);\s*transition: opacity 0\.4s ease-out, transform 0\.4s ease-out;\s*will-change: opacity, transform;\s*\}',
    r'.reveal {\n      opacity: 0;\n      transform: translateY(24px);\n      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);\n      will-change: opacity, transform;\n    }',
    content
)

# 2. Update Project Card Hover (Glow & translate)
# Find existing .project-card:hover and replace
old_hover = r'\.project-card:hover \{\s*transform: translateY\(-4px\);\s*box-shadow: var\(--card-hover-shadow\);\s*border-color: var\(--card-hover-border\);\s*background: var\(--card-hover-bg\);\s*\}'
new_hover = r'''.project-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(255, 255, 255, 0.03);
      border-color: #555555;
      background: var(--card-hover-bg);
    }'''
content = re.sub(old_hover, new_hover, content)

# 3. Add cubic-bezier to project-card transition
content = re.sub(
    r'\.project-card \{\s*background: var\(--bg-card\);\s*border: 1px solid var\(--border\);\s*border-radius: 20px;\s*overflow: hidden;\s*transition: transform 0\.3s ease, box-shadow 0\.3s ease, border-color 0\.3s ease, background 0\.3s ease;\s*\}',
    r'''.project-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }''',
    content
)

# 4. Button Micro-interactions (directional cue)
# Check if .arrow exists, we can add styles for .card-link span.arrow
arrow_css = r'''
    .card-link .arrow {
      display: inline-block;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .card-link:hover .arrow {
      transform: translate(4px, -4px);
    }
    
    .hero-cta {
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .hero-cta:hover {
      transform: translateY(-2px);
    }
'''
if ".card-link .arrow" not in content:
    content = content.replace('/* Hero Section */', arrow_css + '\n    /* Hero Section */')

# 5. Dynamic Backdrop Blur for Sticky Nav
old_nav = r'''    /\* Sticky Navbar \*/\s*\.sticky-nav \{\s*position: sticky;\s*top: 20px;\s*z-index: 100;\s*display: flex;\s*justify-content: space-between;\s*align-items: center;\s*padding: 12px 24px;\s*margin: 16px auto 0;\s*max-width: 900px;\s*width: calc\(100% - 32px\);\s*background: rgba\(26, 26, 26, 0\.85\);\s*border: 1px solid var\(--border\);\s*border-radius: 50px;\s*backdrop-filter: blur\(12px\);\s*-webkit-backdrop-filter: blur\(12px\);\s*box-shadow: 0 4px 24px rgba\(0, 0, 0, 0\.2\);\s*\}\s*\[data-theme="light"\] \.sticky-nav \{\s*background: rgba\(255, 255, 255, 0\.85\);\s*box-shadow: 0 4px 24px rgba\(0, 0, 0, 0\.05\);\s*\}'''

new_nav = r'''    /* Sticky Navbar */
    .sticky-nav {
      position: sticky;
      top: 20px;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      margin: 16px auto 0;
      max-width: 900px;
      width: calc(100% - 32px);
      background: transparent;
      border: 1px solid transparent;
      border-radius: 50px;
      transition: background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
    }
    .sticky-nav.scrolled {
      background: rgba(26, 26, 26, 0.7);
      border-color: var(--border);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    }
    [data-theme="light"] .sticky-nav.scrolled {
      background: rgba(255, 255, 255, 0.7);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
    }'''
content = re.sub(old_nav, new_nav, content)

# 6. JS for Sticky Nav Scroll
js_scroll = r'''
    // Dynamic Navbar Scroll Effect
    const stickyNav = document.querySelector('.sticky-nav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        stickyNav.classList.add('scrolled');
      } else {
        stickyNav.classList.remove('scrolled');
      }
    }, { passive: true });
'''
if "stickyNav.classList.add('scrolled')" not in content:
    content = content.replace('// Reading Progress Bar Logic', js_scroll + '\n    // Reading Progress Bar Logic')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("index.html patched with premium animations.")
