# Design Contract — Luxury Minimal Portfolio Redesign

Status: **DESIGN CONTRACT COMPLETE FOR RESEARCH/DIRECTION**
Phase gate caveat: OLD rendered baseline remains BLOCKED; therefore Phase 1 overall cannot pass yet.

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

Important entries:
- home from application/LinkedIn/CV;
- direct case-study deep link;
- resume → portfolio;
- external live project/referral.

## 3. Priority journey

`Identify role → see relevant work → select project → understand role/problem/decisions → inspect proof → understand outcome/limitation → verify CV/background if needed → contact`

No page should require the user to first consume an About narrative before reaching work proof.

## 4. Preserve / change

### Preserve
- public route slugs/canonicals;
- verified project/experience/CV/contact facts;
- direct email and resume utility;
- useful project media;
- honest limitation language;
- semantic HTML/focus/reduced-motion intent;
- existing fonts as first reuse candidates.

### Change
- proof order and homepage silhouette;
- case-study content depth and page-role composition;
- grayscale-heavy media treatment;
- pill/card/grid/orbit/marquee dominance;
- FlowCRM visual drift;
- Vietnamese primary content alignment;
- sitemap coverage for VAS in implementation.

## 5. Brand evidence / color roles

Brand Source Status C: logo asset exists, no official guideline.

Visual direction is **PROPOSED_FOR_DIGITAL**:
- warm ivory/paper canvas;
- near-black ink;
- muted warm gray secondary text;
- restrained bronze/umber wayfinding accent;
- project media keeps native colors;
- dark inverse surface only where composition needs it.

No “gold luxury” gradients, marble, glass or invented logo meaning.

## 6. Typography

- Instrument Serif: selected display/editorial role.
- DM Sans: body/navigation/actions.
- DM Mono: sparse metadata only.
- Vietnamese glyph/wrap proof required in Chromium.
- Long copy uses readable columns; display scale cannot rely on English-short lines.

## 7. Layout grammar

- wide desktop grid with disciplined asymmetry;
- proof object may break reading column but not safe canvas;
- hairline rules/tonal surfaces instead of repeated bordered cards;
- section rhythm varies by decision stage;
- media and content order are page-role-specific;
- no universal hero.

## 8. Imagery / media direction

- project screens are evidence and should remain legible/native-color;
- portrait is editorial identity support, not the primary proof object;
- every prominent image gets ratio + fit + focal/safe-zone rule before implementation;
- no new stock media by default;
- no blanket grayscale.

## 9. Interaction / motion

- keep navigation, theme (if retained), keyboard focus and reduced-motion functional;
- motion only supports orientation/state/hierarchy;
- remove/de-emphasize marquee/showreel-like behavior that delays proof;
- no fake loading/success states;
- email remains external handoff unless real submission infrastructure is separately authorized.

## 10. Page experience contract

| PAGE / ROLE | AUDIENCE | ENTRY CONTEXT | USER GOAL | OWNER GOAL | PRIMARY QUESTION | DECISION | PROOF | CTA | NEXT DESTINATION | CONTENT PRIORITY | VISUAL STRATEGY | INTERACTION | RESPONSIVE PRIORITY |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Home / orientation + work hub | recruiter, hiring lead, client hypothesis | application/CV/shared link | decide relevance and choose proof | establish role, craft, range | “Is this designer worth deeper review?” | choose project or CV | selected work + role/experience | View case / Resume; Contact secondary | relevant case study | positioning → flagship work → supporting work → approach → experience → contact | Family A: editorial proof index; warm neutral; original-color media | hover/focus + restrained reveal only | desktop: proof visible early; no wrap/overflow 1280–1920 |
| LuxRoom / personal commerce case | hiring lead | home/deep link | judge hierarchy/discovery thinking | prove premium commerce craft | “How did room/material context shape discovery?” | understand design rationale | screens + decision narrative | Live site / next case | next complementary case / contact | context/role → decisions → output → limitation | Family B artifact-led | image/proof inspection + chapter nav if needed | desktop readable text + large media, crop verified |
| Atelier / personal commerce case | hiring lead | home/deep link | judge editorial/mobile commerce thinking | prove visual hierarchy range | “How is mood separated from shopping action?” | understand hierarchy choices | screens + action/content decisions | Live site / next case | StudioOS/LuxRoom/contact | role/challenge → decisions → final proof → learning | Family B but distinct art/media sequencing | restrained media reveal | same desktop contract; no forced identical hero |
| StudioOS / product SaaS case | hiring lead/product lead | home/deep link | judge systems/product thinking | prove interaction/system depth | “Can the designer make complex work actionable?” | assess product reasoning | workspace screens, task/state/system evidence | Live/source if factual / next case | FlowCRM/VAS/contact | problem → system model → decisions/states → outcome limits | Family B evolving toward system evidence; stronger data/layout density than commerce cases | state/flow annotations; no decorative motion | desktop density/reading pressure at 1280/1366 |
| VAS Education / redesign case | hiring/design lead | home/deep link | understand what changed and why | prove redesign/IA capability | “What was structurally wrong and how did the redesign solve it?” | judge redesign reasoning | OLD issue evidence + journey/IA + NEW system proof | Live/source if factual / next case | Home/another redesign/contact | baseline/problem → thesis → IA/journey → design decisions → outcome limits | Family C: change-thesis composition; distinct from personal case shell | compare/orient; no slider required unless accessible and useful | desktop before/after/proof comparison must remain legible |
| FlowCRM / product-system evidence | product/design lead | deep link/secondary work | judge workflow/system modeling | show structured product thinking | “What system/workflow decisions were made?” | assess relevance/depth | flow/model/state/UI artifacts | Next case / contact | StudioOS/home/contact | product context → flow/system → state decisions → UI → limits | Family D: model-led, denser information surface | optional anchored chapters; no fake data behavior | desktop wide artifact/table/flow must not overflow |
| Profile/Experience/Contact | recruiter/client hypothesis | home section or case utility | verify background and connect | establish credibility/availability | “Who is this person and how do I contact them?” | shortlist/contact | verified CV/experience/social destinations | Email / Resume | external mail/CV/LinkedIn | concise verified facts | quiet editorial utility, not a sales landing page | native links only | desktop legibility, sticky utility should not cover content |

## 11. Page-role composition families

### Family A — Editorial Proof Index
Top silhouette: text-led positioning on one side/axis + immediate project-proof cue; selected work begins within the first narrative beat. Portrait may support, not dominate.

### Family B — Artifact-Led Case
Top silhouette: large project artifact/screen + project masthead/role/context arranged as an editorial spread. Personal cases can vary media arrangement based on asset ratio and project story.

### Family C — Change-Thesis Redesign
Top silhouette: OLD problem/change statement and NEW proof in tension; user understands “what changed” before generic process chronology.

### Family D — System-Model Case
Top silhouette: workflow/model/state object plus concise role/problem metadata; optimized for understanding a product system rather than a beauty shot.

## 12. Representative composition proofs — text wireframes

### A / Home
```text
[NAME / ROLE]                 [utility nav + resume]

[POSITIONING 2–3 lines]       [portrait or flagship crop — supporting]
[short value sentence]

---------------- SELECTED WORK ----------------
[01 FLAGSHIP: large project proof spanning 7–8 cols]
                [title / role / challenge / case →]
[02 project row]                         [03 project row]
```

### C / VAS redesign
```text
[project / role / year]        [back to work / contact]
[VAS title]
[one-sentence change thesis]

[OLD issue / evidence]  →  [NEW first proof / system visual]
-------------------
[Journey / IA decision object]
```

### D / FlowCRM system
```text
[FlowCRM / product-system case]
[problem + role + scope]

[PRIMARY FLOW / SYSTEM MAP ---------------------]
[decision annotations]        [state/model metadata]

[UI proof chapters below]
```

## 13. System reality contract

- static content = STATIC;
- nav/theme/reveal = REAL client-side only after interaction verification;
- mailto = REAL external handoff, not message-delivery success;
- resume/static links = REAL navigation after link verification;
- backend/API/CMS/auth/payment = not detected;
- analytics = UNKNOWN.

No redesign may add a fake contact form/success state.

## 14. Desktop/browser contract

- Chromium only.
- Required: 1280 / 1440 / 1920.
- Pressure widths: 1366 / 1536 / 1600.
- Mobile/tablet = N/A_JUSTIFIED by explicit current scope.
- Do not claim fully responsive.

## 15. Accessibility contract

- visible logical keyboard focus;
- semantic links/buttons/landmarks/headings;
- desktop nav must not be hidden from accessibility tree while visible;
- color not sole signal;
- contrast verified after token implementation;
- reduced-motion removes nonessential transforms without hiding content;
- image alt/caption reflects evidence role.

## 16. Performance contract

- preserve static/lightweight architecture unless strong reason to change;
- reuse current font families rather than adding decorative dependencies;
- explicit image dimensions/aspect slots;
- lazy-load below-fold media; priority only for true LCP evidence;
- no 3D/video dependency for luxury feel;
- measure lab conditions later; no universal Lighthouse vanity target.

## 17. SEO contract

- preserve public URLs/canonicals;
- preserve meaningful metadata/schema and improve language/content alignment;
- add VAS to sitemap later;
- do not delete content/routes without organic/backlink evidence.

## 18. Do / Do not

Do: proof-first, page-role differentiation, native project color, explicit decision narrative, warm restrained materials, honest limitations.

Do not: universal hero, pill/card soup, blanket grayscale, faux-luxury gold/glass, invented outcome, fake integration, motion-gated content, unrelated framework migration.

## Design Contract gate

Contract is concrete enough for implementation planning and does not require generic aesthetic interpretation. However Phase 1 remains BLOCKED until OLD rendered baseline screenshots are captured and inspected.