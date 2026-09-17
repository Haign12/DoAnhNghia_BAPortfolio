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

  // Older case studies link back to #work. Preserve that deep link while the new
  // homepage uses #flagships as the recruiter-priority destination.
  if (window.location.hash === '#work') {
    requestAnimationFrame(() => document.getElementById('flagships')?.scrollIntoView({block:'start'}));
  }

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
