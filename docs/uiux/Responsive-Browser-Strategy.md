# Responsive / Browser Strategy

## Declared scope

- Mode: **desktop_only**
- Supported browser: **Chromium**
- Required viewports: **1280 / 1440 / 1920 px**
- Tablet: **N/A_JUSTIFIED** — explicitly excluded by current Project Config/user instruction.
- Mobile: **N/A_JUSTIFIED** — explicitly excluded by current Project Config/user instruction.
- The project must not be described as “fully responsive” from this scope.

## Desktop pressure matrix

| Width | Role | What to pressure-test |
|---:|---|---|
| 1280 | minimum declared desktop | nav density, Vietnamese H1 wrapping, proof/media readability, 2-column limits |
| 1366 | common pressure width | heading wrap, project metadata collision, sticky nav, large image crop |
| 1440 | design reference viewport | canonical composition/hierarchy comparison |
| 1536 | intermediate wide | max-width transition and whitespace balance |
| 1600 | wide pressure point | media expansion vs reading line length |
| 1920 | maximum declared desktop | avoid content becoming too spread out; preserve intentional scale/negative space |

## Layout behavior rules

### Canvas
- use a max content/canvas width so 1920 does not stretch reading content indefinitely;
- side gutters can grow on wide screens;
- reading columns remain bounded independently from proof media.

### Typography
- fluid display type may grow between 1280 and a capped wide value;
- no layout may rely on an H1 remaining on one line;
- test Vietnamese diacritics and longer terms at 1280/1366;
- metadata rows must wrap gracefully or switch composition before collision.

### Project index
- flagship media stays interpretable at 1280;
- supporting work may switch between 2-column editorial row and wide single row based on content pressure, not fixed device labels;
- no horizontal scrolling.

### Case studies
- reading text remains a stable narrow column;
- evidence media/model can use wider canvas;
- VAS before/after comparison must not shrink proof to unreadable thumbnails at 1280;
- FlowCRM system diagrams should scroll only if the artifact itself truly requires it; preferred design is a desktop-safe contained model.

### Sticky/fixed UI
- nav cannot overlap first heading or case-study anchors;
- scroll-margin/focus positions must account for sticky header;
- progress indicators must not cover content or create visual noise.

## Media

- crop strategy is per asset, not a universal `cover` rule;
- evaluate focal/crop at 1280, 1440, 1920;
- 1920 should not automatically crop more aggressively just to fill space;
- UI screenshots prioritize legibility and may remain contained.

## Chromium QA

Manual/rendered checks:
- layout/overflow;
- typography wrapping;
- sticky positioning;
- `color-mix`, backdrop/filter effects if retained;
- focus-visible behavior;
- localStorage theme behavior;
- IntersectionObserver/reduced-motion behavior;
- external and anchor navigation.

## Zoom / desktop accessibility

Even with mobile/tablet excluded, desktop QA should sample:
- browser zoom 100% and 200% for critical reading/navigation paths where feasible;
- text spacing/focus visibility;
- no essential content clipped by fixed pixel-height containers.

## Baseline status

Source-level desktop rules are defined. OLD rendered evidence at required widths is BLOCKED in `Old-Baseline.md`; therefore no claim is made that current or future desktop layouts have passed visual QA.