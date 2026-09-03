# Decision Log

Prior Phase 1 decisions remain effective unless superseded below.

## D-001 — Safe phase isolation
Phase work stays on dedicated branches; no destructive reset and no merge/deploy without authorization.

## D-002 — Desktop-only scope
User/project truth declares desktop-only. Chromium 1280/1440/1920 is active; mobile/tablet `N/A_JUSTIFIED`. No fully-responsive claim.

## D-003 — Portfolio opportunity goal
EVIDENCE_BACKED_INFERENCE: portfolio should help recruiters/hiring leads/qualified collaborators judge UI/UX relevance, proof, experience and contact path quickly.

## D-004 — Preserve public URLs
All existing public local slugs/canonicals are retained; VAS is added to sitemap rather than creating URL churn.

## D-005 — Luxury minimalism = structural restraint
Warm neutral materiality, strong editorial hierarchy, hairlines, native project media and restrained umber accent. No faux-gold gradient/glass/marble/card soup.

## D-006 — Proof before biography
Home sequence remains positioning → selected work → experience/profile → contact; work is not delayed by decorative intro content.

## D-007 — Truthful contact/system reality
No backend exists; email is `mailto:` external handoff. No fake form/success state.

## D-008 — Native project media
Global grayscale is removed; media acts as supporting proof.

## D-009 — Rendered evidence is mandatory
Screenshots must be opened/inspected. Source/build checks do not substitute visual QA.

## D-010 — No release
`release_authorization=no_release`; no PR merge, main update, Pages deploy or release action in Phase 2.

## D-011 — Current user scope supersedes project-specific case redesign depth
- FACT: user clarified the purpose is **upgrading the portfolio interface**, and individual personal projects do not need attention.
- Decision: Home is the primary design target. Local case-study routes are supporting linked evidence and are only required to preserve route/layout integrity and coherent portfolio chrome. External project sites are outside scope.
- Impact: project-specific content perfection, independent case redesign depth and external personal-project UX are `N/A_JUSTIFIED`; linked routes may still be fixed when shared portfolio CSS visibly breaks them.

## D-012 — Supporting route regressions are still portfolio defects
- FACT: shared `case-study.css` caused Atelier/StudioOS legacy HTML to render collapsed metadata/English drift.
- Decision: fix those routes only enough to restore the shared portfolio shell; do not expand into redesigning those products.
- Evidence: Chromium 1440 before/fix/recheck.

## D-013 — Home first-screen P1 fixed at root owner
- FACT: `100vh` + end alignment + hero-note delayed CTA/proof at 1280.
- Decision: fix `styles.css` hero layout directly, reduce display/portrait dominance and remove the count note from the first-screen composition.
- Evidence: final 1280/1440/1920 renders opened/inspected.

## D-014 — Phase 3 cannot silently substitute candidate for requested main target
- Current release authority remains `no_release`.
- If Phase 3 explicitly targets `main`/live while the PASSED candidate remains on a safe branch, QA must record that mismatch rather than merge/deploy automatically or pretend main contains the redesign.
