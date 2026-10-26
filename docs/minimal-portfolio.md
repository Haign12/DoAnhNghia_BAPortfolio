# Minimal portfolio trial, 26 October 2026

## Scope and authority

Requested by the owner: use Ngh1aa/uiux-ai-workspace to make the existing portfolio minimal, concise, polished and capable of demonstrating design ability. The initial trial was implemented and reviewed locally. On 26 October 2026, the owner explicitly authorized merging this reviewed change into main. Publication proceeds through a feature branch, PR and cloud QA; merge and deployment results must be verified separately. Existing case-study URLs, research facts, employment history, CV and contact destinations are retained. The homepage is redesigned; case-study visual templates are unchanged.

Source baseline: portfolio `09d81a7c43777bb526ced82d6f003905dcddf59b`. The live homepage matched that source during the initial capture. Factory was freshly cloned and its current START-HERE, AGENTS, TASTE, CRAFT and WORKFLOWS used. The historical manifest/CONTRACT-OWNERSHIP routing files no longer exist in the current Factory. No Factory source was modified.

Task size M: one portfolio entry page, inherited detailed project pages. Read the four M skills, portfolio playbook, reference research and responsive strategy. Relevant quality rules are adapted to the existing buildless HTML/CSS/JS site.

## Brand brief and problem

- Source level B: existing wordmark/name, monochrome identity, project screenshots, portrait and content. Brief authorizes a visual redesign.
- Audience HYPOTHESIS: recruiter/hiring manager, then design lead; desktop comparison and mobile scanning. No new interviews or usability sessions.
- Top tasks: understand the role, inspect relevant projects, see paid experience, obtain CV/contact.
- Outcome metric: recruiter comprehension/application response UNKNOWN. Reducing visible repetition is a design intervention, not measured hiring impact.
- Assets: existing project media and portrait; no fabricated project UI or AI imagery. Existing English portfolio copy retained as the site language; Vietnamese owner name supported.
- Preserve: Nova/Sentry/LuxRoom ordering, 14 existing project destinations, case/Figma/prototype/source links, canonical CV, historical role titles and dates, independent-concept and research limitations, old navigation anchors.

## UX structure and five scenario walkthroughs

Flow: introduction → selected project → case/prototype/Figma → browser back → CV/contact. Alternative: direct project/category anchor → project index expands → relevant case. No JavaScript: all core copy and links remain HTML; native details exposes all 14 projects; nav remains visible. A broken external service can be recovered through the local case and alternative resource links, whose availability is independent.

| Scenario, agent heuristic | Intended result | Implementation |
|---|---|---|
| Recruiter scanning the first screen | Identify Product Designer and find work | Role, one headline, short positioning and work CTA; Nova begins within the first viewport |
| Design lead inspecting depth | Open decisions and limitations | Three featured cases, concise evidence notes and direct artifact links |
| Mobile visitor interrupted in navigation | Dismiss and resume | Menu closes on selection, outside click or Escape; Escape returns focus |
| Returning visitor with category deep link | Reach the same project | Existing group anchors retained; ancestor disclosure opens |
| Visitor without JS or with reduced motion | Read work and contact without waiting | Static narrative, native disclosure, no entrance gate, reduced-motion rules |

States: index closed/open, each category selected/reset, navigation closed/open, system/manual light/dark, no JS, keyboard focus, image loading and enlarged text. There is no data-entry or remote-data workflow, so form validation and remote empty/error screens are not applicable. External app availability is not guaranteed by local QA.

## Visual plan

Domain object: a designer's project contact sheet. Sensation: calm, precise, confident.

- Type: local Be Vietnam Pro 400/500/600; Georgia italic for a restrained editorial contrast. Display 120px maximum desktop, 48-68px mobile; body 14-23px; control/meta minimum 12px; body leading 1.6-1.8.
- Colour roles: page #fafaf8, text #202320, secondary #60665f, action #285440; dark mode uses corresponding semantic tokens in brand.css.
- Shapes: project/index surfaces 8px; controls 6px; portrait/contact control circles by function. Flat surfaces, no decorative shadows.
- Container: max 1280px; gutters 20px mobile and fluid desktop; section spacing 72-128px. One dominant call to action per region.
- Signature: large sans headline with one serif italic line, real project media ahead of self-description, a restrained optional project index.
- Dials: variance 6, motion 3, density 3. Only hover/pressed feedback; reduced motion removes transforms/transitions.

```text
Name                 Navigation                Resume/theme
Product Designer
Complexity,
made clear.
Short positioning                            Explore work
Selected work
Nova: wide real product image, problem, evidence, resources
Sentry                                  LuxRoom
Optional 14-project index
About / Experience → Practice / Writing → Contact
```

Two materially different candidates were rendered with the same copy, claims, links and assets. A uses a large editorial introduction, a wide Nova image and two supporting cases. B uses a compact split introduction, sans-only heading and equal three-up project grid. A was selected as an agent design hypothesis because it gives the flagship a clear reading priority and room for product media. B shows breadth earlier but makes all cases compete equally. Candidate B is a temporary comparison, not an extra product page. No human preference study was performed.

Three differences from the Factory starter beyond colour: editorial type pairing; asymmetric featured-project composition; native expandable project index. The existing homepage structure is reused at the semantic level; the full starter dependency stack is not imported into this small static site.

## Reference decisions

- [Adham Dannaway](https://www.adhamdannaway.com/): explicit professional identity and direct work access. Adapt the principle to one Product Designer identity; do not copy the split designer/coder portrait.
- [Rauno Freiberg](https://rauno.me/): restrained information and inspectable craft. Adapt concise copy and lightweight controls; do not copy custom interactions.
- Simon Pan and Julie Cho were attempted but unavailable to the retrieval tool. No visual claim is based on those unavailable pages.
- Current portfolio: preserve actual projects and evidence, retire repeated capability grids, competing AI-workflow sections and oversized portrait composition.

## Independent rendered review

A second agent inspected native-size crops of desktop/mobile, light/dark, with project media decoded. No P0/P1 overlap, clipping, unreadable foreground or destructive crop was observed. It identified insufficient screenshot loading and small secondary target areas; captures were corrected and targets enlarged to at least 44x44. Review is agent-heuristic, not participant research or proof of WCAG conformance.

Visual appearance scores: task clarity 4.5, hierarchy 4.5, spacing 4, type 4, component consistency 4, content 4, responsiveness 4, distinctiveness 4. The reviewer did not infer interaction success from screenshots, and did not calculate an overall rubric average while that dimension remained unverified.

Seven-sign review, homepage at 1440/390 light/dark: AI-01 competing neon absent; AI-02 glow/aurora absent; AI-03 emoji navigation absent; AI-04 purple appears only as source project UI within the Sentry image, purposeful; AI-05 card nesting absent in default view (expanded archive cards group individual project resources); AI-06 coloured sidebars absent; AI-07 invented status dots absent.

## Verification notes

Use the paired delivery QA report for final run counts and limitations. Brand tokens and static checks pass. taste-check reports zero errors with axe enabled across 390/768/1280/1440 and 320 reflow. Its remaining edge warnings calculate distance to each data-screen section's border, which is already inset from the viewport; the actual mobile viewport gutter is 20px. Line-ending warnings are reviewed as layout signals; paragraphs use text-wrap:pretty. Warnings are not silently converted into proof of quality.

Existing QA suites were migrated from superseded portrait, rail, verbose badge and full-width mobile CTA expectations to the authorized minimal design. Their destination ordering, honest evidence, case-study, no-JS, responsive and accessibility protections remain. The previous case CTA expectation said Source code and Live demo while the current case renderer says Source and Live prototype; those labels are aligned without changing case data.

No TypeScript compilation or application build applies to this buildless project. Browser QA does not establish recruitment outcomes, human research, real-device coverage, full screen-reader behavior or external private-Figma access.

## Third-party notices

Be Vietnam Pro font files are copied from Factory's @fontsource 5.3.0 vendor under SIL Open Font License 1.1; OFL.txt accompanies the fonts. The homepage semantic token layer is adapted from Ngh1aa/uiux-ai-workspace/design-system/starter/brand.css, Apache-2.0. Preserve the accompanying Apache license/notice in assets/licenses. Existing portfolio media remain from the original project. No third-party skill implementation is redistributed.
