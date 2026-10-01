import { test, expect } from '@playwright/test';

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';

const assertOrderedKinds = (kinds) => {
  expect(kinds[0]).toBe('case');
  const rank = { case: 0, live: 1, figma: 2, source: 3 };
  for (let i = 1; i < kinds.length; i += 1) expect(rank[kinds[i]]).toBeGreaterThan(rank[kinds[i - 1]]);
};

test('every supporting project card uses case → live → figma → source hierarchy', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${baseURL}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.project-actions.project-artifact-actions');

  const cards = page.locator('.project-proof-card:has(.project-actions)');
  const count = await cards.count();
  expect(count).toBeGreaterThanOrEqual(11);

  for (let i = 0; i < count; i += 1) {
    const card = cards.nth(i);
    const title = (await card.locator('h3').innerText()).trim();
    const actions = card.locator('.project-actions a');
    const labels = (await actions.allTextContents()).map((value) => value.trim());
    const kinds = await actions.evaluateAll((nodes) => nodes.map((node) => node.dataset.artifactKind));

    expect(labels[0], `${title}: first CTA`).toMatch(/^Read case/);
    expect(await actions.nth(0).getAttribute('class'), `${title}: primary class`).toContain('project-artifact-primary');
    expect(kinds, `${title}: artifact kinds`).not.toContain(undefined);
    assertOrderedKinds(kinds);
    expect(await actions.nth(0).getAttribute('href'), `${title}: case route`).toMatch(/^case-study-.*\.html$/);
    expect(await card.locator('[aria-disabled="true"]').count(), `${title}: dead CTA`).toBe(0);
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: 'qa-artifacts/all-project-cta-desktop.png', fullPage: true });
});

test('mobile keeps one dominant case CTA and wraps artifact links cleanly', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.project-actions.project-artifact-actions');

  const blocks = page.locator('.project-actions.project-artifact-actions');
  const count = await blocks.count();
  expect(count).toBeGreaterThanOrEqual(11);
  for (let i = 0; i < count; i += 1) {
    const block = blocks.nth(i);
    const primary = block.locator('.project-artifact-primary');
    const blockBox = await block.boundingBox();
    const primaryBox = await primary.boundingBox();
    expect(primaryBox.width).toBeGreaterThan(blockBox.width * 0.9);
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: 'qa-artifacts/all-project-cta-mobile.png', fullPage: true });
});

test('case pages expose working artifacts in live → figma → source order', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.project-actions.project-artifact-actions');
  const caseRoutes = await page.locator('.project-actions [data-artifact-kind="case"]').evaluateAll((nodes) => [...new Set(nodes.map((node) => node.getAttribute('href')))]);
  expect(caseRoutes.length).toBeGreaterThanOrEqual(11);

  for (const route of caseRoutes) {
    await page.goto(`${baseURL}/${route}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.case-hero-actions [data-artifact-kind]');
    const kinds = await page.locator('.case-hero-actions [data-artifact-kind]').evaluateAll((nodes) => nodes.map((node) => node.dataset.artifactKind));
    const rank = { live: 1, figma: 2, source: 3 };
    for (let i = 1; i < kinds.length; i += 1) expect(rank[kinds[i]], `${route}: ${kinds}`).toBeGreaterThan(rank[kinds[i - 1]]);
    expect(kinds[kinds.length - 1], `${route}: source last`).toBe('source');
  }
});
