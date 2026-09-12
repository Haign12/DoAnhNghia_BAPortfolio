(() => {
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Strict monochrome portfolio chrome: black, white and neutral grays only.
  const monochromeStyle = document.createElement('style');
  monochromeStyle.textContent = `
    :root {
      --paper:#ffffff;
      --paper-2:#f3f3f3;
      --ink:#0a0a0a;
      --ink-soft:#242424;
      --muted:#666666;
      --line:rgba(10,10,10,.16);
      --line-strong:rgba(10,10,10,.42);
      --signal:#0a0a0a;
      --signal-ink:#ffffff;
      --violet:#0a0a0a;
    }
    html[data-theme="dark"] {
      --paper:#0a0a0a;
      --paper-2:#151515;
      --ink:#f7f7f7;
      --ink-soft:#dedede;
      --muted:#9d9d9d;
      --line:rgba(247,247,247,.16);
      --line-strong:rgba(247,247,247,.42);
      --signal:#f7f7f7;
      --signal-ink:#0a0a0a;
    }
    .cursor-glow {
      background:radial-gradient(circle,rgba(0,0,0,.08),rgba(0,0,0,0) 68%) !important;
    }
    html[data-theme="dark"] .cursor-glow {
      background:radial-gradient(circle,rgba(255,255,255,.08),rgba(255,255,255,0) 68%) !important;
    }
    body img,
    .case-media img,
    .portrait-frame img {
      filter:grayscale(1) contrast(1.03) !important;
    }
    .work {
      background:var(--paper) !important;
      color:var(--ink) !important;
      border-top:1px solid var(--line-strong);
    }
    .work .section-id,
    .work .section-kicker,
    .work .section-summary { color:var(--muted) !important; }
    .work .section-id span:first-child {
      border-color:var(--line-strong) !important;
      color:var(--ink) !important;
    }
    .project-groups { display:grid; gap:clamp(74px,9vw,130px); }
    .project-group { display:grid; gap:30px; }
    .project-group-head {
      display:grid;
      grid-template-columns:minmax(220px,.62fr) minmax(0,1fr);
      gap:30px;
      align-items:end;
      padding-top:18px;
      border-top:1px solid var(--line-strong);
    }
    .project-group-index {
      font-family:var(--font-mono);
      font-size:9px;
      font-weight:700;
      letter-spacing:.1em;
      text-transform:uppercase;
      color:var(--muted);
    }
    .project-group-head h3 {
      margin:0;
      font-size:clamp(30px,4vw,58px);
      line-height:.95;
      letter-spacing:-.055em;
      font-weight:620;
    }
    .project-group-head p {
      grid-column:2;
      max-width:720px;
      margin:0;
      color:var(--muted);
      font-size:13px;
      line-height:1.65;
    }
    .project-group-grid { display:grid; gap:22px; }
    .project-item { width:100%; }
    .case-card.project-item,
    .system-card.project-item {
      display:grid !important;
      grid-template-columns:minmax(0,1.02fr) minmax(380px,.98fr) !important;
      min-height:580px !important;
      padding:0 !important;
      overflow:hidden;
      background:var(--paper) !important;
      color:var(--ink) !important;
      border:1px solid var(--line-strong) !important;
      box-shadow:none !important;
    }
    .case-card.project-item .case-media { order:1 !important; min-height:0; }
    .case-card.project-item .case-copy {
      order:2 !important;
      background:var(--paper) !important;
      color:var(--ink) !important;
    }
    .case-card.project-item .case-index {
      color:var(--muted) !important;
      border-color:var(--line) !important;
    }
    .case-card.project-item .case-thesis,
    .case-card.project-item .decision-grid p,
    .case-card.project-item .decision-grid span { color:var(--muted) !important; }
    .case-card.project-item .decision-grid strong { color:var(--ink) !important; }
    .case-card.project-item .decision-grid > div { border-color:var(--line) !important; }
    .case-card.project-item .case-actions { border-color:var(--line) !important; }
    .case-card.project-item .case-actions a { color:var(--ink) !important; }
    .media-label {
      background:var(--ink) !important;
      color:var(--paper) !important;
    }
    .system-card.project-item { min-height:580px !important; }
    .project-poster {
      min-height:100%;
      padding:clamp(28px,4vw,58px);
      background:var(--ink);
      color:var(--paper);
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      border-right:1px solid var(--line-strong);
    }
    .project-poster span {
      font-family:var(--font-mono);
      font-size:9px;
      font-weight:700;
      letter-spacing:.1em;
      text-transform:uppercase;
      opacity:.65;
    }
    .project-poster strong {
      font-size:clamp(48px,6vw,92px);
      line-height:.82;
      letter-spacing:-.07em;
      font-weight:680;
      overflow-wrap:anywhere;
    }
    .system-card-copy {
      padding:clamp(32px,4.4vw,72px);
      display:flex;
      flex-direction:column;
      background:var(--paper);
      color:var(--ink);
    }
    .system-card-copy > span {
      font-family:var(--font-mono);
      font-size:9px;
      letter-spacing:.09em;
      color:var(--muted) !important;
      text-transform:uppercase;
    }
    .system-card-copy h3 {
      margin:clamp(48px,7vw,96px) 0 18px !important;
      font-size:clamp(38px,4.6vw,72px) !important;
      line-height:.92 !important;
      letter-spacing:-.06em !important;
      color:var(--ink) !important;
    }
    .system-card-copy p {
      max-width:560px;
      color:var(--muted) !important;
      font-size:14px !important;
      line-height:1.7 !important;
    }
    .system-card-copy > a,
    .system-card-copy > div {
      margin-top:auto;
      padding-top:28px;
    }
    .system-card-copy a { color:var(--ink) !important; }
    .system-card-dark,
    .system-card-violet {
      background:var(--paper) !important;
      color:var(--ink) !important;
      border-color:var(--line-strong) !important;
    }
    .system-work { display:none !important; }
    .action-highlight {
      display:inline-flex !important;
      align-items:center;
      justify-content:center;
      min-height:44px;
      padding:11px 15px !important;
      background:var(--ink) !important;
      color:var(--paper) !important;
      border:1px solid var(--ink) !important;
      box-shadow:none !important;
      text-decoration:none !important;
      font-weight:750 !important;
      transition:transform .18s ease,background .18s ease,color .18s ease !important;
    }
    .action-highlight:hover,
    .action-highlight:focus-visible {
      background:var(--paper) !important;
      color:var(--ink) !important;
      border-color:var(--ink) !important;
      transform:translateY(-2px);
    }
    .case-actions > a:not(.action-highlight) {
      align-self:center;
      text-decoration:underline;
      text-underline-offset:4px;
      opacity:.72;
    }
    .case-actions > a:not(.action-highlight):hover,
    .case-actions > a:not(.action-highlight):focus-visible { opacity:1; }
    @media (max-width:900px) {
      .project-group-head { grid-template-columns:1fr; }
      .project-group-head p { grid-column:1; }
      .case-card.project-item,
      .system-card.project-item { grid-template-columns:1fr !important; min-height:0 !important; }
      .project-poster { min-height:360px; border-right:0; border-bottom:1px solid var(--line-strong); }
    }
    @media (max-width:640px) {
      .case-actions .action-highlight { width:100%; }
      .project-poster { min-height:290px; }
    }
  `;
  document.head.appendChild(monochromeStyle);

  // Organize projects by shared problem space. Categories are labels, not parent projects.
  const workSection = document.querySelector('.work');
  const caseStack = workSection?.querySelector('.case-stack');
  const systemWork = document.querySelector('.system-work');
  if (workSection && caseStack) {
    const kicker = workSection.querySelector('.section-kicker');
    const title = workSection.querySelector('#workTitle');
    const summary = workSection.querySelector('.section-summary');
    if (kicker) kicker.textContent = 'Grouped by problem space, not by status or project size.';
    if (title) title.innerHTML = 'Projects by practice.<br><em>Equal weight, clearer context.</em>';
    if (summary) summary.textContent = 'Projects are grouped by the kind of design problem they solve. No featured project, no parent/child hierarchy — each project stands on its own evidence.';

    const cards = [
      ...caseStack.querySelectorAll('.case-card'),
      ...(systemWork ? systemWork.querySelectorAll('.system-card') : [])
    ];
    const cardByName = new Map(cards.map((card) => [card.querySelector('h3')?.textContent.trim(), card]));

    const groups = [
      {
        label: '01 / COMMERCE & RETAIL EXPERIENCE',
        title: 'Commerce & Retail Experience',
        description: 'Discovery, product confidence, visual storytelling and conversion across considered ecommerce journeys.',
        projects: ['LuxRoom', 'Atelier', 'Violet Marketplace']
      },
      {
        label: '02 / INFORMATION & DECISION PLATFORMS',
        title: 'Information & Decision Platforms',
        description: 'Information architecture and interface systems that help people compare, understand and act on complex choices.',
        projects: ['VAS Education', 'Capital Place']
      },
      {
        label: '03 / SYSTEMS & WEB DESIGN',
        title: 'Systems & Web Design',
        description: 'Reusable design logic, responsive web composition and implementation-oriented systems.',
        projects: ['CENNEXT', 'UIUX Factory']
      }
    ];

    const projectGroups = document.createElement('div');
    projectGroups.className = 'project-groups';
    let projectIndex = 0;

    groups.forEach((group, groupIndex) => {
      const section = document.createElement('section');
      section.className = 'project-group reveal';
      const headingId = `project-group-${groupIndex + 1}`;
      section.setAttribute('aria-labelledby', headingId);
      section.innerHTML = `
        <header class="project-group-head">
          <span class="project-group-index">${group.label}</span>
          <h3 id="${headingId}">${group.title}</h3>
          <p>${group.description}</p>
        </header>
        <div class="project-group-grid"></div>
      `;

      const grid = section.querySelector('.project-group-grid');
      group.projects.forEach((projectName) => {
        const card = cardByName.get(projectName);
        if (!card) return;
        projectIndex += 1;
        card.classList.remove('case-card-featured', 'case-card-reverse', 'system-card-dark', 'system-card-violet');
        card.classList.add('project-item');

        const caseIndex = card.querySelector('.case-index span:first-child');
        if (caseIndex) caseIndex.textContent = `${String(projectIndex).padStart(2, '0')} / 07`;

        if (card.classList.contains('system-card') && !card.querySelector('.project-poster')) {
          const originalChildren = [...card.childNodes];
          const originalLabel = card.querySelector(':scope > span')?.textContent.trim() || 'PROJECT';
          const copy = document.createElement('div');
          copy.className = 'system-card-copy';
          originalChildren.forEach((node) => copy.appendChild(node));

          const poster = document.createElement('div');
          poster.className = 'project-poster';
          poster.setAttribute('aria-hidden', 'true');
          poster.innerHTML = `<span>${originalLabel}</span><strong>${projectName}</strong>`;
          card.append(poster, copy);
        }

        grid.appendChild(card);
      });
      projectGroups.appendChild(section);
    });

    caseStack.replaceChildren(projectGroups);
    systemWork?.remove();
  }

  // Recruiter-priority CTAs: keep live work and Figma visually explicit without adding color.
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

  // Pointer glow: monochrome and subtle, disabled for touch/reduced motion.
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
    body.addEventListener('mouseenter', () => { glow.style.opacity = '.22'; });
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
