# Project Context — Portfolio cá nhân Đỗ Anh Nghĩa

## Intake

```yaml
project_name: Portfolio cá nhân Đỗ Anh Nghĩa
request_type: redesign_existing_website
project_mode: production_candidate
current_website: https://haign12.github.io/DoAnhNghia_BAPortfolio/
source_code_or_repo: https://github.com/Haign12/DoAnhNghia_BAPortfolio
working_branch: redesign/luxury-minimalism-20260903

industry: UI/UX Design / Digital Product Design
market: Việt Nam
languages: [vi]

primary_business_goal: Tạo đủ tin cậy và khác biệt để biến recruiter/hiring manager/design lead hoặc khách hàng phù hợp thành cuộc trao đổi chất lượng về cơ hội việc làm hoặc dự án.
secondary_business_goals:
  - Chứng minh tư duy sản phẩm và chất lượng UI/UX qua case study, không chỉ qua gallery hình đẹp.
  - Tăng khả năng scan nhanh hồ sơ, vai trò, kinh nghiệm và năng lực cốt lõi.
  - Tạo personal brand có tính nhận diện cao, trưởng thành và premium.
known_target_audience:
  - Recruiter / HR tuyển UI/UX hoặc Product Designer.
  - Hiring manager / Design Lead / Product Lead cần đánh giá depth và cách ra quyết định.
  - Founder / client tiềm năng cần đánh giá fit cho website/product design project.
known_conversion_actions:
  - Gửi email / bắt đầu cuộc trao đổi.
  - Xem hoặc tải CV.
  - Mở case study nổi bật.
  - Mở live project.
  - Truy cập LinkedIn.

redesign_goal: Luxury minimalism — sang trọng, tiết chế, editorial, proof-first và có visual signature riêng.

scope: desktop_only
desktop_viewports: [1280, 1440, 1920]
tablet_viewports: N/A_JUSTIFIED
mobile_viewports: N/A_JUSTIFIED
supported_browsers_if_known: [Chromium]

release_authorization: no_release
```

## Evidence status

| Item | Value | Label | Confidence |
|---|---|---|---|
| Primary business goal | Qualified job/project conversations | PROFESSIONAL_HYPOTHESIS | High — current site explicitly says “Open to new opportunities”, exposes email/CV and portfolio work |
| Primary audience | Recruiter/hiring manager/design lead/client | PROFESSIONAL_HYPOTHESIS | High — aligns with current content and portfolio domain |
| Market | Việt Nam | ASSUMPTION | Medium — experience copy references Vietnam; user did not specify broader market |
| Language | Vietnamese | FACT | User requirement |
| Tech stack | Static HTML + CSS + vanilla JS | FACT | Repository source |
| Data source | Static page content and local media assets | FACT | Repository source |
| CMS/backend | None detected | FACT | No CMS/backend integration found in inspected source |
| Authentication | None detected | FACT | No auth flow in inspected source |
| Personal data collection | No in-site form detected; `mailto:` contact only | FACT | Homepage/case-study source |
| Analytics | UNKNOWN | UNKNOWN | No analytics evidence in inspected homepage/script; not enough evidence to claim absent site-wide |
| Deployment target | GitHub Pages | EVIDENCE_BACKED_INFERENCE | Current public URL is `haign12.github.io/...` |
| Brand guideline | Not supplied / not found | UNKNOWN | No brand book found in inspected repo |
| Brand asset status | Logo file + text wordmark + portrait + project imagery available | FACT | Repository assets/source |
| Brand source class | C — logo available, no official brand guideline | EVIDENCE_BACKED_INFERENCE | Follows locked brand-guideline skill |

## Existing sitemap / route inventory

| Route | Current role | Decision |
|---|---|---|
| `index.html` | Portfolio overview / selected work / experience / contact | IMPROVE |
| `case-study-luxroom.html` | Personal project case study | IMPROVE |
| `case-study-atelier.html` | Personal project case study | IMPROVE |
| `case-study-studioos.html` | Personal project case study | IMPROVE |
| `case-study-vas-education.html` | Redesign case study | IMPROVE |
| `case-study-ux.html` | FlowCRM UI/UX case study; not surfaced in current homepage selected work | KEEP + REPOSITION as archive/secondary proof unless later evidence supports promotion |
| Capital Place | Live project linked from homepage; no local case-study route | KEEP link; ADD concise proof block on homepage, do not fabricate a case-study narrative |
| `Do_Anh_Nghia_CV.pdf` | Resume | KEEP |

## Must keep

- Personal identity and factual work/experience information unless a source-of-truth correction is found.
- Existing project/case-study URLs where possible to preserve link/SEO equity.
- Existing live-project links.
- Email, CV and LinkedIn contact paths.
- Existing project screenshots/media where suitable.
- Explicit limitation language in case studies where metrics/research evidence are unavailable.
- Semantic HTML/keyboard/reduced-motion safeguards already present unless replaced with equivalent or better behavior.

## Must improve

- Above-fold positioning: who Nghĩa is, what type of designer, why the work is worth opening, and next action.
- Proof-first journey: relevant work before long self-description.
- Distinguish flagship work from secondary/archive work.
- Case-study scanability and decision narrative.
- Page-role composition diversity: homepage and case studies must not feel like one repeated shell.
- Desktop editorial composition and image scale at 1280/1440/1920.
- Luxury-minimal visual signature beyond “black/white + serif + pills”.
- CTA hierarchy: one clear action per decision context.
- Vietnamese interface/content while preserving correct product/project names.
- Media crop treatment and project-specific art direction.

## Must not change

- Do not invent client names, KPIs, usability findings, conversion figures, awards or production outcomes.
- Do not claim a concept/self-initiated project produced measured business results without evidence.
- Do not merge/deploy/release.
- Do not refactor unrelated repository tooling/skills.
- Do not delete legacy routes solely because they are not featured.

## System reality

| Capability | Reality | Evidence / note |
|---|---|---|
| Homepage navigation/anchors | REAL | Static browser behavior in source |
| Theme persistence | REAL | `localStorage` in `script.js` |
| Reveal/scroll progress | REAL | Vanilla JS + IntersectionObserver/scroll logic |
| Contact | REAL external handoff | `mailto:`; success occurs in user mail client, not on website |
| Resume | REAL static asset | PDF link |
| Case studies | REAL static pages | Local HTML routes |
| Live project buttons | REAL external links | Target external GitHub Pages projects |
| Contact form / CRM | NOT PRESENT | No form/API detected |
| CMS | NOT PRESENT / UNKNOWN external | Static source; no CMS integration detected |
| Analytics | UNKNOWN | Must not claim tracking |

## Responsive scope rule

This redesign is intentionally **desktop_only**. Verification covers declared desktop viewports and desktop pressure points. Tablet/mobile are `N/A_JUSTIFIED`; final reporting must not use “fully responsive”.
