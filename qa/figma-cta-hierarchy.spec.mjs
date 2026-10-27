import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';
const artifactDir = 'qa-artifacts';

const flagships = [
  {
    "id": "luxroom",
    "caseLabel": "Case study",
    "liveLabel": "Live prototype",
    "figma": "https://www.figma.com/design/50eyqHuzpiqIYoIT9ngwcT/LuxRoom?node-id=0-1&t=HPp6OlvriN9MeZCW-1",
    "source": "https://github.com/Ngh1aa/LuxRoom",
    "caseRoute": "case-study-luxroom.html",
    "caseLiveLabel": "Live prototype ↗"
  },
  {
    "id": "atelier",
    "caseLabel": "Case study",
    "liveLabel": "Live prototype",
    "figma": "https://www.figma.com/design/Di6yDrXBRps8sN0hEZn66F/Atelier?m=auto&t=LykADgxvJ62WCIu7-1",
    "source": "https://github.com/Ngh1aa/Atelier",
    "caseRoute": "case-study-atelier.html",
    "caseLiveLabel": "Live prototype ↗"
  },
  {
    "id": "nova",
    "caseLabel": "Case study",
    "liveLabel": "Live prototype",
    "figma": "https://www.figma.com/design/AxsWZgEvTOkzOQB71iAdcx/Nova?node-id=4-2052&t=83Wo9YlCjxLTFzxv-1",
    "source": "https://github.com/Ngh1aa/Nova",
    "caseRoute": "case-study-nova.html",
    "caseLiveLabel": "Live prototype ↗"
  }
];

test('flagship cards keep one primary CTA and order Case → Live → Figma → Source', async ({ page }) => {
  await fs.mkdir(artifactDir, { recursive: true });

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });

    for (const item of flagships) {
      const card = page.locator(`[data-flagship="${item.id}"]`);
      await card.scrollIntoViewIfNeeded();
      await expect(card).toBeVisible();

      const actions = card.locator('.flagship-actions a');
      await expect(actions).toHaveCount(4);
      await expect(actions.nth(0)).toHaveText(item.caseLabel);
      await expect(actions.nth(0)).toHaveClass(/flagship-primary/);
      await expect(actions.nth(1)).toHaveText(item.liveLabel);
      await expect(actions.nth(1)).toHaveClass(/flagship-secondary/);
      await expect(actions.nth(2)).toHaveText('Figma');
      await expect(actions.nth(2)).toHaveClass(/flagship-secondary/);
      expect((await actions.nth(2).getAttribute('href')).replaceAll('&amp;', '&')).toBe(item.figma);
      await expect(actions.nth(3)).toHaveText('Source');
      await expect(actions.nth(3)).toHaveClass(/flagship-secondary/);
      await expect(actions.nth(3)).toHaveAttribute('href', item.source);

      await card.screenshot({ path: `${artifactDir}/figma-cta-${item.id}-${width}.png` });
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow, `homepage horizontal overflow at ${width}px`).toBe(false);
  }
});

test('flagship case pages keep reviewer access in Live → Figma → Source order', async ({ page }) => {
  for (const item of flagships) {
    await page.goto(`${baseURL}/${item.caseRoute}`, { waitUntil: 'domcontentloaded' });
    const actions = page.locator('.case-hero-actions a');
    const labels = (await actions.allTextContents()).map(value => value.trim());
    expect(labels.slice(0, 3)).toEqual([item.caseLiveLabel, 'View Figma ↗', 'Source ↗']);
    expect((await actions.nth(1).getAttribute('href')).replaceAll('&amp;', '&')).toBe(item.figma);
    await expect(actions.nth(2)).toHaveAttribute('href', item.source);
  }
});

for (const item of flagships) {
  for (const width of [390, 1440]) {
    for (const theme of ['light', 'dark']) {
      test(`${item.id}: narrative and expandable evidence at ${width}px / ${theme}`, async ({ page }) => {
        const pageErrors = [];
        page.on('pageerror', error => pageErrors.push(error.message));
        await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
        await page.addInitScript(theme => localStorage.setItem('portfolio-theme', theme), theme);
        await page.goto(`${baseURL}/${item.caseRoute}`, { waitUntil: 'networkidle' });
        const details = page.locator('#case-evidence');
        await expect(details).not.toHaveAttribute('open', '');
        await expect(page.locator('.case-heading')).toBeVisible();
        await expect(page.locator(item.id === 'nova' ? '#research .case-boundary' : '#case-outcome .narrative-boundary')).toBeVisible();
        const layout = await page.evaluate(() => ({
          titleY: document.querySelector('h1').getBoundingClientRect().top,
          titleBottom: document.querySelector('h1').getBoundingClientRect().bottom,
          actionsY: document.querySelector('.case-hero-actions').getBoundingClientRect().top,
          actionHeights: [...document.querySelectorAll('.case-hero-actions a')].map(a => a.getBoundingClientRect().height),
          overflow: document.documentElement.scrollWidth - innerWidth,
          visibleWords: document.body.innerText.split(/\s+/).length,
          auditVisible: document.querySelector('.senior-decision-evidence').checkVisibility(),
        }));
        expect(layout.overflow).toBeLessThanOrEqual(1);
        expect(layout.auditVisible).toBe(false);
        expect(layout.visibleWords).toBeLessThan(900);
        expect(layout.actionHeights.every(height => height >= 44 && height <= 64)).toBe(true);
        if (width === 390) {
          expect(layout.titleY).toBeLessThan(260);
          expect(layout.titleBottom).toBeLessThan(layout.actionsY);
        }
        await fs.mkdir(artifactDir, { recursive: true });
        await page.screenshot({ path: `${artifactDir}/case-narrative-${item.id}-${width}-${theme}.png` });
        await details.locator('summary').focus();
        await page.keyboard.press('Enter');
        await expect(details).toHaveAttribute('open', '');
        await expect(details.locator('[data-a27-field]')).toHaveCount(11);
        await expect(details.locator('.measurement-targets')).toContainText('TARGET — NOT A RESULT');
        if (item.id !== 'nova') await expect(details.locator('#project-30-sec-proof .project-recruiter-proof-grid > article')).toHaveCount(6);
        else await expect(details.locator('[data-a27-field="EVIDENCE"]')).toContainText('TWO ROUNDS');
        const axe = await new AxeBuilder({ page }).analyze();
        expect(axe.violations.filter(v => ['serious', 'critical'].includes(v.impact))).toEqual([]);
        await details.locator('summary').focus();
        await page.keyboard.press('Enter');
        await expect(details).not.toHaveAttribute('open', '');
        expect(pageErrors).toEqual([]);
      });
    }
  }

  test(`${item.id}: title-first mobile narrative and evidence work without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 844 } });
    const page = await context.newPage();
    await page.goto(`${baseURL}/${item.caseRoute}`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toBeVisible();
    const primary = await page.locator('.case-hero-actions .case-action-primary').boundingBox();
    expect(primary.height).toBeLessThanOrEqual(64);
    await page.locator('#case-evidence summary').click();
    await expect(page.locator('#case-evidence')).toHaveAttribute('open', '');
    await expect(page.locator('[data-a27-field="EVIDENCE"]')).toBeVisible();
    await context.close();
  });
}

test('evidence deep links open the audit below the sticky navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const item of flagships) {
    const targetId = item.id === 'nova' ? 'case-evidence' : 'project-30-sec-proof';
    await page.goto(`${baseURL}/${item.caseRoute}#${targetId}`, { waitUntil: 'networkidle' });
    await expect(page.locator('#case-evidence')).toHaveAttribute('open', '');
    const bounds = await page.evaluate(targetId => ({
      target: document.getElementById(targetId).getBoundingClientRect().top,
      nav: document.querySelector('.sticky-nav').getBoundingClientRect().bottom,
    }), targetId);
    expect(bounds.target).toBeGreaterThanOrEqual(bounds.nav);
  }
});

test('shared artifact actions stay compact across all case pages on mobile', async ({ page }) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 390, height: 844 });
  const routes = (await fs.readdir('.')).filter(name => /^case-study-.*\.html$/.test(name));
  let checked = 0;
  for (const route of routes) {
    await page.goto(`${baseURL}/${route}`, { waitUntil: 'domcontentloaded' });
    const component = page.locator('.case-hero-actions.case-artifact-actions').first();
    if (!await component.count()) continue;
    const actions = await component.locator('a').evaluateAll(links => links.map(link => ({
      href: link.href, height: link.getBoundingClientRect().height,
    })));
    expect(actions.every(action => action.height >= 44 && action.height <= 64), route).toBe(true);
    expect(new Set(actions.map(action => action.href)).size, route).toBe(actions.length);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), route).toBeLessThanOrEqual(1);
    checked += 1;
  }
  expect(checked).toBe(12);
});
