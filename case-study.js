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
      themeButton.setAttribute('aria-label', nextTheme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
    }
    if (icon) icon.textContent = nextTheme === 'dark' ? '☼' : '◐';
    if (label) label.textContent = nextTheme === 'dark' ? 'Sáng' : 'Tối';
  };

  setTheme(readTheme() || 'light');
  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

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
