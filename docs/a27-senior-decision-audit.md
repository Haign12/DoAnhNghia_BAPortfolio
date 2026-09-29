# A27 — Senior Decision Evidence Audit

This audit treats missing evidence as a visible gap rather than converting it into senior-sounding claims.

## Policy

- No invented team size, PM/engineering/stakeholder collaboration, client pressure, failure, pivot or business outcome.
- Existing public case text is the default source of truth; verified repository history is used only when explicitly labeled.
- `UNKNOWN / NOT DOCUMENTED / NOT AVAILABLE` is an acceptable state until evidence exists.
- A27 snapshots are recruiter-scan summaries, not new research findings.

## Audit summary

- **Alternatives documented:** 5/18
- **Trade-offs documented:** 6/18
- **Team composition documented:** 0/18
- **Engineering boundary documented:** 2/18
- **Failure/pivot documented:** 1/18

## Case matrix

| Case | Options | Trade-off | Team | Eng. boundary | Failure / pivot |
|---|---:|---:|---:|---:|---:|
| ACCESS | YES | YES | GAP | GAP | GAP |
| Atelier | GAP | GAP | GAP | GAP | GAP |
| Capital Place | GAP | GAP | GAP | GAP | GAP |
| CENNEXT | GAP | YES | GAP | GAP | GAP |
| Flux | YES | YES | GAP | GAP | GAP |
| LuxRoom | GAP | GAP | GAP | GAP | GAP |
| Nova | YES | YES | GAP | YES | GAP |
| QTSC | GAP | GAP | GAP | GAP | GAP |
| Sentry | YES | YES | GAP | YES | GAP |
| skills_UIUX | GAP | GAP | GAP | GAP | GAP |
| StudioOS | GAP | GAP | GAP | GAP | GAP |
| UI Feedback Tool | GAP | GAP | GAP | GAP | GAP |
| UIUX Factory | YES | YES | GAP | GAP | YES |
| FlowCRM | GAP | GAP | GAP | GAP | GAP |
| VAS Education | GAP | GAP | GAP | GAP | GAP |
| Vietbank Redesign | GAP | GAP | GAP | GAP | GAP |
| Violet Marketplace | GAP | GAP | GAP | GAP | GAP |
| VOLTIS | GAP | GAP | GAP | GAP | GAP |

## Interpretation

- Alternatives/trade-offs are counted only when the public case records selected/rejected/deferred choices or an explicit trade-off section.
- UIUX Factory, Flux, Nova and Sentry contain explicit selected/rejected decision evidence; other cases remain gaps unless their source proves otherwise.
- UIUX Factory is the only case with a verified failure/repair story in A27: rendered correctness once masked stale raw-source defects, which led to independent raw-source and rendered gates.
- Team composition is not publicly evidenced in any local case today. Independent concepts/tests are labeled as such rather than being rewritten as cross-functional work.
- The next content pass should add real decision records only where source evidence exists; it should not make every case look artificially complete.

## Recruiter-scan placement

The 11-field A27 snapshot is placed immediately after each case hero so role, team boundary, constraint, alternatives, decision, trade-off, engineering reality, system impact, failure/pivot evidence, current evidence state and next decision can be scanned before the long-form narrative.
