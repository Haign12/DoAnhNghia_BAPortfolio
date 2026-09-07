# Portfolio project CTA contract

Every project card on the homepage exposes exactly two actions:

1. `Live Demo` — opens an interactive/runnable experience.
2. `Case Study` — opens the portfolio narrative explaining problem, role, decisions, output and known evidence boundaries.

## Current mapping

| Project | Live Demo | Case Study |
|---|---|---|
| Atelier | https://ngh1aa.github.io/Atelier/ | `case-study-atelier.html` |
| LuxRoom | https://ngh1aa.github.io/LuxRoom/ | `case-study-luxroom.html` |
| Capital Place | https://ngh1aa.github.io/Capital/ | `case-study-capital-place.html` |
| VAS Education | https://ngh1aa.github.io/RedesignVAS/ | `case-study-vas-education.html` |
| Vietbank Redesign | https://ngh1aa.github.io/Redesign-Vietbank-Website/ | `case-study-vietbank.html` |
| QTSC | https://ngh1aa.github.io/QTSC/ | `case-study-qtsc.html` |
| StudioOS | https://ngh1aa.github.io/StudioOS/ | `case-study-studioos.html` |
| UI Feedback Tool | https://ngh1aa.github.io/ui-feedback-tool/ | `case-study-ui-feedback-tool.html` |
| skills_UIUX | `demo-skills-uiux.html` | `case-study-skills-uiux.html` |

`skills_UIUX` currently has no GitHub Pages deployment, so the portfolio provides its own interactive demo rather than mislabeling the repository page as a live product demo.

## UI contract

- exactly two action anchors per `.portfolio-actions` block;
- same order on every card: Live Demo, then Case Study;
- Live Demo uses primary treatment; Case Study uses secondary treatment;
- minimum interactive height: 44px desktop, 46px narrow mobile;
- reduced motion disables CTA translation;
- Source/Repository links belong outside project-card CTA areas if they are ever surfaced elsewhere.
