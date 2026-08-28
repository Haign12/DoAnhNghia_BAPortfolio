---
name: information-architecture
description: |
  Hướng dẫn AI agent xây dựng information architecture: sitemap, content grouping, 
  navigation model, findability, URL strategy, page inventory và content hierarchy.
globs:
  - "docs/information-architecture.md"
  - "sitemap.xml"
  - "**/*.html"
---

# Information Architecture

## Mục đích

Information Architecture (IA) quyết định cách thông tin được tổ chức, phân nhóm và kết nối với nhau. IA tốt giúp user tìm thấy thông tin nhanh chóng và hoàn thành task hiệu quả. IA tệ khiến user lạc, bỏ cuộc hoặc không tin tưởng.

## Prerequisites

- `product-discovery` hoàn tất (có product brief)
- `ux-research-and-journey` hoàn tất (có persona, JTBD, task flows)

## Quy trình bắt buộc

### 1. Content Inventory

Liệt kê TẤT CẢ nội dung cần có trên website:

```markdown
## Content Inventory

| ID | Content Item | Type | Priority | Source | Status |
|----|-------------|------|----------|--------|--------|
| C01 | Hero headline | Text | Must | Need to create | ❌ |
| C02 | About section | Text + Image | Must | Existing | ✅ |
| C03 | Services list | Structured data | Must | Need to create | ❌ |
| C04 | Case studies | Rich content | Should | Partial | 🟡 |
| C05 | Contact form | Interactive | Must | Need to build | ❌ |
| C06 | Blog posts | Content | Nice | Future | ⏳ |

### Content Types
- **Text**: Headlines, paragraphs, labels
- **Image**: Photos, illustrations, icons
- **Structured data**: Lists, cards, tables
- **Rich content**: Mixed media, case studies
- **Interactive**: Forms, calculators, tools
- **Media**: Video, audio, animation
```

### 2. Content Grouping (Card Sorting Mental Model)

Nhóm content theo mental model của user, KHÔNG theo org chart:

```markdown
## Content Groups

### Group: [Tên nhóm theo user mental model]
- Content items: C01, C02, C03
- User expectation: [User mong đợi tìm gì ở đây?]
- Primary task served: [Task nào được hỗ trợ?]

### Group: [Tên nhóm khác]
- Content items: C04, C05
- User expectation: [...]
- Primary task served: [...]
```

### 3. Sitemap

```markdown
## Sitemap Structure

### Level 0 — Homepage
├── Homepage (/)

### Level 1 — Main Sections
├── About (/about)
├── Services (/services)
├── Portfolio (/portfolio)
├── Blog (/blog)
├── Contact (/contact)

### Level 2 — Sub-pages
├── Services
│   ├── Service A (/services/service-a)
│   ├── Service B (/services/service-b)
│   └── Service C (/services/service-c)
├── Portfolio
│   ├── Project 1 (/portfolio/project-1)
│   └── Project 2 (/portfolio/project-2)

### Level 3+ (if needed)
└── [Keep depth ≤ 3 levels for most websites]
```

#### Sitemap Rules

- **Depth ≤ 3 clicks** từ homepage đến bất kỳ page nào
- **Flat > Deep**: Ưu tiên navigation rộng hơn là sâu
- **Consistent naming**: URL slugs match navigation labels
- **Logical grouping**: Pages cùng chủ đề nằm cùng section

### 4. Navigation Model

```markdown
## Primary Navigation
| Order | Label | URL | Dropdown? | Notes |
|-------|-------|-----|-----------|-------|
| 1 | Home | / | No | Logo click |
| 2 | [Label] | /[path] | [Yes/No] | [CTA?] |
| 3 | [Label] | /[path] | [Yes/No] | |
| N | [CTA Label] | /[path] | No | Styled as button |

### Navigation Rules
- Maximum 7±2 items in primary nav (Miller's Law)
- CTA button là item cuối cùng, visually distinct
- Active state rõ ràng cho current page
- Mobile: hamburger menu hoặc bottom nav
- Dropdown depth: maximum 1 level

## Secondary Navigation (Footer)
| Column | Items |
|--------|-------|
| [Column name] | [Link list] |
| [Column name] | [Link list] |
| Legal | Privacy Policy, Terms, Cookies |

## Utility Navigation (nếu cần)
- Search, Language, Login, Cart
- Vị trí: top-right hoặc secondary header
```

### 5. URL Strategy

```markdown
## URL Convention
- Format: lowercase, hyphens, no trailing slash
- Pattern: /[section]/[page-name]
- Ngôn ngữ: [en/vi/multilingual strategy]
- Maximum length: ~75 characters

## URL Map
| Page | URL | Canonical | Redirect from |
|------|-----|-----------|--------------|
| Homepage | / | / | /home, /index |
| About | /about | /about | /about-us |
| [Page] | /[url] | /[url] | [Old URLs] |

## URL Rules
- ❌ Không dùng query params cho navigation (?page=about)
- ❌ Không dùng IDs trong URL (/page/123)
- ✅ Descriptive slugs reflect content
- ✅ Consistent hierarchy mirrors sitemap
- ✅ Redirects cho URLs cũ nếu migrating
```

### 6. Page Inventory & Template Mapping

```markdown
## Page Inventory

| Page | Template | Sections | Primary CTA | SEO Priority |
|------|----------|----------|-------------|-------------|
| Homepage | Hero + Features | Hero, Value Prop, Features, Social Proof, CTA | [Action] | High |
| About | Content | Story, Team, Values, Timeline | [Action] | Medium |
| Services | Grid/List | Overview, Service Cards, Process, CTA | [Action] | High |
| [Service Detail] | Case Study | Hero, Problem, Solution, Results, Related | [Action] | High |
| Contact | Form | Info, Form, Map, FAQ | Submit | Medium |
| Blog Index | Archive | Featured, Grid, Pagination, Categories | Read | Medium |
| Blog Post | Article | Content, Author, Related, Comments | Share | Low-Med |
| 404 | Error | Message, Search, Popular Pages | Go Home | N/A |

## Unique Templates Needed
1. **Hero Page** — Homepage, major landing pages
2. **Content Page** — About, legal pages
3. **Grid Page** — Services, portfolio, blog index
4. **Detail Page** — Case study, service detail, blog post
5. **Form Page** — Contact, application
6. **Error Page** — 404, 500
```

### 7. Cross-linking & Findability

```markdown
## Internal Linking Strategy
| From Page | To Page | Link Type | Anchor Text |
|-----------|---------|-----------|-------------|
| Homepage | Services | CTA button | "Explore Services" |
| Service | Case Study | Contextual | "See how we did it" |
| Blog Post | Service | Contextual | "[Service name]" |
| All pages | Contact | CTA | "Get in Touch" |

## Findability Checklist
- [ ] Breadcrumbs trên pages level 2+
- [ ] Related/suggested content trên detail pages
- [ ] Search functionality (nếu >20 pages)
- [ ] Clear section indicators trong navigation
- [ ] Footer navigation bao phủ tất cả main sections
- [ ] 404 page có search hoặc popular links
```

## Output bắt buộc

### `docs/information-architecture.md`
Tổng hợp:
- Content inventory
- Sitemap hierarchy
- Navigation model (primary, secondary, utility)
- URL strategy
- Page inventory với template mapping
- Cross-linking strategy

### `sitemap.xml`
Generate sitemap XML chuẩn từ URL map.

## Acceptance Criteria

- [ ] Content inventory liệt kê tất cả content items với priority
- [ ] Sitemap có depth ≤ 3 levels
- [ ] Primary navigation ≤ 7 items
- [ ] URL strategy consistent và descriptive
- [ ] Mỗi page trong inventory có template assignment
- [ ] Cross-linking strategy defined
- [ ] Findability checklist completed
- [ ] Mobile navigation plan documented

## Anti-patterns cần tránh

❌ Tổ chức nav theo org chart thay vì user mental model
❌ Navigation quá sâu (>3 levels)
❌ Quá nhiều items trong primary nav
❌ URLs không descriptive (/page1, /page2)
❌ Không có 404 page
❌ Missing breadcrumbs trên deep pages
❌ Duplicate content không có canonical URL
