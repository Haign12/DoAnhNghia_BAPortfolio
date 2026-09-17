import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 1000 },
  { name: 'desktop-1280', width: 1280, height: 900 },
  { name: 'tablet-1024', width: 1024, height: 900 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
];

const flagships = [
  { path: 'case-study-nova.html', heading: 'Nova' },
  { path: 'case-study-sentry.html', heading: 'Sentry' },
  { path: 'case-study-atelier.html', heading: 'Atelier' },
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

const primeImages = async page => {
  const images = page.locator('img');
  const count = await images.count();
  for (let index = 0; index < count; index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(async img => {
      if (!img.complete) {
        await new Promise((resolve, reject) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', () => reject(new Error(`Image failed to load: ${img.currentSrc || img.src}`)), { once: true });
        });
      }
      if (!img.naturalWidth || !img.naturalHeight) {
        throw new Error(`Image has no rendered dimensions: ${img.currentSrc || img.src}`);
      }
      if (typeof img.decode === 'function') {
        try { await img.decode(); } catch (_) {}
      }
    });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
};

const collectRuntimeErrors = page => {
  const errors = [];
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  return errors;
};

test.describe('Evidence-first portfolio 2026 gate', () => {
  test('recruiter-first positioning, flagship hierarchy and evidence labels are present', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Do Anh Nghia/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Complex flows.');
    await expect(page.locator('#flagships .flagship')).toHaveCount(3);
    await expect(page.locator('a[href="case-study-nova.html"]').first()).toBeVisible();
    await expect(page.locator('a[href="case-study-sentry.html"]').first()).toBeVisible();
    await expect(page.locator('a[href="case-study-atelier.html"]').first()).toBeVisible();
    for (const label of ['IMPLEMENTED', 'BENCHMARK', 'HYPOTHESIS', 'TARGET METRIC', 'BOUNDARY', 'NEXT EVIDENCE']) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }
    await expect(page.getByText('Product Designer / strong Mid-level')).toBeVisible();
    await expect(page.getByRole('link', { name: /Resume/i })).toBeVisible();
  });

  test('unsupported numerical impact claims removed from public homepage', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    const text = await page.locator('body').innerText();
    for (const unsupported of ['-30%', '+22%', '-25%', '100% state coverage', '0 handoff blockers', '100% on-time']) {
      expect(text.toLowerCase()).not.toContain(unsupported.toLowerCase());
    }
  });

  test('core narrative remains readable without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Depth before/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Credibility before/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /AI speeds the loop/ })).toBeVisible();
    await context.close();
  });

  test('homepage images load and runtime has no console/page errors', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page);
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await primeImages(page);
    const media = await page.locator('img').evaluateAll(images => images.map(img => ({
      src: img.getAttribute('src'), complete: img.complete, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
    })));
    expect(media.length).toBeGreaterThanOrEqual(11);
    const broken = media.filter(item => !item.complete || item.naturalWidth === 0 || item.naturalHeight === 0);
    expect(broken, JSON.stringify(media, null, 2)).toEqual([]);
    expect(runtimeErrors).toEqual([]);
  });

  test('mobile navigation exposes recruiter-priority destinations', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    const menu = page.getByRole('button', { name: 'Toggle navigation' });
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: 'Flagships' })).toBeVisible();
    await page.getByRole('link', { name: 'Flagships' }).click();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#flagships')).toBeInViewport();
  });

  test('legacy #work backlink still lands on recruiter-priority work', async ({ page }) => {
    await page.goto(`${baseURL}/#work`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#work')).toBeVisible();
    await expect.poll(async () => {
      const top = await page.locator('#work').evaluate(el => Math.abs(el.getBoundingClientRect().top));
      return top;
    }, { timeout: 1500 }).toBeLessThan(140);
  });

  test('homepage has no serious or critical Axe violations', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    const blockers = await seriousAxeViolations(page);
    expect(blockers, formatAxeViolations(blockers) || 'Serious/critical Axe violation detected').toEqual([]);
  });

  test('reduced motion keeps content visible and disables reveal transitions', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    const firstReveal = page.locator('.reveal').first();
    await expect(firstReveal).toBeVisible();
    const styles = await firstReveal.evaluate(el => {
      const style = getComputedStyle(el);
      return { opacity: style.opacity, transform: style.transform, transitionDuration: style.transitionDuration };
    });
    expect(styles.opacity).toBe('1');
    expect(styles.transform).toBe('none');
    expect(styles.transitionDuration).toBe('0s');
    await context.close();
  });

  for (const viewport of viewports) {
    test(`no horizontal overflow and rendered artifact: ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(baseURL, { waitUntil: 'networkidle' });
      await primeImages(page);
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
    for (const path of paths) {
      const response = await request.get(`${baseURL}/${path}`);
      expect(response.status(), `${path} should resolve`).toBeLessThan(400);
    }
  });

  test('recruiter resume stays evidence-safe and responsive', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseURL}/resume.html`, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1, name: 'Do Anh Nghia' })).toBeVisible();
    const text = await page.locator('body').innerText();
    for (const unsupported of ['-30%', '+22%', '-25%', '100% state coverage', '0 handoff blockers', '100% on-time']) {
      expect(text.toLowerCase()).not.toContain(unsupported.toLowerCase());
    }
    const overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
  });

  for (const flagship of flagships) {
    test(`${flagship.heading} flagship renders accessibly without overflow`, async ({ page }) => {
      const runtimeErrors = collectRuntimeErrors(page);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseURL}/${flagship.path}`, { waitUntil: 'networkidle' });
      await expect(page.getByRole('heading', { level: 1, name: flagship.heading })).toBeVisible();
      await expect(page.locator('.case-boundary').first()).toBeVisible();
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
      const blockers = await seriousAxeViolations(page);
      expect(blockers, formatAxeViolations(blockers) || `${flagship.heading}: serious/critical Axe violation detected`).toEqual([]);
      expect(runtimeErrors).toEqual([]);
    });
  }
});
