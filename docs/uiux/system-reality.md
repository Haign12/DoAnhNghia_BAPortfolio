# System Reality — Portfolio Redesign

Project mode: `production_candidate` · Release: `no_release`

| Capability | UI | Data/service | Reality | Evidence | Risk if misreported |
|---|---|---|---|---|---|
| Portfolio content | Yes | Repository HTML/media | STATIC | Source inspection | Low if facts preserved |
| Case-study navigation | Yes | Local HTML routes | REAL | Existing href routes | Broken portfolio journey |
| Live-project links | Yes | External GitHub Pages URLs | REAL external handoff | Existing source URLs | Broken proof path |
| Email contact | Yes | User mail client via `mailto:` | REAL external handoff | Existing href | Do not imply in-site message delivery |
| CV | Yes | Static PDF | REAL static asset | Repository PDF | Broken recruiter verification |
| Theme preference | Yes | Browser `localStorage` | REAL client behavior | `script.js` / `case-study.js` | Low |
| Reveal/scroll state | Yes | Browser APIs | REAL client behavior | Existing scripts | Content must not depend on motion |
| Contact form | No | None | NOT PRESENT | Source inspection | False lead capture if invented |
| CMS/backend/auth | No detected UI/service | None detected | STATIC / NOT PRESENT | Repo architecture | Do not call portfolio CMS-driven |
| Analytics | No verified evidence | UNKNOWN | UNKNOWN | No sufficient proof | Do not claim tracking/conversion data |

## Production gaps in current scope

- P1: rendered desktop visual/crop verification is still unavailable in the current environment.
- P2: analytics remains UNKNOWN; not required for this redesign implementation.
- N/A: form/API/auth/payment production contracts because those capabilities are intentionally not introduced.

## Truthful implementation rule

The redesign keeps contact as `mailto:` and does not add a visual success state. Static case-study statements remain factual or explicitly qualitative/unverified; no new KPI, testimonial, research result or client outcome may be fabricated.
