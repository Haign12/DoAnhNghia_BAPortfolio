(() => {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuClose = document.getElementById('menuClose');
  const themeToggle = document.getElementById('themeToggle');
  const progressBar = document.getElementById('progressBar');
  const year = document.getElementById('year');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileQuery = window.matchMedia('(max-width: 900px)');
  const themeKey = 'portfolio-theme';

  root.classList.add('js');

  const readStoredTheme = () => {
    try {
      return localStorage.getItem(themeKey) || localStorage.getItem('theme');
    } catch (_) {
      return null;
    }
  };

  const storeTheme = (theme) => {
    try { localStorage.setItem(themeKey, theme); } catch (_) { /* preference persistence is optional */ }
  };

  const setTheme = (theme) => {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    storeTheme(nextTheme);
    themeToggle?.setAttribute('aria-pressed', String(nextTheme === 'dark'));
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('.theme-icon');
    const label = themeToggle.querySelector('.theme-label');
    if (icon) icon.textContent = nextTheme === 'dark' ? '☼' : '◐';
    if (label) label.textContent = nextTheme === 'dark' ? 'Light' : 'Dark';
    themeToggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };

  setTheme(readStoredTheme() || 'light');
  themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const setMenuState = (open, returnFocus = false) => {
    if (!navMenu) return;

    if (!mobileQuery.matches) {
      navMenu.classList.remove('is-open');
      navMenu.setAttribute('aria-hidden', 'false');
      menuToggle?.setAttribute('aria-expanded', 'false');
      body.classList.remove('menu-open');
      return;
    }

    navMenu.classList.toggle('is-open', open);
    navMenu.setAttribute('aria-hidden', String(!open));
    menuToggle?.setAttribute('aria-expanded', String(open));
    body.classList.toggle('menu-open', open);

    if (open) menuClose?.focus();
    else if (returnFocus) menuToggle?.focus();
  };

  menuToggle?.addEventListener('click', () => {
    if (!mobileQuery.matches) return;
    setMenuState(!navMenu?.classList.contains('is-open'));
  });
  menuClose?.addEventListener('click', () => setMenuState(false, true));
  navMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    if (mobileQuery.matches) setMenuState(false, false);
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileQuery.matches && navMenu?.classList.contains('is-open')) {
      setMenuState(false, true);
    }
  });
  mobileQuery.addEventListener?.('change', () => setMenuState(false, false));
  setMenuState(false, false);

  const updateScrollState = () => {
    const scrollTop = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = `${scrollable > 0 ? (scrollTop / scrollable) * 100 : 0}%`;
    header?.classList.toggle('is-scrolled', scrollTop > 18);
  };
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  const revealNodes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotionQuery.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -6% 0px' });
    revealNodes.forEach((node) => revealObserver.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  }

  const navSections = [...document.querySelectorAll('#work, #experience, #contact')];
  const navLinks = [...document.querySelectorAll('.nav-menu [data-nav]')];
  if ('IntersectionObserver' in window && navLinks.length) {
    const spy = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.nav === entry.target.id));
    }), { rootMargin: '-35% 0px -55% 0px' });
    navSections.forEach((section) => spy.observe(section));
  }

  /* Signature moment: readable project index + live preview.
     The row itself is always the real navigation target; preview is decorative evidence. */
  const projectRows = [...document.querySelectorAll('.project-row')];
  const projectPreview = document.getElementById('projectPreview');
  const previewImage = document.getElementById('projectPreviewImage');
  const previewVas = document.getElementById('projectPreviewVas');
  const previewTitle = document.getElementById('projectPreviewTitle');
  const previewIndex = document.getElementById('projectPreviewIndex');
  const previewType = document.getElementById('projectPreviewType');
  let previewTimer = null;
  let activeRow = projectRows.find((row) => row.classList.contains('is-active')) || projectRows[0];

  projectRows.forEach((row) => {
    const src = row.dataset.preview;
    if (!src) return;
    const preload = new Image();
    preload.src = src;
  });

  const commitPreview = (row) => {
    if (!row || !projectPreview) return;
    const kind = row.dataset.kind || 'image';

    projectRows.forEach((item) => item.classList.toggle('is-active', item === row));
    activeRow = row;

    if (previewTitle) previewTitle.textContent = row.dataset.project || '';
    if (previewIndex) previewIndex.textContent = row.dataset.index || '';
    if (previewType) previewType.textContent = row.dataset.type || '';

    projectPreview.classList.toggle('is-contain', kind === 'contain');

    if (kind === 'vas') {
      if (previewVas) previewVas.hidden = false;
      if (previewImage) previewImage.hidden = true;
    } else {
      if (previewVas) previewVas.hidden = true;
      if (previewImage) {
        previewImage.hidden = false;
        const nextSrc = row.dataset.preview;
        if (nextSrc && previewImage.getAttribute('src') !== nextSrc) previewImage.setAttribute('src', nextSrc);
      }
    }

    requestAnimationFrame(() => projectPreview.classList.remove('is-swapping'));
  };

  const selectPreview = (row) => {
    if (!row || row === activeRow || !projectPreview) return;
    window.clearTimeout(previewTimer);

    if (reducedMotionQuery.matches) {
      commitPreview(row);
      return;
    }

    projectPreview.classList.add('is-swapping');
    previewTimer = window.setTimeout(() => commitPreview(row), 170);
  };

  projectRows.forEach((row) => {
    row.addEventListener('pointerenter', () => selectPreview(row));
    row.addEventListener('focus', () => selectPreview(row));
  });

  /* Subtle hero depth: delight after clarity, disabled for reduced motion. */
  const parallaxRoot = document.querySelector('[data-parallax-root]');
  const parallaxLayers = parallaxRoot ? [...parallaxRoot.querySelectorAll('[data-parallax-layer]')] : [];

  const resetParallax = () => {
    parallaxLayers.forEach((layer) => { layer.style.translate = '0px 0px'; });
  };

  if (parallaxRoot && parallaxLayers.length) {
    parallaxRoot.addEventListener('pointermove', (event) => {
      if (reducedMotionQuery.matches) return;
      const rect = parallaxRoot.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) - .5;
      const y = ((event.clientY - rect.top) / rect.height) - .5;

      parallaxLayers.forEach((layer) => {
        const depth = Number(layer.dataset.parallaxLayer || .5);
        const dx = x * 18 * depth;
        const dy = y * 14 * depth;
        layer.style.translate = `${dx.toFixed(2)}px ${dy.toFixed(2)}px`;
      });
    });
    parallaxRoot.addEventListener('pointerleave', resetParallax);
    reducedMotionQuery.addEventListener?.('change', (event) => { if (event.matches) resetParallax(); });
  }

  /* Recruiter upgrade: make positioning and evidence clearer without overstating project reality. */
  const heroSans = document.querySelector('.hero-sans');
  if (heroSans) heroSans.textContent = 'Designing complex web & product experiences.';

  const workGuideMode = document.querySelector('.work-guide > span');
  if (workGuideMode) workGuideMode.textContent = 'Each project · Live Demo or Source Code + View Figma';

  const workGuideCount = document.querySelector('.work-guide > strong');
  if (workGuideCount) workGuideCount.textContent = '11 projects / systems';

  /* Extend the archive with the two newest independent web projects. */
  const archiveGroup = document.querySelector('[aria-labelledby="archive-projects-title"]');
  const archiveGrid = archiveGroup?.querySelector('.portfolio-proof-grid--archive');
  const archiveIndex = archiveGroup?.querySelector('.portfolio-proof-index');
  const archiveIntro = archiveGroup?.querySelector('.portfolio-proof-head p');

  if (archiveIndex) archiveIndex.textContent = 'B / 05';
  if (archiveIntro) {
    archiveIntro.textContent = 'Supporting projects extend the range into electric mobility, B2B industrial services, banking, public digital ecosystems and SaaS workspace design without competing with the main cases.';
  }

  if (archiveGrid && !archiveGrid.querySelector('.project-proof-card--voltis')) {
    const extraProjects = document.createElement('template');
    extraProjects.innerHTML = `
      <article class="project-proof-card project-proof-card--voltis reveal is-visible" style="--p-bg:#101713;--p-ink:#edf5ed;--p-accent:#69cf4d;--p-dark:#090d0a">
        <a class="project-proof-media" href="https://ngh1aa.github.io/Voltis/" target="_blank" rel="noopener noreferrer" aria-label="Open Voltis live demo">
          <div class="project-proof-topline"><span>05 / 11</span><span>EV · BRAND EXPERIENCE</span></div>
          <div class="project-proof-canvas">
            <div class="ui-preview" aria-hidden="true"><div class="ui-preview__nav"><i></i><i></i><i></i><i></i></div><div class="ui-preview__hero"><div class="ui-preview__copy"><span></span><strong>Pure electric.<br>Human centered.</strong><p></p><b></b></div><div class="ui-preview__object"></div></div></div>
            <span class="project-proof-caption">LIVE BRAND PROTOTYPE</span><span class="project-proof-badge">VI / EN</span>
          </div>
        </a>
        <div class="project-proof-body"><div class="project-proof-meta"><span class="project-reality"><strong>Independent concept</strong> · Responsive prototype</span><span class="project-year">2026</span></div><h3>Voltis</h3><p>Electric mobility brand concept combining model storytelling, bilingual navigation, energy-system visuals and responsive interaction across a company and product showcase.</p><div class="project-proof-tags"><span>Brand experience</span><span>Automotive UX</span><span>Responsive</span></div><div class="project-actions"><a href="https://ngh1aa.github.io/Voltis/" target="_blank" rel="noopener noreferrer">Live Demo ↗</a><a aria-disabled="true" title="Figma link coming soon" class="figma-link-pending">View Figma ↗</a></div></div>
      </article>

      <article class="project-proof-card project-proof-card--cennext reveal is-visible" style="--p-bg:#e8eef2;--p-ink:#102734;--p-accent:#ef842b;--p-dark:#0a1d2a">
        <a class="project-proof-media" href="https://ngh1aa.github.io/cennext-b2b-prototype/" target="_blank" rel="noopener noreferrer" aria-label="Open CENNEXT B2B prototype live demo">
          <div class="project-proof-topline"><span>06 / 11</span><span>B2B · INDUSTRIAL WEB</span></div>
          <div class="project-proof-canvas">
            <div class="ui-preview" aria-hidden="true"><div class="ui-preview__nav"><i></i><i></i><i></i><i></i></div><div class="ui-preview__hero"><div class="ui-preview__copy"><span></span><strong>Repair clarity.<br>Built for action.</strong><p></p><b></b></div><div class="ui-preview__object"></div></div></div>
            <span class="project-proof-caption">B2B WEB PROTOTYPE</span><span class="project-proof-badge">EN</span>
          </div>
        </a>
        <div class="project-proof-body"><div class="project-proof-meta"><span class="project-reality"><strong>Independent prototype</strong> · Brief-driven landing page</span><span class="project-year">2026</span></div><h3>CENNEXT B2B Prototype</h3><p>Industrial service landing page turning a dense technical brief into scan-friendly capability proof, repair-vs-replace decision support and a clear quote path.</p><div class="project-proof-tags"><span>B2B web</span><span>Long-form UX</span><span>Conversion hierarchy</span></div><div class="project-actions"><a href="https://ngh1aa.github.io/cennext-b2b-prototype/" target="_blank" rel="noopener noreferrer">Live Demo ↗</a><a aria-disabled="true" title="Figma link coming soon" class="figma-link-pending">View Figma ↗</a></div></div>
      </article>
    `;
    archiveGrid.prepend(extraProjects.content);
  }

  /* Keep project numbering truthful after the archive grows from 9 to 11 items. */
  [...document.querySelectorAll('.project-proof-card')].forEach((card, index) => {
    const indexNode = card.querySelector('.project-proof-topline span:first-child');
    if (indexNode) indexNode.textContent = `${String(index + 1).padStart(2, '0')} / 11`;
  });

  /* Personal project cards now surface Figma as the secondary proof.
     Until the user supplies each Figma URL, keep these buttons visibly present but non-navigating
     so the label never sends visitors to the old Case Study destination by mistake. */
  document.querySelectorAll('.project-actions a').forEach((link) => {
    if (!/^Case Study/i.test(link.textContent.trim())) return;
    link.textContent = 'View Figma ↗';
    link.removeAttribute('href');
    link.removeAttribute('target');
    link.removeAttribute('rel');
    link.setAttribute('aria-disabled', 'true');
    link.setAttribute('title', 'Figma link coming soon');
    link.classList.add('figma-link-pending');
  });

  /* Connect supplied Figma files to their matching portfolio projects. */
  const figmaProjectLinks = new Map([
    ['.project-proof-card--atelier', 'https://www.figma.com/design/Di6yDrXBRps8sN0hEZn66F/Atelier?m=auto&t=LykADgxvJ62WCIu7-1'],
    ['.project-proof-card--capital', 'https://www.figma.com/design/E7hF6BmKkaNv2AsJlF9kIi/RedesignCapital?m=auto&t=LykADgxvJ62WCIu7-1'],
    ['.project-proof-card--vas', 'https://www.figma.com/design/E07BqE4X8apHhziPardmDG/RedesignVAS?m=auto&t=LykADgxvJ62WCIu7-1'],
    ['.project-proof-card--voltis', 'https://www.figma.com/design/iS0ur2VbuhnLAfSHasnYgp/TRUST.vn---Layout-Website-Test---%C4%90%E1%BB%97-Anh-Ngh%C4%A9a?m=auto&t=LykADgxvJ62WCIu7-1'],
    ['.project-proof-card--cennext', 'https://www.figma.com/design/RVcp6uzpJvTMHtlS7ilQb7/CenNext---Web-Designer-Test---Do-Anh-Nghia?m=auto&t=LykADgxvJ62WCIu7-1'],
    ['.project-proof-card--vietbank', 'https://www.figma.com/design/a76mFeNL97daVeVfs8UsRW/VietBank?node-id=0-1&t=rXhD2IcSTPLQDEhI-1'],
    ['.project-proof-card--qtsc', 'https://www.figma.com/design/wugoCyDEEfzSgu0gQoyum5/QTSC?node-id=0-1&t=LykADgxvJ62WCIu7-1'],
    ['.project-proof-card--violet', 'https://www.figma.com/design/tPghPU31brDIbky1M6MCCC/violet?t=LykADgxvJ62WCIu7-1'],
  ]);

  figmaProjectLinks.forEach((url, selector) => {
    const card = document.querySelector(selector);
    if (!card) return;
    const figmaLink = [...card.querySelectorAll('.project-actions a')]
      .find((link) => /^View Figma/i.test(link.textContent.trim()));
    if (!figmaLink) return;

    figmaLink.href = url;
    figmaLink.target = '_blank';
    figmaLink.rel = 'noopener noreferrer';
    figmaLink.removeAttribute('aria-disabled');
    figmaLink.removeAttribute('title');
    figmaLink.classList.remove('figma-link-pending');
  });

  const realityLabels = new Map([
    ['Independent concept', 'Concept'],
    ['Independent redesign', 'Website redesign'],
    ['Independent prototype', 'Prototype'],
  ]);
  document.querySelectorAll('.project-reality strong').forEach((labelNode) => {
    const replacement = realityLabels.get(labelNode.textContent.trim());
    if (replacement) labelNode.textContent = replacement;
  });

  const portfolioTruthNote = document.querySelector('.portfolio-proof-note p');
  if (portfolioTruthNote) {
    portfolioTruthNote.textContent = 'Project labels distinguish concept work, redesigns, product slices and tooling so each case can be evaluated against the proof that is actually available.';
  }

  /* Use real deployed interfaces as non-interactive visual proof without nesting iframes inside links. */
  const liveProjectPreviews = [
    ['.project-proof-card--vas', 'https://ngh1aa.github.io/RedesignVAS/', 'VAS Education implemented interface'],
    ['.project-proof-card--voltis', 'https://ngh1aa.github.io/Voltis/', 'Voltis electric mobility interface'],
    ['.project-proof-card--cennext', 'https://ngh1aa.github.io/cennext-b2b-prototype/', 'CENNEXT B2B industrial service interface'],
    ['.project-proof-card--vietbank', 'https://ngh1aa.github.io/Redesign-Vietbank-Website/', 'Vietbank redesign implemented interface'],
    ['.project-proof-card--qtsc', 'https://ngh1aa.github.io/QTSC/', 'QTSC implemented interface'],
  ];
  const livePreviewSync = [];

  liveProjectPreviews.forEach(([selector, src, title]) => {
    const card = document.querySelector(selector);
    const media = card?.querySelector('.project-proof-media');
    const canvas = media?.querySelector('.project-proof-canvas');
    if (!card || !media || !canvas || card.querySelector('.project-live-frame')) return;

    card.classList.add('has-live-project-proof');
    const frameWrap = document.createElement('div');
    frameWrap.className = 'project-live-frame';
    frameWrap.setAttribute('aria-hidden', 'true');

    const frame = document.createElement('iframe');
    frame.src = src;
    frame.title = title;
    frame.loading = 'lazy';
    frame.tabIndex = -1;
    frame.setAttribute('aria-hidden', 'true');
    frame.setAttribute('referrerpolicy', 'no-referrer');
    frame.addEventListener('load', () => frameWrap.classList.add('is-loaded'), { once: true });

    frameWrap.append(frame);
    card.append(frameWrap);

    const syncFrame = () => {
      frameWrap.style.left = `${media.offsetLeft + canvas.offsetLeft}px`;
      frameWrap.style.top = `${media.offsetTop + canvas.offsetTop}px`;
      frameWrap.style.width = `${canvas.clientWidth}px`;
      frameWrap.style.height = `${canvas.clientHeight}px`;
    };
    livePreviewSync.push(syncFrame);
    requestAnimationFrame(syncFrame);
  });

  if (livePreviewSync.length) {
    let resizeFrame = 0;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => livePreviewSync.forEach((sync) => sync()));
    }, { passive: true });
  }

  /* Professional experience is surfaced next to concept work without inventing a named client case. */
  const recruiterStrip = document.querySelector('.recruiter-proof-strip');
  if (recruiterStrip && !document.querySelector('.professional-proof')) {
    const professionalProof = document.createElement('section');
    professionalProof.className = 'professional-proof';
    professionalProof.setAttribute('aria-labelledby', 'professional-proof-title');
    professionalProof.innerHTML = `
      <div class="professional-proof__head">
        <span>PROFESSIONAL DELIVERY · 2026</span>
        <h3 id="professional-proof-title">Client-facing web work at MangoAds.</h3>
        <p>Ongoing UI/UX delivery across information architecture, responsive interfaces, visual systems, interaction behavior and implementation detail.</p>
      </div>
      <div class="professional-proof__facts" aria-label="Professional delivery scope">
        <div><span>ROLE</span><strong>UI/UX Designer</strong><small>MangoAds · Vietnam</small></div>
        <div><span>SCOPE</span><strong>Structure → Interface</strong><small>User flows, hierarchy, responsive UI and visual systems.</small></div>
        <div><span>DELIVERY</span><strong>Implementation-aware</strong><small>Interaction states, responsive decisions and developer-facing detail.</small></div>
      </div>
      <div class="professional-proof__actions">
        <a href="#experience">See experience ↘</a>
        <a href="Do_Anh_Nghia_CV.pdf" target="_blank" rel="noopener">View resume ↗</a>
      </div>
      <p class="professional-proof__boundary">Named client case studies are shown only when public proof can be shared; this section represents verified role and delivery scope rather than a fabricated client outcome.</p>
    `;
    recruiterStrip.before(professionalProof);
  }

  /* Keep chronology explicit rather than compressing short roles into year-only labels. */
  const experienceRanges = [
    ['MangoAds', 'AUG 2026 — NOW', '2026-08'],
    ['Tikera', 'FEB — JUL 2025', '2025-02'],
    ['Trésor', 'JUN — DEC 2025 · REMOTE', '2025-06'],
  ];
  document.querySelectorAll('.career-row').forEach((row) => {
    const company = row.querySelector('.career-role p')?.textContent || '';
    const time = row.querySelector('time');
    const match = experienceRanges.find(([name]) => company.includes(name));
    if (!time || !match) return;
    time.textContent = match[1];
    time.setAttribute('datetime', match[2]);
  });

  document.querySelectorAll('.experience-rail > div').forEach((item) => {
    const labelNode = item.querySelector('span');
    if (labelNode?.textContent.trim() === 'SECONDARY') labelNode.textContent = 'ADDITIONAL EDUCATION';
  });

  if (year) year.textContent = new Date().getFullYear();
})();