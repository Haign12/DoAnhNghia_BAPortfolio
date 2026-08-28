---
name: seo-strategy
description: |
  Hướng dẫn AI agent implement SEO kỹ thuật và on-page: metadata, structured data,
  crawlability, indexability, Core Web Vitals, sitemap, robots, Open Graph, 
  internal linking và mobile-friendliness.
globs:
  - "**/*.html"
  - "robots.txt"
  - "sitemap.xml"
  - "docs/seo-performance-plan.md"
---

# SEO Strategy

## Mục đích

SEO không phải bước cuối cùng — nó ảnh hưởng đến IA, content structure, URL design và performance từ đầu. Skill này đảm bảo website discoverable, indexable và rankable.

## Quy trình bắt buộc

### 1. Technical SEO Foundation

#### Meta Tags per Page

```html
<head>
  <!-- Essential -->
  <title>[Primary Keyword] — [Brand Name] | [Secondary Keyword]</title>
  <meta name="description" content="[Compelling description with keyword, ≤160 chars]">
  <link rel="canonical" href="https://[domain]/[path]">
  
  <!-- Robots -->
  <meta name="robots" content="index, follow">
  <!-- Hoặc cho pages không nên index: -->
  <!-- <meta name="robots" content="noindex, nofollow"> -->
  
  <!-- Language -->
  <html lang="vi">
  <link rel="alternate" hreflang="vi" href="https://[domain]/[path]">
  <link rel="alternate" hreflang="x-default" href="https://[domain]/[path]">
  
  <!-- Pagination (nếu có) -->
  <!-- <link rel="prev" href="?page=1"> -->
  <!-- <link rel="next" href="?page=3"> -->
</head>
```

#### Meta Tags Checklist

```markdown
## Per-Page SEO Checklist

| Page | Title Tag | Meta Description | H1 | Canonical | Schema | OG |
|------|-----------|------------------|----|-----------|---------|----|
| Homepage | ✅ ≤60 chars | ✅ ≤160 chars | ✅ 1x | ✅ | ✅ Organization | ✅ |
| About | ✅ | ✅ | ✅ | ✅ | ✅ Person/Org | ✅ |
| Services | ✅ | ✅ | ✅ | ✅ | ✅ Service | ✅ |
| Portfolio | ✅ | ✅ | ✅ | ✅ | ✅ CreativeWork | ✅ |
| Blog Post | ✅ | ✅ | ✅ | ✅ | ✅ Article | ✅ |
| Contact | ✅ | ✅ | ✅ | ✅ | ✅ ContactPage | ✅ |
| 404 | ✅ | noindex | ✅ | ❌ | ❌ | ❌ |

### Title Tag Rules
- Format: [Page Topic] — [Brand] hoặc [Brand] | [Page Topic]
- ≤ 60 characters (hiển thị đầy đủ trên SERP)
- Unique per page
- Primary keyword gần đầu

### Meta Description Rules
- ≤ 160 characters
- Compelling, action-oriented
- Include primary keyword naturally
- Unique per page
- End with CTA or value statement
```

### 2. Structured Data (Schema.org)

```html
<!-- Organization (Homepage) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Brand Name]",
  "url": "https://[domain]",
  "logo": "https://[domain]/logo.png",
  "description": "[Description]",
  "sameAs": [
    "https://linkedin.com/in/[profile]",
    "https://github.com/[profile]"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+84-xxx-xxx-xxx",
    "contactType": "customer service",
    "email": "[email]"
  }
}
</script>

<!-- Person (Portfolio/About) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Name]",
  "jobTitle": "[Title]",
  "url": "https://[domain]",
  "image": "https://[domain]/photo.jpg",
  "sameAs": ["[social links]"],
  "knowsAbout": ["[Skill 1]", "[Skill 2]"]
}
</script>

<!-- Article (Blog Post) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Title]",
  "description": "[Description]",
  "image": "https://[domain]/[image]",
  "datePublished": "[ISO date]",
  "dateModified": "[ISO date]",
  "author": {
    "@type": "Person",
    "name": "[Author]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "[Brand]",
    "logo": {
      "@type": "ImageObject",
      "url": "https://[domain]/logo.png"
    }
  }
}
</script>

<!-- BreadcrumbList -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://[domain]/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[Section]",
      "item": "https://[domain]/[section]"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Current Page]"
    }
  ]
}
</script>

<!-- FAQPage (nếu có FAQ section) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question 1]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer 1]"
      }
    }
  ]
}
</script>
```

### 3. Open Graph & Social

```html
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="[Brand]">
<meta property="og:title" content="[Title — same as title tag or slightly different]">
<meta property="og:description" content="[Description — can be longer than meta description]">
<meta property="og:image" content="https://[domain]/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://[domain]/[path]">
<meta property="og:locale" content="vi_VN">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@[handle]">
<meta name="twitter:title" content="[Title]">
<meta name="twitter:description" content="[Description]">
<meta name="twitter:image" content="https://[domain]/twitter-image.jpg">

<!-- OG Image Requirements -->
<!-- Size: 1200x630px (Facebook/LinkedIn) -->
<!-- Format: JPG or PNG -->
<!-- File size: < 300KB -->
<!-- Text readable at small sizes -->
```

### 4. Crawlability & Indexability

#### robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/

Sitemap: https://[domain]/sitemap.xml
```

#### sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[domain]/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://[domain]/about</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- All public pages -->
</urlset>
```

### 5. Internal Linking Strategy

```markdown
## Internal Linking Rules

1. **Every page** phải có ≥ 2 internal links đến related content
2. **Anchor text** descriptive (không "click here" hoặc "read more")
3. **Hierarchy**: Homepage links to all sections → Sections link to detail pages
4. **Contextual links**: Trong body content, link tự nhiên đến related pages
5. **Navigation links**: Consistent qua nav, footer, breadcrumbs
6. **No orphan pages**: Mọi page phải reachable từ sitemap hoặc navigation

## Link Audit Template
| From Page | To Page | Anchor Text | Link Type | Status |
|-----------|---------|-------------|-----------|--------|
| Homepage | /services | "Explore our services" | CTA | ✅ |
| Service A | /portfolio/project-1 | "See case study" | Contextual | ✅ |
| Blog Post | /services/[related] | "[Service name]" | Contextual | ✅ |
```

### 6. Performance for SEO (Core Web Vitals)

```markdown
## Core Web Vitals Targets

| Metric | Target (Good) | Measure | Impact |
|--------|---------------|---------|--------|
| LCP (Largest Contentful Paint) | ≤ 2.5s | Loading speed | Ranking signal |
| INP (Interaction to Next Paint) | ≤ 200ms | Interactivity | Ranking signal |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | Visual stability | Ranking signal |

## Quick Wins
1. **LCP**: Preload hero image, optimize fonts, minimize render-blocking CSS
2. **INP**: Defer non-critical JS, optimize event handlers
3. **CLS**: Set width/height on images, reserve space for dynamic content

## Performance Budget
| Resource | Budget |
|----------|--------|
| Total page weight | < 1.5MB |
| HTML | < 50KB |
| CSS (total) | < 100KB |
| JS (total) | < 150KB |
| Images (per page) | < 500KB |
| Fonts | < 200KB |
| First Byte (TTFB) | < 600ms |
```

### 7. Mobile SEO

```markdown
## Mobile-First Indexing Checklist

- [ ] Responsive design (cùng HTML cho desktop và mobile)
- [ ] viewport meta tag present
- [ ] Text readable without zoom (≥ 16px base)
- [ ] Touch targets ≥ 48x48px
- [ ] No horizontal scrolling
- [ ] No interstitials/popups che nội dung
- [ ] Images responsive (srcset/sizes)
- [ ] Structured data present trên mobile version
- [ ] Same content trên mobile và desktop
- [ ] Fast loading (LCP < 2.5s on 4G)
```

## Output bắt buộc

### `docs/seo-performance-plan.md`
- Per-page meta tag plan
- Structured data plan
- Internal linking strategy
- Performance budget
- Core Web Vitals targets

### Files
- `robots.txt`
- `sitemap.xml`
- Schema.org JSON-LD in all pages
- OG/Twitter meta tags in all pages

## Acceptance Criteria

- [ ] Unique title tag per page (≤ 60 chars)
- [ ] Unique meta description per page (≤ 160 chars)
- [ ] One H1 per page, includes keyword
- [ ] Canonical URLs set
- [ ] Schema.org markup validates (schema.org validator)
- [ ] Open Graph tags present
- [ ] robots.txt correct
- [ ] sitemap.xml includes all public pages
- [ ] Internal links: ≥ 2 per page
- [ ] No broken links
- [ ] Core Web Vitals targets met
- [ ] Mobile-friendly test passes

## Anti-patterns cần tránh

❌ Duplicate title tags across pages
❌ Missing meta descriptions
❌ Multiple H1 tags per page
❌ Keyword stuffing trong content
❌ Missing alt text on images
❌ Broken links (404s)
❌ Missing canonical URLs → duplicate content
❌ No structured data
❌ Render-blocking resources hurting LCP
❌ Missing sitemap.xml
❌ Orphan pages not in navigation or sitemap
