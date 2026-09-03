# System Reality and Data Contracts — Final QA

Project mode: `production_candidate`. Architecture: static HTML/CSS/JS.

## Requested target reality
| Surface/capability | Reality | Final QA evidence |
|---|---|---|
| Git branch target | REAL repository state | `main@2c7c6ee7cbe82be98c42257854ca28a725e7ba8b` |
| GitHub Pages Home | REAL deployed static page | HTTP 200; downloaded Home HTML hash exactly matches main Home source |
| Portfolio/case content | STATIC | repository/deployed HTML |
| In-page navigation | REAL client-side | native anchors; Selenium keyboard smoke reached primary CTA/project links |
| Theme switch | REAL client-side | Selenium light→dark and `aria-pressed=true` |
| Reduced-motion preference | REAL browser preference signal | CDP emulation reports reduce; CSS contains reduced-motion handling |
| Email contact | REAL external handoff | `mailto:`; website does not know delivery success |
| CV | STATIC + REAL browser navigation | live PDF HTTP 200 |
| External project sites | REAL external navigation intent | not portfolio integrations; uptime/content outside project authority |
| Local case routes | STATIC | five case-study routes return live 200 |
| Contact form | N/A | absent |
| Search/filter | N/A | absent |
| Auth/account | N/A | absent |
| Backend/API/CMS/payment/upload | N/A | absent |
| Analytics | UNKNOWN | no integration found; no analytics-based outcome claim |

## Critical release reality
FACT: the Phase 2 PASSED candidate is **not deployed to main/live**. Therefore it is incorrect to call the redesigned portfolio live, released, production-ready or Final-QA-passed.

Candidate source reality remains static and truthful, but release state is separate from implementation state.

## Data/security/privacy boundary
No owned collection flow, form, authentication, payment, upload, API or analytics was introduced. Public email/phone/contact links are intentional static contact data. Theme preference is local non-sensitive state.

## False-claim prevention
Do not claim:
- redesign is live;
- email was sent successfully by the site;
- external project sites are integrated services;
- analytics/conversion improvement exists;
- field Core Web Vitals pass exists;
- formal WCAG conformance exists.

System Reality itself is DONE_VERIFIED; the Final QA blocker is release/target-state compliance, not an unknown backend dependency.
