# Home UI Improvement — 2026-09-04

Phase result: **IN PROGRESS**

## Classification
- Scope: `page` (Home only; shared case-study composition is preserved)
- Type: `remediation + implementation + QA`
- Risk: `medium` (high-visibility portfolio surface, CSS overflow/crop + IA labeling + motion)
- Mode: `production_candidate → production`
- Branch: `remediation/css-ux-project-groups-motion-20260904`
- Browser/device scope: Chromium desktop; user evidence adds short-height/narrow-desktop pressure at ~1268×642 and 1881×782 to the existing 1280/1440/1920 width matrix. Mobile/tablet remain `N/A_JUSTIFIED` for this phase.
- Locked skills: `Ngh1aa/skills_UIUX` V5 @ `e74849fd23ddb2fa062bb0e1e1101c84b6cfc1c0`.

## Skill Activation Plan
| Task | Trigger / risk | Skill | Expected impact | Verification |
|---|---|---|---|---|
| inspect/route remediation | existing implemented UI, user supplied failure screenshots | `website-delivery-pipeline`, `adaptive-skill-routing-and-context-budget`, `project-context`, `ui-improvement` | narrow Home remediation, preserve current art-directed identity and routes | source + rendered QA |
| portfolio work hierarchy | recruiter scanning + mixed project types | `portfolio-website` | split projects into explicit original-concept vs website-redesign tracks without hiding links | visible labels + direct links + keyboard focus |
| typography / spacing craft | heading scale and overflow failures | `ui-craft-and-visual-qa` | controlled H1/H2/body/action hierarchy, no clipped display type | 1268/1280/1440/1881/1920 captures |
| portrait/media | user reports unreasonable crop/overlap | `asset-media-and-art-direction` | preserve portrait focal region, reduce destructive note-card overlap, height-safe composition | inspect face/head/upper-body preservation at pressure viewports |
| text/image animation | explicit motion request | `motion-and-microinteractions` | one-time text/image reveal + subtle decorative text rail, no task gating | default + `prefers-reduced-motion` behavior |
| layout pressure | short desktop height + narrow desktop width | `responsive-and-device-strategy` | add content/height-pressure rules instead of screenshot-specific absolute hacks | no horizontal overflow/collision at target matrix |
| implementation safety | production-candidate branch | `frontend-implementation`, `ai-agent-coding-guardrails` | fix root owners in `index.html`, `styles.css`, `script.js`; no dependency/framework churn | source review + route/runtime checks |
| web evidence | user asked to search the web | `design-reference-research-and-benchmark` used narrowly for transferable principles only | use meaningful labels, CSS focal control, reduced-motion contract; do not copy a portfolio surface | evidence notes below |

## Evidence-backed findings

1. **FACT — P1:** supplied Hero screenshot shows the portrait/evidence plate extending into the next section at a short desktop viewport. Source owner: `.hero-art` fixed `min-height` + large absolute portrait/card geometry under a viewport-height-constrained first screen.
2. **FACT — P1:** supplied Contact screenshot shows display text visually overrunning the safe reading area. Source owner: `.contact-copy h2 { font-size: clamp(4rem, 6.8vw, 8.4rem); line-height:.82; }` with a 9-column copy area; the email action also scales too aggressively.
3. **FACT — P1:** current Work index mixes `Personal project`, `Redesign`, `Product system`, and `OTHER WORK` in one undifferentiated list. The new user requirement explicitly asks for two categories: self-initiated/original ideas and website redesigns.
4. **FACT — P1:** current portrait uses `object-fit: cover` and a large overlapping note card. The existing `Media-Contract.md` requires preserving face/head/upper body and verifying the actual crop.
5. **EVIDENCE_BACKED_INFERENCE — P2:** direct, meaningful category labels will improve scanability for recruiters versus a mixed list. This aligns with the current portfolio journey and long-standing web-scanning evidence.
6. **FACT — P2:** current site already has reduced-motion detection, reveal-once behavior, project preview transitions, and pointer parallax. New motion should extend this system rather than add a new dependency or motion framework.

## Preserve contract
- preserve DM Sans + Instrument Serif + DM Mono art-directed signature;
- preserve English Home chrome/headlines;
- preserve all current case-study routes, CV, email, GitHub/LinkedIn links and project-native media;
- preserve direct project-row links and keyboard focus behavior;
- preserve truthful STATIC/REAL system reality and no fake success state;
- preserve dark theme and reduced-motion support;
- do not redesign case-study content in this phase.

## Current directive / contract conflict
`Art-Directed-Discovery-Contract.md` intentionally allowed an oversized editorial Contact close. The latest user screenshot explicitly identifies the current size/hierarchy as a defect. **Decision:** preserve mixed-type art direction but reduce/contain the display scale and restructure line ownership so editorial character no longer causes clipping or weak hierarchy. This is a user-priority override of size, not of the underlying visual signature.

## Web evidence used
- MDN `object-fit` / `object-position`: use fit + focal-position controls deliberately; `cover` alone is not a crop strategy.
- MDN `prefers-reduced-motion`: non-essential motion must reduce/stop when the OS preference requests it.
- Nielsen Norman Group scanning research: users scan; meaningful headings and labels carry information scent. Used only as general scanning evidence, not as proof this exact portfolio will convert better.

## Intended implementation
- make Hero art height viewport-pressure-aware instead of relying on a fixed minimum height;
- shift portrait focal point and reduce note-card footprint/overlap;
- reduce and rebalance Hero/Work/Practice/Experience/Contact type scales; Contact becomes safely wrapped at short/narrow desktop pressure;
- split Selected Work into `Original concepts` and `Website redesigns`; move Capital Place into the redesign group; keep the VAS live link as supporting evidence rather than a duplicate project;
- add a small decorative motion rail plus one-time line/image reveals, with `prefers-reduced-motion` fallback;
- keep all project rows legible/clickable without motion/hover.

## Verification matrix (planned)
| Change | Expected outcome | Method | Pass condition |
|---|---|---|---|
| Hero geometry | portrait/card remain inside Hero and focal subject is preserved | Chromium screenshots | no overlap into Work; no forehead/chin/face destructive crop |
| Typography | hierarchy reads clearly and headings stay in safe canvas | Chromium screenshots | no horizontal overflow/clipping; Contact/email no longer dominate incorrectly |
| Work grouping | two requested project categories are explicit | source + screenshot + keyboard | both labels visible; every project remains direct link; focus preview still works |
| Motion | text/image motion adds hierarchy/delight only | screenshot/runtime + reduced-motion source state | no task delay; reduced motion disables decorative continuous/large travel |
| Runtime | no severe regression | headless Chromium console/overflow checks | `overflow=false`; severe console errors empty |

Phase is not PASSED until rendered screenshots are generated, opened and inspected.