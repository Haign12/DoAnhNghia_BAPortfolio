from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
QA = ROOT / "qa" / "portfolio-v5.spec.mjs"
README = ROOT / "README.md"
UPGRADE_JS = ROOT / "portfolio-product-upgrade.js"


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 exact match, found {count}")
    return text.replace(old, new, 1)


def regex_once(text: str, pattern: str, replacement: str, label: str) -> str:
    updated, count = re.subn(pattern, replacement, text, count=1, flags=re.S)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 regex match, found {count}")
    return updated


html = INDEX.read_text(encoding="utf-8")

html = replace_once(
    html,
    "<title>Do Anh Nghia — Product Designer · UI/UX · Systems</title>",
    "<title>Do Anh Nghia — Product Designer · Systems · AI-assisted Design-to-Code</title>",
    "document title",
)
html = replace_once(
    html,
    '<meta name="description" content="Product design portfolio by Do Anh Nghia — product reasoning, UI/UX systems, working prototypes, design-to-code and evidence-aware case studies.">',
    '<meta name="description" content="Product design portfolio by Do Anh Nghia — fintech and B2B product reasoning, systems thinking, working prototypes, AI-assisted design-to-code and evidence-aware browser QA.">',
    "meta description",
)
html = replace_once(html, "<body>", '<body class="leadership-track">', "body mode")

html = regex_once(
    html,
    r'<div class="nav-links" id="navLinks">.*?</div>\n    <button class="menu"',
    '<div class="nav-links" id="navLinks"><a href="#story">About</a><a href="#flagships">Work</a><a href="#ai-workflow">AI workflow</a><a href="#writing">Writing</a><a href="#experience">Experience</a><a href="#contact">Contact</a><a class="nav-cta" href="Do_Anh_Nghia_Product_Designer_CV.pdf" target="_blank" rel="noopener">Resume ↗</a></div>\n    <button class="menu"',
    "static recruiter nav",
)

old_hero = '''    <h1 class="hero-roles" aria-label="Product Designer — UI UX, systems, AI and code">
      <span class="role-line"><b>PRODUCT</b></span><span class="role-line"><b>UI / UX</b></span><span class="role-line"><b>SYSTEMS</b></span><span class="role-line"><b>AI + CODE</b></span>
    </h1>
    <div class="hero-intro"><span class="status"><i></i> Open to Product Designer · UI/UX · Web Design</span>I turn ambiguous product problems into <strong>clear decisions, usable flows and scalable interface systems</strong> — then carry them into working prototypes teams can inspect.<span class="hero-positioning">Strongest at complex workflows, design systems, interaction craft and AI-assisted design-to-code.</span></div>'''
new_hero = '''    <h1 class="hero-roles" aria-label="Product design, systems, prototypes and AI-assisted quality assurance">
      <span class="role-line"><b>PRODUCT</b></span><span class="role-line"><b>SYSTEMS</b></span><span class="role-line"><b>PROTOTYPES</b></span><span class="role-line"><b>AI + QA</b></span>
    </h1>
    <div class="hero-intro"><span class="status"><i></i> Product Designer · Fintech / B2B · AI-assisted design-to-code</span>I turn <strong>ambiguous product problems into inspectable decisions, flows, systems and working prototypes</strong>. AI accelerates synthesis, exploration, implementation and QA; product judgment, evidence boundaries and consequential decisions remain human-owned.<span class="hero-positioning">Current evidence boundary: most portfolio cases are independent concepts. Where direct user research or production metrics are missing, I label the gap and define the next validation instead of converting hypotheses into “results.”</span></div>'''
html = replace_once(html, old_hero, new_hero, "hero source truth")
html = replace_once(
    html,
    '<p class="hero-note"><strong>Product thinking × interface craft.</strong><br>Three flagship cases lead with problem framing, trade-offs and evidence; the wider project set shows range.</p>',
    '<p class="hero-note"><strong>Decisions before screens.</strong><br>Problem → evidence → flow → system → prototype → validation → repair.</p>',
    "hero note",
)
html = replace_once(
    html,
    '<div class="hero-side"><strong>03</strong><span>flagship product cases</span></div>',
    '<div class="hero-side"><strong>03</strong><span>flagships · product + systems</span></div>',
    "hero side",
)
html = replace_once(
    html,
    '<section class="marquee" aria-label="Capabilities"><div class="marquee-track"><div class="marquee-set"><span class="marquee-item">Product thinking</span><span class="marquee-item">Interface systems</span><span class="marquee-item">Responsive UI</span><span class="marquee-item">Design to code</span><span class="marquee-item">Visual QA</span></div><div class="marquee-set" aria-hidden="true"><span class="marquee-item">Product thinking</span><span class="marquee-item">Interface systems</span><span class="marquee-item">Responsive UI</span><span class="marquee-item">Design to code</span><span class="marquee-item">Visual QA</span></div></div></section>',
    '<section class="marquee" aria-label="Capabilities"><div class="marquee-track"><div class="marquee-set"><span class="marquee-item">Product reasoning</span><span class="marquee-item">Financial systems</span><span class="marquee-item">Decision design</span><span class="marquee-item">AI-assisted workflow</span><span class="marquee-item">Evidence + browser QA</span></div><div class="marquee-set" aria-hidden="true"><span class="marquee-item">Product reasoning</span><span class="marquee-item">Financial systems</span><span class="marquee-item">Decision design</span><span class="marquee-item">AI-assisted workflow</span><span class="marquee-item">Evidence + browser QA</span></div></div></section>',
    "capability marquee",
)

story = '''<section class="section" id="story">
  <div class="story-grid">
    <div class="story-copy reveal"><p class="eyebrow">Product practice</p><h2 class="section-title">Decisions before screens.</h2><p class="section-lead">Polished UI is only useful when the team can explain <strong>what decision it supports, what evidence shaped it, what trade-off was made and how the result will be checked.</strong> My work therefore connects product framing, information architecture, interaction states, visual systems, working code and evidence-aware QA.</p></div>
    <div class="principles reveal">
      <article class="principle"><span class="principle-index">01</span><div><h3>Frame the decision, not the screen</h3><p>Start with the user decision, owner objective, risk and success signal before choosing a feature or layout.</p></div></article>
      <article class="principle"><span class="principle-index">02</span><div><h3>Separate evidence from hypothesis</h3><p>Benchmarks, AI critique and heuristic review can guide a design; they do not become user research unless users actually produced the evidence.</p></div></article>
      <article class="principle"><span class="principle-index">03</span><div><h3>Carry intent into working behavior</h3><p>Flows, states, responsive rules and recovery paths belong in the prototype — not only in presentation slides.</p></div></article>
      <article class="principle"><span class="principle-index">04</span><div><h3>Use AI to increase leverage, not authority</h3><p>AI can inspect, synthesize, generate alternatives, implement and test. Humans retain product priorities, research interpretation, trade-offs and release judgment.</p></div></article>
    </div>
  </div>
</section>'''
html = regex_once(
    html,
    r'<section class="section" id="story">.*?</section>(?=\n<section class="section flagship-section")',
    story,
    "story section",
)

flagships_ai_writing = '''<section class="section flagship-section" id="flagships" aria-labelledby="flagship-title">
  <div class="flagship-head reveal">
    <div>
      <p class="eyebrow">Flagship product + systems work</p>
      <h2 class="section-title" id="flagship-title">Three cases.<br>One product practice.</h2>
      <p class="section-lead">The sequence shows how I work across <strong>AI-assisted delivery systems → consumer financial decisions → operational risk systems.</strong></p>
    </div>
    <p class="flagship-meta"><strong>Selection logic:</strong> these cases expose reasoning, state design, implementation proof, evidence boundaries and how I use AI without outsourcing product judgment.</p>
  </div>
  <div class="flagship-grid">
    <article class="flagship-card reveal flagship-ops-card">
      <a class="flagship-media" href="case-study-uiux-factory.html" aria-label="Read UIUX Factory Design Operations case study"><img src="thumbnail/uiux-factory.svg" alt="UIUX Factory design operating system workflow" loading="lazy" decoding="async"><span class="flagship-proof">AI workflow + evidence</span></a>
      <div class="flagship-copy"><div class="flagship-index"><span>01 / AI-assisted DesignOps</span><span>Working repository</span></div><h3>UIUX Factory</h3><p class="flagship-thesis">A verifiable operating system for project truth, decision contracts, implementation, browser QA and root-cause repair — built to make AI-assisted work faster without making evidence or ownership optional.</p><div class="flagship-evidence"><div><span>Product decision</span><p>Use AI as an inspectable co-pilot across research synthesis, exploration, implementation and QA instead of treating generated output as final authority.</p></div><div><span>Evidence boundary</span><p>Repository, contracts and QA harness are real; organization-wide adoption and efficiency gains are not claimed.</p></div></div><div class="flagship-actions"><a class="flagship-primary" href="case-study-uiux-factory.html">Read case ↗</a><a href="writing-design-ops-ai.html">Article ↗</a><a href="https://github.com/Ngh1aa/uiux-ai-workspace" target="_blank" rel="noopener">Repository ↗</a></div></div>
    </article>
    <article class="flagship-card reveal">
      <a class="flagship-media" href="case-study-nova.html" aria-label="Read Nova Product Design case study"><img src="thumbnail/nova.png" alt="Nova consumer finance product interface" loading="lazy" decoding="async"><span class="flagship-proof">Consumer decision design</span></a>
      <div class="flagship-copy"><div class="flagship-index"><span>02 / Consumer fintech</span><span>Independent concept</span></div><h3>Nova</h3><p class="flagship-thesis">Personal finance organized around a harder question than “what is my balance?” — what is actually safe to spend after known obligations and a protected buffer?</p><div class="flagship-evidence"><div><span>Decision</span><p>Bring future obligations into the primary money-decision surface without turning home into a spreadsheet.</p></div><div><span>Product proof</span><p>Alternatives, trade-offs, recovery states, measurement plan and working responsive prototype.</p></div></div><div class="flagship-actions"><a class="flagship-primary" href="case-study-nova.html">Read case ↗</a><a href="https://nova-gamma-eosin.vercel.app/" target="_blank" rel="noopener">Live ↗</a><a href="https://github.com/Ngh1aa/Nova" target="_blank" rel="noopener">Source ↗</a></div></div>
    </article>
    <article class="flagship-card reveal">
      <a class="flagship-media" href="case-study-sentry.html" aria-label="Read Sentry Product Design case study"><img src="thumbnail/sentry.png" alt="Sentry fraud operations investigation interface" loading="lazy" decoding="async"><span class="flagship-proof">Operational systems</span></a>
      <div class="flagship-copy"><div class="flagship-index"><span>03 / Risk operations</span><span>Independent concept</span></div><h3>Sentry</h3><p class="flagship-thesis">A high-density investigation workspace organized around one consequential decision: correlate evidence, understand conflicts and record a defensible action without losing context.</p><div class="flagship-evidence"><div><span>Decision</span><p>Keep alert priority, forensic evidence, consequence and recovery visible inside one stable investigation model.</p></div><div><span>Product proof</span><p>Queue, evidence, decision and recovery states demonstrate pressure beyond a happy-path dashboard.</p></div></div><div class="flagship-actions"><a class="flagship-primary" href="case-study-sentry.html">Read case ↗</a><a href="https://sentry-9bqs.vercel.app/" target="_blank" rel="noopener">Live ↗</a><a href="https://github.com/Ngh1aa/Sentry" target="_blank" rel="noopener">Source ↗</a></div></div>
    </article>
  </div>
  <p class="flagship-boundary"><span><strong>Evidence boundary:</strong> Nova and Sentry are independent concepts. UIUX Factory is a working repository. Planned usability tests, adoption and target metrics are kept separate from verified outcomes.</span></p>
</section>
<section class="section leadership-section" id="ai-workflow" aria-labelledby="ai-workflow-title">
  <div class="leadership-head reveal"><div><p class="eyebrow">How I use AI</p><h2 class="section-title" id="ai-workflow-title">AI is a multiplier, not the product owner.</h2></div><p class="section-lead">My workflow uses AI where it creates leverage — <strong>grounding, synthesis, alternatives, implementation, critique and QA</strong> — while keeping user evidence, product priorities, design rationale and release decisions explicitly human-owned.</p></div>
  <div class="leadership-grid">
    <article class="leadership-card reveal"><div class="leadership-card-top"><span>01 / GROUND + SYNTHESIZE</span><span class="evidence-pill verified">VERIFIED</span></div><h3>Start from project truth</h3><p>Agents inspect the repository, brief, routes, constraints and evidence gaps before proposing UI. Facts, inferences, assumptions and unknowns stay separated.</p><a href="https://github.com/Haign12/DoAnhNghia_BAPortfolio/blob/main/.agents/AGENTS.md" target="_blank" rel="noopener">Inspect agent contract ↗</a></article>
    <article class="leadership-card reveal"><div class="leadership-card-top"><span>02 / EXPLORE + CRITIQUE</span><span class="evidence-pill verified">VERIFIED</span></div><h3>Generate options, then govern them</h3><p>References and AI alternatives pass through ADOPT / ADAPT / REJECT decisions. Model critique can reveal risks, but it is never relabeled as user research.</p><a href="https://github.com/Haign12/DoAnhNghia_BAPortfolio/tree/main/.agents/skills" target="_blank" rel="noopener">Inspect routed skills ↗</a></article>
    <article class="leadership-card reveal"><div class="leadership-card-top"><span>03 / DESIGN → CODE</span><span class="evidence-pill verified">VERIFIED</span></div><h3>Pair on implementation</h3><p>AI helps translate approved flows, states, tokens and responsive contracts into working HTML/CSS/JS prototypes. Current flagship source is not presented as React/Next proof when it is not React/Next.</p><a href="https://github.com/Haign12/DoAnhNghia_BAPortfolio/blob/main/.claude/settings.local.json" target="_blank" rel="noopener">Inspect project agent config ↗</a></article>
    <article class="leadership-card reveal"><div class="leadership-card-top"><span>04 / VERIFY + REPAIR</span><span class="evidence-pill verified">VERIFIED</span></div><h3>Rendered pixels are evidence</h3><p>Playwright/Chromium, axe-core and Lighthouse diagnostics check routes, viewports, accessibility and visual integrity. Failures loop back to the stage that owns the problem.</p><a href="https://github.com/Haign12/DoAnhNghia_BAPortfolio/blob/main/.github/workflows/portfolio-cloud-qa-v5.yml" target="_blank" rel="noopener">Inspect cloud QA ↗</a></article>
  </div>
  <div class="leadership-footer"><p><strong>Human-owned:</strong> problem definition · direct user evidence · business priority · consequential trade-offs · final design rationale · release judgment.</p><a class="button black" href="case-study-uiux-factory.html">See the full workflow ↗</a></div>
</section>
<section class="section writing-section" id="writing" aria-labelledby="writing-title">
  <div class="writing-layout"><div class="writing-intro reveal"><p class="eyebrow">Process note</p><h2 class="section-title" id="writing-title">From AI tools to design governance.</h2><p class="section-lead">The useful question is not which model generated a screen. It is whether the workflow preserves authority, evidence, review criteria and a repair loop.</p></div><article class="writing-card reveal"><div class="writing-meta"><span>DESIGN OPERATIONS</span><span>8 MIN READ</span><span>2026</span></div><h3>From AI tools to design governance</h3><p>Why faster generation increases the need for explicit authority, evidence states, design contracts, browser QA and human learning loops — and what UIUX Factory taught me about operating leverage.</p><div class="writing-actions"><a class="button white" href="writing-design-ops-ai.html">Read article ↗</a><a href="case-study-uiux-factory.html">Related case ↗</a></div></article></div>
</section>'''
html = regex_once(
    html,
    r'<section class="section flagship-section" id="flagships".*?</section>(?=\n<section class="section work" id="work">)',
    flagships_ai_writing,
    "flagship + AI + writing source truth",
)

html = replace_once(html, '<h2 class="section-title">Range across domains.</h2>', '<h2 class="section-title">Breadth without diluting the narrative.</h2>', "supporting work title")
html = replace_once(html, '<p class="work-count">13 projects · 7 domains · supporting breadth</p>', '<p class="work-count">14 projects · 7 domains · supporting breadth</p>', "supporting work count")
html = replace_once(html, '<button class="filter active" data-filter="all" aria-pressed="true">All <b>13</b></button>', '<button class="filter active" data-filter="all" aria-pressed="true">All <b>14</b></button>', "all filter count")

culture_group = '''    <!-- Group 1: Cultural & Experimental -->
    <section class="project-group reveal" data-group="culture" id="group-culture">
      <header class="group-header"><div class="group-header-left"><span class="group-index">01 / CULTURAL &amp; EXPERIMENTAL</span><h3 class="group-name">Cultural &amp; Experimental</h3></div><p class="group-desc">Immersive digital experiences that use editorial storytelling, spatial discovery and interaction craft to turn art and place into exploratory journeys.</p><span class="group-count-badge">02 Projects</span></header>
      <div class="project-grid">
        <article class="project-featured reveal" data-cat="culture">
          <a class="project-media" href="https://ngh1aa.github.io/Lumen/" target="_blank" rel="noopener" aria-label="Open LUMEN digital museum"><span class="project-no">01</span><img src="thumbnail/lumen-v2.webp" alt="LUMEN digital museum experience thumbnail" loading="lazy"></a>
          <div class="project-copy"><div><div class="project-top"><div><span class="status" style="margin-bottom:8px"><i></i> Experimental cultural experience</span><h3>LUMEN</h3></div><span class="project-type">Digital museum</span></div><p class="project-summary">An experimental digital museum that reimagines art discovery through mood, color, era, movement and relationships between artworks instead of relying only on search and category grids.</p><div class="project-highlights"><div class="highlight-item"><span>Experience model</span><p>Drift, Grid, Color and Mood discovery modes lead into artwork detail, saved collections and a relationship atlas.</p></div><div class="highlight-item"><span>Design direction</span><p>Cinematic, intellectual and experimental — combining editorial storytelling, purposeful motion and responsive cultural exploration.</p></div></div></div><div class="project-links" style="margin-top:24px"><a href="https://ngh1aa.github.io/Lumen/" class="link-primary" target="_blank" rel="noopener">Live ↗</a><a href="https://github.com/Ngh1aa/Lumen" target="_blank" rel="noopener">Source ↗</a></div></div>
        </article>
        <article class="project-featured reveal" data-cat="culture" data-project="hue-between-river-citadel">
          <a class="project-media" href="https://ngh1aa.github.io/Mostar-Guide/" target="_blank" rel="noopener" aria-label="Open HUẾ — Between River & Citadel cinematic cultural experience"><span class="project-no">02</span><img src="https://ngh1aa.github.io/Mostar-Guide/assets/hue/scenes/02-citadel-backdrop.webp" alt="Huế cinematic cultural experience featuring Ngọ Môn and the Imperial City" loading="lazy" decoding="async"></a>
          <div class="project-copy"><div><div class="project-top"><div><span class="status" style="margin-bottom:8px"><i></i> Independent cultural experience</span><h3>HUẾ — Between River & Citadel</h3></div><span class="project-type">Cultural experience</span></div><p class="project-summary">A cinematic study of Huế following the Perfume River through imperial thresholds, living streets and royal landscapes.</p><div class="project-highlights"><div class="highlight-item"><span>Transformation</span><p>Re-authored a borrowed interaction pattern into a Huế-specific visual and narrative system.</p></div><div class="highlight-item"><span>Design direction</span><p>Poetic, imperial and atmospheric — with Vietnamese editorial typography and deliberate scroll choreography.</p></div></div></div><div class="project-links" style="margin-top:24px"><a href="https://ngh1aa.github.io/Mostar-Guide/" class="link-primary" target="_blank" rel="noopener">Live ↗</a><a href="https://github.com/Ngh1aa/Mostar-Guide" target="_blank" rel="noopener">Source ↗</a></div></div>
        </article>
      </div>
    </section>

'''
html = regex_once(
    html,
    r'    <!-- Group 1: Cultural & Experimental -->.*?(?=    <!-- Group 2: E-Commerce & Retail -->)',
    culture_group,
    "static culture group",
)


def set_case_link(source: str, heading: str, path: str) -> str:
    pattern = rf'(<h3>{re.escape(heading)}</h3>.*?<div class="project-links"[^>]*>\s*)<a href="#">Case ↗</a>'
    replacement = rf'\1<a href="{path}">Case ↗</a>'
    return regex_once(source, pattern, replacement, f"{heading} raw case link")


html = set_case_link(html, "Flux", "case-study-flux.html")
html = set_case_link(html, "ACCESS", "case-study-access.html")
html = set_case_link(html, "UIUX Factory", "case-study-uiux-factory.html")

html = replace_once(html, '<div class="metrics reveal"><div class="metric"><strong>13</strong><span>Selected projects</span></div>', '<div class="metrics reveal"><div class="metric"><strong>14</strong><span>Selected projects</span></div>', "selected-project metric")

# Re-number the 14 supporting cards in raw source after Huế is inserted.
match = re.search(r'(<div class="project-groups">)(.*?)(?=\n  <div class="metrics)', html, flags=re.S)
if not match:
    raise SystemExit("project groups block not found")
project_body = match.group(2)
number = 0

def renumber(m: re.Match[str]) -> str:
    global number
    number += 1
    return f'{m.group(1)}{number:02d}{m.group(2)}'

project_body = re.sub(r'(<span class="project-no">)\d+(</span>)', renumber, project_body)
if number != 14:
    raise SystemExit(f"expected 14 supporting project numbers, found {number}")
html = html[: match.start(2)] + project_body + html[match.end(2) :]

html = replace_once(html, '      <h2 class="section-title">Delivery, not vanity metrics.</h2>', '      <h2 class="section-title">Delivery. Collaboration. Evidence.</h2>', "experience title")
html = replace_once(html, '<p class="experience-evidence-note"><strong>Portfolio principle:</strong> measured business impact belongs here only when the source and context are available. Otherwise I show the work, decisions and delivery responsibility directly.</p>', '<p class="experience-evidence-note"><strong>Evidence rule:</strong> product or business impact is published only when its source and context are retained. Otherwise the portfolio shows role, scope, decisions, collaboration and delivery responsibility directly.</p>', "experience evidence")
html = replace_once(html, '<p class="section-lead" style="margin-top:0">Roles, responsibilities and collaboration scope — kept evidence-safe instead of inflating outcomes that cannot be independently verified.</p>', '<p class="section-lead" style="margin-top:0">Historical job titles remain truthful. Product thinking is shown through framing, flows, systems, states, collaboration and implementation responsibility — not by retroactively renaming UI/UX roles.</p>', "experience lead")
html = replace_once(html, '<div class="reveal"><p class="eyebrow">UIUX Factory</p><h2 class="section-title">Design as a system.</h2><p class="section-lead">The repository behind how I work. It treats UI/UX as a sequence of inspectable decisions: <strong>project truth → research → UX/IA → art direction → design contract → implementation → browser QA → visual critique → repair.</strong></p>', '<div class="reveal"><p class="eyebrow">AI-assisted design operations</p><h2 class="section-title">Make good practice repeatable.</h2><p class="section-lead">UIUX Factory is the operating layer behind how I work with AI: <strong>project truth → evidence → design contract → implementation → browser evidence → root-cause repair.</strong> The system is real; adoption and efficiency outcomes remain future evidence.</p>', "factory copy")
html = replace_once(html, 'If you are looking for a designer who can move from an ambiguous product problem to structured UX, strong interface systems and a working prototype — while staying honest about evidence and constraints — I’d love to talk.', 'I am looking for Product Design work where complex decisions, systems thinking, strong UI craft and AI-assisted execution can meet real user evidence and measurable product learning.', "contact copy")
html = replace_once(html, '<footer class="footer"><span>© 2026 DO ANH NGHIA</span><span>WHITE / BLACK GETLAYERS CONCEPT · REAL PROJECTS ONLY</span></footer>', '<footer class="footer"><span>© 2026 DO ANH NGHIA</span><span>PRODUCT DECISIONS · AI-ASSISTED EXECUTION · EVIDENCE FIRST</span></footer>', "footer positioning")

for old in ["Do_Anh_Nghia_UIUXDesigner_CV.pdf", "Do_Anh_Nghia_CV.pdf", "cv.pdf", "cv/main.pdf"]:
    html = html.replace(f'href="{old}"', 'href="Do_Anh_Nghia_Product_Designer_CV.pdf"')

html, removed_script = re.subn(r'\n<script src="portfolio-product-upgrade\.js[^\"]*" defer></script>', '', html, count=1)
if removed_script != 1:
    raise SystemExit(f"runtime product-upgrade script: expected 1 include, found {removed_script}")

# Raw source gates: recruiter-critical information must not depend on mutation JS.
required_static = [
    'id="ai-workflow"',
    'id="writing"',
    '<h3>UIUX Factory</h3>',
    'case-study-flux.html',
    'case-study-access.html',
    'data-project="hue-between-river-citadel"',
    'HTML/CSS/JS prototypes',
    'Current evidence boundary:',
    'Do_Anh_Nghia_Product_Designer_CV.pdf',
]
for token in required_static:
    if token not in html:
        raise SystemExit(f"missing static source-truth token: {token}")
if 'portfolio-product-upgrade.js' in html:
    raise SystemExit("homepage still depends on portfolio-product-upgrade.js")
if re.search(r'<div class="project-links"[^>]*>.*?<a href="#">Case ↗</a>', html, flags=re.S):
    raise SystemExit("raw project Case placeholder remains")

INDEX.write_text(html, encoding="utf-8")

qa = QA.read_text(encoding="utf-8")
source_truth_test = '''  test('raw homepage is the recruiter source of truth before runtime JavaScript', async () => {
    const source = await fs.readFile('index.html', 'utf8');
    expect(source).not.toContain('portfolio-product-upgrade.js');
    expect(source).not.toContain('<a href="#">Case ↗</a>');
    expect(source).toContain('id="ai-workflow"');
    expect(source).toContain('id="writing"');
    expect(source).toContain('case-study-flux.html');
    expect(source).toContain('case-study-access.html');
    expect(source).toContain('data-project="hue-between-river-citadel"');
    expect(source).toContain('Current evidence boundary:');
    expect(source).toContain('HTML/CSS/JS prototypes');
    expect(source).toContain('Do_Anh_Nghia_Product_Designer_CV.pdf');
  });

'''
qa = replace_once(
    qa,
    "  test('supporting case links are real routes instead of placeholders', async ({ page }) => {",
    source_truth_test + "  test('supporting case links are real routes instead of placeholders', async ({ page }) => {",
    "raw source QA test",
)
qa = replace_once(qa, "    await expect(page.getByRole('heading', { name: 'Range across domains.' })).toBeVisible();", "    await expect(page.getByRole('heading', { name: 'Breadth without diluting the narrative.' })).toBeVisible();\n    await expect(page.getByRole('heading', { name: 'AI is a multiplier, not the product owner.' })).toBeVisible();\n    await expect(page.locator('#writing-title')).toHaveText('From AI tools to design governance.');\n    await expect(page.locator('#work a[href=\"case-study-flux.html\"]')).toHaveCount(1);\n    await expect(page.locator('#work a[href=\"case-study-access.html\"]')).toHaveCount(1);", "no-JS recruiter assertions")
QA.write_text(qa, encoding="utf-8")

readme = README.read_text(encoding="utf-8")
source_truth_note = '''\n## Homepage source-of-truth\n\nRecruiter-critical homepage content is authored directly in `index.html`: role positioning, flagship order, case links, AI workflow, writing entrypoint, research/evidence boundaries, CV route and supporting-project counts. JavaScript is reserved for behavior such as reveal, filtering, menu state and motion; it must not be required to repair broken links or create the core recruiter narrative.\n\nThe cloud QA gate reads raw `index.html` in addition to rendered browser checks so a runtime mutation cannot hide source debt.\n'''
if "## Homepage source-of-truth" not in readme:
    readme = readme.rstrip() + "\n" + source_truth_note
README.write_text(readme, encoding="utf-8")

if UPGRADE_JS.exists():
    UPGRADE_JS.unlink()

print("A21 portfolio source-truth migration applied")
print("- recruiter-critical content is static in index.html")
print("- Flux/ACCESS/UIUX Factory Case placeholders resolved in raw source")
print("- Huế supporting card and 14-project counts are static")
print("- runtime portfolio-product-upgrade.js removed")
print("- QA now validates raw source plus rendered behavior")
