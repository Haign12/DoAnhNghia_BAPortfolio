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
No main update or deployment action occurs without explicit release authority.

## D-010 — User scope narrows project-specific case depth
FACT: user clarified the objective is upgrading the portfolio interface, not redesigning individual personal projects. Home is the primary design target; local case pages are supporting linked evidence and only need portfolio-shell/route integrity. External project UX is N/A_JUSTIFIED.

## D-011 — Supporting-route regressions remain portfolio defects
Shared CSS visibly broke Atelier/StudioOS, so those routes were restored to a compatible shared shell without expanding into independent project redesign.

## D-012 — Home first-screen P1 fixed in root owner
`100vh`/end alignment/display dominance delayed proof. Candidate root `styles.css` was corrected and re-rendered at 1280/1440/1920.

## D-013 — Previous Phase 3 main/live target was a lifecycle conflict
Final QA was corrected to validate the immutable release candidate; main/live is Phase 4 release and production-smoke territory.

## D-014 — Exact Phase 3 candidate is frozen
- Candidate: `aef6a7c7299e607058fb6e84aaa86062553194f1`.
- QA run: `33779853151`.
- Artifact: `9903113470`.
- No implementation change after this SHA without reopening Final QA.

## D-015 — Candidate Final QA passes
FACT: exact-candidate static, runtime, route and rendered checks passed. P0/P1/material-P2 = 0, BLOCKED = 0, UNACCOUNTED = 0.

## D-016 — Latest user instruction authorizes main update
FACT: user explicitly requested fixing Phase 4 and updating the accepted redesign onto `main`.
Decision: treat this as `merge_only` authority for the exact Final-QA commit; do not issue any separate/manual deployment command.

## D-017 — Preserve exact QA identity with fast-forward
FACT: candidate was 49 commits ahead and 0 behind current main, with branch protection disabled and no repository rulesets.
Decision: update `main` via non-force fast-forward to `aef6a7c7299e607058fb6e84aaa86062553194f1` rather than create a new merge/squash SHA.
Impact: released main SHA exactly equals Final-QA SHA; rollback history remains intact.

## D-018 — Automatic Pages deploy is observed, not manually invoked
FACT: moving main automatically triggered GitHub Pages run `33837927222`, which completed successfully on exact head `aef6a7c...`.
Decision: because production changed as a platform consequence of the authorized main update, run post-deploy smoke even though no manual deploy action was authorized or issued.

## D-019 — Production smoke passes
FACT: production smoke run `33838057673` completed successfully; artifact `9923950707` contains production screenshots and runtime/route evidence.
FACT: Home 1280/1440/1920 and five supporting routes at 1440 were opened/inspected; no material P0/P1 or material-P2 defect was observed.
Decision: Phase 4 may close with BLOCKED=0 and UNACCOUNTED=0.
