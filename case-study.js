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

  const setTheme = (theme, persist = false) => {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    if (persist) { try { localStorage.setItem(themeKey, nextTheme); } catch (_) { /* persistence is optional */ } }
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(nextTheme === 'dark'));
      themeButton.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    if (icon) icon.textContent = nextTheme === 'dark' ? '☼' : '◐';
    if (label) label.textContent = nextTheme === 'dark' ? 'Light' : 'Dark';
  };

  setTheme(readTheme() || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (!readTheme()) setTheme(event.matches ? 'dark' : 'light');
  });
  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));

  const pageName = window.location.pathname.split('/').pop() || '';

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
    'case-study-qtsc.html': { live:'https://ngh1aa.github.io/QTSC/', figma:'https://www.figma.com/design/wugoCyDEEfzSgu0gQoyum5/QTSC?node-id=0-1&t=LykADgxvJ62WCIu7-1', source:'https://github.com/Ngh1aa/QTSC' },
    'case-study-violet-marketplace.html': { live:'https://violet-marketplace.vercel.app/', figma:'https://www.figma.com/design/tPghPU31brDIbky1M6MCCC/violet?t=LykADgxvJ62WCIu7-1', source:'https://github.com/Ngh1aa/VioletMarketplace' },
    'case-study-voltis.html': { live:'https://voltis-one.vercel.app/', figma:'https://www.figma.com/design/iS0ur2VbuhnLAfSHasnYgp/TRUST.vn---Layout-Website-Test---%C4%90%E1%BB%97-Anh-Ngh%C4%A9a?m=auto&t=LykADgxvJ62WCIu7-1', source:'https://github.com/Ngh1aa/Voltis' },
    'case-study-cennext.html': { live:'https://cennext-b2b-prototype.vercel.app/', figma:'https://www.figma.com/design/RVcp6uzpJvTMHtlS7ilQb7/CenNext---Web-Designer-Test---Do-Anh-Nghia?m=auto&t=LykADgxvJ62WCIu7-1', source:'https://github.com/Ngh1aa/cennext-b2b-prototype' },
    'case-study-flux.html': { live:'https://flux-six-liard.vercel.app/', figma:'https://www.figma.com/design/bZIqaMK97vwzBuSdD8risu/Flux?node-id=1-3427&t=BvIxuJu3KrFWy5Lg-1', source:'https://github.com/Ngh1aa/Flux' },
    'case-study-access.html': { live:'https://access-nbuz.vercel.app/', figma:'https://www.figma.com/design/tQzqKtw8x6Iu4ohKy9LOwo/access?node-id=6-1428&t=2W8CDU1K7QISp6eC-1', source:'https://github.com/Ngh1aa/Access' },
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
      const artifactURLs = new Set(artifactSpecs.map((spec) => new URL(spec.href, document.baseURI).href));
      const preserved = [...heroActions.querySelectorAll('a')].filter((link) => !matchesArtifactAction(link) && !artifactURLs.has(link.href));
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
      link.href = document.querySelector('.case-evidence-details') ? '#case-evidence' : '#project-30-sec-proof';
      link.dataset.projectRecruiterProof = 'true';
      link.textContent = document.querySelector('.case-evidence-details') ? 'Evidence details ↓' : '30-sec proof ↓';
      navActions.prepend(link);
    }

    const hero = document.querySelector('.case-hero');
    if (hero && !document.getElementById('project-30-sec-proof')) {
      const proof = document.createElement('section');
      proof.className = 'case-section project-recruiter-proof';
      proof.id = 'project-30-sec-proof';
      proof.innerHTML = `
        <header class="case-section-head">
          <span class="case-section-label">PROJECT SUMMARY</span>
          <h2>${recruiterProof.name}: decisions and evidence.</h2>
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
      const evidenceDetails = document.querySelector('.case-evidence-details-content');
      if (evidenceDetails) evidenceDetails.prepend(proof);
      else hero.after(proof);
    }
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

  const sections = [...document.querySelectorAll('.case-section[id]')];
  const tocLinks = [...document.querySelectorAll('.toc a')];
  if ('IntersectionObserver' in window && sections.length && tocLinks.length) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      tocLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }), { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach((section) => observer.observe(section));
  }

  // Keep evidence deep links usable when the supporting audit is collapsed.
  function revealEvidenceTarget() {
    const id = location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    const details = target?.closest('.case-evidence-details');
    if (details) {
      details.open = true;
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }
  document.querySelectorAll('a[href="#case-evidence"]').forEach(link => link.addEventListener('click', () => {
    document.getElementById('case-evidence').open = true;
  }));
  window.addEventListener('hashchange', revealEvidenceTarget);
  revealEvidenceTarget();
})();
