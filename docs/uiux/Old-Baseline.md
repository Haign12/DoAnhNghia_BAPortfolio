# OLD Rendered Baseline

Baseline target: `https://haign12.github.io/DoAnhNghia_BAPortfolio/`
Source baseline: `main@2c7c6ee7cbe82be98c42257854ca28a725e7ba8b`
Required browser: Chromium
Required viewport widths: 1280 / 1440 / 1920 px

## Hard-gate status

**BLOCKED — rendered OLD screenshot set is not available as inspectable pixel evidence.**

Per `website-delivery-pipeline` and the current user requirement, source inspection is not substituted for rendered evidence.

## Capture attempts

1. Direct live-page retrieval through the available web renderer returned a fetch/cache failure for the GitHub Pages URL.
2. Local Chromium capture was attempted after trying to access the public site/repository from the execution container; the container could not resolve external GitHub/GitHub Pages hosts.
3. Public screenshot-service fallback could not be safely invoked through the available web sandbox for an arbitrary nested target URL.
4. Repository source and assets remain fully inspectable through the connected GitHub source, but that does not produce viewport-correct pixels.

## Required OLD capture matrix

| Page family / representative route | 1280 | 1440 | 1920 | Inspect requirement | Status |
|---|---:|---:|---:|---|---|
| Home / orientation — `/` | required | required | required | hierarchy, nav, hero silhouette, work position, portrait crop, marquee, fold | BLOCKED |
| Personal case study — `case-study-luxroom.html` | required | required | required | top composition, project image crop, metrics, narrative rhythm | BLOCKED |
| Personal case study pressure sample — `case-study-studioos.html` | required | required | required | long title/body density, wide media, shared-template consistency | BLOCKED |
| Redesign case study — `case-study-vas-education.html` | required | required | required | shared shell vs VAS visual summary, page-role differentiation | BLOCKED |
| Product/system legacy — `case-study-ux.html` | required | required | required | legacy inline system, top composition and drift | BLOCKED |

## Source-based provisional baseline — NOT rendered evidence

These observations are FACT from source and may guide capture inspection, but they are explicitly not screenshot proof:

### Home
- Sticky pill-like nav.
- Two-column hero with copy + portrait.
- Decorative grid and orbit layers around portrait.
- Grayscale portrait.
- Hero followed by animated black marquee.
- About precedes Selected Work.
- Work is grouped into Personal Projects and Redesign.

### Personal case studies
- Sticky rounded nav.
- Kicker + large title + action row + three metric chips.
- Large hero project image.
- Repeated section/cards rhythm across multiple projects.

### VAS
- Shared case-study outer shell plus a dedicated red VAS visual summary.

### FlowCRM
- Separate inline styling and dark/card-heavy legacy presentation, materially different from shared case-study CSS.

## Screenshot naming convention when unblocked

`OLD-{family}-{route}-{viewport}-20260903.png`

Examples:
- `OLD-home-index-1440-20260903.png`
- `OLD-personal-luxroom-1440-20260903.png`
- `OLD-redesign-vas-1920-20260903.png`

Screenshots must be opened and visually inspected; file existence alone is not evidence.

## Inspection checklist

For every required screenshot:
- first-screen hierarchy and visible decision sequence;
- composition silhouette and horizontal balance;
- typography wraps/line length;
- density and negative-space rhythm;
- nav/sticky relationship;
- image focal point and unintended crop;
- grayscale/color treatment;
- CTA/proof placement;
- cross-page template monotony;
- no unintentional overflow at the viewport width.

## Unblock condition

Phase 1 OLD baseline requirement becomes `DONE_VERIFIED` only when the matrix above has actual Chromium renders at 1280/1440/1920 and those renders have been opened/inspected with findings recorded here or linked evidence.

Until then, any OLD visual conclusion beyond source-visible structure is `UNVERIFIED` and the Phase 1 result cannot be PASSED.