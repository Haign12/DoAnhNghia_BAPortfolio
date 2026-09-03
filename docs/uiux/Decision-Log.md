# Decision Log

## D-001 — Isolate Phase 1 from prior implementation branch

- Conflict: prior work existed on `redesign/luxury-minimalism-20260903`, but current user explicitly reset the task to Phase 1 research only and said “Không sửa code trong phase này.”
- Evidence: current user instruction > previous branch state.
- Decision: create `phase1/luxury-minimalism-research-20260903` from clean `main@2c7c6ee...` and write only `docs/uiux/*`.
- Impact: OLD/source evidence is not contaminated by previous redesign code; no destructive reset is used.

## D-002 — Desktop-only overrides generic mobile requirements in skills

- Conflict: several generic skills describe mobile-first/mobile transformation, while Project Config/current user explicitly says desktop_only and “k cần để ý mobile/tablet”.
- Decision: desktop 1280/1440/1920 + pressure widths are active; mobile/tablet `N/A_JUSTIFIED`.
- Impact: no claim of fully responsive design; no mobile/tablet design debt blocks this Phase 1.

## D-003 — Working business goal inferred rather than blocking on clarification

- Missing config: primary business goal / audience / conversion were blank.
- Evidence: current UI identifies UI/UX role, open-to-opportunities state, selected work, resume, email CTA; portfolio hiring research.
- Decision: use “earn qualified UI/UX interviews/opportunities/project conversations through proof of work/thinking” as EVIDENCE_BACKED_INFERENCE.
- Impact: enables content/IA contract while preserving uncertainty labels. No fabricated recruiter research.

## D-004 — Preserve routes; redesign IA through hierarchy, not URL churn

- Evidence: small stable public route set, canonical tags, sitemap, unknown organic/backlink data.
- Decision: preserve all current public slugs/canonicals; future implementation adds VAS to sitemap rather than renaming routes.
- Impact: lower SEO/migration risk.

## D-005 — “Luxury minimalism” is structural restraint, not luxury clichés

- Evidence: user goal + production/reference benchmark.
- Decision: warm neutral materiality, strong typography, hairline structure, native project media, restrained accent; no gold gradient/glass/marble/card soup.
- Impact: visual direction is distinguishable yet professional for hiring tasks.

## D-006 — Reuse current fonts as first option

- Evidence: project already loads Instrument Serif, DM Sans, DM Mono; typography can support editorial/sans/metadata hierarchy.
- Decision: reuse before adding dependencies; verify Vietnamese glyph/render behavior later.
- Impact: lower performance/implementation churn.

## D-007 — Work before About

- Evidence: portfolio domain playbook + hiring research + current proof delayed after decorative marquee/About.
- Decision: Home narrative is Positioning → Selected Work → Approach/Profile → Experience → Contact.
- Impact: proof-first decision sequence; structural redesign delta.

## D-008 — Four page composition families

- Evidence: Home, personal cases, redesign VAS, and product/system FlowCRM have different user questions.
- Decision: Family A Home Index; Family B Artifact-Led Personal; Family C Change-Thesis Redesign; Family D System-Model.
- Impact: prevents universal hero/template monotony.

## D-009 — Do not fabricate a contact form

- Evidence: current contact is `mailto:` and no backend/API is present.
- Decision: retain truthful external handoff unless a real service is explicitly introduced in a later scope.
- Impact: no false success state or privacy scope expansion.

## D-010 — Project media should not be globally grayscale

- Evidence: current CSS applies grayscale; portfolio media is proof and project-specific visual work.
- Decision: native color is default; neutralization only for a specific evidence/comparison reason.
- Impact: project art direction becomes legible and dominant.

## D-011 — Rendered OLD baseline cannot be replaced with source inspection

- Conflict: source is fully inspectable but available environment cannot capture the live site at declared desktop widths.
- Decision: record source-based provisional observations separately and keep rendered-baseline requirement BLOCKED.
- Impact: Phase 1 overall result is BLOCKED until actual Chromium pixels are captured/opened/inspected.

## D-012 — No release activity

- Evidence: `release_authorization=no_release`.
- Decision: no PR/merge/deploy/release action in Phase 1.
- Impact: docs-only branch remains isolated.