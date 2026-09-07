# Portfolio V2 — Work Index Design Direction

## Goal

Turn the portfolio homepage from a small preview list into a recruiter-readable work index that can show the full UI/UX practice without becoming a generic card gallery.

## Skill routing used

- `portfolio-website` — prioritize relevant work, role/process evidence and contact path over gallery-only presentation.
- `visual-design-direction` — define a repeatable layout grammar with controlled variation by project role/domain.
- `asset-media-and-art-direction` — avoid arbitrary screenshot crops; thumbnails are purpose-built responsive compositions.
- `design-system-and-components` — one thumbnail/card anatomy, semantic project tokens and shared responsive states.
- `brand-distinctiveness-and-visual-signature` — preserve one portfolio identity while giving each project a recognizable domain cue.
- `ui-craft-and-visual-qa` — keep contrast, hover/focus, mobile density and reduced motion reviewable.

## Information architecture

```text
Selected Work
├── Featured Case Studies (4)
│   ├── Atelier
│   ├── Vietbank Redesign
│   ├── Capital Place
│   └── VAS Education
├── Project Archive (6)
│   ├── QTSC
│   ├── HireFlow
│   ├── LuxRoom
│   ├── FlowCRM
│   ├── StudioOS
│   └── Veil
└── Tools & Systems (2)
    ├── UI Feedback Tool
    └── skills_UIUX
```

## Thumbnail system

Every project uses the same outer contract:

`index/category → 16:10 stage → browser frame → project label/title → domain geometry → project meta/tags/actions`

Consistency comes from anatomy, type, spacing, border and motion. Distinctiveness comes from a small semantic palette plus a domain composition family.

### Composition families

- `commerce` — editorial/product decision surface.
- `finance` — structured financial/dashboard bars.
- `property` — architectural vertical/floor-plan cue.
- `education` — pathway/progression pills.
- `ecosystem` — connected directory/service blocks.
- `workspace` — modular task/dashboard panels.
- `editorial` — asymmetric editorial/product mood.
- `tool` — dark utility/system interface.

No thumbnail depends on `object-fit: cover`, so project comparison stays stable across desktop and mobile without focal-subject crop risk.

## Visual signature

If the logo/header is removed, the portfolio should still be recognizable through:

- warm paper + near-black editorial system;
- DM Sans + Instrument Serif contrast;
- mono indexing and metadata;
- thin technical grid/line language;
- large structured typography;
- restrained motion and project-specific browser compositions.

## Responsive rules

- Featured: 2 columns desktop → 1 column tablet/mobile.
- Archive: 3 columns desktop → 2 columns medium → 1 column mobile.
- Tools: 2 columns desktop → 1 column mobile.
- Thumbnail remains 16:10 on all viewports.
- Motion never blocks navigation and is disabled/reduced under `prefers-reduced-motion`.

## Truth boundary

- `StudioOS` is labeled as a first product slice rather than a completed SaaS platform.
- Prototype/redesign work is not described as production deployment unless the repository itself supports that claim.
- External project links should only be labelled `Live` when a published site is verified; otherwise use `Source`.
