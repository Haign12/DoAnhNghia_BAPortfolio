import json
import re
from pathlib import Path

ROOT = Path('.')
INDEX = ROOT / 'index.html'
CSS = ROOT / 'portfolio-product-upgrade.css'
QA = ROOT / 'qa/portfolio-v5.spec.mjs'
SITEMAP = ROOT / 'sitemap.xml'
MATURITY = ROOT / 'docs/project-maturity-audit.json'
ROADMAP = ROOT / 'docs/project-evidence-roadmap.md'
FIGMA_PLAN = ROOT / 'docs/figma-senior-system-plan.md'
PROTO_PLAN = ROOT / 'docs/prototype-senior-coverage-plan.md'
A27 = ROOT / 'docs/senior-decision-evidence.json'
A26 = ROOT / 'docs/measurement-targets.json'

index = INDEX.read_text(encoding='utf-8')
css = CSS.read_text(encoding='utf-8')
qa = QA.read_text(encoding='utf-8')

if 'A30_PROJECT_EVIDENCE_COMPLETENESS' in index:
    print('A30 already applied')
    raise SystemExit(0)

facts = {
    'LUMEN': {
        'role':'Experience / Product Designer','mode':'Independent concept','scope':'Discovery IA · visual system · coded prototype','complexity':'Multi-mode exploratory navigation','evidence':'Case · Live · Source',
        'maturity':4,'case':'case-study-lumen.html','gaps':['FIGMA_NOT_PUBLISHED','DIRECT_USER_VALIDATION_NOT_RUN'],
    },
    'HUẾ — Between River & Citadel': {
        'role':'Experience / UI Designer','mode':'Independent transformation','scope':'Narrative · art direction · implementation','complexity':'Scroll choreography + media provenance','evidence':'Case · Live · Source',
        'maturity':4,'case':'case-study-hue.html','gaps':['FIGMA_NOT_PUBLISHED','DIRECT_USER_VALIDATION_NOT_RUN'],
    },
    'LuxRoom': {
        'role':'UI/UX Designer','mode':'Independent concept','scope':'Commerce IA · responsive prototype','complexity':'Variants · dimensions · room context','evidence':'Case · Live · Figma',
        'maturity':4,'case':'case-study-luxroom.html','gaps':['BUSINESS_CONTEXT_NEEDS_EXPLICIT_FRAME','DIRECT_USER_VALIDATION_NOT_RUN'],
    },
    'Atelier': {
        'role':'UI/UX Designer','mode':'Independent concept','scope':'Commerce flow · visual system','complexity':'Editorial-to-cart information density','evidence':'Case · Live · Figma',
        'maturity':4,'case':'case-study-atelier.html','gaps':['STATE_COVERAGE_NEEDS_EXPLICIT_FRAME','DIRECT_USER_VALIDATION_NOT_RUN'],
    },
    'Violet Marketplace': {
        'role':'UI/UX Designer','mode':'Independent concept','scope':'Marketplace discovery · product story','complexity':'Scent confidence + marketplace utility','evidence':'Case · Live · Figma',
        'maturity':4,'case':'case-study-violet-marketplace.html','gaps':['STATE_COVERAGE_NEEDS_EXPLICIT_FRAME','DIRECT_USER_VALIDATION_NOT_RUN'],
    },
    'Nova': {
        'role':'Product Designer','mode':'Independent concept','scope':'Strategy · flows · states · prototype','complexity':'Trust-heavy money movement + recovery','evidence':'Case · Live · Figma',
        'maturity':5,'case':'case-study-nova.html','gaps':['DIRECT_USER_VALIDATION_RECRUITING'],
    },
    'Flux': {
        'role':'Product Designer','mode':'Independent concept','scope':'Treasury IA · states · prototype','complexity':'Multi-currency operations + settlement','evidence':'Case · Live · Figma',
        'maturity':4,'case':'case-study-flux.html','gaps':['BUSINESS_CONTEXT_NEEDS_EXPLICIT_FRAME','DIRECT_USER_VALIDATION_NOT_RUN'],
    },
    'Sentry': {
        'role':'Product Designer','mode':'Independent concept','scope':'Investigation IA · states · prototype','complexity':'High-density evidence + consequential decisions','evidence':'Case · Live · Figma',
        'maturity':4,'case':'case-study-sentry.html','gaps':['VALIDATION_BOUNDARY_NEEDS_EXPLICIT_FRAME'],
    },
    'ACCESS': {
        'role':'Product Designer','mode':'Independent concept','scope':'Permissions · visitor flows · prototype','complexity':'Credential lifecycle + spatial access','evidence':'Case · Live · Figma',
        'maturity':4,'case':'case-study-access.html','gaps':['BUSINESS_CONTEXT_NEEDS_EXPLICIT_FRAME','VALIDATION_BOUNDARY_NEEDS_EXPLICIT_FRAME'],
    },
    'Capital Place': {
        'role':'UI/UX Designer','mode':'Independent redesign','scope':'Decision journey · responsive prototype','complexity':'Place → requirement → floor → enquiry','evidence':'Case · Live · Figma',
        'maturity':5,'case':'case-study-capital-place.html','gaps':['DIRECT_USER_VALIDATION_NOT_RUN'],
    },
    'G.I.E': {
        'role':'Web / UI Designer','mode':'Design test','scope':'B2B IA · reusable sections · prototype','complexity':'Service taxonomy + RFQ context','evidence':'Case · Live · Figma',
        'maturity':5,'case':'case-study-cennext.html','gaps':['DIRECT_USER_VALIDATION_NOT_RUN'],
    },
    'VAS Education': {
        'role':'UI/UX Designer','mode':'Independent redesign','scope':'Content strategy · enrollment journey','complexity':'Programs + campuses + admissions','evidence':'Case · Live · Figma',
        'maturity':4,'case':'case-study-vas-education.html','gaps':['BUSINESS_CONTEXT_NEEDS_EXPLICIT_FRAME','DIRECT_USER_VALIDATION_NOT_RUN'],
    },
    'VOLTIS': {
        'role':'UI/UX Designer','mode':'Independent concept','scope':'Corporate IA · product storytelling · interaction','complexity':'Specs + range + investor content','evidence':'Case · Live · Figma',
        'maturity':5,'case':'case-study-voltis.html','gaps':['DIRECT_USER_VALIDATION_NOT_RUN'],
    },
    'UIUX Factory': {
        'role':'System Designer','mode':'Open-source design operating system','scope':'Workflow architecture · contracts · QA','complexity':'Multi-stage routing + evidence governance','evidence':'Case · Source · QA',
        'maturity':4,'case':'case-study-uiux-factory.html','gaps':['DIRECT_USER_OUTCOME_NOT_MEASURED','APP_STATE_MATRIX_NOT_APPLICABLE'],
    },
}

# ---------- Homepage: recruiter-scannable proof facts ----------
start = index.index('<section class="section work" id="work"')
end_candidates = [p for p in [index.find('<section class="section ', start + 1), index.find('<section class="contact', start + 1)] if p != -1]
end = min(end_candidates) if end_candidates else len(index)
work = index[start:end]
card_pattern = re.compile(r'<article class="([^"]*project[^"]*)"([^>]*)>(.*?)</article>', re.S)

def clean(value):
    return re.sub(r'<[^>]+>', '', value or '').replace('&amp;', '&').strip()

def upgrade_card(match):
    classes, attrs, body = match.group(1), match.group(2), match.group(3)
    h = re.search(r'<h3>(.*?)</h3>', body, re.S)
    if not h:
        return match.group(0)
    name = clean(h.group(1))
    if name not in facts:
        raise SystemExit(f'A30 unmapped homepage project: {name}')
    f = facts[name]
    block = (
        '<div class="project-proof-facts" aria-label="Project evidence facts">'
        f'<span><b>Role</b>{f["role"]}</span>'
        f'<span><b>Mode</b>{f["mode"]}</span>'
        f'<span><b>Scope</b>{f["scope"]}</span>'
        f'<span><b>Complexity</b>{f["complexity"]}</span>'
        f'<span><b>Evidence</b>{f["evidence"]}</span>'
        '</div>'
    )
    if 'project-proof-facts' not in body:
        anchor = '<div class="project-capability-signals"'
        if anchor not in body:
            raise SystemExit(f'{name}: capability anchor missing')
        body = body.replace(anchor, block + anchor, 1)
    if name == 'LUMEN' and 'case-study-lumen.html' not in body:
        body = body.replace('<div class="project-links" style="margin-top:24px">', '<div class="project-links" style="margin-top:24px"><a href="case-study-lumen.html">Case ↗</a>', 1)
    if name == 'HUẾ — Between River & Citadel' and 'case-study-hue.html' not in body:
        body = body.replace('<div class="project-links" style="margin-top:24px">', '<div class="project-links" style="margin-top:24px"><a href="case-study-hue.html">Case ↗</a>', 1)
    return f'<article class="{classes}"{attrs}>{body}</article>'

work = card_pattern.sub(upgrade_card, work)
if work.count('class="project-proof-facts"') != 14:
    raise SystemExit('A30 expected 14 homepage proof-fact blocks')
work = work.replace('<!-- A29_SUPPORTING_CAPABILITY_LIBRARY -->', '<!-- A29_SUPPORTING_CAPABILITY_LIBRARY -->\n  <!-- A30_PROJECT_EVIDENCE_COMPLETENESS -->', 1)
work = work.replace('</div>\n  <div class="filter-row reveal" role="group"', '</div>\n  <p class="work-proof-note reveal">Role, scope, complexity and evidence are shown on every card. Project-duration claims stay unpublished until they are source-backed; no timeline is invented for visual completeness.</p>\n  <div class="filter-row reveal" role="group"', 1)
index = index[:start] + work + index[end:]
INDEX.write_text(index, encoding='utf-8')

# ---------- Shared homepage styles ----------
css_add = r'''

/* A30 Project Evidence Completeness */
.work-proof-note{margin-top:18px;max-width:780px;color:#777;font-size:11px;line-height:1.6;letter-spacing:.02em}
.project-proof-facts{margin-top:14px;padding-top:13px;border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 14px}
.project-proof-facts span{min-width:0;color:#5f5f5a;font-size:9px;line-height:1.45}
.project-proof-facts b{display:block;margin-bottom:2px;color:#8a8a84;font-size:7.5px;letter-spacing:.13em;text-transform:uppercase}
.project-featured .project-proof-facts{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:900px){.project-featured .project-proof-facts{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:560px){.project-proof-facts,.project-featured .project-proof-facts{grid-template-columns:1fr}.work-proof-note{font-size:10px}}
'''
if '/* A30 Project Evidence Completeness */' not in css:
    CSS.write_text(css.rstrip() + css_add + '\n', encoding='utf-8')

# ---------- New visible case studies ----------
def a27_block(items):
    rows=''.join(f'<article class="a27-decision-item" data-a27-field="{k}"><span>{k}</span><p>{v}</p></article>' for k,v in items)
    return f'''<section class="case-section senior-decision-evidence" data-a27="senior-decision-evidence">
  <!-- A27_SENIOR_DECISION_EVIDENCE -->
  <header class="case-section-head"><span class="case-section-label">A27 / DECISION EVIDENCE SNAPSHOT</span><h2>What I owned, chose, traded off — and what is still unknown</h2></header>
  <div class="case-section-body"><p class="a27-decision-intro">Public-source evidence only. Missing user outcomes, collaboration and failure history stay explicit instead of being invented.</p><div class="a27-decision-grid">{rows}</div></div>
</section>'''

def shell(title, description, canonical, body):
    return f'''<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} — Product Design Case Study | Do Anh Nghia</title>
<meta name="description" content="{description}">
<link rel="icon" type="image/png" href="assets/images/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap">
<link rel="stylesheet" href="case-study.css?v=20260904-art-directed-v1"><link rel="stylesheet" href="case-study-evidence-v4.css?v=20260907-recruiter-proof-v4"><script src="case-study.js?v=20260903-luxury-editorial-v1" defer></script>
<link rel="canonical" href="{canonical}">
</head><body class="case-study-page case-personal">{body}</body></html>'''

lumen_a27 = [
('ROLE','Experience / Product Designer · interaction system · coded prototype'),
('TEAM','Independent project; no separate PM, engineering or museum stakeholder team is claimed in the public evidence.'),
('CONSTRAINT','Weak-intent discovery must stay usable with keyboard and reduced motion, use credible art metadata, preserve provenance, and avoid a flat search/grid-only archive.'),
('OPTIONS','Conventional search/grid archive / cinematic single-path story / multi-mode relationship-driven discovery.'),
('DECISION','Use Drift, Grid, Color and Mood as parallel discovery modes leading into artwork detail, Relationship Atlas and saved collections.'),
('TRADE-OFF','Serendipity vs orientation · motion richness vs accessibility/performance · visual expression vs metadata credibility.'),
('ENGINEERING','React + TypeScript + Vite; platform View Transitions and CSS motion; 2D CSS/SVG spatial layer; GitHub Pages deployment and browser QA.'),
('SYSTEM IMPACT','The experience is structured as a repeatable digital-museum platform with a published Exhibition Index rather than a one-off gallery page.'),
('WHAT WENT WRONG','UNKNOWN — no verified failed release, user-test failure or project pivot is published as outcome evidence.'),
('EVIDENCE','DESK EVIDENCE + WORKING PROTOTYPE. Direct-user validation remains planned; success signals are not measured outcomes.'),
('NEXT DECISION','Run task-based sessions with weak-intent art explorers and test whether they can discover, orient, follow a relationship and continue without falling back to search.'),
]
lumen_body = f'''<nav class="sticky-nav" aria-label="Case study navigation"><a href="index.html#work" class="nav-brand"><span class="nav-arrow" aria-hidden="true">←</span><span>Supporting capability library</span></a><div class="case-nav-actions"><a href="https://ngh1aa.github.io/Lumen/" target="_blank" rel="noopener noreferrer">Live prototype ↗</a><a href="https://github.com/Ngh1aa/Lumen" target="_blank" rel="noopener noreferrer">Source ↗</a><button class="case-theme-toggle" id="theme-toggle" type="button" aria-label="Switch theme" aria-pressed="false"><span id="theme-icon" aria-hidden="true">◐</span><span data-theme-label>Dark</span></button></div></nav>
<main class="uiux-project"><article class="uiux-case"><header class="case-hero"><div class="case-identity"><aside class="case-rail"><span class="case-index">CULTURAL EXPERIENCE · INDEPENDENT CONCEPT</span><dl class="case-facts"><div><dt>Role</dt><dd>Experience / Product Designer</dd></div><div><dt>Domain</dt><dd>Digital museum / visual culture</dd></div><div><dt>Reality</dt><dd>React + TypeScript + Vite working prototype</dd></div><div><dt>Figma</dt><dd>Not published — no link fabricated</dd></div><div><dt>Evidence</dt><dd>Desk research + product hypothesis · direct-user outcome not measured</dd></div></dl><div class="case-hero-actions"><a class="case-action case-action-primary" href="https://ngh1aa.github.io/Lumen/" target="_blank" rel="noopener noreferrer">Try prototype ↗</a><a class="case-action" href="https://github.com/Ngh1aa/Lumen" target="_blank" rel="noopener noreferrer">Inspect source ↗</a></div></aside><div class="case-heading"><p class="case-kicker">DISCOVERY IA · RELATIONSHIP MODEL · ART DIRECTION</p><h1 class="case-title">LUMEN</h1><p class="case-thesis">A digital museum for people who do not yet know what to search for: <em>drift into relationships between artworks instead of starting from a keyword.</em></p></div></div><figure class="case-cover"><div class="case-cover-frame"><img src="thumbnail/lumen-v2.webp" alt="LUMEN digital museum experience" loading="eager" decoding="async"></div><figcaption><span>Working cultural-experience prototype</span><span>Direct-user validation still planned</span></figcaption></figure></header>
{a27_block(lumen_a27)}
<section class="case-section"><header class="case-section-head"><span class="case-section-label">01 / PRODUCT CONTEXT</span><h2>Exploration begins before a user has a query</h2></header><div class="case-section-body"><p>The primary user is a curious culture or art explorer with weak or ambiguous intent. Conventional archives are strong when the visitor knows an artist, movement or keyword; LUMEN explores the opposite condition — “show me something interesting.”</p><div class="case-evidence-strip"><div><span>User goal</span><strong>Discover without prior vocabulary</strong><small>Move from curiosity to an artwork and a meaningful relationship.</small></div><div><span>Owner objective</span><strong>Make the collection understandable and memorable</strong><small>Preserve curatorial credibility while encouraging continued exploration.</small></div><div><span>Business / product tension</span><strong>Serendipity vs orientation</strong><small>Discovery can feel magical only if the user can still understand where they are.</small></div><div><span>Evidence state</span><strong>Hypothesis · not outcome</strong><small>Real visitor research could still change the model.</small></div></div></div></section>
<section class="case-section"><header class="case-section-head"><span class="case-section-label">02 / OPTIONS + DECISION</span><h2>Use multiple discovery modes, not one cinematic trick</h2></header><div class="case-section-body"><div class="decision-flow"><div><span>Rejected as primary</span><strong>Search + flat category grid</strong><p>Efficient for known intent, weak for exploratory wandering.</p></div><div><span>Rejected as sole model</span><strong>Single cinematic path</strong><p>Strong art direction, but too prescriptive for repeat exploration.</p></div><div><span>Selected</span><strong>Drift + Grid + Color + Mood</strong><p>Parallel entry points lead into artwork detail, relationships and saved collections.</p></div></div><p>The Relationship Atlas turns content relationships into product logic rather than decorative motion.</p></div></section>
<section class="case-section"><header class="case-section-head"><span class="case-section-label">03 / PROTOTYPE TASK</span><h2>Try one end-to-end discovery task</h2></header><div class="case-section-body"><div class="case-boundary"><strong>TRY THIS TASK</strong><p>Enter without a specific artist → choose one discovery mode → open an artwork → follow one relationship → save or continue → switch to reduced motion or keyboard navigation and confirm the content path still works.</p></div><div class="case-evidence-strip"><div><span>Main path</span><strong>Explore → artwork → relationship</strong></div><div><span>Alternative</span><strong>Grid / search fallback</strong></div><div><span>Recovery</span><strong>Back trail + accessible fallback</strong></div><div><span>State depth</span><strong>Empty / populated collection · 404 · accessibility settings</strong></div></div></div></section>
<section class="case-section"><header class="case-section-head"><span class="case-section-label">04 / SYSTEM + ENGINEERING</span><h2>Art direction is constrained by a real implementation system</h2></header><div class="case-section-body"><p>The current build uses React + TypeScript + Vite, CSS variables, platform View Transitions and a 2D CSS/SVG spatial layer. The Definition of Done explicitly includes keyboard focus, reduced motion, empty/populated collection states, mobile overflow checks and rendered browser evidence.</p><div class="case-boundary"><strong>ENGINEERING REALITY</strong><p>This is a front-end cultural experience, not a production museum CMS. Real collection APIs, institutional taxonomy governance, analytics, editorial tooling and visitor data are outside the implemented scope.</p></div></div></section>
<section class="case-section"><header class="case-section-head"><span class="case-section-label">05 / VALIDATION + METRICS</span><h2>Measure discovery before claiming delight</h2></header><div class="case-section-body"><!-- A26_MEASUREMENT_TARGETS --><div class="case-boundary"><strong>TARGET — NOT A RESULT</strong><p>Target: ≥ 4/5 participants with weak intent discover an artwork, explain one relationship and continue without moderator help. Measure task completion, relationship comprehension, orientation errors and confidence. No invented before/after delta.</p></div><p>Planned signals also include entry-to-first-artwork interaction, relationship hops, return to exploration, saved actions and keyboard/reduced-motion usability.</p></div></section>
<footer class="case-footer"><a href="index.html#work">← Back to projects</a><a href="https://ngh1aa.github.io/Lumen/" target="_blank" rel="noopener noreferrer">Try LUMEN ↗</a></footer></article></main>'''
(ROOT/'case-study-lumen.html').write_text(shell('LUMEN','LUMEN case study: relationship-driven art discovery, interaction system, accessibility constraints and a working React/TypeScript prototype without fabricated user outcomes.','https://do-anh-nghia-uiux-portfolio.vercel.app/case-study-lumen.html',lumen_body),encoding='utf-8')

hue_a27 = [
('ROLE','Experience / UI Designer · art-direction transformation · front-end implementation'),
('TEAM','Independent project; no separate PM, engineering or cultural-institution stakeholder team is claimed in the public evidence.'),
('CONSTRAINT','Preserve a proven cinematic scroll/slider engine while replacing destination identity, imagery, editorial semantics and production media; keep keyboard, reduced-motion and mobile behavior.'),
('OPTIONS','Rewrite the motion engine / lightly reskin the original destination / preserve reusable mechanics but fully re-author place identity and local media.'),
('DECISION','Preserve the reusable motion mechanics and re-author Huế through new narrative chapters, local media, visual system, routes and provenance records.'),
('TRADE-OFF','Implementation speed vs originality · cinematic motion vs accessibility/performance · provenance rigor vs asset convenience.'),
('ENGINEERING','Vanilla HTML/CSS/JavaScript with no bundler; separate Huế art-direction layers; local production media; GitHub Actions QA and Lighthouse accessibility gates.'),
('SYSTEM IMPACT','The source separates reusable motion engineering from destination identity so future transformations do not require rewriting the scroll engine.'),
('WHAT WENT WRONG','UNKNOWN — no verified user-test failure or release pivot is published as outcome evidence.'),
('EVIDENCE','WORKING PROTOTYPE + SOURCE/PROVENANCE + RENDERED QA. Direct-user comprehension/usability outcomes are not measured.'),
('NEXT DECISION','Test whether first-time visitors understand the river/citadel narrative, can choose a thematic route, and remain oriented when cinematic motion is reduced or unavailable.'),
]
hue_body = f'''<nav class="sticky-nav" aria-label="Case study navigation"><a href="index.html#work" class="nav-brand"><span class="nav-arrow" aria-hidden="true">←</span><span>Supporting capability library</span></a><div class="case-nav-actions"><a href="https://ngh1aa.github.io/Mostar-Guide/" target="_blank" rel="noopener noreferrer">Live prototype ↗</a><a href="https://github.com/Ngh1aa/Mostar-Guide" target="_blank" rel="noopener noreferrer">Source ↗</a><button class="case-theme-toggle" id="theme-toggle" type="button" aria-label="Switch theme" aria-pressed="false"><span id="theme-icon" aria-hidden="true">◐</span><span data-theme-label>Dark</span></button></div></nav>
<main class="uiux-project"><article class="uiux-case"><header class="case-hero"><div class="case-identity"><aside class="case-rail"><span class="case-index">CULTURAL EXPERIENCE · INDEPENDENT TRANSFORMATION</span><dl class="case-facts"><div><dt>Role</dt><dd>Experience / UI Designer</dd></div><div><dt>Domain</dt><dd>Culture / place storytelling</dd></div><div><dt>Reality</dt><dd>Vanilla HTML/CSS/JS working prototype</dd></div><div><dt>Figma</dt><dd>Not published — no link fabricated</dd></div><div><dt>Evidence</dt><dd>Source + provenance + rendered QA · user outcome not measured</dd></div></dl><div class="case-hero-actions"><a class="case-action case-action-primary" href="https://ngh1aa.github.io/Mostar-Guide/" target="_blank" rel="noopener noreferrer">Try prototype ↗</a><a class="case-action" href="https://github.com/Ngh1aa/Mostar-Guide" target="_blank" rel="noopener noreferrer">Inspect source ↗</a></div></aside><div class="case-heading"><p class="case-kicker">NARRATIVE FLOW · ART DIRECTION · PROVENANCE</p><h1 class="case-title">HUẾ — Between River & Citadel</h1><p class="case-thesis">A cinematic cultural experience that follows the Perfume River through imperial thresholds, living streets and royal landscapes while separating reusable motion engineering from destination identity.</p></div></div><figure class="case-cover"><div class="case-cover-frame"><img src="https://ngh1aa.github.io/Mostar-Guide/assets/hue/scenes/02-citadel-backdrop.webp" alt="Huế Imperial City cinematic scene" loading="eager" decoding="async"></div><figcaption><span>Working independent cultural prototype</span><span>Transformation and source provenance are public</span></figcaption></figure></header>
{a27_block(hue_a27)}
<section class="case-section"><header class="case-section-head"><span class="case-section-label">01 / CONTEXT + CONSTRAINT</span><h2>The hard part was not changing the city name</h2></header><div class="case-section-body"><p>The starting point was an external cinematic-scroll reference. The product/design task was to preserve reusable interaction mechanics without presenting a reskin as original work. The Huế concept therefore replaces destination identity, imagery, chapter semantics, route content, visual system and production media while documenting what technical behavior remains reused.</p><div class="case-evidence-strip"><div><span>User goal</span><strong>Understand Huế as a connected place</strong><small>River, citadel and living city form a narrative rather than isolated landmarks.</small></div><div><span>Design goal</span><strong>Distinct destination identity</strong><small>Poetic · imperial · atmospheric, not a generic travel template.</small></div><div><span>Constraint</span><strong>Preserve the motion engine</strong><small>Do not casually rewrite working scroll/slider mechanics.</small></div><div><span>Evidence boundary</span><strong>Transformation ≠ user outcome</strong><small>Source transparency and QA are verified; visitor comprehension is not.</small></div></div></div></section>
<section class="case-section"><header class="case-section-head"><span class="case-section-label">02 / OPTIONS + TRADE-OFF</span><h2>Keep engineering; replace identity</h2></header><div class="case-section-body"><div class="decision-flow"><div><span>Rejected</span><strong>Simple content reskin</strong><p>Fast, but would leave the original destination logic and weaken authorship.</p></div><div><span>Rejected</span><strong>Rewrite all motion</strong><p>Maximizes code novelty but introduces unnecessary risk and removes a useful technical constraint.</p></div><div><span>Selected</span><strong>Preserve mechanics, re-author experience</strong><p>New Huế chapters, routes, media, typography, palette, markers and provenance sit on the retained engine.</p></div></div></div></section>
<section class="case-section"><header class="case-section-head"><span class="case-section-label">03 / PROTOTYPE TASK</span><h2>Try the narrative with and without motion</h2></header><div class="case-section-body"><div class="case-boundary"><strong>TRY THIS TASK</strong><p>Move from Arrival → Citadel → River → Beyond the walls → choose one thematic Route. Repeat with reduced motion and keyboard navigation; the place narrative and next action should remain understandable.</p></div><div class="case-evidence-strip"><div><span>Main path</span><strong>Arrival → Citadel → River</strong></div><div><span>Alternative</span><strong>Three thematic routes</strong></div><div><span>Accessibility</span><strong>Keyboard + reduced-motion path</strong></div><div><span>Responsive</span><strong>390px overflow and route isolation checked</strong></div></div></div></section>
<section class="case-section"><header class="case-section-head"><span class="case-section-label">04 / SYSTEM + ENGINEERING</span><h2>Reusable motion is a system boundary, not the brand</h2></header><div class="case-section-body"><p><code>script.js</code> remains the scroll/slider source of truth, while <code>hue.css</code>, <code>hue-routes.css</code>, local assets and route content own destination identity. Production media is local with credits, transformation notes and a SHA-256 provenance manifest.</p><div class="case-boundary"><strong>ENGINEERING REALITY</strong><p>The prototype is static HTML/CSS/JavaScript with no build step. CI verifies required assets, rejects stale destination content, renders visual checkpoints, checks the infinite slider, mobile overflow and Lighthouse accessibility.</p></div></div></section>
<section class="case-section"><header class="case-section-head"><span class="case-section-label">05 / VALIDATION + METRICS</span><h2>Test orientation and comprehension, not whether the animation looks cool</h2></header><div class="case-section-body"><!-- A26_MEASUREMENT_TARGETS --><div class="case-boundary"><strong>TARGET — NOT A RESULT</strong><p>Target: ≥ 4/5 first-time participants follow one thematic route, identify the next landmark/action and remain oriented under both default and reduced-motion modes. Measure route completion, navigation recovery, orientation errors and confidence. No invented before/after delta.</p></div></div></section>
<footer class="case-footer"><a href="index.html#work">← Back to projects</a><a href="https://ngh1aa.github.io/Mostar-Guide/" target="_blank" rel="noopener noreferrer">Try HUẾ ↗</a></footer></article></main>'''
(ROOT/'case-study-hue.html').write_text(shell('HUẾ — Between River & Citadel','Huế cultural-experience case study: narrative transformation, art direction, provenance, preserved motion engineering and accessible QA without fabricated visitor outcomes.','https://do-anh-nghia-uiux-portfolio.vercel.app/case-study-hue.html',hue_body),encoding='utf-8')

# ---------- A30 gap repairs: concise, only where audit found a gap ----------
repairs = {
 'case-study-luxroom.html': ('Purchase confidence vs conversion friction','Variants, dimensions and room context reduce uncertainty, but every additional decision aid adds scanning cost.','Variant selection, responsive behavior and purchase-recovery states are part of the prototype evidence.','PLANNED_VALIDATION — no direct-user outcome is claimed.'),
 'case-study-atelier.html': ('Editorial expression vs shopping clarity','The business/product value is a path from inspiration to a confident purchase without flattening the brand.','Explicit state lens: product availability, selection/validation, responsive navigation and purchase-path recovery should be inspected as product states, not only final screens.','PLANNED_VALIDATION — run first findability/purchase-path benchmark.'),
 'case-study-violet-marketplace.html': ('Storytelling vs marketplace utility','The product has to communicate scent confidence while keeping comparison and purchase actions legible.','Explicit state lens: discovery/filter state, product confidence, availability/selection and recovery need to remain usable beyond the ideal content state.','PLANNED_VALIDATION — run first marketplace discovery benchmark.'),
 'case-study-flux.html': ('Operational speed vs treasury control','The product value is faster liquidity/settlement decisions without hiding FX exposure, reserves or approval consequence.','Failure and recovery states remain first-class because a treasury tool cannot treat settlement exceptions as edge decoration.','PLANNED_VALIDATION — no operations-user result is claimed.'),
 'case-study-sentry.html': ('Decision speed vs defensibility','Fraud operations need fast action, but consequential block/allow decisions must retain evidence and rationale.','High-density evidence, risk states and decision recovery are implemented as system behavior.','PLANNED_VALIDATION — recruit fraud/risk practitioners or clearly labeled adjacent experts; no moderated benchmark has been run yet.'),
 'case-study-access.html': ('Frictionless entry vs security control','The product value is low-friction access without making credential lifecycle, permission and revocation invisible.','Credential, permission, visitor and revocation states are core product logic rather than decorative UI states.','PLANNED_VALIDATION — first security/visitor-flow benchmark is still required.'),
 'case-study-vas-education.html': ('Parent clarity vs institutional complexity','The journey must make programs, campuses and admissions understandable without oversimplifying the institution.','Program/campus comparison and enquiry states are part of the decision system.','PLANNED_VALIDATION — no parent/user outcome is claimed.'),
 'case-study-uiux-factory.html': ('Delivery speed vs governance','The system aims to reduce ambiguous handoff/rework while preventing faster generation from bypassing evidence, authority or QA.','App empty/loading/error states are N/A. Equivalent system states are READY / BLOCKED / GATE_FAIL / repair / re-verify, with rendered browser evidence required for UI claims.','SYSTEM DOGFOOD + QA VERIFIED; human workflow impact remains a target, not a measured user outcome.'),
}
for path, values in repairs.items():
    p=ROOT/path
    src=p.read_text(encoding='utf-8')
    if 'A30_EVIDENCE_COMPLETENESS' in src:
        continue
    business,business_detail,state,validation=values
    block=f'''\n<section class="case-section a30-evidence-completeness" data-a30="evidence-completeness">\n  <!-- A30_EVIDENCE_COMPLETENESS -->\n  <header class="case-section-head"><span class="case-section-label">A30 / EVIDENCE COMPLETENESS</span><h2>Three things a reviewer should not have to infer</h2></header>\n  <div class="case-section-body"><div class="case-evidence-strip"><div><span>Business / product tension</span><strong>{business}</strong><small>{business_detail}</small></div><div><span>State / system depth</span><strong>Beyond the happy path</strong><small>{state}</small></div><div><span>Validation boundary</span><strong>No fabricated outcome</strong><small>{validation}</small></div><div><span>Next proof</span><strong>Evidence before polish</strong><small>Run the stated task/benchmark and update the case only from traceable observations.</small></div></div></div>\n</section>\n'''
    m=re.search(r'(<section class="case-section senior-decision-evidence"[^>]*>.*?</section>)',src,re.S)
    if not m:
        raise SystemExit(f'{path}: A27 insertion anchor missing')
    src=src[:m.end()]+block+src[m.end():]
    p.write_text(src,encoding='utf-8')

# ---------- Canonical maturity registry ----------
registry={
 'schema_version':1,
 'generated_from':'A30 audit of current homepage cards, local case-study source, A27/A26 registries and linked public implementation evidence',
 'policy':{
   'artifact_maturity_is_not_designer_seniority':True,
   'maturity_level_is_internal_audit_not_public_badge':True,
   'no_invented_timeline':True,
   'no_invented_user_validation':True,
   'no_invented_commercial_impact':True,
   'missing_figma_is_reported_not_faked':True,
 },
 'rubric':{
   '1':'UI exercise — visual artifact without clear product/problem evidence',
   '2':'Concept project — flow/visual direction, research/validation mostly assumed',
   '3':'Junior case study — process, prototype and basic system evidence',
   '4':'Mid-level case-study artifact — constraints, responsive/system/edge-state depth and explicit evidence boundaries',
   '5':'Senior-level case-study artifact — product strategy, trade-offs, technical feasibility and outcome/measurement framework are inspectable; this does not claim senior tenure',
 },
 'projects':[]
}
for name,f in facts.items():
    registry['projects'].append({'project':name,'surface':f['case'],'artifact_maturity_level':f['maturity'],'role':f['role'],'mode':f['mode'],'scope':f['scope'],'complexity':f['complexity'],'public_evidence':f['evidence'],'remaining_gaps':f['gaps']})
MATURITY.write_text(json.dumps(registry,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')

ROADMAP.write_text('''# A30 — Project Evidence Roadmap\n\nA30 applies the supplied five-level project rubric to **artifacts**, not to the designer's job title or years of experience. A public card never shows a self-score.\n\n## What the current portfolio already proves\n\n- A27 already exposes role, team boundary, constraint, options, decision, trade-off, engineering, system impact, failure/unknown, evidence and next decision on local case studies.\n- A26 already separates measurement targets from outcomes.\n- A29 already maps each visible project to capability signals.\n\n## A30 gaps that still require real work\n\n1. **Direct-user validation:** most projects remain PLANNED / NOT MEASURED. Run sessions before promoting findings or before/after claims.\n2. **Figma depth:** GitHub can verify public Figma URLs, not the internal page/component quality. LUMEN and HUẾ currently have no published Figma link.\n3. **Prototype state depth:** where a case lacks explicit state evidence, add/verify empty, loading, error, recovery, disabled/focus and responsive behavior in the actual prototype — not just case-study prose.\n4. **Timeline/duration:** exact project duration is not uniformly source-backed, so A30 intentionally does not invent duration metadata on public cards. Add it only after project records provide a defensible start/end or duration.\n5. **Commercial impact:** independent concepts stay independent concepts. Measurement frameworks are not outcomes.\n\n## Priority next actions\n\n- **LUMEN:** publish an editable Figma system if available; recruit weak-intent art explorers; validate discovery/orientation and reduced-motion paths.\n- **HUẾ:** publish Figma if available; test route/narrative comprehension and motion accessibility with first-time visitors.\n- **Nova:** complete recruiting and run the committed baseline protocol before changing evidence state.\n- **Sentry / ACCESS / Flux:** prioritize domain-adjacent moderated task tests because decision quality/recovery is more important than additional visual polish.\n- **Atelier / Violet / LuxRoom:** verify product-state coverage in the actual prototypes, then run findability/configuration tasks.\n- **UIUX Factory:** keep system dogfood/QA separate from human workflow impact; measure adoption/rework only when traceable usage evidence exists.\n''',encoding='utf-8')

FIGMA_PLAN.write_text('''# Figma Senior System Plan\n\nUse this only as an implementation checklist for the linked design files. File existence or a public URL does **not** prove these pages/components exist.\n\n## Recommended page structure\n\n00 — Cover / Prototype Guide  \n01 — Product Context  \n02 — Research / Assumptions  \n03 — User Flow  \n04 — Information Architecture  \n05 — Wireframes  \n06 — Explorations / Decisions  \n07 — Design System  \n08 — Final Screens  \n09 — Prototype  \n10 — Handoff / Specs\n\n## System depth\n\nTokens: color, typography, spacing, grid, radius, elevation, icon rules.  \nComponents: button, input, select, modal, drawer, tabs, table, card, navigation, toast.  \nStates: default, hover, focus, pressed, disabled, loading, error, empty, destructive where relevant.  \nResponsive: mobile/desktop variants, content overflow/long text behavior, component properties and variables/modes where the file supports them.\n\n## Handoff evidence\n\nDocument reuse boundary, breakpoints, long-text/truncation behavior, loading/error behavior, data-empty behavior, motion duration/easing, keyboard/focus behavior and implementation constraints.\n\n## Current public gap\n\nLUMEN and HUẾ have working source/live evidence but no published Figma link in the portfolio. Do not add a placeholder link. Publish an editable file only if it exists and is reviewer-ready.\n''',encoding='utf-8')

PROTO_PLAN.write_text('''# Prototype Senior Coverage Plan\n\nA senior prototype is judged by task/state coverage, not total screen count.\n\n## Minimum task model\n\nFor each product, define one recruiter-friendly **Try this task** path that shows where the user starts, what they are trying to finish, what happens when the happy path breaks and how the system state changes.\n\n## Coverage checklist\n\n- first-time and returning user where relevant\n- happy path + at least one alternative path\n- empty, loading, success and error/recovery states\n- confirmation + cancel/undo where consequential\n- permission/role differences for B2B/security/admin products\n- hover, focus, pressed, disabled and validation states\n- modal/drawer/toast/filter/search/sort where product logic needs them\n- keyboard behavior for desktop products\n- reduced-motion path for motion-heavy experiences\n- responsive behavior for web products\n\n## Evidence rule\n\nCase-study text may describe a planned state, but only the working prototype/source proves that the state exists. Keep `PLANNED` separate from `VERIFIED`.\n''',encoding='utf-8')

# ---------- Add LUMEN/HUẾ to A26 and A27 registries ----------
a26=json.loads(A26.read_text(encoding='utf-8'))
if not any(x.get('surface')=='case-study-lumen.html' for x in a26['projects']):
    a26['projects'].extend([
      {'project':'LUMEN','surface':'case-study-lumen.html','target':'≥ 4/5 weak-intent participants discover an artwork, explain one relationship and continue without moderator help','metric':'Task completion · relationship comprehension · orientation errors · confidence','baseline':'Needs first moderated benchmark','evidence_state':'PLANNED / NOT MEASURED'},
      {'project':'HUẾ — Between River & Citadel','surface':'case-study-hue.html','target':'≥ 4/5 first-time participants follow one thematic route and remain oriented under default and reduced-motion modes','metric':'Route completion · navigation recovery · orientation errors · confidence','baseline':'Needs first moderated benchmark','evidence_state':'PLANNED / NOT MEASURED'},
    ])
A26.write_text(json.dumps(a26,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')

a27=json.loads(A27.read_text(encoding='utf-8'))
def add_a27(project,surface,case_class,role,constraint,options,decision,tradeoff,engineering,impact,evidence,next_decision):
    if any(x.get('surface')==surface for x in a27['projects']): return
    a27['projects'].append({'project':project,'surface':surface,'case_class':case_class,'role':role,'team':'Independent project; no separate PM, engineering or stakeholder team is documented in this public case.','constraint':constraint,'options':options,'decision':decision,'tradeoff':tradeoff,'engineering':engineering,'system_impact':impact,'what_went_wrong':'UNKNOWN — no verified failed release, user-test failure or project pivot is published as outcome evidence.','evidence':evidence,'next_decision':next_decision,'audit':{'options_documented':True,'tradeoff_documented':True,'engineering_boundary_documented':True,'team_documented':False,'failure_or_pivot_documented':False}})
add_a27('LUMEN','case-study-lumen.html','CULTURAL EXPERIENCE · INDEPENDENT CONCEPT','Experience / Product Designer','Weak-intent discovery must remain accessible and provenance-safe.','Search/grid vs cinematic single path vs multi-mode relationship discovery.','Multi-mode discovery leading to artwork relationships and saved collections.','Serendipity vs orientation · motion vs accessibility/performance.','React + TypeScript + Vite working prototype with browser/accessibility QA.','Repeatable digital-museum/exhibition platform.','PLANNED / NOT MEASURED. Working prototype + desk evidence; direct-user outcome not measured.','Run weak-intent discovery sessions and repair orientation/comprehension failures before adding more modes.')
add_a27('HUẾ — Between River & Citadel','case-study-hue.html','CULTURAL EXPERIENCE · INDEPENDENT TRANSFORMATION','Experience / UI Designer','Preserve reusable motion engineering while fully re-authoring destination identity and local media.','Rewrite engine vs reskin vs preserve mechanics and re-author experience.','Preserve motion mechanics; replace narrative, media, routes, visual system and provenance layer.','Implementation speed vs originality · cinematic motion vs accessibility/performance.','Vanilla HTML/CSS/JS with local media, CI/rendered QA and Lighthouse accessibility gates.','Separates destination identity from reusable motion-engine source of truth.','PLANNED / NOT MEASURED. Working prototype + provenance/QA; direct-user outcome not measured.','Test narrative/route comprehension and orientation under default and reduced-motion modes.')
A27.write_text(json.dumps(a27,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')

# ---------- Sitemap ----------
sitemap=SITEMAP.read_text(encoding='utf-8')
for slug in ['case-study-lumen.html','case-study-hue.html']:
    if slug not in sitemap:
        entry=f'  <url><loc>https://do-anh-nghia-uiux-portfolio.vercel.app/{slug}</loc></url>\n'
        sitemap=sitemap.replace('</urlset>',entry+'</urlset>')
SITEMAP.write_text(sitemap,encoding='utf-8')

# ---------- QA ----------
if "{ path: 'case-study-lumen.html', heading: 'LUMEN' }" not in qa:
    needle="  { path: 'case-study-voltis.html', heading: 'VOLTIS' },"
    qa=qa.replace(needle,needle+"\n  { path: 'case-study-lumen.html', heading: 'LUMEN' },\n  { path: 'case-study-hue.html', heading: 'HUẾ — Between River & Citadel' },",1)
qa=qa.replace("expect(registry.projects).toHaveLength(18);","expect(registry.projects).toHaveLength(20);",1)
if 'A30 project evidence completeness keeps public proof scannable without fabricating maturity, timelines or outcomes' not in qa:
    test_block=r'''

  test('A30 project evidence completeness keeps public proof scannable without fabricating maturity, timelines or outcomes', async ({ page }) => {
    const registry = JSON.parse(await fs.readFile('docs/project-maturity-audit.json', 'utf8'));
    expect(registry.policy.artifact_maturity_is_not_designer_seniority).toBe(true);
    expect(registry.policy.maturity_level_is_internal_audit_not_public_badge).toBe(true);
    expect(registry.policy.no_invented_timeline).toBe(true);
    expect(registry.policy.no_invented_user_validation).toBe(true);
    expect(registry.projects).toHaveLength(14);
    for (const item of registry.projects) {
      expect(item.artifact_maturity_level).toBeGreaterThanOrEqual(1);
      expect(item.artifact_maturity_level).toBeLessThanOrEqual(5);
      expect(item.role.length).toBeGreaterThan(3);
      expect(item.scope.length).toBeGreaterThan(8);
      expect(item.complexity.length).toBeGreaterThan(8);
    }

    const source = await fs.readFile('index.html', 'utf8');
    expect(source).toContain('A30_PROJECT_EVIDENCE_COMPLETENESS');
    expect(source).not.toMatch(/Level [1-5] —/);
    expect(source).toContain('case-study-lumen.html');
    expect(source).toContain('case-study-hue.html');

    await page.goto(`${baseURL}/#work`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#work .project-proof-facts')).toHaveCount(14);
    for (const card of await page.locator('#work article.project, #work article.project-featured').all()) {
      await expect(card.locator('.project-proof-facts span')).toHaveCount(5);
    }
    await expect(page.getByText(/Project-duration claims stay unpublished until they are source-backed/i)).toBeVisible();

    for (const route of ['case-study-lumen.html','case-study-hue.html']) {
      const caseSource = await fs.readFile(route, 'utf8');
      expect(caseSource).toContain('A27_SENIOR_DECISION_EVIDENCE');
      expect(caseSource).toContain('A26_MEASUREMENT_TARGETS');
      expect(caseSource).toContain('TARGET — NOT A RESULT');
      expect(caseSource).toContain('Figma</dt><dd>Not published — no link fabricated');
    }
  });
'''
    pos=qa.rfind('\n});')
    if pos==-1: raise SystemExit('QA closing anchor missing')
    qa=qa[:pos]+test_block+qa[pos:]
QA.write_text(qa,encoding='utf-8')

print('A30_APPLIED')
print('VISIBLE_PROJECT_FACTS=14')
print('NEW_CASES=case-study-lumen.html,case-study-hue.html')
print('A27_PROJECTS='+str(len(a27['projects'])))
print('A26_PROJECTS='+str(len(a26['projects'])))
