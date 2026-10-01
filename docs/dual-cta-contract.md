# Portfolio project CTA hierarchy contract

The recruiter-facing order is intentionally consistent across the portfolio:

**Homepage card:** `Read case → Live prototype → View Figma → Source`

**Inside a case study:** `Live prototype → View Figma → Source`

The filename is retained for compatibility with older documentation, but the old two-CTA contract is retired.

## Rules

- `Read case` is the only primary CTA on a homepage project card.
- Live, Figma and Source share one outlined secondary tier.
- Figma appears before Source because this is a Product Designer portfolio.
- Missing public artifacts are omitted rather than linked to placeholders or fabricated destinations.
- On narrow mobile widths, `Read case` becomes full width; secondary artifact actions wrap below it.
- Repository-first systems may omit Live and/or Figma when those artifacts do not exist publicly.
- A case-study page does not repeat `Read case`; it exposes working artifacts in the same inspection order after the narrative is already open.

## Public-evidence boundary

LUMEN and HUẾ do not currently have published Figma links, so no Figma CTA is generated for those projects. UIUX Factory is repository-first and likewise does not invent a Figma or live-product destination.

## QA contract

`qa/all-project-cta-hierarchy.spec.mjs` protects:

- every current supporting homepage project card being normalized;
- exact artifact ordering;
- one primary case CTA per card;
- no dead `aria-disabled` artifact buttons;
- mobile wrapping/no horizontal overflow;
- matching artifact order inside every case route reachable from the supporting library.
