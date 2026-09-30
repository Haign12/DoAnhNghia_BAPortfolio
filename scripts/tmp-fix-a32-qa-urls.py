from pathlib import Path

path = Path('qa/portfolio-v5.spec.mjs')
source = path.read_text(encoding='utf-8')

replacements = {
    "test('A32 selected project cards expose evidence state without seniority scoring', async ({ page }) => {\n  await page.goto('/');": "test('A32 selected project cards expose evidence state without seniority scoring', async ({ page }) => {\n  await page.goto(baseURL);",
    "    await page.goto(`/${route}`);": "    await page.goto(`${baseURL}/${route}`);",
    "  await page.goto('/case-study-luxroom.html');": "  await page.goto(`${baseURL}/case-study-luxroom.html`);",
    "  await page.goto('/case-study-uiux-factory.html');": "  await page.goto(`${baseURL}/case-study-uiux-factory.html`);",
}

changed = 0
for old, new in replacements.items():
    if old in source:
        source = source.replace(old, new, 1)
        changed += 1
    elif new not in source:
        raise SystemExit(f'Expected A32 QA pattern missing: {old}')

if changed == 0:
    raise SystemExit('No A32 QA URL changes applied')

path.write_text(source, encoding='utf-8')
print(f'Repaired {changed} A32 QA URL patterns using baseURL.')
