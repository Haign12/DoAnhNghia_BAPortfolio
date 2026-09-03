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

## D-009 — No release
`release_authorization=no_release`; no merge/main update/Pages deploy/release is allowed in these phases.

## D-010 — User scope narrows project-specific case depth
FACT: user clarified the objective is upgrading the portfolio interface, not redesigning individual personal projects. Home is the primary design target; local case pages are supporting linked evidence and only need portfolio-shell/route integrity. External project UX is N/A_JUSTIFIED.

## D-011 — Supporting-route regressions remain portfolio defects
Shared CSS visibly broke Atelier/StudioOS, so those routes were restored to a compatible shared shell without expanding into independent project redesign.

## D-012 — Home first-screen P1 fixed in root owner
`100vh`/end alignment/display dominance delayed proof. Candidate root `styles.css` was corrected and re-rendered at 1280/1440/1920.

## D-013 — Phase 3 target cannot be silently substituted
User explicitly specified `main` + GitHub Pages for Final QA. Candidate remains on a safe branch and release authority is `no_release`; therefore Final QA must inspect main/live rather than treat candidate as deployed.

## D-014 — Final QA target mismatch is confirmed, not assumed
- FACT: `main` is `2c7c6ee7cbe82be98c42257854ca28a725e7ba8b`.
- FACT: downloaded live Home HTML SHA-256 equals exact main Home source SHA-256 (`64c164efca6433b8e105dd348f2393f38f5a3c93663f093b6fe03806900f4738`).
- FACT: Phase 2 PASSED candidate is `aef6a7c7299e607058fb6e84aaa86062553194f1` and is 49 commits ahead of main.
- Decision: classify unreleased NEW as P0 target/release blocker; do not merge/deploy in Final QA.
- Impact: Final QA must remain BLOCKED until an authorized release puts approved NEW on the requested production source and live QA is rerun.

## D-015 — Headless portrait blank is evidence risk, not an invented product failure
Main/live headless screenshots show a blank portrait region, but the same valid asset renders in the candidate and source references are correct. Without normal interactive/GPU reproduction, log this as `[evidence]` uncertainty rather than adding an unsupported product blocker.
