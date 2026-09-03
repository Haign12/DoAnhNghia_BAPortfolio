# PROPOSED BRAND GUIDELINE — LOGO-DERIVED / PROJECT-ASSET-DERIVED

> This is **not** an official brand book. It is a proposed digital direction for the portfolio, derived from first-party repository assets/current implementation plus the user-requested luxury-minimal direction.

## 1. Brand source status

**C — LOGO AVAILABLE, NO BRAND GUIDELINE**

Verified project assets:

- `assets/images/logo.png` — project-owned logo/favicon asset; visual geometry/color not treated as fully audited evidence in this phase.
- Text brand in current navigation: `Do Anh Nghia.`
- `assets/images/avatar.webp` — portrait.
- Project preview/social images for LuxRoom, Atelier, StudioOS, Capital Place and FlowCRM.
- Current digital palette is monochrome in source CSS.

## 2. Evidence ledger

| Brand dimension | Finding | Source | Status | Confidence | Digital implication |
|---|---|---|---|---|---|
| Brand name | `Do Anh Nghia` | Current source/meta | VERIFIED_FROM_OFFICIAL_ASSET | High | Preserve spelling in canonical identity |
| Current visual tone | Monochrome, editorial serif accent, sans/mono UI | Current CSS | VERIFIED_FROM_OFFICIAL_ASSET | High | Existing minimalism is equity, but surface alone is not distinctive enough |
| Luxury minimal direction | Requested by user | Current brief | OFFICIAL REQUIREMENT | High | Translate through restraint/composition rather than gold/glass clichés |
| Official logo geometry | Not visually audited in available rendered environment | Logo file exists | UNKNOWN | Low | Do not derive shape system from unverified geometry |
| Official palette | Not supplied | — | UNKNOWN | — | Proposed digital palette below is not official |
| Official typeface | Not supplied | — | UNKNOWN | — | Use Vietnamese-safe digital type proposal |
| Voice/personality | No brand strategy supplied | — | UNKNOWN | — | Copy tone limited to project evidence + professional restraint |

## 3. Proposed digital color roles

All colors below are `PROPOSED_FOR_DIGITAL`, not official brand colors.

| Role | Token | Value | Use | Do not use |
|---|---|---|---|---|
| Canvas | `--bg` | `#F5F1E8` | Main warm-ivory page field | Large pure-white blocks that break the quiet-luxury field without purpose |
| Elevated surface | `--surface` | `#FBF8F2` | Media captions, subtle alternate fields | Card-everything UI |
| Ink | `--text` | `#151412` | Headings, body, primary CTA | Soft gray for critical copy |
| Muted ink | `--muted` | `#6F6A61` | Secondary copy/meta; contrast ~4.76:1 on canvas | Smaller/lighter than allowed readable metadata |
| Rule | `--line` | `#D8D0C3` | Hairlines, index rails, separators | Thick decorative borders |
| Bronze datum | `--accent-soft` | `#C6A978` | Small fills, selected markers, large decorative type/rules | Body/link text on ivory |
| Accessible bronze | `--accent` | `#7A5E3B` | Links/focus/interactive accent; contrast ~5.34:1 on canvas | Recoloring every heading/CTA |
| Inverse | `--inverse-bg` / `--inverse-text` | `#151412` / `#F5F1E8` | Footer, selected project field, occasional editorial pause | Alternating every section dark/light |

### CTA rule
Primary action remains **ink-on-ivory / ivory-on-ink**, not gold-filled. Bronze is a datum/highlight, not the main conversion color.

## 4. Typography proposal

Status: `PROPOSED_FOR_DIGITAL`.

- Display/editorial: **Noto Serif Display** (or another verified Vietnamese-supporting high-contrast serif if implementation inspection reveals better fit).
- Body/UI: **DM Sans** — already used in project and supports a neutral contemporary tone.
- Metadata: **DM Mono**, used sparingly for indices/project facts only.

Hierarchy intent:

- Display/H1: 96–156px on desktop depending on viewport/page role; serif italic may be used for one short phrase, not whole paragraphs.
- H2: 56–88px, primarily sans or mixed editorial depending on composition.
- H3/project title: 34–56px.
- Body lead: 20–28px, max line length ~55–65ch.
- Body: 16–18px, 1.55–1.75 line-height.
- Meta: 11–13px mono/sans, high enough contrast.

Vietnamese rule: no font is accepted if diacritics visibly fall back or spacing becomes inconsistent in rendered review.

## 5. Wordmark / logo usage

- Header may continue to use the text brand `Do Anh Nghia` as the primary readable identity.
- Do not apply CSS `filter`/`invert` to the logo asset without visual verification.
- Favicon/logo file may remain for metadata unless an inspected asset problem is discovered.
- Do not invent monograms or new symbols in this redesign.

## 6. Shape / layout language

- Primary shape language: straight editorial edges + hairline rules + generous whitespace.
- Corner radius default: 0–8px depending on media need.
- One compact oval/pill may be retained for availability/status only.
- Do not use `999px` radius for navigation, every button and every label.

## 7. Imagery

- Portfolio chrome stays warm-neutral; **project media keeps native color** unless a specific crop/art-direction reason requires treatment.
- Portrait should feel editorial: one strong crop, no orbit rings/grid overlay.
- Project images are evidence objects, not decorative backgrounds.
- Avoid stock imagery and generated “luxury” textures unless the user explicitly supplies/approves them.

## 8. Motion

- Purpose: orientation and emphasis.
- Default duration: 160–420ms.
- Allowed: subtle line expansion, opacity/y translate reveal, project image scale 1.00→1.015 on hover, index marker movement.
- Disallowed: scroll hijacking, continuous marquee as core navigation, cursor gimmicks, heavy parallax, long page transitions.
- Respect `prefers-reduced-motion`.

## 9. Brand signature

**Signature statement:** if the logo is removed, the portfolio should still feel identifiable through **warm ivory + near-black editorial typography + numbered hairline project rails + native-color project media + one restrained bronze datum**.

## 10. Do / Don’t

### Do
- Let proof/project imagery occupy visual priority.
- Use large typography with precise line breaks.
- Use whitespace as rhythm, not emptiness.
- Keep bronze rare enough to remain meaningful.
- Keep factual/limitation language calm and visible.

### Don’t
- Add glossy gold, glassmorphism, 3D metallic gradients or luxury clichés.
- Turn every section into a bordered/rounded card.
- Blanket-desaturate project work.
- Infer personality/mission/values from the logo file.
- Call this proposed direction “official brand guidelines”.
