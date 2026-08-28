---
name: website-delivery-pipeline
description: |
  Meta-skill điều phối toàn bộ pipeline xây dựng website từ đầu đến cuối.
  Định nghĩa thứ tự thực hiện, dependencies giữa các skill, acceptance criteria
  chuyển phase và workflow tổng thể.
globs:
  - "docs/**"
  - "**/*.html"
  - "**/*.css"
  - "**/*.js"
---

# Website Delivery Pipeline — Orchestrator

## Mục đích

Đây là meta-skill điều phối toàn bộ quá trình xây dựng website chuyên nghiệp. Đọc skill này TRƯỚC khi bắt đầu bất kỳ task nào.

## Pipeline Overview

```
Phase 0: Discovery    → Phase 1: Brand       → Phase 2: UX Research
     ↓                      ↓                       ↓
Phase 3: IA           → Phase 4: Visual       → Phase 5: Design System
     ↓                      ↓                       ↓
Phase 6: Content      → Phase 7: Implementation → Phase 8: A11y + Responsive
     ↓                      ↓                       ↓
Phase 9: Quality      → Phase 10: Testing     → Phase 11: Release
                                                     ↓
                                              Phase 12: Monitor
```

## Phase Definitions

| Phase | Skill(s) | Key Output | Gate to Pass |
|-------|----------|------------|-------------|
| **0. Discovery** | `product-discovery` | Product brief, assumption log | Problem, audience, JTBD, KPIs defined |
| **1. Brand** | `brand-guidelines` | Brand guidelines, CSS tokens | Colors, typography, voice, do/don't |
| **2. UX Research** | `ux-research-and-journey` | Persona, journey maps, task flows | Primary persona + journey + states |
| **3. IA** | `information-architecture` | Sitemap, nav model, page inventory | Sitemap, nav ≤7 items, URL strategy |
| **4. Visual** | `visual-design-direction` | Visual direction, layout patterns | Layout, hierarchy, motion, shadows |
| **5. Design System** | `design-system-and-components` | Tokens, component specs | Token file, component inventory |
| **6. Content** | `conversion-and-content` | Content model, CTA strategy | Content per page, all UI states |
| **7. Implementation** | `frontend-implementation` | HTML/CSS/JS code | Semantic HTML, working pages |
| **8. A11y + Responsive** | `accessibility` + `responsive-and-device-strategy` | Accessible, responsive site | WCAG AA, 320px-2560px works |
| **9. Quality** | `web-quality-and-performance` + `seo-strategy` + `security-and-privacy` | Audit reports | Lighthouse ≥90, SEO ready |
| **10. Testing** | `testing-strategy` | Test results, evidence | All P0 tests pass |
| **11. Release** | `code-review-and-release` | Release checklist, deployment | Quality gates passed, deployed |
| **12. Monitor** | `analytics-and-experimentation` | Tracking plan, baseline | Events firing, funnel defined |

## Cross-cutting: UX Laws
`ux-laws-and-heuristics` — Dùng ở BẤT KỲ phase nào khi cần đánh giá hoặc justify design decisions. Không phải phase riêng, mà là lens để review.

## Rules

### 1. Phase Dependencies
- KHÔNG skip phases. Mỗi phase tạo input cho phase tiếp theo.
- CÓ THỂ fast-track phases nếu project nhỏ (landing page 1 trang), nhưng phải conscious decision.

### 2. Documentation First
Mỗi phase phải output document vào `docs/` TRƯỚC KHI chuyển phase tiếp:

```
docs/
├── product-brief.md              # Phase 0
├── assumption-log.md             # Phase 0
├── decision-log.md               # Ongoing
├── brand-guidelines.md           # Phase 1
├── ux-journey.md                 # Phase 2
├── information-architecture.md   # Phase 3
├── visual-direction.md           # Phase 4
├── design-system.md              # Phase 5
├── content-model.md              # Phase 6
├── responsive-strategy.md        # Phase 8
├── seo-performance-plan.md       # Phase 9
├── security-checklist.md         # Phase 9
├── test-plan.md                  # Phase 10
├── release-checklist.md          # Phase 11
├── tracking-plan.md              # Phase 12
└── ux-review.md                  # Cross-cutting
```

### 3. Fast-Track Mode (cho landing page / 1-page website)
Nếu project là 1 trang landing page, gộp các phase:
- Phase 0-1: Brief + Brand (1 document)
- Phase 2-3: Journey + IA (simplified)
- Phase 4-6: Visual + Design System + Content (focus on single page)
- Phase 7-8: Implementation + Responsive (combined)
- Phase 9-10: Quality + Testing (combined audit)
- Phase 11-12: Release + Analytics

### 4. Evidence-Based Completion
KHÔNG tuyên bố "done" mà không có:
- Screenshots hoặc recordings
- Lighthouse scores
- Testing checklist với results
- Code review checklist
- Known issues documented

### 5. Decision Log
Mỗi design/tech decision quan trọng ghi vào `docs/decision-log.md`:

```markdown
## Decision: [Mô tả]
- **Date**: [Date]
- **Context**: [Tại sao cần quyết định]
- **Options considered**: [List options]
- **Decision**: [Chọn option nào]
- **Rationale**: [Tại sao]
- **Trade-offs**: [Đánh đổi gì]
- **Revisit if**: [Điều kiện nào thì xem lại]
```

## Quick Start

Khi nhận yêu cầu xây website, thực hiện theo thứ tự:

1. Đọc `product-discovery` SKILL.md → Tạo product brief
2. Đọc `brand-guidelines` SKILL.md → Tạo brand guidelines + tokens
3. Đọc `ux-research-and-journey` SKILL.md → Tạo persona + journey
4. Đọc `information-architecture` SKILL.md → Tạo sitemap + nav
5. Đọc `visual-design-direction` SKILL.md → Tạo visual direction
6. Đọc `design-system-and-components` SKILL.md → Tạo design system
7. Đọc `conversion-and-content` SKILL.md → Tạo content model
8. Đọc `frontend-implementation` SKILL.md → Code website
9. Đọc `accessibility` + `responsive-and-device-strategy` SKILL.md → Ensure a11y + responsive
10. Đọc `web-quality-and-performance` + `seo-strategy` + `security-and-privacy` SKILL.md → Audit
11. Đọc `testing-strategy` SKILL.md → Test everything
12. Đọc `code-review-and-release` SKILL.md → Review + release
13. Đọc `analytics-and-experimentation` SKILL.md → Setup tracking

Tham chiếu `ux-laws-and-heuristics` SKILL.md bất cứ khi nào cần justify design decisions.

## Anti-patterns

❌ Bắt đầu code ngay khi chưa có brief và design direction
❌ Skip IA → Navigation sai, URL strategy lộn xộn
❌ Skip content strategy → Lorem ipsum trong production
❌ A11y/responsive là afterthought → refactor đau đớn
❌ Không test → bugs trong production
❌ Không document → knowledge lost
❌ Bật tất cả skills cùng lúc → context overload
