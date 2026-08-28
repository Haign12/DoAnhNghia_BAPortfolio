---
name: testing-strategy
description: |
  Hướng dẫn AI agent viết và chạy tests: manual testing checklist, 
  cross-browser testing, visual QA, accessibility testing, performance testing,
  form testing và regression testing cho static website.
globs:
  - "docs/test-plan.md"
  - "**/*.html"
---

# Testing Strategy

## Mục đích

Không tuyên bố website hoàn tất nếu chưa có evidence từ testing. Skill này cung cấp testing framework cho website HTML/CSS/JS (không cần test framework phức tạp).

## Quy trình bắt buộc

### 1. Test Plan

```markdown
## Test Plan: [Project Name]

### Scope
- Pages to test: [List all pages]
- Browsers: [Chrome, Firefox, Safari, Edge]
- Devices: [Mobile 375px, Tablet 768px, Desktop 1280px, Wide 1440px+]
- Priority: P0 = Must pass, P1 = Should pass, P2 = Nice to have
```

### 2. Functional Testing Checklist

```markdown
## Per-Page Functional Tests

### Navigation
| Test | Expected | Status | Notes |
|------|----------|--------|-------|
| Logo links to homepage | Homepage loads | ⬜ | |
| All nav links work | Correct pages load | ⬜ | |
| Active state shows current page | Highlighted | ⬜ | |
| Mobile menu opens/closes | Smooth animation | ⬜ | |
| Mobile menu links work | Navigate correctly | ⬜ | |
| Footer links work | Correct pages | ⬜ | |
| External links open in new tab | rel="noopener" | ⬜ | |
| Skip link works | Focus to main content | ⬜ | |

### Forms
| Test | Expected | Status | Notes |
|------|----------|--------|-------|
| Required fields validated | Error shown on empty | ⬜ | |
| Email validation | Invalid format caught | ⬜ | |
| Phone validation | Format checked | ⬜ | |
| Error messages clear | Specific, actionable | ⬜ | |
| Success message shown | After valid submit | ⬜ | |
| Form resets after success | Fields cleared | ⬜ | |
| Labels linked to inputs | Click label focuses input | ⬜ | |
| Autocomplete attributes set | Browser autofill works | ⬜ | |
| Tab order logical | Left-to-right, top-to-bottom | ⬜ | |

### Interactive Elements
| Test | Expected | Status | Notes |
|------|----------|--------|-------|
| Buttons clickable | Action triggers | ⬜ | |
| Hover effects smooth | Transition, no flicker | ⬜ | |
| Scroll animations fire | Elements animate in | ⬜ | |
| Reduced motion respected | No animation when set | ⬜ | |
| Back button works | Previous page loads | ⬜ | |
| Smooth scroll to anchors | Scrolls to section | ⬜ | |

### Content
| Test | Expected | Status | Notes |
|------|----------|--------|-------|
| No Lorem ipsum | Real content everywhere | ⬜ | |
| No broken images | All images load | ⬜ | |
| No typos/grammar issues | Proofread | ⬜ | |
| Dates/numbers accurate | Verified | ⬜ | |
| Links to external sites work | Not 404 | ⬜ | |
```

### 3. Cross-Browser Testing

```markdown
## Browser Compatibility Matrix

| Feature | Chrome | Firefox | Safari | Edge | Notes |
|---------|--------|---------|--------|------|-------|
| Layout | ⬜ | ⬜ | ⬜ | ⬜ | Grid, Flexbox |
| Typography | ⬜ | ⬜ | ⬜ | ⬜ | Fonts, clamp() |
| Animations | ⬜ | ⬜ | ⬜ | ⬜ | Transitions |
| Forms | ⬜ | ⬜ | ⬜ | ⬜ | Validation UI |
| Images | ⬜ | ⬜ | ⬜ | ⬜ | WebP support |
| Scroll | ⬜ | ⬜ | ⬜ | ⬜ | Smooth scroll |
| CSS Variables | ⬜ | ⬜ | ⬜ | ⬜ | Custom properties |
| Backdrop filter | ⬜ | ⬜ | ⬜ | ⬜ | Glassmorphism |

### Known Browser Issues to Check
- Safari: backdrop-filter may need -webkit prefix
- Firefox: form validation UI differs
- Safari: smooth scrolling behavior
- Safari iOS: position: fixed in scroll contexts
- Safari: date input formatting
```

### 4. Responsive Testing

```markdown
## Responsive Test Points

### Per Viewport
| Viewport | Layout | Typography | Images | Nav | Forms | CTA | Status |
|----------|--------|------------|--------|-----|-------|-----|--------|
| 320px | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | |
| 375px | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | |
| 414px | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | |
| 768px | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | |
| 1024px | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | |
| 1280px | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | |
| 1440px | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | |

### Responsive Checks
- [ ] No horizontal scrollbar at any width
- [ ] Text readable without pinch zoom
- [ ] Images scale proportionally
- [ ] Cards stack on mobile, grid on desktop
- [ ] Navigation switches to mobile menu
- [ ] CTAs visible above fold on all sizes
- [ ] Tables scroll horizontally or reorganize
- [ ] Modals fit viewport
```

### 5. Accessibility Testing

```markdown
## Accessibility Test Checklist

### Automated
- [ ] Run axe DevTools → 0 critical/serious issues
- [ ] Lighthouse Accessibility ≥ 95
- [ ] HTML W3C Validator → 0 errors
- [ ] Color contrast checker → all pass WCAG AA

### Keyboard
- [ ] Tab through entire page
- [ ] Focus order logical
- [ ] Focus indicator always visible
- [ ] All interactive elements reachable
- [ ] Modals trap and return focus
- [ ] Skip link functional
- [ ] No keyboard traps
- [ ] Escape closes modals/dropdowns

### Screen Reader (NVDA/VoiceOver)
- [ ] Page title announced
- [ ] Landmarks navigable
- [ ] Headings hierarchy logical
- [ ] Image alt text descriptive
- [ ] Form labels read correctly
- [ ] Errors announced
- [ ] Dynamic content announced

### Visual
- [ ] 200% zoom → no broken layout
- [ ] High contrast mode → content visible
- [ ] Color not sole indicator
- [ ] Animation respectful (reduced motion)
```

### 6. Performance Testing

```markdown
## Performance Test Checklist

### Lighthouse (Desktop + Mobile)
| Category | Target | Actual Desktop | Actual Mobile | Status |
|----------|--------|---------------|---------------|--------|
| Performance | ≥ 90 | ⬜ | ⬜ | |
| Accessibility | ≥ 95 | ⬜ | ⬜ | |
| Best Practices | ≥ 90 | ⬜ | ⬜ | |
| SEO | ≥ 95 | ⬜ | ⬜ | |

### Core Web Vitals
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| LCP | ≤ 2.5s | ⬜ | |
| INP | ≤ 200ms | ⬜ | |
| CLS | ≤ 0.1 | ⬜ | |
| TTFB | ≤ 600ms | ⬜ | |

### Resource Budget
| Resource | Budget | Actual | Status |
|----------|--------|--------|--------|
| HTML | < 50KB | ⬜ | |
| CSS | < 100KB | ⬜ | |
| JS | < 150KB | ⬜ | |
| Images | < 500KB | ⬜ | |
| Fonts | < 200KB | ⬜ | |
| Total | < 1.5MB | ⬜ | |
```

### 7. SEO Testing

```markdown
## SEO Audit Checklist

### Per Page
| Check | Status | Notes |
|-------|--------|-------|
| Title tag unique, ≤ 60 chars | ⬜ | |
| Meta description unique, ≤ 160 chars | ⬜ | |
| One H1 per page | ⬜ | |
| Heading hierarchy correct | ⬜ | |
| Canonical URL set | ⬜ | |
| Open Graph tags present | ⬜ | |
| Schema.org markup valid | ⬜ | |
| Images have alt text | ⬜ | |
| Internal links present (≥2) | ⬜ | |

### Site-wide
| Check | Status | Notes |
|-------|--------|-------|
| robots.txt correct | ⬜ | |
| sitemap.xml includes all pages | ⬜ | |
| No broken links (404s) | ⬜ | |
| HTTPS everywhere | ⬜ | |
| Mobile-friendly test passes | ⬜ | |
| No duplicate content | ⬜ | |
| Structured data validates | ⬜ | |
```

### 8. Visual QA

```markdown
## Visual QA Checklist

### Design Consistency
| Check | Status | Notes |
|-------|--------|-------|
| Colors match brand guidelines | ⬜ | |
| Typography matches type scale | ⬜ | |
| Spacing uses design tokens | ⬜ | |
| Border radius consistent | ⬜ | |
| Shadow levels consistent | ⬜ | |
| Icon style consistent | ⬜ | |
| Image treatment consistent | ⬜ | |

### Visual Details
| Check | Status | Notes |
|-------|--------|-------|
| No orphaned headings (heading alone at column bottom) | ⬜ | |
| No widows/orphans in text | ⬜ | |
| Image aspect ratios consistent | ⬜ | |
| Alignment grid respected | ⬜ | |
| Hover states on all interactive elements | ⬜ | |
| Loading states present | ⬜ | |
| Empty states designed | ⬜ | |
| Error states designed | ⬜ | |
| Favicon present | ⬜ | |
| OG image correct when shared | ⬜ | |
```

### 9. Pre-Launch Checklist

```markdown
## Pre-Launch Checklist

### Content
- [ ] All placeholder content replaced
- [ ] Contact information accurate
- [ ] Legal pages present (Privacy, Terms)
- [ ] Copyright year current
- [ ] Social media links correct

### Technical
- [ ] HTTPS configured
- [ ] Redirects set up (www → non-www or vice versa)
- [ ] 404 page customized
- [ ] Analytics installed
- [ ] Console clean (no errors/warnings)
- [ ] Source maps removed from production
- [ ] Environment variables not exposed

### SEO
- [ ] robots.txt allows crawling
- [ ] Sitemap submitted to Google Search Console
- [ ] Canonical URLs correct
- [ ] OG images generate correctly on share

### Performance
- [ ] Lighthouse scores meet targets
- [ ] Images optimized and lazy loaded
- [ ] CSS/JS minified
- [ ] Gzip/Brotli enabled
- [ ] Cache headers set

### Accessibility
- [ ] axe audit clean
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast passes

### Backup & Recovery
- [ ] Source code in version control
- [ ] Deployment process documented
- [ ] Rollback procedure defined
```

## Output bắt buộc

### `docs/test-plan.md`
Tổng hợp tất cả test checklists ở trên với results filled in.

## Acceptance Criteria

- [ ] All P0 functional tests pass
- [ ] Cross-browser testing on Chrome + Firefox + Safari
- [ ] Responsive testing on 320px, 768px, 1280px minimum
- [ ] Accessibility: axe clean + keyboard navigable
- [ ] Lighthouse scores ≥ 90 all categories
- [ ] No broken links
- [ ] No console errors
- [ ] Visual QA completed
- [ ] Pre-launch checklist completed

## Anti-patterns cần tránh

❌ "Looks good on my machine" = tested
❌ Only testing happy path, ignoring edge cases
❌ Skipping mobile testing
❌ Testing only at exact breakpoints
❌ No evidence of testing (screenshots, reports)
❌ Testing accessibility only with automated tools
❌ Not testing with actual content (only Lorem ipsum)
