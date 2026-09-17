(() => {
  document.documentElement.classList.add('js');

  const visibilityRepair = document.createElement('style');
  visibilityRepair.textContent = `.js .reveal{opacity:1!important;transform:none!important;transition:none!important}`;
  document.head.appendChild(visibilityRepair);

  document.querySelectorAll('a[href="Do_Anh_Nghia_UIUXDesigner_CV.pdf"]').forEach(link => {
    link.href = 'resume.html';
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });

  // Preserve old case-study deep links structurally. The outer section owns the
  // legacy #work anchor; the inner wrapper keeps the new #flagships destination.
  const flagshipSection = document.getElementById('flagships');
  if (flagshipSection && flagshipSection.tagName === 'SECTION') {
    const flagshipInner = document.createElement('div');
    flagshipInner.id = 'flagships';
    while (flagshipSection.firstChild) flagshipInner.appendChild(flagshipSection.firstChild);
    flagshipSection.id = 'work';
    flagshipSection.appendChild(flagshipInner);
  }

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

  const alignLegacyWork = () => {
    if (window.location.hash !== '#work') return;
    const target = document.getElementById('work');
    if (!target) return;
    const header = document.querySelector('.site-header');
    const offset = (header?.getBoundingClientRect().height || 0) + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, Math.max(0, top));
    requestAnimationFrame(() => { root.style.scrollBehavior = previousBehavior; });
  };
  alignLegacyWork();
  requestAnimationFrame(alignLegacyWork);
  window.addEventListener('load', alignLegacyWork, {once:true});
  document.fonts?.ready?.then(alignLegacyWork).catch(() => {});
  window.addEventListener('hashchange', alignLegacyWork);
})();
