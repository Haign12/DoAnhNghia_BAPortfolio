# StudioOS portfolio integration notes

## Source reference

- Live portfolio: https://haign12.github.io/DoAnhNghia_BAPortfolio/
- Existing UI/UX projects: LuxRoom and Atelier.
- New project: https://ngh1aa.github.io/StudioOS/

## Observed card pattern

The live portfolio uses a `UI/UX / 03 PROJECTS` group label, a `UI/UX Design` heading, a short section description, and a vertical list of compact cards. Each card contains a lazy-loaded image, a two-part project topline, a project title, a one-sentence description, tags, and website/case-study CTAs. The StudioOS card follows the same `project-compact` markup and reuses the existing typography, spacing, hover, border, and responsive rules.

## Verification notes

- The homepage card is present in the three-project UI/UX group and links to `https://ngh1aa.github.io/StudioOS/`.
- The homepage now serves as the single entry point for UI/UX work, including StudioOS with Source and View website CTAs.
- Desktop inspection shows the Quiet Precision cover and card content align with the existing project pattern.
- Mobile inspection at 390px shows the card image and content stacking correctly without horizontal overflow.

## UI/UX-first positioning verification

- Homepage desktop now leads with the UI/UX hero and routes Work to a single UI/UX project section containing the three primary projects.
- Homepage mobile collapses to the existing single-column navigation and hero layout. The direct headless capture was taken during the existing entrance animation, so its low-opacity frame is not treated as a contrast defect; the source keeps the established reveal behavior.
- The homepage now uses UI/UX Designer-first metadata, hero copy, selected-work hierarchy and contact CTA.

## Case study CTA verification

- Homepage UI/UX cards now use `View case study` links for Atelier and LuxRoom instead of Figma destinations; `View website` remains available as the external product CTA.
- The portfolio homepage uses internal case study links for Atelier, LuxRoom and StudioOS; no BA project section or BA project route remains in the public portfolio.
- New Atelier and LuxRoom case study pages reuse the existing case study theme, navigation, responsive behavior and motion preferences. The metric labels were checked after adding an explicit block display rule so Role, Platform and Focus remain readable on separate lines.
- Mobile inspection at 390px shows Atelier's hero title wrapping cleanly, the two CTAs stacking full-width, and Role/Platform/Focus remaining readable without horizontal overflow.
