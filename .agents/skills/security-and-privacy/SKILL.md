---
name: security-and-privacy
description: |
  Hướng dẫn AI agent implement security best practices cho website: 
  security headers, CSP, input validation, XSS prevention, CSRF protection,
  secrets management, privacy-by-design và GDPR/data protection basics.
globs:
  - "**/*.html"
  - "**/*.js"
  - ".env*"
  - "docs/security-checklist.md"
---

# Security & Privacy

## Mục đích

Security không phải optional — nó là baseline requirement. Skill này covers những gì agent cần implement cho website, đặc biệt khi có forms, user data hoặc API integrations.

## Security Checklist

### 1. HTTPS

```markdown
- [ ] HTTPS enforced everywhere (HTTP → HTTPS redirect)
- [ ] Valid SSL certificate
- [ ] Mixed content eliminated (no HTTP resources on HTTPS pages)
- [ ] HSTS header set
```

### 2. Security Headers

```markdown
## Recommended Security Headers

| Header | Value | Purpose |
|--------|-------|---------|
| Strict-Transport-Security | max-age=31536000; includeSubDomains | Force HTTPS |
| X-Content-Type-Options | nosniff | Prevent MIME sniffing |
| X-Frame-Options | DENY hoặc SAMEORIGIN | Prevent clickjacking |
| X-XSS-Protection | 0 | Disable legacy XSS filter (use CSP) |
| Referrer-Policy | strict-origin-when-cross-origin | Control referrer info |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Restrict APIs |
| Content-Security-Policy | [See below] | Prevent XSS, injection |
```

#### Content Security Policy (CSP)

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' https://cdn.example.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.example.com;
  frame-src 'none';
  base-uri 'self';
  form-action 'self' https://formsubmit.example.com;
  frame-ancestors 'none';
```

```html
<!-- CSP via meta tag (limited but works for static sites) -->
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; img-src 'self' data: https:; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
  font-src 'self' https://fonts.gstatic.com;">
```

### 3. Input Validation & XSS Prevention

```javascript
// NEVER trust user input

// 1. Sanitize HTML content
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

// 2. Validate email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 3. Validate phone
function isValidPhone(phone) {
  return /^[\d\s\-\+\(\)]{10,15}$/.test(phone);
}

// 4. Sanitize before inserting into DOM
// ❌ WRONG
element.innerHTML = userInput;

// ✅ CORRECT
element.textContent = userInput;

// ✅ CORRECT (when HTML needed)
element.innerHTML = DOMPurify.sanitize(userInput);

// 5. URL validation
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

### 4. Form Security

```html
<!-- Anti-spam honeypot -->
<div aria-hidden="true" style="position: absolute; left: -5000px;">
  <input type="text" name="honeypot" tabindex="-1" autocomplete="off">
</div>

<!-- Rate limiting indicator -->
<!-- Server-side: limit form submissions per IP -->
```

```javascript
// Client-side protections (supplement server-side, never replace)

// 1. Disable submit button after click
form.addEventListener('submit', (e) => {
  const btn = form.querySelector('[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Đang gửi...';
});

// 2. CSRF token (if server supports)
// Include token in form or header

// 3. Validate before submit
function validateForm(form) {
  let isValid = true;
  
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      showError(field, 'Field is required');
      isValid = false;
    }
  });
  
  const email = form.querySelector('[type="email"]');
  if (email && !isValidEmail(email.value)) {
    showError(email, 'Invalid email');
    isValid = false;
  }
  
  // Check honeypot
  const honeypot = form.querySelector('[name="honeypot"]');
  if (honeypot && honeypot.value) {
    return false; // Bot detected
  }
  
  return isValid;
}
```

### 5. External Links & Resources

```html
<!-- External links: always use rel="noopener noreferrer" -->
<a href="https://external-site.com" 
   target="_blank" 
   rel="noopener noreferrer">
  External Site
  <span class="sr-only">(opens in new tab)</span>
</a>

<!-- Subresource Integrity for CDN resources -->
<script 
  src="https://cdn.example.com/lib.min.js" 
  integrity="sha384-xxxxx" 
  crossorigin="anonymous">
</script>

<link 
  rel="stylesheet" 
  href="https://cdn.example.com/style.css"
  integrity="sha384-xxxxx"
  crossorigin="anonymous">
```

### 6. Secrets Management

```markdown
## Rules
1. NEVER commit secrets to git
2. NEVER expose API keys in client-side JavaScript
3. Use .env files for local development
4. Add .env to .gitignore
5. Use environment variables for deployment

## .gitignore (security-related)
```
.env
.env.local
.env.production
*.pem
*.key
```

## Check for Exposed Secrets
- [ ] No API keys in JavaScript source
- [ ] No passwords in HTML comments
- [ ] No database URLs in client code
- [ ] .env files not in git history
- [ ] Source maps not deployed to production
```

### 7. Privacy by Design

```markdown
## Data Minimization
- Only collect data that is necessary
- Don't ask for phone if email is sufficient
- Don't require full address for digital services
- Explain WHY each field is needed

## Cookie & Tracking
- [ ] Cookie consent banner (if required by law)
- [ ] No tracking before consent
- [ ] Clear privacy policy
- [ ] User can opt out
- [ ] Third-party cookies disclosed

## Form Data Privacy
| Field | Necessary? | Stored? | Encrypted? | Retention |
|-------|-----------|---------|------------|-----------|
| Name | Yes | [Where] | [Yes/No] | [Duration] |
| Email | Yes | [Where] | [Yes/No] | [Duration] |
| Phone | [Optional] | [Where] | [Yes/No] | [Duration] |
| Message | Yes | [Where] | [Yes/No] | [Duration] |

## Privacy UX
- Near forms: "Thông tin được bảo mật theo [Privacy Policy]"
- Newsletter: "Không spam. Hủy đăng ký bất cứ lúc nào."
- Data use: "Chúng tôi chỉ dùng email để phản hồi yêu cầu của bạn."
```

### 8. Third-Party Security

```markdown
## Third-Party Audit

| Service | Purpose | Data shared | Risk | Alternative |
|---------|---------|------------|------|-------------|
| Google Fonts | Typography | IP address | Low | Self-host |
| Google Analytics | Tracking | Usage data | Medium | Plausible, Umami |
| Form service | Form handling | User data | Medium | Self-hosted |
| CDN | Asset delivery | IP address | Low | — |

## Rules
1. Minimize third-party dependencies
2. Self-host when possible (fonts, icons)
3. Use SRI for CDN resources
4. Review third-party privacy policies
5. Consider privacy-friendly alternatives
```

## Output bắt buộc

### `docs/security-checklist.md`
- Security headers configuration
- Input validation rules
- Secrets management policy
- Privacy considerations
- Third-party audit

## Acceptance Criteria

- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] CSP defined (at least via meta tag)
- [ ] All user inputs validated
- [ ] No innerHTML with unsanitized input
- [ ] External links have rel="noopener noreferrer"
- [ ] No secrets in client-side code
- [ ] .env in .gitignore
- [ ] Privacy policy page present (if collecting data)
- [ ] Cookie consent implemented (if required)
- [ ] Third-party dependencies audited

## Anti-patterns cần tránh

❌ innerHTML with user input (XSS vulnerability)
❌ API keys in client-side JavaScript
❌ No HTTPS
❌ Missing security headers
❌ Trusting client-side validation alone (server-side required)
❌ Storing sensitive data in localStorage
❌ No cookie consent when collecting data in EU
❌ Using eval() with any input
