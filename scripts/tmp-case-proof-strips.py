from pathlib import Path

path = Path('case-study.js')
source = path.read_text(encoding='utf-8')
marker = '  /* Nova: make the product-design work recruiter-visible before long-form reading. */'
if marker not in source:
    raise SystemExit('Nova marker missing in case-study.js')

sentinel = '  /* A32 reusable 30-second recruiter proof for selected cases. */'
if sentinel not in source:
    block = r'''  /* A32 reusable 30-second recruiter proof for selected cases. */
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

'''
    source = source.replace(marker, block + marker, 1)
    path.write_text(source, encoding='utf-8')

qa_path = Path('qa/portfolio-v5.spec.mjs')
qa = qa_path.read_text(encoding='utf-8')
qa_marker = "test('A32 case studies expose a 30-second proof strip with honest evidence boundaries'"
if qa_marker not in qa:
    qa += r'''

test('A32 case studies expose a 30-second proof strip with honest evidence boundaries', async ({ page }) => {
  for (const route of ['case-study-luxroom.html', 'case-study-flux.html', 'case-study-uiux-factory.html']) {
    await page.goto(`/${route}`);
    await expect(page.locator('#project-30-sec-proof')).toHaveCount(1);
    await expect(page.locator('#project-30-sec-proof .project-recruiter-proof-grid > article')).toHaveCount(6);
    await expect(page.locator('#project-30-sec-proof')).toContainText('Still open');
  }
  await page.goto('/case-study-luxroom.html');
  await expect(page.locator('#project-30-sec-proof')).toContainText('direct-user baseline not measured');
  await page.goto('/case-study-uiux-factory.html');
  await expect(page.locator('#project-30-sec-proof')).toContainText('human workflow impact not measured');
});
'''
    qa_path.write_text(qa, encoding='utf-8')

print('A32 reusable case proof strips applied.')
