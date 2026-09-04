# Minimalism Remediation Contract — 2026-09-04

## Classification
- Scope: system/site
- Type: remediation
- Risk: medium
- Mode: production-candidate
- Browser/device verification: Chromium desktop 1280/1440/1920; mobile/tablet N/A_JUSTIFIED per project scope.

## Current user directive — highest priority
The current user request supersedes conflicting visual details in the earlier luxury-minimal Design Contract for this remediation:
- project thumbnail frames are currently too large and must be reduced;
- heading typography must be sans-serif;
- body/content typography must use Inter;
- primary page background must be white;
- primary button color must be `#111111`;
- highlight/accent color must be `#111111`;
- overall direction: strict minimalism.

## Conflict resolution
Earlier source-of-truth specified warm ivory, editorial serif display and bronze/umber accent. Those details conflict directly with the current user directive. Per project source-of-truth order, the current request wins. Preserve unaffected behavior/content/URLs/system reality.

## Reference synthesis
Web references are used only as MOOD_REFERENCE / craft guidance, not UX/conversion proof:
- Framer Define: black-and-white, strict grid, typography-led portfolio.
- Framer Monohaus: restrained black-and-white palette, sharp typography, generous whitespace.
- Framer Mara Lindqvist: clean sans typography, pure black/pure white, no gradients/shadows.

Transferable principles: monochrome chrome, controlled image scale, strict spacing/grid, typography hierarchy, minimal decorative effects. Do not copy reference layouts.

## Implementation owners
- `styles.css`: home/global tokens, type, project-index media sizing, CTA/contact chrome.
- `case-study.css`: shared case-study tokens/type/action chrome.
- HTML font imports: Inter only for the portfolio UI.
- Project-native image colors remain evidence content; portfolio chrome/highlights remain `#111111`.

## Preserve
- Home proof-first order and current content.
- Public routes/canonicals/sitemap.
- Existing navigation, theme behavior, CV/mailto/external handoffs.
- Project images/assets and case content.
- Focus-visible/reduced-motion behavior.
- Static architecture; no new JS dependency/framework.

## Verification gate
- Home rendered and directly inspected at 1280/1440/1920.
- Work-section screenshot directly inspected at 1440 to confirm thumbnail scale.
- Representative case routes inspected at 1440 for typography/color regression.
- No horizontal overflow/crop/clipping regression.
- Body computed font is Inter; heading computed font is sans-serif/Inter.
- Default page background is white; primary button and accent resolve to `#111111`.
- P0/P1/material-P2 = 0 before release handoff.
