---
name: brand-guidelines
description: |
  Hướng dẫn AI agent xây dựng, áp dụng và duy trì brand guidelines nhất quán 
  xuyên suốt toàn bộ website: logo, color, typography, tone of voice, imagery, 
  spacing và do/don't rules.
globs:
  - "docs/brand-guidelines.md"
  - "**/*.css"
  - "**/tokens.*"
  - "**/theme.*"
---

# Brand Guidelines

## Mục đích

Brand guidelines đảm bảo mọi element trên website đều truyền tải một brand identity nhất quán. Skill này hướng dẫn cách xây dựng brand guidelines từ đầu hoặc chuyển đổi brand guidelines có sẵn thành design tokens và rules áp dụng được.

## Quy trình

### 1. Brand Audit

Trước khi tạo guidelines mới, kiểm tra xem đã có brand assets nào:

```markdown
## Existing Brand Assets Checklist
- [ ] Logo files (SVG, PNG)
- [ ] Color palette
- [ ] Typography/fonts
- [ ] Tone of voice document
- [ ] Photography/imagery style
- [ ] Icon set
- [ ] Previous website/collateral
- [ ] Brand story/manifesto
```

Nếu chưa có gì → tạo từ đầu theo các bước bên dưới.
Nếu đã có → chuyển đổi thành tokens và rules.

### 2. Brand Personality & Positioning

```markdown
## Brand Personality
- **Archetype**: [Chọn 1-2 archetype: Creator, Sage, Explorer, Hero, Everyman, Lover, Jester, Caregiver, Ruler, Magician, Innocent, Outlaw]
- **Personality traits**: [3-5 tính từ mô tả brand. VD: "Professional, Innovative, Approachable"]
- **Brand is**: [Danh sách tính chất brand THỂ HIỆN]
- **Brand is NOT**: [Danh sách tính chất brand TRÁNH]

## Brand Voice
- **Tone**: [Formal ↔ Casual, Serious ↔ Playful, Technical ↔ Simple]
- **Language style**: [Ví dụ: "Ngắn gọn, dùng active voice, tránh jargon"]
- **First person**: [We/Chúng tôi hay tên brand?]
- **Addressing user**: [You/Bạn hay formal hơn?]
```

### 3. Color System

#### Primary Colors

```markdown
| Role | Name | HEX | HSL | Usage |
|------|------|-----|-----|-------|
| Primary | [Name] | #XXXXXX | hsl(H, S%, L%) | CTA, links, primary actions |
| Primary Dark | [Name] | #XXXXXX | hsl(H, S%, L%) | Hover states, emphasis |
| Primary Light | [Name] | #XXXXXX | hsl(H, S%, L%) | Backgrounds, subtle highlights |
```

#### Semantic Colors

```markdown
| Role | HEX | Usage |
|------|-----|-------|
| Success | #XXXXXX | Confirmation, positive feedback |
| Warning | #XXXXXX | Caution, attention needed |
| Error | #XXXXXX | Errors, destructive actions |
| Info | #XXXXXX | Information, tips |
```

#### Neutral Scale

```markdown
| Step | HEX | Usage |
|------|-----|-------|
| 50 | #XXXXXX | Page background |
| 100 | #XXXXXX | Card background |
| 200 | #XXXXXX | Borders, dividers |
| 300 | #XXXXXX | Disabled state |
| 400 | #XXXXXX | Placeholder text |
| 500 | #XXXXXX | Secondary text |
| 600 | #XXXXXX | Body text |
| 700 | #XXXXXX | Heading text |
| 800 | #XXXXXX | Primary text |
| 900 | #XXXXXX | Darkest text |
```

#### Rules bắt buộc

- Tất cả text/background combinations phải đạt **WCAG AA contrast ratio** (4.5:1 cho normal text, 3:1 cho large text)
- Không dùng color làm phương tiện truyền tải thông tin duy nhất
- Dark mode colors phải được define riêng, không chỉ invert
- Semantic colors không thay đổi giữa themes (success luôn là positive)

### 4. Typography

```markdown
## Font Stack
- **Heading font**: [Font name] — [Lý do chọn]
  - Fallback: [System font stack]
  - Weights: [400, 600, 700...]
- **Body font**: [Font name] — [Lý do chọn]
  - Fallback: [System font stack]  
  - Weights: [400, 500, 600...]
- **Mono font**: [Font name] — [Cho code blocks nếu cần]

## Type Scale
| Level | Size (rem) | Line Height | Weight | Letter Spacing | Usage |
|-------|-----------|-------------|--------|---------------|-------|
| Display | 3.5rem | 1.1 | 700 | -0.02em | Hero headlines |
| H1 | 2.5rem | 1.2 | 700 | -0.015em | Page titles |
| H2 | 2rem | 1.25 | 600 | -0.01em | Section headings |
| H3 | 1.5rem | 1.3 | 600 | 0 | Sub-section headings |
| H4 | 1.25rem | 1.4 | 600 | 0 | Card titles |
| Body Large | 1.125rem | 1.6 | 400 | 0 | Lead paragraphs |
| Body | 1rem | 1.6 | 400 | 0 | Default text |
| Body Small | 0.875rem | 1.5 | 400 | 0.01em | Captions, metadata |
| Caption | 0.75rem | 1.4 | 500 | 0.02em | Labels, footnotes |

## Typography Rules
- Maximum 2 font families per project
- Heading font dùng cho headings và display text CHỈ
- Body font dùng cho body, UI controls, navigation
- Line length tối ưu: 60-80 ký tự (sử dụng max-width)
- Không dùng font-size nhỏ hơn 14px (0.875rem) cho body text
- Responsive: heading sizes giảm trên mobile (dùng clamp() hoặc breakpoints)
```

### 5. Logo Usage

```markdown
## Logo Variants
| Variant | File | Min width | Usage |
|---------|------|-----------|-------|
| Primary | logo.svg | 120px | Default, light backgrounds |
| Reversed | logo-white.svg | 120px | Dark backgrounds |
| Icon only | logo-icon.svg | 32px | Favicon, small spaces |

## Logo Rules
- Minimum clear space: [X]px around logo
- Never stretch, rotate, recolor, or add effects to logo
- Minimum size: [X]px width for digital
- Logo placement: [Quy tắc đặt logo trên trang]
```

### 6. Imagery & Visual Style

```markdown
## Photography Style
- **Mood**: [Mô tả cảm xúc ảnh cần truyền tải]
- **Color treatment**: [Natural, desaturated, warm filter, etc.]
- **Subject**: [People, products, abstract, landscapes, etc.]
- **Composition**: [Quy tắc bố cục]

## Illustration Style (nếu có)
- **Style**: [Flat, isometric, hand-drawn, 3D, etc.]
- **Color usage**: [Dùng brand colors hay palette riêng]
- **Line weight**: [Thin, medium, thick]

## Icon Style
- **Style**: [Outlined, filled, duotone, etc.]
- **Size**: [16px, 20px, 24px grid]
- **Stroke width**: [1.5px, 2px, etc.]
- **Corner radius**: [Rounded, sharp]
```

### 7. Spacing & Layout Principles

```markdown
## Spacing Scale (base: 4px)
| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Tight gaps, inline elements |
| space-2 | 8px | Form gaps, compact lists |
| space-3 | 12px | Card padding (small) |
| space-4 | 16px | Default padding, gaps |
| space-6 | 24px | Section padding (small) |
| space-8 | 32px | Card padding (large) |
| space-10 | 40px | Section gaps |
| space-12 | 48px | Section padding |
| space-16 | 64px | Large section gaps |
| space-20 | 80px | Page section spacing |
| space-24 | 96px | Hero/major section spacing |

## Layout Principles
- Sử dụng 4px grid system
- Maximum content width: [1200px / 1280px / 1440px]
- Consistent spacing: dùng scale tokens, KHÔNG hardcode arbitrary values
- White space is a design element — không lấp đầy mọi khoảng trống
```

### 8. Do/Don't Rules

```markdown
## ✅ DO
- Dùng brand colors theo đúng role đã define
- Giữ typography hierarchy nhất quán
- Sử dụng spacing tokens thay vì magic numbers
- Đảm bảo contrast ratio WCAG AA
- Giữ tone of voice nhất quán xuyên suốt
- Dùng imagery style thống nhất

## ❌ DON'T
- Không dùng colors ngoài palette đã define
- Không mix nhiều hơn 2 font families
- Không phá vỡ type scale
- Không dùng logo variant sai context
- Không viết copy với tone khác brand voice
- Không dùng ảnh stock generic không match brand mood
- Không thêm drop shadow, gradient, hoặc effect không có trong guidelines
```

## Output bắt buộc

### `docs/brand-guidelines.md`
Document tổng hợp toàn bộ brand guidelines với ví dụ visual.

### CSS Custom Properties
Chuyển đổi tất cả brand tokens thành CSS custom properties:

```css
:root {
  /* Colors */
  --color-primary: hsl(H, S%, L%);
  --color-primary-dark: hsl(H, S%, L%);
  /* ... */
  
  /* Typography */
  --font-heading: 'Font Name', sans-serif;
  --font-body: 'Font Name', sans-serif;
  /* ... */
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  /* ... */
}
```

## Acceptance Criteria

- [ ] Brand personality và voice được define
- [ ] Color system có primary, semantic, và neutral scales
- [ ] Tất cả color combinations đạt WCAG AA contrast
- [ ] Typography scale hoàn chỉnh với responsive rules
- [ ] Logo usage rules rõ ràng
- [ ] Imagery/icon style được define
- [ ] Spacing scale dựa trên hệ thống (4px hoặc 8px grid)
- [ ] Do/Don't rules cụ thể
- [ ] CSS custom properties được generate

## Anti-patterns cần tránh

❌ Brand guidelines chỉ có colors mà không có voice/personality
❌ Chọn font vì "đẹp" mà không xét readability và performance
❌ Color palette không kiểm tra contrast ratio
❌ Spacing random — mỗi component dùng giá trị khác nhau
❌ Brand guidelines tồn tại trong document nhưng code không reflect
