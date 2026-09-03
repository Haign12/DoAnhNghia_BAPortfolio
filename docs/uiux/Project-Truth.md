# Project Truth — Phase 1

Checked: 2026-09-03
Baseline source commit: `2c7c6ee7cbe82be98c42257854ca28a725e7ba8b` (`main`)
Phase branch: `phase1/luxury-minimalism-research-20260903`

## Phase classification

- Scope: **whole-site**
- Type: **research | audit | redesign**
- Risk: **medium** — material brand/composition/content changes, but no money/auth/private-data flow found.
- Mode: **production_candidate**
- Declared responsive scope: **desktop_only**
- Declared browser: **Chromium**
- Required desktop viewports: **1280 / 1440 / 1920 px**
- Desktop pressure points added for QA planning: **1366 / 1536 / 1600 px**
- Tablet/mobile: **N/A_JUSTIFIED** by current user instruction and Project Config.
- Release authorization: **no_release**.
- Phase constraint: **NO SOURCE CODE EDITS**. Only `docs/uiux/*` artifacts may be created/updated.

## Source-of-truth priority

1. Current user request and Project Config.
2. Repository `main` at the baseline SHA above.
3. Existing project evidence/content.
4. Locked `skills_UIUX` V5.
5. External research/reference sources.

## Repository / implementation truth

| Dimension | Finding | Evidence label | Evidence |
|---|---|---|---|
| Architecture | Static multi-page website using HTML/CSS/vanilla JS | FACT | `index.html`, `styles.css`, `script.js`, case-study HTML/CSS/JS |
| Framework/build | No framework/build tool detected at root; files are directly deployable static assets | FACT | root tree at baseline SHA |
| Primary routes | Home + LuxRoom + Atelier + StudioOS + FlowCRM + VAS Education case-study routes | FACT | root HTML files + `sitemap.xml` |
| Shared presentation | Home uses `styles.css`; most case studies use shared `case-study.css`/`case-study.js`; FlowCRM contains large page-local CSS | FACT | source inspection |
| Data/API/CMS | No API/CMS/backend integration found | FACT within inspected source | source inspection |
| Contact | `mailto:` handoff; no contact form endpoint found | FACT | `index.html` |
| Resume | Static PDF download/open path | FACT | `Do_Anh_Nghia_CV.pdf`, homepage nav |
| SEO | Canonical, OG/Twitter metadata and Person/CreativeWork JSON-LD exist on inspected routes | FACT | HTML `<head>` source |
| Robots | `/docs/` and `/cv/` disallowed; sitemap declared | FACT | `robots.txt` |
| Sitemap gap | VAS route exists but is absent from current `sitemap.xml` | FACT | route inventory vs `sitemap.xml` |
| Deployment | Public URL is GitHub Pages-shaped; repository deploy workflow/config not found | EVIDENCE_BACKED_INFERENCE | current URL + absence of `.github` workflow in inspected tree |
| Analytics | No analytics integration found in inspected source | FACT for inspected source; external runtime UNKNOWN | source inspection |
| Brand guideline | No official brand guideline found; a project-owned logo asset exists | FACT | `assets/images/logo.png`; repository inventory |

## Existing assets

- Portrait: `assets/images/avatar.webp`
- Project proof media: `luxroom.webp`, `altelier.webp`, `studioos.webp`, `FLOW.png`, `capital-place.jpg`
- Social images: LuxRoom / Atelier / StudioOS
- Brand/utility: `logo.png`, `cap.png`
- CV: `Do_Anh_Nghia_CV.pdf`

## Existing content truth

`content-gap-research-notes.md` explicitly states that the current case studies are visually coherent but thin in decision narrative and that no private analytics, usability-test results, client metrics or research transcripts were supplied. Business/user impact must therefore not be fabricated.

## Business goal status

The Project Config left `primary_business_goal`, `known_target_audience`, and `known_conversion_actions` blank. Based on the current positioning, open-to-opportunities message, resume link, case studies and email CTA:

- Primary business goal: **earn qualified UI/UX job/interview or project conversations by demonstrating design thinking and visual/product craft** — EVIDENCE_BACKED_INFERENCE.
- Primary conversion: **start a direct conversation by email after reviewing proof** — EVIDENCE_BACKED_INFERENCE.
- Supporting conversions: **open a relevant case study, view a live project, view/download the CV** — FACT as available actions.

These are working decisions for Phase 1, not user-research findings.

## Skill Activation Plan

| Task | Trigger / risk | Skill | Expected effect | Verification |
|---|---|---|---|---|
| Orchestrate Phase 1 | whole-site production-candidate redesign | `website-delivery-pipeline` | no-code gate, required contracts, phase gates | artifact/ledger review |
| Respect project truth | existing repo + explicit desktop-only constraint | `project-context` | prevent generic rules overriding repo/user constraints | Project Truth + Decision Log |
| Keep context focused | many available skills | `adaptive-skill-routing-and-context-budget` | smallest applicable graph | Skill Execution Ledger |
| Audit OLD site | redesign existing implementation | `website-audit-and-redesign` | KEEP/IMPROVE/REMOVE/ADD, preserve list, redesign delta | Current-Site-Audit + Delta Contract |
| Portfolio journey | personal UI/UX portfolio | `portfolio-website` | proof-first hiring journey | Audience/Content/Contract |
| Audience/tasks | business fields partly UNKNOWN | `audience-intent-and-top-tasks` | evidence/assumption separation | audience matrix |
| IA | multiple deep-entry case studies | `information-architecture` | route/page-role/navigation model | IA-and-Sitemap |
| Reference research | requested luxury minimalism; avoid aesthetic-only cloning | `design-reference-research-and-benchmark` | production-led reference roles | Reference-Benchmark |
| Brand/visual | no official brand book | `brand-guidelines` + `visual-design-direction` | proposed, implementable luxury-minimal grammar | Brand-and-Visual-Direction + Page-Role-Matrix |
| Media/crop | portfolio relies on project imagery/portrait | `asset-media-and-art-direction` | focal/crop/safe-zone contract | Media-Contract |
| Shared system | repeated CSS and case-study patterns | `design-system-and-components` | token/component ownership without template monotony | Design-System |
| Truthful functionality | production-candidate static site | `system-reality-and-production-readiness` | REAL/STATIC/UNKNOWN labeling | System-Reality-and-Data-Contracts |
| Desktop-only QA | explicit scope | `responsive-and-device-strategy` | desktop pressure-width strategy; mobile/tablet N/A | Responsive-Browser-Strategy |
| A11y baseline | interactive nav/theme/links/media | `accessibility` | semantic/focus/motion requirements | audit + verification matrix |
| Verification | Phase 1 hard gates and future implementation | `testing-strategy` | testable pass conditions | Verification-Matrix |

## Phase integrity

No HTML, CSS, JS, assets, build/deploy files, sitemap, robots or application behavior are to be changed in Phase 1. The branch exists solely to store pre-design evidence and contracts.