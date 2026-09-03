# Sitemap / Page-Family Coverage — Final QA

QA target: `main@2c7c6ee7cbe82be98c42257854ca28a725e7ba8b` + live GitHub Pages.

| Route | Current role | Live HTTP | Rendered/inspected | Contract scope | Final status |
|---|---|---:|---|---|---|
| `/` | PRIMARY portfolio orientation/proof/contact | 200 | 1280/1440/1920 | full Design Contract / Delta | BLOCKED — live is OLD |
| `case-study-luxroom.html` | supporting case evidence | 200 | 1440 | route integrity only under current user scope | DONE_VERIFIED |
| `case-study-atelier.html` | supporting case evidence | 200 | 1440 | route integrity only | DONE_VERIFIED |
| `case-study-studioos.html` | supporting case evidence | 200 | 1440 | route integrity only | DONE_VERIFIED |
| `case-study-vas-education.html` | supporting redesign evidence | 200 | 1440 | route integrity only | DONE_VERIFIED route; BLOCKED sitemap inclusion on main |
| `case-study-ux.html` | supporting product/system evidence | 200 | 1440 | route integrity only | DONE_VERIFIED |
| `Do_Anh_Nghia_CV.pdf` | utility proof/handoff | 200 | link/status | preserve | DONE_VERIFIED |
| external personal-project sites | browser handoffs | not owned | not project-QA targets | excluded by current user clarification | N/A_JUSTIFIED |
| tablet/mobile | device variants | — | — | explicitly excluded | N/A_JUSTIFIED |

## Page-family interpretation
Current user clarification narrows the design objective: the portfolio itself is the product. Case-study pages are supporting evidence routes and are not required to receive independent product redesign depth. They are still checked for route integrity because Home links to them.

## Sitemap finding
FACT: target main sitemap includes Home, FlowCRM, Atelier, LuxRoom and StudioOS but omits VAS. VAS itself returns HTTP 200. Phase 2 candidate repaired the sitemap; main remains unrepaired under no-release authority.

## Coverage accounting
- Primary portfolio routes in active design scope: 1 / 1 inspected.
- Supporting local HTML routes: 5 / 5 inspected.
- Utility CV: inspected by live status/link contract.
- Uninspected in-scope local primary routes: 0.
