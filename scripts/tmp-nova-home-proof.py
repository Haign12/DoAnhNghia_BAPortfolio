from pathlib import Path

index_path = Path('index.html')
qa_path = Path('qa/portfolio-v5.spec.mjs')

index = index_path.read_text(encoding='utf-8')

replacements = {
    '<span class="flagship-proof">Consumer decision design</span>': '<span class="flagship-proof">10 users · 2 rounds · retested</span>',
    '<div><span>Product proof</span><p>Alternatives, trade-offs, recovery states, working responsive prototype and Round 01 direct-user self-report evidence from 5 real users; post-change retest required.</p></div>': '<div><span>Product proof</span><p>Two verified direct-user rounds: 10 real-user async self-report records, 40 atomic evidence signals, 4 evidence-driven product decisions and one shipped + retested iteration. Round 02 keeps all four findings open.</p></div>',
    '<div class="flagship-senior-signals"><strong>Senior signals</strong><span>Decision framing</span><span>Alternatives + trade-offs</span><span>State + recovery</span><span>Validation plan</span></div>': '<div class="flagship-senior-signals"><strong>Product-design proof</strong><span>Decision framing</span><span>Evidence governance</span><span>State + recovery</span><span>Iteration + retest</span></div>',
    '<a href="https://github.com/Ngh1aa/Nova/tree/main/research/validation/nova-round-01" target="_blank" rel="noopener">Validation ↗</a>': '<a href="https://github.com/Ngh1aa/Nova/tree/main/research/validation/nova-round-02" target="_blank" rel="noopener">Retest evidence ↗</a>',
    '<p class="flagship-boundary"><span><strong>Evidence boundary:</strong> Nova and Sentry are independent concepts. Nova Round 01 includes 5 verified direct-user self-report records from an unmoderated task-based evaluation; post-change retest remains pending; Sentry remains unvalidated. UIUX Factory and Resolve AI repositories are working technical evidence; adoption, user outcomes and business impact remain separate claims.</span></p>': '<p class="flagship-boundary"><span><strong>Evidence boundary:</strong> Nova and Sentry are independent concepts. Nova now includes two verified direct-user async self-report rounds: 5 Round 01 participants + 5 NEW Round 02 participants. The evidence drove a shipped iteration and a real-user retest, but cross-sectional deltas are not causal product-impact claims. Sentry remains unvalidated. UIUX Factory and Resolve AI repositories are working technical evidence; adoption, user outcomes and business impact remain separate claims.</span></p>',
    '<div class="project-capability-signals" aria-label="Capability signals"><strong>Capability signals</strong><span>Product strategy</span><span>Trade-offs</span><span>State + recovery</span></div><div class="project-links">\n              <a href="case-study-nova.html">Case ↗</a>': '<div class="project-capability-signals" aria-label="Capability signals"><strong>Capability signals</strong><span>Product strategy</span><span>Evidence → iteration</span><span>State + recovery</span></div><div class="project-links">\n              <a href="case-study-nova.html">Case ↗</a>'
}

for old, new in replacements.items():
    if old not in index:
        raise SystemExit(f'Missing expected index source: {old[:120]}')
    index = index.replace(old, new, 1)

index_path.write_text(index, encoding='utf-8')

qa = qa_path.read_text(encoding='utf-8')
qa_replacements = {
    "expect(source).toContain('Nova/tree/main/research/validation/nova-round-01');": "expect(source).toContain('Nova/tree/main/research/validation/nova-round-02');",
    "expect(source).toContain('5 verified direct-user self-report records');": "expect(source).toContain('10 real-user async self-report records');",
    "expect(source).toContain('post-change retest');": "expect(source).toContain('shipped + retested iteration');"
}
for old, new in qa_replacements.items():
    if old not in qa:
        raise SystemExit(f'Missing expected QA source: {old}')
    qa = qa.replace(old, new, 1)
qa_path.write_text(qa, encoding='utf-8')

print('Nova homepage recruiter proof updated.')
