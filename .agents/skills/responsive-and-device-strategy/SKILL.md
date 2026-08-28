---
name: responsive-and-device-strategy
description: |
  Hướng dẫn AI agent xây dựng responsive strategy toàn diện: breakpoints theo nội dung,
  touch targets, mobile-first approach, reduced motion, safe areas, orientation handling
  và testing across devices.
globs:
  - "**/*.css"
  - "**/*.html"
  - "docs/responsive-strategy.md"
---

# Responsive & Device Strategy

## Mục đích

Responsive design không chỉ là media queries. Skill này đảm bảo website hoạt động tốt trên MỌI device, MỌI kích thước viewport, MỌI input method (mouse, touch, keyboard, voice).

## Quy trình bắt buộc

### 1. Breakpoint Strategy

```markdown
## Breakpoints (Content-based, không phải device-based)

| Name | Value | Rationale |
|------|-------|-----------|
| --bp-sm | 640px | Single column → 2-column threshold |
| --bp-md | 768px | Content needs wider layout |
| --bp-lg | 1024px | Full desktop layout available |
| --bp-xl | 1280px | Wide desktop, extra space |
| --bp-2xl | 1440px | Maximum content width reached |

### Rules
1. Breakpoints xác định bởi CONTENT, không phải device
2. Test TẠI breakpoints VÀ GIỮA breakpoints
3. Mobile-first: base styles = mobile, add @media (min-width) for larger
4. Avoid @media (max-width) — gây confusion, maintenance hell
```

### 2. Mobile-First Implementation

```css
/* === MOBILE-FIRST PATTERN === */

/* Base: Mobile (< 640px) */
.hero {
  padding: var(--space-12) var(--space-4);
  text-align: center;
}

.hero__title {
  font-size: var(--text-3xl);
}

.hero__grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Tablet (≥ 768px) */
@media (min-width: 768px) {
  .hero {
    padding: var(--space-16) var(--space-6);
    text-align: left;
  }
  
  .hero__title {
    font-size: var(--text-4xl);
  }
  
  .hero__grid {
    flex-direction: row;
    align-items: center;
  }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .hero {
    padding: var(--space-24) var(--space-8);
  }
  
  .hero__title {
    font-size: var(--text-5xl);
  }
}
```

### 3. Touch & Pointer Handling

```css
/* === TOUCH TARGETS === */

/* Minimum touch target: 44x44px (WCAG 2.2 Level AA) */
.btn, .nav__link, a, button, [role="button"],
input[type="checkbox"], input[type="radio"] {
  min-height: 44px;
  min-width: 44px;
}

/* Touch spacing: minimum 8px between targets */
.nav__list {
  gap: var(--space-2); /* At least 8px */
}

/* Pointer-specific styles */
@media (hover: hover) and (pointer: fine) {
  /* Mouse/trackpad — can use hover effects */
  .card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  /* Smaller targets OK for precise pointers */
  .btn--sm { min-height: 36px; }
}

@media (hover: none) and (pointer: coarse) {
  /* Touch device — no hover, larger targets */
  .card:active {
    transform: scale(0.98);
  }
  
  /* Ensure generous targets */
  .btn--sm { min-height: 44px; }
}

/* Disable hover effects on touch */
@media (hover: none) {
  .tooltip { display: none; }
  /* Use tap/click instead of hover for tooltips */
}
```

### 4. Responsive Typography

```css
/* === FLUID TYPOGRAPHY === */

/* Using clamp() for smooth scaling */
:root {
  --text-display: clamp(2.5rem, 2rem + 2.5vw, 4.5rem);
  --text-h1: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
  --text-h2: clamp(1.5rem, 1.25rem + 1.25vw, 2.25rem);
  --text-h3: clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem);
  --text-body-lg: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
}

/* Line length control */
.content-text {
  max-width: 65ch; /* Optimal 60-80 characters */
}

/* Responsive spacing (section padding) */
:root {
  --section-padding: clamp(3rem, 2rem + 5vw, 6rem);
}
```

### 5. Responsive Images

```html
<!-- === RESPONSIVE IMAGE PATTERNS === -->

<!-- Pattern 1: Art Direction (different crops) -->
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcset="hero-desktop.webp" 
    type="image/webp"
  >
  <source 
    media="(min-width: 768px)" 
    srcset="hero-tablet.webp" 
    type="image/webp"
  >
  <source 
    srcset="hero-mobile.webp" 
    type="image/webp"
  >
  <img 
    src="hero-mobile.jpg" 
    alt="[Descriptive alt text]"
    width="1200" 
    height="600"
    loading="eager"
    fetchpriority="high"
    decoding="async"
  >
</picture>

<!-- Pattern 2: Resolution Switching (same image, different sizes) -->
<img 
  srcset="
    image-400.webp 400w,
    image-800.webp 800w,
    image-1200.webp 1200w
  "
  sizes="
    (min-width: 1024px) 33vw,
    (min-width: 768px) 50vw,
    100vw
  "
  src="image-800.jpg"
  alt="[Description]"
  width="800" 
  height="600"
  loading="lazy"
  decoding="async"
>
```

### 6. Responsive Navigation Patterns

```markdown
## Navigation Strategy

### Mobile (< 768px)
- Hamburger menu icon (accessible, aria-expanded)
- Full-screen overlay hoặc slide-from-side
- Large touch targets (44px+)
- Close button visible
- Focus trap when open

### Tablet (768px - 1024px)
- Condensed horizontal nav HOẶC hamburger
- Priority+ pattern: show most important items, "More" dropdown
- Logo + CTA visible

### Desktop (> 1024px)
- Full horizontal navigation
- Dropdown menus (hover + click)
- Sticky on scroll (optional)
- Logo + nav + CTA in one row
```

```css
/* Mobile menu */
.mobile-menu {
  position: fixed;
  inset: 0;
  background: var(--color-neutral-0);
  z-index: var(--z-modal);
  transform: translateX(100%);
  transition: transform var(--duration-normal) var(--ease-default);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-menu.is-open {
  transform: translateX(0);
}

/* Lock body scroll when menu open */
body.menu-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}
```

### 7. Reduced Motion

```css
/* === REDUCED MOTION === */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Replace motion with opacity changes */
  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
  }
  
  /* Keep essential feedback */
  .btn:focus-visible {
    transition: outline-offset 0.01ms;
  }
}

/* JavaScript check */
// const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

### 8. Safe Areas (Notch, Home Indicator)

```css
/* === SAFE AREAS === */
/* For devices with notches, home indicators, rounded corners */

.site-header {
  padding-top: env(safe-area-inset-top, 0);
  padding-left: env(safe-area-inset-left, 0);
  padding-right: env(safe-area-inset-right, 0);
}

.site-footer {
  padding-bottom: env(safe-area-inset-bottom, 0);
}

/* Viewport meta for safe areas */
/* <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"> */

/* Fixed bottom elements */
.fixed-bottom-bar {
  padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom, 0));
}
```

### 9. Testing Matrix

```markdown
## Responsive Testing Checklist

### Viewport Sizes to Test
| Width | Context | Priority |
|-------|---------|----------|
| 320px | Small mobile (iPhone SE) | P0 |
| 375px | Standard mobile (iPhone) | P0 |
| 414px | Large mobile (iPhone Plus) | P0 |
| 768px | Tablet portrait (iPad) | P0 |
| 1024px | Tablet landscape / small laptop | P0 |
| 1280px | Standard desktop | P0 |
| 1440px | Large desktop | P1 |
| 1920px | Full HD | P1 |
| 2560px | Ultra-wide | P2 |

### Test Points per Viewport
- [ ] Layout integrity (no horizontal scroll)
- [ ] Text readability (font size, line length)
- [ ] Image scaling and cropping
- [ ] Navigation usability
- [ ] Touch target sizes (mobile/tablet)
- [ ] Form usability
- [ ] CTA visibility above fold
- [ ] Spacing consistency
- [ ] Modal/dialog behavior
- [ ] Table/data responsiveness

### Orientation
- [ ] Portrait → Landscape transition smooth
- [ ] Content doesn't break on rotation
- [ ] Fixed elements reposition correctly

### Special Cases
- [ ] Zoomed to 200% (WCAG requirement)
- [ ] Text-only zoom (browser setting)
- [ ] High contrast mode
- [ ] Dark mode (if supported)
- [ ] Print stylesheet
```

## Output bắt buộc

### `docs/responsive-strategy.md`
- Breakpoint rationale
- Navigation pattern per breakpoint
- Testing matrix results

### CSS implementing responsive patterns

## Acceptance Criteria

- [ ] Website works từ 320px đến 2560px+ width
- [ ] No horizontal overflow at any viewport
- [ ] Touch targets ≥ 44x44px on touch devices
- [ ] Navigation has mobile strategy
- [ ] Reduced motion support
- [ ] Safe area support
- [ ] Images responsive với srcset/sizes hoặc picture
- [ ] Typography fluid với clamp()
- [ ] Testing checklist completed

## Anti-patterns cần tránh

❌ Device-specific breakpoints (iPhone 14: 393px)
❌ Desktop-first (max-width media queries)
❌ Hiding content on mobile instead of reorganizing
❌ Fixed pixel widths on content containers
❌ Touch targets < 44px
❌ No focus styles visible
❌ Ignoring prefers-reduced-motion
❌ Testing chỉ ở exact breakpoints, bỏ qua giữa breakpoints
❌ Horizontal scroll at any viewport width
