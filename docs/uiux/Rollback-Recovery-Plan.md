# Rollback & Recovery Plan

## Release candidate
`aef6a7c7299e607058fb6e84aaa86062553194f1`

## Current production baseline
`main@2c7c6ee7cbe82be98c42257854ca28a725e7ba8b`

## Preferred rollback order
1. If GitHub Pages exposes a previous immutable deployment/redeploy option, prefer restoring the previous known-good deployment.
2. Otherwise use a safe Git revert of the release merge/commit on `main`, preserving history.
3. Only use a forward fix when rollback would create a larger production risk.

## Prohibited default rollback
- no `git reset --hard` on shared/default branch;
- no force push as the normal rollback path;
- no deleting history to hide a failed release.

## Data/migration considerations
N/A_JUSTIFIED: the site is static HTML/CSS/JS and this candidate introduces no database/schema/data migration, backend API, auth state, payment state or CMS migration.

## Recovery smoke after rollback/revert
At Chromium 1280/1440/1920:
- production Home loads;
- navigation/CV/contact remain reachable;
- no missing stylesheet/font/image asset;
- no obvious overflow/crop regression;
- local case-study routes required by the portfolio still return 200;
- robots/sitemap remain available;
- browser console has no new severe errors.

## Trigger to rollback/revert
Rollback/revert is appropriate if authorized production verification finds any of:
- wrong commit/version deployed;
- broken Home or critical navigation/contact/CV path;
- missing critical CSS/media/assets;
- P0/P1 visual or accessibility regression;
- widespread 404/network failure introduced by release.

A deployment job being green is not sufficient reason to keep a visibly broken production release.
