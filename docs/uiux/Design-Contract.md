# Design Contract — Do Anh Nghia Portfolio

Status: **PASS — ready for implementation on safe branch**

Scope: whole-site · Type: redesign · Risk: medium · Mode: production_candidate · Responsive: desktop_only

## Goal and audiences

Primary goal: turn qualified portfolio visitors into a meaningful next action: open a case study, open the CV, or start an email conversation.

Primary audiences are recruiter/HR, hiring/design/product leads, and potential clients. No analytics or direct user research was supplied, so audience statements are `PROFESSIONAL_HYPOTHESIS`.

Journey: `Positioning → selected work → project proof → experience/fit → contact/CV`.

## Preserve

- Verified project and experience facts.
- Existing case-study URLs/canonicals.
- Email, CV, LinkedIn and live-project links.
- Honest limitation language where outcomes are unmeasured.
- Semantic focus/reduced-motion safeguards.
- Project-native imagery and color.

## Change

- Work appears immediately after hero, before long About content.
- Visible content becomes Vietnamese.
- Split/decorative hero becomes editorial and proof-led.
- Reduce universal pills; use text links, hairline rules and restrained controls.
- Remove blanket grayscale from project evidence.
- Replace repeated case-study top shell with role-specific compositions.
- Retire competing grid/orbit/marquee motifs in favor of one index/rule signature.

## Proposed digital brand roles

These are `PROPOSED_FOR_DIGITAL`, not official brand colors:

- Canvas `#F5F1E8`
- Surface `#FBF8F2`
- Ink `#151412`
- Muted `#6F6A61`
- Rule `#D8D0C3`
- Bronze datum `#C6A978` for decoration/selected state only
- Accessible bronze `#7A5E3B` for interactive accent
- Inverse `#151412` / `#F5F1E8`

Primary CTA stays near-black/ivory; bronze is not the default CTA fill.

## Design DNA

Quiet · editorial · precise · warm · proof-first · project-respectful.

Visual signature: **warm ivory + near-black editorial typography + numbered hairline project rails + native-color project media + one restrained bronze datum**.

## Layout and type

- 12-column editorial desktop grid; max shell about 1360px.
- Major rhythm 120–180px; internal evidence rhythm 48–80px.
- Asymmetry must remain grid-aligned.
- Avoid centered heading/card-grid defaults.
- Proposed display serif: `Noto Serif Display`, subject to rendered Vietnamese glyph verification.
- Body/UI: `DM Sans`; metadata: `DM Mono` sparingly.
- Body text remains readable 16–18px with controlled line length.

## Media and motion

- Portrait uses one editorial crop; no orbit/grid overlay.
- Project media keeps native color and serves as evidence.
- No blanket grayscale or decorative stock luxury textures.
- Motion 160–420ms: opacity/y reveal, line expansion, tiny image scale only.
- No scroll hijack, cursor gimmicks or long intro transitions.
- Respect `prefers-reduced-motion`.

## Page-role composition matrix

| Role | First question | First anchor | Top family | Primary action |
|---|---|---|---|---|
| Homepage | Who is Nghia and what work matters? | Large role statement + restrained portrait + work index cue | A — Editorial Identity | `Xem dự án chọn lọc` |
| Personal case study | What was designed and why? | Native-color project image + metadata rail | B — Project Field | `Xem website` when real |
| Redesign case study | What changed and what logic drove it? | Change thesis + project-native system visual | C — Change Thesis | `Xem website` |
| Secondary/archive case | What additional breadth exists? | Compact indexed row | D — Archive Index | `Mở case study` |
| Contact/CV utility | How do I verify/reach him? | Text/action | E — Utility | `Gửi email` |

Five material roles use five composition families, exceeding the 3-family minimum.

## Composition proofs

### A — Homepage

```text
Header: Do Anh Nghia | Work Experience Contact CV ◐

01 / PORTFOLIO
[8 cols] Large Vietnamese positioning statement
          short proof-led intro + Work/CV actions
[3 cols] restrained editorial portrait

hairline project index cue
01 LuxRoom · 02 Atelier · 03 StudioOS · 04 Capital · 05 VAS
```

### B — Personal case study

```text
Back / Contact / CV

[3 cols metadata rail]  [9 cols project title + thesis]
role / platform / focus

FULL-WIDTH NATIVE-COLOR PROJECT IMAGE
caption / constraint / status
```

### C — Redesign case study

```text
Back / Contact / CV

[7 cols change thesis]  [5 cols role + scope]

PROJECT-NATIVE SYSTEM FIELD
problem cues · hierarchy · decision logic
```

## CTA and system truth

Homepage dominant action: `Xem dự án chọn lọc`; secondary `Mở CV`; high-intent close uses real `mailto:`.

Project pages: live site action when available, then next/back project, then email close.

No form, booking or simulated success state is introduced.

## Viewports

- 1280: 24–32px gutters; metadata rail may compress but stays visible.
- 1440: primary design-review viewport.
- 1920: cap shell/text line lengths; extra width becomes breathing room.
- Tablet/mobile: `N/A_JUSTIFIED` by explicit scope. Do not claim fully responsive.

## Do / Do not

Do: proof before autobiography; one clear action per context; native project color; shared-root fixes before page patches; concise evidence-aware Vietnamese copy.

Do not: glossy luxury effects, universal case hero, rounded-card grids everywhere, fake metrics/testimonials, route deletion without migration rationale, or production/UX claims without evidence.

## Implementation gate

Code must trace to this contract. Visual completion remains blocked until actual desktop screenshots can be inspected at 1280/1440/1920; source checks do not substitute for rendered QA.
