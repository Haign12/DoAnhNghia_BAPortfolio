# Home UI Improvement — 2026-09-04

Phase result: **PASSED**

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
| implementation safety | production-candidate branch | `frontend-implementation`, `ai-agent-coding-guardrails` | fix root owners in `index.html` + `styles.css`; no dependency/framework churn | source review + route/runtime checks |
| web evidence | user asked to search the web | `design-reference-research-and-benchmark` used narrowly for transferable principles only | use meaningful labels, CSS focal control, reduced-motion contract; do not copy a portfolio surface | evidence notes below |

## Evidence-backed findings
1. **FACT — P1:** supplied Hero screenshot showed the portrait/evidence plate extending into the next section at a short desktop viewport. Source owner: `.hero-art` fixed `min-height` + large absolute portrait/card geometry under a viewport-height-constrained first screen.
2. **FACT — P1:** supplied Contact screenshot showed display text visually overrunning the safe reading area. Source owner: `.contact-copy h2 { font-size: clamp(4rem, 6.8vw, 8.4rem); line-height:.82; }` with a 9-column copy area; the email action also scaled too aggressively.
3. **FACT — P1:** Work mixed `Personal project`, `Redesign`, `Product system`, and `OTHER WORK` in one undifferentiated list. The current user requirement explicitly asks for two categories: self-initiated/original ideas and website redesigns.
4. **FACT — P1:** the portrait used `object-fit: cover` and a large overlapping note card. `Media-Contract.md` requires preserving face/head/upper body and verifying the actual crop.
5. **EVIDENCE_BACKED_INFERENCE — P2:** direct category labels improve recruiter scanability versus a mixed list. This follows the current proof-first portfolio journey and general web-scanning evidence; no conversion claim is made.
6. **FACT — P2:** the site already had reduced-motion detection, reveal-once behavior, project preview transitions, and pointer parallax. New motion should extend this system rather than add another dependency/framework.

## Preserve contract
- preserve DM Sans + Instrument Serif + DM Mono art-directed signature;
- preserve English Home chrome/headlines;
- preserve all current case-study routes, CV, email, GitHub/LinkedIn links and project-native media;
- preserve direct project-row links and keyboard focus behavior;
- preserve truthful system reality: content `STATIC`; theme/nav/reveal/focus preview `REAL` client-side; email `REAL` external handoff; no backend success claim;
- preserve dark theme and reduced-motion support;
- do not redesign case-study content in this phase.

## Current directive / contract conflict
`Art-Directed-Discovery-Contract.md` intentionally allowed an oversized editorial Contact close. The latest user screenshot explicitly identifies the current size/hierarchy as a defect. **Decision:** preserve mixed-type art direction but reduce/contain the display scale and restructure line ownership so editorial character no longer causes clipping or weak hierarchy. This is a user-priority override of size, not of the underlying visual signature.

## Web evidence used
- **PRODUCTION — MDN `object-fit` / `object-position`:** fit and focal-position controls are separate responsibilities; `cover` alone is not treated as a crop strategy.
- **PRODUCTION — MDN `prefers-reduced-motion`:** non-essential motion is disabled/reduced when the OS preference requests it.
- **PRODUCTION — Nielsen Norman Group scanning research:** meaningful headings/labels support scanning. Used as general information-scent evidence only, not as proof this exact portfolio will convert better.

## Implementation delivered
- Hero art is viewport-height-aware rather than fixed-min-height dominated; the photo frame now follows the source portrait ratio (`1000 / 1433`) and centered focal position, while the note card is smaller and moved away from the face.
- Hero/Work/Practice/Experience/Contact display scales were rebalanced; the Contact close now wraps inside the shell at the supplied 1268×642 pressure state and the email action no longer dominates.
- Selected Work is split into `A / ORIGINAL CONCEPTS` (LuxRoom, Atelier, StudioOS, FlowCRM) and `B / WEBSITE REDESIGNS` (VAS Education, Capital Place). `VAS live concept` remains a supporting link instead of a duplicate project.
- `Capital Place` participates in the same preview/focus interaction using the existing first-party portfolio asset.
- Added one-time mixed-type line reveal, portrait clip reveal and a subtle running-type rail. The rail runs once when it enters view rather than looping continuously.
- Existing pointer/focus project-preview behavior was preserved. No new runtime dependency was added.
- Reduced-motion now also preserves required portrait layout transform while disabling decorative motion; content is not hidden when motion is reduced.

## Skills actually USED
| Skill | Trigger | Requirement applied | Change created | Verification | Evidence |
|---|---|---|---|---|---|
| `website-delivery-pipeline` | page remediation with release intent | inspect → contract → implement → render QA → release gate | kept work on safe branch until QA PASS | phase sequence | this document + branch history |
| `adaptive-skill-routing-and-context-budget` | avoid loading whole library | smallest applicable skill graph | routed page-specific media/motion/craft/implementation skills only | source/docs | activation plan |
| `project-context` | existing site truth mattered | current source/docs outrank generic advice | preserved routes, typography signature, desktop scope, standing release rule | repo inspection | `Art-Directed-Discovery-Contract.md`, `Decision-Log.md` |
| `ui-improvement` | existing UI had concrete visual defects | preserve intent; fix root owner | changed existing Home composition instead of redesigning whole site | rendered before/problem vs new evidence | supplied screenshots + final captures |
| `portfolio-website` | mixed portfolio project types | proof-first recruiter scanning | explicit Original Concepts / Website Redesigns tracks | DOM + visual + focus QA | Work capture |
| `ui-craft-and-visual-qa` | hierarchy/crop defects | rendered visual evidence is mandatory | rebalanced heading scales and inspected stable post-animation states | direct screenshot inspection | final artifact listed below |
| `asset-media-and-art-direction` | portrait crop/overlap | source ratio + focal/safe region | portrait ratio/focal position + smaller note overlap | 1280/1881/1920 visual inspection | Hero captures |
| `motion-and-microinteractions` | user requested moving text/images | motion has a job; reduced motion required | one-time text/image reveal + one-pass rail | normal/reduced-motion checks | metrics + reduced-motion capture |
| `responsive-and-device-strategy` | short desktop height pressure | content-pressure rules, not screenshot absolute patch | desktop max-height rule + fluid type | 1268/1280/1440/1881/1920 matrix | QA artifact |
| `design-reference-research-and-benchmark` | explicit web research request | extract transferable principles; do not copy surfaces | evidence informed labels, crop and motion rules only | source trace | web evidence section |
| `frontend-implementation` | production candidate | semantic/reuse/no unnecessary dependency | HTML/CSS owner changes; existing JS interaction reused | runtime/keyboard/console checks | 37/37 checks |
| `ai-agent-coding-guardrails` | material repo write | inspect, smallest root fix, preserve unrelated work, verify before release | isolated branch; no unrelated refactor/force operation | diff + QA | branch + final run |

## Final verification matrix
| Change | Expected outcome | Verification | Result |
|---|---|---|---|
| Hero geometry | portrait/card remain inside Hero and focal subject is preserved | Chromium 1280×720 + 1881×782; 1920 top-of-page visual inspection | DONE_VERIFIED |
| Typography hierarchy | headings stay in safe canvas and hierarchy remains intentional | Hero 1280/1440/1920; Practice 1440; Experience 1440; Contact 1268/1440 opened and inspected | DONE_VERIFIED |
| Work grouping | two requested project categories are explicit | Work 1440 capture + DOM counts `[4,2]` | DONE_VERIFIED |
| Keyboard preview | focus changes project evidence like pointer interaction | focus Capital Place at 1440; preview title/media updated | DONE_VERIFIED |
| Motion | text/image motion adds hierarchy/delight only | normal visual states + `prefers-reduced-motion` runtime check | DONE_VERIFIED |
| Runtime | no horizontal overflow or severe browser error | automated Chromium checks across all declared/pressure captures | DONE_VERIFIED |
| Mobile/tablet | out of current Project Config | desktop-only contract | N/A_JUSTIFIED |

## Rendered QA evidence
- Final QA run: **`33849430138`** — success.
- Artifact: **`home-ui-remediation-qa` / `9927779919`**.
- Artifact digest: `sha256:3814551ae6145b67aec6c059ab264d9e25ab6d14a1183e17b054d75a50a8a1f6`.
- Candidate recorded by artifact: `236a3d46ed6f61cd3be72a5b044279575f4efcbc` (same UI implementation as implementation commit `72a442d1ee32a8da7c863389815dca7f7b037b47`; later commits only improved QA capture stability/coverage).
- Automated checks: **37 / 37 passed**, failed = 0.
- Opened/inspected evidence: Hero 1881×782 and 1280×720; Work 1440×1080; Capital keyboard-focus state 1440×1080; Practice 1440×900; Experience 1440×900; Contact 1268×642 and 1440×900; reduced-motion 1440×900; Home 1920 top-of-page derived from the final full-page capture.
- Final visual issue accounting: **P0=0, P1=0**. The first QA artifact was not accepted as final visual evidence for below-fold animated sections because it captured transition-in-progress states; the harness was corrected to capture stable post-animation states and rerun before PASS.

**PHASE RESULT = PASSED.** Standing main authorization D-019 may be used only after temporary QA/helper files are removed and the final diff is reviewed; production smoke remains part of the release step.