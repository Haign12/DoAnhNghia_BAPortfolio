# Design System — Phase 1 Contract

This file defines the system to be implemented later. No production tokens/components are changed in Phase 1.

## Existing system inventory

### Existing primitives
- Colors: light/dark monochrome semantic variables in `styles.css` and `case-study.css`.
- Type: Instrument Serif / DM Sans / DM Mono.
- Layout: `.shell`, section padding, case-study max widths.
- Interaction: buttons/links/theme toggle, sticky nav, reveal, progress.
- Media: project preview blocks, portrait frame, case hero visuals.

### Existing shared owners
- Home system: `styles.css`.
- Shared case studies: `case-study.css`.
- Home behavior: `script.js`.
- Case behavior: `case-study.js`.
- FlowCRM exception: large inline CSS in `case-study-ux.html`.

## System problem

**FACT:** shared styles exist, but many visual choices are tied to a current universal presentation language (pills, borders, repeated case hero/metrics/cards), while FlowCRM is a legacy visual island.

**Design implication:** Phase 2 should refactor the shared owner rather than stacking page-local CSS patches. Consistency should come from tokens/components; page differentiation should come from composition patterns.

## Foundation contract

### Semantic color tokens

Implement semantic roles, not palette-name tokens:
- `--color-page`
- `--color-surface`
- `--color-surface-dark`
- `--color-text`
- `--color-text-muted`
- `--color-text-inverse`
- `--color-line`
- `--color-accent`
- `--color-action`
- `--color-action-text`
- `--color-focus`

Proposed values live in `Brand-and-Visual-Direction.md`; final values require contrast verification.

### Type tokens

- `display-serif`
- `heading-sans` / optional editorial serif by composition
- `body-sans`
- `meta-mono`
- fluid desktop scales must be tested with Vietnamese copy at 1280/1366/1440/1536/1600/1920.

### Layout tokens

- desktop canvas max width;
- wide media max width;
- reading column max width;
- side gutter by desktop pressure width;
- vertical section rhythm levels: compact / standard / editorial / immersive;
- line/divider weight.

### Shape/depth tokens

- radius should be sparse: `0`, `small`, and `control` only if justified.
- shadows are exceptional, not default.
- border/hairline is the dominant structural separator.

### Motion tokens

- durations: instant/fast/standard only;
- one restrained easing curve;
- reduced-motion state removes transform-dependent reveal without hiding content.

## Component contracts

### GlobalNav
Purpose: persistent orientation and utilities.
States: top/scrolled/focus/active/theme-state.
Desktop: one row, no hamburger requirement in declared scope.
Accessibility: semantic nav, no incorrect `aria-hidden` on visible desktop menu.

### ProjectIndexItem
Purpose: let user compare/select work.
Anatomy: index/meta, project name, concise problem/value line, media, role/type, actions.
Variants: flagship / standard / compact archive.
Not allowed: all variants becoming same rounded card with different copy.

### ProjectMeta
Purpose: expose role/type/platform/status quickly.
Presentation: editorial text/row; pills only if a semantic selected/filter state exists.

### ActionLink / PrimaryAction
Purpose: case/live/resume/contact navigation.
States: default/hover/focus/visited where useful.
Do not create many visual button variants for decorative differences.

### MediaFrame
Purpose: proof media with ratio/focal contract.
States: image/placeholder/error-safe static fallback where applicable.
Must preserve aspect ratio and declared dimensions.

### CaseChapter
Purpose: readable narrative grouping.
Not a card by default; uses heading, reading column, supporting proof media.

### EvidenceObject
Purpose: page-role-specific proof such as flow diagram, before/after pair, decision matrix or UI screen group.
Variants are semantic by evidence type, not page color.

### ContactUtility
Purpose: email/CV/LinkedIn handoff.
No form/success state unless a real backend is introduced in a later authorized scope.

## Composition patterns

- `HomeProofIndex`
- `ArtifactLedCaseTop`
- `ChangeThesisCaseTop`
- `SystemModelCaseTop`
- `ReadingChapterWithProof`
- `OutcomeLimitationsClosure`

These patterns share tokens and components but must retain different silhouette/first anchor.

## Reuse / refactor decisions

1. Reuse current fonts before adding dependencies.
2. Reuse semantic/accessible nav/button elements, not necessarily existing visual treatment.
3. Refactor shared case-study owner before page-local overrides.
4. Bring FlowCRM into shared foundations while keeping its system-led composition unique.
5. Preserve project-specific media/color instead of forcing global grayscale.

## Known exceptions

- VAS may use verified project-red inside its evidence object because the case study is showing a different brand; that color does not become portfolio chrome.
- Project media can contain arbitrary brand colors; global text/action contrast must not depend on them.

## Design-system acceptance gate for implementation

- semantic tokens replace scattered repeated raw values where practical;
- GlobalNav/ProjectIndex/CaseChapter/MediaFrame/Action components have keyboard/focus contracts;
- no universal case top;
- no FlowCRM parallel theme system unless a documented technical reason remains;
- representative compositions for Home, personal case, VAS, and FlowCRM are visually inspected at 1280/1440/1920 before propagation.