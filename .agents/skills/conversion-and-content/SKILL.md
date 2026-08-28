---
name: conversion-and-content
description: |
  Hướng dẫn AI agent xây dựng content strategy, conversion optimization, 
  CTA hierarchy, trust elements, content model, value proposition và copy 
  cho các trạng thái empty/error/loading.
globs:
  - "docs/content-model.md"
  - "**/*.html"
---

# Conversion & Content Strategy

## Mục đích

Nội dung và conversion là hai mặt của một đồng xu. Website đẹp nhưng nội dung yếu sẽ không convert. Skill này đảm bảo mọi page đều có content strategy rõ ràng và được tối ưu cho conversion goal.

## Prerequisites

- `product-discovery` hoàn tất (có JTBD, audience)
- `ux-research-and-journey` hoàn tất (có journey map)
- `information-architecture` hoàn tất (có page inventory)

## Quy trình bắt buộc

### 1. Value Proposition

```markdown
## Value Proposition Canvas

### Customer Profile
- **Jobs**: [Từ JTBD đã xác định]
- **Pains**: [Pain points từ journey map]
- **Gains**: [Desired outcomes]

### Value Map
- **Products/Services**: [Giải pháp cung cấp]
- **Pain Relievers**: [Cách giải quyết pain points]
- **Gain Creators**: [Cách tạo ra gains]

### Value Proposition Statement
"Chúng tôi giúp [audience] [đạt được goal] bằng [giải pháp], 
khác biệt nhờ [unique differentiator]."

### Headline Formula
| Formula | Example |
|---------|---------|
| [Benefit] + [Audience] | "Giải pháp [X] dành cho [Y]" |
| [Action] + [Result] | "Biến [X] thành [Y]" |
| [Number] + [Benefit] | "[N] cách để [Result]" |
| [Question] + [Answer] | "Bạn muốn [X]? Chúng tôi giúp [Y]" |
```

### 2. Content Hierarchy per Page

Mỗi page cần content hierarchy rõ ràng:

```markdown
## Page: [Page name]

### Above the Fold
| Order | Element | Content | Purpose |
|-------|---------|---------|---------|
| 1 | Headline (H1) | [Copy] | Hook attention, state value |
| 2 | Subheadline | [Copy] | Elaborate benefit |
| 3 | Primary CTA | [Button text] | Convert |
| 4 | Social proof | [Type: logos/stats/quote] | Build trust |

### Below the Fold
| Section | Content | Purpose | CTA |
|---------|---------|---------|-----|
| [Section 1] | [Description] | [Why it's here] | [CTA if any] |
| [Section 2] | [Description] | [Why it's here] | [CTA if any] |
| [Section N] | [Description] | [Why it's here] | [CTA if any] |
| Final CTA | [Recap + CTA] | [Close the deal] | [Primary CTA] |
```

### 3. CTA Strategy

```markdown
## CTA Hierarchy

### Primary CTA (1 per page)
- **Text**: [Action verb + Value. VD: "Start Free Trial", "Get Your Quote"]
- **Placement**: Above fold + repeated at bottom
- **Style**: Largest button, brand primary color, high contrast
- **Urgency/Scarcity**: [Nếu phù hợp: "Limited spots", "Offer ends [date]"]

### Secondary CTA
- **Text**: [Lower commitment. VD: "Learn More", "See Examples"]
- **Placement**: Next to primary CTA hoặc trong content sections
- **Style**: Outlined button hoặc text link

### Micro CTAs
- **Text**: [Contextual actions. VD: "Read case study →", "View pricing"]
- **Placement**: Within content, end of sections
- **Style**: Text links with arrows

## CTA Copy Rules
✅ Start with verb: "Get", "Start", "Download", "Join", "Try"
✅ State benefit: "Get Your Free Analysis" > "Submit"
✅ Be specific: "Download the 2024 Report" > "Download"
✅ Reduce risk: "Start Free — No Credit Card" > "Sign Up"
❌ Avoid vague: "Click Here", "Submit", "More Info"
❌ Avoid pressure: "BUY NOW!!!" (trừ khi brand voice cho phép)
```

### 4. Trust & Social Proof Elements

```markdown
## Trust Elements Inventory

### Social Proof
| Type | Content | Placement | Priority |
|------|---------|-----------|----------|
| Client logos | [5-8 recognizable logos] | Homepage, below hero | P0 |
| Testimonials | [2-3 with name, title, photo] | Homepage, service pages | P0 |
| Case study excerpts | [Results with numbers] | Service pages, portfolio | P0 |
| Statistics | [Numbers: clients, projects, years] | Homepage, about | P1 |
| Awards/Certifications | [Relevant credentials] | Footer, about | P1 |
| Reviews/Ratings | [Third-party ratings] | Landing pages | P1 |
| Media mentions | [Press logos/quotes] | Homepage, about | P2 |

### Trust Signals
| Signal | Purpose | Placement |
|--------|---------|-----------|
| HTTPS badge | Security | Browser (automatic) |
| Contact information | Reachability | Header, footer, contact |
| Physical address | Legitimacy | Footer |
| Response time | Reliability | Contact page |
| Privacy policy | Data protection | Footer, forms |
| Professional certifications | Expertise | About, footer |

### Trust Copy Patterns
- Near CTAs: "[N]+ [audience] đã [action]. [Testimonial snippet]."
- Near forms: "Thông tin của bạn được bảo mật. Không spam."
- Near pricing: "Hủy bất cứ lúc nào. Hoàn tiền trong [N] ngày."
```

### 5. Objection Handling

```markdown
## Common Objections & Responses

| Objection | Where it occurs | Response strategy | Implementation |
|-----------|----------------|-------------------|----------------|
| "Giá quá cao" | Pricing page | Value framing, ROI, comparison | Price + value comparison table |
| "Chưa cần ngay" | Throughout | Urgency, cost of inaction | "Mỗi ngày không [action] = [cost]" |
| "Không tin tưởng" | First visit | Social proof, guarantees | Testimonials near CTAs |
| "Quá phức tạp" | Feature pages | Simplification, demo | "Bắt đầu trong 5 phút" |
| "Đã có giải pháp" | Comparison | Differentiation, migration ease | Comparison table, migration guide |
```

### 6. Content Model

```markdown
## Content Types & Fields

### Page: Homepage
| Field | Type | Required | Max Length | Example |
|-------|------|----------|-----------|---------|
| hero_headline | Text | Yes | 80 chars | "Transform Your Data..." |
| hero_subheadline | Text | Yes | 150 chars | "We help teams..." |
| hero_cta_text | Text | Yes | 30 chars | "Start Free Trial" |
| hero_cta_url | URL | Yes | — | "/signup" |
| hero_image | Image | Yes | — | hero-illustration.webp |
| features | Array<Feature> | Yes | 3-6 items | — |
| testimonials | Array<Testimonial> | Yes | 2-4 items | — |
| stats | Array<Stat> | No | 3-4 items | — |

### Content Type: Feature
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| icon | Icon/Image | Yes | From icon set |
| title | Text | Yes | ≤ 50 chars |
| description | Text | Yes | ≤ 150 chars |
| link | URL | No | "Learn more" destination |

### Content Type: Testimonial
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| quote | Text | Yes | ≤ 200 chars |
| author_name | Text | Yes | Full name |
| author_title | Text | Yes | "Role at Company" |
| author_photo | Image | No | Square, min 80px |
| rating | Number | No | 1-5 stars |

### Content Type: Case Study
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | Text | Yes | Project name |
| client | Text | Yes | Client name |
| industry | Text | Yes | Industry category |
| challenge | Text | Yes | Problem statement |
| solution | Text | Yes | What was done |
| results | Array<Result> | Yes | Measurable outcomes |
| cover_image | Image | Yes | 16:9 aspect ratio |
| tags | Array<Text> | Yes | Skills/tools used |
```

### 7. Microcopy & UI States

```markdown
## UI State Copy

### Empty States
| Context | Headline | Body | CTA |
|---------|----------|------|-----|
| No results | "Không tìm thấy kết quả" | "Thử dùng từ khóa khác hoặc mở rộng bộ lọc." | "Xóa bộ lọc" |
| First use | "Chào mừng! Bắt đầu nào" | "[Hướng dẫn ngắn bước đầu tiên]" | "[Action đầu tiên]" |
| No items | "Chưa có [item] nào" | "Tạo [item] đầu tiên để bắt đầu." | "Tạo [item]" |

### Error States
| Context | Headline | Body | Recovery |
|---------|----------|------|----------|
| Form validation | — | "[Field] [lý do không hợp lệ]" | Inline, real-time |
| Submit failed | "Gửi không thành công" | "Vui lòng thử lại. Nếu vẫn lỗi, [liên hệ]." | "Thử lại" |
| 404 | "Trang không tồn tại" | "Trang bạn tìm có thể đã di chuyển." | "Về trang chủ" |
| 500 | "Đã xảy ra lỗi" | "Chúng tôi đang khắc phục. Vui lòng thử lại sau." | "Tải lại" |
| Offline | "Mất kết nối" | "Kiểm tra kết nối internet." | "Thử lại" |

### Loading States
| Context | Treatment | Duration threshold |
|---------|-----------|-------------------|
| Page load | Skeleton screen | > 300ms |
| Button action | Spinner + disabled + text change | > 200ms |
| Image load | Blur placeholder → sharp | Progressive |
| Data fetch | Skeleton → content | > 500ms |

### Success States
| Context | Message | Next action |
|---------|---------|-------------|
| Form submitted | "Gửi thành công! Chúng tôi sẽ phản hồi trong [N] giờ." | "Quay lại" |
| Action completed | "[Action] thành công" | [Next logical step] |

### Confirmation Dialogs
| Action | Title | Body | Confirm | Cancel |
|--------|-------|------|---------|--------|
| Delete | "Xóa [item]?" | "Hành động này không thể hoàn tác." | "Xóa" (danger) | "Hủy" |
| Leave page | "Rời trang?" | "Thay đổi chưa lưu sẽ bị mất." | "Rời trang" | "Ở lại" |
```

### 8. SEO Content Requirements

```markdown
## SEO Content Checklist per Page

| Element | Requirement | Max Length |
|---------|-------------|-----------|
| Title tag | Unique, keyword + brand | 60 chars |
| Meta description | Compelling, keyword, CTA | 160 chars |
| H1 | 1 per page, contains primary keyword | 70 chars |
| H2-H6 | Logical hierarchy, descriptive | — |
| Image alt | Descriptive, keyword when natural | 125 chars |
| URL slug | Short, descriptive, keyword | 75 chars |
| Internal links | ≥ 2 per page to related content | — |
| Schema markup | Relevant schema type | — |
```

## Output bắt buộc

### `docs/content-model.md`
- Value proposition
- Content hierarchy per page
- CTA strategy
- Trust elements inventory
- Content types & fields
- Microcopy cho empty/error/loading/success states
- SEO content requirements

## Acceptance Criteria

- [ ] Value proposition statement viết rõ ràng, khác biệt
- [ ] Mỗi page có content hierarchy với above/below fold sections
- [ ] CTA hierarchy có primary, secondary, micro CTAs
- [ ] Trust elements planned với placement
- [ ] Content model define cho mỗi content type
- [ ] Microcopy cho tất cả UI states
- [ ] SEO content checklist per page
- [ ] Objection handling strategy

## Anti-patterns cần tránh

❌ CTA chỉ ghi "Submit" hoặc "Click Here"
❌ Không có trust elements gần CTA
❌ Placeholder content ("Lorem ipsum") trong production
❌ Missing empty/error/loading states
❌ Content hierarchy không có strategy — random section order
❌ Quá nhiều CTAs cạnh tranh trên cùng viewport
❌ Copy quá generic — không reflect brand voice
