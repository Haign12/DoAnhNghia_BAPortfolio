---
name: web-quality-and-performance
description: |
  Hướng dẫn AI agent audit và tối ưu web performance: Core Web Vitals, 
  loading optimization, caching, image optimization, CSS/JS optimization,
  font loading, runtime performance và monitoring.
globs:
  - "**/*.html"
  - "**/*.css"
  - "**/*.js"
  - "docs/performance-audit.md"
---

# Web Quality & Performance

## Mục đích

Performance là UX. Trang chậm = user rời đi. Skill này cung cấp checklist và kỹ thuật tối ưu performance cho production website.

## Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor | What It Measures |
|--------|------|-------------------|------|-----------------|
| **LCP** | ≤ 2.5s | 2.5s – 4.0s | > 4.0s | Loading performance |
| **INP** | ≤ 200ms | 200ms – 500ms | > 500ms | Interactivity |
| **CLS** | ≤ 0.1 | 0.1 – 0.25 | > 0.25 | Visual stability |

## Optimization Techniques

### 1. LCP Optimization (Largest Contentful Paint)

```markdown
## LCP Candidates (thứ tự ưu tiên)
1. Hero image
2. Hero text block
3. Video poster frame
4. Background image (CSS)

## Optimization Checklist
- [ ] Preload LCP image: `<link rel="preload" as="image" href="hero.webp">`
- [ ] fetchpriority="high" trên LCP image
- [ ] No lazy loading on LCP image (loading="eager")
- [ ] Optimize image size (≤ 200KB for hero)
- [ ] Use modern format (WebP/AVIF)
- [ ] Inline critical CSS (above-fold styles)
- [ ] Remove render-blocking resources
- [ ] Reduce server response time (TTFB < 600ms)
- [ ] Preconnect to third-party origins
```

```html
<!-- LCP Image Optimization -->
<link rel="preload" as="image" href="/images/hero.webp" fetchpriority="high">

<img 
  src="/images/hero.webp"
  alt="Hero description"
  width="1200"
  height="600"
  loading="eager"
  fetchpriority="high"
  decoding="async"
>
```

### 2. CLS Optimization (Cumulative Layout Shift)

```markdown
## CLS Prevention Checklist
- [ ] ALL images have width + height attributes
- [ ] ALL embeds/iframes have explicit dimensions
- [ ] Web fonts use font-display: swap + fallback sizing
- [ ] Dynamic content inserted below viewport or with reserved space
- [ ] No ads/banners injected without reserved space
- [ ] Animations use transform/opacity only (no layout triggers)
```

```css
/* Reserve space for images */
.image-container {
  aspect-ratio: 16 / 9;
  background: var(--color-neutral-100); /* Placeholder color */
}

/* Font loading without CLS */
@font-face {
  font-family: 'Brand Font';
  src: url('/fonts/brand.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
  font-style: normal;
  /* Size-adjust to match fallback metrics */
  size-adjust: 105%;
  ascent-override: 90%;
  descent-override: 20%;
}
```

### 3. INP Optimization (Interaction to Next Paint)

```markdown
## INP Checklist
- [ ] Event handlers complete < 50ms
- [ ] Long tasks broken with yield/requestIdleCallback
- [ ] No synchronous layout thrashing
- [ ] Input handlers debounced/throttled where appropriate
- [ ] Heavy computation in Web Workers
```

```javascript
// Break long tasks
async function processLargeList(items) {
  const CHUNK_SIZE = 50;
  
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    const chunk = items.slice(i, i + CHUNK_SIZE);
    processChunk(chunk);
    
    // Yield to browser for rendering
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}

// Use requestIdleCallback for non-critical work
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Analytics, non-critical initialization
    initAnalytics();
    loadDeferredContent();
  });
}
```

### 4. Image Optimization

```markdown
## Image Format Selection
| Content | Format | Reason |
|---------|--------|--------|
| Photos | WebP (AVIF if possible) | Best compression |
| Icons/logos | SVG | Scalable, tiny size |
| Simple graphics | PNG/WebP | Lossless when needed |
| Animations | CSS/JS animation | Much smaller than GIF |
| Hero images | WebP + JPEG fallback | Broad support |

## Image Sizing Guide
| Usage | Max Width | Max File Size | Format |
|-------|-----------|---------------|--------|
| Hero/banner | 1920px | 200KB | WebP |
| Card thumbnail | 600px | 80KB | WebP |
| Avatar | 200px | 20KB | WebP |
| Icon | 64px | 5KB | SVG |
| OG Image | 1200x630px | 300KB | JPG/PNG |
```

```html
<!-- Modern image with fallbacks -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img 
    src="image.jpg" 
    alt="Description"
    width="800" 
    height="600"
    loading="lazy"
    decoding="async"
  >
</picture>
```

### 5. CSS Optimization

```markdown
## CSS Performance Rules
- [ ] Critical CSS inline (<14KB gzipped)
- [ ] Non-critical CSS loaded async
- [ ] No @import (use <link> instead)
- [ ] Minimize selector specificity
- [ ] Use content-visibility: auto for off-screen content
- [ ] Use contain: layout for complex components
- [ ] Remove unused CSS
```

```html
<!-- Critical CSS inline -->
<style>
  /* Only above-fold styles here */
  /* Keep < 14KB */
</style>

<!-- Non-critical CSS loaded async -->
<link rel="preload" href="/styles/full.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles/full.css"></noscript>
```

```css
/* Content visibility for long pages */
.below-fold-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

### 6. JavaScript Optimization

```markdown
## JS Performance Rules
- [ ] defer attribute on non-critical scripts
- [ ] async attribute on independent scripts
- [ ] Total JS < 150KB gzipped
- [ ] No unused JavaScript (tree shake)
- [ ] Event delegation instead of individual listeners
- [ ] Intersection Observer instead of scroll listeners
- [ ] Debounce/throttle expensive handlers
```

```html
<!-- Script loading priority -->
<!-- Critical: inline small scripts -->
<script>
  // Only critical, small initialization
</script>

<!-- High priority but non-blocking -->
<script src="/js/main.js" defer></script>

<!-- Independent, non-critical -->
<script src="/js/analytics.js" async></script>

<!-- Lazy load on interaction -->
<script>
  document.addEventListener('click', async (e) => {
    if (e.target.matches('[data-modal]')) {
      const { initModal } = await import('/js/modal.js');
      initModal(e.target);
    }
  }, { once: false });
</script>
```

### 7. Font Optimization

```css
/* Self-hosted fonts */
@font-face {
  font-family: 'Brand Font';
  src: url('/fonts/brand-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Brand Font';
  src: url('/fonts/brand-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

```html
<!-- Font preloading -->
<link rel="preload" href="/fonts/brand-regular.woff2" as="font" type="font/woff2" crossorigin>

<!-- If using Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

```markdown
## Font Rules
- Maximum 2 font families
- Maximum 4 font files total (weights/styles)
- WOFF2 format only (best compression)
- font-display: swap always
- Preload critical fonts
- Subset if possible (only needed characters)
```

### 8. Caching Strategy

```markdown
## Cache Headers (nếu control server)

| Resource | Cache-Control | Rationale |
|----------|--------------|-----------|
| HTML | no-cache | Always fresh |
| CSS (hashed) | max-age=31536000, immutable | Cache bust via filename |
| JS (hashed) | max-age=31536000, immutable | Cache bust via filename |
| Images | max-age=86400 | 1 day, responsive to changes |
| Fonts | max-age=31536000, immutable | Rarely change |
```

### 9. Performance Audit Process

```markdown
## Audit Workflow

1. **Lighthouse** (Chrome DevTools → Lighthouse tab)
   - Run in Incognito mode
   - Desktop AND Mobile profiles
   - Record scores: Performance, Accessibility, Best Practices, SEO

2. **WebPageTest** (webpagetest.org)
   - Test from relevant geographic location
   - 3G and 4G connection profiles
   - Record waterfall, filmstrip, metrics

3. **Chrome DevTools Performance tab**
   - Record page load
   - Identify long tasks (> 50ms)
   - Check for layout thrashing
   - Verify no memory leaks

4. **CrUX Dashboard** (after 28 days of traffic)
   - Real user metrics
   - Compare lab vs field data
   - Track improvements over time

## Performance Report Template
| Metric | Target | Actual (Lab) | Actual (Field) | Status |
|--------|--------|-------------|----------------|--------|
| LCP | ≤ 2.5s | [value] | [value] | 🟢🟡🔴 |
| INP | ≤ 200ms | [value] | [value] | 🟢🟡🔴 |
| CLS | ≤ 0.1 | [value] | [value] | 🟢🟡🔴 |
| TTFB | ≤ 600ms | [value] | [value] | 🟢🟡🔴 |
| Total Weight | ≤ 1.5MB | [value] | — | 🟢🟡🔴 |
| Lighthouse Score | ≥ 90 | [value] | — | 🟢🟡🔴 |
```

## Acceptance Criteria

- [ ] Lighthouse Performance ≥ 90 (desktop AND mobile)
- [ ] LCP ≤ 2.5s trên 4G connection
- [ ] CLS ≤ 0.1
- [ ] INP ≤ 200ms
- [ ] Total page weight ≤ 1.5MB
- [ ] No render-blocking resources
- [ ] Images optimized (WebP, lazy loaded, sized)
- [ ] Fonts optimized (swap, preload, WOFF2)
- [ ] No unused CSS/JS > 10KB

## Anti-patterns cần tránh

❌ Loading toàn bộ CSS/JS upfront
❌ Unoptimized images (>500KB per image)
❌ Multiple font families (>2) hoặc weights (>4)
❌ Render-blocking third-party scripts
❌ No image dimensions → CLS
❌ Synchronous layout reads in loops
❌ Polyfills cho modern browsers
❌ jQuery cho simple DOM operations
