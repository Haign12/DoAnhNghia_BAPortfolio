# Đỗ Anh Nghĩa — Product Designer Portfolio

This repository contains my product design portfolio: product reasoning, UX systems, working prototypes, design-to-code experiments, and the evidence-aware workflow I use with AI.

> **Positioning:** Product Designer · Fintech / B2B · Systems · AI-assisted design-to-code

## Portfolio

- Live portfolio: https://do-anh-nghia-uiux-portfolio.vercel.app/
- Canonical CV: `Do_Anh_Nghia_Product_Designer_CV.pdf` (generated from `cv/main.typ` after release)
- LinkedIn: https://www.linkedin.com/in/ginan12/

## GitHub identity

`Haign12` is the account that hosts this portfolio repository. `Ngh1aa` is my GitHub **organization/workspace** for product experiments and UIUX Factory repositories; it is not a second personal identity. Project source links intentionally point to that workspace.

The repository name `DoAnhNghia_BAPortfolio` is a legacy URL from an earlier Business Analyst portfolio phase. The current content and positioning are Product Design. A repository rename is an account-level GitHub administration action and is intentionally kept separate from source-code changes.

## How I use AI in product design

I use AI as an execution and critique multiplier, not as product authority:

1. **Grounding & synthesis** — inspect repository truth, briefs, constraints and evidence gaps before proposing UI.
2. **Exploration** — generate alternatives, benchmark patterns and critique options through an explicit ADOPT / ADAPT / REJECT contract.
3. **Design-to-code** — translate approved decisions into responsive prototypes while preserving design-system and state rules.
4. **QA & repair** — use browser checks, accessibility gates and visual evidence to find root causes instead of accepting a successful build as proof of UX quality.
5. **Documentation** — keep assumptions, evidence states, decisions and unresolved questions inspectable for the next person.

Human-owned decisions remain: the product problem, user evidence, business priority, final design rationale, consequential trade-offs and release judgment.

### Inspectable AI workflow evidence

- `.agents/AGENTS.md` — local execution contract
- `.agents/skills/` — stage/risk-specific UI/UX skills
- `.claude/settings.local.json` — project-level agent configuration
- `.github/workflows/portfolio-cloud-qa-v5.yml` — rendered browser/accessibility QA
- `.github/workflows/hero-signature-gate.yml` — protects the homepage portrait, art-direction cue, signature rail, mobile identity and reduced-motion behavior from unrelated content/evidence migrations
- `case-study-uiux-factory.html` — case study and claim boundaries
- https://github.com/Ngh1aa/uiux-ai-workspace — UIUX Factory source workspace

## Evidence policy

Independent concepts are labeled as independent concepts. Planned usability tests, target metrics and hypotheses are not presented as measured outcomes. When direct user research or production data is unavailable, the portfolio says so explicitly and defines what evidence should be collected next.

## Homepage source-of-truth

Recruiter-critical homepage content is authored directly in `index.html`: role positioning, flagship order, case links, AI workflow, writing entrypoint, research/evidence boundaries, CV route and supporting-project counts. JavaScript is reserved for behavior such as reveal, filtering, menu state and motion; it must not be required to repair broken links or create the core recruiter narrative.

The homepage visual signature is also treated as a compatibility contract: unrelated content/evidence migrations must preserve the approved hero media, art-direction cue, signature motion and page-role hierarchy unless the task explicitly redesigns them. `qa/hero-signature.spec.mjs` verifies this contract on desktop, mobile and reduced-motion settings.

The cloud QA gate reads raw `index.html` in addition to rendered browser checks so a runtime mutation cannot hide source debt.
