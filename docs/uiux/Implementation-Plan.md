# Phase 2 Implementation Plan

## Phase classification
- Scope: whole-site
- Type: implementation + QA
- Risk: medium
- Mode: production_candidate
- Active viewport scope: desktop only — 1280 / 1440 / 1920, with 1366 / 1536 / 1600 pressure checks
- Browser: Chromium
- Release authorization: `no_release`

## Skill Activation Plan

| Task | Trigger/risk | Skill | Expected impact | Verification |
|---|---|---|---|---|
| orchestration/gates | whole-site production-candidate | `website-delivery-pipeline` | representative gate before rollout; no false completion | gate docs + matrix |
| safe multi-file edit | shared HTML/CSS/JS | `ai-agent-coding-guardrails` | isolated branch, reuse/refactor, no unrelated edits | diff + two-stage review |
| shared ownership | homepage + shared case shell + legacy FlowCRM | `frontend-architecture-and-refactoring` | fix root owners, avoid override chains | code/diff review |
| semantic implementation | static HTML/CSS/JS | `frontend-implementation` | contract becomes maintainable working UI | static checks + render |
| shared tokens/components | repeated visual language | `design-system-and-components` | coherent tokens/states without universal composition | cross-page review |
| media proof | portrait/project screenshots | `asset-media-and-art-direction` | native-color, safe crop/contain behavior | 1280/1440/1920 rendered inspection |
| a11y baseline | nav/theme/focus/motion | `accessibility` | semantic/keyboard/focus/reduced-motion baseline | source/manual browser checks |
| desktop pressure QA | explicit desktop-only scope | `responsive-and-device-strategy` | stable desktop behavior; mobile/tablet N/A | declared-width captures |
| rendered craft | structural visual redesign | `ui-craft-and-visual-qa` | macro-to-micro QA, cross-page diversity | opened screenshots/montage |
| risk-driven verification | production-candidate | `testing-strategy` | evidence-backed results only | Verification Matrix |

## Representative page gate

1. `index.html` — Family A / Home orientation + work hub. Covers primary journey entry, proof order, portrait/media, nav, resume/contact.
2. `case-study-luxroom.html` — Family B / Artifact-led Personal Case. Covers shared case owner, project proof, case narrative and live-project handoff.
3. `case-study-vas-education.html` — Family C / Change-Thesis Redesign. Covers page-role differentiation and project-native red evidence.
4. `case-study-ux.html` — Family D / Product-System Archive. Covers legacy inline-style drift and model/system evidence.

These four representatives cover every materially different composition family before rollout. Atelier/StudioOS are rollout routes after Family B passes.

## Root owners

| Goal | Owner/files | Dependencies | Expected behavior | Edge cases | Verification | Recovery concern |
|---|---|---|---|---|---|---|
| Home structural redesign | `index.html`, `styles.css`, `script.js` | existing assets/fonts | proof-first hierarchy; Work precedes background; truthful mailto/CV | 1280 title wrap, portrait load/crop, theme state | OLD/NEW renders + static interaction checks | preserve anchors/URLs/metadata |
| Shared case system | `case-study.css`, `case-study.js` | case HTML | common tokens/nav/type but page-specific top compositions | long titles, native media, deep entry | cross-page montage + focus/theme review | avoid page-local override cascade |
| LuxRoom representative | `case-study-luxroom.html` | shared case system + `luxroom.webp` | artifact-led masthead and clear rationale/proof | media legibility at 1280 | same-viewport OLD/NEW | preserve live link/canonical |
| VAS representative | `case-study-vas-education.html` | shared case system | Change Thesis visible above generic process; VAS red stays project evidence | wide comparison, source/live links | same-viewport OLD/NEW | preserve route/canonical |
| FlowCRM representative | `case-study-ux.html` | shared case system + `FLOW.png` | model-led system case, no legacy visual island | large flow artifact, long text | same-viewport OLD/NEW | do not invent metrics/data |
| Rollout Family B | Atelier + StudioOS | approved shared Family B | reuse system while keeping content/media sequencing distinct | title/media density | route matrix renders | do not force identical hero |
| SEO preservation | `sitemap.xml`, metadata in pages | existing URLs | all existing routes preserved; VAS indexed in sitemap | canonical mismatch | source/link audit | no redirect needed unless URL changes |

## Sequence
1. Reconcile stale Phase 1 status text; preserve passed contracts.
2. Implement representative structure from root owners.
3. Render OLD/NEW at identical widths and inspect.
4. Fix all representative P0/P1; re-render until representative gate passes.
5. Roll Family B system to Atelier/StudioOS; preserve role-specific media sequence.
6. Audit every primary local route at 1280/1440/1920 or representative pressure sampling defined in Route Coverage Matrix.
7. Run static/functional/a11y/SEO/system-reality/performance checks appropriate to this plain static stack.
8. Two-stage review: A spec/intent compliance; B code/experience quality.
9. Update required ledgers/handoff. No merge/deploy.

## Implementation constraints
- no framework migration;
- no new backend/form/analytics dependency;
- no fake success state;
- no mobile/tablet work; `N/A_JUSTIFIED`;
- no blanket grayscale;
- no universal case hero;
- no CSS patch stack hiding a shared root-owner defect;
- no release activity.
