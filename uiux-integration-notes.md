# StudioOS portfolio integration notes

## Source reference

- Live portfolio: https://haign12.github.io/DoAnhNghia_BAPortfolio/
- Existing UI/UX projects: LuxRoom and Atelier.
- New project: https://ngh1aa.github.io/StudioOS/

## Observed card pattern

The live portfolio uses a `UI/UX / 02 PROJECTS` group label, a `UI/UX Design` heading, a short section description, and a vertical list of compact cards. Each card contains a lazy-loaded image, a two-part project topline, a project title, a one-sentence description, tags, and an external `View website` link. The StudioOS card follows the same `project-compact` markup and reuses the existing typography, spacing, hover, border, and responsive rules.

## Verification notes

- The homepage card is present in the three-project UI/UX group and links to `https://ngh1aa.github.io/StudioOS/`.
- The dedicated `uiux-portfolio.html` page now includes StudioOS as Project 07 with Source and View website CTAs.
- Desktop inspection shows the Quiet Precision cover and card content align with the existing project pattern.
- Mobile inspection at 390px shows the card image and content stacking correctly without horizontal overflow.
