# Production Smoke Evidence

## Status
**BLOCKED — NOT RUN**

Production smoke is mandatory only after an authorized production-changing action. No such action is currently authorized.

## Production URL
`https://haign12.github.io/DoAnhNghia_BAPortfolio/`

## Pre-release baseline already known
Prior evidence showed production/main still on the OLD baseline before release. That evidence must not be reused as proof of a successful new deployment.

## Required post-deploy smoke when authorized
1. Confirm production source/version corresponds to the released commit/merge result.
2. Open Home in Chromium at 1280×1080, 1440×1080 and 1920×1080.
3. Render/inspect representative supporting routes at 1440.
4. Verify Work navigation, CV and `mailto:` contact handoff.
5. Verify theme and reduced-motion behavior.
6. Verify nav is exposed to accessibility tree and focus-visible remains usable.
7. Verify stylesheet/font/image/media resources load without 404/mixed-content/network failure.
8. Capture console severe errors and critical network failures.
9. Verify `robots.txt` and `sitemap.xml`, including VAS sitemap entry.
10. Compare production pixels to the Final-QA candidate evidence; any material mismatch = FAIL.

## Pass condition
Production smoke can become DONE_VERIFIED only when an authorized deploy/update has occurred and all applicable checks above have been rendered/inspected on the real production URL.

No production-verified claim is made at this time.
