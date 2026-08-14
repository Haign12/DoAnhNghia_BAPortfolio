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
  const themeKey = 'portfolio-theme';

  const setTheme = (theme) => {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    localStorage.setItem(themeKey, nextTheme);
    themeToggle?.setAttribute('aria-pressed', String(nextTheme === 'dark'));
    if (themeToggle) {
      themeToggle.querySelector('.theme-icon').textContent = nextTheme === 'dark' ? '☼' : '◐';
      themeToggle.querySelector('.theme-label').textContent = nextTheme === 'dark' ? 'Light' : 'Dark';
      themeToggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  };
  setTheme(localStorage.getItem(themeKey) || localStorage.getItem('theme') || 'light');
  themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const closeMenu = () => {
    const wasOpen = navMenu?.classList.contains('is-open');
    navMenu?.classList.remove('is-open');
    navMenu?.setAttribute('aria-hidden', 'true');
    menuToggle?.classList.remove('is-open');
    body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (wasOpen) menuToggle?.focus();
  };
  menuToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    navMenu.setAttribute('aria-hidden', String(!open));
    menuToggle.classList.toggle('is-open', open);
    body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    if (open) menuClose?.focus();
  });
  menuClose?.addEventListener('click', closeMenu);
  navMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
    if (event.key.toLowerCase() === 't' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    }
  });

  const updateScrollState = () => {
    const scrollTop = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = `${scrollable > 0 ? (scrollTop / scrollable) * 100 : 0}%`;
    header?.classList.toggle('is-scrolled', scrollTop > 20);
  };
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  const revealNodes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active', 'is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    revealNodes.forEach((node) => revealObserver.observe(node));
  } else revealNodes.forEach((node) => node.classList.add('active', 'is-visible'));

  const navSections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-menu [data-nav]')];
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.nav === entry.target.id));
    }), { rootMargin: '-35% 0px -55% 0px' });
    navSections.forEach((section) => spy.observe(section));
  }

  if (year) year.textContent = new Date().getFullYear();
})();
