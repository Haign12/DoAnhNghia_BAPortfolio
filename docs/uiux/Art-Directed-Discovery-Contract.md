# Art-Directed Discovery Contract

Status: **APPROVED FOR IMPLEMENTATION**
Date: 2026-09-04
Scope: whole-site portfolio visual system, with Home as the primary experience target and case-study routes as supporting portfolio evidence.
Mode: production_candidate
Risk: medium
Browser/device scope: Chromium desktop 1280 / 1440 / 1920. Mobile/tablet remain `N/A_JUSTIFIED` under the project scope.

## Current user directive

FACT: the latest user request explicitly rejects the all-Inter minimal remediation as visually weaker than the earlier portfolio and asks to:

- keep the main title language in **English**;
- restore the earlier font character;
- make the portfolio feel enjoyable to explore for recruiters;
- increase art-direction and design authorship;
- use `Ngh1aa/skills_UIUX` as the working method.

This directive supersedes the visual-only parts of `Minimalism-Remediation-Contract.md`. It does **not** supersede route preservation, truthful system reality, accessibility intent, recruiter clarity, or no-fabricated-outcome rules.

## Business / audience goal

EVIDENCE_BACKED_INFERENCE: the site should help recruiters and hiring leads quickly understand the designer's role and work while also giving them a memorable signal of visual taste, interaction craft and systems thinking.

Primary journey:
`recognize role → feel visual authorship → explore selected work → inspect a project → verify experience/CV → contact`

The portfolio must not become a showreel that makes users wait before reaching work.

## Preserve

- existing public routes and canonicals;
- CV, contact and project links;
- project-native media and truthful case-study limitations;
- desktop stability at 1280/1440/1920;
- keyboard/focus and reduced-motion behavior;
- no fake forms, backend or outcome claims;
- proof-first sequence: positioning → selected work → experience → contact.

## Change

- replace all-Inter hierarchy with the earlier expressive type pairing;
- restore English portfolio chrome and headline language on Home;
- replace the static thumbnail stack with an interactive project explorer;
- reintroduce controlled editorial tension: layered image, index marks, line/grid geometry and typographic contrast;
- make project discovery interactive on hover **and keyboard focus**, never hover-only;
- keep project media smaller than the previous oversized cards;
- reduce generic landing-page symmetry and create a recognizable portfolio signature.

## Typography contract

Restore the original family logic found in the OLD baseline:

- Display sans: `DM Sans` — strong, compact, modern structural headlines.
- Editorial contrast: `Instrument Serif` — italic/expressive phrases and art-direction moments.
- Metadata/index: `DM Mono` — project numbering, labels, coordinates, technical metadata.
- Body: `DM Sans` for clarity and recruiter scanning.

Do not use Inter as the universal family.

## Color / materiality

- Main canvas remains near-white/white.
- Primary ink remains near-black.
- Muted gray supports metadata.
- Project-native media retains color.
- No ornamental gradient/glass/3D layer.
- Art direction comes from composition, crop, type, geometry and motion rather than decorative color effects.

## Experience principles

1. **Explore before explain** — work discovery should invite interaction before long explanation, while still exposing project names and roles immediately.
2. **Proof stays one click away** — every expressive moment must still lead clearly to project, resume or contact evidence.
3. **Editorial tension, functional controls** — composition can be unusual; controls and link behavior stay familiar.
4. **One memorable device, repeated intentionally** — project preview/index behavior becomes the signature rather than many unrelated effects.
5. **Motion reveals structure** — use motion for hierarchy, continuity and delight; reduced motion must preserve all content.

## Signature moments

### 1. Arrival — typographic portrait composition
- English mixed-type headline inspired by the older visual character.
- Portrait treated as a compositional object, not a plain card.
- Small index/coordinate typography and geometry create visual curiosity.
- CTA remains visible in first screen.

### 2. Selected Work — live project index
- Project names exist as a readable list.
- Hover/focus updates a sticky preview object.
- Preview transition uses clip/transform/opacity only.
- Keyboard focus triggers the same project preview state.
- Each row remains a normal `<a>` to the case study.

### 3. Experience — quiet editorial verification
- Lower visual intensity than Work.
- Recruiter can scan role/company/date without interaction.

### 4. Contact — oversized editorial closing line
- memorable but direct mailto/resume actions.

## Home composition proof

```text
[brand]                                [work / experience / contact / resume]
--------------------------------------------------------------------------
01 / PORTFOLIO · 2026

[DM SANS: DESIGNING CLEAR PRODUCTS.]       [portrait / paper object]
[INSTRUMENT SERIF: grounded in             [index + geometry + role note]
 systems thinking.]
[short English positioning]
[Explore work] [View resume]

--------------------------------------------------------------------------
02 / SELECTED WORK                 [hover / focus to explore]

[sticky preview object]            01  LuxRoom             →
                                   02  Atelier             →
                                   03  StudioOS            →
                                   04  VAS Education       →
                                   05  FlowCRM             →

--------------------------------------------------------------------------
03 / EXPERIENCE                    [verified role timeline / capabilities]
04 / CONTACT                       [large editorial closing statement]
```

## Supporting case-study contract

Case-study routes are not independently redesigned in depth. They only need to inherit the restored typography/portfolio signature without breaking project-specific composition. Project-native media and the four existing page-role families remain intact.

## Interaction and motion contract

- preview state must update on `pointerenter` and `focus`;
- no custom cursor required;
- no forced horizontal scroll;
- no autoplay media;
- motion tokens only;
- transform/opacity/clip-path preferred;
- reduced motion disables parallax/large travel and makes preview swaps immediate;
- interaction cannot delay navigation.

## Do

- use mixed type as a visual voice;
- keep English primary portfolio chrome/headlines;
- use project images as evidence and discovery objects;
- create asymmetry and layered editorial composition;
- keep CTA/navigation conventional and obvious;
- render and inspect 1280/1440/1920 before handoff.

## Do not

- universal Inter everywhere;
- giant 880px+ thumbnail stack as the main discovery pattern;
- random floating cards/effects;
- custom cursor that hides standard pointer semantics;
- visual novelty that blocks recruiter scanning;
- copy a reference layout literally;
- claim award-gallery references prove usability or conversion.

## Acceptance gate

Implementation can pass only when:

- English Home headline/chrome is restored;
- DM Sans + Instrument Serif + DM Mono are actually rendered;
- Selected Work is materially more exploratory than a static vertical card stack;
- all project rows remain directly legible/clickable without hover;
- keyboard focus updates the preview state;
- no horizontal overflow at 1280/1440/1920;
- Home first screen still exposes role + CTA;
- representative case routes remain visually intact;
- screenshots are opened and inspected, not only generated.
