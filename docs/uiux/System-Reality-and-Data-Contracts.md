# System Reality and Data Contracts

Project mode: `production_candidate`  
Architecture: static HTML/CSS/JS.

| Capability | Reality | Verified contract |
|---|---|---|
| Portfolio/case content | STATIC | repository HTML; no CMS/runtime data dependency |
| In-page navigation | REAL client-side | native anchors + DOM behavior |
| Theme switch | REAL client-side | DOM/localStorage preference only; not account data |
| Reveal/scroll progress | REAL client-side | optional progressive enhancement; reduced-motion/content access preserved |
| Email contact | REAL external handoff | `mailto:` opens user agent; site cannot know delivery success |
| CV | STATIC asset + REAL navigation handoff | `Do_Anh_Nghia_CV.pdf` preserved |
| External project links | REAL external navigation handoff | destination content/uptime not controlled by portfolio |
| Local case-study routes | STATIC | six local portfolio HTML routes |
| Contact form | N/A | none; no fake success state |
| Search/filter | N/A | none |
| Authentication/account | N/A | none |
| CMS/backend/API/payment/upload | N/A | none detected/introduced |
| Analytics | UNKNOWN | no integration found in inspected source; no outcome claim depends on it |

## Privacy/security boundary
No owned form, auth, payment, upload, personal-data collection or analytics integration was introduced. Public email is intentional contact information. Theme preference is non-sensitive local state. Adding analytics/contact backend later requires a new privacy/data-contract review.

## Phase 2 verification
- STATIC/REAL labels remain truthful after redesign.
- No UI success state claims a backend action.
- External personal-project websites are handoffs, not portfolio integrations and not Phase 2 redesign targets.
- System Reality blocker count: 0.

This is not a claim that external destinations are permanently available, nor a formal security assessment of third-party sites.
