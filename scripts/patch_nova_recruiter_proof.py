from pathlib import Path


def replace(path, old, new, count=1):
    p = Path(path)
    text = p.read_text(encoding='utf-8')
    if old not in text:
        raise SystemExit(f'Expected fragment not found in {path}: {old[:120]}')
    p.write_text(text.replace(old, new, count), encoding='utf-8')


replace('index.html', 'Senior-level signals,<br>shown through work.', 'Product-design capability,<br>shown through work.')

old_nova = '''        <div class="nova-card-scoreboard" aria-label="Nova product design evidence summary">
          <div><strong>10</strong><span>real-user records</span></div>
          <div><strong>40</strong><span>atomic signals</span></div>
          <div><strong>4</strong><span>product decisions</span></div>
          <div><strong>2×</strong><span>research rounds</span></div>
        </div>

        <div class="nova-card-loop" aria-label="Nova product design loop">
          <span>Evidence</span><i>→</i><span>Decision</span><i>→</i><span>Ship</span><i>→</i><span>Retest</span>
        </div>

        <div class="flagship-evidence">
          <div><span>Decision</span><p>Move future obligations, transfer consequences and recovery truth into the exact moments where users make money decisions.</p></div>
          <div><span>What changed</span><p>Round 01 exposed four comprehension risks. I changed the prototype, shipped the iteration, then ran Round 02 with five new users. The retest still leaves all four findings open — visible, not hidden.</p></div>
        </div>

        <div class="flagship-senior-signals nova-proof-signals"><strong>Product-design evidence</strong><span>Research governance</span><span>Trade-offs</span><span>Failure + recovery</span><span>Iteration + retest</span></div>
        <div class="flagship-actions"><a class="flagship-primary" href="case-study-nova.html#nova-recruiter-proof">See 30-sec proof ↗</a><a href="https://ngh1aa.github.io/Nova/app.html?screen=home&lab=1" target="_blank" rel="noopener">Tested build ↗</a><a href="https://github.com/Ngh1aa/Nova/tree/main/research/validation/nova-round-02" target="_blank" rel="noopener">Evidence ↗</a></div>'''

new_nova = '''        <div class="nova-card-scoreboard" aria-label="Nova research and retest summary">
          <div><strong>10</strong><span>async self-report records</span></div>
          <div><strong>2×</strong><span>rounds · n=5 + 5 new</span></div>
          <div><strong>4/5 → 2/5</strong><span>recovery clarity · regression signal</span></div>
          <div><strong>4</strong><span>findings still open</span></div>
        </div>
        <p class="nova-card-method">Directional, cross-sectional self-report · no moderated sessions · Round 02 used five new participants.</p>

        <div class="flagship-evidence">
          <div><span>Decision</span><p>Users understood the Safe-to-spend idea but misread its horizon, transfer consequences and whether sensitive actions were real, so I moved those consequences into the decision surface.</p></div>
          <div><span>What changed</span><p>Round 01 → shipped iteration → Round 02 with five new participants. Recovery clarity moved from 4/5 to 2/5 in compatible self-report, so I kept the finding open instead of claiming overall improvement.</p></div>
        </div>

        <div class="flagship-senior-signals nova-proof-signals"><strong>Open findings</strong><span>P1 · Demo/real boundary · open</span><span>P1 · Buffer comprehension · open</span><span>P2 · 14-day horizon · open</span><span>P2 · Recovery clarity · regression signal</span></div>
        <div class="flagship-actions"><a class="flagship-primary" href="case-study-nova.html">Read Nova case ↗</a><a href="https://ngh1aa.github.io/Nova/app.html?screen=home&lab=1" target="_blank" rel="noopener">Live prototype ↗</a><a href="https://www.figma.com/design/AxsWZgEvTOkzOQB71iAdcx/Nova?node-id=4-2052&amp;t=83Wo9YlCjxLTFzxv-1" target="_blank" rel="noopener">Figma ↗</a><a href="https://github.com/Ngh1aa/Nova/tree/main/research/validation/nova-round-02" target="_blank" rel="noopener">Research evidence ↗</a></div>'''
replace('index.html', old_nova, new_nova)

replace(
    'index.html',
    '<div class="flagship-senior-signals"><strong>Senior signals</strong><span>Product governance</span><span>AI-assisted workflow</span><span>Design→code</span><span>QA failure→repair</span></div>',
    '<div class="flagship-senior-signals"><strong>Evidence to inspect</strong><span>Repo + QA · verified</span><span>Design→code · working</span><span>Failure→repair · working</span><span>Human impact · unmeasured</span></div>'
)
replace(
    'index.html',
    '<div class="flagship-senior-signals"><strong>Senior signals</strong><span>Complex IA</span><span>High-density workflow</span><span>Explainability</span><span>Recovery states</span></div><div class="flagship-actions"><a class="flagship-primary" href="case-study-sentry.html">Read case ↗</a><a href="https://sentry-xi-lime.vercel.app/" target="_blank" rel="noopener">Live ↗</a><a href="https://github.com/Ngh1aa/Sentry" target="_blank" rel="noopener">Source ↗</a></div>',
    '<div class="flagship-senior-signals"><strong>Evidence to inspect</strong><span>Investigation states · prototype</span><span>Recovery states · prototype</span><span>Direct users · 0</span><span>Domain validation · open</span></div><div class="flagship-actions"><a class="flagship-primary" href="case-study-sentry.html">Read Sentry case ↗</a><a href="https://sentry-xi-lime.vercel.app/" target="_blank" rel="noopener">Live prototype ↗</a><a href="https://www.figma.com/design/1W6rwPXiTfcZn6OhieVUDe/Sentry?node-id=0-1&amp;t=BvIxuJu3KrFWy5Lg-1" target="_blank" rel="noopener">Figma ↗</a><a href="https://github.com/Ngh1aa/Sentry" target="_blank" rel="noopener">Source code ↗</a></div>'
)

p = Path('index.html')
text = p.read_text(encoding='utf-8')
text = text.replace('>Case ↗</a>', '>Read case ↗</a>')
text = text.replace('>Live ↗</a>', '>Live prototype ↗</a>')
p.write_text(text, encoding='utf-8')

replace(
    'case-study.js',
    '''            <div><span>Real-user evidence</span><strong>10 verified records</strong><small>5 Round 01 + 5 NEW Round 02 participants. Both rounds are async structured self-report, not moderated sessions.</small></div>
            <div><span>Atomic evidence</span><strong>40 traceable signals</strong><small>20 Round 01 + 20 Round 02 evidence records mapped to decisions rather than summarized into vague “insights.”</small></div>
            <div><span>Product decisions</span><strong>4 evidence-driven changes</strong><small>Truth boundary · transfer impact · Safe-to-spend horizon · failure recovery.</small></div>
            <div><span>Delivery proof</span><strong>1 shipped + retested iteration</strong><small>Canonical runtime, browser/visual/accessibility regression and post-change human retest.</small></div>''',
    '''            <div><span>Research method</span><strong>10 async self-report records</strong><small>2 rounds · n=5 + 5 new participants · 0 moderated sessions.</small></div>
            <div><span>Cross-round signal</span><strong>Recovery clarity 4/5 → 2/5</strong><small>Directional regression signal, not a causal effect; both rounds are small cross-sectional self-report samples.</small></div>
            <div><span>Product decisions</span><strong>4 evidence-driven changes</strong><small>Truth boundary · transfer impact · Safe-to-spend horizon · failure recovery.</small></div>
            <div><span>Current state</span><strong>4 findings still open</strong><small>The iteration shipped and was retested, but unresolved findings stay visible instead of being rewritten as success.</small></div>'''
)

css = Path('portfolio-product-upgrade.css')
css_text = css.read_text(encoding='utf-8')
marker = '/* A33 Nova recruiter-proof clarity */'
if marker not in css_text:
    css_text += '''\n\n/* A33 Nova recruiter-proof clarity */\n.nova-evidence-card .nova-card-scoreboard span{font-size:9.5px;line-height:1.35;letter-spacing:.075em;color:#d5d5cf}\n.nova-evidence-card .nova-card-scoreboard strong{line-height:.95}\n.nova-evidence-card .nova-card-method{margin-top:10px;color:#b8b8b2;font-size:10px;line-height:1.55;letter-spacing:.02em}\n.nova-evidence-card .nova-proof-signals strong{color:#b7b7b1;font-size:10px}\n.nova-evidence-card .nova-proof-signals span{font-size:9px;line-height:1.25;letter-spacing:.045em;text-transform:none;color:#f0f0eb}\n.nova-evidence-card .flagship-actions a{font-size:10.5px;letter-spacing:.08em}\n@media(max-width:720px){.nova-evidence-card .nova-card-scoreboard span{font-size:9px}.nova-evidence-card .nova-card-method{font-size:10px}.nova-evidence-card .nova-proof-signals span{font-size:9px}.flagship-actions{gap:12px 18px}.flagship-actions a{font-size:10.5px}}\n'''
    css.write_text(css_text, encoding='utf-8')

q = Path('qa/portfolio-v5.spec.mjs')
qtext = q.read_text(encoding='utf-8')
old = "    expect(source).toContain('Evidence</span><i>→</i><span>Decision</span><i>→</i><span>Ship</span><i>→</i><span>Retest');"
new = "    expect(source).toContain('Recovery clarity · regression signal');\n    expect(source).toContain('async self-report records');\n    expect(source).toContain('Read Nova case ↗');\n    expect(source).toContain('Live prototype ↗');\n    expect(source).toContain('Figma ↗');"
if old not in qtext:
    raise SystemExit('Old Nova pipeline assertion missing from qa/portfolio-v5.spec.mjs')
q.write_text(qtext.replace(old, new, 1), encoding='utf-8')
