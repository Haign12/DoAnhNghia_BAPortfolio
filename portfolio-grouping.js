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
    .project-group-index{font-family:var(--font-mono);font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#a9aaab}
    .project-group-head h3{margin:0;color:var(--paper);font-size:clamp(30px,4vw,58px);line-height:.95;letter-spacing:-.055em;font-weight:620}
    .project-group-head p{grid-column:2;max-width:720px;margin:0;color:#a9aaab;font-size:13px;line-height:1.65}
    .project-group-grid{display:grid;gap:clamp(42px,5vw,72px)}
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
    .system-card-copy .case-actions>a:not(.action-highlight):hover,.system-card-copy .case-actions>a:not(.action-highlight):focus-visible{opacity:1}
    .system-work{display:none!important}

    @media(max-width:900px){
      .project-group-head{grid-template-columns:1fr}
      .project-group-head p{grid-column:1}
      .system-card.project-item{grid-template-columns:1fr;min-height:0}
      .project-poster{min-height:360px;border-right:0;border-bottom:1px solid rgba(255,255,255,.16)}
    }
    @media(max-width:640px){
      .project-poster{min-height:290px}
      .system-card-copy .case-actions .action-highlight{width:100%}
    }
  `;
  document.head.appendChild(groupingStyle);

  const kicker = workSection.querySelector('.section-kicker');
  const title = workSection.querySelector('#workTitle');
  const summary = workSection.querySelector('.section-summary');
  if (kicker) kicker.textContent = 'Grouped by problem space, not by status or project size.';
  if (title) title.innerHTML = 'Projects by practice.<br><em>Equal weight, clearer context.</em>';
  if (summary) summary.textContent = 'Projects are grouped by the kind of design problem they solve. Each personal design project exposes the same three proof paths: case study, live prototype and Figma.';

  if (systemWork && ![...systemWork.querySelectorAll('h3')].some(title => title.textContent.trim() === 'VOLTIS')) {
    const voltisCard = document.createElement('article');
    voltisCard.className = 'system-card project-voltis';
    voltisCard.innerHTML = `
      <span>AUTOMOTIVE / PRODUCT + CORPORATE</span>
      <h3>VOLTIS</h3>
      <p>A bilingual electric-mobility concept connecting product storytelling, corporate information architecture, localization and implementation-ready interaction states.</p>
      <div></div>
    `;
    systemWork.appendChild(voltisCard);
  }

  const cards = [
    ...caseStack.querySelectorAll('.case-card'),
    ...(systemWork ? systemWork.querySelectorAll('.system-card') : [])
  ];
  const cardByName = new Map(cards.map(card => [card.querySelector('h3')?.textContent.trim(), card]));

  // Personal projects use one consistent proof contract: case study + live prototype + Figma.
  // UIUX Factory is intentionally excluded because it is a tooling/system proof rather than a UI project.
  const personalProjectActions = new Map([
    ['LuxRoom', {
      caseStudy:'case-study-luxroom.html',
      live:'https://ngh1aa.github.io/LuxRoom/',
      figma:'https://www.figma.com/design/50eyqHuzpiqIYoIT9ngwcT/LuxRoom?node-id=0-1&t=HPp6OlvriN9MeZCW-1'
    }],
    ['Atelier', {
      caseStudy:'case-study-atelier.html',
      live:'https://ngh1aa.github.io/Atelier/',
      figma:'https://www.figma.com/design/Di6yDrXBRps8sN0hEZn66F/Atelier?m=auto&t=LykADgxvJ62WCIu7-1'
    }],
    ['Violet Marketplace', {
      caseStudy:'case-study-violet-marketplace.html',
      live:'https://ngh1aa.github.io/VioletMarketplace/',
      figma:'https://www.figma.com/design/tPghPU31brDIbky1M6MCCC/violet?t=LykADgxvJ62WCIu7-1'
    }],
    ['VAS Education', {
      caseStudy:'case-study-vas-education.html',
      live:'https://ngh1aa.github.io/RedesignVAS/',
      figma:'https://www.figma.com/design/E07BqE4X8apHhziPardmDG/RedesignVAS?m=auto&t=LykADgxvJ62WCIu7-1'
    }],
    ['Capital Place', {
      caseStudy:'case-study-capital-place.html',
      live:'https://ngh1aa.github.io/Capital/',
      figma:'https://www.figma.com/design/E7hF6BmKkaNv2AsJlF9kIi/RedesignCapital?m=auto&t=LykADgxvJ62WCIu7-1'
    }],
    ['CENNEXT', {
      caseStudy:'case-study-cennext.html',
      live:'https://ngh1aa.github.io/cennext-b2b-prototype/',
      figma:'https://www.figma.com/design/RVcp6uzpJvTMHtlS7ilQb7/CenNext---Web-Designer-Test---Do-Anh-Nghia?m=auto&t=LykADgxvJ62WCIu7-1'
    }],
    ['VOLTIS', {
      caseStudy:'case-study-voltis.html',
      live:'https://ngh1aa.github.io/Voltis/',
      figma:'https://www.figma.com/design/iS0ur2VbuhnLAfSHasnYgp/TRUST.vn---Layout-Website-Test---%C4%90%E1%BB%97-Anh-Ngh%C4%A9a?m=auto&t=LykADgxvJ62WCIu7-1'
    }]
  ]);

  const makeActionLink = (href, label, highlighted = false) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (highlighted) link.classList.add('action-highlight');
    if (/^https?:/i.test(href)) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    return link;
  };

  personalProjectActions.forEach((links, projectName) => {
    const card = cardByName.get(projectName);
    if (!card) return;

    let actions = card.querySelector('.case-actions');
    if (!actions && card.classList.contains('system-card')) {
      actions = [...card.children].find(child => child.tagName === 'DIV' && !child.classList.contains('project-poster'));
      if (!actions) {
        actions = document.createElement('div');
        card.appendChild(actions);
      }
    }
    if (!actions) return;

    actions.classList.add('case-actions', 'personal-project-actions');
    actions.replaceChildren(
      makeActionLink(links.caseStudy, 'Read case study ↗'),
      makeActionLink(links.live, 'Live prototype ↗', true),
      makeActionLink(links.figma, 'Figma ↗', true)
    );
  });

  const groups = [
    {
      label:'01 / COMMERCE & RETAIL EXPERIENCE',
      title:'Commerce & Retail Experience',
      description:'Discovery, product confidence, visual storytelling and conversion across considered ecommerce journeys.',
      projects:['LuxRoom','Atelier','Violet Marketplace']
    },
    {
      label:'02 / INFORMATION & DECISION PLATFORMS',
      title:'Information & Decision Platforms',
      description:'Information architecture and interface systems that help people compare, understand and act on complex choices.',
      projects:['VAS Education','Capital Place']
    },
    {
      label:'03 / SYSTEMS & WEB DESIGN',
      title:'Systems & Web Design',
      description:'Reusable design logic, responsive web composition, localization and implementation-oriented systems.',
      projects:['CENNEXT','VOLTIS','UIUX Factory']
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
    group.projects.forEach(projectName => {
      const card = cardByName.get(projectName);
      if (!card) return;
      projectIndex += 1;
      card.classList.remove('case-card-featured','case-card-reverse');
      card.classList.add('project-item');

      const caseIndex = card.querySelector('.case-index span:first-child');
      if (caseIndex) caseIndex.textContent = `${String(projectIndex).padStart(2,'0')} / 08`;

      if (card.classList.contains('system-card') && !card.querySelector('.project-poster')) {
        if (projectName === 'Violet Marketplace') card.classList.add('project-violet');
        if (projectName === 'CENNEXT') card.classList.add('project-cennext');
        if (projectName === 'VOLTIS') card.classList.add('project-voltis');
        if (projectName === 'UIUX Factory') card.classList.add('project-factory');

        const originalChildren = [...card.childNodes];
        const originalLabel = card.querySelector(':scope > span')?.textContent.trim() || 'PROJECT';
        const copy = document.createElement('div');
        copy.className = 'system-card-copy';
        originalChildren.forEach(node => copy.appendChild(node));

        const poster = document.createElement('div');
        poster.className = 'project-poster';
        poster.setAttribute('aria-hidden','true');
        poster.innerHTML = `<span>${originalLabel}</span><strong>${projectName}</strong>`;
        card.append(poster, copy);
      }

      grid.appendChild(card);
    });
    projectGroups.appendChild(section);
  });

  caseStack.replaceChildren(projectGroups);
  systemWork?.remove();

  // Group wrappers are inserted after the original reveal observer is created.
  document.querySelectorAll('.project-group.reveal').forEach(group => group.classList.add('is-visible'));
})();