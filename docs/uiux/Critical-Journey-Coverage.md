# Critical Journey Coverage — Final QA

Primary journey contract: `identify role → inspect relevant proof → verify experience/CV → contact`.

| Journey / task | Target evidence | Result | Status |
|---|---|---|---|
| Arrive on portfolio and identify designer/role | live Home render + title/source | OLD main identifies UI/UX designer, but not the approved Vietnamese NEW positioning | BLOCKED against Design Contract |
| Reach selected work/proof | live Home + keyboard smoke | Work CTA is reachable; OLD journey still places About before Work in document sequence | BLOCKED against proof-first Delta |
| Open local case evidence | live HTTP + keyboard/tab + route renders | LuxRoom/Atelier/StudioOS/VAS/FlowCRM routes return 200 | DONE_VERIFIED |
| Open CV | live link + status | PDF URL found; live HTTP 200 | DONE_VERIFIED |
| Contact by email | live Selenium/source | `mailto:` links present; no fake delivery success | DONE_VERIFIED |
| Switch visual theme | live Selenium | light → dark, `aria-pressed=true` | DONE_VERIFIED |
| Keyboard navigate critical controls | live Selenium + source | CTAs/project links keyboard-focusable; however visible desktop nav parent is `aria-hidden=true` | BLOCKED accessibility baseline |
| Reduced motion preference | live CDP media emulation + source | media query reports true and OLD CSS disables marquee animation | DONE_VERIFIED signal |
| Navigate external personal-project websites | external handoff only | destination UX/content not owned by this portfolio project | N/A_JUSTIFIED |

## Conversion / decision context
No conversion analytics are present. Contact is an external email handoff and cannot prove message delivery or conversion. Final QA makes no conversion-uplift claim.

## Journey blockers
1. Target Home is still OLD and violates the approved proof-first sequence.
2. Desktop navigation accessibility-tree state is incorrect on target main/live.
