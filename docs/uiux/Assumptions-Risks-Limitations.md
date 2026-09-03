# Assumptions, Risks and Limitations — Final QA

## Current assumptions / evidence boundaries
| ID | Statement | Label | Final handling |
|---|---|---|---|
| A-01 | Portfolio opportunity/hiring conversation is the primary business outcome | EVIDENCE_BACKED_INFERENCE | no conversion uplift claim; retain proof/CV/contact journey |
| A-02 | Recruiter/design lead is the primary audience | EVIDENCE_BACKED_INFERENCE | no claim that direct user interviews were conducted |
| A-03 | Official brand guideline does not exist in supplied project truth | UNKNOWN / Brand Status C | digital visual direction remains proposed, not official corporate guidance |
| A-04 | Field performance/user analytics are unavailable | FACT from inspected source/evidence | no field CWV/conversion claim |

## Active risks / blockers

### R-01 — Requested target does not contain PASSED implementation — P0 / BLOCKED
FACT: `main@2c7c6ee...` and live Home are exact OLD state. Phase 2 PASSED candidate is `aef6a7c...` on a safe branch.

Unblock: authorized release phase must merge/deploy the accepted candidate (or an explicitly approved successor), then Final QA must rerun production/live smoke and visual comparison on the deployed SHA.

### R-02 — Primary Home target fails approved contract — P1 / BLOCKED
Main/live remains English, About-first and decorative OLD composition rather than the approved Vietnamese proof-first luxury-minimal Home.

Unblock: same authorized release as R-01, followed by rerender/inspection.

### R-03 — Visible desktop nav is `aria-hidden` — P1 / BLOCKED
Main markup sets the visible `.nav-menu` to `aria-hidden="true"`; OLD script only toggles it in mobile-menu behavior and does not synchronize desktop visible state.

Candidate implementation already addresses desktop ARIA synchronization. Unblock requires authorized release plus keyboard/accessibility regression smoke.

### R-04 — Main sitemap omits VAS — material P2 / BLOCKED
VAS route is live 200 but absent from main sitemap. Candidate includes it.

Unblock requires authorized release and live sitemap verification.

## Resolved prior risks
- Phase 1 rendered OLD baseline: resolved with Chromium evidence.
- Phase 1 media/focal evidence: resolved.
- Phase 2 Home first-screen hierarchy: resolved on candidate and re-rendered.
- Phase 2 FlowCRM model hierarchy: resolved on candidate and re-rendered.
- Atelier/StudioOS shared-shell regression: resolved on candidate and re-rendered.

## Limitations
- Release authorization remains `no_release`; Final QA cannot mutate main or deploy GitHub Pages.
- No formal screen-reader/WCAG conformance evaluation; only scoped keyboard/semantics/motion baseline was performed.
- No field CrUX/RUM/performance data.
- No analytics/Search Console/heatmaps/session recordings.
- No direct recruiter/hiring-lead research participants.
- Mobile/tablet intentionally outside declared QA scope.
- Headless main/live captures showed blank portrait media; because source asset is valid and candidate renders it, this remains an evidence-render risk unless reproduced in normal interactive Chromium.

## Claims prohibited by current evidence
Do not claim: Final QA passed, redesign live, fully responsive, WCAG conformant, field CWV passed, conversion improved, analytics integrated, secure/compliant certification, or successful site-owned email delivery.
