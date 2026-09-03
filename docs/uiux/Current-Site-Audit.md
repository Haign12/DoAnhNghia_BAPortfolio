# Current Site Audit

Baseline: `main@2c7c6ee7cbe82be98c42257854ca28a725e7ba8b`
Scope: desktop-only Phase 1 audit.

## Business and conversion

**EVIDENCE_BACKED_INFERENCE:** The site’s practical job is to convert design proof into qualified UI/UX opportunities. Current explicit actions are Explore Work, individual live/case-study links, Resume and email.

### What works
- Clear role label: UI/UX Designer.
- Direct email and resume paths.
- Multiple project categories show range.
- “Open to new opportunities” makes availability legible.

### Friction
- **P1 — EVIDENCE_BACKED_INFERENCE:** The hero spends substantial visual weight on decorative orbit/grid/portrait treatment before the strongest proof objects (work). For hiring-oriented visitors who scan quickly, work proof should appear sooner in the decision sequence.
- **P1 — FACT + inference:** Project cards describe outputs but the existing research notes identify missing decision narrative. This weakens proof of thinking relative to proof of taste.
- **P2:** “Explore the work” + “Start a conversation” are appropriate, but contact should become higher-confidence after proof rather than compete with proof.

## Audience / entry context / top tasks

Primary working audiences:
1. Recruiter / talent acquisition — decide whether to shortlist and forward.
2. Design/Product hiring lead — judge thinking, craft, role depth and fit.
3. Potential client/collaborator — judge relevance, execution quality and whether to contact.

Deep-entry case-study visits are first-class entry contexts; the site must not assume home-first browsing.

## Journey / IA / navigation

Current global home navigation: About / UI/UX Work / Experience / Contact / Resume + Theme.

### Strengths
- Small IA with direct anchors.
- Case-study routes link back to Work/Contact/Resume.
- Stable, descriptive case-study URLs.

### Issues
- **P1:** Home sequencing is Hero → decorative marquee → About → Work → Experience → Contact. For a portfolio, proof is delayed by an About section and decorative strip.
- **P1:** Sitemap does not include VAS route although it exists.
- **P2:** FlowCRM is a materially different legacy presentation family, creating cross-page drift.
- **P2:** Capital Place has no local narrative route; its proof depth differs from other featured projects.

## Content / SEO intent / trust

### Strengths
- Title/meta/canonical/OG/Twitter metadata present on inspected pages.
- Person/CreativeWork JSON-LD used.
- `robots.txt` and sitemap exist.
- Current content explicitly avoids fabricated metrics in several case-study texts/research notes.

### Issues
- **P1:** Case-study narrative depth is inconsistent; context/role/constraint/decision/outcome/limitation are not consistently visible as a scan path in OLD.
- **P1:** Target language declared by current Project Config is Vietnamese, while OLD primary content is English. This is a project-level content mismatch for the redesign scope.
- **P2:** Sitemap coverage is incomplete for VAS.
- **UNKNOWN:** Organic performance/backlinks/queries; no Search Console/analytics supplied, therefore no route removal or SEO-value claim is justified.

## Brand / visual grammar / distinctiveness

Current source-visible grammar:
- white/black light/dark themes;
- DM Sans + Instrument Serif + DM Mono;
- grid overlays, orbit lines, grain, progress bar;
- many pill-shaped controls/tags;
- large monochrome typography;
- grayscale portrait and grayscale case-study media treatment;
- marquee motion.

### Findings
- **P1 — EVIDENCE_BACKED_INFERENCE:** The signature reads as “tech/editorial minimalism” but not specifically “luxury minimalism”; grid/orbits/marquee/pills create busier UI signaling than the requested quiet, refined direction.
- **P1:** Repeated case-study shells produce template monotony across materially different project stories.
- **P2:** Grayscale treatment suppresses project-specific art direction and makes proof media less informative.
- **P2:** Dark/light theme is useful but should not force two separate aesthetic identities; semantic roles must remain coherent.

## Page-role / composition-family audit

| Family | OLD composition | What works | Template smell | Redesign implication |
|---|---|---|---|---|
| Home / orientation | split hero with portrait + decorative orbit/grid, marquee, about before work | clear positioning and CTA | decorative first impression dominates proof | proof-first editorial family; selected work moves immediately after/within opening sequence |
| Personal case studies | sticky pill nav → title/kicker → actions → 3 metrics → large image → repeated section/cards | coherent and scannable | same shell across distinct projects | artifact-led editorial narrative; project-specific decision objects |
| VAS redesign case study | same shared shell plus custom red visual summary | branded VAS moment exists | outer hierarchy still resembles personal-project shell | change-thesis family: OLD problem → redesign decision → system proof |
| FlowCRM product/system case study | large inline legacy CSS, distinct dark card-based shell | can express product-system content | visual/design-system drift | product/system family centered on workflow/model/state evidence |

## Component / design system / code ownership

### Root owners
- Home layout/tokens/components: `styles.css` + `index.html`.
- Home behavior: `script.js`.
- Shared case-study presentation: `case-study.css`.
- Shared case-study theme/TOC behavior: `case-study.js`.
- FlowCRM legacy visual owner: inline `<style>` in `case-study-ux.html`.

### Debt
- **P1:** FlowCRM page-local CSS competes with shared case-study system.
- **P2:** Repeated pill/card treatment is a composition habit, not a semantic component need.
- **P2:** Some visual treatment is encoded by page-specific selectors/inline style patterns, reducing clean composition ownership.

## Media / focal / crop

- Portrait source exists and is displayed with `object-fit: cover` + grayscale.
- Project previews have known intrinsic dimensions in HTML for several assets.
- Current source applies grayscale to prominent proof media.
- **BLOCKED evidence:** rendered OLD crops at 1280/1440/1920 have not been captured/visually inspected in the available environment. Exact focal/crop quality therefore remains unverified.

## Interaction / states / recovery

FACT from source:
- Theme state persists via localStorage.
- Scroll progress and section reveal exist.
- Escape closes menu; reduced-motion is queried.
- Main conversion is an external `mailto:` handoff, not a form.

Implications:
- Keep theme/focus/reduced-motion only if they support clarity.
- Remove/de-emphasize motion with no orientation/feedback purpose.
- No loading/error/success UI should be invented for email because there is no owned submit request.

## Accessibility baseline

Source positives:
- semantic `main`, sections and headings;
- buttons for interactive theme/menu controls;
- visible focus CSS exists;
- alt text exists for key images;
- reduced-motion branch exists.

Source risks:
- **P1:** `#navMenu` is initialized with `aria-hidden="true"` in HTML even though desktop CSS presents the nav inline; runtime behavior needs desktop rendered/AT verification.
- **P2:** Theme/motion/scroll interactions require keyboard/focus inspection in Chromium.
- Formal WCAG conformance is **not claimed**.

## Desktop/browser scope

- Desktop-only: 1280 / 1440 / 1920 + pressure widths 1366 / 1536 / 1600.
- Chromium only by declared support.
- Mobile/tablet: `N/A_JUSTIFIED`.
- Rendered desktop visual baseline is currently BLOCKED by environment, not waived.

## Performance

Source-visible positives:
- static architecture;
- WebP for several project images;
- explicit image dimensions in many locations;
- lazy-loading below-fold project images;
- preload for portrait.

Risks:
- Google Fonts dependency and multiple families/weights.
- decorative grain, backdrop filters and motion may add paint/compositing cost.
- large PNG `FLOW.png` and some social/asset images should be budgeted by role rather than loaded indiscriminately.
- No field CWV data supplied; no performance score claim.

## Security / privacy

- No auth/payment/form/upload/private-data path found.
- `mailto:` exposes email intentionally as contact information.
- External links should retain safe `rel` where applicable.
- No privacy-sensitive runtime store found beyond local theme preference.
- Analytics/consent is UNKNOWN because no integration is detected.

## System reality summary

- Content: STATIC.
- In-page navigation/theme/reveal: REAL client-side behavior by source, pending rendered interaction verification.
- Email: REAL external handoff to user agent, not owned delivery confirmation.
- Resume/project links: REAL static/external navigation paths by source.
- Backend/API/CMS/auth/payment: not detected.
- Analytics: UNKNOWN.

# KEEP / IMPROVE / REMOVE / ADD

## KEEP
- Name + UI/UX positioning.
- Existing project URLs and canonical intent.
- Resume PDF and direct email path.
- Existing strong project assets.
- DM Sans / Instrument Serif as reusable candidates; DM Mono only as sparse metadata.
- Semantic HTML foundation, focus treatment and reduced-motion intent.
- Honest limitation language; no invented impact.

## IMPROVE
- Home sequence to proof-first.
- Case-study narrative and contribution evidence.
- Project curation/ranking.
- Page-role differentiation.
- Media color/crop/focal treatment.
- Vietnamese content alignment.
- Shared design system ownership.
- Sitemap coverage.
- Desktop spacing/type/media behavior across 1280–1920.

## REMOVE / DE-EMPHASIZE
- Decorative marquee as a major first-screen transition.
- Orbit/grid motifs as dominant identity.
- Universal pill/card styling.
- Blanket grayscale on proof media.
- Universal case-study hero shell.
- Motion without task/orientation value.

## ADD
- Proof-first selected-work opening.
- Explicit role/scope/constraint/decision/outcome/limitation model.
- Page-role-specific top compositions.
- Redesign/change-thesis structure for VAS.
- Product-system evidence structure for FlowCRM.
- Media focal/crop plan.
- Stronger contextual next-project/contact pathways.

## Preserve List

1. URL/canonical equity for current public routes until SEO evidence supports change.
2. Current project names, externally linked live projects and CV/email destination.
3. Verified experience/education/project facts.
4. Existing honest language around unverified outcomes.
5. Native/semantic interaction patterns and reduced-motion intent.
6. Existing project imagery unless a verified superior asset replaces it.
7. No backend/form invention.

## Audit result

Audit design/research findings are sufficient to define the redesign contract, except for the hard-gated rendered OLD baseline evidence documented separately.