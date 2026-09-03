# Media / Focal Point Contract

Media is applicable and central to this portfolio. This contract prevents `object-fit: cover` from becoming an unreviewed crop decision.

## Global media rules

1. Project media is evidence first, mood second.
2. Preserve native/project color unless a specific comparison needs neutralization.
3. No blanket grayscale.
4. Every primary media slot has a declared ratio/fit strategy and focal/safe-zone review.
5. No important UI text/control may be cropped for visual drama.
6. For screenshots, `contain` or uncropped aspect-preserving presentation is preferred when interface legibility matters.
7. For photography, `cover` is allowed only after focal/safe-zone inspection.
8. Width/height or aspect-ratio space must be reserved to avoid layout shift.

## Asset family inventory

| Asset | Purpose | Known source ratio | Intended desktop role | Fit mode | Focal point / safe crop | Status |
|---|---|---:|---|---|---|---|
| `avatar.webp` | personal identity | 1000×1433 portrait | supporting editorial portrait on Home/Profile | `cover` only in art-directed portrait slot; otherwise intrinsic | exact face/eye focal point UNKNOWN until source/render inspection; safe crop must preserve full face/head/shoulders | BLOCKED_VISUAL_EVIDENCE |
| `luxroom.webp` | LuxRoom proof | 1200×800 = 3:2 | flagship/case artifact | prefer aspect-preserving `contain` or 3:2 crop | UI/furniture decision area must remain fully legible; exact focal inspected from rendered asset | BLOCKED_VISUAL_EVIDENCE |
| `altelier.webp` | Atelier proof | 1200×800 = 3:2 | fashion case proof | 3:2 intrinsic / editorial crop variants only if garment/UI evidence survives | do not crop labels/actions required to understand shopping hierarchy | BLOCKED_VISUAL_EVIDENCE |
| `studioos.webp` | StudioOS workspace proof | 1600×1067 ≈ 3:2 | product UI evidence | prefer intrinsic/contain; allow close-up derivative in separate slot | primary workspace/task regions must not be cut | BLOCKED_VISUAL_EVIDENCE |
| `capital-place.jpg` | external redesign preview | 1024×683 ≈ 3:2 | supporting Home proof | 3:2 cover acceptable after inspection | architectural/interior subject must remain clear | BLOCKED_VISUAL_EVIDENCE |
| `FLOW.png` | FlowCRM proof | source PNG | product/system evidence | `contain` by default | preserve full flow/UI model; no arbitrary cover crop | focal need is structural rather than photographic |
| VAS CSS/composed visual | redesign summary | generated layout, not image asset | change-thesis evidence | N/A | preserve content hierarchy; project red is project evidence, not portfolio chrome | source-defined |
| social images | social preview only | file-specific | OG/Twitter | fixed social ratio | do not reuse as page proof unless quality/crop inspected | secondary |

## Desktop slot strategy

### Home flagship media
- target visual slot may range roughly 16:10–3:2 depending project asset;
- must remain large enough at 1280 for the proof to be interpretable;
- at 1920, increase negative space/media scale selectively rather than cropping more aggressively.

### Home supporting work
- do not normalize all assets into identical cards;
- retain a coherent baseline rhythm but allow 3:2 landscape, tall portrait or contained UI as evidence requires.

### Case top
- Personal case: artifact may use intrinsic ratio or paired detail/original composition.
- Redesign case: OLD/NEW objects need comparable scale and clear captions.
- System case: flow/diagram should use available horizontal width and `contain`.

## Focal point recording format for implementation

For every photographic/cover media after visual inspection:

```text
asset:
slot:
intrinsic_ratio:
slot_ratio:
focal_x_percent:
focal_y_percent:
safe_left/right/top/bottom:
fit_mode:
1280_result:
1440_result:
1920_result:
```

For UI screenshots, replace focal coordinates with `must_preserve_regions` and use contain/intrinsic presentation when possible.

## Performance / delivery

- keep WebP sources where already available;
- avoid converting proof screenshots into oversized PNG when WebP/AVIF can preserve required fidelity;
- `FLOW.png` should be evaluated for optimized delivery later, but content fidelity takes priority;
- lazy-load below-fold media;
- only true opening/LCP media gets eager/high priority;
- no video/3D is required by the design direction.

## Accessibility

- alt text describes what the media proves in context, not “image of project”.
- decorative texture is `aria-hidden`/CSS-only.
- screenshots with meaningful small text need adjacent textual explanation; alt text should not transcribe an entire UI.

## Phase 1 status

The contract and asset-role inventory are complete, but exact focal/crop coordinates are **BLOCKED** by the same unavailable rendered/visual OLD evidence noted in `Old-Baseline.md`. They must be completed from actual inspected pixels before implementation media QA can pass.