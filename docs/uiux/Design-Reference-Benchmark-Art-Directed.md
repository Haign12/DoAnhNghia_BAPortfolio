# Design Reference Benchmark — Art-Directed Portfolio

Date: 2026-09-04
Decision problem: recover artistic authorship and discovery without turning the portfolio into an unusable showreel.

## Source roles

Curated/award/gallery references below are used only for visual craft, composition, typography, storytelling and motion. They are **not** treated as evidence of UX, accessibility or conversion performance.

## Final references

| Reference | Label | Page/state inspected | Job | Principle extracted | Do not copy |
|---|---|---|---|---|---|
| Niccolò Miranda / The Paper Portfolio | CASE_STUDY / MOOD_REFERENCE | Awwwards 2023 book spread | editorial object + exploration cue | portfolio can feel like a designed artifact; strong mixed typography + explicit “drag/click to explore” cues make browsing feel authored | newspaper surface, exact typography, literal horizontal drag implementation |
| Davide Baratta portfolio | PRODUCTION reference surfaced through Awwwards | project navigation / drag projects element | interactive work discovery | project navigation can itself be a signature moment when project names remain visible and the interaction directly advances to work | hidden navigation or interaction that requires gesture discovery before content is readable |
| Marco Cornacchia | MOOD_REFERENCE | Godly portfolio profile | unusual layout + interactive personal portfolio | expressive layout can coexist with clean project browsing; interaction should reinforce personal design voice | bento or novelty patterns unrelated to this portfolio content |
| Viens-Là portfolio case presentation | CASE_STUDY / MOOD_REFERENCE | Awwwards live presentation | microinteraction + delight | small interaction, motion and easter-egg style moments can create delight when they support navigation/storytelling | minigames/WebGL spectacle that delays recruiter access to work |
| OLD Do Anh Nghia portfolio baseline | PRODUCTION / PROJECT_TRUTH | Home 1440 rendered screenshot | typography + composition character | mixed DM Sans / Instrument Serif / mono index, layered portrait, grid/orbit geometry created more visual tension than the all-Inter remediation | old proof delay, decorative competition, oversized/empty media states |

## Search strategy

Query families used:

1. personal design portfolio + unusual layout + interaction;
2. portfolio project navigation / interactive discovery;
3. art-direction portfolio + typography / editorial grammar;
4. current project OLD vs NEW evidence.

## Extracted design DNA

### Layout grammar
- wide 12-column desktop grid;
- asymmetric hero with deliberate overlap/tension;
- selected work becomes a two-part explorer: preview object + index list;
- lower sections become quieter to create intensity contrast.

### Typography
- DM Sans for structural voice and recruiter readability;
- Instrument Serif for expressive editorial counterpoint;
- DM Mono for index/metadata and technical rhythm.

### Color / surface
- white/near-white paper-like canvas;
- near-black ink;
- project-native color lives inside evidence media;
- no decorative accent palette required.

### Media
- one medium-size preview object at a time instead of a long stack of large thumbnails;
- crop/preview should feel curated, not generic card output;
- project list remains text-first and always readable.

### Interaction
- pointer hover and keyboard focus share the same preview-state model;
- preview swap uses transform/opacity/clip-path;
- no custom cursor required;
- reduced-motion provides instant state changes.

## Reference-to-page-role matrix

| Page role | User question | Reference role | Transfer | Project adaptation |
|---|---|---|---|---|
| Home arrival | “Who is this designer and is there taste/point of view?” | OLD baseline + Miranda | mixed typography, editorial artifact feel | restore original type pair, layered portrait, English statement, keep CTA visible |
| Selected Work | “Which project should I inspect?” | Davide Baratta + Marco Cornacchia | project navigation as signature interaction | sticky preview + readable numbered project index; no mandatory drag |
| Experience | “Is the background credible/relevant?” | project truth, not gallery | quiet verification after expressive work section | restrained timeline, no novelty interaction |
| Case study | “What did the designer decide and why?” | existing project families | preserve differentiated project composition | restore shared type signature only; no deep project redesign |
| Contact | “How do I reach / verify this person?” | project truth | direct closing action | large editorial statement + standard mailto/resume links |

## Rejected patterns

- universal white/black/Inter minimalism as the entire identity;
- giant static thumbnail stack;
- full-screen loader/showreel before content;
- WebGL/3D dependency;
- custom pointer required to understand controls;
- blind recreation of Miranda newspaper or Davide Baratta drag navigation;
- random visual effects with no journey job.

## Handoff to visual direction

Final DNA: **editorial systems thinking** — rigorous sans/mono structure interrupted by expressive serif phrases and project-media transitions. The site should feel like a living design notebook: deliberate, curious and authored, but every interaction still points toward recruiter evidence.

Sources researched:
- https://www.awwwards.com/mobile-sites/davidebaratta-com
- https://assets.awwwards.com/awards/gallery/2023/07/HOT-RIGHT-NOW-BOOK-2023.pdf
- https://godly.website/website/marco-cornacchia-860
- https://assets.awwwards.com/assets/files/live-presentation.pdf
- repository OLD baseline evidence at commit `2c7c6ee7cbe82be98c42257854ca28a725e7ba8b`.
