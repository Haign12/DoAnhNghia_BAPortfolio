from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
STYLES = ROOT / "styles.css"


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{label}: expected exactly one match, found {count}")
    return text.replace(old, new, 1)


def regex_once(text: str, pattern: str, repl: str, label: str, flags=0) -> str:
    updated, count = re.subn(pattern, repl, text, count=1, flags=flags)
    if count != 1:
        raise RuntimeError(f"{label}: expected exactly one regex match, found {count}")
    return updated


html = INDEX.read_text(encoding="utf-8")

html = replace_once(
    html,
    '  <link rel="stylesheet" href="styles.css?v=20260904-art-directed-v1">',
    '  <link rel="stylesheet" href="styles.css?v=20260904-ui-remediation-v2">',
    "stylesheet cache version",
)

html = replace_once(
    html,
    '''    </section>\n\n    <section class="work section-pad" id="work" aria-labelledby="work-title">''',
    '''    </section>\n\n    <div class="motion-rail reveal" aria-hidden="true">\n      <div class="motion-rail-track">\n        <span>ORIGINAL CONCEPTS · WEBSITE REDESIGNS · PRODUCT UX · SYSTEMS THINKING ·&nbsp;</span>\n        <span>ORIGINAL CONCEPTS · WEBSITE REDESIGNS · PRODUCT UX · SYSTEMS THINKING ·&nbsp;</span>\n      </div>\n    </div>\n\n    <section class="work section-pad" id="work" aria-labelledby="work-title">''',
    "motion rail insertion",
)

html = replace_once(
    html,
    '''        <div class="work-heading">\n          <h2 id="work-title">Move through the index.<br><em>Find the work that pulls you in.</em></h2>\n          <div class="work-guide">\n            <p>Each project exposes a different part of my practice — hierarchy, systems, product structure or redesign thinking.</p>\n            <span>Hover or focus to preview · Click to open</span>\n          </div>\n        </div>''',
    '''        <div class="work-heading">\n          <h2 id="work-title"><span>Two ways I build.</span><em>Original concepts &amp; website redesigns.</em></h2>\n          <div class="work-guide">\n            <p>Original concepts show how I frame products from a blank page. Website redesigns show how I diagnose an existing experience and reshape its structure.</p>\n            <span>Hover or focus to preview · Click to open</span>\n          </div>\n        </div>''',
    "work heading hierarchy",
)

html = replace_once(
    html,
    '<span id="projectPreviewIndex">01 / 05</span>',
    '<span id="projectPreviewIndex">01 / 04</span>',
    "initial preview index",
)

project_list_pattern = r'''        <div class="project-index-list reveal reveal-delay" aria-label="Selected projects">.*?        </div>\n      </div>\n    </section>'''
project_list_new = '''        <div class="project-index-list reveal reveal-delay" aria-label="Selected projects">\n          <section class="project-group" aria-labelledby="original-work-title">\n            <div class="project-group-head">\n              <span id="original-work-title">A / ORIGINAL CONCEPTS</span><span>04 PROJECTS</span>\n            </div>\n\n            <a class="project-row is-active" href="case-study-luxroom.html"\n               data-project="LuxRoom" data-index="01 / 04" data-type="Furniture · Responsive Web"\n               data-preview="assets/images/luxroom.webp" data-kind="image">\n              <span class="project-row-number">01</span>\n              <span class="project-row-main"><strong>LuxRoom</strong><small>Self-initiated · Visual hierarchy</small></span>\n              <span class="project-row-year">2026</span><span class="project-row-arrow" aria-hidden="true">↗</span>\n            </a>\n\n            <a class="project-row project-row--editorial" href="case-study-atelier.html"\n               data-project="Atelier" data-index="02 / 04" data-type="Fashion · Mobile-first Commerce"\n               data-preview="assets/images/altelier.webp" data-kind="image">\n              <span class="project-row-number">02</span>\n              <span class="project-row-main"><strong>Atelier</strong><small>Self-initiated · Editorial commerce</small></span>\n              <span class="project-row-year">2026</span><span class="project-row-arrow" aria-hidden="true">↗</span>\n            </a>\n\n            <a class="project-row" href="case-study-studioos.html"\n               data-project="StudioOS" data-index="03 / 04" data-type="SaaS Workspace · Product UX"\n               data-preview="assets/images/studioos.webp" data-kind="image">\n              <span class="project-row-number">03</span>\n              <span class="project-row-main"><strong>StudioOS</strong><small>Self-initiated · Product systems</small></span>\n              <span class="project-row-year">2026</span><span class="project-row-arrow" aria-hidden="true">↗</span>\n            </a>\n\n            <a class="project-row project-row--editorial" href="case-study-ux.html"\n               data-project="FlowCRM" data-index="04 / 04" data-type="B2B CRM · Product System"\n               data-preview="assets/images/FLOW.png" data-kind="contain">\n              <span class="project-row-number">04</span>\n              <span class="project-row-main"><strong>FlowCRM</strong><small>Self-initiated · Workflow model</small></span>\n              <span class="project-row-year">2026</span><span class="project-row-arrow" aria-hidden="true">↗</span>\n            </a>\n          </section>\n\n          <section class="project-group" aria-labelledby="redesign-work-title">\n            <div class="project-group-head">\n              <span id="redesign-work-title">B / WEBSITE REDESIGNS</span><span>02 PROJECTS</span>\n            </div>\n\n            <a class="project-row" href="case-study-vas-education.html"\n               data-project="VAS Education" data-index="01 / 02" data-type="Education · IA / Redesign"\n               data-kind="vas">\n              <span class="project-row-number">01</span>\n              <span class="project-row-main"><strong>VAS Education</strong><small>Website redesign · Information architecture</small></span>\n              <span class="project-row-year">2026</span><span class="project-row-arrow" aria-hidden="true">↗</span>\n            </a>\n\n            <a class="project-row project-row--editorial" href="https://ngh1aa.github.io/Capital/" target="_blank" rel="noopener noreferrer"\n               data-project="Capital Place" data-index="02 / 02" data-type="Commercial Real Estate · Website Redesign"\n               data-preview="assets/images/capital-place.jpg" data-kind="image">\n              <span class="project-row-number">02</span>\n              <span class="project-row-main"><strong>Capital Place</strong><small>Website redesign · Content &amp; visual hierarchy</small></span>\n              <span class="project-row-year">2026</span><span class="project-row-arrow" aria-hidden="true">↗</span>\n            </a>\n          </section>\n\n          <div class="project-index-footer">\n            <span>LIVE / SUPPORTING</span>\n            <a href="https://ngh1aa.github.io/RedesignVAS/" target="_blank" rel="noopener noreferrer">VAS live concept ↗</a>\n          </div>\n        </div>\n      </div>\n    </section>'''
html = regex_once(html, project_list_pattern, project_list_new, "project grouping", flags=re.S)

html = replace_once(
    html,
    '<h2 id="contact-title">Have a product that needs<br><em>more clarity, rhythm or point of view?</em></h2>',
    '<h2 id="contact-title"><span class="contact-sans">Have a product that needs</span><em>more clarity, rhythm or point of view?</em></h2>',
    "contact heading structure",
)

html = replace_once(
    html,
    '  <script src="script.js?v=20260904-art-directed-v1" defer></script>',
    '  <script src="script.js?v=20260904-ui-remediation-v2" defer></script>',
    "script cache version",
)

INDEX.write_text(html, encoding="utf-8")

css = STYLES.read_text(encoding="utf-8")

css = replace_once(
    css,
    '''  --motion-long: 760ms;\n  color-scheme: light;''',
    '''  --motion-long: 760ms;\n  --motion-rail: 18s;\n  color-scheme: light;''',
    "motion token",
)

css = replace_once(
    css,
    '''.hero-copy h1 {\n  max-width: 860px;\n  margin: 0 0 30px;\n  font-size: clamp(4.8rem, 6.55vw, 7.85rem);\n  font-weight: 600;\n  line-height: .79;\n  letter-spacing: -.075em;\n}\n.hero-copy h1 .hero-sans { display: block; }\n.hero-copy h1 em {\n  display: block;\n  max-width: 820px;\n  margin-top: .06em;\n  color: var(--muted);\n  font-size: .84em;\n  line-height: .84;\n  letter-spacing: -.05em;\n}''',
    '''.hero-copy h1 {\n  max-width: 820px;\n  margin: 0 0 28px;\n  font-size: clamp(3.9rem, 5.7vw, 6.8rem);\n  font-weight: 600;\n  line-height: .84;\n  letter-spacing: -.07em;\n}\n.hero-copy h1 .hero-sans { display: block; }\n.hero-copy h1 em {\n  display: block;\n  max-width: 760px;\n  margin-top: .08em;\n  color: var(--muted);\n  font-size: .78em;\n  line-height: .9;\n  letter-spacing: -.045em;\n}''',
    "hero type scale",
)

css = replace_once(
    css,
    '''.hero-art {\n  position: relative;\n  grid-column: 8 / 13;\n  align-self: center;\n  justify-self: stretch;\n  min-height: 610px;\n  margin: 0;\n  isolation: isolate;\n}''',
    '''.hero-art {\n  position: relative;\n  grid-column: 8 / 13;\n  align-self: center;\n  justify-self: stretch;\n  min-height: 0;\n  height: clamp(500px, calc(100svh - 230px), 610px);\n  margin: 0;\n  isolation: isolate;\n}''',
    "hero art sizing",
)

css = replace_once(
    css,
    '''.hero-photo-wrap {\n  position: absolute;\n  width: min(72%, 390px);\n  aspect-ratio: 5 / 7;\n  right: 13%;\n  top: 50%;\n  transform: translateY(-49%);\n  overflow: hidden;\n  background: var(--paper);\n  border: 1px solid var(--line-strong);\n  box-shadow: 0 22px 60px rgba(17,17,17,.08);\n  transition: transform var(--motion-long) var(--ease);\n  will-change: transform;\n}''',
    '''.hero-photo-wrap {\n  position: absolute;\n  width: min(68%, 370px);\n  aspect-ratio: 1000 / 1433;\n  right: 15%;\n  top: 50%;\n  transform: translateY(-50%);\n  overflow: hidden;\n  background: var(--paper);\n  border: 1px solid var(--line-strong);\n  box-shadow: 0 22px 60px rgba(17,17,17,.08);\n  transition: transform var(--motion-long) var(--ease), clip-path var(--motion-long) var(--ease), opacity var(--motion-mid) ease;\n  will-change: transform, clip-path, opacity;\n}''',
    "hero portrait frame",
)

css = replace_once(
    css,
    '''.hero-photo-wrap img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: 50% 20%;\n}''',
    '''.hero-photo-wrap img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: 50% 50%;\n}''',
    "portrait focal position",
)

css = replace_once(
    css,
    '''.hero-note-card {\n  position: absolute;\n  z-index: 5;\n  right: -2%;\n  bottom: 2%;\n  width: min(52%, 285px);\n  padding: 20px 18px 18px;\n  background: color-mix(in srgb, var(--bg) 92%, transparent);\n  border: 1px solid var(--line-strong);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  box-shadow: 0 18px 50px rgba(17,17,17,.07);\n  transition: transform var(--motion-long) var(--ease);\n  will-change: transform;\n}''',
    '''.hero-note-card {\n  position: absolute;\n  z-index: 5;\n  right: 0;\n  bottom: 7%;\n  width: min(43%, 230px);\n  padding: 17px 15px 15px;\n  background: color-mix(in srgb, var(--bg) 94%, transparent);\n  border: 1px solid var(--line-strong);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  box-shadow: 0 18px 50px rgba(17,17,17,.07);\n  transition: transform var(--motion-long) var(--ease);\n  will-change: transform;\n}''',
    "hero note card",
)

css = replace_once(
    css,
    '''.hero-note-card strong {\n  display: block;\n  margin: 12px 0 18px;\n  font-family: var(--serif);\n  font-size: clamp(2.25rem, 3vw, 3.7rem);\n  font-weight: 400;\n  line-height: .82;\n  letter-spacing: -.055em;\n}''',
    '''.hero-note-card strong {\n  display: block;\n  margin: 10px 0 15px;\n  font-family: var(--serif);\n  font-size: clamp(1.9rem, 2.45vw, 3rem);\n  font-weight: 400;\n  line-height: .87;\n  letter-spacing: -.05em;\n}''',
    "hero note type",
)

hero_motion_insert = '''\n/* One-time image/text arrival: hierarchy first, motion second. */\n.js .hero-copy h1 > *,\n.js .contact-copy h2 > * {\n  opacity: 0;\n  transform: translateY(20px);\n  clip-path: inset(0 0 100% 0);\n  transition: opacity var(--motion-mid) var(--ease), transform var(--motion-long) var(--ease), clip-path var(--motion-long) var(--ease);\n}\n.js .hero-copy.is-visible h1 > *,\n.js .contact-copy.is-visible h2 > * {\n  opacity: 1;\n  transform: translateY(0);\n  clip-path: inset(0 0 0 0);\n}\n.js .hero-copy h1 > em,\n.js .contact-copy h2 > em { transition-delay: 90ms; }\n.js .hero-art .hero-photo-wrap { opacity: .72; clip-path: inset(0 0 100% 0); }\n.js .hero-art.is-visible .hero-photo-wrap { opacity: 1; clip-path: inset(0 0 0 0); }\n\n/* Decorative running type starts only when it enters view and runs once. */\n.motion-rail {\n  overflow: hidden;\n  border-block: 1px solid var(--line);\n  background: var(--bg);\n}\n.motion-rail-track {\n  display: flex;\n  width: max-content;\n  transform: translateX(0);\n  will-change: transform;\n}\n.motion-rail.is-visible .motion-rail-track {\n  animation: motionRail var(--motion-rail) linear 1 both;\n}\n.motion-rail-track span {\n  display: block;\n  padding-block: 11px;\n  white-space: nowrap;\n  color: var(--muted);\n  font: 500 9px var(--mono);\n  letter-spacing: .11em;\n  text-transform: uppercase;\n}\n@keyframes motionRail {\n  to { transform: translateX(-50%); }\n}\n'''
css = replace_once(css, '/* Work — signature project explorer */', hero_motion_insert + '\n/* Work — signature project explorer */', "motion styles")

css = replace_once(
    css,
    '''.work-heading h2 {\n  grid-column: 1 / 9;\n  max-width: 980px;\n  margin: 0;\n  font-size: clamp(3.7rem, 5.4vw, 6.8rem);\n  font-weight: 500;\n  line-height: .88;\n  letter-spacing: -.065em;\n}\n.work-heading h2 em { color: #bdb8ad; }''',
    '''.work-heading h2 {\n  grid-column: 1 / 9;\n  max-width: 920px;\n  margin: 0;\n  font-size: clamp(3.15rem, 4.6vw, 5.8rem);\n  font-weight: 500;\n  line-height: .9;\n  letter-spacing: -.06em;\n}\n.work-heading h2 > span,\n.work-heading h2 > em { display: block; }\n.work-heading h2 em { margin-top: .08em; color: #bdb8ad; }''',
    "work type scale",
)

css = replace_once(
    css,
    '''.project-index-list { grid-column: 7 / 13; border-bottom: 1px solid rgba(244,241,232,.2); }\n.project-row {''',
    '''.project-index-list { grid-column: 7 / 13; border-bottom: 1px solid rgba(244,241,232,.2); }\n.project-group + .project-group { margin-top: 38px; }\n.project-group-head {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 0 4px 13px;\n  color: rgba(244,241,232,.45);\n  font: 500 9px var(--mono);\n  letter-spacing: .1em;\n  text-transform: uppercase;\n}\n.project-group-head span:first-child { color: rgba(244,241,232,.88); }\n.project-row {''',
    "project group styles",
)

css = replace_once(css, '  min-height: 128px;\n', '  min-height: 112px;\n', "project row density")
css = replace_once(
    css,
    '.project-row:nth-child(even) .project-row-main strong { font-family: var(--serif); font-style: italic; font-weight: 400; font-size: clamp(2.8rem, 4vw, 5.3rem); }',
    '.project-row--editorial .project-row-main strong { font-family: var(--serif); font-style: italic; font-weight: 400; font-size: clamp(2.55rem, 3.55vw, 4.75rem); }',
    "explicit editorial row variant",
)

css = replace_once(
    css,
    '''.practice-grid h2 {\n  grid-column: 1 / 8;\n  max-width: 920px;\n  margin: 0;\n  font-size: clamp(4rem, 6.2vw, 7.5rem);\n  font-weight: 550;\n  line-height: .82;\n}''',
    '''.practice-grid h2 {\n  grid-column: 1 / 8;\n  max-width: 900px;\n  margin: 0;\n  font-size: clamp(3.4rem, 5vw, 6.15rem);\n  font-weight: 550;\n  line-height: .87;\n}''',
    "practice type scale",
)

css = replace_once(
    css,
    '''.experience-head h2 {\n  grid-column: 1 / 8;\n  margin: 0;\n  font-size: clamp(3.8rem, 5.6vw, 6.8rem);\n  font-weight: 550;\n  line-height: .86;\n}''',
    '''.experience-head h2 {\n  grid-column: 1 / 8;\n  margin: 0;\n  font-size: clamp(3.25rem, 4.65vw, 5.7rem);\n  font-weight: 550;\n  line-height: .89;\n}''',
    "experience type scale",
)

css = replace_once(
    css,
    '''.contact-copy h2 {\n  max-width: 1180px;\n  margin: 0 0 32px;\n  font-size: clamp(4rem, 6.8vw, 8.4rem);\n  font-weight: 550;\n  line-height: .82;\n}\n.contact-copy h2 em { display: block; color: var(--muted); }''',
    '''.contact-copy h2 {\n  max-width: 1000px;\n  margin: 0 0 30px;\n  font-size: clamp(3.15rem, 4.85vw, 6rem);\n  font-weight: 550;\n  line-height: .89;\n  text-wrap: balance;\n}\n.contact-copy h2 > span,\n.contact-copy h2 em { display: block; }\n.contact-copy h2 em {\n  max-width: 960px;\n  margin-top: .08em;\n  color: var(--muted);\n}''',
    "contact type scale",
)

css = replace_once(
    css,
    '.contact-email { font-size: clamp(1.2rem, 1.8vw, 1.8rem); }',
    '.contact-email { max-width: 100%; font-size: clamp(1.05rem, 1.28vw, 1.32rem); overflow-wrap: anywhere; }',
    "contact email scale",
)

css = replace_once(
    css,
    '''  .hero-copy h1 { font-size: clamp(4.45rem, 6.2vw, 6.2rem); }\n  .hero-art { min-height: 560px; }\n  .hero-note-card { right: 0; }\n  .project-row-main strong { font-size: clamp(2.25rem, 3.5vw, 4.1rem); }\n  .project-row:nth-child(even) .project-row-main strong { font-size: clamp(2.55rem, 3.8vw, 4.4rem); }''',
    '''  .hero-copy h1 { font-size: clamp(3.7rem, 5.25vw, 5.65rem); }\n  .hero-art { min-height: 0; height: clamp(480px, calc(100svh - 225px), 555px); }\n  .hero-note-card { right: 0; }\n  .project-row-main strong { font-size: clamp(2.15rem, 3.15vw, 3.75rem); }\n  .project-row--editorial .project-row-main strong { font-size: clamp(2.4rem, 3.35vw, 4rem); }''',
    "1320 pressure rules",
)

css = replace_once(
    css,
    '''  .hero-copy { grid-column: 1 / 8; }\n  .hero-art { grid-column: 8 / 13; min-height: 510px; }\n  .hero-photo-wrap { width: 76%; right: 10%; }\n  .hero-note-card { width: 58%; }''',
    '''  .hero-copy { grid-column: 1 / 8; }\n  .hero-art { grid-column: 8 / 13; min-height: 0; height: clamp(460px, calc(100svh - 220px), 510px); }\n  .hero-photo-wrap { width: min(70%, 345px); right: 12%; }\n  .hero-note-card { width: min(45%, 215px); }''',
    "1080 pressure rules",
)

short_height_rules = '''\n@media (min-width: 901px) and (max-height: 820px) {\n  .hero { min-height: calc(100svh - 76px); padding-block: 24px 44px; gap: 20px 24px; }\n  .hero-copy { padding-block: 10px; }\n  .hero-copy h1 { font-size: clamp(3.45rem, 5vw, 5.6rem); margin-bottom: 22px; }\n  .hero-lead { margin-bottom: 22px; line-height: 1.6; }\n  .hero-art { height: clamp(450px, calc(100svh - 205px), 540px); }\n  .hero-photo-wrap { width: min(64%, 340px); right: 16%; }\n  .hero-note-card { bottom: 7%; width: min(40%, 210px); }\n  .hero-note-card strong { font-size: clamp(1.8rem, 2.2vw, 2.65rem); }\n}\n'''
css = replace_once(css, '@media (max-width: 900px) {', short_height_rules + '\n@media (max-width: 900px) {', "short-height desktop pressure")

css = replace_once(
    css,
    '  .hero-art { min-height: 540px; }',
    '  .hero-art { height: auto; min-height: 540px; }',
    "mobile hero preserve",
)

css = replace_once(
    css,
    '''  .reveal { opacity: 1 !important; transform: none !important; }\n  .hero-photo-wrap, .hero-note-card { transform: none !important; }\n  .project-preview.is-swapping .preview-media img { opacity: 1; clip-path: inset(0); transform: none; }''',
    '''  .reveal { opacity: 1 !important; transform: none !important; }\n  .hero-photo-wrap { transform: translateY(-50%) !important; opacity: 1 !important; clip-path: inset(0) !important; }\n  .hero-note-card { transform: none !important; }\n  .hero-copy h1 > *, .contact-copy h2 > * { opacity: 1 !important; transform: none !important; clip-path: inset(0) !important; }\n  .motion-rail-track { animation: none !important; transform: none !important; }\n  .project-preview.is-swapping .preview-media img { opacity: 1; clip-path: inset(0); transform: none; }''',
    "reduced motion layout safety",
)

STYLES.write_text(css, encoding="utf-8")

print("Home UI remediation applied successfully")
