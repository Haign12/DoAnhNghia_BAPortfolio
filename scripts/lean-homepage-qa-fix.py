from pathlib import Path

path = Path('qa/portfolio-v5.spec.mjs')
text = path.read_text()

old = '''    await expect(page.locator('#flagships .flagship-card').first().getByRole('heading', { level: 3 })).toHaveText('UIUX Factory');
    await expect(page.locator('#flagships a[href="case-study-uiux-factory.html"]').first()).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-nova.html"]').first()).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-sentry.html"]').first()).toBeVisible();'''
new = '''    const flagshipNames = await page.locator('#flagships [data-flagship] h3').allTextContents();
    expect(flagshipNames).toEqual(['Nova', 'Sentry', 'LuxRoom']);
    await expect(page.locator('#flagships a[href="case-study-nova.html"]').first()).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-sentry.html"]').first()).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-luxroom.html"]').first()).toBeVisible();
    await expect(page.locator('#flagships a[href="case-study-uiux-factory.html"]')).toHaveCount(0);
    await expect(page.locator('#ai-workflow a[href="case-study-uiux-factory.html"]')).toBeVisible();'''
assert old in text
text = text.replace(old, new)

old = '''    expect(source).toContain('Nova/tree/main/research/validation/nova-round-02');'''
new = '''    expect(source).toContain('data-flagship="nova"');
    expect(source).toContain('data-flagship="sentry"');
    expect(source).toContain('data-flagship="luxroom"');
    expect(source).toContain('Technical QA proves implementation behavior, not user comprehension or business impact.');
    expect(source).toContain('case-study-professional-work.html');'''
assert old in text
text = text.replace(old, new)

old = '''    expect(home).toContain('numeric thresholds across this portfolio are labeled as targets');'''
new = '''    expect(home).toContain('Technical QA proves implementation behavior, not user comprehension or business impact.');
    expect(home).toContain('Observed commerce testing and conversion impact are still unmeasured.');'''
assert old in text
text = text.replace(old, new)

old = '''    for (const project of ['UIUX Factory', 'Nova', 'Sentry']) {
      const card = page.locator('.flagship-card', { has: page.getByRole('heading', { level: 3, name: project }) });
      await expect(card).toHaveCount(1);
      expect(await card.locator('.flagship-senior-signals span').count()).toBeGreaterThanOrEqual(4);
    }
'''
new = '''    for (const project of ['Nova', 'Sentry', 'LuxRoom']) {
      const card = page.locator('#flagships .flagship-card', { has: page.getByRole('heading', { level: 3, name: project }) });
      await expect(card).toHaveCount(1);
      expect(await card.locator('.flagship-senior-signals span').count()).toBeGreaterThanOrEqual(4);
    }
    await expect(page.locator('#flagships')).not.toContainText('UIUX Factory');
    await expect(page.locator('#ai-workflow')).toContainText('UIUX Factory');
'''
assert old in text
text = text.replace(old, new)

path.write_text(text)

for temp in [Path('.github/workflows/lean-homepage-qa-fix.yml'), Path('scripts/lean-homepage-qa-fix.py')]:
    if temp.exists():
        temp.unlink()
