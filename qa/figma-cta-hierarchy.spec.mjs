import { test, expect } from '@playwright/test';

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';

const flagships = [
  {
    id: 'nova',
    caseLabel: 'Read Nova case ↗',
    liveLabel: 'Live prototype ↗',
    figma: 'https://www.figma.com/design/AxsWZgEvTOkzOQB71iAdcx/Nova?node-id=4-2052&t=83Wo9YlCjxLTFzxv-1',
    source: 'https://github.com/Ngh1aa/Nova',
    caseRoute: 'case-study-nova.html',
    caseLiveLabel: 'Live prototype ↗',
  },
  {
    id: 'sentry',
    caseLabel: 'Read Sentry case ↗',
    liveLabel: 'Live prototype ↗',
    figma: 'https://www.figma.com/design/1W6rwPXiTfcZn6OhieVUDe/Sentry?node-id=0-1&t=BvIxuJu3KrFWy5Lg-1',
    source: 'https://github.com/Ngh1aa/Sentry',
    caseRoute: 'case-study-sentry.html',
    caseLiveLabel: 'Live prototype ↗',
  },
  {
    id: 'luxroom',
    caseLabel: 'Read LuxRoom case ↗',
    liveLabel: 'Live prototype ↗',
    figma: 'https://www.figma.com/design/50eyqHuzpiqIYoIT9ngwcT/LuxRoom?node-id=0-1&t=HPp6OlvriN9MeZCW-1',
    source: 'https://github.com/Ngh1aa/LuxRoom',
    caseRoute: 'case-study-luxroom.html',
    caseLiveLabel: 'Live demo ↗',
  },
];

test('flagship cards keep one primary CTA and order Case → Live → Figma → Source', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });

    for (const item of flagships) {
      const card = page.locator(`[data-flagship="${item.id}"]`);
      const actions = card.locator('.flagship-actions a');
      await expect(actions).toHaveCount(4);
      await expect(actions.nth(0)).toHaveText(item.caseLabel);
      await expect(actions.nth(0)).toHaveClass(/flagship-primary/);
      await expect(actions.nth(1)).toHaveText(item.liveLabel);
      await expect(actions.nth(1)).toHaveClass(/flagship-secondary/);
      await expect(actions.nth(2)).toHaveText('Figma ↗');
      await expect(actions.nth(2)).toHaveClass(/flagship-secondary/);
      expect((await actions.nth(2).getAttribute('href')).replaceAll('&amp;', '&')).toBe(item.figma);
      await expect(actions.nth(3)).toHaveText('Source ↗');
      await expect(actions.nth(3)).toHaveClass(/flagship-secondary/);
      await expect(actions.nth(3)).toHaveAttribute('href', item.source);
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
    expect(labels.slice(0, 3)).toEqual([item.caseLiveLabel, 'View Figma ↗', 'Source code ↗']);
    expect((await actions.nth(1).getAttribute('href')).replaceAll('&amp;', '&')).toBe(item.figma);
    await expect(actions.nth(2)).toHaveAttribute('href', item.source);
  }
});
