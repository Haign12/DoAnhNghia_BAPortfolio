import json
import re
from pathlib import Path
from html import escape

ROOT = Path('.')
registry_path = ROOT / 'docs/senior-decision-evidence.json'
registry = json.loads(registry_path.read_text(encoding='utf-8'))

def hero_bounds(source):
    starts = []
    for marker in ('<header class="case-hero">', '<header class="archive-hero">'):
        idx = source.find(marker)
        if idx != -1:
            starts.append(idx)
    if not starts:
        return -1, -1
    start = min(starts)
    end = source.find('</header>', start)
    return start, (end + len('</header>') if end != -1 else -1)

for row in registry['projects']:
    path = row['surface']
    file = ROOT / path
    source = file.read_text(encoding='utf-8')

    context = f"{row.get('case_class','')} {row.get('engineering','')} {row.get('role','')}".lower()
    team = row['team']
    if team.startswith('NOT AVAILABLE'):
        if 'independent' in context:
            team = 'Independent project; no separate PM, engineering or stakeholder team is documented in this public case.'
        elif 'test' in context:
            team = 'Individual design test; no separate PM, engineering or stakeholder team is documented in this public case.'
        elif any(token in context for token in ('open-source', 'system designer', 'design tool', 'tooling')):
            team = 'Self-directed system/tooling work; no separate PM, engineering or stakeholder team is documented in this public case.'
        else:
            team = 'Team composition is not documented in this public case; no collaborator count or stakeholder structure is claimed.'
        row['team'] = team
        row['audit']['team_classification_source'] = 'case class / implementation reality; collaborator identities remain unverified'

    team_pattern = re.compile(r'(<article class="a27-decision-item" data-a27-field="TEAM"><span>TEAM</span><p>)(.*?)(</p></article>)', re.S)
    if len(team_pattern.findall(source)) != 1:
        raise SystemExit(f'Expected one TEAM card in {path}')
    source = team_pattern.sub(lambda m: m.group(1) + escape(row['team']) + m.group(3), source, count=1)

    block_pattern = re.compile(r'\n<section class="case-section senior-decision-evidence" data-a27="senior-decision-evidence">.*?</section>\n', re.S)
    match = block_pattern.search(source)
    if not match:
        raise SystemExit(f'A27 block missing in {path}')
    block = match.group(0)
    source_without = source[:match.start()] + source[match.end():]
    hero_start, hero_end = hero_bounds(source_without)
    if hero_start == -1 or hero_end == -1:
        raise SystemExit(f'hero family missing in {path}')
    source = source_without[:hero_end] + block + source_without[hero_end:]

    if 'case-study-evidence-v4.css' not in source:
        style_anchor = '<link rel="stylesheet" href="case-study.css?v=20260904-art-directed-v1">'
        if style_anchor not in source:
            raise SystemExit(f'Cannot attach A27 shared evidence styles in {path}')
        source = source.replace(
            style_anchor,
            style_anchor + '\n  <link rel="stylesheet" href="case-study-evidence-v4.css?v=20260929-a27">',
            1,
        )
        row['audit']['a27_shared_styles_added'] = True

    file.write_text(source, encoding='utf-8')

registry['generated_from'] = 'public case-study source + A26 measurement registry + verified repository history where explicitly labeled'
registry['presentation'] = {
    'placement': 'immediately after case hero for recruiter scan',
    'desktop_columns': 3,
    'mobile_columns': 1,
    'unknowns_are_visible': True
}
registry_path.write_text(json.dumps(registry, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

summary_keys = [
    ('options_documented', 'Alternatives documented'),
    ('tradeoff_documented', 'Trade-offs documented'),
    ('team_documented', 'Team composition documented'),
    ('engineering_boundary_documented', 'Engineering boundary documented'),
    ('failure_or_pivot_documented', 'Failure/pivot documented'),
]
counts = {key: sum(1 for row in registry['projects'] if row['audit'].get(key)) for key, _ in summary_keys}

lines = [
    '# A27 — Senior Decision Evidence Audit', '',
    'This audit treats missing evidence as a visible gap rather than converting it into senior-sounding claims.', '',
    '## Policy', '',
    '- No invented team size, PM/engineering/stakeholder collaboration, client pressure, failure, pivot or business outcome.',
    '- Existing public case text is the default source of truth; verified repository history is used only when explicitly labeled.',
    '- `UNKNOWN / NOT DOCUMENTED / NOT AVAILABLE` is an acceptable state until evidence exists.',
    '- A27 snapshots are recruiter-scan summaries, not new research findings.', '',
    '## Audit summary', ''
]
for key, label in summary_keys:
    lines.append(f'- **{label}:** {counts[key]}/18')
lines += ['', '## Case matrix', '', '| Case | Options | Trade-off | Team | Eng. boundary | Failure / pivot |', '|---|---:|---:|---:|---:|---:|']
for row in registry['projects']:
    audit = row['audit']
    mark = lambda key: 'YES' if audit.get(key) else 'GAP'
    lines.append(f"| {row['project']} | {mark('options_documented')} | {mark('tradeoff_documented')} | {mark('team_documented')} | {mark('engineering_boundary_documented')} | {mark('failure_or_pivot_documented')} |")
lines += [
    '', '## Interpretation', '',
    '- Nova and Sentry currently carry the clearest explicit alternatives + trade-offs.',
    '- CENNEXT contributes one explicit trade-off but does not yet document a verified alternative set.',
    '- UIUX Factory is the only case with a verified failure/repair story in A27: rendered correctness once masked stale raw-source defects, which led to independent raw-source and rendered gates.',
    '- Team composition is not publicly evidenced in any local case today. Independent concepts/tests are labeled as such rather than being rewritten as cross-functional work.',
    '- The next content pass should add real decision records only where source evidence exists; it should not make every case look artificially complete.', '',
    '## Recruiter-scan placement', '',
    'The 11-field A27 snapshot is placed immediately after each case hero so role, team boundary, constraint, alternatives, decision, trade-off, engineering reality, system impact, failure/pivot evidence, current evidence state and next decision can be scanned before the long-form narrative.'
]
(ROOT / 'docs/a27-senior-decision-audit.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')

for row in registry['projects']:
    source = (ROOT / row['surface']).read_text(encoding='utf-8')
    hero_start, hero_end = hero_bounds(source)
    marker = source.find('A27_SENIOR_DECISION_EVIDENCE')
    first_regular_section = source.find('<section class="case-section"', hero_end)
    if not (hero_start != -1 and hero_end < marker < first_regular_section):
        raise SystemExit(f'A27 snapshot is not directly after hero in {row["surface"]}')
    if 'case-study-evidence-v4.css' not in source:
        raise SystemExit(f'A27 shared evidence stylesheet missing in {row["surface"]}')

print('A27 postcheck complete')
for key, label in summary_keys:
    print(f'{label}: {counts[key]}/18')
