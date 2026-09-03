# Design Reference Benchmark

## Project decision

- Business goal: convert qualified portfolio visitors into interview/project conversations.
- Audience: recruiters, hiring/design leads, potential clients.
- Brand constraint: no official brand book; current project-owned identity is minimal/monochrome with portrait/project media.
- Required direction: luxury minimalism, but with a **visible composition/journey delta**, not a palette-only refresh.
- Page roles: homepage overview, flagship personal case study, redesign case study, secondary/archive case study, utility/resume/contact.
- Asset reality: real portrait + project thumbnails + some social/project images; no evidence of a new photo/video production budget.

## Search strategy

1. Production personal/product designer portfolios — project hierarchy, work discovery, contact.
2. Hiring-decision portfolio/case-study structures — scan speed, proof and limitation honesty.
3. Editorial/luxury-minimal references — typography, whitespace, image scale and restraint.

## Candidate pool

| Reference | Type | Page/state inspected | Role | Score /100 | Keep/Reject | Reason |
|---|---|---|---|---:|---|---|
| Paolo Baronio — https://paolobaronio.it/ | PRODUCTION | Homepage / latest works | Project-first portfolio rhythm | 87 | KEEP | Neutral chrome lets real work dominate; clear role + work list |
| Dennis Snellenberg — https://dennissnellenberg.com/work | PRODUCTION | Work index | Work taxonomy / motion restraint reference | 78 | KEEP | Strong project index and metadata; interaction ideas useful but heavy motion must be reduced |
| Enrico Deiana — https://www.enricodeiana.design/ | PRODUCTION | Homepage | Expressive typography + portfolio identity | 84 | KEEP | Shows how typography can create signature; surface playfulness is too loud to copy |
| Diana Grafl — https://dianagrafl.de/en/ | PRODUCTION | Homepage | Recruiter/hiring proof structure | 92 | KEEP | Clear role, project evidence, measurable/explicit proof where available |
| Diana Grafl — https://dianagrafl.de/en/projekt_portfolio.html | CASE_STUDY | Portfolio case study | 30-second decision model / limitations | 94 | KEEP | Directly addresses recruiter scan vs UX-depth tension |
| Olivier Ouendeno Portfolio 2025 — Awwwards page | CASE_STUDY | Homepage screenshot/record | Editorial asymmetry / portrait-media composition | 80 | KEEP | Useful craft reference; award/gallery status is not UX proof |
| The Row — https://www.therow.com/ | PRODUCTION | Primary navigation / collection framing | Quiet luxury restraint | 76 | KEEP | Extreme whitespace, restrained chrome and low-noise navigation; cross-industry caveat |
| Cherry Phan portfolio — Behance | CASE_STUDY | Portfolio presentation | Vietnam creative-market visual benchmark | 69 | KEEP SECONDARY | Useful local visual context; platform presentation is not production UX evidence |
| Vizuify UI/UX portfolio concept — Dribbble | CONCEPT | Portfolio concept description | Proof-first concept patterns | 62 | REJECT AS UX PROOF | Useful vocabulary, but concept/platform post cannot validate usability/conversion |
| Louise Night portfolio — Layers | CONCEPT | Homepage concept | Modular intro/work balance | 64 | REJECT AS PRIMARY | Clean composition but generic agency-template traits and unclear production reality |

## Final references by job

### A — Diana Grafl: hiring-decision architecture
- Type: PRODUCTION + CASE_STUDY.
- Principle: fast orientation and process depth can coexist when core facts are immediate and deeper proof is progressive.
- Transfer: hero role/positioning, quantified evidence only where verified, project summaries that state contribution before decoration.
- Do not copy: claim “30 seconds” or any research/metrics for Nghĩa without evidence.
- Adaptation: use a concise Vietnamese role/value line, selected-work proof immediately after hero, and explicit `Đã đo / Chưa đo` limitation language inside case studies.

### B — Paolo Baronio: work-first neutral portfolio chrome
- Type: PRODUCTION.
- Principle: a portfolio can feel premium by making project media and metadata the visual event while the surrounding system stays quiet.
- Transfer: large work fields, sparse labels, simple index metadata, low-noise navigation.
- Do not copy: exact layout, type treatment or Italian-studio identity.
- Adaptation: warm ivory/ink portfolio shell + project-native color within media frames.

### C — Enrico Deiana: typographic signature
- Type: PRODUCTION.
- Principle: type contrast can create identity before color/effects.
- Transfer: tension between disciplined sans text and expressive editorial serif display; controlled scale shifts.
- Do not copy: playful slogans, maximal motion, quirky letter manipulation or award-led self-promotion.
- Adaptation: one restrained italic/editorial phrase per major page, Vietnamese-friendly typography and calmer motion.

### D — The Row: quiet-luxury restraint
- Type: PRODUCTION, cross-industry.
- Principle: premium perception can come from absence of noise, proportion, image scale and precise typography rather than decorative effects.
- Transfer: generous whitespace, thin rules, subdued UI chrome, non-competing controls.
- Do not copy: e-commerce IA, near-empty content, brand-specific fashion austerity.
- Adaptation: preserve enough information for recruiter scanning; use restraint around evidence rather than withholding evidence.

### E — Olivier Ouendeno: asymmetric editorial composition
- Type: CASE_STUDY / curated craft evidence.
- Principle: identity + media can occupy different spatial anchors instead of a standard split hero.
- Transfer: asymmetry, floating but grid-aligned imagery, name/role as separate compositional objects.
- Do not copy: fashion imagery, exact collage, award-site effects.
- Adaptation: use one portrait plus one project-crop as controlled anchors, not orbit/grid decorations.

### F — Dennis Snellenberg: project index + interaction language
- Type: PRODUCTION.
- Principle: work discovery can feel refined with concise metadata and motion that reinforces navigation.
- Transfer: hover/focus project emphasis and editorial index behavior.
- Do not copy: long parallax sequences or transition choreography that delays browsing.
- Adaptation: 160–260ms opacity/transform feedback, no scroll hijacking, reduced-motion fallback.

## Page-role reference matrix

| Page role | User question | Reference(s) | Principle extracted | What NOT to copy | Project adaptation |
|---|---|---|---|---|---|
| Homepage overview | Who is Nghĩa and which work matters? | Diana + Paolo + Enrico | Role clarity + proof-first + type signature | Long self-intro, award theatrics | Editorial role statement → immediate flagship work |
| Flagship personal case study | What problem/decision quality is shown? | Diana + Paolo | Progressive proof, large project media | Same hero shell for every project | Project-native visual anchor + facts/constraints beside it |
| Redesign case study | What changed and why? | Diana + editorial references | Change rationale before decoration | Generic “case study” metrics bar | First anchor = problem/change thesis + before/after/evidence when available |
| Secondary/archive case | Is there additional breadth? | Dennis | Compact index + metadata | Full flagship treatment for every project | Quiet archive rows leading to legacy pages |
| Contact/close | Is he available and how do I reach him? | Paolo + The Row | Minimal close with one direct action | Big SaaS CTA panel | Email-first closing field + CV/LinkedIn secondary links |

## Extracted Design DNA

- **Layout grammar:** 12-column editorial grid; asymmetrical but aligned; strong left/right margins; full-width project media alternating with compact metadata rails.
- **Page-role diversity:** homepage hero, flagship case-study top and redesign case-study top must use different first-anchor compositions.
- **Typography:** high-contrast editorial serif for display accents + neutral grotesk/sans for body/UI + compact mono/small caps for project metadata only.
- **Color/surface:** warm ivory base, near-black text, muted stone secondary, restrained champagne/bronze accent used as datum/highlight—not as large gold gradients.
- **Media:** preserve native project colors; avoid blanket grayscale; crop intentionally by page role.
- **Interaction:** subtle underline/rule movement and media reveal; no showreel-first, no scroll hijack.
- **Conversion/trust:** proof before self-praise; direct email/CV; limitations remain visible.

## Rejected patterns

- Universal split hero on every route.
- Centered heading + three rounded cards as section default.
- Glassmorphism, glossy gold gradients, 3D chrome or “luxury” clichés.
- Long marquee loops and multiple orbit/grid/noise effects competing for attention.
- Full-site grayscale that erases project identity.
- Award/gallery popularity used as evidence of UX quality.

## Handoff

Use this benchmark only as principle input. The implementation must follow the project-specific Design Contract rather than recreating any single reference surface.
