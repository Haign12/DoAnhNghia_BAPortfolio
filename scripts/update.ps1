$files = @('case-study-p2.html', 'case-study-p3.html')
foreach ($file in $files) {
    $content = Get-Content -Path $file -Raw
    
    # 1. Update CSS
    $oldCssRegex = '(?s)\.case-title\s*\{.*?\.case-visual\s*\{[^\}]+\}'
    $newCss = @'
    .case-title { font-size: 2rem; font-weight: 800; line-height: 1.15; margin-bottom: 14px; }
    .case-copy { color: var(--text); opacity: 0.95; font-size: 16px; max-width: 720px; line-height: 1.7; }
    .case-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 24px; }
    .metric-chip { border: 1px solid var(--border); border-radius: 14px; padding: 12px; }
    .metric-value { display: block; color: var(--text); font-weight: 800; font-size: 1.15rem; }
    .metric-label { display: block; color: var(--text3); font-size: 12px; margin-top: 2px; }
    .case-section { padding: 34px; border-bottom: 1px solid var(--border); }
    .case-section:last-child { border-bottom: none; }
    .case-section h3 { font-size: 1.35rem; margin-bottom: 18px; }
    .case-section p { color: var(--text); opacity: 0.95; margin-bottom: 16px; line-height: 1.8; max-width: 720px; }
    
    .case-visual { border-radius: 18px; overflow: hidden; border: 1px solid var(--border); background: var(--bg); display: flex; align-items: center; justify-content: center; min-height: 300px; padding: 24px; }
    
    /* Back Link UX */
    .back-link {
      display: inline-flex;
      align-items: center;
      margin-bottom: 24px;
      color: var(--text2);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      padding: 8px 16px 8px 0;
      transition: color 0.2s ease;
    }
    .back-link span {
      display: inline-block;
      margin-right: 6px;
      transition: transform 0.2s ease;
    }
    .back-link:hover {
      color: var(--text);
    }
    .back-link:hover span {
      transform: translateX(-4px);
    }

    /* Sticky TOC */
    .toc-container {
      position: absolute;
      top: 0;
      left: -240px;
      width: 200px;
      height: 100%;
    }
    @media (max-width: 1400px) {
      .toc-container { display: none; }
    }
    .toc {
      position: sticky;
      top: 100px;
      padding: 16px;
      border-left: 2px solid var(--border);
    }
    .toc-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text3);
      font-weight: 700;
      margin-bottom: 12px;
    }
    .toc a {
      display: block;
      color: var(--text2);
      text-decoration: none;
      font-size: 13px;
      margin-bottom: 10px;
      line-height: 1.4;
      transition: color 0.2s;
    }
    .toc a:hover, .toc a.active {
      color: var(--text);
      font-weight: 600;
    }
    .uiux-case { position: relative; border: 1px solid var(--border); border-radius: 20px; background: var(--bg-card); }
'@
    $content = $content -replace $oldCssRegex, $newCss

    # 2. Add TOC HTML
    $tocLinks = if ($file -eq 'case-study-p2.html') {
        '<a href="#problem">1. The Problem</a><a href="#constraints">2. Constraints</a><a href="#approach">3. BA Artifacts</a><a href="#ui-design">4. Core Functions &amp; UI</a><a href="#deep-dive">5. Deep Dive</a><a href="#impact">6. Business Impact</a>'
    } else {
        '<a href="#problem">1. The Problem</a><a href="#constraints">2. Constraints</a><a href="#approach">3. BA Artifacts</a><a href="#ui-design">4. Core Functions &amp; UI</a><a href="#deep-dive">5. Deep Dive</a><a href="#edge-cases">6. Edge Cases</a><a href="#impact">7. Business Impact</a>'
    }

    $tocHtml = @"
      <!-- Sticky TOC (Desktop) -->
      <div class="toc-container">
        <div class="toc">
          <div class="toc-title">Contents</div>
          $tocLinks
        </div>
      </div>

      <div class="case-hero">
"@
    $content = $content.Replace('<div class="case-hero">', $tocHtml)

    # 3. Update Back Link
    $oldBackLink = '<a href="index.html#ba-projects" style="display: inline-block; margin-bottom: 16px; color: var(--text2); text-decoration: none; font-size: 14px;">← Back to Projects</a>'
    $newBackLink = '<a href="index.html#ba-projects" class="back-link"><span>←</span> Back to Projects</a>'
    $content = $content.Replace($oldBackLink, $newBackLink)

    # 4. Insert Hero Image
    $thumbName = if ($file -eq 'case-study-p2.html') { 'thumb-p2.png' } else { 'thumb-p3.png' }
    $imageHook = @"
        </div>
        
        <!-- Hero Image Hook: Show, Don't Tell -->
        <div style="margin-top: 40px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border);">
          <img src="$thumbName" alt="Dashboard Mockup" style="width: 100%; display: block; object-fit: cover;">
        </div>
      </div>
"@
    $content = $content -replace '</div>\s*</div>\s*<div class="case-section">', ("$imageHook`r`n`r`n      <div class=`"case-section`">")

    # 5. Add IDs to case-sections manually using Replace
    $content = $content.Replace('<div class="case-section">
        <h3>1', '<div class="case-section" id="problem">
        <h3>1')
    $content = $content.Replace('<div class="case-section">
        <h3>2', '<div class="case-section" id="constraints">
        <h3>2')
    $content = $content.Replace('<div class="case-section">
        <h3>3', '<div class="case-section" id="approach">
        <h3>3')
    $content = $content.Replace('<div class="case-section">
        <h3>4', '<div class="case-section" id="ui-design">
        <h3>4')
    $content = $content.Replace('<div class="case-section">
        <h3>5', '<div class="case-section" id="deep-dive">
        <h3>5')
    $content = $content.Replace('<div class="case-section">
        <h3>6. Business Impact', '<div class="case-section" id="impact">
        <h3>6. Business Impact')
    $content = $content.Replace('<div class="case-section">
        <h3>6. Handling Edge', '<div class="case-section" id="edge-cases">
        <h3>6. Handling Edge')
    $content = $content.Replace('<div class="case-section">
        <h3>7. Business Impact', '<div class="case-section" id="impact">
        <h3>7. Business Impact')

    # 6. Add JS
    $js = @'
    function updateIcons(theme) {
      if (theme === 'light') {
        iconDark.style.display = 'none';
        iconLight.style.display = 'block';
      } else {
        iconDark.style.display = 'block';
        iconLight.style.display = 'none';
      }
    }

    // TOC Scrollspy
    document.addEventListener('DOMContentLoaded', () => {
      const sections = document.querySelectorAll('.case-section');
      const navLinks = document.querySelectorAll('.toc a');

      function setActiveTOC() {
        let currentId = '';
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            currentId = section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }

      window.addEventListener('scroll', setActiveTOC, { passive: true });
      setActiveTOC();
    });
'@
    $content = $content -replace '(?s)function updateIcons.*?\}', $js

    Set-Content -Path $file -Value $content
}
