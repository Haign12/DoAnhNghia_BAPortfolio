(() => {
  document.documentElement.classList.add('js');

  // Content must never depend on animation/observer timing. Keep motion as an
  // optional enhancement, not a visibility gate.
  const visibilityRepair = document.createElement('style');
  visibilityRepair.textContent = `.js .reveal{opacity:1!important;transform:none!important;transition:none!important}`;
  document.head.appendChild(visibilityRepair);

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
})();
