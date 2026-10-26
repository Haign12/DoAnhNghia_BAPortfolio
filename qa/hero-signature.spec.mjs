import { test, expect } from '@playwright/test';
const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';

// The authorized minimal redesign replaces the portrait/orbit signature with
// editorial typography and immediate access to real project work.
for (const width of [390, 1440]) {
  for (const theme of ['light', 'dark']) {
    test(`minimal signature and first-fold work at ${width}px / ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ colorScheme: theme });
      await page.goto(baseURL, { waitUntil: 'networkidle' });
      await expect(page.locator('#hero-title')).toHaveText('Complexity,made clear.');
      await expect(page.locator('#hero-title em')).toHaveCSS('font-style', 'italic');
      await expect(page.locator('#hero .button')).toBeVisible();
      await expect(page.locator('#hero .button')).toHaveAttribute('href', '#flagships');
      expect(await page.locator('#flagships .project-media').first().evaluate(el => el.getBoundingClientRect().top)).toBeLessThan(1000);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
      await page.screenshot({ path: `qa-artifacts/hero-${width}-${theme}.png` });
    });
  }
}

test('reduced motion removes decorative movement without hiding work', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await expect(page.locator('#hero')).toBeVisible();
  await expect(page.locator('[data-flagship]')).toHaveCount(3);
  const moving = await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length);
  expect(moving).toBe(0);
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  await expect(page.locator('.project-media img').first()).toHaveCSS('transition-duration', '0s');
});
