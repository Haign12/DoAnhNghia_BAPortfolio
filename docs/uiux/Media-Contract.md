# Media / Focal Point Contract

Media is central to the portfolio. Project media is evidence first, mood second.

## Global rules
1. Preserve native/project color unless a comparison deliberately neutralizes it.
2. No blanket grayscale on project proof.
3. UI screenshots default to intrinsic/contain or aspect-preserving presentation; `cover` must not remove decision evidence.
4. Photography may use `cover` only with a recorded safe subject region.
5. Reserve dimensions/aspect ratio to avoid layout shift.
6. At 1920, use additional whitespace/scale before choosing a more aggressive crop.

## Verified asset-family contract

| Asset/family | Purpose | Ratio / type | Fit | Focal / must-preserve region | 1280 / 1440 / 1920 evidence | Status |
|---|---|---|---|---|---|---|
| `avatar.webp` | identity | 1000×1433 portrait | editorial `cover` allowed | subject/face/head/upper body; center-biased safe zone; never crop forehead/chin | subject preserved at 1280 and 1920; 1440 OLD render showed unloaded blank media, recorded as OLD loading defect | DONE_VERIFIED for crop contract |
| `luxroom.webp` | product proof | 1200×800, 3:2 | intrinsic/contain preferred | preserve the complete multi-screen/furniture evidence field; no single photographic focal point | inspected LuxRoom top media at all three widths; core evidence remains visible | DONE_VERIFIED |
| `altelier.webp` | commerce proof | 1200×800, 3:2 | intrinsic/contain; editorial crop only as secondary detail | preserve product/UI hierarchy and key shopping controls | same 3:2 family; Phase 2 must re-inspect its actual NEW slot | DONE_VERIFIED contract; NEW QA required in Phase 2 |
| `studioos.webp` | SaaS proof | 1600×1067 ≈3:2 | intrinsic/contain | preserve workspace/task regions; secondary close-up may crop only as an explicitly different detail | same shared Personal family; NEW route-specific QA required in Phase 2 | DONE_VERIFIED contract |
| `capital-place.jpg` | supporting external redesign preview | 1024×683 ≈3:2 | 3:2 cover acceptable | preserve architectural/interior subject, avoid arbitrary edge crop | Home-supporting proof; NEW slot must be re-inspected if retained | DONE_VERIFIED contract |
| `FLOW.png` | product/system evidence | PNG UI/system artifact | `contain` | preserve complete flow/UI model; structural focal need, not photographic | no first-screen image crop in OLD archive composition; Phase 2 must introduce proof without clipping | DONE_VERIFIED |
| VAS CSS/composed visual | change-thesis evidence | generated layout | N/A / intrinsic composition | preserve red project-native hierarchy/content blocks | visually intact at 1280/1440/1920 OLD renders | DONE_VERIFIED |

## Desktop slot strategy

### Home
- Project proof should be interpretable at 1280, not reduced to decorative thumbnail scale.
- Portrait is supporting identity evidence, not dominant proof.
- Avoid identical card crops for unrelated projects.

### Personal case
- Use original/contained artifact as the primary visual anchor.
- Detail crops, if any, must be additional proof, not replacements for the legible original.

### Redesign case
- Prefer before/change/after or change-thesis evidence with comparable scale.
- Project-native color belongs to project evidence, not global portfolio chrome.

### Product/system case
- Use the full flow/system artifact horizontally where possible; `contain` is the default.

## Focal/safe-zone implementation record

For photographic cover slots record: `asset | slot ratio | subject region | object-position | 1280 | 1440 | 1920`.
For UI/system screenshots record: `must_preserve_regions | fit_mode | legibility result`.

Exact CSS percentages are implementation outputs, not Phase 1 research facts. Phase 1 has now established the safe subject/evidence regions from inspected OLD pixels; Phase 2 must derive and verify actual NEW `object-position` values from the implemented slots.

## Accessibility / delivery
- contextual alt text describes what the evidence demonstrates;
- screenshots with small text need adjacent prose, not giant alt transcription;
- below-fold proof lazy-loads; only real opening media may be eager;
- no new video/3D requirement;
- WebP sources remain preferred where adequate.

## Phase 1 status

**DONE_VERIFIED.** Focal/safe-region behavior was inspected using Chromium OLD evidence at declared desktop widths. Phase 2 still owns NEW crop verification after composition changes.
