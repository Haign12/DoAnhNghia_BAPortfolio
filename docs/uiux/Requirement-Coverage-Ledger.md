# Requirement Coverage Ledger

Allowed states: `DONE_VERIFIED` · `BLOCKED` · `N/A_JUSTIFIED`.

## Phase 00 — Research / Audit / Design Contract

| ID | Requirement | Source | Status | Verification | Evidence |
|---|---|---|---|---|---|
| P0-01 | Read project truth before redesign decisions | Project instructions | DONE_VERIFIED | Repo/source/AGENTS/assets/routes inspected | `Project-Context.md`, `website-audit.md` |
| P0-02 | Read minimum required UI/UX skills for whole-site work | Project instructions | DONE_VERIFIED | Locked files read at exact SHA | `Skill-Version-Lock.md` |
| P0-03 | Lock latest `skills_UIUX` main version/commit/date | Project instructions | DONE_VERIFIED | SHA/date recorded | `Skill-Version-Lock.md` |
| P0-04 | Classify Scope/Type/Risk/Mode and route smallest skill graph | Project instructions | DONE_VERIFIED | Classification and activation ledger recorded | `Phase-00-Research-Audit.md` |
| P0-05 | Audit existing website before redesign | Routed skill | DONE_VERIFIED | Inventory, preserve list, priority, visible delta | `website-audit.md` |
| P0-06 | Build audience/top-task model without inventing research | Routed skill | DONE_VERIFIED | Assumptions/hypotheses labeled | `audience-intent.md` |
| P0-07 | Research design references by role, not clone one site | Routed skill | DONE_VERIFIED | Mixed-source benchmark + reference role matrix | `design-reference-benchmark.md` |
| P0-08 | Missing brand guideline handled evidence-first | Routed skill | DONE_VERIFIED | Status C + proposed digital brand roles | `brand-guidelines.md` |
| P0-09 | Concrete Design Contract before substantial code | Pipeline hard gate | DONE_VERIFIED | Contract contains goal, audiences, journey, preserve/change, visual DNA, compositions, do/don't | `Design-Contract.md` |
| P0-10 | Mobile/tablet redesign not required under explicit desktop-only scope | User | N/A_JUSTIFIED | Scope explicitly desktop-only | `Project-Context.md` |

**Phase 00 result: PASSED**

## Phase 01 — Implementation / QA

| ID | Requirement | Source | Status | Verification target | Notes |
|---|---|---|---|---|---|
| U-01 | Redesign existing whole portfolio, not only homepage styling | User | BLOCKED | Primary routes visibly aligned to contract | In progress |
| U-02 | Luxury minimalism must be a substantial hierarchy/composition delta | User + redesign gate | BLOCKED | OLD/NEW rendered comparison at same viewport | In progress |
| U-03 | Visible site language is Vietnamese | User | BLOCKED | `lang=vi` + primary-route visible copy review | In progress |
| U-04 | Verify desktop 1280 / 1440 / 1920 in Chromium | User | BLOCKED | Rendered screenshots opened and inspected | Render environment/media access still unresolved |
| U-05 | Keep release authorization `no_release` | User | DONE_VERIFIED | Branch only; no PR/merge/deploy | Safe branch in use |
| I-01 | Preserve verified facts, URLs, CV/email/live links | Project instructions + contract | BLOCKED | Source diff/content review | In progress |
| I-02 | Work appears before long biography/about content | Contract | BLOCKED | DOM order + rendered sequence | In progress |
| I-03 | Use at least 3 distinct top composition families for material page roles | Pipeline + contract | BLOCKED | Cross-page source + screenshot review | In progress |
| I-04 | Remove generic pill-heavy/grid-orbit/marquee signature from redesigned primary experience | Contract | BLOCKED | CSS/source + rendered review | In progress |
| I-05 | Project media preserves native project color where appropriate | Contract | BLOCKED | CSS removes blanket grayscale + rendered media review | In progress |
| I-06 | No fake metrics/testimonials/research/outcomes | Project instructions | BLOCKED | Content review | In progress |
| I-07 | Preserve truthful system reality: mailto/CV/live links; no fake form success | Project instructions | BLOCKED | Interaction/source review | In progress |
| I-08 | Keyboard focus + reduced motion protections retained | Project instructions | BLOCKED | Source/interaction checks | In progress |
| I-09 | Shared root owner fixed before page-local patching | Project instructions | BLOCKED | CSS architecture review | In progress |
| I-10 | Metadata/SEO language updated without breaking canonical URLs | Contract | BLOCKED | HTML head review | In progress |
| I-11 | Tablet/mobile redesign QA | User scope | N/A_JUSTIFIED | Explicit desktop-only scope | Existing safety should not be intentionally broken |
| Q-01 | Rendered visual QA must inspect actual pixels | Project instructions | BLOCKED | Open screenshots for representative routes/viewports | Cannot substitute source/build checks |
| Q-02 | Cross-page visual monotony review | Pipeline | BLOCKED | Montage/screenshot comparison | Pending render access |
| Q-03 | Media crop/focal integrity review | Locked V5 current commit | BLOCKED | Actual media screenshots | Pending render access |
| R-01 | Merge/deploy/release | User | N/A_JUSTIFIED | `release_authorization: no_release` | Must not perform |

**Phase 01 result: BLOCKED until all applicable requirements become `DONE_VERIFIED`.**
