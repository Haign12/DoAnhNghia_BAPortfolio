# Brand and Visual Direction

## Brand source status

**C — LOGO AVAILABLE, NO BRAND GUIDELINE**

Title for this working direction: **PROPOSED BRAND GUIDELINE — LOGO-DERIVED / PROJECT-DERIVED**.

Important boundary: the logo asset exists in the first-party repository, but its geometry/color has not been visually verified in this Phase 1 environment. Therefore no logo-specific color/personality claim is made. The luxury-minimal direction comes from the current user requirement, portfolio task, existing typography/assets and reference synthesis — not from invented logo semantics.

## Evidence ledger

| Dimension | Finding | Status | Confidence | Digital implication |
|---|---|---|---|---|
| Name/role | Do Anh Nghia — UI/UX Designer | VERIFIED_FROM_OFFICIAL_ASSET/source | high | preserve clear personal identity |
| Logo | `assets/images/logo.png` exists | VERIFIED_FROM_OFFICIAL_ASSET existence only | medium | keep asset; visual usage must be inspected before implementation |
| Current type | DM Sans + Instrument Serif + DM Mono | VERIFIED_FROM_OFFICIAL_ASSET/source | high | reuse is preferred before adding font dependencies |
| Current monochrome system | black/white/light-dark themes | VERIFIED_FROM_OFFICIAL_ASSET/source | high | can evolve into warmer premium neutrals without pretending they are official |
| Luxury minimalism | explicit redesign goal | OFFICIAL user requirement | high | composition/craft must communicate restraint, not trend effects |
| Brand voice/personality | no official document | UNKNOWN | low | derive copy only from verified portfolio content; do not invent archetype |

## Visual attributes → implementable behavior

### 1. Quiet confidence
- fewer simultaneous visual devices;
- no decorative marquee/orbit/grid competition in the first decision sequence;
- strong hierarchy from type, scale, whitespace and media.

### 2. Editorial precision
- asymmetrical but disciplined grid;
- project metadata behaves like captions/index data, not pills;
- hairline rules and measured alignment create rhythm.

### 3. Warm material restraint
- warm paper/ivory background rather than clinical pure-white everywhere;
- near-black ink;
- one muted earth/bronze accent for wayfinding/focus moments, not “gold luxury” decoration.

### 4. Proof-led color
- project media keeps its native/project-specific color;
- site chrome stays neutral so each project can own its palette.

### 5. Typographic character
- Instrument Serif for selected display/quoted/editorial moments;
- DM Sans for body/navigation/actions;
- DM Mono only for metadata/index labels.

### 6. Purposeful motion
- motion only for orientation, state feedback and subtle entry hierarchy;
- no showreel wait state;
- reduced-motion must keep all content immediately accessible.

## Proposed semantic color roles

These are **PROPOSED_FOR_DIGITAL**, not official brand colors.

| Role | Proposed value | Allowed | Prohibited |
|---|---|---|---|
| `page-bg` | warm ivory around `#F3F0E9` | primary canvas | high-contrast decorative blocks everywhere |
| `surface` | soft paper around `#FBF9F4` | selected content surfaces | card-everything |
| `text-primary` | near-black around `#15130F` | body/headings/actions | washed gray body copy |
| `text-secondary` | warm gray around `#6D675F` | metadata/support copy | primary CTA copy if contrast weak |
| `line` | low-opacity ink | dividers/grid rhythm | heavy boxes around every section |
| `accent` | muted bronze/umber around `#8A6B45` | index markers, active link, fine rule, rare emphasis | gradients, large gold backgrounds, all CTA buttons |
| `dark-surface` | deep charcoal around `#171512` | one controlled inverse section/state | default entire site unless validated |
| `focus` | high-contrast companion tone | keyboard focus | relying only on color change |

Exact contrast values must be verified in implementation before token lock.

## Typography contract

- Display: Instrument Serif, selective and large; Vietnamese glyph coverage must be rendered/tested with actual copy.
- Body/UI: DM Sans.
- Meta: DM Mono, limited to dates/indices/labels.
- H1/H2 scale must fluidly adapt across 1280–1920 without extreme 1-line dependence.
- Body line length target: roughly 55–75ch for reading chapters.
- Long Vietnamese headings must be tested at 1280 and 1366 pressure widths.
- Do not use all-caps mono labels excessively; they should support orientation, not become the voice of the whole site.

## Layout grammar

- Wide desktop canvas with stable max content width and generous side gutters.
- 12-column conceptual grid; compositions may span asymmetrically rather than visible boxed columns.
- Section rhythm alternates: dense proof → quiet reading → proof, rather than equally padded repeated blocks.
- Full-bleed media is used only when the asset can survive the crop and the project story benefits.
- Cards are reserved for actual grouped comparable objects; most content should be editorial rows/chapters.

## Shape / depth

- Default radius: low or zero; reserve small radius for genuinely interactive/contained controls if needed.
- Avoid pill navigation/metadata as universal language.
- Avoid large drop shadows; prefer tonal separation and 1px rules.
- Grain/noise only if imperceptibly supporting materiality and not harming legibility/performance; default is to remove it.

## Media direction

- Project UI screens are evidence, not decoration: keep original color and readable content where possible.
- Portrait should feel editorial/professional, not framed by tech orbits.
- Use crop as an intentional composition decision with focal/safe-zone records.
- No new stock photography is needed for the portfolio.

## Composition families

1. **Family A — Home / editorial proof index**: positioning + immediate flagship work cue, followed by varied project rows/fields.
2. **Family B — Personal case study / artifact-led**: project artifact/screen dominates top; title/role/context shares editorial masthead rather than universal hero box.
3. **Family C — Redesign / change thesis**: OLD problem/evidence + design thesis + NEW proof visible early.
4. **Family D — Product/system / model-led**: flow/state/system object is first proof, not a generic hero image.

## Visual signature test

If name/logo are hidden, the redesign should still be recognizable by:

**warm editorial paper field + sharp sans/serif contrast + hairline indexing + original-color project proof media + asymmetric proof-first composition.**

## Do

- let project media own color;
- use whitespace as sequence and emphasis;
- show role/problem/decision near project entry;
- vary top composition by page job;
- keep actions legible and calm;
- preserve strong native semantics/focus.

## Do not

- equate luxury with gold gradient, black marble, glass or excessive serif;
- reuse one hero shell across all case studies;
- blanket-grayscale the work;
- build every section from rounded cards;
- add 3D/WebGL/video without task and asset evidence;
- hide proof behind animation;
- infer brand values from the logo.

## Desktop stress-test requirement

Before implementation is accepted, the four composition families must be rendered at 1280 / 1440 / 1920 in Chromium; pressure widths 1366 / 1536 / 1600 are used for wrapping/crop checks. Mobile/tablet remain N/A_JUSTIFIED.