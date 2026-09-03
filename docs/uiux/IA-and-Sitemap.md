# IA and Sitemap

## IA objective

Keep the public structure shallow and stable while changing the decision sequence from biography-first/decorative-first to proof-first.

## Current route inventory

| Route | Role | Current state | Phase 1 decision |
|---|---|---|---|
| `/` | Home / orientation / work hub | public | KEEP + IMPROVE |
| `/case-study-luxroom.html` | Personal project detail | public/indexed sitemap | KEEP + IMPROVE |
| `/case-study-atelier.html` | Personal project detail | public/indexed sitemap | KEEP + IMPROVE |
| `/case-study-studioos.html` | Product/SaaS personal project detail | public/indexed sitemap | KEEP + IMPROVE |
| `/case-study-ux.html` | Product/system case study (FlowCRM) | public/indexed sitemap | KEEP + REFRAME |
| `/case-study-vas-education.html` | Redesign case study | public but absent from sitemap | KEEP + IMPROVE + ADD TO SITEMAP later |
| `Do_Anh_Nghia_CV.pdf` | utility proof/download | public asset | KEEP |
| external Capital Place live site | external proof | linked from Home | KEEP as supporting proof; local case study is optional future ADD only if evidence/content supports it |

## Proposed sitemap — Phase 1 contract

```text
Home / Portfolio
├─ Selected Work
│  ├─ LuxRoom — personal / responsive commerce
│  ├─ Atelier — personal / mobile-first commerce
│  ├─ StudioOS — product / SaaS workspace
│  ├─ VAS Education — redesign / education
│  └─ FlowCRM — product/system evidence / secondary archive
├─ Profile / Approach
├─ Experience
├─ Resume (PDF utility)
└─ Contact

Every local case study
├─ Project orientation
├─ Challenge / context
├─ Role / scope / constraints
├─ Decision narrative
├─ Visual/system proof
├─ Outcome + limitation
└─ Next project / Resume / Contact
```

## Homepage information hierarchy

1. Positioning + immediate proof cue.
2. Selected Work — primary decision object.
3. Compact approach/profile — explain how the designer works after showing proof.
4. Experience / credibility.
5. Contact / availability.
6. Footer utilities.

`About before Work` is intentionally reversed from OLD.

## Navigation model — desktop only

### Global
- Work
- Profile / Approach
- Experience
- Contact

### Utility
- Resume
- Theme only if it remains visually/technically justified in implementation.

### Case-study local navigation
- Back to Work / Portfolio
- Project chapter orientation when long enough to require it
- Next relevant project
- Resume / Contact utilities

## Labeling rules

- Prefer `Work`, `Case study`, `Role`, `Challenge`, `Decisions`, `Outcome`, `Next` equivalents in Vietnamese implementation copy.
- Do not use vague `Explore` as the only information scent when destination can be named.
- Project card metadata should expose project type + platform/role, not only aesthetic tags.

## Deep-entry recovery

Every case study must answer within the top composition:
- what project this is;
- what type of work it represents;
- what Nghia’s role/contribution was;
- what problem/decision it addresses;
- how to return to selected work;
- how to continue to another project/contact.

## URL migration contract

No URL change is justified in Phase 1.

| Old URL | New URL | Action | Redirect | Canonical | Rationale |
|---|---|---|---|---|---|
| `/` | same | preserve | none | self | stable portfolio entry |
| case-study routes | same | preserve | none | self | avoid unnecessary SEO/link breakage |
| VAS route | same | preserve + add sitemap entry later | none | self | existing public page missing XML discovery |

## SEO sitemap implementation handoff

Implementation phase should update `sitemap.xml` only after route/content decisions remain unchanged, adding VAS and checking every public primary case-study route. `robots.txt` currently disallows internal docs/CV source folders but not the public resume PDF; preserve unless a specific reason emerges.

## Validation status

IA is a design contract based on source and portfolio-domain research; it is **not user-validated** by card sorting/tree testing. Validation is optional for this small IA but recruiter/design-lead task review is recommended before release.