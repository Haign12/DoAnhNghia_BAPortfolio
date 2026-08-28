---
name: frontend-implementation
description: |
  Hướng dẫn AI agent implement frontend: semantic HTML, CSS architecture, 
  JavaScript patterns, performance, responsive layout, reusable components, 
  data states và code organization cho website HTML/CSS/JS hoặc framework.
globs:
  - "**/*.html"
  - "**/*.css"
  - "**/*.js"
  - "**/*.ts"
  - "**/*.jsx"
  - "**/*.tsx"
---

# Frontend Implementation

## Mục đích

Chuyển design system và visual direction thành code production-ready. Skill này focus vào implementation quality: semantic markup, CSS architecture, JavaScript patterns và performance.

## Prerequisites

- `design-system-and-components` hoàn tất (có tokens và component specs)
- `information-architecture` hoàn tất (có sitemap và page templates)
- `conversion-and-content` hoàn tất (có content model)

## Nguyên tắc cốt lõi

1. **Semantic HTML first** — Dùng đúng HTML elements, KHÔNG div soup
2. **Progressive enhancement** — Base experience works without JS
3. **Performance budget** — Mỗi quyết định phải xét performance impact
4. **Accessibility built-in** — Không phải afterthought
5. **Mobile-first** — Base styles = mobile, enhance at breakpoints

## Quy trình bắt buộc

### 1. Project Scaffold

```
project/
├── index.html
├── [page].html
├── assets/
│   ├── css/
│   │   ├── tokens.css        # Design tokens
│   │   ├── reset.css          # CSS reset
│   │   ├── base.css           # Base element styles
│   │   ├── layout.css         # Grid, container, section
│   │   ├── utilities.css      # Utility classes
│   │   ├── components/        # Component CSS
│   │   │   ├── navbar.css
│   │   │   ├── hero.css
│   │   │   ├── card.css
│   │   │   ├── button.css
│   │   │   ├── form.css
│   │   │   └── footer.css
│   │   └── pages/             # Page-specific CSS
│   │       ├── home.css
│   │       └── about.css
│   ├── js/
│   │   ├── main.js            # Main entry
│   │   ├── components/        # Component JS
│   │   │   ├── navbar.js
│   │   │   ├── modal.js
│   │   │   └── accordion.js
│   │   └── utils/             # Utilities
│   │       ├── animation.js
│   │       └── form-validation.js
│   ├── images/
│   │   ├── optimized/         # WebP/AVIF
│   │   └── originals/         # Source files
│   └── fonts/
│       └── [font-files]
├── robots.txt
├── sitemap.xml
├── manifest.json
└── docs/
    └── [documentation]
```

### 2. HTML Standards

#### Document Structure

```html
<!DOCTYPE html>
<html lang="vi" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO -->
  <title>[Page Title] — [Brand Name]</title>
  <meta name="description" content="[Compelling description, ≤160 chars]">
  <link rel="canonical" href="[Canonical URL]">
  
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="[Title]">
  <meta property="og:description" content="[Description]">
  <meta property="og:image" content="[Image URL]">
  <meta property="og:url" content="[Page URL]">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[Title]">
  <meta name="twitter:description" content="[Description]">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  
  <!-- Fonts (preload critical) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="/assets/fonts/[critical-font].woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- CSS -->
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/reset.css">
  <link rel="stylesheet" href="/assets/css/base.css">
  <link rel="stylesheet" href="/assets/css/layout.css">
  <link rel="stylesheet" href="/assets/css/components/[component].css">
  
  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "[Type]",
    "name": "[Name]",
    "description": "[Description]",
    "url": "[URL]"
  }
  </script>
</head>
<body>
  <!-- Skip link -->
  <a href="#main-content" class="skip-link">Bỏ qua đến nội dung chính</a>
  
  <header class="site-header" role="banner">
    <nav class="navbar" aria-label="Main navigation">
      <!-- Navigation -->
    </nav>
  </header>
  
  <main id="main-content" class="site-main">
    <!-- Page content -->
  </main>
  
  <footer class="site-footer" role="contentinfo">
    <!-- Footer -->
  </footer>
  
  <!-- JS (defer) -->
  <script src="/assets/js/main.js" defer></script>
</body>
</html>
```

#### Semantic Elements Checklist

| Element | Usage | NOT |
|---------|-------|-----|
| `<header>` | Page/section header | `<div class="header">` |
| `<nav>` | Navigation blocks | `<div class="nav">` |
| `<main>` | Primary page content (1 per page) | `<div class="main">` |
| `<section>` | Thematic grouping WITH heading | Generic wrapper |
| `<article>` | Self-contained content | Any content block |
| `<aside>` | Tangential content | Sidebars without relation |
| `<footer>` | Page/section footer | `<div class="footer">` |
| `<figure>` + `<figcaption>` | Images, charts, code with caption | `<div><img>` |
| `<time>` | Dates and times | `<span class="date">` |
| `<address>` | Contact information | Physical addresses only |
| `<details>` + `<summary>` | Expandable content | Custom accordion (khi có thể) |
| `<dialog>` | Modal dialogs | `<div class="modal">` |

#### Heading Hierarchy

```
h1: Page title (MỘT DUY NHẤT per page)
  h2: Section headings
    h3: Subsection headings
      h4: Detail headings
```

**KHÔNG** skip heading levels (h1 → h3 ❌)
**KHÔNG** dùng heading chỉ vì muốn text to (dùng CSS class)

### 3. CSS Architecture

#### Reset/Normalize

```css
/* Modern CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

body {
  min-height: 100vh;
  line-height: var(--leading-normal);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-neutral-700);
  background: var(--color-neutral-0);
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
  height: auto;
}

input, button, textarea, select {
  font: inherit;
  color: inherit;
}

a {
  color: inherit;
  text-decoration-skip-ink: auto;
}

ul, ol { list-style: none; }
```

#### Layout Utilities

```css
/* Container */
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--space-4);
}

@media (min-width: 768px) {
  .container { padding-inline: var(--space-6); }
}

@media (min-width: 1024px) {
  .container { padding-inline: var(--space-8); }
}

/* Section spacing */
.section {
  padding-block: var(--space-16);
}

@media (min-width: 768px) {
  .section { padding-block: var(--space-20); }
}

@media (min-width: 1024px) {
  .section { padding-block: var(--space-24); }
}

/* Grid */
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid--2 { grid-template-columns: repeat(1, 1fr); }
.grid--3 { grid-template-columns: repeat(1, 1fr); }

@media (min-width: 768px) {
  .grid--2 { grid-template-columns: repeat(2, 1fr); }
  .grid--3 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid--3 { grid-template-columns: repeat(3, 1fr); }
}
```

#### Skip Link (Accessibility)

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: var(--color-primary-500);
  color: var(--color-neutral-0);
  font-weight: 600;
  border-radius: var(--radius-md);
  z-index: var(--z-tooltip);
  transition: top var(--duration-fast) var(--ease-default);
}

.skip-link:focus {
  top: var(--space-4);
}
```

### 4. JavaScript Standards

```javascript
// === JAVASCRIPT BEST PRACTICES ===

// 1. DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
});

// 2. Component Pattern
class Component {
  constructor(element, options = {}) {
    this.element = element;
    this.options = { ...Component.defaults, ...options };
    this.init();
  }

  static defaults = {};

  init() {
    this.cacheDOM();
    this.bindEvents();
  }

  cacheDOM() {
    // Cache DOM queries
  }

  bindEvents() {
    // Use event delegation where possible
  }

  destroy() {
    // Cleanup: remove event listeners, observers
  }
}

// 3. Event Delegation
document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  
  const action = target.dataset.action;
  // Handle action
});

// 4. Intersection Observer for scroll animations
const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Animate once
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
};

// 5. Debounce utility
const debounce = (fn, delay = 250) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// 6. Throttle utility
const throttle = (fn, limit = 250) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// 7. Prefers Reduced Motion check
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
```

### 5. Performance Checklist

```markdown
## Performance Rules

### Images
- [ ] Format: WebP with JPEG fallback (use <picture>)
- [ ] Lazy load: loading="lazy" cho below-fold images
- [ ] Responsive: srcset + sizes cho different viewports
- [ ] Dimensions: width + height attributes (prevent CLS)
- [ ] Compression: ≤ 200KB per hero image, ≤ 100KB per card image

### CSS
- [ ] Critical CSS inline trong <head> cho above-fold
- [ ] Non-critical CSS loaded asynchronously
- [ ] No unused CSS (audit regularly)
- [ ] CSS custom properties cho theming (no runtime JS needed)
- [ ] Contain: content cho complex components

### JavaScript
- [ ] defer attribute cho scripts không block render
- [ ] Bundle size < 100KB gzipped cho main bundle
- [ ] No render-blocking JS
- [ ] Tree shake unused code
- [ ] Event listeners cleaned up properly

### Fonts
- [ ] font-display: swap (prevent invisible text)
- [ ] Preload critical fonts
- [ ] Subset fonts (only needed characters)
- [ ] ≤ 2 font families, ≤ 4 weights total
- [ ] Self-host hoặc preconnect to font CDN

### General
- [ ] Gzip/Brotli compression enabled
- [ ] Cache headers set properly
- [ ] DNS prefetch cho external resources
- [ ] No layout shifts (CLS < 0.1)
- [ ] LCP element loads within 2.5s
```

### 6. Responsive Implementation

```css
/* === RESPONSIVE PATTERNS === */

/* Fluid Typography */
h1 {
  font-size: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
  line-height: 1.1;
}

h2 {
  font-size: clamp(1.5rem, 1.25rem + 1.25vw, 2.25rem);
  line-height: 1.2;
}

/* Responsive Images */
.responsive-image {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

/* Stack on mobile, side-by-side on desktop */
.split-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

@media (min-width: 768px) {
  .split-layout {
    flex-direction: row;
    align-items: center;
  }
  .split-layout > * {
    flex: 1;
  }
}
```

## Output bắt buộc

- HTML files với semantic markup
- CSS files organized theo architecture
- JavaScript files với component patterns
- Responsive layout working trên mobile/tablet/desktop
- Performance optimizations applied

## Acceptance Criteria

- [ ] HTML validates (W3C validator)
- [ ] Semantic elements used appropriately
- [ ] One H1 per page, heading hierarchy correct
- [ ] Skip link present and functional
- [ ] All CSS uses design tokens (no hardcoded values)
- [ ] Mobile-first responsive (works on 320px+)
- [ ] Images optimized (WebP, lazy loaded, responsive)
- [ ] JavaScript deferred, no render-blocking
- [ ] Performance budget met (LCP < 2.5s, CLS < 0.1)
- [ ] No console errors

## Anti-patterns cần tránh

❌ Div soup — `<div>` everywhere instead of semantic elements
❌ Inline styles thay vì CSS classes
❌ Hardcode pixel values thay vì tokens/variables
❌ Missing alt text on images
❌ JavaScript render-blocking without defer
❌ Images without width/height (causes CLS)
❌ Desktop-first responsive (min-width sai direction)
❌ Copy-paste CSS thay vì reusable components
❌ Event listeners không cleanup → memory leaks
