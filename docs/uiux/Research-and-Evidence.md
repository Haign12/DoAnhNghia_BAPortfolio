# Research and Evidence Register

Checked: 2026-09-03

## Evidence labels

`FACT | EVIDENCE_BACKED_INFERENCE | PROFESSIONAL_HYPOTHESIS | ASSUMPTION | UNKNOWN`

## Project evidence

| ID | Finding | Label | Source | Implication |
|---|---|---|---|---|
| E-01 | Site identifies Do Anh Nghia as a UI/UX Designer and Systems Thinker | FACT | `index.html` | positioning should remain explicit above fold |
| E-02 | Current hero exposes Work + email actions and an “Open to new opportunities” signal | FACT | `index.html` | opportunity/contact goal is already embedded in the product |
| E-03 | Five projects are shown on home: LuxRoom, Atelier, StudioOS, Capital Place, VAS | FACT | `index.html` | curation/ranking is a key design decision |
| E-04 | Home links to resume PDF and email | FACT | `index.html` | preserve low-friction contact/CV paths |
| E-05 | Home uses DM Sans, Instrument Serif, DM Mono; current CSS is black/white with grid/orbit, pill controls and marquee | FACT | `index.html`, `styles.css` | luxury-minimal redesign can reuse type assets while changing composition grammar |
| E-06 | Portrait is forced grayscale; decorative grid/orbit/marquee are prominent visual devices | FACT | `styles.css` | current visual signature is “tech/editorial minimal”, not clearly luxury |
| E-07 | LuxRoom/Atelier/StudioOS use a shared case-study shell; VAS extends it; FlowCRM carries substantial inline legacy styling | FACT | case-study sources | shared owner exists, but page-role differentiation and legacy drift need attention |
| E-08 | Existing content-gap research says case studies lack consistent context/problem/method/iteration/outcome/limitations narrative | FACT | `content-gap-research-notes.md` | case studies must become decision/proof narratives, not galleries |
| E-09 | No private analytics, usability recordings, client metrics or research transcripts are supplied | FACT | `content-gap-research-notes.md` + project config | never fabricate impact; label qualitative outcomes and proposed validation |
| E-10 | Current sitemap omits VAS even though route exists | FACT | `sitemap.xml` + route inventory | future SEO implementation must repair sitemap coverage while preserving URLs |
| E-11 | No backend/API/CMS/form/auth/payment found | FACT within inspected source | HTML/JS inspection | production reality is largely STATIC + client-side REAL navigation/state |
| E-12 | Official brand guideline is absent; project-owned logo asset exists | FACT | repo inventory/project config | Brand Source Status C; proposed digital direction must be labeled, not called official |

## Audience / hiring research

| Source | Type | Evidence used | Limitation |
|---|---|---|---|
| Nielsen Norman Group — “UX Portfolios: What Hiring Managers Look For” | RESEARCH | Study references 200+ UX hiring managers; expectations differ by role/seniority and portfolios should show process/work | published 2020; not Vietnam-specific |
| Interaction Design Foundation — “What Should a UX Design Portfolio Contain?” (2026) | RESEARCH | Portfolio is a tool for earning interviews; communicate both what was done and how the designer works; portfolio craft itself is assessed | educational source, not direct analytics for this user |
| Interaction Design Foundation — “Stop the Generic Portfolio Trap… UI Design” | RESEARCH | Show role, problem, design decisions/process, result/learning and a clear contact action | general guidance, not user-specific validation |
| Existing project `content-gap-research-notes.md` | PROJECT RESEARCH | UXfolio/UXPin/IxDF/Coursera synthesis: concise case-study narrative, honest limitations, context/role/process/outcome | secondary synthesis; no direct participant research |

## Market context

- **EVIDENCE_BACKED_INFERENCE:** The portfolio competes in a hiring/project-selection context where visual craft alone is insufficient; readers need fast evidence of role, thinking, constraints and outcomes/learning.
- **ASSUMPTION:** Primary hiring market is Vietnam/Ho Chi Minh City based on current experience/education context and project config language. No direct recruiter interviews or application funnel analytics were supplied.

## Reference evidence inspected

External production/reference pages inspected on 2026-09-03:

1. Pentagram — `https://www.pentagram.com/` and `/work`
2. Koto — `https://koto.com/work`
3. PORTO ROCHA — `https://www.portorocha.com/`
4. Base Design — `https://www.basedesign.com/index`
5. Build in Amsterdam — `https://www.buildinamsterdam.com/cases`
6. Studio Freight — `https://studiofreight.com/info`
7. Aesop design philosophy — `https://www.aesop.com/philosophy-on-design.html`

Reference roles and adaptations are documented in `Reference-Benchmark.md`; production/gallery status is not treated as UX proof.

## Evidence gaps

| Gap | Status | Consequence |
|---|---|---|
| OLD rendered screenshots at 1280/1440/1920 | **BLOCKED** | source inspection cannot substitute pixel evidence for baseline composition/crop/wrapping |
| Analytics/search console/contact conversion data | UNKNOWN | no outcome/conversion uplift claim allowed |
| Recruiter/user interviews for this specific portfolio | UNKNOWN | audience model remains evidence-backed inference/hypothesis |
| Official personal brand guideline | UNKNOWN/ABSENT in repo | visual direction is explicitly PROPOSED_FOR_DIGITAL |
| Exact focal point for each source image from rendered/crop inspection | partially UNKNOWN | contract specifies required focal verification before implementation |

## Research conclusion

The evidence is sufficient to define owner/user goals, IA, content strategy, page roles and a non-generic luxury-minimal redesign contract. It is **not** sufficient to claim the OLD rendered baseline has been captured/inspected, nor to claim measurable UX/conversion improvement.