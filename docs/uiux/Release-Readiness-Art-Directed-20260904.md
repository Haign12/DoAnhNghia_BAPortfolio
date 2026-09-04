# Release Readiness — Art-Directed Portfolio — 2026-09-04

## Classification
- Scope: whole portfolio surface, Home primary + local case-study routes supporting
- Type: release
- Risk: medium
- Mode: production_candidate → production
- Target: `main` / GitHub Pages
- Standing release authorization: YES per D-019
- Locked skills version: V5 @ `e74849fd23ddb2fa062bb0e1e1101c84b6cfc1c0`

## Skill Activation Plan
| Task | Trigger/risk | Skill | Expected impact | Verification |
|---|---|---|---|---|
| Release candidate review | substantial UI release to `main` | `code-review-and-release` | separate intent compliance from code/experience quality; require post-deploy smoke | PR/merge identity + live smoke |
| UI evidence gate | art-directed visual changes | `ui-craft-and-visual-qa` | do not equate source/CI with rendered quality | opened 1280/1440/1920 Home + Work states + case captures |
| Regression evidence | shared Home/case owners changed | `testing-strategy` | risk-based viewport, interaction, route checks | Chromium desktop, keyboard preview, reduced motion, route smoke |

## Stage A — Spec / intent compliance
PASSED.

FACT: current request requires preserving the old English headline character and old typography logic while making the portfolio feel artistic and rewarding to explore for recruiters.

Verified implementation:
- English Home headline restored: `Designing clear products. Grounded in systems thinking.`
- Typography logic restored: `DM Sans + Instrument Serif + DM Mono`.
- Home Selected Work redesigned as an exploratory project index with direct links and focus/hover preview states.
- Personal projects remain supporting content; no independent product redesign scope was introduced.

## Stage B — Code / experience quality
PASSED for the release surface with the evidence below.

- Static contract: English language/headline + expected font imports/tokens + JS syntax.
- Home Chromium 1280/1440/1920: opened/inspected.
- Work explorer: LuxRoom/Atelier/VAS/FlowCRM state changes verified by focus; direct project links remain native anchors.
- Reduced-motion path preserves content and project preview interaction.
- Shared case-study typography and route integrity checked.
- Supporting route regression run `33843650831`: success for LuxRoom, Atelier, StudioOS, VAS and FlowCRM; no horizontal overflow, broken images or severe browser console errors.
- Product defect found during QA: `.hero-orbit-b` overflowed ~33–36px at 1280/1440. Fixed at root geometry; 1920 was already clean. Rendered Home after fix inspected.
- A release-candidate QA run later failed only because its legacy selector assumed `.case-index, .archive-status` existed on every case family; the affected case routes were then verified successfully with a selector-agnostic regression run. This is classified as an evidence-harness defect, not a product blocker.

## Release blockers
- P0: 0
- P1: 0
- Material P2: 0

## System Reality
- Portfolio content: STATIC.
- Navigation/theme/reveal/project-preview: REAL client-side behavior where verified.
- Mail/contact: browser `mailto:` handoff; no backend success state.
- No auth/payment/CMS/API migration or secrets involved in this release.

## Changed owners
- `index.html`
- `styles.css`
- `script.js`
- `case-study.css`
- local case-study HTML font imports/cache keys
- `docs/uiux/*` art-direction and release evidence

## Release identity
- Pre-release `main`: `fd58eeb72ae812e0b4e5803687c1232ac3adf098`
- Art-directed product candidate before release-doc commit: `e02c86838fe26bf588a41e5a1e3d386ff1f3b4bc`
- Release branch: `redesign/art-directed-discovery-20260904`
- Branch is a clean descendant of `main`; compare showed `ahead`, `behind_by=0` before final release-doc commits.

## Rollback
Preferred rollback is a safe Git revert of the merge/release commit or GitHub Pages previous-deployment mechanism if available. Do not force-reset `main`.

## Post-deploy smoke required
After merge to `main`:
1. confirm `main` contains the released branch head/merge;
2. verify GitHub Pages Home loads over HTTPS;
3. confirm live headline + typography identity;
4. check Home at representative desktop width and primary Work explorer behavior;
5. smoke local case routes and CV link;
6. confirm no obvious live horizontal overflow/visual regression.

Release readiness result: **PASSED FOR MERGE**.