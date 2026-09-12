# UIUX Factory v5 — Senior-signal portfolio redesign

Date: 2026-09-12
Branch: `redesign/uiux-factory-senior-signal-v5`
Release authority: **NO MERGE until cloud QA + visual gate pass**
Runtime constraint: **GitHub/cloud only; no local Workbench or localhost bridge used for project execution.**

## 0. Development Manager interpretation

**Goal**: redesign the portfolio so recruiters immediately perceive strong UI/UX craft and the behaviors expected from senior designers, while keeping project reality and experience level truthful.

**Website type**: portfolio.
**Mode**: production-candidate on feature branch.
**Risk**: medium/high because the artifact is itself evidence of UI/UX skill and because overstating seniority would damage trust.
**Authority**: branch write + PR; no merge/release.

Flow selected from `skills_UIUX/FLOW-AGENT-OS.md`: professional website redesign lifecycle with evidence gates and bounded repair.

---

## 1. Research stage — PASS

### Source audit

The current repository was inventoried before implementation. It is a static GitHub Pages portfolio with:

- homepage `index.html`;
- multiple public case-study HTML routes;
- shared CSS/JS layers;
- CV source and public PDF;
- local project media;
- `.agents/skills/*` copied from the UIUX skill system;
- an existing `docs/uiux/` evidence set containing project truth, IA, design contract, design system, visual signature, browser strategy, release readiness and decision logs.

Important current truth from the CV/source:

- role label is UI/UX Designer, not Senior Product Designer;
- recent roles: MangoAds, Tikera Technology & Brand Development, Trésor Solution Company;
- flagship portfolio projects are independent concepts/redesigns and implemented prototypes unless explicitly stated otherwise;
- no verified production conversion/revenue metrics exist for the personal concepts, so no metrics are invented.

### External benchmark research

Sources reviewed before the v5 direction was locked:

1. Figma — “Product design portfolio tips from a Figma recruiter”
   - https://www.figma.com/blog/product-design-portfolio-tips-from-a-figma-recruiter/
   - Key implication: hiring leads have little time; landing pages must communicate role, strengths and relevant work quickly. Avoid interaction spectacle that harms usability.
2. Nielsen Norman Group — “UX Portfolios: What Hiring Managers Look For”
   - https://www.nngroup.com/videos/ux-portfolios-hiring/
   - Key implication: expectations differ by level; process and design thinking matter, not only polished screens.
3. Nielsen Norman Group — User Experience Careers report
   - https://media.nngroup.com/media/reports/free/UserExperienceCareers_2nd_Edition.pdf
   - Key implication: strong candidates connect work to user/business outcomes and apply UX quality to the portfolio itself.
4. Interaction Design Foundation — portfolio guidance
   - https://assets.interaction-design.org/literature/article/what-should-a-ux-design-portfolio-contain
   - Key implication: portfolio craft is evaluated as design evidence; presentation sloppiness is itself a signal.
5. Current live portfolio references reviewed for composition patterns and information scent: Philip Demir, William Bee, Nancy Liu, Jules Bennett, Nate Mills and other current product-design portfolios returned by web research.
   - Repeated useful pattern: immediate positioning → selected work → explicit scope/role/outcome → deeper case evidence → contact.

### Research synthesis

Recruiter questions the homepage must answer without digging:

1. What kind of designer is this?
2. What problems can they handle?
3. Is this real client/shipped work, a redesign, or a concept?
4. Can they reason beyond final UI?
5. Can they work in systems and with engineering constraints?
6. Is the craft level high enough to justify opening a case study?
7. Is the person credible and easy to contact?

**Research gate**: PASS. Evidence is sufficient to move from “make it prettier” to a specific recruiter decision model.

---

## 2. UX / IA stage — PASS

### Primary journey

`Identify role → scan senior signals → inspect one strong project → understand problem/decision/proof → verify range/systems/delivery → verify experience → contact or resume`

### Revised homepage IA

1. Header / utility navigation
2. Hero positioning + truth label + proof summary
3. Selected Work — four deliberately different design muscles
4. Capability Proof — interactive evidence tabs
5. Systems / additional work
6. How I Work — evidence-gated loop
7. Experience — verified roles only
8. Contact

### Case-study selection logic

- **VAS Education** leads because it demonstrates IA and redesign reasoning.
- **Capital Place** demonstrates domain modelling and decision support.
- **LuxRoom** demonstrates commerce systems and product-detail decisions.
- **Atelier** demonstrates visual craft and interaction hierarchy.

This sequence intentionally avoids making the first impression “four pretty ecommerce sites.”

### Route policy

No route migration. Existing case-study URLs remain intact so shared links and search indexing are not broken.

**IA gate**: PASS. Every homepage section has a recruiter-facing job and every flagship card exposes project reality + design decision + available proof.

---

## 3. Art direction stage — PASS

### Direction name

**Evidence-led Editorial / Decision Ledger**

### Visual signature

The portfolio should feel like a designer’s decision notebook crossed with a contemporary editorial product page:

- oversized compressed hierarchy;
- evidence indexes (`01 / 04`, `PROBLEM`, `DECISION`, `PROOF`);
- warm paper + near-black foundation;
- one unmistakable signal color (`#C8FF3D`) used for proof/status/focus rather than decoration;
- project-native color appears inside project evidence;
- asymmetric grid and strong rules instead of generic rounded-card UI;
- subtle pointer glow and reveal motion as progressive enhancement only;
- serif italic is used sparingly as editorial tension, not faux-luxury branding.

### Anti-generic rules

Do not use:

- glassmorphism;
- floating gradient blobs;
- generic “passionate designer crafting delightful experiences” copy;
- skill percentage bars;
- fake testimonials;
- invented KPIs;
- 20-tool logo walls;
- carousel navigation for core work;
- animation that must finish before work can be read.

**Art-direction gate**: PASS. The signature is identifiable without relying on novelty interaction.

---

## 4. Design contract — PASS FOR IMPLEMENTATION

### Positioning contract

Public title remains **UI/UX Designer**.
The portfolio demonstrates senior behaviors but does not claim a senior job title unsupported by the CV.

Hero promise:

> Turn ambiguous requirements, dense content and complex workflows into clear product decisions, responsive interface systems and working prototypes.

### Content truth contract

Each flagship project must expose one of these reality labels:

- Independent redesign
- Independent concept
- Implemented prototype
- Live prototype

Personal projects may describe intended decisions and demonstrated flow coverage, but may not claim production business impact without evidence.

### Interaction contract

- all core content usable without hover;
- tab interaction follows ARIA tab semantics and keyboard navigation;
- theme preference is optional enhancement;
- reduced motion exposes content immediately;
- external links are explicitly identified to assistive technology;
- mobile navigation is a real button with `aria-expanded`.

### Responsive contract

Target widths: 390, 768/900 pressure, 1280, 1440, 1920.
No horizontal overflow is acceptable.
Core CTA, project reality, project title and case-study link must remain visible at mobile width.

### Accessibility contract

- semantic landmarks and heading hierarchy;
- skip link;
- visible focus;
- no color-only critical state;
- keyboard-accessible tabs/navigation;
- meaningful project alt text;
- Axe serious/critical violations = 0 for homepage cloud gate.

### Performance contract

- static HTML/CSS/JS architecture preserved;
- no framework migration;
- no animation library;
- no mandatory third-party runtime JS;
- explicit image dimensions;
- below-fold media lazy loaded.

---

## 5. Design system — PASS

### Core tokens

- `--paper #F3F0E9`
- `--paper-2 #E9E5DC`
- `--ink #0B0D10`
- `--muted #676B70`
- `--signal #C8FF3D`
- dark theme maps the same semantic roles instead of inventing a second brand.

### Type roles

- Sans/system stack: navigation, body, interface labels.
- Serif/system stack: controlled editorial emphasis only.
- Mono/system stack: evidence metadata, gates, indexes.

No remote font dependency is required for the v5 surface.

### Spacing / layout

- page max width 1500 px;
- fluid side padding;
- wide editorial grid desktop;
- one-column narrative mobile;
- 82 px desktop header / 70 px compact header;
- large stage rhythm (96–180 px) so evidence groups remain distinct.

### Reusable components

- Brand / nav / resume utility
- Evidence label
- Primary / quiet CTA
- Section heading contract
- Case card
- Problem–Decision–Proof grid
- Capability tab set
- System card
- Process ledger
- Experience row
- Contact utility list

### States

Interactive components implement default, hover, focus-visible, active/selected and mobile/open states. Reduced-motion is a first-class state.

---

## 6. Visual composition — PASS FOR BUILD

Desktop composition priorities:

- hero uses ~60/40 text/evidence split;
- opening headline is the memorable visual moment, but proof metadata sits in the same viewport;
- selected work switches to dark canvas to create a meaningful chapter transition;
- first case is largest and uses a purpose-built VAS interface composition rather than fake stock imagery;
- other projects use real project assets;
- capability section behaves like an evidence inspector rather than a skill list;
- process section exposes gates, making the portfolio itself evidence of design maturity.

Mobile composition removes side-by-side dependencies and keeps decision/proof content before decorative effects.

---

## 7. Implementation stage — COMPLETE ON FEATURE BRANCH

Files introduced/replaced by v5:

- `index.html` — new proof-first homepage
- `portfolio-v5.css` — isolated design-system + responsive implementation
- `portfolio-v5.js` — theme, nav, reveal, progress, accessible tabs, pointer enhancement
- `.github/workflows/portfolio-cloud-qa-v5.yml` — GitHub-hosted browser gate
- `qa/portfolio-v5.spec.mjs` — rendered behavioral/a11y/link/overflow checks + screenshots
- this evidence document

Legacy CSS/JS and case-study files remain in the repository for route stability and rollback. The v5 homepage does not depend on the old homepage CSS stack.

---

## 8. Cloud browser QA gate — PENDING RUN

The workflow runs on pushes to the v5 branch and PRs targeting `main`.

Hard gates:

- homepage loads in Chromium;
- no serious/critical Axe violations;
- no horizontal overflow at desktop and mobile viewports;
- primary navigation and capability tabs work with keyboard semantics;
- flagship case-study links resolve from the cloud runner;
- recruiter-critical content exists in DOM;
- screenshots are captured as artifacts for visual critique.

Soft / diagnostic gates:

- Lighthouse performance/accessibility/best-practices/SEO report;
- screenshot-based visual critique at desktop and mobile.

Release remains blocked until the run is inspected and any gate failures are repaired.

---

## 9. Skill execution ledger

Applicable skills from the repository’s UIUX library were routed by stage rather than blindly loaded at once:

| Skill | Applied evidence |
|---|---|
| product-discovery | owner goal, recruiter decision questions, truth/risk framing |
| ux-research-and-journey | benchmark synthesis, primary journey |
| information-architecture | homepage sequence, route preservation, project selection logic |
| ux-laws-and-heuristics | scanability, visibility, progressive disclosure, clear labels |
| brand-guidelines | constrained palette and truthful self-brand system |
| visual-design-direction | Evidence-led Editorial signature + anti-generic rules |
| design-system-and-components | semantic tokens, reusable component/state contracts |
| conversion-and-content | recruiter scan copy, explicit CTAs, truth labels |
| responsive-and-device-strategy | desktop/mobile composition and overflow gate |
| accessibility | semantics, focus, tabs, reduced motion, Axe gate |
| frontend-implementation | isolated static implementation, no framework migration |
| testing-strategy | browser assertions and cross-viewport smoke tests |
| web-quality-and-performance | explicit media dimensions, no runtime library, Lighthouse diagnostics |
| seo-strategy | canonical/schema/meta preserved and strengthened |
| security-and-privacy | no new form/backend/data capture; safe external-link rel policy |
| code-review-and-release | feature branch + PR + no-merge release rule |
| website-delivery-pipeline | research → IA → direction → contract → build → QA → repair traceability |

---

## 10. Next gate

`CLOUD_QA → VISUAL_CRITIQUE → REPAIR if needed → PR readiness review`

No merge is authorized by this document.
