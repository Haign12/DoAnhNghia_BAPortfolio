# Production Smoke Evidence

## Status
**DONE_VERIFIED**

## Production URL
`https://haign12.github.io/DoAnhNghia_BAPortfolio/`

## Released identity
- `main`: `aef6a7c7299e607058fb6e84aaa86062553194f1`
- GitHub Pages deploy run: `33837927222` — success
- Production smoke run: `33838057673` — success
- Artifact: `9923950707` / `phase4-production-smoke`
- Digest: `sha256:0f95d439ced33da7c88a8e430dd8d8a51f6574b8bbbef436424601084aefa0ae`

## Version identity
Production returned the expected NEW markers immediately during smoke:
- `<html lang="vi">`;
- redesigned Vietnamese Home heading;
- VAS entry present in production sitemap.

`main` itself resolves to the exact Final-QA commit, so release source identity is preserved.

## Rendered production evidence inspected
### Home
- 1280×1080 — inspected, no material overflow/crop/hierarchy regression.
- 1440×1080 — inspected, no material overflow/crop/hierarchy regression.
- 1920×1080 — inspected, no material overflow/crop/hierarchy regression.

The proof-first editorial Home, portrait, CTA group and beginning of Selected Work remain visually stable across the declared desktop matrix.

### Supporting routes at 1440×1080
Opened/inspected:
- LuxRoom
- Atelier
- StudioOS
- VAS Education
- FlowCRM

No material shared-shell break, unexpected clipping or legacy layout regression was observed.

## Runtime smoke
Selenium result on production:
- `lang = vi`
- desktop nav `aria-hidden = false`
- `mailto` present
- CV links present
- theme transition `light->dark`
- keyboard Tab activates an anchor
- reduced-motion media query = true
- captured severe console errors = 0

## Route / asset smoke
HTTP 200 verified for:
- Home
- five local case-study routes
- CV PDF
- `robots.txt`
- `sitemap.xml`
- `styles.css`
- `script.js`
- `assets/images/avatar.webp`

## SEO / system reality
- VAS is present in production sitemap.
- No URL migration was introduced.
- Site remains STATIC; email/external links remain REAL browser handoffs.
- No form/API/auth/payment/analytics integration was added or falsely claimed.

## Accessibility / performance boundary
This smoke verifies runtime semantics/signals relevant to release, but does not claim formal WCAG conformance. No field CWV claim is made.

## Result
P0 = 0; P1 = 0; material P2 = 0.

**PRODUCTION SMOKE = PASSED**
