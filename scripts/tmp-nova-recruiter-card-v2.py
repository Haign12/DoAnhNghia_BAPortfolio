from pathlib import Path

index_path = Path('index.html')
qa_path = Path('qa/portfolio-v5.spec.mjs')

index = index_path.read_text(encoding='utf-8')
if 'nova-evidence-card' not in index:
    raise SystemExit('Nova evidence card v2 missing; refusing QA-only update.')

qa = qa_path.read_text(encoding='utf-8')
replacements = {
    "expect(source).toContain('10 real-user async self-report records');": "expect(source).toContain('nova-card-scoreboard');",
    "expect(source).toContain('shipped + retested iteration');": "expect(source).toContain('Evidence</span><i>→</i><span>Decision</span><i>→</i><span>Ship</span><i>→</i><span>Retest');"
}
changed = False
for old, new in replacements.items():
    if old in qa:
        qa = qa.replace(old, new, 1)
        changed = True
    elif new not in qa:
        raise SystemExit(f'Unexpected QA contract state: {old}')

if changed:
    qa_path.write_text(qa, encoding='utf-8')

print('Nova recruiter card v2 QA contract aligned.')
