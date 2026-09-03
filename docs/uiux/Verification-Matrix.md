# Verification Matrix

## Phase 1
Phase 1 research/design gates remain `DONE_VERIFIED`; see `Phase-1-Handoff.md` and `Old-Baseline.md`. Phase 1 result: PASSED.

## Phase 2 — implementation verification

| Change / requirement | Expected outcome | Method | Pass condition | Result |
|---|---|---|---|---|
| Home structural redesign | portfolio proof and CTA arrive earlier; not a reskin | OLD vs NEW renders + DOM order | obvious hierarchy/composition/journey delta | DONE_VERIFIED |
| Home first-screen hierarchy | portrait supports identity rather than dominating; proof follows immediately | 1280/1440/1920 Chromium visual inspection | no P1 dead space/delayed CTA; Work enters next beat | DONE_VERIFIED |
| Luxury-minimal grammar | warm editorial restraint, not card/pill soup | cross-page rendered review | coherent type/rule/spacing/token system | DONE_VERIFIED |
| Shared case shell regression | linked local routes remain usable after shared CSS changes | 1440 Chromium route rechecks | no collapsed metadata/legacy visual break | DONE_VERIFIED |
| FlowCRM Family D | system artifact is primary evidence | rendered fix/recheck | model object visibly leads case | DONE_VERIFIED |
| Native-color project media | portfolio proof not globally neutralized | source + render review | no blanket grayscale; project identity retained | DONE_VERIFIED |
| Vietnamese UI | primary portfolio language matches config | source/render inspection | primary UI and local case shell render Vietnamese without broken glyphs | DONE_VERIFIED |
| Desktop scope | stable declared Chromium widths | 1280/1440/1920 Home + representative/regression captures | no material collision/overflow/crop | DONE_VERIFIED |
| Focus/reduced-motion baseline | UI not animation-gated; visible keyboard style exists | source checks + rendered default states | `:focus-visible`, reduced-motion path, semantic controls present | DONE_VERIFIED baseline; no formal conformance claim |
| Theme/client interactions | truthful client-only behavior | source review | no backend implication; localStorage failure non-critical | DONE_VERIFIED source-level |
| Contact/CV/external links | truthful handoffs | source/link contract review | no fake submit/success state | DONE_VERIFIED |
| SEO route preservation | no local route loss; sitemap matches routes | source/canonical/sitemap review | VAS + all local cases in sitemap; canonicals preserved | DONE_VERIFIED |
| Static performance architecture | redesign adds no 3D/video/framework or heavy runtime dependency | source/resource review | static HTML/CSS/JS preserved | DONE_VERIFIED for implementation architecture; lab perf deferred to Final QA |
| Supporting external project UX | no project-specific redesign work required | current user scope clarification | external project sites excluded | N/A_JUSTIFIED |
| Mobile/tablet | excluded by declared scope | scope review | no responsive claim required | N/A_JUSTIFIED |

## Visual evidence
- OLD: run `33773806896`, artifact `9900765034`.
- Representative NEW final gate: run `33776795104`, artifact `9901910428`.
- Supporting route fixed recheck: run `33777139422`, artifact `9902042011`.
- Screenshots were opened and visually inspected; file existence alone was not used as a pass.

## Two-stage review
A. Spec/intent compliance: PASSED — portfolio UI is the primary upgraded experience; structural delta is visible; no release performed.  
B. Code/experience quality: PASSED for Phase 2 — root owners used, regressions fixed, static architecture/system reality preserved.

Phase 2 BLOCKED: 0  
Phase 2 UNACCOUNTED: 0
