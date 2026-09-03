# Final QA Report

## Result
**BLOCKED**

## QA target
- Requested target: `main@2c7c6ee7cbe82be98c42257854ca28a725e7ba8b`
- Preview: `https://haign12.github.io/DoAnhNghia_BAPortfolio/`
- Phase 2 PASSED candidate: `phase2/luxury-minimalism-implementation-20260903@aef6a7c7299e607058fb6e84aaa86062553194f1`
- Release authorization: `no_release`

FACT: live Home HTML SHA-256 equals exact `main` Home source SHA-256 (`64c164ef...`), so the live preview is still the OLD implementation rather than the Phase 2 candidate.

## Review A — OLD → NEW
DONE_VERIFIED as comparison evidence. Same-width Home comparisons at 1280/1440/1920 were opened and inspected.

The Phase 2 candidate is structurally different, not a reskin: Vietnamese editorial positioning, warm-ivory composition, supporting portrait, CTA/proof-first order and Work immediately after hero replace the OLD white grid/orbit/marquee/About-first composition.

However, the requested `main`/live target still renders the OLD side of that comparison. Therefore target-state implementation is not present.

## Review B — NEW → Design Contract
Phase 2 candidate: DONE_VERIFIED through Phase 2 gate/evidence.  
Requested main/live target: BLOCKED because it is not NEW.

Material target deviations:
1. **P0 [release/target]** — `main`/live does not contain the PASSED Phase 2 candidate.
2. **P1 [product]** — primary Home remains OLD: English copy, About before selected work, decorative grid/orbits/marquee, portrait/decorative first-screen logic; therefore it fails the approved proof-first luxury-minimal Design Contract.
3. **P1 [accessibility]** — visible desktop `.nav-menu` has `aria-hidden="true"` in main markup and OLD JS does not synchronize it to `false` on desktop; visible navigation is excluded from the accessibility tree.
4. **P2 material [SEO]** — main sitemap omits `case-study-vas-education.html`; candidate repaired this, main has not.

## Review C — NEW → NEW cross-page
Phase 2 candidate: DONE_VERIFIED via representative/cross-page renders. Home/LuxRoom/VAS/FlowCRM are materially differentiated and supporting Atelier/StudioOS regressions were fixed.

Main/live: local case routes return 200 and were rendered at 1440. Their OLD shared template is repetitive, but under the current user clarification these are supporting evidence routes rather than independent redesign targets. The critical unresolved drift is the primary Home target itself remaining OLD.

## QA dimensions

### Brand / hierarchy / composition
- Main/live brand mark and navigation are visible.
- Main/live does **not** implement the approved warm editorial portfolio signature.
- Phase 2 candidate does.
- Target result: BLOCKED by P0/P1 above.

### Navigation / CTA / critical actions
Live Selenium smoke verified:
- Home loads with HTTP 200.
- `mailto:` links exist.
- CV link resolves to the portfolio PDF; live route returns 200.
- theme toggle changes `data-theme` light → dark and `aria-pressed` becomes true.
- reduced-motion media query can be emulated and reports true.
- browser console captured no warning/severe entries during the smoke.

Accessibility caveat: the main desktop nav `aria-hidden` defect remains P1 and blocks accessibility baseline acceptance.

### Typography / language / content
- FACT: `main` uses `<html lang="en">` and English primary UI.
- Design/config language is Vietnamese and candidate is Vietnamese.
- Target main therefore fails content-language alignment.

### Media / crop / quality
- Main/live headless renders showed the hero portrait area blank at the three current capture widths. Because the same source asset is valid and Phase 2 candidate renders it, this is recorded as an **evidence/render risk**, not an additional product blocker without normal-GPU reproduction.
- Phase 2 media contract/candidate crop evidence remains valid for the intended NEW implementation.

### Route/functionality coverage
All requested local public routes and CV returned live HTTP 200:
Home, LuxRoom, Atelier, StudioOS, VAS, FlowCRM, CV.

No owned loading/error/success/retry/permission product states are applicable because the portfolio is static and has no form/auth/API/payment/search integration.

### Accessibility
Checked: semantics/source, heading/nav structure, keyboard signal, theme control, focus strategy source, reduced-motion signal, alt/source review.  
Not claimed: formal WCAG conformance or screen-reader certification.  
Blocker: visible desktop nav is `aria-hidden` in main target.

### Performance
Single GitHub-runner live network sample for Home HTML: 200, 16,850 bytes, ~0.0305 s total / ~0.0304 s TTFB. This is **lab/network evidence only**, not field CWV proof. Main selected authored HTML/CSS/JS and primary inspected media total remain lightweight relative to a media-heavy SPA, and no framework/video/3D runtime exists. No LCP/INP/CLS field claim is made because CrUX/RUM data was not supplied.

### Security / privacy
N/A_JUSTIFIED for application-security flows: no form/auth/payment/upload/API/personal-data collection or analytics integration detected. External URLs and `mailto:` are browser handoffs. Public contact information is intentional.

### SEO
- Home and local routes return 200.
- canonical/metadata exist in source.
- `robots.txt` references sitemap.
- main sitemap omits VAS → material P2.
- candidate sitemap fixes VAS, but no authorized release moved that fix to main.

### Browser / viewport
Chromium desktop:
- live + local main Home: 1280/1440/1920 opened/inspected;
- all local supporting case routes: live + local main at 1440 opened/inspected.
Mobile/tablet: N/A_JUSTIFIED by explicit scope.

## Remediation performed
Within current authority:
- Phase 2 Home P1 fixed and re-rendered.
- Phase 2 FlowCRM hierarchy P1 fixed and re-rendered.
- supporting linked-route shared-shell regressions fixed and re-rendered.
- candidate sitemap repaired.

Cannot remediate the remaining Final QA blockers without changing the requested `main`/live target. Doing that would be a merge/deploy/release action, explicitly outside `no_release` authority.

## Two-stage review
### A — Spec / intent compliance
**BLOCKED** on requested target: main/live does not contain the implementation that passed Phase 2.

### B — Code / experience quality
Phase 2 candidate: PASSED at its gate.  
Main/live target: has P1 accessibility + material SEO issue and remains OLD.

## Remaining severity
- P0: 1 — unreleased candidate / wrong production target state.
- P1: 2 — primary Home contract/locale mismatch; desktop nav accessibility-tree defect.
- material P2: 1 — sitemap VAS omission on main.
- P3: 0 material to final gate.

Final QA cannot be PASSED while any of these remain on the requested target.
