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
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    if (label) label.textContent = nextTheme === 'dark' ? 'Sáng' : 'Tối';
    themeToggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
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
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
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

  if (year) year.textContent = new Date().getFullYear();
})();
