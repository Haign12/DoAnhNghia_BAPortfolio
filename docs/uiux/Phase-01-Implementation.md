# Phase 01 — Implementation

## Classification

- Scope: **whole-site**
- Type: **implementation + remediation + QA preparation**
- Risk: **medium**
- Mode: **production_candidate**
- Responsive scope: **desktop_only**
- Release authority: **no_release**
- Phase result: **BLOCKED** until implementation and verification gates close.

## Skill Activation Plan

| Task | Trigger/risk | Skill | Expected impact | Verification |
|---|---|---|---|---|
| Turn visual contract into reusable code | Shared tokens/chrome across homepage + case studies | `design-system-and-components` | Semantic tokens, shared patterns, fewer page-local patches | CSS owner review + representative compositions |
| Implement approved redesign | Whole-site code changes | `frontend-implementation` | Semantic HTML/CSS/JS following Design Contract | Source review + Chromium render when available |
| Preserve user work and fix root owners | Multi-file production-candidate edit | `ai-agent-coding-guardrails` | Safe branch, shared-root changes before local patches, no scope creep | Changed-file review |
| Keep real/static capability labels truthful | Portfolio has static content and external handoffs | `system-reality-and-production-readiness` | No fake form/analytics/CMS/success states | System reality matrix |
| Preserve keyboard/focus/reduced motion | Existing interaction and navigation | `accessibility` | Native semantics, visible focus, reduced motion | Source + manual keyboard/render evidence when possible |
| Verify material changes by risk | Shared homepage/case-study owners | `testing-strategy` | Verification matrix, desktop support matrix, blockers explicit | `Verification-Matrix.md` |

## Implementation tasks

1. Inspect remaining primary route content before editing.
2. Create shared semantic design tokens and layout primitives in `styles.css` / `case-study.css`.
3. Recompose homepage into Family A and reorder proof before biography.
4. Recompose personal case studies into Family B through shared root owner.
5. Give VAS redesign Family C and FlowCRM/archive Family D treatment.
6. Translate visible primary-route UI/content to Vietnamese while preserving factual names/URLs.
7. Preserve REAL external actions (`mailto`, CV, live sites), focus states and reduced-motion behavior.
8. Run source/static checks and then rendered desktop QA if environment allows actual media/pages.

## Scope guardrails

- No framework migration.
- No new backend/CMS/form/analytics integration.
- No route deletion.
- No PR/merge/deploy.
- No unrelated `.agents/skills` migration.
