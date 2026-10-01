import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 1000 },
  { name: 'desktop-1280', width: 1280, height: 900 },
  { name: 'mobile-390', width: 390, height: 844 },
];

const criticalCaseStudies = [
  { path: 'case-study-uiux-factory.html', heading: 'UIUX Factory' },
  { path: 'case-study-nova.html', heading: 'Nova' },
  { path: 'case-study-sentry.html', heading: 'Sentry' },
  { path: 'case-study-flux.html', heading: 'Flux' },
  { path: 'case-study-access.html', heading: 'ACCESS' },
  { path: 'case-study-atelier.html', heading: 'Atelier' },
  { path: 'case-study-vas-education.html', heading: 'VAS Education' },
  { path: 'case-study-violet-marketplace.html', heading: 'Violet Marketplace' },
  { path: 'case-study-cennext.html', heading: 'CENNEXT' },
  { path: 'case-study-voltis.html', heading: 'VOLTIS' },
  { path: 'case-study-lumen.html', heading: 'LUMEN' },
  { path: 'case-study-hue.html', heading: 'HUẾ — Between River & Citadel' },
];

const seriousAxeViolations = async page => {
  const results = await new AxeBuilder({ page }).analyze();
  return results.violations.filter(v => ['serious', 'critical'].includes(v.impact));
};

const formatAxeViolations = blockers => blockers.flatMap(violation =>
  violation.nodes.map(node => {
    const target = Array.isArray(node.target) ? node.target.join(' ') : String(node.target);
    const summary = (node.failureSummary || '').replace(/\s+/g, ' ').trim();
    return `${violation.id} @ ${target}${summary ? ` — ${summary}` : ''}`;
  })
).join('\n');

const primeRevealContent = async page => {
  const reveals = page.locator('.reveal');
  const count = await reveals.count();
  for (let index = 0; index < count; index += 1) {
    await reveals.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(35);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
};

const primePortfolioMedia = async page => {
  const flagshipMedia = page.locator('#flagships .flagship-media img');
  const supportingMedia = page.locator('#work .project-media img');
  await expect(flagshipMedia).toHaveCount(3);
  await expect(supportingMedia).toHaveCount(14);

  const media = page.locator('#flagships .flagship-media img, #work .project-media img');
  const count = await media.count();
  for (let index = 0; index < count; index += 1) {
    const image = media.nth(index);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(async img => {
      if (!img.complete) {
        await new Promise((resolve, reject) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', reject, { once: true });
        });
      }
      if (typeof img.decode === 'function') await img.decode();
    });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
};

test.describe('Product Designer + AI-assisted workflow portfolio cloud gate', () => {
  test('recruiter-critical product narrative, AI workflow and flagship proof are present', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Product Designer/);
    const hero = page.getByRole('heading', { level: 1 });
    await expect(hero).toContainText(/PRODUCT/);
    await expect(hero).toContainText(/AI \+ QA/);
    await expect(page.getByText(/Product Designer · Fintech \/ B2B · AI-assisted design-to-code/)).toBeVisible();
    await expect(page.locator('#flagships')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Three cases/i })).toBeVisible();
    const flagshipNames = await page.locator('#flagships [data-flagship] h3').allTextContents();
    expect(flagshipNames).toEqual(['Nova', 'Sentry', 'LuxRoom']);
    await expect(page.locator('#flagships a[href="case-study-nova.html"]').first()).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-sentry.html"]').first()).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-luxroom.html"]').first()).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-uiux-factory.html"]')).toHaveCount(0);
    await expect(page.locator('#ai-workflow a[href="case-study-uiux-factory.html"]')).toBeVisible();
    await expect(page.getByText(/Evidence boundary:/).first()).toBeVisible();
    await expect(page.locator('#ai-workflow')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI is a multiplier, not the product owner.' })).toBeVisible();
    await expect(page.getByText(/Human-owned:/)).toBeVisible();
    await expect(page.getByRole('link', { name: /Inspect agent contract/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Inspect cloud QA/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Inspect Next\/TS proof/i })).toBeVisible();
    await expect(page.locator('#writing')).toBeVisible();
    await expect(page.locator('#writing-title')).toBeVisible();
    await expect(page.locator('#writing-title')).toHaveText('From AI tools to design governance.');
    await expect(page.getByRole('heading', { name: 'Breadth, with proof attached.' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Resume/i }).first()).toHaveAttribute('href', 'Do_Anh_Nghia_Product_Designer_CV.pdf');
    await expect(page.locator('.preloader')).toBeHidden({ timeout: 4000 });
    await expect(page.locator('.experience-grid')).toBeVisible();
    await expect(page.locator('.experience-grid .exp-card')).toHaveCount(3);
  });

  test('raw homepage is the recruiter source of truth before runtime JavaScript', async () => {
    const source = await fs.readFile('index.html', 'utf8');
    expect(source).not.toContain('portfolio-product-upgrade.js');
    expect(source).not.toContain('<a href="#">Case ↗</a>');
    expect(source).toContain('id="ai-workflow"');
    expect(source).toContain('id="writing"');
    expect(source).toContain('case-study-flux.html');
    expect(source).toContain('case-study-access.html');
    expect(source).toContain('data-project="hue-between-river-citadel"');
    expect(source).toContain('Culture &amp; Experimental <b>2</b>');
    expect((source.match(/<span class="project-no">/g) || []).length).toBe(14);
    expect(source).toContain('ambiguous product problems into clear systems and working prototypes');
    expect(source).toContain('product judgment and evidence stay human-owned');
    expect(source).toContain('Static prototypes stay labeled honestly');
    expect(source).toContain('CI-verified Next.js 16 / React 19 / TypeScript 7 implementation');
    expect(source).toContain('Do_Anh_Nghia_Product_Designer_CV.pdf');
    expect(source).toContain('data-flagship="nova"');
    expect(source).toContain('data-flagship="sentry"');
    expect(source).toContain('data-flagship="luxroom"');
    expect(source).toContain('Technical QA proves implementation behavior, not user comprehension or business impact.');
    expect(source).toContain('case-study-professional-work.html');
    expect(source).toContain('https://github.com/Ngh1aa/Reslove-AI');
    expect(source).toContain('nova-card-scoreboard');
    expect(source).toContain('Recovery clarity · regression signal');
    expect(source).toContain('async self-report records');
    expect(source).toContain('Read Nova case ↗');
    expect(source).toContain('Live prototype ↗');
    expect(source).toContain('Figma ↗');
  });

  test('supporting case links are real routes instead of placeholders', async ({ page }) => {
    await page.goto(`${baseURL}/#work`, { waitUntil: 'networkidle' });
    await expect(page.locator('#work .project-links a[href="#"]')).toHaveCount(0);
    await expect(page.locator('#work a[href="case-study-flux.html"]')).toHaveCount(1);
    await expect(page.locator('#work a[href="case-study-access.html"]')).toHaveCount(1);
    await expect(page.locator('#work a[href="case-study-uiux-factory.html"]')).toHaveCount(1);
  });

  test('core recruiter narrative remains visible without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Decisions before screens.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Three cases/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Breadth, with proof attached.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI is a multiplier, not the product owner.' })).toBeVisible();
    await expect(page.locator('#writing-title')).toHaveText('From AI tools to design governance.');
    await expect(page.locator('#work a[href="case-study-flux.html"]')).toHaveCount(1);
    await expect(page.locator('#work a[href="case-study-access.html"]')).toHaveCount(1);
    await expect(page.getByText(/Independent concept/).first()).toBeVisible();
    await context.close();
  });

  test('flagship and supporting project media render before release', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await primePortfolioMedia(page);
    const media = await page.locator('#flagships .flagship-media img, #work .project-media img').evaluateAll(images => images.map(img => ({
      src: img.getAttribute('src'), complete: img.complete, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
    })));
    const broken = media.filter(item => !item.complete || item.naturalWidth === 0 || item.naturalHeight === 0);
    expect(broken, JSON.stringify(media, null, 2)).toEqual([]);
  });

  test('HUẾ — Between River & Citadel joins Cultural & Experimental with working live proof', async ({ page }) => {
    await page.goto(`${baseURL}/#group-culture`, { waitUntil: 'networkidle' });
    await expect(page.locator('#group-culture [data-project="hue-between-river-citadel"]')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'HUẾ — Between River & Citadel', exact: true })).toBeVisible();
    await expect(page.locator('#group-culture .group-count-badge')).toHaveText('02 Projects');
    await expect(page.locator('#group-culture a[href="https://ngh1aa.github.io/Mostar-Guide/"]').first()).toBeVisible();
    await expect(page.locator('#group-culture [data-project="hue-between-river-citadel"] img')).toHaveAttribute('src', /\/assets\/hue\/scenes\/02-citadel-backdrop\.webp$/);
  });

  test('industry filters expose clear programmatic state', async ({ page }) => {
    await page.goto(`${baseURL}/#work`, { waitUntil: 'domcontentloaded' });
    const all = page.getByRole('button', { name: /All 14/ });
    const fintech = page.getByRole('button', { name: /Fintech 3/ });
    await expect(all).toHaveAttribute('aria-pressed', 'true');
    await expect(fintech).toHaveAttribute('aria-pressed', 'false');
    await fintech.click();
    await expect(fintech).toHaveAttribute('aria-pressed', 'true');
    await expect(all).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#group-fintech')).toBeVisible();
    await expect(page.locator('#group-commerce')).toBeHidden();
    await all.click();
    await expect(all).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#group-commerce')).toBeVisible();
  });

  test('mobile navigation and professional experience adapt to one-column layout', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    const menu = page.getByRole('button', { name: 'Open navigation' });
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: 'AI workflow', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Writing', exact: true })).toBeVisible();
    const work = page.getByRole('link', { name: 'Work', exact: true });
    await work.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#flagships')).toBeVisible();
    const experienceColumns = await page.locator('.experience-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(/\s+/).filter(Boolean).length);
    expect(experienceColumns).toBe(1);
    const firstExperienceBox = await page.locator('.experience-grid .exp-card').first().boundingBox();
    expect(firstExperienceBox?.width || 0).toBeGreaterThan(300);
  });

  test('homepage has no serious or critical axe violations', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    const blockers = await seriousAxeViolations(page);
    expect(blockers, formatAxeViolations(blockers) || 'Serious/critical Axe violation detected').toEqual([]);
  });

  for (const viewport of viewports) {
    test(`no horizontal overflow and visual artifact: ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(baseURL, { waitUntil: 'networkidle' });
      await expect(page.locator('.preloader')).toBeHidden({ timeout: 4000 });
      await primePortfolioMedia(page);
      await primeRevealContent(page);
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
      await fs.mkdir('qa-artifacts', { recursive: true });
      await page.screenshot({ path: `qa-artifacts/${viewport.name}.png`, fullPage: true });
    });
  }

  test('measurement targets are explicit targets, never fabricated results', async () => {
    const registry = JSON.parse(await fs.readFile('docs/measurement-targets.json', 'utf8'));
    expect(registry.policy.target_is_not_result).toBe(true);
    expect(registry.policy.result_requires_traceable_evidence).toBe(true);
    expect(registry.projects.length).toBeGreaterThanOrEqual(21);
    for (const caseStudy of criticalCaseStudies) {
      const source = await fs.readFile(caseStudy.path, 'utf8');
      expect(source).toContain('A26_MEASUREMENT_TARGETS');
      expect(source).toContain('TARGET — NOT A RESULT');
      expect(source).toContain('No invented before/after delta.');
    }
    const home = await fs.readFile('index.html', 'utf8');
    expect(home).toContain('Technical QA proves implementation behavior, not user comprehension or business impact.');
    expect(home).toContain('Observed commerce testing and conversion impact are still unmeasured.');
  });

  test('primary local routes referenced from home resolve', async ({ page, request }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    const paths = await page.locator('a[href$=".html"]').evaluateAll(links => [...new Set(
      links.map(link => link.getAttribute('href')).filter(Boolean)
    )]);
    expect(paths.length).toBeGreaterThanOrEqual(12);
    expect(paths).toContain('case-study-uiux-factory.html');
    expect(paths).toContain('case-study-nova.html');
    expect(paths).toContain('case-study-sentry.html');
    expect(paths).toContain('case-study-flux.html');
    expect(paths).toContain('case-study-access.html');
    expect(paths).toContain('writing-design-ops-ai.html');
    for (const path of paths) {
      const response = await request.get(`${baseURL}/${path}`);
      expect(response.status(), `${path} should resolve`).toBeLessThan(400);
    }
  });

  for (const caseStudy of criticalCaseStudies) {
    test(`${caseStudy.heading} case study renders accessibly without horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseURL}/${caseStudy.path}`, { waitUntil: 'domcontentloaded' });
      await expect(page.getByRole('heading', { level: 1, name: caseStudy.heading })).toBeVisible();
      await expect(page.locator('.case-evidence-strip').first()).toBeVisible();
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
      const blockers = await seriousAxeViolations(page);
      expect(blockers, formatAxeViolations(blockers) || `${caseStudy.heading}: serious/critical Axe violation detected`).toEqual([]);
    });
  }

  test('thought leadership article renders accessibly and keeps claim boundaries visible', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseURL}/writing-design-ops-ai.html`, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1, name: 'From AI tools to design governance' })).toBeVisible();
    await expect(page.getByText(/A process becomes leadership evidence when it helps someone else/i)).toBeVisible();
    const overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
    const blockers = await seriousAxeViolations(page);
    expect(blockers, formatAxeViolations(blockers) || 'Thought leadership article: serious/critical Axe violation detected').toEqual([]);
  });

  test('Nova case-study theme preference is a working enhancement', async ({ page }) => {
    await page.goto(`${baseURL}/case-study-nova.html`, { waitUntil: 'domcontentloaded' });
    const toggle = page.locator('#theme-toggle');
    const before = await page.locator('html').getAttribute('data-theme');
    await toggle.click();
    const after = await page.locator('html').getAttribute('data-theme');
    expect(after).not.toBe(before);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', after);
  });
  test('A27 senior decision evidence is explicit and honest across every local case', async () => {
    const registry = JSON.parse(await fs.readFile('docs/senior-decision-evidence.json', 'utf8'));
    expect(registry.policy.no_invented_team_or_stakeholders).toBe(true);
    expect(registry.policy.no_invented_failure_or_pivot).toBe(true);
    expect(registry.policy.no_invented_engineering_collaboration).toBe(true);
    expect(registry.policy.no_invented_outcome).toBe(true);
    expect(registry.projects).toHaveLength(20);
    const required = ['ROLE','TEAM','CONSTRAINT','OPTIONS','DECISION','TRADE-OFF','ENGINEERING','SYSTEM IMPACT','WHAT WENT WRONG','EVIDENCE','NEXT DECISION'];
    expect(registry.required_fields).toEqual(required);
    for (const item of registry.projects) {
      const source = await fs.readFile(item.surface, 'utf8');
      expect(source).toContain('A27_SENIOR_DECISION_EVIDENCE');
      for (const field of required) expect(source).toContain(`data-a27-field="${field}"`);
      expect(item.evidence).toMatch(/NOT MEASURED|RECRUITING|TARGET|VERIFIED|NOT AN OUTCOME/i);
      expect(item.team.length).toBeGreaterThan(20);
      expect(item.next_decision.length).toBeGreaterThan(20);
    }
    const factory = registry.projects.find(item => item.surface === 'case-study-uiux-factory.html');
    expect(factory.what_went_wrong).toMatch(/raw-source|runtime repair/i);
    const nova = registry.projects.find(item => item.surface === 'case-study-nova.html');
    expect(nova.audit.options_documented).toBe(true);
    expect(nova.audit.tradeoff_documented).toBe(true);
    const sentry = registry.projects.find(item => item.surface === 'case-study-sentry.html');
    expect(sentry.audit.options_documented).toBe(true);
    expect(sentry.audit.tradeoff_documented).toBe(true);
  });


  test('A28 recruiter scan maps senior-level capabilities to inspectable project proof without claiming tenure', async ({ page }) => {
    const registry = JSON.parse(await fs.readFile('docs/recruiter-capability-map.json', 'utf8'));
    expect(registry.policy.capability_evidence_is_not_tenure).toBe(true);
    expect(registry.policy.do_not_invent_cross_functional_team_evidence).toBe(true);
    expect(registry.capabilities).toHaveLength(6);

    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.hero-signal-list li')).toHaveCount(5);
    await expect(page.locator('.capability-proof-card')).toHaveCount(6);
    await expect(page.getByText(/evidence of scope and decision quality, not a tenure claim/i)).toBeVisible();

    for (const capability of registry.capabilities) {
      const card = page.locator(`.capability-proof-card[data-capability="${capability.id}"]`);
      await expect(card).toHaveCount(1);
      const hrefs = await card.locator('a').evaluateAll(links => links.map(link => link.getAttribute('href')));
      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of capability.proof) expect(hrefs).toContain(href);
      expect(hrefs).not.toContain('#');
    }

    for (const project of ['Nova', 'Sentry', 'LuxRoom']) {
      const card = page.locator('#flagships .flagship-card', { has: page.getByRole('heading', { level: 3, name: project }) });
      await expect(card).toHaveCount(1);
      expect(await card.locator('.flagship-senior-signals span').count()).toBeGreaterThanOrEqual(4);
    }
    await expect(page.locator('#flagships')).not.toContainText('UIUX Factory');
    await expect(page.locator('#ai-workflow')).toContainText('UIUX Factory');
  });


  test('A29 supporting work behaves as a skill evidence library with 2–3 grounded capability signals per project', async ({ page }) => {
    const registry = JSON.parse(await fs.readFile('docs/supporting-capability-signals.json', 'utf8'));
    expect(registry.policy.signals_are_evidence_labels_not_proficiency_scores).toBe(true);
    expect(registry.policy.signals_do_not_imply_tenure).toBe(true);
    expect(registry.policy.no_cross_functional_collaboration_inferred).toBe(true);
    expect(registry.projects).toHaveLength(14);

    await page.goto(`${baseURL}/#work`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#work[data-a29="skill-evidence-library"]')).toHaveCount(1);
    await expect(page.locator('#work .project-capability-signals')).toHaveCount(14);
    await expect(page.getByRole('heading', { name: 'Breadth, with proof attached.', exact: true })).toBeVisible();

    for (const project of registry.projects) {
      expect(project.signals.length).toBeGreaterThanOrEqual(2);
      expect(project.signals.length).toBeLessThanOrEqual(3);
      const card = page.locator('#work article.project, #work article.project-featured').filter({ has: page.getByRole('heading', { level: 3, name: project.project, exact: true }) });
      await expect(card).toHaveCount(1);
      const chips = card.locator('.project-capability-signals span');
      await expect(chips).toHaveCount(project.signals.length);
      expect(await chips.allTextContents()).toEqual(project.signals);
    }
  });


  test('A30 project evidence completeness keeps public proof scannable without fabricating maturity, timelines or outcomes', async ({ page }) => {
    const registry = JSON.parse(await fs.readFile('docs/project-maturity-audit.json', 'utf8'));
    expect(registry.policy.artifact_maturity_is_not_designer_seniority).toBe(true);
    expect(registry.policy.maturity_level_is_internal_audit_not_public_badge).toBe(true);
    expect(registry.policy.no_invented_timeline).toBe(true);
    expect(registry.policy.no_invented_user_validation).toBe(true);
    expect(registry.projects).toHaveLength(14);
    for (const item of registry.projects) {
      expect(item.artifact_maturity_level).toBeGreaterThanOrEqual(1);
      expect(item.artifact_maturity_level).toBeLessThanOrEqual(5);
      expect(item.role.length).toBeGreaterThan(3);
      expect(item.scope.length).toBeGreaterThan(8);
      expect(item.complexity.length).toBeGreaterThan(8);
    }

    const source = await fs.readFile('index.html', 'utf8');
    expect(source).toContain('A30_PROJECT_EVIDENCE_COMPLETENESS');
    expect(source).not.toMatch(/Level [1-5] —/);
    expect(source).toContain('case-study-lumen.html');
    expect(source).toContain('case-study-hue.html');

    await page.goto(`${baseURL}/#work`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#work .project-proof-facts')).toHaveCount(14);
    for (const card of await page.locator('#work article.project, #work article.project-featured').all()) {
      await expect(card.locator('.project-proof-facts span')).toHaveCount(5);
    }
    await expect(page.getByText(/Project-duration claims stay unpublished until they are source-backed/i)).toBeVisible();

    for (const route of ['case-study-lumen.html','case-study-hue.html']) {
      const caseSource = await fs.readFile(route, 'utf8');
      expect(caseSource).toContain('A27_SENIOR_DECISION_EVIDENCE');
      expect(caseSource).toContain('A26_MEASUREMENT_TARGETS');
      expect(caseSource).toContain('TARGET — NOT A RESULT');
      expect(caseSource).toContain('Figma</dt><dd>Not published — no link fabricated');
    }
  });

});

test('A32 selected project cards expose evidence state without seniority scoring', async ({ page }) => {
  await page.goto(baseURL);
  await expect(page.locator('link[href*="project-proof-strip.css"]')).toHaveCount(1);
  await expect(page.locator('#work .project-proof-strip')).toHaveCount(14);
  const nova = page.locator('#work article', { has: page.getByRole('heading', { level: 3, name: 'Nova' }) });
  await expect(nova.locator('.project-proof-strip')).toContainText('10 real-user records');
  await expect(nova.locator('.project-proof-strip')).toContainText('4 findings · still open');
  const factory = page.locator('#work article', { has: page.getByRole('heading', { level: 3, name: 'UIUX Factory' }) });
  await expect(factory.locator('.project-proof-strip')).toContainText('Human impact · not measured');
});


test('A32 case studies expose a 30-second proof strip with honest evidence boundaries', async ({ page }) => {
  for (const route of ['case-study-luxroom.html', 'case-study-flux.html', 'case-study-uiux-factory.html']) {
    await page.goto(`${baseURL}/${route}`);
    await expect(page.locator('#project-30-sec-proof')).toHaveCount(1);
    await expect(page.locator('#project-30-sec-proof .project-recruiter-proof-grid > article')).toHaveCount(6);
    await expect(page.locator('#project-30-sec-proof')).toContainText('Still open');
  }
  await page.goto(`${baseURL}/case-study-luxroom.html`);
  await expect(page.locator('#project-30-sec-proof')).toContainText('direct-user baseline not measured');
  await page.goto(`${baseURL}/case-study-uiux-factory.html`);
  await expect(page.locator('#project-30-sec-proof')).toContainText('human workflow impact not measured');
});


// LEAN_FLAGSHIP_HOME_V2

test('lean homepage prioritizes Nova, Sentry and LuxRoom while Factory moves to How I work', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });

  const names = await page.locator('#flagships [data-flagship] h3').allTextContents();
  expect(names).toEqual(['Nova', 'Sentry', 'LuxRoom']);
  await expect(page.locator('#flagships')).not.toContainText('UIUX Factory');
  await expect(page.locator('#ai-workflow')).toContainText('UIUX Factory');
  await expect(page.locator('a[href="case-study-professional-work.html"]').first()).toBeVisible();
  await expect(page.locator('#ai-workflow a[href="case-study-uiux-factory.html"]')).toBeVisible();

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow, `homepage horizontal overflow at ${width}px`).toBe(false);
    await page.locator('#flagships').scrollIntoViewIfNeeded();
    await page.locator('#flagships').screenshot({ path: `qa-artifacts/lean-flagships-${width}.png` });
    await page.locator('#ai-workflow').scrollIntoViewIfNeeded();
    await page.locator('#ai-workflow').screenshot({ path: `qa-artifacts/how-i-work-${width}.png` });
  }
});
