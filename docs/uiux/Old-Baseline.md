# OLD Rendered Baseline

Baseline source: `main@2c7c6ee7cbe82be98c42257854ca28a725e7ba8b`
Browser: Chromium headless / Ubuntu / DPR 1
Viewports inspected: 1280×1080, 1440×1080, 1920×1080
Evidence run: GitHub Actions `33773806896`, artifact `phase1-old-baseline` (`9900765034`), digest `sha256:46ba95fa8afb7cacf80051f38c9481505ab98288247bbd10caf4d260e81d5fb1`.

## Hard-gate status

**DONE_VERIFIED** — 12 screenshots were rendered from the exact OLD source SHA and opened/inspected. The QA workflow lived only on `qa/phase1-baseline-20260903`; it did not alter `main`, deploy, or alter Phase 1 source truth.

## Capture matrix

| Representative page family | 1280 | 1440 | 1920 | Result |
|---|---|---|---|---|
| Home / orientation — `/` | inspected | inspected | inspected | DONE_VERIFIED |
| Personal case — `case-study-luxroom.html` | inspected | inspected | inspected | DONE_VERIFIED |
| Redesign case — `case-study-vas-education.html` | inspected | inspected | inspected | DONE_VERIFIED |
| Product/system archive — `case-study-ux.html` | inspected | inspected | inspected | DONE_VERIFIED |

LuxRoom is the representative for the shared Personal Case family; StudioOS/Atelier remain rollout coverage for Phase 2 rather than a separate Phase 1 composition family.

## Rendered findings

### Home
- FACT: first screen is identity-led: oversized display headline occupies the left; portrait/decorative orbit composition occupies the right; selected work is not a first-screen decision object.
- FACT: decorative orbit/grid + availability pill + `Logic meets empathy` compete with the main proof path, confirming the Delta Contract need to shift toward proof-first composition.
- FACT: 1280 and 1920 preserve the portrait subject; 1440 capture shows the portrait media region unloaded/blank while layout remains present. This is evidence of media-load/render fragility in the OLD state, not a focal-crop pass for that single screenshot.
- FACT: no horizontal overflow/collision was visible at the three declared widths.

### Personal case / LuxRoom
- FACT: all three widths use the same centered/left-aligned case shell: rounded sticky nav → kicker/title/summary → CTA row → three-column metadata → large project visual.
- FACT: the 3:2 project visual remains legible and does not clip a critical UI region in the inspected top composition.
- FACT: increasing viewport width mostly increases outer whitespace rather than changing the decision sequence.

### Redesign case / VAS
- FACT: top shell is materially similar to Personal Case until the project-native red evidence panel enters the fold.
- FACT: the red VAS visual is a strong project-native proof object and remains intact at all declared widths.
- EVIDENCE_BACKED_INFERENCE: redesign differentiation should begin higher in the composition, rather than relying on a shared case hero plus a branded panel below.

### Product/system archive / FlowCRM
- FACT: this route uses a different legacy rhythm: very large title, metadata strip, then problem/pain-point narrative; it lacks the project-native visual anchor visible in Personal/VAS above the fold.
- FACT: the route remains readable at all three widths but visually drifts from the shared case-study system.

## Cross-page monotony / page-role evidence

- FACT: Personal and VAS share near-identical top shell geometry despite different project roles.
- FACT: Home, Personal/VAS and FlowCRM already form distinguishable silhouettes, but the current differentiation is inconsistent rather than governed by a coherent page-role system.
- This directly supports four Phase 2 composition families: Home/Overview, Personal Case, Redesign/Change Thesis, and Product/System Archive.

## OLD media/focal observations

- `avatar.webp`: 1280 and 1920 cover crops retain face/head/upper body; safe subject region is center-biased. 1440 blank render is treated as a loading defect, not crop evidence.
- LuxRoom project visual: 3:2 landscape presentation preserves the core furniture/UI evidence across 1280/1440/1920; intrinsic/contain remains safer than aggressive cover.
- VAS red visual: generated/composed evidence remains structurally intact across widths; no photographic focal coordinate required.
- FlowCRM: top screen is text/evidence-led; image crop is not the first-screen decision object.

## Baseline conclusion

The OLD visual baseline is now suitable for Phase 2 OLD/NEW comparison. It confirms the redesign must change hierarchy, first-screen proof placement, case-family differentiation and media behavior—not only palette/type/spacing.
