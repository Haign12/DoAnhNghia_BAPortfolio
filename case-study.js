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
      themeButton.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    if (icon) icon.textContent = nextTheme === 'dark' ? '☼' : '◐';
    if (label) label.textContent = nextTheme === 'dark' ? 'Light' : 'Dark';
  };

  setTheme(readTheme() || 'light');
  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const pageName = window.location.pathname.split('/').pop() || '';

  /* Repository-first tools use Source Code as the primary proof action. */
  const repositoryFirstProjects = {
    'case-study-ui-feedback-tool.html': {
      repository: 'https://github.com/Ngh1aa/ui-feedback-tool',
      demo: 'https://ngh1aa.github.io/ui-feedback-tool/'
    },
    'case-study-skills-uiux.html': {
      repository: 'https://github.com/Ngh1aa/skills_UIUX',
      demo: 'demo-skills-uiux.html'
    }
  };
  const repositoryFirst = repositoryFirstProjects[pageName];
  if (repositoryFirst) {
    const navPrimary = document.querySelector('.case-nav-actions a:first-child');
    if (navPrimary) {
      navPrimary.href = repositoryFirst.repository;
      navPrimary.target = '_blank';
      navPrimary.rel = 'noopener noreferrer';
      navPrimary.textContent = 'Source code ↗';
    }

    const heroActions = document.querySelector('.case-hero-actions');
    const heroPrimary = heroActions?.querySelector('.case-action-primary');
    if (heroPrimary) {
      heroPrimary.href = repositoryFirst.repository;
      heroPrimary.target = '_blank';
      heroPrimary.rel = 'noopener noreferrer';
      heroPrimary.textContent = 'Source code ↗';
    }

    if (pageName === 'case-study-skills-uiux.html' && heroActions) {
      const secondary = heroActions.querySelector('.case-action:not(.case-action-primary)');
      if (secondary) {
        secondary.href = repositoryFirst.demo;
        secondary.removeAttribute('target');
        secondary.removeAttribute('rel');
        secondary.textContent = 'Live demo ↗';
      }
    }
  }

  /* Canonical case-study artifact hierarchy.
     On the case page the narrative is already open, so the artifact sequence is
     Live -> Figma -> Source. Missing public artifacts are omitted, never faked. */
  const caseArtifactRegistry = {
    'case-study-nova.html': { live:'https://nova-gamma-eosin.vercel.app/', figma:'https://www.figma.com/design/AxsWZgEvTOkzOQB71iAdcx/Nova?node-id=4-2052&t=83Wo9YlCjxLTFzxv-1', source:'https://github.com/Ngh1aa/Nova' },
    'case-study-sentry.html': { live:'https://sentry-xi-lime.vercel.app/', figma:'https://www.figma.com/design/1W6rwPXiTfcZn6OhieVUDe/Sentry?node-id=0-1&t=BvIxuJu3KrFWy5Lg-1', source:'https://github.com/Ngh1aa/Sentry' },
    'case-study-luxroom.html': { live:'https://lux-room.vercel.app/', figma:'https://www.figma.com/design/50eyqHuzpiqIYoIT9ngwcT/LuxRoom?node-id=0-1&t=HPp6OlvriN9MeZCW-1', source:'https://github.com/Ngh1aa/LuxRoom' },
    'case-study-atelier.html': { live:'https://atelier-henna-tau.vercel.app/', figma:'https://www.figma.com/design/Di6yDrXBRps8sN0hEZn66F/Atelier?m=auto&t=LykADgxvJ62WCIu7-1', source:'https://github.com/Ngh1aa/Atelier' },
    'case-study-capital-place.html': { live:'https://capital-weld.vercel.app/', figma:'https://www.figma.com/design/E7hF6BmKkaNv2AsJlF9kIi/RedesignCapital?m=auto&t=LykADgxvJ62WCIu7-1', source:'https://github.com/Ngh1aa/Capital' },
    'case-study-vas-education.html': { live:'https://redesign-vas.vercel.app/', figma:'https://www.figma.com/design/E07BqE4X8apHhziPardmDG/RedesignVAS?m=auto&t=LykADgxvJ62WCIu7-1', source:'https://github.com/Ngh1aa/RedesignVAS' },
    'case-study-vietbank.html': { live:'https://ngh1aa.github.io/Redesign-Vietbank-Website/', figma:'https://www.figma.com/design/a76mFeNL97daVeVfs8UsRW/VietBank?node-id=0-1&t=rXhD2IcSTPLQDEhI-1', source:'https://github.com/Ngh1aa/Redesign-Vietbank-Website' },
    'case-study-qtsc.html': { live:'https://ngh1aa.github.io/QTSC/', figma:'https://www.figma.com/design/wugoCyDEEfzSgu0gQoyum5/QTSC?node-id=0-1&t=LykADgxvJ62WCIu7-1', source:'https://github.com/Ngh1aa/QTSC' },
    'case-study-studioos.html': { live:'https://ngh1aa.github.io/StudioOS/', source:'https://github.com/Ngh1aa/StudioOS' },
    'case-study-ui-feedback-tool.html': { live:'https://ngh1aa.github.io/ui-feedback-tool/', source:'https://github.com/Ngh1aa/ui-feedback-tool' },
    'case-study-skills-uiux.html': { live:'demo-skills-uiux.html', source:'https://github.com/Ngh1aa/skills_UIUX' },
    'case-study-violet-marketplace.html': { live:'https://violet-marketplace.vercel.app/', figma:'https://www.figma.com/design/tPghPU31brDIbky1M6MCCC/violet?t=LykADgxvJ62WCIu7-1', source:'https://github.com/Ngh1aa/VioletMarketplace' },
    'case-study-voltis.html': { live:'https://voltis-one.vercel.app/', figma:'https://www.figma.com/design/iS0ur2VbuhnLAfSHasnYgp/TRUST.vn---Layout-Website-Test---%C4%90%E1%BB%97-Anh-Ngh%C4%A9a?m=auto&t=LykADgxvJ62WCIu7-1', source:'https://github.com/Ngh1aa/Voltis' },
    'case-study-cennext.html': { live:'https://cennext-b2b-prototype.vercel.app/', figma:'https://www.figma.com/design/RVcp6uzpJvTMHtlS7ilQb7/CenNext---Web-Designer-Test---Do-Anh-Nghia?m=auto&t=LykADgxvJ62WCIu7-1', source:'https://github.com/Ngh1aa/cennext-b2b-prototype' },
    'case-study-lumen.html': { live:'https://ngh1aa.github.io/Lumen/', source:'https://github.com/Ngh1aa/Lumen' },
    'case-study-hue.html': { live:'https://ngh1aa.github.io/Mostar-Guide/', source:'https://github.com/Ngh1aa/Mostar-Guide' },
    'case-study-flux.html': { live:'https://flux-six-liard.vercel.app/', figma:'https://www.figma.com/design/bZIqaMK97vwzBuSdD8risu/Flux?node-id=1-3427&t=BvIxuJu3KrFWy5Lg-1', source:'https://github.com/Ngh1aa/Flux' },
    'case-study-access.html': { live:'https://access-nbuz.vercel.app/', figma:'https://www.figma.com/design/tQzqKtw8x6Iu4ohKy9LOwo/access?node-id=6-1428&t=2W8CDU1K7QISp6eC-1', source:'https://github.com/Ngh1aa/Access' },
    'case-study-uiux-factory.html': { source:'https://github.com/Ngh1aa/uiux-ai-workspace' },
  };

  const caseArtifacts = caseArtifactRegistry[pageName];
  if (caseArtifacts) {
    const artifactSpecs = [
      caseArtifacts.live ? { kind:'live', label:'Live prototype ↗', href:caseArtifacts.live } : null,
      caseArtifacts.figma ? { kind:'figma', label:'View Figma ↗', href:caseArtifacts.figma } : null,
      caseArtifacts.source ? { kind:'source', label:'Source ↗', href:caseArtifacts.source } : null,
    ].filter(Boolean);

    const matchesArtifactAction = (link) => {
      const label = link.textContent.trim().toLowerCase();
      return /^(live|try |open live|live demo|demo|prototype|view figma|figma|source|source code|repository|open repository|inspect source|back to work|back to projects)/.test(label);
    };

    const buildArtifactLink = (spec, hero = false, primary = false) => {
      const link = document.createElement('a');
      link.href = spec.href;
      link.textContent = spec.label;
      link.dataset.artifactKind = spec.kind;
      if (hero) link.className = `case-action${primary ? ' case-action-primary' : ''}`;
      const external = /^https?:/i.test(spec.href) || spec.kind !== 'live';
      if (external || spec.href.endsWith('.html')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      return link;
    };

    const heroActions = document.querySelector('.case-hero-actions');
    if (heroActions) {
      const preserved = [...heroActions.querySelectorAll('a')].filter((link) => !matchesArtifactAction(link));
      const artifactLinks = artifactSpecs.map((spec, index) => buildArtifactLink(spec, true, index === 0));
      heroActions.classList.add('case-artifact-actions');
      heroActions.replaceChildren(...artifactLinks, ...preserved);
    }

    const navActions = document.querySelector('.case-nav-actions');
    if (navActions) {
      const preserved = [...navActions.children].filter((node) => node.tagName !== 'A' || !matchesArtifactAction(node));
      const artifactLinks = artifactSpecs.map((spec) => buildArtifactLink(spec, false, false));
      navActions.replaceChildren(...artifactLinks, ...preserved);
    }
  }

  /* A32 reusable 30-second recruiter proof for selected cases. */
  const recruiterProofByPage = {
    'case-study-lumen.html': {
      name: 'LUMEN',
      problem: 'Search-first museum browsing underserves weak-intent discovery.',
      decision: 'Organize discovery by mood, color, mode and artwork relationships.',
      evidence: 'Prototype and source verified; direct-user baseline not measured.',
      change: 'Multi-mode exploration is shipped; no research-driven improvement claim is made.',
      retest: 'Not run.',
      open: 'Orientation, reduced motion, published Figma and direct-user discovery benchmark.'
    },
    'case-study-hue.html': {
      name: 'HUẾ — Between River & Citadel',
      problem: 'A borrowed interaction pattern needed a Huế-specific cultural system.',
      decision: 'Re-author route, typography, imagery and motion around Huế.',
      evidence: 'Transformation and source verified; direct-user baseline not measured.',
      change: 'Huế narrative and visual system shipped; no research-driven improvement claim is made.',
      retest: 'Not run.',
      open: 'Route comprehension, reduced motion, published Figma and first-time visitor benchmark.'
    },
    'case-study-luxroom.html': {
      name: 'LuxRoom',
      problem: 'Furniture decisions require more than attractive product imagery.',
      decision: 'Carry dimensions, materials, variants and room context into evaluation.',
      evidence: 'Prototype and Figma verified; direct-user baseline not measured.',
      change: 'Responsive commerce flow shipped; no research-driven improvement claim is made.',
      retest: 'Not run.',
      open: 'Business framing, state depth and configuration benchmark.'
    },
    'case-study-atelier.html': {
      name: 'Atelier',
      problem: 'Editorial fashion can hide shopping-critical information.',
      decision: 'Increase information density as intent moves toward purchase.',
      evidence: 'Prototype and Figma verified; direct-user baseline not measured.',
      change: 'Editorial-to-cart hierarchy shipped; no research-driven improvement claim is made.',
      retest: 'Not run.',
      open: 'Explicit state coverage and direct-user findability benchmark.'
    },
    'case-study-violet-marketplace.html': {
      name: 'Violet Marketplace',
      problem: 'Fragrance is hard to evaluate from images alone.',
      decision: 'Pair visual storytelling with narrowing and confidence cues.',
      evidence: 'Prototype and Figma verified; direct-user baseline not measured.',
      change: 'Marketplace discovery system shipped; no research-driven improvement claim is made.',
      retest: 'Not run.',
      open: 'Filter/PDP benchmark and explicit state coverage.'
    },
    'case-study-flux.html': {
      name: 'Flux',
      problem: 'Treasury context is fragmented across balances, FX and settlement.',
      decision: 'Connect liquidity, exposure, route status and recovery in one model.',
      evidence: 'Prototype and Figma verified; direct-user baseline not measured.',
      change: 'Treasury cockpit and settlement states shipped; no research-driven improvement claim is made.',
      retest: 'Not run.',
      open: 'Business framing and domain-adjacent operations benchmark.'
    },
    'case-study-sentry.html': {
      name: 'Sentry',
      problem: 'Investigators can lose context between alert, evidence and action.',
      decision: 'Keep priority, evidence and consequence in one investigation model.',
      evidence: 'Prototype and Figma verified; direct-user baseline not measured.',
      change: 'Investigation and recovery states shipped; no research-driven improvement claim is made.',
      retest: 'Not run.',
      open: 'Domain-adjacent investigation benchmark.'
    },
    'case-study-access.html': {
      name: 'ACCESS',
      problem: 'Access control is a lifecycle, not a single permission screen.',
      decision: 'Model issue, activation, visit, exception and revocation together.',
      evidence: 'Prototype and Figma verified; direct-user baseline not measured.',
      change: 'Credential and visitor lifecycle shipped; no research-driven improvement claim is made.',
      retest: 'Not run.',
      open: 'Business context and direct-user validation boundary.'
    },
    'case-study-capital-place.html': {
      name: 'Capital Place',
      problem: 'Property browsing does not equal leasing decision support.',
      decision: 'Structure place → requirement → floor context → enquiry.',
      evidence: 'Prototype and Figma verified; direct-user baseline not measured.',
      change: 'Leasing decision journey shipped; no research-driven improvement claim is made.',
      retest: 'Not run.',
      open: 'Direct-user property-path benchmark.'
    },
    'case-study-cennext.html': {
      name: 'G.I.E',
      problem: 'Industrial service taxonomy can block the correct RFQ path.',
      decision: 'Preserve repair context from need to service to request.',
      evidence: 'Prototype and Figma verified; direct-user baseline not measured.',
      change: 'B2B IA and reusable section system shipped; no research-driven improvement claim is made.',
      retest: 'Not run.',
      open: 'Direct-user service-fit and RFQ benchmark.'
    },
    'case-study-vas-education.html': {
      name: 'VAS Education',
      problem: 'Programs, campuses and admissions create parent decision overload.',
      decision: 'Structure the journey as trust → fit → action.',
      evidence: 'Prototype and Figma verified; direct-user baseline not measured.',
      change: 'Enrollment decision journey shipped; no research-driven improvement claim is made.',
      retest: 'Not run.',
      open: 'Business framing and prospective-family benchmark.'
    },
    'case-study-voltis.html': {
      name: 'VOLTIS',
      problem: 'Vehicle storytelling competes with technical and corporate information.',
      decision: 'Layer product, specs, range, charging and company context.',
      evidence: 'Prototype and Figma verified; direct-user baseline not measured.',
      change: 'Corporate and product information system shipped; no research-driven improvement claim is made.',
      retest: 'Not run.',
      open: 'Direct-user state and comprehension benchmark.'
    },
    'case-study-uiux-factory.html': {
      name: 'UIUX Factory',
      problem: 'AI output can look plausible without being verifiable.',
      decision: 'Keep project truth, decisions, implementation and QA inspectable.',
      evidence: 'Repository and QA contracts verified; human workflow impact not measured.',
      change: 'Governed design→code→repair workflow shipped; no adoption outcome is claimed.',
      retest: 'Dogfood and technical QA reruns exist; no direct-user outcome retest.',
      open: 'Traceable human workflow adoption and rework baseline.'
    }
  };

  const recruiterProof = recruiterProofByPage[pageName];
  if (recruiterProof) {
    if (!document.querySelector('link[href*="case-recruiter-proof.css"]')) {
      const proofStyles = document.createElement('link');
      proofStyles.rel = 'stylesheet';
      proofStyles.href = 'case-recruiter-proof.css?v=20260930-a32';
      document.head.appendChild(proofStyles);
    }

    const navActions = document.querySelector('.case-nav-actions');
    if (navActions && !navActions.querySelector('[data-project-recruiter-proof]')) {
      const link = document.createElement('a');
      link.href = '#project-30-sec-proof';
      link.dataset.projectRecruiterProof = 'true';
      link.textContent = '30-sec proof ↓';
      navActions.prepend(link);
    }

    const hero = document.querySelector('.case-hero');
    if (hero && !document.getElementById('project-30-sec-proof')) {
      const proof = document.createElement('section');
      proof.className = 'case-section project-recruiter-proof';
      proof.id = 'project-30-sec-proof';
      proof.innerHTML = `
        <header class="case-section-head">
          <span class="case-section-label">30-SECOND RECRUITER PROOF / EVIDENCE BOUNDARY</span>
          <h2>${recruiterProof.name}: problem → decision → evidence → change → retest → still open.</h2>
        </header>
        <div class="case-section-body">
          <div class="project-recruiter-proof-grid">
            <article><span>01 / Problem</span><strong>${recruiterProof.problem}</strong></article>
            <article><span>02 / Decision</span><strong>${recruiterProof.decision}</strong></article>
            <article><span>03 / Evidence</span><strong>${recruiterProof.evidence}</strong></article>
            <article><span>04 / Change</span><strong>${recruiterProof.change}</strong></article>
            <article><span>05 / Retest</span><strong>${recruiterProof.retest}</strong></article>
            <article class="proof-open"><span>06 / Still open</span><strong>${recruiterProof.open}</strong></article>
          </div>
          <p class="project-recruiter-proof-note">Artifact/source delivery evidence is kept separate from direct-user evidence and product/business outcomes. Missing research remains visible instead of being converted into a success claim.</p>
        </div>
      `;
      hero.after(proof);
    }
  }

  /* Nova: make the product-design work recruiter-visible before long-form reading. */
  if (pageName === 'case-study-nova.html') {
    const hero = document.querySelector('.case-hero');
    const evidenceFact = [...document.querySelectorAll('.case-facts > div')].find((item) => item.querySelector('dt')?.textContent.trim() === 'Evidence');
    if (evidenceFact) evidenceFact.querySelector('dd').textContent = '10 verified real-user records · 2 research rounds';

    const navActions = document.querySelector('.case-nav-actions');
    if (navActions && !navActions.querySelector('[data-nova-recruiter-proof]')) {
      const proofLink = document.createElement('a');
      proofLink.href = '#nova-recruiter-proof';
      proofLink.dataset.novaRecruiterProof = 'true';
      proofLink.textContent = '30-sec proof ↓';
      navActions.prepend(proofLink);
    }

    if (hero && !document.getElementById('nova-recruiter-proof')) {
      const proof = document.createElement('section');
      proof.className = 'case-section nova-recruiter-proof';
      proof.id = 'nova-recruiter-proof';
      proof.innerHTML = `
        <header class="case-section-head">
          <span class="case-section-label">30-SECOND RECRUITER PROOF / PRODUCT DESIGN LOOP</span>
          <h2>Not just a polished fintech UI: evidence → decision → shipped iteration → retest.</h2>
        </header>
        <div class="case-section-body">
          <p class="nova-recruiter-intro">Nova now exposes the part recruiters usually cannot see from screenshots: how a product decision changed after real-user evidence, how the change was implemented, and what the retest still says is unresolved.</p>
          <div class="case-evidence-strip nova-recruiter-stats" aria-label="Nova evidence summary">
            <div><span>Research method</span><strong>10 async self-report records</strong><small>2 rounds · n=5 + 5 new participants · 0 moderated sessions.</small></div>
            <div><span>Cross-round signal</span><strong>Recovery clarity 4/5 → 2/5</strong><small>Directional regression signal, not a causal effect; both rounds are small cross-sectional self-report samples.</small></div>
            <div><span>Product decisions</span><strong>4 evidence-driven changes</strong><small>Truth boundary · transfer impact · Safe-to-spend horizon · failure recovery.</small></div>
            <div><span>Current state</span><strong>4 findings still open</strong><small>The iteration shipped and was retested, but unresolved findings stay visible instead of being rewritten as success.</small></div>
          </div>

          <div class="nova-product-loop" aria-label="Nova product-design progression">
            <article><span>01 / ROUND 01</span><strong>Find the comprehension risks</strong><p>5 verified direct-user records produced two P1 and two P2 findings instead of a generic preference list.</p><small>P1 · demo/real boundary<br>P1 · transfer impact<br>P2 · horizon<br>P2 · recovery cause</small></article>
            <article><span>02 / SHIP</span><strong>Change the decision surfaces</strong><p>The prototype was changed where interpretation failed: CTA truth labels, transfer calculation, horizon label and recovery reassurance.</p><small>Source owner → canonical runtime → regression QA</small></article>
            <article><span>03 / ROUND 02</span><strong>Retest with 5 new users</strong><p>The retest did not get rewritten into a success story. It shows what improved locally and what is still wrong.</p><small>5/5 understand transfer arithmetic<br>2/5 demo boundary<br>1/5 buffer rule<br>2/5 14-day horizon<br>2/5 no-money-moved</small></article>
            <article><span>04 / NEXT</span><strong>Prioritize consequence, not polish</strong><p>Next iteration order is driven by risk: recovery clarity first, then sensitive-action truth, buffer behavior and horizon framing.</p><small>D-04 → D-02 → D-03 → D-01</small></article>
          </div>

          <div class="nova-proof-actions">
            <a href="https://ngh1aa.github.io/Nova/app.html?screen=home&lab=1" target="_blank" rel="noopener noreferrer">Open tested prototype ↗</a>
            <a href="https://github.com/Ngh1aa/Nova/tree/main/research/validation/nova-round-02" target="_blank" rel="noopener noreferrer">Inspect Round 02 evidence ↗</a>
            <a href="https://github.com/Ngh1aa/Nova/blob/main/research/validation/nova-round-02/RETEST-SYNTHESIS.md" target="_blank" rel="noopener noreferrer">Read before/after synthesis ↗</a>
            <a href="https://github.com/Ngh1aa/Nova/blob/main/research/validation/nova-round-02/DECISION-LOG.md" target="_blank" rel="noopener noreferrer">Read decision log ↗</a>
          </div>

          <div class="case-boundary nova-recruiter-boundary"><strong>WHAT THIS PROVES — AND WHAT IT DOES NOT</strong><p>This demonstrates product framing, evidence governance, prioritization, implementation discipline, QA and willingness to keep unresolved findings visible. It does <strong>not</strong> claim five years of tenure, moderated usability sessions, production banking impact or causal business uplift.</p></div>
        </div>
      `;
      hero.after(proof);
    }

    const evidenceCard = document.querySelector('[data-a27-field="EVIDENCE"] p');
    if (evidenceCard) evidenceCard.textContent = 'DIRECT USER / TWO ROUNDS. Round 01: 5 verified self-report records. Round 02: 5 NEW verified async retest records on the shipped iteration. 0 moderated sessions; cross-round deltas are self-report signals, not causal proof.';

    const nextDecision = document.querySelector('[data-a27-field="NEXT DECISION"] p');
    if (nextDecision) nextDecision.textContent = 'Round 02 keeps all four findings open. Prioritize D-04 recovery clarity → D-02 sensitive-action truth boundary → D-03 protected-buffer rule → D-01 horizon framing, then retest the same tasks again.';

    const seniorHeading = document.querySelector('.senior-decision-evidence .case-section-head h2');
    if (seniorHeading) seniorHeading.textContent = 'The decisions, evidence, trade-offs and unresolved risks behind the interface';

    document.querySelectorAll('.case-section-body p, .case-evidence-strip small, .decision-grid p, .case-boundary p').forEach((node) => {
      const text = node.textContent || '';
      if (text.includes('post-change retest is pending') || text.includes('post-change retest remains pending')) {
        node.textContent = text
          .replace('post-change retest is pending', 'Round 02 retest is complete; another iteration is required')
          .replace('post-change retest remains pending', 'Round 02 retest is complete; another iteration is required');
      }
      if (text.includes('5 real-user self-report records informed the current iteration; post-change retest is pending.')) {
        node.textContent = 'Round 01 informed the shipped iteration; Round 02 added 5 NEW verified async retest records and keeps all four findings open.';
      }
    });
  }

  /* Keep project reality explicit, but frame it as context rather than a warning. */
  const caseIndex = document.querySelector('.case-index');
  if (caseIndex) {
    caseIndex.textContent = caseIndex.textContent
      .replace('INDEPENDENT CONCEPT', 'SELF-INITIATED CONCEPT')
      .replace('INDEPENDENT REDESIGN', 'REDESIGN PROTOTYPE');
  }
  document.querySelectorAll('.case-boundary strong').forEach((node) => {
    if (node.textContent.trim().toUpperCase() === 'NOT CLAIMED') node.textContent = 'EVIDENCE BOUNDARY';
  });

  /* Featured cases expose real responsive prototype evidence directly in the narrative. */
  const liveProofByPage = {
    'case-study-atelier.html': {
      name: 'Atelier',
      url: 'https://atelier-henna-tau.vercel.app/',
      note: 'The public prototype is loaded directly so responsive behavior can be inspected rather than inferred from a static mockup.'
    },
    'case-study-luxroom.html': {
      name: 'LuxRoom',
      url: 'https://lux-room.vercel.app/',
      note: 'The public prototype is loaded directly to show how the interface carries product detail and hierarchy across viewport sizes.'
    },
    'case-study-capital-place.html': {
      name: 'Capital Place',
      url: 'https://capital-weld.vercel.app/',
      note: 'The public prototype is loaded directly to make the leasing hierarchy, navigation and responsive behavior inspectable.'
    },
    'case-study-vas-education.html': {
      name: 'VAS Education',
      url: 'https://redesign-vas.vercel.app/',
      note: 'The public prototype is loaded directly to show how admissions, programs and campus context behave as a responsive system.'
    },
  };

  const liveProof = liveProofByPage[pageName];
  if (liveProof && !document.querySelector('.case-live-evidence')) {
    const interfaceSection = [...document.querySelectorAll('.case-section')].find((section) => {
      const sectionLabel = section.querySelector('.case-section-label')?.textContent || '';
      return sectionLabel.toUpperCase().includes('INTERFACE PROOF');
    });

    if (interfaceSection) {
      const section = document.createElement('section');
      section.className = 'case-section case-live-evidence';
      section.innerHTML = `
        <header class="case-section-head">
          <span class="case-section-label">LIVE PROOF / RESPONSIVE SURFACES</span>
          <h2>Inspect the implemented interface at desktop and mobile widths</h2>
        </header>
        <div class="case-section-body">
          <div class="case-live-proof-intro">
            <p>${liveProof.note}</p>
            <a href="${liveProof.url}" target="_blank" rel="noopener noreferrer">Open ${liveProof.name} prototype ↗</a>
          </div>
          <div class="case-live-proof-grid">
            <figure class="case-live-browser case-live-browser--desktop">
              <figcaption><span>DESKTOP / LIVE PROTOTYPE</span><small>Wide layout and hierarchy</small></figcaption>
              <div class="case-live-viewport"><iframe src="${liveProof.url}" title="${liveProof.name} desktop live prototype" loading="lazy" tabindex="-1" aria-hidden="true" referrerpolicy="no-referrer"></iframe></div>
            </figure>
            <figure class="case-live-browser case-live-browser--mobile">
              <figcaption><span>MOBILE / LIVE PROTOTYPE</span><small>Responsive prioritization</small></figcaption>
              <div class="case-live-viewport"><iframe src="${liveProof.url}" title="${liveProof.name} mobile live prototype" loading="lazy" tabindex="-1" aria-hidden="true" referrerpolicy="no-referrer"></iframe></div>
            </figure>
          </div>
        </div>
      `;
      interfaceSection.after(section);
    }
  }

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
