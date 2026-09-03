# Design System — Implementation Contract

Status: `PROPOSED_FOR_DIGITAL` unless a value is inherited from verified project behavior.

## Foundations

- Canvas: `#F5F1E8`
- Surface: `#FBF8F2`
- Ink: `#151412`
- Muted: `#6F6A61`
- Rule: `#D8D0C3`
- Bronze datum: `#C6A978` — decorative/selected only
- Interactive bronze: `#7A5E3B`
- Display: `Noto Serif Display`
- Body/UI: `DM Sans`
- Meta: `DM Mono`
- Radius language: `0–8px`; oval reserved for exceptional status only
- Motion: 160–420ms; reduced-motion removes non-essential transitions/reveals

## Shared patterns

1. `shell` — capped editorial desktop container.
2. `section-label` — numbered mono metadata + hairline rule.
3. `editorial-link` — text action with arrow/underline; no pill default.
4. `project-folio` — native-color project evidence followed by metadata/title/actions.
5. `metadata-rail` — role/platform/focus facts for case-study entry.
6. `case-section` — readable narrative width with hairline separation; cards used only when comparison is genuinely useful.
7. `utility-nav` — quiet text navigation with visible focus and mobile menu fallback.

## State contract

- Links/buttons: default, hover, focus-visible, active where meaningful.
- Theme toggle: real local preference, `aria-pressed` reflects dark state.
- Mobile menu safety: expanded/hidden attributes match visual state; Escape closes and focus returns.
- Reveal motion: progressive enhancement only; content remains visible when JS/reduced-motion is unavailable.

## Reuse decisions

- Keep one shared `styles.css` for homepage system.
- Keep one shared `case-study.css` for case-study chrome; project variants are body classes, not duplicated page-local systems.
- Keep existing `script.js`/`case-study.js` behavior where still relevant and simplify rather than add dependencies.
- Do not add framework/library dependencies.
