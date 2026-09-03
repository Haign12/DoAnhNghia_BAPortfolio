# Design Contract — Luxury Minimal Portfolio Redesign

Status: **APPROVED FOR PHASE 2 IMPLEMENTATION**
Phase 1 evidence gate: **PASSED** — see `Old-Baseline.md`, `Media-Contract.md`, `Requirement-Coverage-Ledger.md`, and `Phase-1-Handoff.md`.

## 1. Owner / business goal

**EVIDENCE_BACKED_INFERENCE:** Earn qualified UI/UX interviews/opportunities and project conversations by making the portfolio a credible proof system for craft + systems thinking.

Owner must communicate:
- UI/UX role and positioning quickly;
- range without appearing unfocused;
- specific role/contribution and design reasoning;
- strong visual craft;
- honest limits/outcomes;
- verified experience and availability/contact.

## 2. Audience and entry intent
Primary: recruiter/talent screener; design/product hiring lead.
Secondary hypothesis: potential client/collaborator.
Entries: home from application/LinkedIn/CV; direct case deep link; resume → portfolio; external project/referral.

## 3. Priority journey
`Identify role → see relevant work → select project → understand role/problem/decisions → inspect proof → understand outcome/limitation → verify CV/background if needed → contact`

No page should require consuming an About narrative before reaching work proof.

## 4. Preserve / change

### Preserve
- public route slugs/canonicals;
- verified project/experience/CV/contact facts;
- direct email and resume utility;
- useful project media;
- honest limitation language;
- semantic HTML/focus/reduced-motion intent;
- existing font families as first reuse candidates.

### Change
- proof order and homepage silhouette;
- case-study depth and page-role composition;
- grayscale-heavy project media;
- pill/card/grid/orbit/marquee dominance;
- FlowCRM visual drift;
- Vietnamese primary content alignment;
- sitemap coverage for VAS.

## 5. Brand / visual roles
Brand Source Status C: logo asset exists, no official guideline. Visual system is **PROPOSED_FOR_DIGITAL**:
- warm ivory/paper canvas;
- near-black ink;
- muted warm gray secondary text;
- restrained bronze/umber wayfinding accent;
- native project colors;
- inverse dark surface only when composition needs it.
No faux-luxury gold gradients, marble, glass or invented logo meaning.

## 6. Typography
- editorial serif display role;
- DM Sans body/navigation/actions;
- DM Mono sparse metadata;
- Vietnamese glyph/wrap proof required in Chromium;
- long copy stays in readable columns.

## 7. Layout grammar
- wide desktop grid with disciplined asymmetry;
- evidence objects may break the reading column but not safe canvas;
- hairline rules/tonal surfaces instead of repeated bordered cards;
- section rhythm varies by decision stage;
- page-role-specific media/content order;
- no universal hero.

## 8. Media
- project screens are evidence and remain legible/native-color;
- portrait supports identity but is not the primary proof object;
- prominent media follows `Media-Contract.md` safe-region rules;
- no new stock media by default;
- no blanket grayscale.

## 9. Interaction / motion
- retain functional navigation, theme if kept, keyboard focus and reduced motion;
- motion supports orientation/state/hierarchy only;
- remove/de-emphasize marquee/showreel-like behavior that delays proof;
- no fake loading/success states;
- email remains external handoff.

## 10. Page experience contracts

| PAGE / ROLE | AUDIENCE | ENTRY | USER GOAL | OWNER GOAL | PRIMARY QUESTION | DECISION / PROOF | CTA / NEXT | CONTENT PRIORITY | VISUAL STRATEGY | INTERACTION | DESKTOP PRIORITY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Home / orientation + work hub | recruiter/hiring lead/client hypothesis | application/CV/shared link | decide relevance and choose proof | establish role/craft/range | Is this designer worth deeper review? | selected work + role/experience | Case/Resume; Contact secondary | positioning → flagship/supporting work → approach/experience → contact | Family A editorial proof index | restrained hover/focus/reveal | proof visible early; stable 1280–1920 |
| LuxRoom / Personal Case | hiring lead | home/deep link | judge hierarchy/discovery | prove commerce craft | How did room/material context shape discovery? | screens + decision narrative | Live/next case | context/role → decisions → output → limits | Family B artifact-led | proof inspection | large media/crop verified |
| Atelier / Personal Case | hiring lead | home/deep link | judge editorial commerce | prove hierarchy range | How is mood separated from shopping action? | screens + action/content decisions | Live/next case | challenge → decisions → proof → learning | Family B with distinct sequencing | restrained reveal | no forced identical hero |
| StudioOS / Personal Product | product/hiring lead | home/deep link | judge systems thinking | prove product depth | Can complexity become actionable? | workspace/task/state evidence | Live/next case | problem → system → decisions/states → limits | Family B with denser system evidence | annotations/state cues | density pressure at 1280/1366 |
| VAS / Redesign | hiring/design lead | home/deep link | understand what changed/why | prove redesign/IA | What was structurally wrong and what changed? | OLD issue + IA/journey + NEW proof | Live/source/next | baseline → thesis → IA → decisions → limits | Family C change-thesis | compare/orient | comparison legible |
| FlowCRM / Product-System | product/design lead | deep/secondary | judge workflow/system modelling | prove structured product thinking | What system/workflow decisions were made? | flow/model/state/UI evidence | Next/contact | context → flow/system → states → UI → limits | Family D model-led | anchored chapters optional | wide artifact must not overflow |
| Profile/Experience/Contact | recruiter/client hypothesis | home/case utility | verify background/connect | credibility/availability | Who is this person/how contact? | verified CV/experience | Email/Resume | concise verified facts | quiet editorial utility | native links | sticky UI must not cover content |

## 11. Composition families
- **Family A — Editorial Proof Index:** text-led positioning + immediate project-proof cue; work enters the first narrative beat.
- **Family B — Artifact-Led Case:** project artifact/screen is the first evidence anchor; commerce/product stories may vary media sequencing.
- **Family C — Change-Thesis Redesign:** OLD problem/change statement and NEW proof are visible in tension before generic process chronology.
- **Family D — System-Model Case:** workflow/model/state object is the primary anchor, not a beauty-shot hero.

## 12. Representative composition proofs

### A / Home
```text
[NAME / ROLE]                 [utility nav + resume]
[POSITIONING 2–3 lines]       [portrait / supporting identity]
[short value sentence]
---------------- SELECTED WORK ----------------
[01 FLAGSHIP proof ----------------------------]
                [title / role / challenge / case →]
[02 supporting]                         [03 supporting]
```

### B / Personal Case
```text
[project masthead / role / scope]       [case utility]
[LARGE ORIGINAL ARTIFACT -----------------------]
[decision narrative]          [compact evidence metadata]
```

### C / VAS
```text
[project / role / year]        [back / contact]
[change thesis]
[OLD problem / evidence]  →  [NEW first proof]
[Journey / IA decision object]
```

### D / FlowCRM
```text
[product-system context / role]
[PRIMARY FLOW / SYSTEM MAP ---------------------]
[decision annotations]        [state/model metadata]
[UI proof chapters below]
```

## 13. System reality
- content = STATIC;
- nav/theme/reveal = REAL client-side only after interaction verification;
- mailto = REAL external handoff, not delivery success;
- resume/static links = REAL navigation after link verification;
- backend/API/CMS/auth/payment = not detected;
- analytics = UNKNOWN.
No fake form/success state.

## 14. Desktop/browser
Chromium only. Required widths 1280/1440/1920; pressure 1366/1536/1600. Mobile/tablet `N/A_JUSTIFIED`. Do not claim fully responsive.

## 15. Accessibility
Visible logical focus; semantic links/buttons/landmarks/headings; visible desktop nav not hidden from accessibility tree; color not sole signal; reduced-motion never hides content; media alternative text reflects evidence role. No formal conformance claim.

## 16. Performance
Preserve static/lightweight architecture; avoid unnecessary dependencies/3D/video; explicit media dimensions; below-fold lazy loading; prioritize only real opening media; measure lab conditions rather than use vanity universal score.

## 17. SEO
Preserve URLs/canonicals/meaningful metadata/schema; align primary locale; add VAS to sitemap; no route/content deletion without evidence.

## 18. Do / Do not
Do: proof-first, page-role differentiation, native project color, explicit design decisions, warm restraint, honest limits.
Do not: universal hero, pill/card soup, blanket grayscale, faux luxury, invented outcomes, fake integration, motion-gated content, framework migration.

## Gate
**PASSED for Phase 2 implementation.** Structural implementation must be proven on the four representative families before whole-site rollout.
