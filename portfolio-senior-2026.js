(() => {
  document.documentElement.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menu = document.getElementById('menuToggle');
  const nav = document.getElementById('navLinks');
  const closeNav = () => {
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded','false');
  };
  menu?.addEventListener('click', () => {
    const open = !nav?.classList.contains('open');
    nav?.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeNav(); }, {passive:true});

  // Older case studies link back to #work. Re-align after layout/font settling so
  // the compatibility hash reliably lands on the recruiter-priority flagship section.
  const alignLegacyWork = () => {
    if (window.location.hash !== '#work') return;
    const target = document.getElementById('flagships');
    if (!target) return;
    const header = document.querySelector('.site-header');
    const offset = (header?.getBoundingClientRect().height || 0) + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({top: Math.max(0, top), behavior: 'auto'});
  };
  requestAnimationFrame(alignLegacyWork);
  window.addEventListener('load', alignLegacyWork, {once:true});
  document.fonts?.ready?.then(alignLegacyWork).catch(() => {});
  window.addEventListener('hashchange', alignLegacyWork);

  const items = [...document.querySelectorAll('.reveal')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold:.08, rootMargin:'0px 0px -7% 0px'});
    items.forEach(item => observer.observe(item));
  }
})();
