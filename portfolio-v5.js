(() => {
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const accentStyle = document.createElement('style');
  accentStyle.textContent = `
    :root,
    html[data-theme="dark"] {
      --signal:#ff7043;
      --signal-ink:#0b0d10;
    }
    .cursor-glow {
      background:radial-gradient(circle,rgba(255,112,67,.20),rgba(255,112,67,0) 68%) !important;
    }
  `;
  document.head.appendChild(accentStyle);

  // Recruiter-priority CTAs: make Live Prototype / Live Site / Figma visually explicit.
  // The links remain usable without JS; this layer only strengthens hierarchy.
  const actionStyle = document.createElement('style');
  actionStyle.textContent = `
    .action-highlight {
      display:inline-flex !important;
      align-items:center;
      justify-content:center;
      min-height:44px;
      padding:11px 15px !important;
      background:#fff !important;
      color:#0b0d10 !important;
      border:1px solid #0b0d10 !important;
      box-shadow:3px 3px 0 #0b0d10;
      text-decoration:none !important;
      font-weight:750 !important;
      transition:transform .18s ease,background .18s ease,color .18s ease,box-shadow .18s ease !important;
    }
    .action-highlight:hover,
    .action-highlight:focus-visible {
      background:#0b0d10 !important;
      color:#fff !important;
      border-color:#fff !important;
      box-shadow:3px 3px 0 #fff;
      transform:translate(-1px,-1px);
    }
    .case-actions > a:not(.action-highlight) {
      align-self:center;
      text-decoration:underline;
      text-underline-offset:4px;
      opacity:.78;
    }
    .case-actions > a:not(.action-highlight):hover,
    .case-actions > a:not(.action-highlight):focus-visible {
      opacity:1;
    }
    @media (max-width:640px) {
      .case-actions .action-highlight {
        width:100%;
      }
    }
  `;
  document.head.appendChild(actionStyle);

  document.querySelectorAll('.case-actions a, .system-card a').forEach(link => {
    const label = link.textContent.trim().toLowerCase();
    if (label.includes('live prototype') || label.includes('live site') || label.includes('figma')) {
      link.classList.add('action-highlight');
    }
  });

  // Theme: respect saved preference first, OS preference second.
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  root.dataset.theme = initialTheme;
  if (themeToggle) themeToggle.setAttribute('aria-pressed', String(initialTheme === 'dark'));

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('portfolio-theme', next);
    themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
  });

  // Mobile navigation.
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const closeMenu = () => {
    navLinks?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  };
  menuToggle?.addEventListener('click', () => {
    const open = !navLinks?.classList.contains('is-open');
    navLinks?.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  }, {passive:true});

  // Reveal is enhancement only: content is visible immediately when motion is reduced or JS fails to observe.
  const revealItems = [...document.querySelectorAll('.reveal')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, {rootMargin:'0px 0px -8% 0px',threshold:0.08});
    revealItems.forEach(item => revealObserver.observe(item));
  }

  // Reading progress gives orientation without blocking navigation.
  const progress = document.getElementById('readingProgress');
  const updateProgress = () => {
    if (!progress) return;
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
    progress.style.width = `${pct}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, {passive:true});
  window.addEventListener('resize', updateProgress, {passive:true});

  // Accessible capability tabs.
  const tabs = [...document.querySelectorAll('[role="tab"][data-signal]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"][data-panel]')];
  const activateTab = (tab, moveFocus = false) => {
    const key = tab.dataset.signal;
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => {
      const active = panel.dataset.panel === key;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
    if (moveFocus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      activateTab(tabs[nextIndex], true);
    });
  });

  // Pointer glow: a subtle visual signature, disabled for touch/reduced motion.
  const glow = document.querySelector('.cursor-glow');
  if (!reduceMotion && glow && window.matchMedia('(pointer:fine)').matches) {
    let raf = 0;
    window.addEventListener('pointermove', event => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;
      });
    }, {passive:true});
    body.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    body.addEventListener('mouseenter', () => { glow.style.opacity = '.28'; });
  } else if (glow) {
    glow.remove();
  }

  // Keep external destinations explicit for assistive-tech users.
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.getAttribute('aria-label')) {
      const clean = link.textContent.trim().replace(/↗/g,'').trim();
      link.setAttribute('aria-label', `${clean} (opens in a new tab)`);
    }
  });
})();
