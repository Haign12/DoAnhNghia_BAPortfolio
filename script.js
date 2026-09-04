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

  if (year) year.textContent = new Date().getFullYear();
})();
