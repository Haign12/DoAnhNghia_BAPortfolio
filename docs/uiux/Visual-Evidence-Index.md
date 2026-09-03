# Visual Evidence Index

All cited screenshot sets were downloaded and opened/visually inspected. Artifact existence alone is not treated as visual evidence.

## Phase 1 OLD baseline
- Run `33773806896`
- Artifact `9900765034`
- Source `main@2c7c6ee7cbe82be98c42257854ca28a725e7ba8b`
- Home/LuxRoom/VAS/FlowCRM at 1280/1440/1920.

## Phase 2 NEW implementation gate
- Run `33776795104`, artifact `9901910428`.
- Home 1280/1440/1920 plus representative case routes.
- Supporting final recheck: run `33777139422`, artifact `9902042011` for Atelier/StudioOS.

## Previous main/live baseline evidence
- Run `33777846380`, artifact `9902336889`.
- This remains useful Phase 4 production-baseline evidence only; it is no longer the Final QA target.
- It proved production/main was still OLD before release.

## Corrected Phase 3 release-candidate Final QA
- Exact candidate: `aef6a7c7299e607058fb6e84aaa86062553194f1`.
- Run: `33779853151`.
- Artifact: `9903113470` / `phase3-candidate-final-qa`.
- Digest: `sha256:868f7d11169cd3d5681c971c31a0bb842fb38c26bd0b18e1c1095e0d2f02381c`.

Opened/inspected directly:
- Home 1280×1080;
- Home 1440×1080;
- Home 1920×1080;
- cross-page montage containing Atelier, LuxRoom, StudioOS, FlowCRM and VAS at 1440×1080.

Observed outcome:
- 1280 exposes the selected-work continuation in the first narrative sequence;
- no material overflow/collision/crop issue at declared Home widths;
- portrait crop is coherent across 1280/1440/1920;
- supporting case routes remain visually intact;
- VAS and FlowCRM retain differentiated evidence compositions;
- no P0/P1/material-P2 visual defect remains.

Machine evidence in the same artifact:
- `static-audit.txt`: exact candidate SHA, vi locale, Work anchor, VAS sitemap coverage, reduced-motion/focus-visible, old Home motifs absent;
- `browser-smoke.json`: desktop nav `aria-hidden=false`, theme state change, keyboard signal, reduced-motion signal, no severe console errors;
- `routes.txt`: Home + five cases + CV + robots + sitemap all HTTP 200.

## OLD → NEW review
Same-width OLD and NEW Home evidence demonstrates structural change in hierarchy, composition, language, journey and decorative grammar. This satisfies the redesign delta gate and is not a palette/font-only reskin.
