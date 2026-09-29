import json
import re
from pathlib import Path

ROOT = Path('.')
index_path = ROOT / 'index.html'
css_path = ROOT / 'portfolio-product-upgrade.css'
qa_path = ROOT / 'qa/portfolio-v5.spec.mjs'
registry_path = ROOT / 'docs/recruiter-capability-map.json'

index = index_path.read_text(encoding='utf-8')
css = css_path.read_text(encoding='utf-8')
qa = qa_path.read_text(encoding='utf-8')

if 'A28_RECRUITER_CAPABILITY_PROOF' in index:
    print('A28 already applied')
    raise SystemExit(0)

hero_old = '<span class="hero-positioning">AI speeds up exploration and implementation; product judgment and evidence stay human-owned.</span></div>'
hero_new = '''<span class="hero-positioning">AI speeds up exploration and implementation; product judgment and evidence stay human-owned.</span><ul class="hero-signal-list" aria-label="Core product design capabilities"><li>Product strategy</li><li>IA + flows</li><li>State design</li><li>UI systems</li><li>Prototype + QA</li></ul></div>'''
if hero_old not in index:
    raise SystemExit('hero positioning anchor not found')
index = index.replace(hero_old, hero_new, 1)

capability_section = '''<section class="capability-proof-section" id="capabilities" aria-labelledby="capabilities-title">
  <!-- A28_RECRUITER_CAPABILITY_PROOF -->
  <div class="capability-proof-head reveal">
    <div><p class="eyebrow">Recruiter scan / capability proof</p><h2 class="capability-proof-title" id="capabilities-title">Senior-level signals,<br>shown through work.</h2></div>
    <p class="capability-proof-intro">A 60-second map of the product-design scope demonstrated across personal projects. Each capability points to inspectable case evidence. It is <strong>evidence of scope and decision quality, not a tenure claim.</strong></p>
  </div>
  <div class="capability-proof-grid">
    <article class="capability-proof-card reveal" data-capability="product-strategy"><div class="capability-proof-index">01 / PRODUCT STRATEGY</div><h3>Frame the decision before the interface</h3><p>User/owner decision, constraint, alternatives, trade-offs and the next decision stay explicit before visual polish.</p><div class="capability-proof-links"><span>Proof</span><a href="case-study-nova.html">Nova ↗</a><a href="case-study-sentry.html">Sentry ↗</a></div></article>
    <article class="capability-proof-card reveal" data-capability="research-evidence"><div class="capability-proof-index">02 / RESEARCH + EVIDENCE</div><h3>Separate what is known from what still needs testing</h3><p>Direct evidence, desk/proxy evidence, hypotheses, planned validation and unknowns are kept distinct instead of being collapsed into “insights.”</p><div class="capability-proof-links"><span>Proof</span><a href="case-study-uiux-factory.html">UIUX Factory ↗</a><a href="case-study-nova.html">Nova ↗</a></div></article>
    <article class="capability-proof-card reveal" data-capability="ia-state-design"><div class="capability-proof-index">03 / IA + STATE DESIGN</div><h3>Model complex workflows, not just happy-path screens</h3><p>Queues, permissions, approvals, failure, recovery and exception states are treated as product structure.</p><div class="capability-proof-links"><span>Proof</span><a href="case-study-sentry.html">Sentry ↗</a><a href="case-study-flux.html">Flux ↗</a><a href="case-study-access.html">ACCESS ↗</a></div></article>
    <article class="capability-proof-card reveal" data-capability="interaction-ui-systems"><div class="capability-proof-index">04 / INTERACTION + UI SYSTEMS</div><h3>Make hierarchy and behavior consistent across the system</h3><p>Interaction states, dense information hierarchy, responsive rules and reusable visual language carry product intent across surfaces.</p><div class="capability-proof-links"><span>Proof</span><a href="case-study-nova.html">Nova ↗</a><a href="case-study-access.html">ACCESS ↗</a><a href="case-study-atelier.html">Atelier ↗</a></div></article>
    <article class="capability-proof-card reveal" data-capability="prototype-delivery"><div class="capability-proof-index">05 / PROTOTYPING + DELIVERY</div><h3>Carry decisions into working behavior</h3><p>Flows, states and responsive contracts continue into working prototypes and design-to-code implementation instead of stopping at presentation frames.</p><div class="capability-proof-links"><span>Proof</span><a href="case-study-uiux-factory.html">UIUX Factory ↗</a><a href="case-study-cennext.html">CENNEXT ↗</a><a href="case-study-flux.html">Flux ↗</a></div></article>
    <article class="capability-proof-card reveal" data-capability="validation-qa"><div class="capability-proof-index">06 / VALIDATION + QA</div><h3>Define evidence before claiming success</h3><p>Test plans, measurement targets, accessibility/browser QA and failure→repair loops make quality inspectable without inventing outcomes.</p><div class="capability-proof-links"><span>Proof</span><a href="case-study-uiux-factory.html">UIUX Factory ↗</a><a href="case-study-nova.html">Nova ↗</a></div></article>
  </div>
</section>'''

marquee_pattern = re.compile(r'<section class="marquee" aria-label="Capabilities">.*?</section>', re.S)
if len(marquee_pattern.findall(index)) != 1:
    raise SystemExit('expected exactly one capabilities marquee')
index = marquee_pattern.sub(capability_section, index, count=1)

signals = {
    'UIUX Factory': ['Product governance', 'AI-assisted workflow', 'Design→code', 'QA failure→repair'],
    'Nova': ['Decision framing', 'Alternatives + trade-offs', 'State + recovery', 'Validation plan'],
    'Sentry': ['Complex IA', 'High-density workflow', 'Explainability', 'Recovery states'],
}

for project, items in signals.items():
    pattern = re.compile(r'(<article class="flagship-card[^>]*>.*?<h3>' + re.escape(project) + r'</h3>.*?)(<div class="flagship-actions">)', re.S)
    matches = pattern.findall(index)
    if len(matches) != 1:
        raise SystemExit(f'expected one flagship card for {project}')
    block = '<div class="flagship-senior-signals"><strong>Senior signals</strong>' + ''.join(f'<span>{item}</span>' for item in items) + '</div>'
    index = pattern.sub(lambda m: m.group(1) + block + m.group(2), index, count=1)

css_add = r'''

/* A28 Recruiter Capability Proof */
.hero-signal-list{margin-top:16px;display:flex;justify-content:flex-end;flex-wrap:wrap;gap:6px;list-style:none}
.hero-signal-list li{padding:7px 9px;border:1px solid #d2d2cd;border-radius:999px;background:rgba(255,255,255,.72);color:#333;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;line-height:1}
.capability-proof-section{padding:clamp(44px,5vw,76px) var(--gutter) clamp(54px,6vw,92px);background:#111;color:#fff;border-top:1px solid #111;border-bottom:1px solid #111}
.capability-proof-section .eyebrow{color:#9b9b96}.capability-proof-section .eyebrow::before{background:#fff}
.capability-proof-head{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(320px,.85fr);gap:var(--gutter);align-items:end}
.capability-proof-title{margin-top:18px;font-family:var(--display);font-size:clamp(52px,6.8vw,116px);font-weight:400;line-height:.88;letter-spacing:-.02em;text-transform:uppercase;color:#fff;max-width:10ch}
.capability-proof-intro{justify-self:end;max-width:620px;color:#a9a9a4;font-size:13px;line-height:1.75}.capability-proof-intro strong{color:#fff}
.capability-proof-grid{margin-top:42px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#353535;border:1px solid #353535}
.capability-proof-card{min-width:0;min-height:252px;padding:24px;background:#171717;display:flex;flex-direction:column}
.capability-proof-index{font-size:9px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#7f7f7a}
.capability-proof-card h3{margin-top:30px;max-width:15ch;color:#fff;font-size:clamp(24px,2.15vw,34px);line-height:1.02;letter-spacing:-.035em}
.capability-proof-card>p{margin-top:16px;max-width:56ch;color:#b2b2ad;font-size:12.5px;line-height:1.68}
.capability-proof-links{margin-top:auto;padding-top:24px;display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center}
.capability-proof-links>span{color:#72726e;font-size:8px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.capability-proof-links a{color:#fff;font-size:9px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;text-decoration:underline;text-underline-offset:4px}
.capability-proof-links a:hover{opacity:.7}
.flagship-senior-signals{margin-top:18px;padding-top:16px;border-top:1px solid #353535;display:flex;flex-wrap:wrap;gap:7px}
.flagship-senior-signals strong{flex:0 0 100%;margin-bottom:2px;color:#858580;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.flagship-senior-signals span{display:inline-flex;padding:7px 9px;border:1px solid #444;border-radius:999px;color:#e7e7e2;background:#1d1d1d;font-size:8px;font-weight:650;letter-spacing:.08em;text-transform:uppercase}
@media(max-width:1100px){.capability-proof-head{grid-template-columns:1fr}.capability-proof-intro{justify-self:start;max-width:760px}.capability-proof-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:720px){.hero-signal-list{justify-content:flex-start}.capability-proof-grid{grid-template-columns:1fr}.capability-proof-card{min-height:0}.capability-proof-title{font-size:54px}.capability-proof-section{padding-top:38px}.flagship-senior-signals span{font-size:7.5px}}
@media(prefers-reduced-motion:reduce){.capability-proof-card{transition:none!important}}
'''
if '/* A28 Recruiter Capability Proof */' in css:
    raise SystemExit('A28 CSS already exists unexpectedly')
css = css.rstrip() + css_add + '\n'

registry = {
    'schema_version': 1,
    'policy': {
        'capability_evidence_is_not_tenure': True,
        'do_not_invent_cross_functional_team_evidence': True,
        'do_not_promote_planned_validation_to_result': True,
        'projects_are_proof_links_not_skill_scores': True,
    },
    'scan_contract': {
        '5_seconds': 'role + core capability labels are visible in the hero',
        '60_seconds': 'six capability areas map to inspectable project evidence on the homepage',
        '10_minutes': 'flagship cases and A27 decision evidence expose constraints, options, decisions, trade-offs, engineering reality, failures, evidence and next decisions',
    },
    'capabilities': [
        {'id':'product-strategy','label':'Product Strategy','proof':['case-study-nova.html','case-study-sentry.html']},
        {'id':'research-evidence','label':'Research + Evidence','proof':['case-study-uiux-factory.html','case-study-nova.html']},
        {'id':'ia-state-design','label':'IA + State Design','proof':['case-study-sentry.html','case-study-flux.html','case-study-access.html']},
        {'id':'interaction-ui-systems','label':'Interaction + UI Systems','proof':['case-study-nova.html','case-study-access.html','case-study-atelier.html']},
        {'id':'prototype-delivery','label':'Prototyping + Delivery','proof':['case-study-uiux-factory.html','case-study-cennext.html','case-study-flux.html']},
        {'id':'validation-qa','label':'Validation + QA','proof':['case-study-uiux-factory.html','case-study-nova.html']},
    ],
    'flagship_signals': signals,
}
registry_path.write_text(json.dumps(registry, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')

qa_test = r'''
  test('A28 recruiter scan maps senior-level capabilities to inspectable project proof without claiming tenure', async ({ page }) => {
    const registry = JSON.parse(await fs.readFile('docs/recruiter-capability-map.json', 'utf8'));
    expect(registry.policy.capability_evidence_is_not_tenure).toBe(true);
    expect(registry.policy.do_not_invent_cross_functional_team_evidence).toBe(true);
    expect(registry.capabilities).toHaveLength(6);

    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.hero-signal-list li')).toHaveCount(5);
    await expect(page.locator('.capability-proof-card')).toHaveCount(6);
    await expect(page.getByText(/evidence of scope and decision quality, not a tenure claim/i)).toBeVisible();

    for (const capability of registry.capabilities) {
      const card = page.locator(`.capability-proof-card[data-capability="${capability.id}"]`);
      await expect(card).toHaveCount(1);
      const hrefs = await card.locator('a').evaluateAll(links => links.map(link => link.getAttribute('href')));
      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of capability.proof) expect(hrefs).toContain(href);
      expect(hrefs).not.toContain('#');
    }

    for (const project of ['UIUX Factory', 'Nova', 'Sentry']) {
      const card = page.locator('.flagship-card', { has: page.getByRole('heading', { level: 3, name: project }) });
      await expect(card).toHaveCount(1);
      expect(await card.locator('.flagship-senior-signals span').count()).toBeGreaterThanOrEqual(4);
    }
  });
'''
insert_at = qa.rfind('\n});')
if insert_at == -1:
    raise SystemExit('QA suite closing anchor not found')
qa = qa[:insert_at] + '\n' + qa_test + qa[insert_at:]

index_path.write_text(index, encoding='utf-8')
css_path.write_text(css, encoding='utf-8')
qa_path.write_text(qa, encoding='utf-8')

print('A28 recruiter capability proof applied')
