import { test, expect } from '@playwright/test';

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';

const readHeroSignature = async page => page.locator('#hero').evaluate(hero => {
  const portrait = getComputedStyle(hero, '::after');
  const orbit = getComputedStyle(hero, '::before');
  const rail = getComputedStyle(document.querySelector('.capability-proof-section'), '::before');
  const noise = document.querySelector('.noise-overlay');
  return {
    portraitBackground: portrait.backgroundImage,
    portraitOpacity: Number.parseFloat(portrait.opacity || '0'),
    portraitWidth: Number.parseFloat(portrait.width || '0'),
    portraitAnimation: portrait.animationName,
    orbitOpacity: Number.parseFloat(orbit.opacity || '0'),
    orbitAnimation: orbit.animationName,
    railContent: rail.content,
    railAnimation: rail.animationName,
    noiseOpacity: noise ? Number.parseFloat(getComputedStyle(noise).opacity || '1') : 0,
  };
});

test.describe('Hero visual signature regression contract', () => {
  test('desktop keeps portrait, motion signature and crisp surface', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await expect(page.locator('.preloader')).toBeHidden({ timeout: 4000 });
    await expect(page.locator('#hero')).toHaveClass(/ready/);
    await expect(page.locator('.letter').first()).toHaveCSS('opacity', '1');

    const assetOK = await page.evaluate(async () => {
      const response = await fetch('assets/images/avatar.webp', { cache: 'no-store' });
      return response.ok;
    });
    expect(assetOK).toBe(true);

    const signature = await readHeroSignature(page);
    expect(signature.portraitBackground).toContain('avatar.webp');
    expect(signature.portraitOpacity).toBeGreaterThan(0.9);
    expect(signature.portraitWidth).toBeGreaterThan(320);
    expect(signature.orbitOpacity).toBeGreaterThan(0.3);
    expect(signature.orbitAnimation).not.toBe('none');
    expect(signature.railContent).toContain('PRODUCT REASONING');
    expect(signature.railAnimation).not.toBe('none');
    expect(signature.noiseOpacity).toBeLessThanOrEqual(0.01);

    await page.screenshot({ path: 'qa-artifacts/hero-signature-desktop.png', fullPage: false });
  });

  test('mobile keeps portrait legible without losing the first-screen identity', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await expect(page.locator('.preloader')).toBeHidden({ timeout: 4000 });
    const signature = await readHeroSignature(page);
    expect(signature.portraitBackground).toContain('avatar.webp');
    expect(signature.portraitOpacity).toBeGreaterThan(0.9);
    expect(signature.portraitWidth).toBeGreaterThan(330);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('PRODUCT');
    await page.screenshot({ path: 'qa-artifacts/hero-signature-mobile.png', fullPage: false });
  });

  test('reduced motion preserves the visual signature without continuous animation', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await expect(page.locator('.preloader')).toBeHidden({ timeout: 4000 });
    const signature = await readHeroSignature(page);
    expect(signature.portraitBackground).toContain('avatar.webp');
    expect(signature.portraitOpacity).toBeGreaterThan(0.9);
    expect(signature.orbitAnimation).toBe('none');
    expect(signature.railAnimation).toBe('none');
  });
});
