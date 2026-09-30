import fs from 'node:fs';

function replaceRequired(path, before, after, label) {
  let source = fs.readFileSync(path, 'utf8');
  if (source.includes(after)) {
    console.log(`already applied: ${label}`);
    return;
  }
  if (!source.includes(before)) throw new Error(`Could not find source for ${label} in ${path}`);
  source = source.replace(before, after);
  fs.writeFileSync(path, source);
  console.log(`applied: ${label}`);
}

function replaceAllRequired(path, before, after, label) {
  let source = fs.readFileSync(path, 'utf8');
  if (!source.includes(before)) {
    if (source.includes(after)) {
      console.log(`already applied: ${label}`);
      return;
    }
    throw new Error(`Could not find source for ${label} in ${path}`);
  }
  source = source.split(before).join(after);
  fs.writeFileSync(path, source);
  console.log(`applied all: ${label}`);
}

// Nova case study — replace recruiting-era claims with the executed-method truth.
replaceRequired(
  'case-study-nova.html',
  'Benchmark + hypothesis · validation recruiting',
  '5 verified direct-user records · retest required',
  'hero evidence status'
);
replaceRequired(
  'case-study-nova.html',
  'RECRUITING / NOT MEASURED. Baseline: Round 01 recruiting; 0 verified sessions.',
  'DIRECT USER / RETEST REQUIRED. Round 01: 5 verified direct-user self-report records; 0 moderated sessions; no post-change improvement claim.',
  'A27 evidence snapshot'
);
replaceRequired(
  'case-study-nova.html',
  'run a baseline test on the current prototype',
  'run a post-change retest on the exact merged iteration build',
  'A27 next decision'
);
replaceRequired(
  'case-study-nova.html',
  'No measured outcome yet',
  'Direct-user evidence captured',
  'context evidence heading'
);
replaceRequired(
  'case-study-nova.html',
  'Benchmark-informed hypothesis + implemented prototype.',
  '5 real-user self-report records informed the current iteration; post-change retest is pending.',
  'context evidence detail'
);
replaceRequired(
  'case-study-nova.html',
  'This supports a pattern, not Nova’s usability. Direct testing is still required.',
  'Benchmark context is now complemented by direct-user self-report; post-change human retest is still required before any improvement claim.',
  'benchmark limitation'
);
replaceRequired(
  'case-study-nova.html',
  '<div class="case-boundary"><strong>VALIDATION STATUS · RECRUITING</strong><p>Round 01 has a committed moderator protocol, anonymized session template and evidence register, but currently has <strong>0 verified sessions</strong>. <a href="https://github.com/Ngh1aa/Nova/tree/main/research/validation/nova-round-01" target="_blank" rel="noopener noreferrer">Inspect protocol ↗</a> · <a href="https://github.com/Ngh1aa/Nova/issues/21" target="_blank" rel="noopener noreferrer">Evidence gate ↗</a>. No user outcome is promoted until real session records satisfy that gate.</p></div>',
  '<div class="case-boundary"><strong>VALIDATION STATUS · DIRECT USER / RETEST REQUIRED</strong><p>Round 01 was executed as an <strong>unmoderated task-based prototype evaluation</strong> with 5 eligible real users. All 5 consented records are verified as direct-user self-report; this is <strong>not</strong> five moderated sessions. The evidence drove the current P1/P2 iteration, but no usability improvement is claimed until post-change retest. <a href="https://github.com/Ngh1aa/Nova/tree/main/research/validation/nova-round-01" target="_blank" rel="noopener noreferrer">Inspect evidence ↗</a> · <a href="https://github.com/Ngh1aa/Nova/issues/24" target="_blank" rel="noopener noreferrer">Retest gate ↗</a>.</p></div><div class="case-evidence-strip"><div><span>Sensitive actions</span><strong>5 / 5 self-report signal</strong><small>Participants raised uncertainty, mistaken expectations or requests about demo versus real banking actions.</small></div><div><span>Transfer impact</span><strong>4 / 5 partial or insufficient</strong><small>Self-reported information sufficiency before confirmation; not an observed task-success rate.</small></div><div><span>Safe-to-spend horizon</span><strong>3 interpretations</strong><small>Forecast window, end of week and next payday appeared across the five records.</small></div><div><span>Recovery</span><strong>4 / 5 said money did not move</strong><small>Failure-cause clarity was weaker than the safety consequence. Post-change retest remains required.</small></div></div>',
  'validation boundary + evidence patterns'
);
replaceAllRequired(
  'case-study-nova.html',
  'Round 01 recruiting; 0 verified sessions',
  'Round 01: 5 verified direct-user self-report records; 0 moderated sessions; retest pending',
  'case-study baseline labels'
);
replaceAllRequired(
  'case-study-nova.html',
  'RECRUITING / NOT MEASURED',
  'DIRECT_USER_SELF_REPORT / RETEST REQUIRED',
  'case-study evidence-state labels'
);

// Homepage recruiter-scan truth.
replaceRequired(
  'index.html',
  'Round 01 usability validation recruiting with 0 verified sessions.',
  'Round 01 direct-user self-report evidence from 5 real users; post-change retest required.',
  'homepage Nova flagship evidence'
);
replaceRequired(
  'index.html',
  'Nova Round 01 is recruiting with 0 verified sessions;',
  'Nova Round 01 includes 5 verified direct-user self-report records from an unmoderated task-based evaluation; post-change retest remains pending;',
  'homepage evidence boundary'
);

// Canonical CV source.
replaceRequired(
  'cv/main.typ',
  'working prototype; Round 01 recruiting (0 verified sessions); no measured business uplift.',
  'working prototype; 5 verified direct-user self-report records from an unmoderated task-based evaluation; post-iteration retest pending; no measured business uplift.',
  'CV Nova evidence'
);

// Measurement registry.
{
  const path = 'docs/measurement-targets.json';
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  const nova = data.projects.find((p) => p.project === 'Nova');
  if (!nova) throw new Error('Nova missing from measurement targets');
  nova.metric = 'Direct-user self-report comprehension/confidence · post-change task success · critical errors · time';
  nova.baseline = 'Round 01: 5 verified direct-user self-report records; no observed task-success/time baseline; post-change retest pending';
  nova.evidence_state = 'DIRECT_USER_SELF_REPORT / RETEST_REQUIRED';
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}

// Senior decision evidence.
{
  const path = 'docs/senior-decision-evidence.json';
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  const nova = data.projects.find((p) => p.project === 'Nova');
  if (!nova) throw new Error('Nova missing from senior decision evidence');
  nova.evidence = 'DIRECT_USER_SELF_REPORT / RETEST REQUIRED. Round 01: 5 verified direct-user self-report records; 0 moderated sessions; no post-change improvement claim.';
  nova.next_decision = 'Run a 3–5 person post-change retest on the exact merged Nova build; repeat the affected tasks and keep improvement claims blocked until compatible post-change evidence exists.';
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}

// Project maturity registry.
{
  const path = 'docs/project-maturity-audit.json';
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  const nova = data.projects.find((p) => p.project === 'Nova');
  if (!nova) throw new Error('Nova missing from project maturity audit');
  nova.remaining_gaps = (nova.remaining_gaps || []).map((gap) => gap === 'DIRECT_USER_VALIDATION_RECRUITING' ? 'POST_ITERATION_DIRECT_USER_RETEST' : gap);
  if (!nova.remaining_gaps.includes('POST_ITERATION_DIRECT_USER_RETEST')) nova.remaining_gaps.push('POST_ITERATION_DIRECT_USER_RETEST');
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}

replaceRequired(
  'docs/project-evidence-roadmap.md',
  '- **Nova:** complete recruiting and run the committed baseline protocol before changing evidence state.',
  '- **Nova:** Round 01 now has 5 verified direct-user self-report records and an evidence-driven iteration; run the post-change retest on the exact merged build before any improvement claim.',
  'evidence roadmap Nova next step'
);

replaceRequired(
  'qa/portfolio-v5.spec.mjs',
  "expect(source).toContain('0 verified sessions');",
  "expect(source).toContain('5 verified direct-user self-report records');\n    expect(source).toContain('post-change retest');",
  'portfolio QA evidence truth'
);

for (const path of ['case-study-nova.html', 'index.html', 'cv/main.typ']) {
  const source = fs.readFileSync(path, 'utf8');
  if (source.includes('Round 01 recruiting; 0 verified sessions') || source.includes('Nova Round 01 is recruiting with 0 verified sessions')) {
    throw new Error(`Stale Nova recruiting claim remains in ${path}`);
  }
}

console.log('Nova portfolio evidence transform complete.');
