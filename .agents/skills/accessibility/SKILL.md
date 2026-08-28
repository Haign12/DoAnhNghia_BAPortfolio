---
name: accessibility
description: |
  Hướng dẫn AI agent implement accessibility (WCAG 2.2 Level AA) xuyên suốt 
  quá trình phát triển: semantic HTML, keyboard navigation, forms, color contrast,
  screen reader, focus management, ARIA patterns và testing.
globs:
  - "**/*.html"
  - "**/*.css"
  - "**/*.js"
---

# Accessibility (A11y)

## Mục đích

Accessibility không phải afterthought — nó là phần core của implementation. Website phải usable bởi MỌI người, bao gồm người dùng screen reader, keyboard-only, low vision, cognitive disabilities và motor impairments.

## Target: WCAG 2.2 Level AA

## Quy trình: Build A11y IN, không bolt ON

### 1. Semantic Structure

```html
<!-- ✅ CORRECT: Semantic landmarks -->
<header role="banner">
  <nav aria-label="Primary">...</nav>
</header>
<main id="main-content">
  <section aria-labelledby="section-title">
    <h2 id="section-title">Section Title</h2>
  </section>
</main>
<aside aria-label="Sidebar">...</aside>
<footer role="contentinfo">...</footer>

<!-- ❌ WRONG: Div soup -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">
  <div class="section">
    <div class="title">Section Title</div>
  </div>
</div>
```

### 2. Keyboard Navigation

```markdown
## Keyboard Interaction Patterns

### Global
| Key | Action |
|-----|--------|
| Tab | Move to next focusable element |
| Shift+Tab | Move to previous focusable element |
| Enter | Activate link/button |
| Space | Activate button, toggle checkbox |
| Escape | Close modal/dropdown/popover |

### Navigation
| Key | Action |
|-----|--------|
| Tab | Move between nav items |
| Enter | Follow link / open dropdown |
| Escape | Close dropdown |
| Arrow keys | Navigate within dropdown |

### Modal/Dialog
| Key | Action |
|-----|--------|
| Tab | Cycle through modal elements (trapped) |
| Escape | Close modal, return focus to trigger |
| Enter | Confirm default action |

### Accordion/Tabs
| Key | Action |
|-----|--------|
| Arrow Up/Down | Move between accordion headers |
| Arrow Left/Right | Move between tab headers |
| Enter/Space | Expand/collapse panel or activate tab |
| Home | Focus first item |
| End | Focus last item |
```

#### Focus Management Rules

```css
/* Focus styles — ALWAYS visible */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Remove default only when custom focus is applied */
:focus:not(:focus-visible) {
  outline: none;
}

/* Skip never using outline: none without alternative */

/* Focus within for containers */
.card:focus-within {
  box-shadow: 0 0 0 2px var(--color-primary-500);
}
```

```javascript
// Focus trap for modals
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });

  firstFocusable.focus();
}

// Return focus on close
function openModal(trigger, modal) {
  modal.showModal();
  trapFocus(modal);
  
  modal.addEventListener('close', () => {
    trigger.focus(); // Return focus
  }, { once: true });
}
```

### 3. Forms Accessibility

```html
<!-- ✅ ACCESSIBLE FORM -->
<form novalidate>
  <!-- Input with label -->
  <div class="form-field">
    <label for="name">Họ và tên <span aria-hidden="true">*</span></label>
    <input 
      type="text" 
      id="name" 
      name="name"
      required
      autocomplete="name"
      aria-required="true"
      aria-describedby="name-help name-error"
    >
    <p id="name-help" class="form-field__help">Nhập đầy đủ họ và tên</p>
    <p id="name-error" class="form-field__error" role="alert" hidden>
      Vui lòng nhập họ và tên
    </p>
  </div>

  <!-- Select -->
  <div class="form-field">
    <label for="service">Dịch vụ quan tâm</label>
    <select id="service" name="service">
      <option value="">Chọn dịch vụ</option>
      <option value="design">Thiết kế</option>
      <option value="dev">Phát triển</option>
    </select>
  </div>

  <!-- Checkbox group -->
  <fieldset>
    <legend>Phương thức liên hệ ưa thích</legend>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" name="contact" value="email"> Email
      </label>
      <label>
        <input type="checkbox" name="contact" value="phone"> Điện thoại
      </label>
    </div>
  </fieldset>

  <!-- Submit -->
  <button type="submit">Gửi yêu cầu</button>
</form>
```

#### Form Validation

```javascript
// Accessible form validation
function validateField(field) {
  const errorEl = document.getElementById(`${field.id}-error`);
  
  if (!field.validity.valid) {
    field.setAttribute('aria-invalid', 'true');
    errorEl.textContent = getErrorMessage(field);
    errorEl.hidden = false;
  } else {
    field.removeAttribute('aria-invalid');
    errorEl.hidden = true;
  }
}

function getErrorMessage(field) {
  if (field.validity.valueMissing) return `Vui lòng nhập ${field.labels[0].textContent}`;
  if (field.validity.typeMismatch) return `Định dạng không hợp lệ`;
  if (field.validity.tooShort) return `Tối thiểu ${field.minLength} ký tự`;
  return 'Giá trị không hợp lệ';
}
```

### 4. Color & Contrast

```markdown
## Contrast Requirements (WCAG 2.2 AA)

| Element | Minimum Ratio | How to Check |
|---------|---------------|-------------|
| Normal text (< 18px / 14px bold) | 4.5:1 | WebAIM Contrast Checker |
| Large text (≥ 18px / 14px bold) | 3:1 | WebAIM Contrast Checker |
| UI components (borders, icons) | 3:1 | Against background |
| Focus indicators | 3:1 | Against adjacent colors |
| Graphical objects | 3:1 | Charts, icons, controls |

## Color Rules
1. NEVER use color as the ONLY means of conveying information
2. Error fields: red + icon + text message
3. Status indicators: color + icon + label
4. Links: color + underline (or other non-color indicator)
5. Charts: color + pattern + label

## Testing
- Check contrast with browser DevTools (Accessibility tab)
- Test with color blindness simulators
- Test in Windows High Contrast Mode
- Verify with reduced transparency
```

### 5. Images & Media

```html
<!-- Informative image: describe content -->
<img src="team.jpg" alt="Đội ngũ 5 người tại văn phòng, cùng thảo luận dự án trên whiteboard">

<!-- Decorative image: empty alt -->
<img src="pattern.svg" alt="" role="presentation">

<!-- Icon with meaning -->
<button aria-label="Mở menu">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>

<!-- Icon purely decorative -->
<a href="/contact">
  <svg aria-hidden="true" focusable="false">...</svg>
  Liên hệ
</a>

<!-- Complex image: use figcaption + aria-describedby -->
<figure>
  <img src="chart.png" alt="Biểu đồ tăng trưởng" aria-describedby="chart-desc">
  <figcaption id="chart-desc">
    Doanh thu tăng 150% từ Q1 đến Q4 2024, từ 100M lên 250M VND.
  </figcaption>
</figure>

<!-- Video -->
<video controls>
  <source src="demo.mp4" type="video/mp4">
  <track kind="captions" src="captions-vi.vtt" srclang="vi" label="Tiếng Việt" default>
  <track kind="descriptions" src="descriptions-vi.vtt" srclang="vi" label="Audio descriptions">
  Trình duyệt không hỗ trợ video. <a href="demo.mp4">Tải video</a>.
</video>
```

### 6. ARIA Patterns (Use Sparingly)

```markdown
## ARIA Rules
1. **No ARIA is better than bad ARIA**
2. Use native HTML elements first (button > div[role="button"])
3. All interactive ARIA elements must be keyboard accessible
4. Don't change native semantics unless necessary
```

```html
<!-- Tab Pattern -->
<div role="tablist" aria-label="Project information">
  <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">
    Overview
  </button>
  <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">
    Details
  </button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  <!-- Content -->
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  <!-- Content -->
</div>

<!-- Live Region for dynamic content -->
<div aria-live="polite" aria-atomic="true" class="sr-only" id="status-message">
  <!-- JS updates this for screen reader announcements -->
</div>

<!-- Loading state -->
<div aria-busy="true" aria-live="polite">
  <span class="spinner" aria-label="Đang tải..."></span>
</div>
```

### 7. Screen Reader Only Text

```css
/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Allow focus for skip links */
.sr-only.focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### 8. Accessibility Testing Checklist

```markdown
## A11y Testing Checklist

### Automated (catches ~30% of issues)
- [ ] Run axe DevTools in browser
- [ ] Run Lighthouse accessibility audit
- [ ] HTML validator for structural issues
- [ ] Color contrast checker

### Keyboard Testing (catches ~20% more)
- [ ] Tab through entire page — logical order?
- [ ] All interactive elements focusable?
- [ ] Focus visible at all times?
- [ ] Can open AND close all modals/dropdowns?
- [ ] No keyboard traps?
- [ ] Skip link works?
- [ ] Focus returns after modal close?

### Screen Reader Testing (catches ~20% more)
- [ ] Page title announces correctly
- [ ] Landmarks navigable (header, nav, main, footer)
- [ ] Headings hierarchy makes sense
- [ ] Images described (or hidden if decorative)
- [ ] Form labels associated correctly
- [ ] Error messages announced
- [ ] Dynamic content changes announced

### Visual Testing
- [ ] 200% zoom — no horizontal scroll, content usable
- [ ] 400% zoom — content still accessible
- [ ] High contrast mode — content visible
- [ ] Forced colors mode — UI still functional
- [ ] Font size increase — no broken layouts

### Content
- [ ] Language attribute set on html element
- [ ] Link text descriptive (no "click here")
- [ ] Page titles unique and descriptive
- [ ] Error messages helpful and specific
```

## Acceptance Criteria

- [ ] Semantic landmarks present (header, nav, main, footer)
- [ ] Heading hierarchy correct (one h1, no skips)
- [ ] All interactive elements keyboard accessible
- [ ] Focus visible on all focusable elements
- [ ] Skip link functional
- [ ] Form fields have associated labels
- [ ] Form errors have aria-invalid and role="alert"
- [ ] Images have appropriate alt text
- [ ] Color contrast meets WCAG AA (4.5:1 / 3:1)
- [ ] ARIA used correctly and sparingly
- [ ] Reduced motion respected
- [ ] Page works at 200% zoom
- [ ] axe DevTools shows 0 critical/serious issues

## Anti-patterns cần tránh

❌ `outline: none` without visible alternative
❌ `tabindex` > 0 (disrupts natural tab order)
❌ `role="button"` on `<div>` instead of `<button>`
❌ Missing form labels (placeholder is NOT a label)
❌ Auto-playing media without controls
❌ `aria-label` on non-interactive elements
❌ Color as only indicator (error = red only)
❌ `display: none` to "hide" screen-reader-only text
❌ Keyboard traps in modals without Escape handler
❌ Alt text saying "image" or "photo of" (redundant)
