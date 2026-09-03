# Visual Evidence Index

All cited screenshot sets were downloaded and opened/visually inspected. Artifact existence alone is not used as visual evidence.

## Phase 1 OLD baseline
- Run: `33773806896`
- Artifact: `9900765034` / `phase1-old-baseline`
- Source: `main@2c7c6ee7cbe82be98c42257854ca28a725e7ba8b`
- Chromium: Home/LuxRoom/VAS/FlowCRM × 1280/1440/1920.

## Phase 2 NEW candidate
- Run: `33776795104`
- Artifact: `9901910428` / `phase2-final-gate`
- Visual code candidate: `e2ccbff7bd322f80da3aea3d296f6b5b07f79dfc`
- Home: 1280/1440/1920.
- Regression reps: LuxRoom/VAS/FlowCRM 1440.
- Direct inspection outcome: Home proof-first P1 closed; representative composition gate passed.

Supporting final route recheck:
- Run: `33777139422`
- Artifact: `9902042011`
- Commit: `a73c39625155208f1263c479a5a7609e17f3d60b`
- Atelier/StudioOS 1440 opened/inspected after shared-shell regression repair.

Phase 2 handoff head `aef6a7c7299e607058fb6e84aaa86062553194f1` contains only later sitemap/docs changes beyond the visual source changes; Home visual implementation matches the cited final visual gate.

## Phase 3 exact main + live evidence
- Run: `33777846380`
- Artifact: `9902336889` / `phase3-main-live-final-qa`
- Digest: `sha256:00773da11097e5fedae83d6ae805655a963c1f0558c12ee37ba5f4e6d064410e`
- Target source: `main@2c7c6ee7cbe82be98c42257854ca28a725e7ba8b`

Opened/inspected:
- live Home 1280/1440/1920;
- local exact-main Home 1440 as source/live parity check;
- live case-study montage containing Atelier, LuxRoom, StudioOS, FlowCRM and VAS at 1440.

Machine evidence in same artifact:
- route HTTP status list;
- source/SEO/resource audit;
- live Home HTML + source/live SHA-256 hashes;
- single-run live network timing;
- Selenium keyboard/theme/reduced-motion/console smoke JSON.

## OLD → NEW comparison
A same-width side-by-side comparison was built/opened from:
- Phase 3 main/live Home 1280/1440/1920; and
- Phase 2 NEW Home 1280/1440/1920.

Inspection confirms the candidate is a structural redesign, while main/live is still the OLD implementation.

## Evidence limitation
The main/live hero portrait appeared blank in current headless captures at all three widths while the same source asset is valid and the Phase 2 candidate renders it. This is recorded as an `[evidence]` risk rather than an additional product defect without normal interactive/GPU reproduction.
