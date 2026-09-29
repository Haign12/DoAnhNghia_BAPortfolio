import json
import re
from pathlib import Path

ROOT = Path('.')
index_path = ROOT / 'index.html'
css_path = ROOT / 'portfolio-product-upgrade.css'
qa_path = ROOT / 'qa/portfolio-v5.spec.mjs'
registry_path = ROOT / 'docs/supporting-capability-signals.json'

index = index_path.read_text(encoding='utf-8')
css = css_path.read_text(encoding='utf-8')
qa = qa_path.read_text(encoding='utf-8')

if 'A29_SUPPORTING_CAPABILITY_LIBRARY' in index:
    print('A29 already applied')
    raise SystemExit(0)

signals = {
    'LUMEN': ['Discovery IA', 'Interaction model', 'Art direction'],
    'HUẾ — Between River & Citadel': ['Experience architecture', 'Narrative flow', 'Art direction'],
    'LuxRoom': ['Commerce IA', 'Variant confidence', 'Responsive UI'],
    'Atelier': ['Content hierarchy', 'Commerce flow', 'Visual system'],
    'Violet Marketplace': ['Discovery IA', 'Product storytelling', 'Marketplace UX'],
    'Nova': ['Product strategy', 'Trade-offs', 'State + recovery'],
    'Flux': ['Complex IA', 'Decision states', 'Systems thinking'],
    'Sentry': ['Complex IA', 'High-density workflow', 'Recovery states'],
    'ACCESS': ['Permission model', 'State design', 'Security UX'],
    'Capital Place': ['Decision journey', 'Information architecture', 'Conversion UX'],
    'G.I.E': ['B2B IA', 'Design system', 'Design→code'],
    'VAS Education': ['Content strategy', 'Decision journey', 'Responsive redesign'],
    'VOLTIS': ['Product storytelling', 'Corporate IA', 'Interaction system'],
    'UIUX Factory': ['Product governance', 'Design→code', 'QA + reliability'],
}

start = index.index('<section class="section work" id="work">')
end_candidates = [p for p in [index.find('<section class="section ', start + 1), index.find('<section class="contact', start + 1)] if p != -1]
end = min(end_candidates) if end_candidates else len(index)
work = index[start:end]

card_pattern = re.compile(r'<article class="([^"]*project[^"]*)"([^>]*)>(.*?)</article>', re.S)
cards = list(card_pattern.finditer(work))
if len(cards) != 14:
    raise SystemExit(f'expected 14 supporting cards, found {len(cards)}')

discovered = []
for match in cards:
    body = match.group(3)
    name_m = re.search(r'<h3>(.*?)</h3>', body, re.S)
    if not name_m:
        raise SystemExit('supporting card missing h3')
    name = re.sub('<[^>]+>', '', name_m.group(1)).strip()
    discovered.append(name)

if set(discovered) != set(signals):
    missing = sorted(set(discovered) - set(signals))
    stale = sorted(set(signals) - set(discovered))
    raise SystemExit(f'capability map drift; unmapped={missing}; stale={stale}')

registry_projects = []

def upgrade_card(match):
    classes, attrs, body = match.group(1), match.group(2), match.group(3)
    name_m = re.search(r'<h3>(.*?)</h3>', body, re.S)
    name = re.sub('<[^>]+>', '', name_m.group(1)).strip()
    project_signals = signals[name]
    if len(project_signals) not in (2, 3):
        raise SystemExit(f'{name} must expose 2–3 signals')
    if 'project-capability-signals' in body:
        raise SystemExit(f'{name} already has capability signals')
    if '<div class="project-links">' not in body:
        raise SystemExit(f'{name} missing project-links anchor')

    block = '<div class="project-capability-signals" aria-label="Capability signals"><strong>Capability signals</strong>' + ''.join(f'<span>{item}</span>' for item in project_signals) + '</div>'
    body = body.replace('<div class="project-links">', block + '<div class="project-links">', 1)

    hrefs = re.findall(r'href="([^"]+)"', body)
    local_case = [href for href in hrefs if href.startswith('case-study-') and href.endswith('.html')]
    basis = 'local case study + linked working artifacts' if local_case else 'homepage project summary + linked working artifact'
    registry_projects.append({
        'project': name,
        'signals': project_signals,
        'evidence_basis': basis,
        'proof_links': hrefs,
    })
    return f'<article class="{classes}"{attrs}>{body}</article>'

work = card_pattern.sub(upgrade_card, work)
if len(registry_projects) != 14:
    raise SystemExit(f'expected 14 registry projects, got {len(registry_projects)}')

work = work.replace('<section class="section work" id="work">', '<section class="section work" id="work" data-a29="skill-evidence-library">\n  <!-- A29_SUPPORTING_CAPABILITY_LIBRARY -->', 1)
work = work.replace('<p class="eyebrow">Supporting work</p><h2 class="section-title">Breadth without diluting the narrative.</h2>', '<p class="eyebrow">Supporting capability library</p><h2 class="section-title">Breadth, with proof attached.</h2>', 1)
work = work.replace('14 projects · 7 domains · supporting breadth', '14 projects · 7 domains · capability signals', 1)
index = index[:start] + work + index[end:]

css_add = r'''

/* A29 Supporting Skill Evidence Library */
.project-capability-signals{margin-top:16px;padding-top:14px;border-top:1px solid var(--line);display:flex;flex-wrap:wrap;gap:7px}
.project-capability-signals strong{flex:0 0 100%;margin-bottom:1px;color:#8a8a84;font-size:8px;font-weight:700;letter-spacing:.13em;text-transform:uppercase}
.project-capability-signals span{display:inline-flex;align-items:center;padding:6px 8px;border:1px solid #d6d6d0;border-radius:999px;background:#fafaf7;color:#30302d;font-size:8px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;line-height:1}
.project-featured .project-capability-signals{margin-top:18px}
@media(max-width:720px){.project-capability-signals span{font-size:7.5px}}
'''
if '/* A29 Supporting Skill Evidence Library */' in css:
    raise SystemExit('A29 CSS already exists unexpectedly')
css = css.rstrip() + css_add + '\n'

registry = {
    'schema_version': 1,
    'policy': {
        'signals_are_evidence_labels_not_proficiency_scores': True,
        'signals_do_not_imply_tenure': True,
        'no_cross_functional_collaboration_inferred': True,
        'no_research_or_outcome_signal_without_public_artifact_basis': True,
    },
    'library_contract': {
        'card_count': 14,
        'signals_per_card': '2–3',
        'purpose': 'turn supporting work into a recruiter-scannable skill evidence library',
        'deep_proof': 'A27 case-study evidence remains the source for detailed role, constraints, options, trade-offs, engineering reality, evidence and next decisions where local case routes exist',
    },
    'projects': registry_projects,
}
registry_path.write_text(json.dumps(registry, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')

qa_test = r'''
  test('A29 supporting work behaves as a skill evidence library with 2–3 grounded capability signals per project', async ({ page }) => {
    const registry = JSON.parse(await fs.readFile('docs/supporting-capability-signals.json', 'utf8'));
    expect(registry.policy.signals_are_evidence_labels_not_proficiency_scores).toBe(true);
    expect(registry.policy.signals_do_not_imply_tenure).toBe(true);
    expect(registry.policy.no_cross_functional_collaboration_inferred).toBe(true);
    expect(registry.projects).toHaveLength(14);

    await page.goto(`${baseURL}/#work`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#work[data-a29="skill-evidence-library"]')).toHaveCount(1);
    await expect(page.locator('#work .project-capability-signals')).toHaveCount(14);
    await expect(page.getByRole('heading', { name: 'Breadth, with proof attached.', exact: true })).toBeVisible();

    for (const project of registry.projects) {
      expect(project.signals.length).toBeGreaterThanOrEqual(2);
      expect(project.signals.length).toBeLessThanOrEqual(3);
      const card = page.locator('#work article.project, #work article.project-featured').filter({ has: page.getByRole('heading', { level: 3, name: project.project, exact: true }) });
      await expect(card).toHaveCount(1);
      const chips = card.locator('.project-capability-signals span');
      await expect(chips).toHaveCount(project.signals.length);
      expect(await chips.allTextContents()).toEqual(project.signals);
    }
  });
'''
if 'A29 supporting work behaves as a skill evidence library' in qa:
    raise SystemExit('A29 QA already exists unexpectedly')
insert_at = qa.rfind('\n});')
if insert_at == -1:
    raise SystemExit('QA suite closing anchor not found')
qa = qa[:insert_at] + '\n' + qa_test + qa[insert_at:]

index_path.write_text(index, encoding='utf-8')
css_path.write_text(css, encoding='utf-8')
qa_path.write_text(qa, encoding='utf-8')

print('A29_SUPPORTING_CARDS=14')
for item in registry_projects:
    print(item['project'] + ' :: ' + ' | '.join(item['signals']))
