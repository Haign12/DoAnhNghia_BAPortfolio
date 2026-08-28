---
name: visual-design-direction
description: |
  Hướng dẫn AI agent xây dựng visual direction cho website: moodboard, layout patterns,
  art direction, visual hierarchy, color harmony, typography pairing, imagery style
  và motion design principles.
globs:
  - "docs/visual-direction.md"
  - "**/*.css"
---

# Visual Design Direction

## Mục đích

Visual direction biến brand guidelines thành aesthetic cụ thể cho website. Đây là bước bridge giữa brand identity (trừu tượng) và design system (cụ thể, reusable).

## Prerequisites

- `brand-guidelines` hoàn tất
- `information-architecture` hoàn tất (biết cần bao nhiêu templates)

## Quy trình bắt buộc

### 1. Moodboard & Visual References

```markdown
## Visual Direction Statement
[1-2 câu mô tả aesthetic tổng thể. VD: "Minimalist, editorial-inspired với bold typography 
và generous white space. Premium nhưng approachable, data-driven nhưng human."]

## Keywords
[5-7 từ khóa visual. VD: "Clean, Bold, Spacious, Refined, Contemporary, Warm, Confident"]

## Reference Websites
| Website | What to learn | What NOT to copy |
|---------|--------------|-----------------|
| [URL 1] | [Layout, typography, etc.] | [Feature quá phức tạp] |
| [URL 2] | [Color usage, imagery] | [Style không phù hợp brand] |
| [URL 3] | [Animation, interaction] | [Excessive decoration] |
```

### 2. Layout Direction

#### Layout Patterns

```markdown
## Chosen Layout Pattern: [Pattern name]

### Grid System
- **Type**: [CSS Grid / Flexbox / Combination]
- **Columns**: [12-column / 16-column / custom]
- **Gutter**: [16px / 24px / 32px]
- **Max width**: [1200px / 1280px / 1440px]
- **Margin**: [Auto / fixed padding on mobile]

### Content Width Tiers
| Tier | Max Width | Usage |
|------|-----------|-------|
| Full | 100vw | Hero images, full-bleed sections |
| Wide | [1440px] | Section containers |
| Default | [1200px] | Main content |
| Narrow | [720px] | Blog posts, long-form text |
| Compact | [480px] | Forms, centered modals |
```

#### Section Patterns

```markdown
## Section Layout Patterns

### Hero Sections
- Pattern: [Full-width image + overlay / Split layout / Text-only + gradient]
- Height: [100vh / 80vh / auto]
- Content alignment: [Center / Left-aligned / Right image]

### Content Sections
- Rhythm: [Alternating / Consistent left-aligned / Grid-based]
- Spacing between sections: [80px mobile / 120px desktop]
- Visual separation: [White space only / Background color alternation / Divider lines]

### Card Layouts
- Grid: [2-column / 3-column / 4-column / responsive]
- Card style: [Elevated / Flat / Bordered / Image-heavy]
- Hover behavior: [Lift / Color shift / Border change / Scale]

### Feature Sections
- Pattern: [Icon + text grid / Screenshot + description alternating / Timeline]
```

### 3. Visual Hierarchy System

```markdown
## Hierarchy Levels

### Level 1 — Page Hero
- Typography: Display / H1
- Color: [Primary / White on dark]
- Size: Largest
- Purpose: Immediate attention, value proposition

### Level 2 — Section Headers
- Typography: H2
- Color: [Dark text]
- Decoration: [Underline / accent color / none]
- Purpose: Scannable section breaks

### Level 3 — Content Blocks
- Typography: H3 + Body
- Purpose: Detailed information within sections

### Level 4 — Supporting Content
- Typography: Body Small / Caption
- Color: [Muted text color]
- Purpose: Metadata, timestamps, secondary info

### CTA Hierarchy
| Level | Style | Example |
|-------|-------|---------|
| Primary | Solid button, brand color, large | "Get Started", "Contact Us" |
| Secondary | Outlined button, brand color | "Learn More", "View Details" |
| Tertiary | Text link + arrow | "Read the docs →" |
| Ghost | Subtle text link | Footer links, metadata |
```

### 4. Color Application

```markdown
## Color Usage Map

### Backgrounds
| Context | Color | Reason |
|---------|-------|--------|
| Page background | [Neutral 50] | Clean canvas |
| Alternate sections | [Neutral 100] | Visual rhythm |
| Dark sections | [Neutral 800-900] | Contrast, emphasis |
| Accent sections | [Primary tint] | Brand moments |
| Card background | [White] | Elevation from page |

### Text Colors
| Context | Color | On Background |
|---------|-------|---------------|
| Headings | [Neutral 800] | Light backgrounds |
| Body text | [Neutral 600-700] | Light backgrounds |
| Muted text | [Neutral 400-500] | Light backgrounds |
| On dark | [White / Neutral 100] | Dark backgrounds |
| Links | [Primary] | All backgrounds |

### Interactive Elements
| State | Color Treatment |
|-------|----------------|
| Default | [Primary solid / outlined] |
| Hover | [Primary dark / fill change] |
| Active | [Primary darker] |
| Focus | [Primary + focus ring] |
| Disabled | [Neutral 300, 50% opacity] |
```

### 5. Typography Pairing & Application

```markdown
## Font Pairing
- **Heading**: [Font A] — [Personality: modern, authoritative, etc.]
- **Body**: [Font B] — [Personality: readable, friendly, etc.]
- **Why this pairing works**: [Contrast + Harmony rationale]

## Typography Application
| Element | Font | Size (desktop) | Size (mobile) | Weight | Color |
|---------|------|----------------|---------------|--------|-------|
| Display | Heading | 4rem | 2.5rem | 800 | Neutral 900 |
| H1 | Heading | 3rem | 2rem | 700 | Neutral 800 |
| H2 | Heading | 2.25rem | 1.75rem | 700 | Neutral 800 |
| H3 | Heading | 1.5rem | 1.25rem | 600 | Neutral 800 |
| Body L | Body | 1.125rem | 1rem | 400 | Neutral 600 |
| Body | Body | 1rem | 1rem | 400 | Neutral 600 |
| Caption | Body | 0.875rem | 0.8125rem | 400 | Neutral 500 |
| Button | Body | 1rem | 0.875rem | 600 | [Varies] |
| Nav | Body | 0.875rem | 1rem | 500 | Neutral 700 |
```

### 6. Imagery & Illustration Direction

```markdown
## Photography
- **Treatment**: [Full color / Duotone / B&W with accent / Filtered]
- **Subjects**: [People / Products / Abstract / Architecture]
- **Composition**: [Centered / Rule of thirds / Asymmetric]
- **Aspect ratios**: [16:9 hero / 4:3 cards / 1:1 thumbnails / 3:2 features]

## Illustrations (nếu dùng)
- **Style**: [Line art / Flat / Isometric / 3D / Hand-drawn]
- **Colors**: [Brand palette only / Extended palette]
- **Consistency**: [Same stroke weight / Same perspective / Same level of detail]

## Icons
- **Source**: [Icon library name hoặc custom]
- **Style**: [Outlined / Filled / Duotone]
- **Sizes**: [16px, 20px, 24px, 32px]
- **Color**: [Monochrome / Brand accent]
```

### 7. Motion & Animation Direction

```markdown
## Motion Principles
1. **Purposeful**: Mỗi animation phải serve một mục đích (feedback, orientation, delight)
2. **Natural**: Easing curves tự nhiên, không linear
3. **Quick**: Transitions 200-400ms, không quá lâu
4. **Respectful**: Honor prefers-reduced-motion

## Animation Tokens
| Token | Value | Usage |
|-------|-------|-------|
| --duration-instant | 100ms | Hover, active states |
| --duration-fast | 200ms | Dropdowns, tooltips |
| --duration-normal | 300ms | Page transitions, modals |
| --duration-slow | 500ms | Complex animations |
| --ease-default | cubic-bezier(0.4, 0, 0.2, 1) | General transitions |
| --ease-in | cubic-bezier(0.4, 0, 1, 1) | Elements entering |
| --ease-out | cubic-bezier(0, 0, 0.2, 1) | Elements leaving |
| --ease-bounce | cubic-bezier(0.34, 1.56, 0.64, 1) | Playful feedback |

## Scroll Animations
- **Entrance**: [Fade up / Slide in / Scale up]
- **Trigger**: [When element enters viewport]
- **Stagger**: [Sequential delay for lists: 50-100ms between items]
- **Once**: [Animate once, don't repeat on scroll back]

## Hover Effects
| Element | Effect | Duration |
|---------|--------|----------|
| Buttons | [Background color shift + slight lift] | 200ms |
| Cards | [Shadow increase + subtle scale 1.02] | 200ms |
| Links | [Underline slide / Color transition] | 150ms |
| Images | [Slight zoom 1.05 / Overlay appear] | 300ms |
| Nav items | [Underline indicator / Background highlight] | 150ms |

## Page Transitions (SPA nếu applicable)
- **Type**: [Fade / Slide / Shared element]
- **Duration**: 300ms
- **Content loading**: [Skeleton screens during transition]
```

### 8. Elevation & Depth

```markdown
## Shadow System
| Level | Shadow | Usage |
|-------|--------|-------|
| 0 | none | Flat elements |
| 1 | 0 1px 2px rgba(0,0,0,0.05) | Cards resting |
| 2 | 0 4px 6px rgba(0,0,0,0.07) | Cards hover, dropdowns |
| 3 | 0 10px 15px rgba(0,0,0,0.1) | Modals, popovers |
| 4 | 0 20px 25px rgba(0,0,0,0.15) | Dialogs, elevated panels |

## Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| --radius-sm | 4px | Badges, tags |
| --radius-md | 8px | Buttons, inputs |
| --radius-lg | 12px | Cards |
| --radius-xl | 16px | Large cards, modals |
| --radius-full | 9999px | Avatars, pills |
```

## Output bắt buộc

### `docs/visual-direction.md`
Document tổng hợp visual direction với:
- Visual statement và keywords
- Layout patterns và grid system
- Visual hierarchy system
- Color application map
- Typography application
- Imagery direction
- Motion principles và tokens
- Elevation system

## Acceptance Criteria

- [ ] Visual direction statement rõ ràng
- [ ] Layout grid system defined
- [ ] Visual hierarchy có ≥ 4 levels
- [ ] CTA hierarchy có ≥ 3 levels
- [ ] Color application map cho backgrounds, text, interactive
- [ ] Typography pairing với rationale
- [ ] Animation tokens defined
- [ ] Hover effects cho mọi interactive elements
- [ ] prefers-reduced-motion được mention
- [ ] Shadow/elevation system defined
- [ ] Border radius system defined

## Anti-patterns cần tránh

❌ Visual direction quá abstract ("modern and clean") mà không có specifics
❌ Copy visual direction từ reference mà không adapt cho brand
❌ Animation quá nhiều hoặc quá lâu
❌ Inconsistent shadow/radius giữa các components
❌ Không plan cho dark mode từ đầu (nếu cần)
❌ Typography responsive chỉ là giảm font-size, không adjust line-height và spacing
