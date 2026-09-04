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

## D-015 — Current minimalism directive supersedes the warm/serif/bronze visual layer
- FACT: current user request explicitly requires smaller project thumbnails, sans-serif titles, Inter content, white background, black `#111111` buttons, black `#111111` highlights and a minimalism direction.
- Conflict: this contradicts the prior warm-ivory / serif-display / bronze-accent portions of the earlier Design Contract.
- Decision: current user request wins. The proof-first information hierarchy, content, routes, system reality and interaction behavior remain preserved; only the visual-system layer is remediated.
- Evidence: `Minimalism-Remediation-Contract.md` + exact-candidate rendered/runtime QA.

## D-016 — Reference websites are craft input, not UX proof
- FACT: web research included monochrome/minimal portfolio references emphasizing strict grids, sans typography, whitespace and restrained presentation.
- Reference label: `MOOD_REFERENCE`.
- Decision: transfer principles only; do not copy layouts and do not claim conversion/usability outcomes from gallery/template references.

## D-017 — Thumbnail size is owned by the Home project-media system
- FACT: first remediation at 1040px remained visually oversized on a 1440px viewport; StudioOS also expanded vertically because intrinsic image ratio remained active.
- Decision: fix the root owner in `styles.css`: default project thumbnail frame max width `880px`, Atelier `780px`, fixed 16:9 / 4:3 frames, and image `height:100%; object-fit:cover`.
- Verification: exact candidate `4cdf70d1c55bb134ea111ad6a0c959504c4c2e85`; final QA run `33840185528`; rendered thumbnail geometry 880×495 / 780×585 / 880×495 / 880×495, all directly inspected.

## D-018 — Art-directed discovery supersedes universal-Inter minimalism
- FACT: latest user feedback explicitly says the all-Inter minimal version is visually much weaker than the old portfolio, asks to keep English title content and the old font character, and requires a more artistic sense of discovery for recruiters.
- Conflict: this directly contradicts D-015's universal Inter / strict-minimal visual layer.
- Decision: current user instruction wins. Restore the OLD typography logic (`DM Sans + Instrument Serif + DM Mono`) and English primary Home chrome/headline, then redesign Selected Work into an exploratory project index while retaining recruiter clarity, direct links, project-native media and proof-first order.
- Reference evidence: `Design-Reference-Benchmark-Art-Directed.md`; references are labelled `MOOD_REFERENCE` / `CASE_STUDY` where appropriate and are not treated as UX/conversion proof.
- Implementation boundary: individual personal-project product UX remains outside redesign depth; only shared portfolio presentation and route integrity are in scope.

## D-019 — Standing authorization to update `main`
- FACT: user explicitly instructed: “từ nay về sau tự động cập nhật lên main”.
- Decision: for this Project, a candidate that has completed the applicable QA/release gate may be merged/updated to `main` automatically without asking for a second release confirmation.
- Safety boundary: this standing authorization does not permit bypassing P0/P1 blockers, destructive history rewrite, force-push rollback, or shipping an unverified candidate. A later explicit “không release / không cập nhật main” instruction overrides this standing rule for that task.
- Immediate impact: the current art-directed candidate is authorized for release after the release-readiness check and production smoke.