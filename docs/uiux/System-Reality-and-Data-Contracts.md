# System Reality and Data/API/CMS Contracts

Project mode: production_candidate
Architecture: static HTML/CSS/JS.

## Capability matrix

| Capability | UI exists | Data/service | Reality | Evidence | Risk if misreported |
|---|---|---|---|---|---|
| Static portfolio content | yes | repository HTML | STATIC | source | low |
| In-page anchor navigation | yes | browser DOM | REAL client-side by source | HTML anchors | low |
| Theme switch | yes | DOM + localStorage | REAL client-side by source; rendered interaction unverified | `script.js` | low |
| Reveal/scroll progress | yes | IntersectionObserver/scroll | REAL client-side by source; rendered interaction unverified | `script.js` | low |
| Mobile menu logic | source exists | DOM | REAL client-side by source, out of declared scope | `script.js` | N/A for Phase 1 desktop |
| Email contact | yes | `mailto:` user-agent handoff | REAL external handoff | `index.html` | medium if falsely called message delivery |
| Resume | yes | static PDF | STATIC asset + REAL browser navigation when link resolves | repository/source | low |
| Live project links | yes | external websites | REAL external navigation intent; destination uptime/content can change | `index.html` | low |
| Case-study pages | yes | static HTML | STATIC | source | low |
| Contact form | no | none found | N/A | source | false-success risk if invented later |
| Search/filter | no | none found | N/A | source | low |
| Authentication/account | no | none found | N/A | source | low |
| CMS | no | none found | N/A | source | low |
| Backend/API | no | none found | N/A | source | low |
| Analytics | no integration found | UNKNOWN external/runtime | UNKNOWN | source only | medium for outcome claims |

## Truthful interaction contracts

### Email

Current contract:
```text
trigger: mailto link
input: none owned by site
network/backend: none owned by site
success knowledge: unavailable to website
error knowledge: unavailable to website
```

Therefore:
- site may say “Gửi email / Liên hệ qua email”;
- site must not display “Đã gửi thành công”;
- no input-reset or fake toast should be added without a real service.

### Theme

Current contract:
- value stored locally in browser storage;
- affects visual theme only;
- contains no personal/business data;
- should not block first render/content access if storage fails.

### External project / CV navigation

- action can verify that a link is correctly formed/opened in browser testing;
- it cannot guarantee external destination uptime forever;
- external link status should not be represented as a backend integration.

## Data model

No runtime API/CMS data model is needed for the current site.

Static content fields should nevertheless be treated consistently in implementation:

```text
Project
- name
- type/status
- platform
- role/contribution
- short_problem_or_value
- preview_asset
- case_url optional
- live_url optional
- source_url optional
- evidence_status
```

This is a proposed static content contract, not a CMS schema.

## Production gaps

| Gap | Current reality | Required for production-candidate confidence | Owner/dependency | Severity |
|---|---|---|---|---|
| Analytics/outcome evidence absent | UNKNOWN | only needed if claiming conversion/UX improvement | future analytics decision | P2 |
| Rendered interaction verification absent in Phase 1 | source-only | browser verify theme/nav/focus in later QA | Chromium tooling | P1 for release, not design contract |
| Contact is external handoff | REAL external | acceptable if UI is truthful | none | P3 |

## Privacy/security boundaries

- No form/auth/payment/upload/personal-data collection found.
- Email address is intentionally public contact information.
- Local theme preference is non-sensitive.
- If analytics or a real contact service is later added, privacy/consent and data-contract review must be re-opened; do not silently expand scope.

## System reality gate

Phase 1 system reality: DONE_VERIFIED at source level. No fake production feature is specified. Rendered behavior verification remains in the later verification matrix and does not change STATIC/REAL labels above.