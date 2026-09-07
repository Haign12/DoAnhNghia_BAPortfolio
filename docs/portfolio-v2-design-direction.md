# Portfolio V3 — Curated Work Index Direction

## Goal

Keep the homepage recruiter-readable by showing only the requested nine projects/systems, while making every thumbnail feel more intentional and project-specific.

## Skill routing used

- `portfolio-website` — prioritize relevant work and scannable case-study hierarchy.
- `visual-design-direction` — define one reusable composition grammar with meaningful domain variation.
- `asset-media-and-art-direction` — use purpose-built thumbnail compositions instead of risky arbitrary crops.
- `design-system-and-components` — keep one card/thumbnail anatomy, responsive behavior and interaction contract.
- `brand-distinctiveness-and-visual-signature` — let each project remain recognizable without breaking portfolio consistency.
- `ui-craft-and-visual-qa` — preserve readable states, mobile density and reduced-motion behavior.

## Information architecture

```text
Selected Work (9)
├── Featured Case Studies (4)
│   ├── Atelier
│   ├── LuxRoom
│   ├── Capital Place
│   └── VAS Education
├── Project Archive (3)
│   ├── Vietbank Redesign
│   ├── QTSC
│   └── StudioOS
└── Tools & Systems (2)
    ├── UI Feedback Tool
    └── skills_UIUX
```

## Thumbnail system V3

All thumbnails share the same outer contract:

`index/category → 16:10 stage → framed UI surface → project thesis → signature domain object → project meta/tags/actions`

The new system deliberately avoids making every project look like the same generic browser mockup. Each project receives a signature object:

- Atelier — editorial fashion spread.
- LuxRoom — room-plan/material composition.
- Capital Place — tower/floor stack.
- VAS Education — guided pathway sequence.
- Vietbank — bank card + financial bars.
- QTSC — connected ecosystem nodes.
- StudioOS — modular dashboard panels.
- UI Feedback Tool — inspector panel + selected target.
- skills_UIUX — skill/flow graph.

No project thumbnail relies on `object-fit: cover`, so focal-point crop risk is removed from the work index.

## External reference synthesis

Current 2026 portfolio examples reviewed online reinforce three useful principles: keep a coherent grid/system, let case studies communicate challenge/solution rather than behaving as a pure gallery, and use typography/spacing consistently so the work remains the main visual content. These principles were adapted rather than copied as surface styling.

## Visual signature

If the logo/header is removed, the portfolio remains recognizable through:

- warm paper + near-black editorial shell;
- DM Sans + Instrument Serif contrast;
- mono indexing/metadata;
- technical line/grid language;
- large project typography;
- restrained motion;
- project-specific signature objects inside one shared thumbnail frame.

## Responsive rules

- Featured: 2 columns desktop → 1 column tablet/mobile.
- Archive: 3 columns desktop → 2 columns medium → 1 column mobile.
- Tools: 2 columns desktop → 1 column mobile.
- Thumbnail stays 16:10 on larger layouts and shifts to 4:3 on narrow mobile for readability.
- Motion does not block navigation and is disabled/reduced under `prefers-reduced-motion`.

## Truth boundary

- `StudioOS` remains explicitly labeled `Product Concept · First Slice`.
- QTSC is linked as `Source` unless a live deployment is independently verified.
- Prototype/redesign work is not described as production deployment without repository evidence.
