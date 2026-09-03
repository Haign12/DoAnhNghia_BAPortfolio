# Website Audit — Do Anh Nghia Portfolio

## Evidence boundary

- Repository/source inspection: **FACT**.
- Current rendered visual behavior: **UNKNOWN** where it cannot be observed directly in the available environment. Visual findings based on CSS/HTML are labeled `EVIDENCE_BACKED_INFERENCE`.
- No analytics or direct user research supplied.

## 1. Site / template inventory

| Page/template | Purpose | Primary user | Primary CTA | Current content value | Decision |
|---|---|---|---|---|---|
| Homepage `index.html` | Positioning + work + experience + contact | Recruiter / design lead / client | Explore work / email / CV | High | IMPROVE |
| Personal case study — LuxRoom | Explain premium furniture concept | Design lead / client | Live site / back to work | High | IMPROVE |
| Personal case study — Atelier | Explain fashion experience | Design lead / client | Live site / back to work | High | IMPROVE |
| Personal case study — StudioOS | Explain SaaS workspace | Design lead / client | Live site / back to work | High | IMPROVE |
| Redesign case study — VAS | Explain education redesign | Design lead / client | Live site / back to work | High | IMPROVE |
| FlowCRM case study `case-study-ux.html` | Product/workflow UX proof | Design lead | Back/contact | Medium; currently not surfaced in selected work | KEEP + REPOSITION |
| Capital Place live-project card | Property redesign proof | Client/design lead | Live site | Medium; no local case narrative | KEEP |
| CV PDF | Verification / screening | Recruiter | View resume | High | KEEP |

## 2. Owner goal ↔ user goal

| Owner wants to prove | User wants to know/do | Intersection | Website responsibility | Proof needed | CTA timing |
|---|---|---|---|---|---|
| Strong UI/UX craft | “Is this designer relevant to my role/project?” | Positioning + immediately relevant work | Put role and flagship work above biography | Project type, role, live/case-study evidence | Early |
| Systems thinking | “Can he explain decisions?” | Decision narrative | Surface context → constraint → decision → limitation | Specific case-study decisions | Before contact |
| Practical delivery | “Can he work beyond pretty screens?” | Implementation/experience evidence | Show shipped/live links and factual role/scope | Live project + experience timeline | Mid journey |
| Availability | “Can I contact him quickly?” | Contact action | Keep email/CV easy to find | Direct email/CV | Header + closing |

## 3. Journey / entry findings

### Finding A — proof appears after an About block
- Label: **FACT** from homepage DOM order.
- Evidence: hero → marquee → About → Work.
- Impact: a time-poor visitor must pass self-description before selected work.
- Root cause: homepage narrative is identity-first rather than proof-first.
- Redesign implication: move flagship work directly after the hero/positioning strip; compress About into a later profile/experience section.
- Priority: P1.

### Finding B — homepage positioning is clear but generic to many product designers
- Label: **EVIDENCE_BACKED_INFERENCE**.
- Evidence: “Designing clear products. Grounded in systems thinking.” plus generic capability labels.
- Impact: explains discipline but not distinctive value or strongest proof.
- Root cause: value proposition is abstract; no project evidence attached to the promise above fold.
- Redesign implication: pair a sharper Vietnamese positioning line with proof metadata and selected-work cue.
- Priority: P1.

### Finding C — conversion path is real but narrow
- Label: **FACT**.
- Evidence: `mailto:`, CV link, LinkedIn/external links; no form/API.
- Impact: simple and trustworthy, but contact success cannot be measured on-site.
- Root cause: static portfolio architecture.
- Redesign implication: keep `mailto:` as primary conversion; do not simulate form success. Add clear copy-email/contact affordance only if implemented truthfully.
- Priority: P2.

## 4. Page-family audit

| Page family | User question | Existing composition | What works | Template smell | Redesign implication |
|---|---|---|---|---|---|
| Homepage / overview | Who is Nghĩa and what work should I inspect? | Split hero with portrait + grid/orbits, then About, Work, Experience | Strong semantic sections; direct work/contact anchors | Decorative hero devices compete with proof; work starts too late | Editorial hero + immediate flagship work |
| Personal project case studies | What was the problem, role and decision quality? | Shared kicker → large title → actions → 3 metrics → grayscale hero image → repeated sections/cards | Consistent scan model and limitation honesty | **P1 template monotony** across materially different projects | 2–3 case-study top families based on project type/content |
| Redesign case study | What changed and why? | Mostly same shared shell with some project-specific visual | Project identity can appear in bespoke visual | Shared top still risks universal template | Use before/after/problem framing as first anchor when evidence exists; otherwise project-system anchor |
| Utility / resume | Can I verify background? | Direct PDF | Low friction | None | Preserve |

## 5. Visual / brand audit

### Finding D — current system is already minimalist, so a redesign cannot be palette-only
- Label: **FACT** for tokens/components; rendered effect **EVIDENCE_BACKED_INFERENCE**.
- Evidence: monochrome palette, DM Sans/Mono + Instrument Serif, large type, whitespace, grayscale media.
- Impact: merely changing black/white to beige/gold would not satisfy substantial redesign recognizability.
- Root cause: requested direction overlaps current visual language at surface level.
- Redesign implication: visible delta must come from composition, content priority, project-media scale, typography roles and page-specific storytelling.
- Priority: P0 design gate.

### Finding E — pill language is over-represented
- Label: **FACT** in CSS.
- Evidence: nav, resume button, theme button, CTA buttons, availability badge and case-study nav/actions use `border-radius: 999px`.
- Impact: creates a contemporary SaaS/UI-kit character rather than quiet luxury/editorial restraint.
- Root cause: one shape language reused for most interactive surfaces.
- Redesign implication: reserve pill/oval only for one signature status/action use; default to text links, hairline rules and restrained rectangular controls.
- Priority: P1.

### Finding F — repeated grid/noise/orbit devices dilute project media
- Label: **FACT** in source; visual dominance is **EVIDENCE_BACKED_INFERENCE**.
- Evidence: fixed grid background, hero visual grid, two orbit rings, grain, marquee.
- Impact: several effects compete for signature status.
- Root cause: multiple decorative motifs instead of one ownable device.
- Redesign implication: replace with one controlled signature: editorial index/rule system + warm material field + oversized project media.
- Priority: P1.

### Finding G — case-study project identity is suppressed by global grayscale treatment
- Label: **FACT**.
- Evidence: shared CSS applies `filter: grayscale(100%)` to hero and case visuals, with a VAS-specific exception.
- Impact: makes diverse projects look more alike and can hide project-specific brand craft.
- Root cause: global portfolio aesthetic overrides case-study art direction.
- Redesign implication: use project-native color/media selectively inside neutral portfolio chrome.
- Priority: P1.

## 6. Technical / design debt

| Finding | Label | Impact | Root owner | Decision |
|---|---|---|---|---|
| Static HTML/CSS/JS with no build system | FACT | Simple deployment, but no automated build/type checks | Repository architecture | KEEP; use lightweight verification |
| Shared `case-study.css` plus project-specific/inline styling | FACT | Higher risk of cascade drift and one-off patches | Case-study presentation layer | IMPROVE at shared root before page-local overrides |
| Legacy local skill collection under `.agents/skills` differs from locked V5 source | FACT | Could create process drift if treated as latest library | Agent tooling | Do not silently overwrite; use locked external SHA for this project and record decision |
| Theme/menu/scroll/reveal logic lives in one small vanilla script | FACT | Maintainable and low dependency | `script.js` | KEEP/EXTEND conservatively |
| No in-site form/backend | FACT | No false success-state risk if kept as mailto | Content/interaction | KEEP system truth |

## 7. Preserve list

- All verified experience and project facts.
- Project and case-study URLs.
- Direct email/CV/live-project pathways.
- `CreativeWork`/Person structured data where valid.
- Existing explicit “unverified/not measured” language in concept case studies.
- Reduced-motion handling and keyboard-focus semantics.
- Existing project imagery, but remove blanket grayscale where it damages project identity.

## 8. SEO / URL risks

- Preserve current canonical route names unless a redirect strategy is introduced.
- Do not delete `case-study-ux.html`; it may have direct-link value even if currently orphaned.
- When translating visible content to Vietnamese, update title/meta/OG copy intentionally without changing canonical URLs.
- Keep image alt text meaningful; update language consistently.
- No claim is made about existing organic traffic because Search Console/analytics were not supplied.

## 9. Priority matrix

| Finding | User impact | Business impact | Effort | Risk | Priority | Decision |
|---|---:|---:|---:|---:|---:|---|
| Proof begins too late | High | High | Medium | Low | P1 | Reorder homepage |
| Generic positioning | High | High | Low | Low | P1 | Rewrite/compress |
| Surface-only redesign risk | High | High | High | Medium | P0 gate | Require composition delta |
| Case-study template monotony | High | High | Medium | Medium | P1 | Create multiple top families |
| Pill overuse | Medium | Medium | Low | Low | P1 | Reduce shape reuse |
| Blanket grayscale | Medium | Medium | Low | Low | P1 | Restore project-native color selectively |
| Inline/cascade debt | Medium | Medium | Medium | Medium | P2 | Fix shared owner first |

## 10. Visible Redesign Delta

| Current visible problem | Why it matters | New design behavior | Expected visible delta | Verification |
|---|---|---|---|---|
| Split portrait hero with multiple decorative devices | Proof competes with decoration | Editorial positioning hero with one portrait/media treatment and immediate project index | Before/after silhouette materially different at same viewport | OLD/NEW screenshots at 1440 when render tooling available |
| About before Work | Proof delayed | Flagship work appears immediately after hero | First two viewport sequence changes from self-description to evidence | DOM + rendered scroll sequence |
| Many pills/orbits/grid/marquee | Too many generic modern-web cues | Hairline editorial rules, restrained status oval, one signature index system | Controls and section rhythm feel quieter and more bespoke | Cross-page montage |
| Uniform grayscale project treatment | Project identity flattened | Neutral portfolio chrome + selective native project color | Each project becomes recognizable without changing portfolio brand | Project cards/case tops inspected |
| Shared case-study hero template | Page roles feel interchangeable | At least 3 top composition families across homepage/case-study set | Top screenshots cannot be swapped by changing title/image only | Cross-page screenshot set |

## 11. Redesign scope handoff

Proceed to a luxury-minimal editorial direction that is **proof-first, warm-neutral, typographically controlled and project-media-led**. Preserve factual content and real links, but substantially change composition and page rhythm.

The redesign must not be described as complete until actual rendered desktop views can be compared and inspected.
