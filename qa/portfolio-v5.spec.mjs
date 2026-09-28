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
    await expect(page.locator('#flagships .flagship-card').first().getByRole('heading', { level: 3 })).toHaveText('UIUX Factory');
    await expect(page.locator('#flagships a[href="case-study-uiux-factory.html"]').first()).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-nova.html"]').first()).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-sentry.html"]').first()).toBeVisible();
    await expect(page.getByText(/Evidence boundary:/).first()).toBeVisible();
    await expect(page.locator('#ai-workflow')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI is a multiplier, not the product owner.' })).toBeVisible();
    await expect(page.getByText(/Human-owned:/)).toBeVisible();
    await expect(page.getByRole('link', { name: /Inspect agent contract/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Inspect cloud QA/i })).toBeVisible();
    await expect(page.locator('#writing')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'From AI tools to design governance' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Breadth without diluting the narrative.' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Resume/i }).first()).toHaveAttribute('href', 'Do_Anh_Nghia_Product_Designer_CV.pdf');
    await expect(page.locator('.preloader')).toBeHidden({ timeout: 4000 });
    await expect(page.locator('.experience-grid')).toBeVisible();
    await expect(page.locator('.experience-grid .exp-card')).toHaveCount(3);
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
    await expect(page.getByRole('heading', { name: 'Range across domains.' })).toBeVisible();
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
});