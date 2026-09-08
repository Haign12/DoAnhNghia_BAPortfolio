(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const label = themeButton?.querySelector('[data-theme-label]');
  const themeKey = 'portfolio-theme';

  const readTheme = () => {
    try { return localStorage.getItem(themeKey) || localStorage.getItem('theme'); }
    catch (_) { return null; }
  };

  const setTheme = (theme) => {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    try { localStorage.setItem(themeKey, nextTheme); } catch (_) { /* persistence is optional */ }
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(nextTheme === 'dark'));
      themeButton.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    if (icon) icon.textContent = nextTheme === 'dark' ? '☼' : '◐';
    if (label) label.textContent = nextTheme === 'dark' ? 'Light' : 'Dark';
  };

  setTheme(readTheme() || 'light');
  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  /* Keep project reality explicit, but frame it as context rather than a warning. */
  const caseIndex = document.querySelector('.case-index');
  if (caseIndex) {
    caseIndex.textContent = caseIndex.textContent
      .replace('INDEPENDENT CONCEPT', 'SELF-INITIATED CONCEPT')
      .replace('INDEPENDENT REDESIGN', 'REDESIGN PROTOTYPE');
  }
  document.querySelectorAll('.case-boundary strong').forEach((node) => {
    if (node.textContent.trim().toUpperCase() === 'NOT CLAIMED') node.textContent = 'EVIDENCE BOUNDARY';
  });

  /* Featured cases expose real responsive prototype evidence directly in the narrative. */
  const liveProofByPage = {
    'case-study-atelier.html': {
      name: 'Atelier',
      url: 'https://ngh1aa.github.io/Atelier/',
      note: 'The public prototype is loaded directly so responsive behavior can be inspected rather than inferred from a static mockup.'
    },
    'case-study-luxroom.html': {
      name: 'LuxRoom',
      url: 'https://ngh1aa.github.io/LuxRoom/',
      note: 'The public prototype is loaded directly to show how the interface carries product detail and hierarchy across viewport sizes.'
    },
    'case-study-capital-place.html': {
      name: 'Capital Place',
      url: 'https://ngh1aa.github.io/Capital/',
      note: 'The public prototype is loaded directly to make the leasing hierarchy, navigation and responsive behavior inspectable.'
    },
    'case-study-vas-education.html': {
      name: 'VAS Education',
      url: 'https://ngh1aa.github.io/RedesignVAS/',
      note: 'The public prototype is loaded directly to show how admissions, programs and campus context behave as a responsive system.'
    },
  };

  const pageName = window.location.pathname.split('/').pop() || '';
  const liveProof = liveProofByPage[pageName];
  if (liveProof && !document.querySelector('.case-live-evidence')) {
    const interfaceSection = [...document.querySelectorAll('.case-section')].find((section) => {
      const sectionLabel = section.querySelector('.case-section-label')?.textContent || '';
      return sectionLabel.toUpperCase().includes('INTERFACE PROOF');
    });

    if (interfaceSection) {
      const section = document.createElement('section');
      section.className = 'case-section case-live-evidence';
      section.innerHTML = `
        <header class="case-section-head">
          <span class="case-section-label">LIVE PROOF / RESPONSIVE SURFACES</span>
          <h2>Inspect the implemented interface at desktop and mobile widths</h2>
        </header>
        <div class="case-section-body">
          <div class="case-live-proof-intro">
            <p>${liveProof.note}</p>
            <a href="${liveProof.url}" target="_blank" rel="noopener noreferrer">Open ${liveProof.name} prototype ↗</a>
          </div>
          <div class="case-live-proof-grid">
            <figure class="case-live-browser case-live-browser--desktop">
              <figcaption><span>DESKTOP / LIVE PROTOTYPE</span><small>Wide layout and hierarchy</small></figcaption>
              <div class="case-live-viewport"><iframe src="${liveProof.url}" title="${liveProof.name} desktop live prototype" loading="lazy" tabindex="-1" aria-hidden="true" referrerpolicy="no-referrer"></iframe></div>
            </figure>
            <figure class="case-live-browser case-live-browser--mobile">
              <figcaption><span>MOBILE / LIVE PROTOTYPE</span><small>Responsive prioritization</small></figcaption>
              <div class="case-live-viewport"><iframe src="${liveProof.url}" title="${liveProof.name} mobile live prototype" loading="lazy" tabindex="-1" aria-hidden="true" referrerpolicy="no-referrer"></iframe></div>
            </figure>
          </div>
        </div>
      `;
      interfaceSection.after(section);
    }
  }

  const sections = [...document.querySelectorAll('.case-section[id]')];
  const tocLinks = [...document.querySelectorAll('.toc a')];
  if ('IntersectionObserver' in window && sections.length && tocLinks.length) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      tocLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }), { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach((section) => observer.observe(section));
  }
})();
