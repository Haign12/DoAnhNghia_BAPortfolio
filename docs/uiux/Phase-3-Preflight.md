# Phase 3 Preflight — Final QA & Remediation

## Gate
Phase 2 Result: **PASSED** — `Phase-2-Handoff.md`.

## Classification
- Scope: whole portfolio surface with Home as primary design target; local cases are supporting linked routes.
- Type: QA + remediation + release-readiness assessment.
- Risk: high because requested QA target is `main`/live but Phase 2 candidate is unreleased.
- Mode: production_candidate.
- Browser/device: Chromium desktop 1280/1440/1920; mobile/tablet `N/A_JUSTIFIED`.
- Release authorization: `no_release`.

## Exact targets
- User-requested branch target: `main@2c7c6ee7cbe82be98c42257854ca28a725e7ba8b`.
- Preview: `https://haign12.github.io/DoAnhNghia_BAPortfolio/`.
- Phase 2 PASSED candidate/handoff: `phase2/luxury-minimalism-implementation-20260903@aef6a7c7299e607058fb6e84aaa86062553194f1`.

## Material conflict
FACT: `main` is still the original baseline SHA; it is not the PASSED Phase 2 candidate. User asked Final QA against `main` and live preview while release authority remains `no_release`.

Decision: do not auto-merge/deploy or silently change QA target. Final QA will inspect exact main/live and use the PASSED Phase 2 candidate as NEW comparison evidence. If main/live remains OLD, target-state compliance is BLOCKED until release authorization changes and the candidate is released through an authorized phase.

## QA Skill Activation Plan
| Task | Trigger/risk | Skill | Material impact | Verification |
|---|---|---|---|---|
| rendered cross-page QA | redesign + visual release gate | `ui-craft-and-visual-qa` | actual pixels required; macro→micro; cross-page drift | Chromium evidence opened/inspected |
| accessibility baseline | keyboard/focus/motion/semantics | `accessibility` | manual keyboard signal required; no conformance overclaim | Selenium/tab + source + visual checks |
| performance | static portfolio media/fonts/runtime | `web-quality-and-performance` | distinguish lab/network/architecture from field data | resource/network evidence; no CWV field claim |
| SEO | public portfolio/canonicals/sitemap | `seo-strategy` | route/indexability metadata checked | source + live status audit |
| system truth | static site/external handoffs | `system-reality-and-production-readiness` | no fake integration/success claim | System Reality matrix |
| verification | final multi-dimension QA | `testing-strategy` | requirement→method→pass→result evidence | Verification Matrix |
| release-readiness | main/live mismatch + no_release | `code-review-and-release` | Stage A/B split; target mismatch blocks release-quality pass | Final QA report + Completion Manifest |

Skill lock remains `Ngh1aa/skills_UIUX@e74849fd23ddb2fa062bb0e1e1101c84b6cfc1c0`; no skill ref change.
