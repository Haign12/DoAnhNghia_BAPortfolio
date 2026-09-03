# Assumptions, Risks and Limitations

## Assumptions

| ID | Assumption | Label | Risk | Mitigation |
|---|---|---|---|---|
| A-01 | Primary portfolio outcome is UI/UX hiring/opportunity conversation | EVIDENCE_BACKED_INFERENCE | medium | trace to current open-to-opportunities/resume/email structure; validate later with real review sessions |
| A-02 | Recruiter + design/product lead are primary audiences | EVIDENCE_BACKED_INFERENCE | medium | use current career positioning + hiring research; do not call it user research |
| A-03 | Potential client/collaborator is secondary | PROFESSIONAL_HYPOTHESIS | low | keep contact generic enough; do not let freelance sales needs distort hiring proof |
| A-04 | Current public URLs may have SEO/share equity | PROFESSIONAL_HYPOTHESIS due absent analytics | medium | preserve routes/canonicals by default |
| A-05 | Existing fonts can support Vietnamese luxury-editorial direction | PROFESSIONAL_HYPOTHESIS | low/medium | rendered glyph/wrap verification required before final token lock |

## Risks

### R-01 — Rendered baseline unavailable — P1 / BLOCKER
Actual OLD pixels at 1280/1440/1920 are unavailable in the current tool environment. Source structure is known, but crop/wrap/silhouette cannot be accepted as rendered evidence.

Mitigation/unblock: capture Chromium screenshots for the representative page-family matrix and visually inspect them.

### R-02 — Media focal points not visually verified — P1 tied to R-01
Asset roles/ratios are known, but exact focal/safe-crop coordinates cannot be finalized without visual inspection.

Mitigation: inspect source assets/rendered slots and record focal/safe zones before implementation.

### R-03 — No portfolio analytics/user research — P2
No real funnel, recruiter task success or contact data exists.

Mitigation: redesign claims remain hypothesis/evidence-based; no “conversion improved” claim. Future usability review with recruiters/design leads is recommended.

### R-04 — Language shift English → Vietnamese — P2
Current copy is English while config declares Vietnamese. Vietnamese headings can be longer and change composition pressure.

Mitigation: treat actual Vietnamese copy as design content; verify 1280/1366 wrapping before propagating layout.

### R-05 — Over-stylizing luxury — P2
Luxury can become cliché or harm portfolio scanning.

Mitigation: design contract defines luxury as restraint, warm materiality, typography and proof dominance; no gold/glass/animation dependency.

### R-06 — Page-family over-unification — P1 if ignored
Shared CSS can encourage every case study to use the same shell.

Mitigation: four required composition families with cross-page montage gate.

### R-07 — FlowCRM legacy CSS island — P2
Inline legacy styling can create drift or tempt CSS override stacking.

Mitigation: future implementation must identify shared foundations and refactor ownership rather than patch over it.

### R-08 — SEO evidence absent — P2
Search Console/backlink data not supplied.

Mitigation: preserve routes/canonicals/content intent; only repair known sitemap omission.

### R-09 — External links can change — P3
Live project destinations are outside this repo.

Mitigation: verify before release; do not represent availability as guaranteed.

## Limitations

- No rendered live-site screenshot capture succeeded in available environment.
- No analytics/Search Console/heatmaps/session recordings.
- No direct recruiter/hiring-lead interviews.
- No official brand book.
- No formal accessibility conformance test.
- No field performance data.
- No production release authorization.
- Mobile/tablet intentionally outside scope, not a limitation to be fixed in this Phase 1.

## Claims explicitly prohibited

Until evidence exists, do not claim:
- UX improved;
- conversion increased;
- recruiter preference validated;
- fully responsive;
- WCAG conformant;
- production-ready;
- secure/compliant;
- live analytics integration;
- successful message delivery from `mailto:`.