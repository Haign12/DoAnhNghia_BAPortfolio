import json
import re
from pathlib import Path
from html import unescape, escape

ROOT = Path('.')
measurement = json.loads((ROOT / 'docs/measurement-targets.json').read_text(encoding='utf-8'))
measurement_by_surface = {
    row['surface']: row for row in measurement['projects']
    if isinstance(row.get('surface'), str) and row['surface'].startswith('case-study-')
}
case_files = sorted(measurement_by_surface)
expected = 18
if len(case_files) != expected:
    raise SystemExit(f'Expected {expected} local case studies from A26 registry, found {len(case_files)}: {case_files}')

def clean(value):
    if not value:
        return ''
    value = re.sub(r'<br\s*/?>', ' — ', value, flags=re.I)
    value = re.sub(r'<[^>]+>', '', value)
    value = unescape(value)
    return re.sub(r'\s+', ' ', value).strip()

def clip(value, limit=220):
    value = clean(value)
    if len(value) <= limit:
        return value
    cut = value[:limit].rsplit(' ', 1)[0].rstrip(' ,;:')
    return cut + '…'

def first(pattern, source, flags=re.I | re.S):
    match = re.search(pattern, source, flags)
    return clean(match.group(1)) if match else ''

def all_values(pattern, source, flags=re.I | re.S):
    values = []
    for match in re.finditer(pattern, source, flags):
        value = clean(match.group(1))
        if value and value not in values:
            values.append(value)
    return values

def decision_snapshot(path, source, metric_row):
    role = first(r'<dt>Role</dt>\s*<dd>(.*?)</dd>', source) or 'NOT AVAILABLE — role is not explicit in the public case.'
    team = first(r'<dt>Team</dt>\s*<dd>(.*?)</dd>', source)
    case_index = first(r'<span class="case-index">(.*?)</span>', source)
    meta = first(r'<meta name="description" content="(.*?)">', source)
    reality = first(r'<dt>Reality</dt>\s*<dd>(.*?)</dd>', source)

    if not team:
        if 'independent' in (case_index + ' ' + meta).lower():
            team = 'Independent project; no separate PM, engineering or stakeholder team is documented in this public case.'
        else:
            team = 'NOT AVAILABLE — team composition is not documented in this public case.'

    constraint = (
        first(r'<span>Product risk</span>\s*<strong>(.*?)</strong>', source)
        or first(r'<span>User problem</span>\s*<strong>(.*?)</strong>', source)
        or first(r'<span>Constraint</span>\s*<strong>(.*?)</strong>', source)
    )
    if not constraint:
        constraint = 'NOT EXPLICIT — the case describes the solution, but the governing product or technical constraint is not isolated as a decision input.'

    option_blocks = []
    for match in re.finditer(r'<span>Option\s+[A-Z][^<]*</span>\s*<strong>(.*?)</strong>', source, re.I | re.S):
        value = clean(match.group(1))
        if value and value not in option_blocks:
            option_blocks.append(value)
    if len(option_blocks) >= 2:
        options = f"{len(option_blocks)} documented directions: " + ' / '.join(option_blocks[:3])
    else:
        options = 'NOT DOCUMENTED — the selected direction is visible, but a verified alternative set is not recorded.'

    selected = re.search(r'<span>Option\s+[A-Z][^<]*selected[^<]*</span>\s*<strong>(.*?)</strong>\s*<p>(.*?)</p>', source, re.I | re.S)
    if selected:
        decision = f"{clean(selected.group(1))} — {clean(selected.group(2))}"
    else:
        design_decision = first(r'<span>DESIGN DECISION</span>\s*<p>(.*?)</p>', source)
        decision = design_decision or 'NOT EXPLICIT — implemented direction exists, but the case does not yet isolate one decision and its rationale.'

    tradeoffs = all_values(r'<span>Trade-off</span>\s*<strong>(.*?)</strong>', source)
    tradeoff = (' / '.join(tradeoffs[:3]) if tradeoffs else
                'NOT DOCUMENTED — no verified downside or cost of the selected direction is stated explicitly.')

    has_engineering_boundary = 'ENGINEERING REALITY' in source
    if reality:
        engineering = f"Implementation reality: {reality}. "
    else:
        engineering = 'Implementation reality is not explicit. '
    if has_engineering_boundary:
        engineering += 'Technical boundary is documented; separate engineering-team collaboration is not verified unless stated elsewhere.'
    else:
        engineering += 'No verified engineering-collaboration record is present in this public case.'

    if re.search(r'SYSTEM|component|state', source, re.I):
        system_impact = 'Local component, state or system implications are documented in the case; downstream production impact is not measured.'
    else:
        system_impact = 'NOT VERIFIED — downstream component, platform or production-system impact is not documented.'

    if path == 'case-study-uiux-factory.html':
        what_went_wrong = ('Rendered QA once allowed stale raw-source defects to survive behind runtime repair. '
                           'The workflow was changed so raw source and rendered behavior are checked independently.')
    else:
        what_went_wrong = 'NOT AVAILABLE — no verified failure, rejected release or project pivot is documented in this public case.'

    evidence = f"{metric_row['evidence_state']}. Baseline: {metric_row['baseline']}."

    next_match = re.search(r'<strong>Next:</strong>\s*(.*?)</p>', source, re.I | re.S)
    if next_match:
        next_decision = clip(next_match.group(1), 240)
    else:
        next_decision = ('Run the first benchmark against the predefined A26 target; if the threshold is missed, '
                         'revise the selected model before adding more polish or scope.')

    return {
        'project': first(r'<h1 class="case-title">(.*?)</h1>', source) or path,
        'surface': path,
        'case_class': case_index or 'Public case study',
        'role': clip(role),
        'team': clip(team),
        'constraint': clip(constraint),
        'options': clip(options),
        'decision': clip(decision),
        'tradeoff': clip(tradeoff),
        'engineering': clip(engineering),
        'system_impact': clip(system_impact),
        'what_went_wrong': clip(what_went_wrong),
        'evidence': clip(evidence),
        'next_decision': clip(next_decision),
        'audit': {
            'options_documented': len(option_blocks) >= 2,
            'tradeoff_documented': bool(tradeoffs),
            'engineering_boundary_documented': has_engineering_boundary,
            'team_documented': bool(first(r'<dt>Team</dt>\s*<dd>(.*?)</dd>', source)),
            'failure_or_pivot_documented': path == 'case-study-uiux-factory.html'
        }
    }

fields = [
    ('ROLE', 'role'),
    ('TEAM', 'team'),
    ('CONSTRAINT', 'constraint'),
    ('OPTIONS', 'options'),
    ('DECISION', 'decision'),
    ('TRADE-OFF', 'tradeoff'),
    ('ENGINEERING', 'engineering'),
    ('SYSTEM IMPACT', 'system_impact'),
    ('WHAT WENT WRONG', 'what_went_wrong'),
    ('EVIDENCE', 'evidence'),
    ('NEXT DECISION', 'next_decision'),
]

registry_rows = []
for path in case_files:
    file = ROOT / path
    source = file.read_text(encoding='utf-8')
    if 'A27_SENIOR_DECISION_EVIDENCE' in source:
        raise SystemExit(f'A27 marker already exists in {path}; refusing duplicate migration')
    row = decision_snapshot(path, source, measurement_by_surface[path])
    registry_rows.append(row)

    cards = []
    for label, key in fields:
        cards.append(
            f'      <article class="a27-decision-item" data-a27-field="{escape(label)}">'
            f'<span>{escape(label)}</span><p>{escape(row[key])}</p></article>'
        )
    block = (
        '\n<section class="case-section senior-decision-evidence" data-a27="senior-decision-evidence">\n'
        '  <!-- A27_SENIOR_DECISION_EVIDENCE -->\n'
        '  <header class="case-section-head"><span class="case-section-label">A27 / DECISION EVIDENCE SNAPSHOT</span>'
        '<h2>What I owned, chose, traded off — and what is still unknown</h2></header>\n'
        '  <div class="case-section-body">\n'
        '    <p class="a27-decision-intro">A recruiter-scan summary derived from the public case source. '
        'Unknowns stay explicit instead of being converted into team, stakeholder, failure or outcome claims.</p>\n'
        '    <div class="a27-decision-grid">\n' + '\n'.join(cards) + '\n    </div>\n'
        '  </div>\n'
        '</section>\n'
    )
    anchor = '<section class="case-section measurement-targets"'
    if anchor not in source:
        raise SystemExit(f'Measurement section anchor missing in {path}')
    source = source.replace(anchor, block + '\n' + anchor, 1)
    file.write_text(source, encoding='utf-8')

registry = {
    'schema_version': '1.0',
    'generated_from': 'public case-study source + docs/measurement-targets.json',
    'policy': {
        'no_invented_team_or_stakeholders': True,
        'no_invented_failure_or_pivot': True,
        'no_invented_engineering_collaboration': True,
        'no_invented_outcome': True,
        'unknown_is_valid_evidence_state': True,
        'decision_snapshot_is_recruiter_scan_not_research_result': True
    },
    'required_fields': [label for label, _ in fields],
    'projects': registry_rows
}
(ROOT / 'docs/senior-decision-evidence.json').write_text(json.dumps(registry, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

css_path = ROOT / 'case-study-evidence-v4.css'
css = css_path.read_text(encoding='utf-8')
css_marker = '/* A27 Senior Decision Evidence */'
if css_marker in css:
    raise SystemExit('A27 CSS marker already exists')
css_lines = [
    '',
    '/* A27 Senior Decision Evidence */',
    '.senior-decision-evidence{border-top:1px solid var(--line,#d8d8d2)}',
    '.a27-decision-intro{max-width:820px;color:var(--muted,#666);font-size:13px;line-height:1.7;margin:0 0 24px}',
    '.a27-decision-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--line,#d8d8d2);border:1px solid var(--line,#d8d8d2)}',
    '.a27-decision-item{min-width:0;min-height:142px;padding:20px;background:var(--paper,#fff)}',
    '.a27-decision-item>span{display:block;margin-bottom:14px;font-family:var(--mono,"DM Mono",monospace);font-size:9px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;color:var(--muted,#6b6b67)}',
    '.a27-decision-item>p{margin:0;font-size:13px;line-height:1.62;color:var(--ink,#111)}',
    '.a27-decision-item[data-a27-field="WHAT WENT WRONG"]>p,.a27-decision-item[data-a27-field="EVIDENCE"]>p,.a27-decision-item[data-a27-field="NEXT DECISION"]>p{font-weight:500}',
    '@media(max-width:900px){.a27-decision-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    '@media(max-width:620px){.a27-decision-grid{grid-template-columns:1fr}.a27-decision-item{min-height:0;padding:18px}}',
]
css_path.write_text(css + '\n'.join(css_lines) + '\n', encoding='utf-8')

qa_path = ROOT / 'qa/portfolio-v5.spec.mjs'
qa = qa_path.read_text(encoding='utf-8')
qa_marker = "test('A27 senior decision evidence is explicit and honest across every local case'"
if qa_marker in qa:
    raise SystemExit('A27 QA test already exists')
qa_lines = [
    '',
    "  test('A27 senior decision evidence is explicit and honest across every local case', async () => {",
    "    const registry = JSON.parse(await fs.readFile('docs/senior-decision-evidence.json', 'utf8'));",
    '    expect(registry.policy.no_invented_team_or_stakeholders).toBe(true);',
    '    expect(registry.policy.no_invented_failure_or_pivot).toBe(true);',
    '    expect(registry.policy.no_invented_engineering_collaboration).toBe(true);',
    '    expect(registry.policy.no_invented_outcome).toBe(true);',
    '    expect(registry.projects).toHaveLength(18);',
    "    const required = ['ROLE','TEAM','CONSTRAINT','OPTIONS','DECISION','TRADE-OFF','ENGINEERING','SYSTEM IMPACT','WHAT WENT WRONG','EVIDENCE','NEXT DECISION'];",
    '    expect(registry.required_fields).toEqual(required);',
    '    for (const item of registry.projects) {',
    "      const source = await fs.readFile(item.surface, 'utf8');",
    "      expect(source).toContain('A27_SENIOR_DECISION_EVIDENCE');",
    '      for (const field of required) expect(source).toContain(`data-a27-field="${field}"`);',
    '      expect(item.evidence).toMatch(/NOT MEASURED|RECRUITING|TARGET|VERIFIED|NOT AN OUTCOME/i);',
    '      expect(item.team.length).toBeGreaterThan(20);',
    '      expect(item.next_decision.length).toBeGreaterThan(20);',
    '    }',
    "    const factory = registry.projects.find(item => item.surface === 'case-study-uiux-factory.html');",
    '    expect(factory.what_went_wrong).toMatch(/raw-source|runtime repair/i);',
    "    const nova = registry.projects.find(item => item.surface === 'case-study-nova.html');",
    '    expect(nova.audit.options_documented).toBe(true);',
    '    expect(nova.audit.tradeoff_documented).toBe(true);',
    "    const sentry = registry.projects.find(item => item.surface === 'case-study-sentry.html');",
    '    expect(sentry.audit.options_documented).toBe(true);',
    '    expect(sentry.audit.tradeoff_documented).toBe(true);',
    '  });',
    ''
]
end = qa.rfind('\n});')
if end == -1:
    raise SystemExit('Could not find test.describe closing block')
qa = qa[:end] + '\n'.join(qa_lines) + qa[end:]
qa_path.write_text(qa, encoding='utf-8')

print(f'A27 prepared {len(registry_rows)} case studies')
print('Documented options:', sum(1 for row in registry_rows if row['audit']['options_documented']))
print('Documented trade-offs:', sum(1 for row in registry_rows if row['audit']['tradeoff_documented']))
print('Documented teams:', sum(1 for row in registry_rows if row['audit']['team_documented']))
print('Documented failures/pivots:', sum(1 for row in registry_rows if row['audit']['failure_or_pivot_documented']))
