---
name: code-review-and-release
description: |
  Hướng dẫn AI agent thực hiện code review, quality gate, release checklist,
  deployment process, rollback plan và post-release monitoring cho website.
globs:
  - "docs/release-checklist.md"
  - "**/*.html"
  - "**/*.css"
  - "**/*.js"
---

# Code Review & Release

## Mục đích

Đảm bảo code đạt chất lượng production trước khi deploy. Skill này cung cấp framework cho self-review (khi agent review chính code của mình) và release process.

## Quy trình bắt buộc

### 1. Code Review Checklist

#### HTML Review

```markdown
| Check | Status | Notes |
|-------|--------|-------|
| HTML validates (W3C) | ⬜ | |
| Semantic elements used correctly | ⬜ | |
| One H1 per page | ⬜ | |
| Heading hierarchy no skips | ⬜ | |
| All images have alt text | ⬜ | |
| All links have href and descriptive text | ⬜ | |
| Forms have labels + validation | ⬜ | |
| Meta tags complete (title, description, OG) | ⬜ | |
| Schema.org markup present | ⬜ | |
| Skip link present | ⬜ | |
| Language attribute set | ⬜ | |
| No inline styles (except critical CSS) | ⬜ | |
| No deprecated elements | ⬜ | |
```

#### CSS Review

```markdown
| Check | Status | Notes |
|-------|--------|-------|
| Uses design tokens (no hardcoded values) | ⬜ | |
| BEM or consistent naming convention | ⬜ | |
| Mobile-first media queries | ⬜ | |
| No !important (except utilities) | ⬜ | |
| No duplicate declarations | ⬜ | |
| Reduced motion support | ⬜ | |
| Focus styles present | ⬜ | |
| No unused CSS rules | ⬜ | |
| Custom properties well-organized | ⬜ | |
| Reasonable specificity (no over-nesting) | ⬜ | |
| Print styles (if needed) | ⬜ | |
```

#### JavaScript Review

```markdown
| Check | Status | Notes |
|-------|--------|-------|
| No console.log in production | ⬜ | |
| No debugger statements | ⬜ | |
| Event listeners properly managed | ⬜ | |
| No memory leaks (removed listeners, observers) | ⬜ | |
| Error handling present | ⬜ | |
| No eval() or innerHTML with user input | ⬜ | |
| Accessibility: keyboard support, ARIA updates | ⬜ | |
| Performance: debounce/throttle where needed | ⬜ | |
| No global variable pollution | ⬜ | |
| Modern syntax (const/let, arrow functions) | ⬜ | |
```

### 2. Quality Gates

```markdown
## Quality Gate: Must Pass Before Release

### Gate 1: Code Quality
- [ ] HTML validates (0 errors)
- [ ] CSS valid (0 errors)
- [ ] JS no console errors
- [ ] Naming conventions consistent

### Gate 2: Functionality
- [ ] All pages load correctly
- [ ] All navigation works
- [ ] All forms submit and validate
- [ ] All interactive elements respond
- [ ] Back button works throughout

### Gate 3: Responsiveness
- [ ] Works on 320px viewport (no horizontal scroll)
- [ ] Works on 768px viewport
- [ ] Works on 1280px viewport
- [ ] Works on 1440px+ viewport

### Gate 4: Accessibility
- [ ] axe DevTools: 0 critical/serious issues
- [ ] Keyboard navigation: complete
- [ ] Focus visibility: always present
- [ ] Color contrast: WCAG AA

### Gate 5: Performance
- [ ] Lighthouse Performance ≥ 90 (mobile)
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO ≥ 95
- [ ] Total page weight < 1.5MB

### Gate 6: SEO
- [ ] Unique title/description per page
- [ ] Schema.org validates
- [ ] sitemap.xml accurate
- [ ] robots.txt correct
- [ ] No broken links

### Gate 7: Security
- [ ] No secrets in code
- [ ] External links have rel="noopener"
- [ ] Input validation present
- [ ] Security headers configured (or documented)
```

### 3. Release Checklist

```markdown
## Pre-Release Checklist

### Content Freeze
- [ ] All content finalized and reviewed
- [ ] No placeholder text remaining
- [ ] Images finalized and optimized
- [ ] Contact information verified
- [ ] Legal pages reviewed (Privacy, Terms)
- [ ] Copyright year correct

### Technical Verification
- [ ] All quality gates passed
- [ ] Testing checklist completed with evidence
- [ ] Git repository clean (no uncommitted changes)
- [ ] Git branch strategy clear (main = production)
- [ ] Build succeeds (if applicable)
- [ ] Environment variables configured

### Assets & Files
- [ ] Favicon set (all sizes)
- [ ] OG images created (1200x630)
- [ ] Apple touch icon
- [ ] manifest.json (if PWA)
- [ ] robots.txt finalized
- [ ] sitemap.xml generated
- [ ] .htaccess / server config (redirects, headers)

### Third-Party Services
- [ ] Analytics configured (GA, Plausible, etc.)
- [ ] Form submission service configured
- [ ] Domain DNS configured
- [ ] SSL certificate installed
- [ ] CDN configured (if applicable)
- [ ] Error monitoring (Sentry, etc. — if applicable)

### Documentation
- [ ] README.md updated
- [ ] Deployment instructions documented
- [ ] Known issues documented
- [ ] Design documentation in docs/ folder
```

### 4. Deployment Process

```markdown
## Deployment Steps

### 1. Final Verification
```bash
# Verify git status
git status

# Run any build steps
# npm run build (if applicable)

# Verify build output
# Check dist/ or build/ folder
```

### 2. Deploy
```bash
# Option A: Git push to production branch
git checkout main
git merge develop
git push origin main

# Option B: Static hosting (Netlify, Vercel, GitHub Pages)
# Push to main branch triggers auto-deploy

# Option C: Manual upload
# Upload files to hosting via FTP/SFTP
```

### 3. Post-Deploy Verification
- [ ] Site loads on production URL
- [ ] HTTPS working
- [ ] All pages accessible
- [ ] Forms submit correctly
- [ ] Analytics tracking
- [ ] No console errors
- [ ] Performance acceptable
- [ ] OG images show on social share test
```

### 5. Rollback Plan

```markdown
## Rollback Procedure

### If critical issue found after deploy:

1. **Revert to previous version**
```bash
# Git revert
git revert HEAD
git push origin main

# Or reset to known good state
git reset --hard [last-good-commit]
git push --force origin main
```

2. **Notify stakeholders**
   - What happened
   - What was affected
   - Timeline for fix

3. **Diagnose and fix**
   - Create fix branch
   - Test thoroughly
   - Deploy fix
   - Verify fix in production
```

### 6. Post-Release

```markdown
## Post-Release Monitoring (First 24-48 hours)

### Check
- [ ] No 500 errors in server logs
- [ ] No spike in 404s
- [ ] Forms receiving submissions
- [ ] Analytics tracking correctly
- [ ] Core Web Vitals stable (CrUX after 28 days)
- [ ] Search Console: no new errors
- [ ] User feedback (if any)

### Performance Baseline
| Metric | Value at Launch | Target |
|--------|----------------|--------|
| LCP | [Measure] | ≤ 2.5s |
| INP | [Measure] | ≤ 200ms |
| CLS | [Measure] | ≤ 0.1 |
| Lighthouse Perf | [Score] | ≥ 90 |

### Known Issues
| Issue | Severity | Workaround | Fix Timeline |
|-------|----------|------------|-------------|
| [Issue] | [Low/Med/High] | [Workaround] | [Date] |

### Next Steps
1. [Improvement 1]
2. [Improvement 2]
3. [Monitoring task]
```

## Output bắt buộc

### `docs/release-checklist.md`
- Code review results
- Quality gate results
- Pre-release checklist (completed)
- Deployment record
- Post-release monitoring plan
- Known issues

## Acceptance Criteria

- [ ] Code review checklist completed
- [ ] All 7 quality gates passed
- [ ] Release checklist completed
- [ ] Deployment process documented
- [ ] Rollback plan documented
- [ ] Post-release monitoring plan
- [ ] Known issues documented with severity

## Anti-patterns cần tránh

❌ "Done" without evidence (screenshots, scores, test results)
❌ Skipping quality gates because "it works on my machine"
❌ No rollback plan
❌ Deploying on Friday afternoon
❌ No documentation of what was deployed
❌ Ignoring known issues without documenting them
❌ No post-deploy verification
