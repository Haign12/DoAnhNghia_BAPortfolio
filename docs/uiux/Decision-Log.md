# Decision Log

## D-001 — Safe branch vs repository auto-push
- Conflict: repo `.agents/AGENTS.md` says auto commit/push after edits; current user brief says `release_authorization: no_release`.
- Evidence: repository instruction + current brief.
- Decision: edits may be committed/pushed only to `redesign/luxury-minimalism-20260903`; no merge, release or deploy.
- Impact: preserves repository workflow without violating release authority.

## D-002 — Missing official brand guideline
- Conflict: user requests luxury minimalism; no official brand book was supplied/found.
- Decision: classify brand status as C and create `PROPOSED BRAND GUIDELINE — LOGO-DERIVED / PROJECT-ASSET-DERIVED` with all new colors/type marked proposed.
- Impact: avoids fabricating official brand rules.

## D-003 — Current English content vs required Vietnamese
- Conflict: current HTML uses English visible content and `lang="en"`; current brief requires `languages: [vi]`.
- Decision: current user requirement wins. Visible portfolio interface/content will be Vietnamese; project/product names and URLs remain unchanged.
- Impact: metadata/lang attributes must be updated intentionally during implementation.

## D-004 — Desktop-only scope vs existing mobile CSS
- Conflict: current site contains responsive rules; redesign scope is explicitly desktop-only.
- Decision: preserve existing small-screen safety where practical but design/verify only 1280, 1440 and 1920 Chromium.
- Impact: tablet/mobile are `N/A_JUSTIFIED`; no “fully responsive” claim.

## D-005 — Current site already uses minimal monochrome style
- Conflict: a surface-only “luxury minimal” refresh could look too similar to the existing design and fail the redesign recognizability gate.
- Decision: redesign hierarchy/composition/journey: Work moves before About, page-role tops diversify, project-native color returns, decorative grid/orbits/marquee are reduced, and the pill-heavy shape language is replaced.
- Impact: before/after should be materially recognizable even with colors hidden.

## D-006 — Local legacy skills vs locked external V5
- Conflict: repository contains a local `.agents/skills` collection, while project instructions require latest `Ngh1aa/skills_UIUX` main locked at project start.
- Decision: use locked commit `e74849fd23ddb2fa062bb0e1e1101c84b6cfc1c0` as process authority for this redesign. Do not overwrite unrelated local agent skills in this scope.
- Impact: avoids toolchain churn and honors version-lock requirement.

## D-007 — Rendered baseline availability
- Evidence: current live URL could not be fetched/rendered by the available web page fetch; source code is accessible.
- Decision: Phase 00 visual findings based on source are labeled `EVIDENCE_BACKED_INFERENCE`. Final visual QA cannot be replaced by source review.
- Impact: implementation may proceed from a PASS Design Contract, but release/visual-finish status remains blocked until rendered desktop screenshots are actually inspected.
