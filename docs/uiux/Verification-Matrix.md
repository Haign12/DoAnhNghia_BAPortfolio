# Verification Matrix

Phase 1: PASSED.  
Phase 2: PASSED on candidate branch; see `Phase-2-Handoff.md`.

## Phase 3 Final QA — requested target main/live

| Change / requirement | Expected outcome | Method | Pass condition | Result |
|---|---|---|---|---|
| Exact QA target | inspect user-requested main/live, not a substitute | GitHub branch API + live HTML hash | exact SHA/state resolved | DONE_VERIFIED — main `2c7c6ee...`; live Home hash matches main |
| OLD → NEW | prove redesign is structural | same-width 1280/1440/1920 side-by-side inspection | hierarchy/composition/journey delta obvious | DONE_VERIFIED comparison; candidate is structural |
| NEW deployed to target | main/live contains PASSED Phase 2 implementation | source/live compare | target equals intended NEW | **BLOCKED** — target is OLD |
| Home → Design Contract | proof-first Vietnamese luxury-minimal Home | rendered target + source | contract hierarchy/locale/visual grammar present | **BLOCKED** |
| NEW candidate → Design Contract | candidate matches contract | Phase 2 renders/source | no material deviation | DONE_VERIFIED |
| NEW → NEW cross-page | no unjustified drift/legacy break | candidate montage + supporting route recheck | portfolio chrome coherent, supporting routes intact | DONE_VERIFIED candidate |
| Route coverage | all in-scope local public routes load | live curl + Chromium | Home/5 cases/CV resolve | DONE_VERIFIED — all 200 |
| Desktop visual matrix | declared widths inspected | live/local Chromium | Home 1280/1440/1920; support routes 1440 | DONE_VERIFIED |
| Navigation/critical links | actions reachable and truthful | Selenium/source/status | Work/contact/CV/project links available | DONE_VERIFIED functional smoke |
| Theme | real client state | Selenium | light→dark, aria state updates | DONE_VERIFIED |
| Reduced motion | user preference recognized | CDP media emulation + source | reduce signal true; nonessential marquee disabled | DONE_VERIFIED signal |
| Accessibility desktop nav | visible nav exposed to accessibility tree | markup/script inspection | visible desktop nav not `aria-hidden` | **BLOCKED** — main parent `aria-hidden=true` |
| Formal accessibility conformance | formal WCAG/AT certification | scope review | only if explicitly evaluated | N/A_JUSTIFIED — no formal conformance claim requested/performed |
| Media/crop | evidence slots inspected | rendered screenshots + Phase 2 media contract | no accepted NEW crop defect | DONE_VERIFIED candidate; main portrait blank capture logged as evidence risk |
| System Reality | no fake integration/success | source + interaction contract | STATIC/REAL/UNKNOWN truthful | DONE_VERIFIED |
| Performance | avoid unsupported performance claims; gather bounded evidence | file sizes + single live network sample | architecture/network evidence separated from field CWV | DONE_VERIFIED; field CWV not claimed |
| Security/privacy | evaluate applicable data surfaces | source reality review | no unreviewed sensitive flow | N/A_JUSTIFIED — no form/auth/API/payment/upload/analytics |
| SEO crawl/route coverage | metadata/canonical/robots/sitemap cover public routes | source + live status | sitemap includes all local public pages | **BLOCKED** — VAS omitted on main |
| Mobile/tablet QA | follow declared scope | scope check | N/A with rationale | N/A_JUSTIFIED |
| Release safety | no unauthorized merge/deploy | git/ref review | main unchanged under no_release | DONE_VERIFIED |
| Two-stage review | Stage A spec + Stage B quality explicitly run | Final QA report | both pass for target | **BLOCKED** — Stage A target compliance fails |

## Evidence
- Phase 3 run `33777846380`, artifact `9902336889`.
- Live route status: Home + five local cases + CV = 200.
- Live Home HTML source hash equals exact main source hash.
- Selenium live smoke: theme switch works, mailto/CV found, reduced-motion media true, no captured severe/warning console logs.
- All screenshot evidence cited in `Visual-Evidence-Index.md` was opened/inspected.

## Final gate state
BLOCKED > 0; P0/P1 remain on requested target. Final QA cannot pass.
