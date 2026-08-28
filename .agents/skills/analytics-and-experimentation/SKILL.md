---
name: analytics-and-experimentation
description: |
  Hướng dẫn AI agent setup analytics: event taxonomy, consent management,
  funnel tracking, activation metrics, retention signals, experiment guardrails
  và tracking plan documentation.
globs:
  - "docs/tracking-plan.md"
  - "**/*.js"
  - "**/*.html"
---

# Analytics & Experimentation

## Mục đích

Analytics biến assumptions thành data. Skill này đảm bảo tracking được setup đúng từ đầu, respects privacy, và cung cấp actionable insights thay vì vanity metrics.

## Prerequisites

- `product-discovery` hoàn tất (có KPIs)
- Website deployed hoặc sắp deploy

## Quy trình bắt buộc

### 1. Analytics Strategy

```markdown
## Analytics Philosophy
- Track để LEARN, không phải để có dashboards
- Mỗi event phải trả lời được một câu hỏi cụ thể
- Privacy-first: chỉ track những gì cần thiết
- Consent trước tracking (nếu luật yêu cầu)
```

### 2. Event Taxonomy

```markdown
## Naming Convention
Format: [object]_[action]
Examples: page_view, cta_click, form_submit, nav_click

## Event Catalog

### Page Events
| Event Name | Trigger | Properties | Question It Answers |
|-----------|---------|------------|---------------------|
| page_view | Page load | page_title, page_path, referrer | Which pages get traffic? |
| page_scroll_depth | 25%, 50%, 75%, 100% | depth_percent, page_path | How far do users read? |
| page_time_spent | Page unload | seconds_on_page, page_path | How engaged are users? |

### Navigation Events
| Event Name | Trigger | Properties | Question |
|-----------|---------|------------|----------|
| nav_click | Nav item clicked | nav_item, nav_type (primary/footer/mobile) | How do users navigate? |
| cta_click | CTA button clicked | cta_text, cta_location, cta_type (primary/secondary) | Which CTAs convert? |
| external_link_click | External link clicked | link_url, link_text, page_path | Where do users go? |

### Engagement Events
| Event Name | Trigger | Properties | Question |
|-----------|---------|------------|----------|
| project_view | Case study opened | project_name, project_category | Which work interests users? |
| resume_download | CV/Resume downloaded | file_name, page_path | How many download CV? |
| social_click | Social media link clicked | platform, location (header/footer/bio) | Which socials get clicks? |

### Form Events
| Event Name | Trigger | Properties | Question |
|-----------|---------|------------|----------|
| form_start | First field focused | form_name, page_path | How many start filling? |
| form_field_error | Validation error | field_name, error_type | Where do users struggle? |
| form_submit | Form submitted | form_name, success (bool) | Conversion rate? |
| form_abandon | Page left with partial form | form_name, last_field_filled | Where do users quit? |

### Error Events
| Event Name | Trigger | Properties | Question |
|-----------|---------|------------|----------|
| error_404 | 404 page loaded | attempted_url, referrer | What links are broken? |
| error_js | JS error caught | error_message, page_path | Technical issues? |
```

### 3. Funnel Definition

```markdown
## Primary Funnel: [Goal Name]

| Step | Event | Target Rate | Notes |
|------|-------|-------------|-------|
| 1. Visit | page_view (homepage) | 100% (baseline) | |
| 2. Explore | nav_click OR project_view | > 60% | Engaged visitors |
| 3. Interest | cta_click (contact/hire) | > 10% | Interested in services |
| 4. Convert | form_submit (success) | > 3% | Actual conversion |

## Drop-off Analysis
- Step 1→2 drop: Content not compelling OR slow load
- Step 2→3 drop: No clear CTA OR trust deficit
- Step 3→4 drop: Form too long OR technical error
```

### 4. Consent Management

```html
<!-- Simple Cookie Consent -->
<div id="cookie-consent" class="cookie-banner" role="dialog" aria-label="Cookie consent" hidden>
  <div class="cookie-banner__content">
    <p>Chúng tôi sử dụng cookies để cải thiện trải nghiệm. 
       <a href="/privacy">Tìm hiểu thêm</a></p>
    <div class="cookie-banner__actions">
      <button id="cookie-accept" class="btn btn--primary">Chấp nhận</button>
      <button id="cookie-decline" class="btn btn--ghost">Từ chối</button>
    </div>
  </div>
</div>
```

```javascript
// Consent-based analytics loading
const CONSENT_KEY = 'analytics_consent';

function hasConsent() {
  return localStorage.getItem(CONSENT_KEY) === 'true';
}

function setConsent(value) {
  localStorage.setItem(CONSENT_KEY, value.toString());
  if (value) {
    loadAnalytics();
  }
}

function loadAnalytics() {
  if (!hasConsent()) return;
  
  // Load analytics script dynamically
  const script = document.createElement('script');
  script.src = 'https://analytics-provider.com/script.js';
  script.async = true;
  document.head.appendChild(script);
}

// Check on page load
if (hasConsent()) {
  loadAnalytics();
} else if (localStorage.getItem(CONSENT_KEY) === null) {
  // Show consent banner (first visit)
  document.getElementById('cookie-consent').hidden = false;
}

document.getElementById('cookie-accept')?.addEventListener('click', () => {
  setConsent(true);
  document.getElementById('cookie-consent').hidden = true;
});

document.getElementById('cookie-decline')?.addEventListener('click', () => {
  setConsent(false);
  document.getElementById('cookie-consent').hidden = true;
});
```

### 5. Privacy-Friendly Analytics Alternatives

```markdown
## Options

| Tool | Privacy | Cost | Features | Self-hosted? |
|------|---------|------|----------|-------------|
| Google Analytics 4 | Medium | Free | Full-featured | No |
| Plausible | High | $9/mo | Simple, lightweight | Yes |
| Umami | High | Free (self-host) | Simple, open-source | Yes |
| Fathom | High | $14/mo | Privacy-first | No |
| Simple Analytics | High | $19/mo | Very simple | No |

## Recommendation
- Portfolio/marketing site: Plausible or Umami (lightweight, privacy-friendly)
- SaaS/complex: GA4 with consent management
- Privacy-critical: Umami self-hosted
```

### 6. Implementation (GA4 Example)

```html
<!-- Google Analytics 4 (load after consent) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure'
  });
</script>
```

```javascript
// Custom event tracking
function trackEvent(eventName, properties = {}) {
  if (!hasConsent()) return;
  
  // GA4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }
  
  // Console log in development
  if (window.location.hostname === 'localhost') {
    console.log(`[Analytics] ${eventName}`, properties);
  }
}

// Track CTA clicks
document.addEventListener('click', (e) => {
  const cta = e.target.closest('[data-track-cta]');
  if (cta) {
    trackEvent('cta_click', {
      cta_text: cta.textContent.trim(),
      cta_location: cta.dataset.trackCta,
      page_path: window.location.pathname
    });
  }
});

// Track scroll depth
let maxScroll = 0;
const scrollThresholds = [25, 50, 75, 100];
window.addEventListener('scroll', throttle(() => {
  const scrollPercent = Math.round(
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  );
  
  scrollThresholds.forEach(threshold => {
    if (scrollPercent >= threshold && maxScroll < threshold) {
      trackEvent('page_scroll_depth', {
        depth_percent: threshold,
        page_path: window.location.pathname
      });
    }
  });
  
  maxScroll = Math.max(maxScroll, scrollPercent);
}, 250));
```

### 7. Tracking Plan Documentation

```markdown
## Tracking Plan

### Implementation Status
| Event | Implemented | Tested | Production |
|-------|-----------|--------|------------|
| page_view | ✅ | ✅ | ✅ |
| cta_click | ✅ | ✅ | ✅ |
| form_submit | ✅ | ✅ | ✅ |
| page_scroll_depth | ✅ | ⬜ | ⬜ |
| nav_click | ⬜ | ⬜ | ⬜ |

### Dashboard Metrics
| Metric | Source Events | Update Frequency |
|--------|-------------|------------------|
| Unique visitors | page_view | Daily |
| Bounce rate | page_view (single page sessions) | Daily |
| Top pages | page_view by page_path | Daily |
| CTA performance | cta_click by cta_text | Weekly |
| Form conversion | form_submit / page_view (contact) | Weekly |
| Engagement | scroll_depth > 50% | Weekly |
```

## Output bắt buộc

### `docs/tracking-plan.md`
- Event taxonomy
- Funnel definitions
- Consent strategy
- Implementation status
- Dashboard metric definitions

## Acceptance Criteria

- [ ] Event taxonomy documented
- [ ] Consent management implemented (if required)
- [ ] Core events tracked: page_view, cta_click, form_submit
- [ ] No tracking before consent
- [ ] Events fire correctly (verified in console/debug mode)
- [ ] Funnel defined with target rates
- [ ] Privacy policy mentions analytics

## Anti-patterns cần tránh

❌ Tracking everything "just in case"
❌ No consent management when required by law
❌ Analytics script blocking page render
❌ Tracking PII (names, emails) without necessity
❌ No naming convention → messy data
❌ Setting up analytics but never checking data
❌ Vanity metrics (total page views) without actionable context
