# Portfolio project CTA contract

Every project card on the homepage exposes exactly two actions:

1. Primary proof action — `Live Demo` for interactive prototypes, or `Source Code` for repository-first tools/systems.
2. `Case Study` — opens the portfolio narrative explaining problem, role, decisions, output and known evidence boundaries.

## Current mapping

| Project | Primary proof | Case Study |
|---|---|---|
| Atelier | https://ngh1aa.github.io/Atelier/ — `Live Demo` | `case-study-atelier.html` |
| LuxRoom | https://ngh1aa.github.io/LuxRoom/ — `Live Demo` | `case-study-luxroom.html` |
| Capital Place | https://ngh1aa.github.io/Capital/ — `Live Demo` | `case-study-capital-place.html` |
| VAS Education | https://ngh1aa.github.io/RedesignVAS/ — `Live Demo` | `case-study-vas-education.html` |
| Vietbank Redesign | https://ngh1aa.github.io/Redesign-Vietbank-Website/ — `Live Demo` | `case-study-vietbank.html` |
| QTSC | https://ngh1aa.github.io/QTSC/ — `Live Demo` | `case-study-qtsc.html` |
| StudioOS | https://ngh1aa.github.io/StudioOS/ — `Live Demo` | `case-study-studioos.html` |
| UI Feedback Tool | https://github.com/Ngh1aa/ui-feedback-tool — `Source Code` | `case-study-ui-feedback-tool.html` |
| skills_UIUX | https://github.com/Ngh1aa/skills_UIUX — `Source Code` | `case-study-skills-uiux.html` |

## UI contract

- exactly two action anchors per `.project-actions` block;
- same order on every card: primary proof, then Case Study;
- primary proof uses the filled treatment; Case Study uses the secondary treatment;
- minimum interactive height: 44px desktop, 46px narrow mobile;
- reduced motion disables CTA translation;
- use `Source Code` only when the repository is the intended primary artifact; do not mislabel a repository as a live product demo.
