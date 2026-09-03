# Redesign Delta Contract

The redesign is invalid if the OLD/NEW difference is mainly font, color, radius, shadow or animation. Structural deltas below are mandatory.

| Dimension | OLD | NEW contract | Why it matters | Verification |
|---|---|---|---|---|
| Hierarchy | large decorative hero, marquee and About precede Work | role/positioning immediately hands off to selected work; proof becomes primary visual hierarchy | hiring users need evidence quickly | same-viewport OLD/NEW first-screen comparison |
| Composition / silhouette | split tech hero with orbit/grid portrait; repeated boxed/card rhythms | editorial asymmetric proof index; case-role-specific top compositions | makes redesign recognizable and task-specific | cross-page top screenshot montage |
| Journey / decision sequence | identity → decoration → about → work → experience → contact | identify role → proof → project reasoning → fit/background → contact | aligns owner conversion with user confidence | task walkthrough from home and deep entry |
| Page-role differentiation | personal cases share same title/actions/metrics/image shell; FlowCRM drifts separately | 4 composition families: Home index / artifact-led / change-thesis / system-model | consistency without template monotony | compare Home/LuxRoom/VAS/FlowCRM screenshots |
| Media dominance | portrait/orbits strong; project proof often grayscale | native-color project proof owns visual attention; portrait supports identity | portfolio work is the evidence | media area/color/crop inspection |
| CTA/proof placement | contact visible in hero; case action row before deeper reasoning | project selection is first narrative CTA; contact remains utility and strengthens after proof | reduces premature conversion pressure | content-order inspection |
| Interaction/state | marquee/progress/reveal/theme create many signals | only orientation/state feedback retained; reduced motion remains truthful; no fake success | quieter luxury + accessibility | keyboard/motion/state QA |
| Content evidence | project descriptions emphasize result/look; narrative depth inconsistent | role/problem/constraint/decision/proof/outcome/limitation model | demonstrates how the designer thinks | case-study content audit |
| Visual grammar | clinical monochrome + tech grid/orbit/pills + blanket grayscale | warm editorial materiality, hairlines, restrained accent, sparse controls | luxury through restraint not effects | token/render review |
| Navigation | anchor menu works but Home is biography-first | Work-first global emphasis; deep case routes orient and continue | supports both homepage and deep entry | navigation walkthrough |
| Design-system ownership | shared CSS plus FlowCRM inline island | shared semantic foundations + page-role composition patterns | prevent CSS patch layers and drift | code-owner review in implementation phase |
| Language | English primary content | Vietnamese primary experience per config | project constraint alignment | content review |

## Mandatory visible recognizability

At 1440px, an evaluator viewing OLD vs NEW Home side by side must be able to identify all of these without reading implementation notes:
1. selected work appears substantially earlier;
2. orbit/grid/marquee no longer define the first experience;
3. project proof media is visually dominant and not globally grayscale;
4. page reads as editorial/luxury restraint rather than a tech template;
5. card/pill repetition is materially reduced.

For case-study comparison, the evaluator must be able to distinguish Personal vs VAS vs FlowCRM top compositions by structure even if project names are hidden.

## What does NOT satisfy the delta

- only changing white to ivory;
- only switching sans ↔ serif;
- adding bronze/gold accents;
- reducing border radius;
- swapping portrait/project images;
- adding/removing animation while keeping the same hierarchy;
- applying one new hero to every case-study page.

## Acceptance status

Contract definition: DONE_VERIFIED.
Rendered OLD/NEW recognizability test: future implementation verification; OLD baseline capture is currently BLOCKED.