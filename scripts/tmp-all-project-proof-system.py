from pathlib import Path
import json

BRANCH_NOTE = 'A32 all-project recruiter proof system'

index_path = Path('index.html')
index = index_path.read_text(encoding='utf-8')

css_link = '<link rel="stylesheet" href="project-proof-strip.css?v=20260930-a32">'
if css_link not in index:
    marker = '<link rel="stylesheet" href="portfolio-product-upgrade.css?v=20260918-product-designer-v1">'
    if marker not in index:
        raise SystemExit('portfolio css marker missing')
    index = index.replace(marker, marker + '\n' + css_link, 1)

work_pos = index.find('id="work"')
if work_pos < 0:
    raise SystemExit('work section missing')

proofs = {
    'LUMEN': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">Prototype verified</span><span class="planned">Direct users · not measured</span><span class="open">Figma · open</span></div>',
    'HUẾ — Between River & Citadel': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">Transformation shipped</span><span class="planned">Direct users · not measured</span><span class="open">Figma + route test · open</span></div>',
    'LuxRoom': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">Responsive prototype</span><span class="planned">Direct users · not measured</span><span class="open">Business frame + validation · open</span></div>',
    'Atelier': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">Commerce flow shipped</span><span class="planned">Direct users · not measured</span><span class="open">State coverage · open</span></div>',
    'Violet Marketplace': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">Marketplace prototype</span><span class="planned">Direct users · not measured</span><span class="open">State coverage · open</span></div>',
    'Nova': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">10 real-user records</span><span class="verified">2 async rounds</span><span class="open">4 findings · still open</span></div>',
    'Flux': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">Treasury prototype</span><span class="planned">Direct users · not measured</span><span class="open">Business frame + benchmark · open</span></div>',
    'Sentry': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">Investigation states</span><span class="planned">Direct users · not measured</span><span class="open">Domain validation · open</span></div>',
    'ACCESS': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">Permission lifecycle</span><span class="planned">Direct users · not measured</span><span class="open">Business + validation · open</span></div>',
    'Capital Place': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">Decision journey shipped</span><span class="planned">Direct users · not measured</span><span class="open">Validation · open</span></div>',
    'G.I.E': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">B2B prototype</span><span class="verified">Design→code</span><span class="open">Direct validation · open</span></div>',
    'VAS Education': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">Enrollment journey</span><span class="planned">Direct users · not measured</span><span class="open">Business + validation · open</span></div>',
    'VOLTIS': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">Product/corporate system</span><span class="planned">Direct users · not measured</span><span class="open">Validation · open</span></div>',
    'UIUX Factory': '<div class="project-proof-strip" aria-label="Evidence status"><strong>Evidence status</strong><span class="verified">Repo + QA verified</span><span class="verified">Failure→repair loop</span><span class="open">Human impact · not measured</span></div>',
}

for name, strip in proofs.items():
    heading = f'<h3>{name}</h3>'
    pos = index.find(heading, work_pos)
    if pos < 0:
        raise SystemExit(f'project heading missing: {name}')
    article_start = index.rfind('<article', work_pos, pos)
    article_end = index.find('</article>', pos)
    if article_start < 0 or article_end < 0:
        raise SystemExit(f'project article bounds missing: {name}')
    block = index[article_start:article_end]
    if 'project-proof-strip' in block:
        continue
    links_pos = index.find('<div class="project-links"', pos, article_end)
    if links_pos < 0:
        raise SystemExit(f'project links missing: {name}')
    index = index[:links_pos] + strip + index[links_pos:]

index_path.write_text(index, encoding='utf-8')

# Update Nova source-of-truth registries now that Round 02 is complete.
measurement_path = Path('docs/measurement-targets.json')
measurement = json.loads(measurement_path.read_text(encoding='utf-8'))
for project in measurement['projects']:
    if project.get('project') == 'Nova':
        project['baseline'] = 'Round 01: 5 verified direct-user async self-report records; Round 02: 5 NEW verified direct-user async self-report records on the frozen post-change build; no moderated pre/post task-success/time baseline'
        project['evidence_state'] = '10 VERIFIED DIRECT_USER_ASYNC_SELF_REPORT RECORDS / 2 ROUNDS / 4 FINDINGS OPEN'
measurement_path.write_text(json.dumps(measurement, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

maturity_path = Path('docs/project-maturity-audit.json')
maturity = json.loads(maturity_path.read_text(encoding='utf-8'))
for project in maturity['projects']:
    if project.get('project') == 'Nova':
        project['remaining_gaps'] = [
            'ROUND_02_F01_SENSITIVE_ACTION_BOUNDARY_OPEN',
            'ROUND_02_F02_PROTECTED_BUFFER_PARTIALLY_FIXED',
            'ROUND_02_F03_HORIZON_OPEN',
            'ROUND_02_F04_RECOVERY_NO_MONEY_MOVED_OPEN'
        ]
maturity_path.write_text(json.dumps(maturity, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

roadmap_path = Path('docs/project-evidence-roadmap.md')
roadmap = roadmap_path.read_text(encoding='utf-8')
old = '- **Nova:** Round 01 now has 5 verified direct-user self-report records and an evidence-driven iteration; run the post-change retest on the exact merged build before any improvement claim.'
new = '- **Nova:** two verified async self-report rounds are complete (5 Round 01 + 5 NEW Round 02 participants). Keep all four findings visible as open/partially fixed; prioritize D-04 → D-02 → D-03 → D-01 and do not claim causal usability improvement from the cross-sectional async rounds.'
if old in roadmap:
    roadmap = roadmap.replace(old, new, 1)
elif new not in roadmap:
    raise SystemExit('Nova roadmap line unexpected')
roadmap_path.write_text(roadmap, encoding='utf-8')

cap_path = Path('docs/recruiter-capability-map.json')
cap = json.loads(cap_path.read_text(encoding='utf-8'))
cap['flagship_signals']['Nova'] = [
    'Research governance',
    'Evidence→decision→ship→retest',
    'State + recovery',
    'Open findings kept visible'
]
cap_path.write_text(json.dumps(cap, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

qa_path = Path('qa/portfolio-v5.spec.mjs')
qa = qa_path.read_text(encoding='utf-8')
qa_marker = "test('A32 selected project cards expose evidence state without seniority scoring'"
if qa_marker not in qa:
    qa += '''\n\ntest('A32 selected project cards expose evidence state without seniority scoring', async ({ page }) => {\n  await page.goto('/');\n  await expect(page.locator('link[href*="project-proof-strip.css"]')).toHaveCount(1);\n  await expect(page.locator('#work .project-proof-strip')).toHaveCount(14);\n  const nova = page.locator('#work article', { has: page.getByRole('heading', { level: 3, name: 'Nova' }) });\n  await expect(nova.locator('.project-proof-strip')).toContainText('10 real-user records');\n  await expect(nova.locator('.project-proof-strip')).toContainText('4 findings · still open');\n  const factory = page.locator('#work article', { has: page.getByRole('heading', { level: 3, name: 'UIUX Factory' }) });\n  await expect(factory.locator('.project-proof-strip')).toContainText('Human impact · not measured');\n});\n'''
qa_path.write_text(qa, encoding='utf-8')

print('A32 all-project recruiter proof system applied.')
