from pathlib import Path
p = Path('qa/portfolio-v5.spec.mjs')
s = p.read_text()
old = "await expect(page.getByRole('link', { name: 'AI workflow', exact: true })).toBeVisible();"
new = "await expect(page.getByRole('link', { name: 'How I work', exact: true })).toBeVisible();"
if old not in s:
    raise SystemExit('expected stale mobile nav assertion not found')
p.write_text(s.replace(old, new, 1))
for temp in [Path('.github/workflows/fix-mobile-nav-qa-label.yml'), Path('scripts/fix-mobile-nav-qa-label.py')]:
    if temp.exists():
        temp.unlink()
