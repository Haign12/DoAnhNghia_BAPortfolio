import fs from 'node:fs';
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

  const cards = await page.locator('#work .project-artifact-actions').evaluateAll((blocks) => blocks.map((block) => {
    const card = block.closest('article');
    const actions = [...block.querySelectorAll('a')];
    return {
      title: card?.querySelector('h3')?.textContent?.trim() || '',
      labels: actions.map((node) => node.textContent?.trim() || ''),
      kinds: actions.map((node) => node.dataset.artifactKind),
      hrefs: actions.map((node) => node.getAttribute('href')),
      classes: actions.map((node) => node.className),
      dead: block.querySelectorAll('[aria-disabled="true"]').length,
    };
  }));

  expect(cards).toHaveLength(14);
  for (const card of cards) {
    expect(card.labels[0], `${card.title}: first CTA`).toMatch(/^Read case/);
    expect(card.classes[0], `${card.title}: primary class`).toContain('project-artifact-primary');
    expect(card.kinds, `${card.title}: artifact kinds`).not.toContain(undefined);
    assertOrderedKinds(card.kinds);
    expect(card.hrefs[0], `${card.title}: case route`).toMatch(/^case-study-.*\.html$/);
    expect(card.dead, `${card.title}: dead CTA`).toBe(0);
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.locator('#work').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'qa-artifacts/all-project-cta-desktop.png', animations: 'disabled' });
});

test('mobile keeps one dominant case CTA and wraps artifact links cleanly', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/`, { waitUntil: 'domcontentloaded' });

  const blocks = await page.locator('#work .project-artifact-actions').evaluateAll((nodes) => nodes.map((block) => {
    const primary = block.querySelector('.project-artifact-primary');
    const blockBox = block.getBoundingClientRect();
    const primaryBox = primary?.getBoundingClientRect();
    return {
      width: blockBox.width,
      primaryWidth: primaryBox?.width || 0,
    };
  }));

  expect(blocks).toHaveLength(14);
  for (const block of blocks) expect(block.primaryWidth).toBeGreaterThan(block.width * 0.9);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.locator('#work').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'qa-artifacts/all-project-cta-mobile.png', animations: 'disabled' });
});

test('case-study artifact registry preserves live → figma → source order without invented links', async ({ page }) => {
  const source = fs.readFileSync('case-study.js', 'utf8');
  expect(source).toContain('caseArtifactRegistry');

  const samples = [
    ['case-study-nova.html', ['live', 'figma', 'source']],
    ['case-study-lumen.html', ['live', 'source']],
    ['case-study-uiux-factory.html', ['source']],
  ];

  for (const [route, expectedKinds] of samples) {
    await page.goto(`${baseURL}/${route}`, { waitUntil: 'domcontentloaded' });
    const actions = page.locator('.case-hero-actions [data-artifact-kind]');
    await expect(actions.first()).toBeVisible();
    const kinds = await actions.evaluateAll((nodes) => nodes.map((node) => node.dataset.artifactKind));
    expect(kinds, route).toEqual(expectedKinds);
  }
});
