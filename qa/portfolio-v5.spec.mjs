import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 1000 },
  { name: 'desktop-1280', width: 1280, height: 900 },
  { name: 'mobile-390', width: 390, height: 844 },
];

const primeSelectedWorkMedia = async page => {
  const media = page.locator('#work .case-media img');
  await expect(media).toHaveCount(3);

  for (let index = 0; index < 3; index += 1) {
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

test.describe('Portfolio v5 cloud gate', () => {
  test('recruiter-critical content and truth labels are present', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Do Anh Nghia/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('messy middle');
    await expect(page.getByRole('heading', { name: 'Not a gallery. A decision record.' })).toBeVisible();
    await expect(page.getByText('TRUTH LABEL')).toBeVisible();
    await expect(page.getByText('INDEPENDENT REDESIGN').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Read VAS Education redesign case study/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Resume/i }).first()).toBeVisible();
  });

  test('core recruiter narrative remains visible without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Not a gallery. A decision record.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Show the leverage. Not the tool list.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Decide → make → inspect → repair.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Learning fast. Shipping deliberately.' })).toBeVisible();
    await context.close();
  });

  test('selected-work project media renders before release', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await primeSelectedWorkMedia(page);
    const media = await page.locator('#work .case-media img').evaluateAll(images =>
      images.map(img => ({
        src: img.getAttribute('src'),
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }))
    );
    const broken = media.filter(item => !item.complete || item.naturalWidth === 0 || item.naturalHeight === 0);
    expect(broken, JSON.stringify(media, null, 2)).toEqual([]);
  });

  test('capability tabs work with keyboard semantics', async ({ page }) => {
    await page.goto(`${baseURL}/#signals`, { waitUntil: 'domcontentloaded' });
    const firstTab = page.getByRole('tab', { name: /Product framing/ });
    await firstTab.focus();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowRight');
    const systemsTab = page.getByRole('tab', { name: /Systems thinking/ });
    await expect(systemsTab).toBeFocused();
    await expect(systemsTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel', { name: /Systems thinking/ })).toBeVisible();
  });

  test('mobile navigation exposes real links', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    const menu = page.getByRole('button', { name: 'Menu' });
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: 'Work', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Work', exact: true }).click();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
  });

  test('homepage has no serious or critical axe violations', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page }).analyze();
    const blockers = results.violations.filter(v => ['serious', 'critical'].includes(v.impact));
    const detail = blockers.flatMap(violation =>
      violation.nodes.map(node => {
        const target = Array.isArray(node.target) ? node.target.join(' ') : String(node.target);
        const summary = (node.failureSummary || '').replace(/\s+/g, ' ').trim();
        return `${violation.id} @ ${target}${summary ? ` — ${summary}` : ''}`;
      })
    ).join('\n');
    expect(blockers, detail || 'Serious/critical Axe violation detected').toEqual([]);
  });

  for (const viewport of viewports) {
    test(`no horizontal overflow and visual artifact: ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(baseURL, { waitUntil: 'networkidle' });
      await primeSelectedWorkMedia(page);
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
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    const paths = await page.locator('a[href$=".html"]').evaluateAll(links =>
      [...new Set(links.map(link => link.getAttribute('href')).filter(Boolean))]
    );
    expect(paths.length).toBeGreaterThanOrEqual(4);
    for (const path of paths) {
      const response = await request.get(`${baseURL}/${path}`);
      expect(response.status(), `${path} should resolve`).toBeLessThan(400);
    }
  });

  test('theme preference is a working enhancement', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    const toggle = page.getByRole('button', { name: 'Switch color theme' });
    const before = await page.locator('html').getAttribute('data-theme');
    await toggle.click();
    const after = await page.locator('html').getAttribute('data-theme');
    expect(after).not.toBe(before);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', after);
  });
});
