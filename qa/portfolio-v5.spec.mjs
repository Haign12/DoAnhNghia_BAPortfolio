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
  { path: 'case-study-nova.html', heading: 'Nova' },
  { path: 'case-study-sentry.html', heading: 'Sentry' },
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
    await page.waitForTimeout(40);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
};

const primePortfolioMedia = async page => {
  const media = page.locator('#flagships .flagship-media img, #work .project-media img');
  await expect(media).toHaveCount(14);

  for (let index = 0; index < 14; index += 1) {
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

test.describe('Product Designer portfolio cloud gate', () => {
  test('recruiter-critical product positioning and flagship proof are present', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Product Designer/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/PRODUCT/);
    await expect(page.locator('#flagships')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Three cases/i })).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-nova.html"]').first()).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-sentry.html"]').first()).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-atelier.html"]').first()).toBeVisible();
    await expect(page.getByText(/Evidence boundary:/).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Range across domains.' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Resume/i }).first()).toBeVisible();
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

  test('industry filters expose clear programmatic state', async ({ page }) => {
    await page.goto(`${baseURL}/#work`, { waitUntil: 'domcontentloaded' });
    const all = page.getByRole('button', { name: /All 13/ });
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

  test('mobile navigation exposes real links and resets expanded state', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    const menu = page.getByRole('button', { name: 'Open navigation' });
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    const work = page.getByRole('link', { name: 'Work', exact: true });
    await expect(work).toBeVisible();
    await work.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#flagships')).toBeVisible();
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
    expect(paths.length).toBeGreaterThanOrEqual(9);
    expect(paths).toContain('case-study-nova.html');
    expect(paths).toContain('case-study-sentry.html');
    expect(paths).toContain('case-study-atelier.html');
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
