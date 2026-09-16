(() => {
  const workSection = document.querySelector('.work');
  const caseStack = workSection?.querySelector('.case-stack');
  const systemWork = document.querySelector('.system-work');
  if (!workSection || !caseStack) return;

  const groupingStyle = document.createElement('style');
  groupingStyle.textContent = `
    .project-groups{display:grid;gap:clamp(74px,9vw,130px)}
    .project-group{display:grid;gap:30px}
    .project-group-head{display:grid;grid-template-columns:minmax(220px,.62fr) minmax(0,1fr);gap:30px;align-items:end;padding-top:18px;border-top:1px solid rgba(255,255,255,.24)}
    .project-group-index{font-family:var(--font-mono);font-size:9px;font-weight:750;letter-spacing:.1em;text-transform:uppercase;color:var(--signal)}
    .project-group-head h3{margin:0;color:var(--paper);font-size:clamp(30px,4vw,58px);line-height:.95;letter-spacing:-.055em;font-weight:620}
    .project-group-head p{grid-column:2;max-width:720px;margin:0;color:#a9aaab;font-size:13px;line-height:1.65}
    .project-group-grid{display:grid;gap:clamp(24px,4vw,72px)}
    .project-item{width:100%}
    .system-card.project-item{display:grid;grid-template-columns:minmax(0,1.02fr) minmax(380px,.98fr);min-height:580px;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,.18);background:#151719;color:var(--paper)}
    .project-poster{min-height:100%;padding:clamp(28px,4vw,58px);display:flex;flex-direction:column;justify-content:space-between;border-right:1px solid rgba(255,255,255,.16);background:#0b0d10;color:#f3f0e9}
    .project-poster span{font-family:var(--font-mono);font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.68}
    .project-poster strong{font-size:clamp(48px,6vw,92px);line-height:.82;letter-spacing:-.07em;font-weight:680;overflow-wrap:anywhere}
    .system-card-copy{padding:clamp(32px,4.4vw,72px);display:flex;flex-direction:column;background:#151719;color:var(--paper)}
    .system-card-copy>span{font-family:var(--font-mono);font-size:9px;letter-spacing:.09em;color:#a9aaab;text-transform:uppercase}
    .system-card-copy h3{margin:clamp(48px,7vw,96px) 0 18px;font-size:clamp(38px,4.6vw,72px);line-height:.92;letter-spacing:-.06em;color:var(--paper)}
    .system-card-copy p{max-width:560px;color:#a9aaab;font-size:14px;line-height:1.7}
    .system-card-copy>a,.system-card-copy>div{margin-top:auto;padding-top:28px}
    .system-card-copy a{color:var(--paper)}
    .system-card.project-violet .project-poster{background:#bba5c5;color:#201827;border-color:#7d6787}
    .system-card.project-violet .project-poster span{opacity:1}
    .system-card.project-cennext .project-poster{background:#e9e5dc;color:#0b0d10;border-color:#c9c5bc}
    .system-card.project-voltis .project-poster{background:#c8f04a;color:#07110d;border-color:#94b62d}
    .system-card.project-factory .project-poster{background:#0b0d10;color:#f3f0e9}
    .system-card-copy>div{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
    .system-card-copy .case-actions>a:not(.action-highlight){align-self:center;text-decoration:underline;text-underline-offset:4px;opacity:.78}
    .system-card-copy .case-actions>a:not(.action-highlight):hover,.system-card-copy .case-actions>a:not(.action-highlight):focus-visible{color:var(--signal);opacity:1}
    .coming-soon-card{min-height:190px;border:1px dashed rgba(255,255,255,.28);background:linear-gradient(135deg,rgba(37,99,235,.08),rgba(255,255,255,.025));display:grid;place-items:center;padding:28px;color:var(--paper)}
    .coming-soon-card span{font-family:var(--font-mono);font-size:11px;font-weight:750;letter-spacing:.14em;text-transform:uppercase;color:var(--signal)}
    .system-work{display:none!important}
    @media(max-width:900px){.project-group-head{grid-template-columns:1fr}.project-group-head p{grid-column:1}.system-card.project-item{grid-template-columns:1fr;min-height:0}.project-poster{min-height:360px;border-right:0;border-bottom:1px solid rgba(255,255,255,.16)}}
    @media(max-width:640px){.project-poster{min-height:290px}.system-card-copy .case-actions .action-highlight{width:100%}.coming-soon-card{min-height:150px}}
  `;
  document.head.appendChild(groupingStyle);

  const kicker = workSection.querySelector('.section-kicker');
  const title = workSection.querySelector('#workTitle');
  const summary = workSection.querySelector('.section-summary');
  if (kicker) kicker.textContent = 'Industry-based UI/UX practice — grouped by the product context each project solves.';
  if (title) title.innerHTML = 'Work across industries.<br><em>Different domains, one product mindset.</em>';
  if (summary) summary.textContent = 'Each industry keeps three project slots. Finished work links to the strongest available proof — case study, live prototype, Figma or source — while open slots stay intentionally blank as Coming soon.';

  const liveProjects = [
    {
      name:'Nova',
      live:'https://nova-gamma-eosin.vercel.app/',
      source:'https://github.com/Ngh1aa/Nova',
      image:'assets/images/prototype-captures/nova.webp',
      label:'CONSUMER FINTECH / MONEY HEALTH',
      meta:'INDEPENDENT CONCEPT · 2026',
      thesis:'Make everyday banking decisions feel safe, explainable and recoverable.',
      decision:'Frame transfer, card, savings and security flows around safe-to-spend context, trust cues and clear recovery states.',
      proof:'Working banking prototype covering transfers, cards, savings, KYC and failure / recovery flows.'
    },
    {
      name:'Flux',
      live:'https://flux-six-liard.vercel.app/',
      source:'https://github.com/Ngh1aa/Flux',
      image:'assets/images/prototype-captures/flux.svg',
      label:'B2B FINTECH / TREASURY',
      meta:'INDEPENDENT CONCEPT · 2026',
      thesis:'Turn multi-currency treasury complexity into a clear operating cockpit.',
      decision:'Keep liquidity, reserves, incoming cash, FX exposure and settlement context visible inside the same account workflow.',
      proof:'Working treasury prototype with currency accounts, money movement actions and operational liquidity detail.'
    },
    {
      name:'Sentry',
      live:'https://sentry-9bqs.vercel.app/',
      source:'https://github.com/Ngh1aa/Sentry',
      image:'assets/images/prototype-captures/sentry.svg',
      label:'FRAUD & RISK OPS / FINTECH',
      meta:'INDEPENDENT CONCEPT · 2026',
      thesis:'Help fraud analysts reach high-stakes decisions without context switching.',
      decision:'Unify alert priority, forensic evidence, risk signals and the final block-or-allow decision in one split investigation workspace.',
      proof:'Working fraud-operations console with alert queue, evidence correlation, decision actions and auditable rationale.'
    },
    {
      name:'Access',
      live:'https://access-nbuz.vercel.app/',
      source:'https://github.com/Ngh1aa/Access',
      image:'assets/images/prototype-captures/access.svg',
      label:'IDENTITY / PERMISSIONS / ENTERPRISE',
      meta:'INDEPENDENT CONCEPT · 2026',
      thesis:'Make enterprise access governance understandable before it becomes a security incident.',
      decision:'Expose identities, roles, policy health, permission relationships and suspicious access in one governance view.',
      proof:'Working identity and permission console with an access map, policy metrics, permission matrix and security alerts.'
    }
  ];

  liveProjects.forEach(project => {
    if ([...caseStack.querySelectorAll('h3')].some(node => node.textContent.trim() === project.name)) return;
    const card = document.createElement('article');
    card.className = 'case-card reveal';
    card.innerHTML = `
      <a class="case-media" href="${project.live}" target="_blank" rel="noopener noreferrer" aria-label="Open ${project.name} live prototype">
        <img src="${project.image}" width="1440" height="900" alt="${project.name} live prototype interface" loading="lazy" decoding="async">
        <span class="media-label">${project.label}</span>
      </a>
      <div class="case-copy">
        <div class="case-index"><span>00 / 12</span><span>${project.meta}</span></div>
        <h3>${project.name}</h3>
        <p class="case-thesis">${project.thesis}</p>
        <div class="decision-grid compact">
          <div><span>DECISION</span><p>${project.decision}</p></div>
          <div><span>PROOF</span><p>${project.proof}</p></div>
        </div>
        <div class="case-actions personal-project-actions">
          <a class="action-highlight" href="${project.live}" target="_blank" rel="noopener noreferrer">Live prototype ↗</a>
          <a href="${project.source}" target="_blank" rel="noopener noreferrer">Source ↗</a>
        </div>
      </div>`;
    caseStack.appendChild(card);
  });

  if (systemWork && ![...systemWork.querySelectorAll('h3')].some(node => node.textContent.trim() === 'VOLTIS')) {
    const voltisCard = document.createElement('article');
    voltisCard.className = 'system-card project-voltis';
    voltisCard.innerHTML = '<span>AUTOMOTIVE / PRODUCT + CORPORATE</span><h3>VOLTIS</h3><p>A bilingual electric-mobility concept connecting product storytelling, corporate information architecture, localization and implementation-ready interaction states.</p><div></div>';
    systemWork.appendChild(voltisCard);
  }

  const cards = [...caseStack.querySelectorAll('.case-card'), ...(systemWork ? systemWork.querySelectorAll('.system-card') : [])];
  const cardByName = new Map(cards.map(card => [card.querySelector('h3')?.textContent.trim(), card]));

  const personalProjectActions = new Map([
    ['LuxRoom',{caseStudy:'case-study-luxroom.html',live:'https://lux-room.vercel.app/',figma:'https://www.figma.com/design/50eyqHuzpiqIYoIT9ngwcT/LuxRoom?node-id=0-1&t=HPp6OlvriN9MeZCW-1'}],
    ['Atelier',{caseStudy:'case-study-atelier.html',live:'https://atelier-henna-tau.vercel.app/',figma:'https://www.figma.com/design/Di6yDrXBRps8sN0hEZn66F/Atelier?m=auto&t=LykADgxvJ62WCIu7-1'}],
    ['Violet Marketplace',{caseStudy:'case-study-violet-marketplace.html',live:'https://violet-marketplace.vercel.app/',figma:'https://www.figma.com/design/tPghPU31brDIbky1M6MCCC/violet?t=LykADgxvJ62WCIu7-1'}],
    ['VAS Education',{caseStudy:'case-study-vas-education.html',live:'https://redesign-vas.vercel.app/',figma:'https://www.figma.com/design/E07BqE4X8apHhziPardmDG/RedesignVAS?m=auto&t=LykADgxvJ62WCIu7-1'}],
    ['Capital Place',{caseStudy:'case-study-capital-place.html',live:'https://capital-weld.vercel.app/',figma:'https://www.figma.com/design/E7hF6BmKkaNv2AsJlF9kIi/RedesignCapital?m=auto&t=LykADgxvJ62WCIu7-1'}],
    ['CENNEXT',{caseStudy:'case-study-cennext.html',live:'https://cennext-b2b-prototype.vercel.app/',figma:'https://www.figma.com/design/RVcp6uzpJvTMHtlS7ilQb7/CenNext---Web-Designer-Test---Do-Anh-Nghia?m=auto&t=LykADgxvJ62WCIu7-1'}],
    ['VOLTIS',{caseStudy:'case-study-voltis.html',live:'https://voltis-one.vercel.app/',figma:'https://www.figma.com/design/iS0ur2VbuhnLAfSHasnYgp/TRUST.vn---Layout-Website-Test---%C4%90%E1%BB%97-Anh-Ngh%C4%A9a?m=auto&t=LykADgxvJ62WCIu7-1'}]
  ]);

  const makeActionLink = (href,label,highlighted=false) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (highlighted) link.classList.add('action-highlight');
    if (/^https?:/i.test(href)) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    return link;
  };

  personalProjectActions.forEach((links, projectName) => {
    const card = cardByName.get(projectName);
    if (!card) return;
    let actions = card.querySelector('.case-actions');
    if (!actions && card.classList.contains('system-card')) {
      actions = [...card.children].find(child => child.tagName === 'DIV' && !child.classList.contains('project-poster'));
      if (!actions) { actions = document.createElement('div'); card.appendChild(actions); }
    }
    if (!actions) return;
    actions.classList.add('case-actions','personal-project-actions');
    actions.replaceChildren(makeActionLink(links.caseStudy,'Read case study ↗'),makeActionLink(links.live,'Live prototype ↗',true),makeActionLink(links.figma,'Figma ↗',true));
  });

  const groups = [
    {domain:'FINTECH & BANKING',title:'Fintech & Banking',description:'Trust-heavy financial journeys, treasury operations, fraud investigation and data-dense decision interfaces.',projects:['Nova','Flux','Sentry']},
    {domain:'E-COMMERCE & RETAIL',title:'E-Commerce & Retail',description:'Discovery, product confidence, editorial storytelling and conversion for high-consideration commerce.',projects:['LuxRoom','Atelier','Violet Marketplace']},
    {domain:'B2B SAAS & ENTERPRISE',title:'B2B SaaS & Enterprise',description:'Enterprise information architecture, access governance, complex decision support and business-facing digital experiences.',projects:['CENNEXT','Capital Place','Access']},
    {domain:'AI & AUTOMATION',title:'AI & Automation',description:'AI-assisted design operations, reusable workflows and systems that turn design intent into repeatable execution.',projects:['UIUX Factory']},
    {domain:'LOGISTICS & MOBILITY',title:'Logistics & Mobility',description:'Mobility product storytelling, technical information, localization and connected brand-to-product journeys.',projects:['VOLTIS']},
    {domain:'EDTECH',title:'EdTech',description:'Education information architecture, institutional trust and clearer journeys for students, parents and schools.',projects:['VAS Education']}
  ];

  const totalProjects = groups.reduce((sum, group) => sum + group.projects.filter(name => cardByName.has(name)).length, 0);
  const slotsPerGroup = 3;
  const projectGroups = document.createElement('div');
  projectGroups.className = 'project-groups';
  let projectIndex = 0;

  groups.forEach((group, groupIndex) => {
    const section = document.createElement('section');
    section.className = 'project-group reveal';
    const headingId = `project-group-${groupIndex + 1}`;
    section.setAttribute('aria-labelledby', headingId);
    section.innerHTML = `<header class="project-group-head"><span class="project-group-index">${String(groupIndex + 1).padStart(2,'0')} / ${group.domain}</span><h3 id="${headingId}">${group.title}</h3><p>${group.description}</p></header><div class="project-group-grid"></div>`;
    const grid = section.querySelector('.project-group-grid');
    let renderedProjects = 0;

    group.projects.forEach(projectName => {
      const card = cardByName.get(projectName);
      if (!card) return;
      renderedProjects += 1;
      projectIndex += 1;
      card.classList.remove('case-card-featured','case-card-reverse');
      card.classList.add('project-item');
      const caseIndex = card.querySelector('.case-index span:first-child');
      if (caseIndex) caseIndex.textContent = `${String(projectIndex).padStart(2,'0')} / ${String(totalProjects).padStart(2,'0')}`;

      if (card.classList.contains('system-card') && !card.querySelector('.project-poster')) {
        if (projectName === 'Violet Marketplace') card.classList.add('project-violet');
        if (projectName === 'CENNEXT') card.classList.add('project-cennext');
        if (projectName === 'VOLTIS') card.classList.add('project-voltis');
        if (projectName === 'UIUX Factory') card.classList.add('project-factory');
        const originalLabel = card.querySelector(':scope > span')?.textContent.trim() || 'PROJECT';
        const originalChildren = [...card.childNodes];
        const copy = document.createElement('div');
        copy.className = 'system-card-copy';
        originalChildren.forEach(node => copy.appendChild(node));
        const poster = document.createElement('div');
        poster.className = 'project-poster';
        poster.setAttribute('aria-hidden','true');
        poster.innerHTML = `<span>${originalLabel}</span><strong>${projectName}</strong>`;
        card.append(poster,copy);
      }
      grid.appendChild(card);
    });

    const emptySlots = Math.max(0, slotsPerGroup - renderedProjects);
    for (let slot = 0; slot < emptySlots; slot += 1) {
      const placeholder = document.createElement('article');
      placeholder.className = 'coming-soon-card';
      placeholder.setAttribute('aria-label', `${group.title} project coming soon`);
      placeholder.innerHTML = '<span>Coming soon</span>';
      grid.appendChild(placeholder);
    }
    projectGroups.appendChild(section);
  });

  caseStack.replaceChildren(projectGroups);
  systemWork?.remove();
  document.querySelectorAll('.project-group.reveal').forEach(group => group.classList.add('is-visible'));
})();