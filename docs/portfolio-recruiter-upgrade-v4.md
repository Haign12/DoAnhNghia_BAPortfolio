# Portfolio Recruiter Upgrade V4

## Audience and top task

Primary audience: UI/UX / Product Design recruiter, hiring manager, design lead, product lead.

Primary top task: determine role fit quickly, then inspect enough evidence to decide whether to start an interview.

Core journey:

```text
first impression
→ see actual interface work
→ understand project reality + role
→ inspect design reasoning / evidence
→ assess breadth and craft
→ resume / contact
```

## Design contract

### Positioning

`UI/UX Designer · Systems Thinking · Front-end Prototyping`

Promise: turn complex content and workflows into clear responsive interfaces, from information architecture and visual systems to interactive prototypes.

### Portfolio DNA to preserve

- editorial tension between DM Sans and Instrument Serif;
- DM Mono for evidence, project state and system labels;
- black/paper contrast;
- grid-line / indexed-document language;
- restrained motion with reduced-motion fallback;
- explicit project reality and evidence boundaries.

### Homepage hierarchy

1. Positioning / role clarity.
2. Featured Case Studies: Atelier, LuxRoom, Capital Place, VAS Education.
3. Capability proof: Structure / Interface / Prototype.
4. Project Archive: Vietbank, QTSC, StudioOS.
5. Tools & Systems: UI Feedback Tool, skills_UIUX.
6. Design practice.
7. Experience.
8. Contact.

The project list follows the owner's previously selected curation. This upgrade changes proof and hierarchy, not project membership.

### Project-card contract

Each card must show:

- actual project UI when a local rendered asset is available;
- a faithful interface/system preview only when a rendered asset is not locally available;
- project type/reality (`Independent concept`, `Independent redesign`, `Product concept`, `Design tool`, `Open-source system`);
- implementation reality (`Implemented prototype`, `Interactive prototype`, `First slice`, etc.);
- exactly two actions: `Live Demo` and `Case Study`.

Do not use abstract title art as the primary evidence for a visual-interface project when a real implemented screen is available.

### Case-study contract

Case studies are English-first and prioritize:

```text
context / scope reality
→ problem or decision tension
→ decision model
→ interface / evidence proof
→ outcome boundary
→ reflection / next validation
```

A case must not manufacture research, conversion, accessibility, production or business outcomes. When evidence is absent, state the next validation step.

## Reference research

External research used for principles, not cloning:

- Nielsen Norman Group — UX Portfolios: What Hiring Managers Look For.
- Nielsen Norman Group — UX Portfolios: Preparing for Interviews.
- Nielsen Norman Group — Creating a UX Design Portfolio Case Study.
- Nielsen Norman Group — User Experience Careers (2nd Edition), hiring-manager portfolio findings.

Key synthesis: a portfolio must first win the interview, expose thought process and decision rationale, and connect work to user/business value where evidence exists.

## skills_UIUX routing used

- `portfolio-website`
- `audience-intent-and-top-tasks`
- `design-reference-research-and-benchmark`
- `visual-design-direction`
- `asset-media-and-art-direction`
- `brand-distinctiveness-and-visual-signature`
- `ui-craft-and-visual-qa`

## QA status for this change

### Source / structural checks

- portfolio project membership preserved;
- every project card retains exactly `Live Demo` + `Case Study`;
- project reality labels are explicit;
- Featured uses real local UI assets for Atelier, LuxRoom and Capital Place;
- StudioOS explicitly distinguishes implemented first slice from future product scope;
- case studies are English-first;
- reduced-motion rules remain in the V4 work system.

### Rendered visual QA

`UNVERIFIED` until the updated branch is inspected in a browser at representative desktop and mobile widths.

Source review, valid HTML structure and successful GitHub mergeability are not substitutes for rendered craft inspection.
