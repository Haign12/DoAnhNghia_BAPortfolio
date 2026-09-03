# Decision Log

Prior decisions remain effective unless superseded below.

## D-001 — Safe phase isolation
Phase work stays on dedicated branches; no destructive reset and no merge/deploy without authorization.

## D-002 — Desktop-only scope
Chromium 1280/1440/1920 is active; mobile/tablet `N/A_JUSTIFIED`. No fully-responsive claim.

## D-003 — Portfolio opportunity goal
EVIDENCE_BACKED_INFERENCE: portfolio should help recruiters/hiring leads/qualified collaborators judge UI/UX relevance, proof, experience and contact path quickly.

## D-004 — Preserve public URLs
Existing public local slugs/canonicals remain stable; candidate repairs VAS sitemap inclusion rather than URL churn.

## D-005 — Luxury minimalism = structural restraint
Warm neutral materiality, editorial hierarchy, hairlines, native project media and restrained accent; no faux-luxury effect stack.

## D-006 — Proof before biography
Home target sequence is positioning → selected work → experience/profile → contact.

## D-007 — Truthful contact/system reality
Email is a `mailto:` external handoff; no fake form/backend/success state.

## D-008 — Rendered evidence is mandatory
Screenshots must be opened/inspected; source/CI alone does not pass visual QA.

## D-009 — No unauthorized release
No merge/main update/Pages deploy/release occurs without a later explicit release authorization.

## D-010 — User scope narrows project-specific case depth
FACT: user clarified the objective is upgrading the portfolio interface, not redesigning individual personal projects. Home is the primary design target; local case pages are supporting linked evidence and only need portfolio-shell/route integrity. External project UX is N/A_JUSTIFIED.

## D-011 — Supporting-route regressions remain portfolio defects
Shared CSS visibly broke Atelier/StudioOS, so those routes were restored to a compatible shared shell without expanding into independent project redesign.

## D-012 — Home first-screen P1 fixed in root owner
`100vh`/end alignment/display dominance delayed proof. Candidate root `styles.css` was corrected and re-rendered at 1280/1440/1920.

## D-013 — Previous Phase 3 main/live target was a lifecycle conflict
- FACT: previous Phase 3 used `main@2c7c6ee...` + GitHub Pages as Final QA target while Phase 2 candidate remained unreleased.
- FACT: that made pre-release Final QA depend on a release action, while Phase 4 is the explicitly separate release/production-verification phase.
- Current request: fix Phase 3, then run Phase 4.
- Decision: supersede the previous target choice. Final QA must validate the immutable release candidate; main/live becomes the Phase 4 production baseline and post-release smoke target.
- Impact: this is a process correction, not a silent production claim. Previous main/live evidence is retained for Phase 4 comparison.

## D-014 — Exact Phase 3 candidate is frozen
- Candidate: `aef6a7c7299e607058fb6e84aaa86062553194f1`.
- QA run: `33779853151`.
- Artifact: `9903113470`.
- Decision: no implementation changes after this SHA without reopening Final QA.

## D-015 — Candidate Final QA passes
FACT: exact-candidate static, runtime, route and rendered checks all passed; screenshots were opened/inspected. P0/P1/material-P2 = 0, BLOCKED = 0, UNACCOUNTED = 0.

## D-016 — Production remains unverified until authorized Phase 4 release
`main` and GitHub Pages still represent the pre-release baseline at the time of this decision. Final QA PASSED does not mean production is updated. Production verification requires authorized release plus post-deploy smoke.
