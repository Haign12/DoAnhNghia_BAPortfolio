# Phase 3 Preflight — Final QA & Remediation

## Gate
Phase 2 Result: **PASSED** — `Phase-2-Handoff.md`.

## Classification
- Scope: whole portfolio surface with Home as primary design target; local cases are supporting linked routes.
- Type: final QA + remediation.
- Risk: medium/high because this is the release-candidate gate before production release.
- Mode: production_candidate.
- Browser/device: Chromium desktop 1280/1440/1920; mobile/tablet `N/A_JUSTIFIED`.
- Release authorization: Phase 3 performs no release action.

## Corrected exact target
Current request to fix Phase 3 and proceed to a separate Phase 4 release makes the lifecycle boundary explicit:
- Final QA target: `phase2/luxury-minimalism-implementation-20260903@aef6a7c7299e607058fb6e84aaa86062553194f1`.
- Production/main baseline remains `main@2c7c6ee7cbe82be98c42257854ca28a725e7ba8b` and is reserved for Phase 4 release/production verification.
- Production URL: `https://haign12.github.io/DoAnhNghia_BAPortfolio/`.

## Decision correction
FACT: the earlier Phase 3 run treated `main/live` as the Final QA target. That conflated pre-release candidate QA with post-release production verification and made Phase 3 impossible to pass under `no_release` even though the candidate itself had already closed the defects.

Decision: Final QA is rerun on the immutable Phase 2 candidate. `main/live` evidence from the previous run is retained as release baseline evidence for Phase 4 and is not used to falsely claim production verification.

## QA Skill Activation Plan
| Task | Trigger/risk | Skill | Material impact | Verification |
|---|---|---|---|---|
| rendered cross-page QA | visual release candidate | `ui-craft-and-visual-qa` | actual pixels required; cross-page regression gate | Chromium evidence opened/inspected |
| accessibility baseline | keyboard/focus/motion/semantics | `accessibility` | runtime desktop ARIA/focus/motion check; no formal conformance claim | browser smoke + source |
| performance | static portfolio media/fonts/runtime | `web-quality-and-performance` | bounded architecture/resource evidence only; no field overclaim | source/resource review |
| SEO | public portfolio/canonicals/sitemap | `seo-strategy` | route/indexability/sitemap coverage | source + route audit |
| system truth | static site/external handoffs | `system-reality-and-production-readiness` | no fake integration/success claim | System Reality matrix |
| verification | final multi-dimension QA | `testing-strategy` | requirement→method→pass→result evidence | Verification Matrix |
| release boundary | handoff to Phase 4 | `code-review-and-release` | exact candidate is frozen; production smoke deferred to authorized release | Completion Manifest |

Skill lock remains `Ngh1aa/skills_UIUX@e74849fd23ddb2fa062bb0e1e1101c84b6cfc1c0`.
