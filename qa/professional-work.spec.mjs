import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';
const route = `${baseURL}/case-study-professional-work.html`;

const seriousAxeViolations = async page => {
  const results = await new AxeBuilder({ page }).analyze();
  return results.violations.filter(v => ['serious', 'critical'].includes(v.impact));
};

test('professional work case stays grounded in verified employment scope', async ({ page }) => {
  const source = await fs.readFile('case-study-professional-work.html', 'utf8');
  for (const company of ['MangoAds', 'Tikera Technology', 'Trésor Solution']) expect(source).toContain(company);
  expect(source).toContain('8+ web projects');
  expect(source).toContain('15+ product flows');
  expect(source).toContain('No invented impact');
  expect(source).toContain('Independent concepts such as Nova, Sentry and LuxRoom are not presented as client work or production outcomes.');
  expect(source).not.toMatch(/\bSenior Product Designer\b/);
  expect(source).not.toMatch(/conversion (increased|improved|lifted)|revenue (increased|improved|lifted)/i);

  await page.goto(route, { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle(/Professional Work/);
  await expect(page.getByRole('heading', { level: 1, name: 'Professional Work' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Real work first. Unknown outcomes stay unknown.' })).toBeVisible();
  await expect(page.getByText(/MangoAds · UI\/UX Designer/)).toBeVisible();
  await expect(page.getByText(/Tikera Technology · UI\/UX Designer/)).toBeVisible();
  await expect(page.getByText(/Trésor Solution · Intern UI\/UX Designer/)).toBeVisible();
});

for (const viewport of [
  { name: 'desktop-1440', width: 1440, height: 1000 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
]) {
  test(`professional work renders without overflow: ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(route, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
    await fs.mkdir('qa-artifacts', { recursive: true });
    await page.screenshot({ path: `qa-artifacts/professional-work-${viewport.name}.png`, fullPage: true });
  });
}

test('professional work has no serious or critical axe violations', async ({ page }) => {
  await page.goto(route, { waitUntil: 'networkidle' });
  const blockers = await seriousAxeViolations(page);
  expect(blockers, JSON.stringify(blockers, null, 2)).toEqual([]);
});
