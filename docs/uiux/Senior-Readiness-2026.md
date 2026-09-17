# Senior Readiness 2026 — Evidence-First Portfolio Audit

Date: 2026-09-17  
Scope: `Haign12/DoAnhNghia_BAPortfolio` + selected project repositories  
Method: UIUX Factory source-of-truth / evidence-state rules + current 2026 hiring benchmarks.

## Positioning

Recommended public positioning:

> **Product Designer focused on complex flows, interaction systems and design-to-code delivery.**

Supporting line:

> I turn ambiguous product problems into clear flows, reusable interface systems and testable prototypes — then stay close to implementation and QA.

This positioning is intentionally capability-led rather than self-assigning a Senior title. The portfolio should prove senior-relevant behaviors while keeping work-history claims accurate.

## Evidence taxonomy

Every claim in the portfolio must be one of:

- **Measured** — an actual metric collected from a real product, test or analytics source.
- **Observed** — a real behavior/issue observed in research or usability testing.
- **Benchmark** — a pattern or fact sourced from an external product/documentation.
- **Hypothesis** — a design/product belief that still needs validation.
- **Target metric** — the metric the project intends to improve.
- **Projected impact** — a forecast, never presented as an achieved outcome.

Independent concepts must never imply production adoption, revenue, conversion, team collaboration, stakeholder feedback or user testing that did not happen.

## Senior readiness matrix

| Capability | Evidence state | Current proof | Gap / next proof |
|---|---|---|---|
| Visual hierarchy / typography / layout | Strong evidence | Multiple implemented responsive prototypes and portfolio UI | Keep visual QA artifacts for flagship pages |
| Interaction / motion craft | Strong evidence | Implemented interactions across Atelier, Nova, Access, Sentry and portfolio | Document motion purpose and reduced-motion verification per flagship |
| Responsive behavior | Partial → strong | Nova explicitly contracts 1440/1024/768/390; other projects vary | Add behavior annotations, not screenshot-only proof |
| Component states | Partial evidence | Nova component-state screen; project-specific state work exists | Normalize state coverage and show one design→code component example |
| Problem framing | Partial evidence | Nova has a strong product thesis; Atelier case study is evidence-safe | Rewrite Sentry and supporting summaries away from marketing claims |
| Research / discovery | Weak evidence | Benchmark research exists | No fabricated interviews; add research objectives, participant profile and scripts |
| IA / flows | Strong evidence | Nova sitemap/user flows; Sentry decision flow; Access role/permission surface | Expose only the flows that materially explain decisions |
| Edge cases / recovery | Strong in Nova/Sentry, partial elsewhere | Freeze/unfreeze, insufficient funds, offline/KYC recovery; Sentry rule conflicts | Add recovery evidence to case studies, not just prototype screens |
| Accessibility | Partial evidence | Visible focus/reduced-motion patterns and QA infrastructure exist | Replace compliance badges with issue→response→implementation→verification evidence |
| Usability validation | Missing measured evidence | No verified moderated test results found | Run baseline + iteration tests before claiming usability improvement |
| Product thesis / JTBD / hypotheses | Partial evidence | Nova strong; other projects uneven | Standardize flagship thesis and non-goals |
| Prioritization / alternatives | Weak evidence | Some decision rationale exists | Add 2–3 rejected alternatives per flagship with trade-offs |
| Success metrics | Weak evidence | Concepts imply desired outcomes | Define primary/secondary/product/business/guardrail metrics as targets, not results |
| Design tokens / reusable components | Partial → strong | Multiple design-system artifacts and reusable patterns | Show inventory-based consolidation only where source counts can be verified |
| Governance / versioning / deprecation | Weak evidence | UIUX Factory demonstrates process rigor | Add concise component governance model; do not pretend organizational adoption |
| Design ↔ code parity | Strong evidence | Designer-owned implementation across static HTML/CSS/JS prototypes | Show 1–2 concrete component traces in flagship case studies |
| QA / quality ownership | Strong evidence | Existing Playwright tests + UIUX Factory cloud QA model | Publish latest branch QA evidence and repair log |
| Product direction influence | Partial evidence in personal projects | Designer selects thesis, system boundaries and trade-offs | Keep phrasing as ownership of independent concept, not stakeholder influence |
| Mentoring / organizational leadership | Missing evidence | No verified evidence in repository | Do not fabricate. Demonstrate quality frameworks and critique methodology instead |
| Product/business impact | Missing measured evidence for personal projects | Implemented prototypes, not production products | Target metrics + validation plans until real measurements exist |

## Flagship architecture

### 1. Nova — Product Thinking / Consumer Fintech

Story job: prove product framing, decision support, financial information hierarchy, risk prevention, recovery and metrics literacy.

**Problem**  
Account balance alone does not tell a person what is safe to spend once upcoming obligations, savings intentions and a protected buffer are considered.

**Product thesis**  
If current balance, known commitments, planned savings and a protected buffer are combined into a forward-looking Money Horizon, users may be able to make everyday spending decisions with less uncertainty.

**Benchmark patterns**
- Left-to-spend / upcoming-payment context is an established personal-finance pattern.
- Upcoming commitments should affect the interpretation of available money rather than appear as a disconnected calendar.
- Risk/protection actions require explicit consequence and recovery paths.

**Validation status:** hypothesis + implemented prototype. No measured user or business outcome claimed.

### 2. Sentry — Enterprise / Fraud & Risk Operations

Story job: prove dense information design, evidence correlation, exception handling, rule conflicts, irreversible decisions and auditability.

**Problem**  
A fraud analyst must evaluate multiple signals before a high-consequence allow/block/escalate decision; fragmented evidence and unclear rule precedence increase cognitive overhead and decision risk.

**Product thesis**  
A prioritized queue + unified evidence workspace + persistent decision dock can reduce context switching while preserving explainability and an auditable rationale.

**Benchmark patterns**
- Fraud systems separate automated rules from manual-review queues.
- Rule ordering and precedence matter because allow/block/review logic can conflict.
- False-positive cost is a product risk; high-risk UX should support review and escalation rather than imply certainty without evidence.

**Validation status:** benchmark-informed independent concept. No verified MTTD, false-positive-rate or loss-prevention improvement is claimed.

### 3. Atelier — Visual / Interaction Craft

Story job: prove art direction, commerce hierarchy, responsive craft, motion restraint and brand-vs-usability judgment.

**Problem**  
Luxury/editorial expression can build desire while hiding fit, variant, availability, delivery and return information needed to make a purchase decision.

**Product thesis**  
Editorial expression should dominate early discovery, then progressively yield to practical product information and clearer transactional states as intent rises.

**Benchmark patterns**
- Fashion PDPs surface fit, material/composition, size/measurements and delivery/returns close to the decision.
- Luxury after-sales/care information contributes to ownership confidence beyond the initial purchase.

**Validation status:** implemented prototype. No conversion or usability improvement claimed.

## Supporting work

Supporting projects stay concise and prove breadth rather than competing with flagship depth:

- **LuxRoom** — high-consideration furniture commerce; product detail confidence, materials, dimensions, room context and consultation.
- **Access** — physical/digital access concepts, credentials, permissions and visitor flows; all technical/compliance claims must be labeled prototype/target unless verified.
- **Flux** — treasury / multi-currency operations; retain as systems/data-density breadth.
- **Violet Marketplace** — marketplace / retail breadth.
- **VAS Education** — education IA and parent decision journey.
- **Capital Place** — leasing decision-support UX.
- **CENNEXT / VOLTIS / UIUX Factory** — supporting implementation/system evidence where relevant.

## Flagship product principles

### Nova
1. Future obligations before optimistic balance.
2. Explain the consequence before a financial commitment.
3. Risk states must remain recoverable.
4. Money hierarchy must work without color alone.

### Sentry
1. Evidence before action.
2. Density without context switching.
3. Uncertainty must be visible; the UI should not pretend a model is certain.
4. High-consequence actions require rationale and auditability.
5. Recovery/escalation is part of the happy path for operations tools.

### Atelier
1. Brand expression must not obscure shopping clarity.
2. Information density should follow purchase intent.
3. Motion should communicate relationship/state, not decorate every section.
4. Mobile commerce is recomposed, not merely collapsed.

## Major trade-offs to document

### Nova
- Forecast richness vs cognitive load.
- Fast transfer flow vs explicit review/safety context.
- Risk protection vs accidental lockout/friction.

### Sentry
- Information density vs novice learnability.
- Fast decisioning vs review depth.
- Automated confidence vs analyst override/explainability.
- Persistent actions vs accidental destructive decisions.

### Atelier
- Editorial immersion vs product findability.
- Animation richness vs performance/reduced motion.
- Minimal luxury surfaces vs explicit commerce states.

## Validation plan — no fabricated research

### Participant profiles

**Nova:** digital-first account holders with recurring bills/subscriptions and active day-to-day spending decisions.  
**Sentry:** fraud/risk operations practitioners or adjacent payments/risk professionals; if unavailable, clearly label proxy/expert review separately from target-user testing.  
**Atelier:** mobile fashion shoppers who compare size/variant/delivery information before purchase.

### Core usability tasks

**Nova**
1. Determine how much money is safe to spend before the next recurring obligation.
2. Identify why the projected balance changes over the next two weeks.
3. Review an unusual transaction and protect the account.
4. Recover from an accidental freeze or failed authentication.
5. Send money and explain the effect before confirming.

**Sentry**
1. Identify which alert deserves attention first and explain why.
2. Correlate transaction, identity, device and network evidence.
3. Resolve a rule conflict without losing evidence context.
4. Choose allow/block/step-up/escalate and record rationale.
5. Find the audit trail for a resolved case.

**Atelier**
1. Find a relevant item from editorial discovery.
2. Determine fit/size and compare a variant.
3. Find material/care and delivery/return information.
4. Add the intended variant and complete the primary mobile cart path.
5. Recover from unavailable size/stock.

### Planned baseline / iteration metrics

- Primary UX metric: task success.
- Secondary: time on task, errors/misclicks, assistance required, confidence/SEQ.
- Product metric (target): feature/path adoption appropriate to each concept.
- Business metric (target): conversion/retention/operational efficiency only as a future measurement, never as achieved impact.
- Guardrail: error/reversal/support burden or false-positive friction depending on domain.

No numeric result should appear until the test/analytics source exists.

## Design-system upgrade

A portfolio-grade system page must move beyond a UI kit:

1. **Foundations** — primitive + semantic color, type, spacing, radius, elevation, grid, icon and motion tokens.
2. **Components** — anatomy, variants, loading/error/disabled/focus/selected states, keyboard behavior and responsive adaptation.
3. **Patterns** — search/filter, confirmation, destructive actions, permissions, empty states, notifications and recovery.
4. **Governance** — when a component becomes shared, what remains product-specific, contribution criteria, deprecation/versioning and design↔code parity.
5. **Scale proof** — only use before/after counts produced by an actual source inventory.

## Accessibility evidence contract

Target: WCAG 2.2 AA where applicable; do not display an unqualified “compliant” badge without a complete audit.

For flagship cases show at least one concrete chain:

`issue → design response → implementation → verification`

Verification should cover semantic structure, headings, labels, keyboard/focus, contrast, errors, touch targets, content order and `prefers-reduced-motion`.

## AI-assisted workflow

Research synthesis  
→ alternative exploration  
→ design contract  
→ prototype implementation  
→ automated QA  
→ human visual critique  
→ root-cause repair

Human ownership remains in problem selection, interpretation, prioritization, trade-offs, accessibility judgment and the quality bar.

## Remaining gaps before a credible Senior application

1. Real moderated usability evidence on at least one flagship, with baseline and iteration using the same critical tasks.
2. At least one case with verified post-launch or real-world product impact; personal prototypes cannot substitute for this.
3. Stronger evidence of cross-functional influence: product/engineering trade-offs, decision records or implementation negotiation from real work.
4. Leadership evidence such as critique facilitation, mentoring or system governance only when it actually occurred.
5. A verified accessibility audit artifact rather than compliance language alone.
6. A clearer design-system governance story backed by real inventory/design-code parity evidence.

Until those exist, the portfolio can credibly compete through **craft + product judgment + systems + implementation ownership**, while labeling validation and impact gaps explicitly.
