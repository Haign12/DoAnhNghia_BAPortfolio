---
name: design-system-and-components
description: |
  Hướng dẫn AI agent xây dựng design system hoàn chỉnh: design tokens, component 
  inventory, variants, states, responsive behavior, accessibility contracts, 
  composition rules và documentation.
globs:
  - "**/*.css"
  - "**/tokens.*"
  - "**/components/**"
  - "docs/design-system.md"
---

# Design System & Components

## Mục đích

Chuyển visual direction thành hệ thống design tokens và components có thể tái sử dụng, maintain và scale. Design system đảm bảo consistency xuyên suốt website và giảm technical debt.

## Prerequisites

- `brand-guidelines` hoàn tất (có tokens cơ bản)
- `visual-design-direction` hoàn tất (có visual direction)

## Quy trình bắt buộc

### 1. Design Tokens

Tokens là single source of truth cho mọi visual value. KHÔNG hardcode values trong components.

```css
/* === DESIGN TOKENS === */
:root {
  /* ─── Colors ─── */
  /* Primary */
  --color-primary-50: hsl(H, S%, 97%);
  --color-primary-100: hsl(H, S%, 93%);
  --color-primary-200: hsl(H, S%, 85%);
  --color-primary-300: hsl(H, S%, 72%);
  --color-primary-400: hsl(H, S%, 60%);
  --color-primary-500: hsl(H, S%, 50%);  /* Main */
  --color-primary-600: hsl(H, S%, 42%);
  --color-primary-700: hsl(H, S%, 35%);
  --color-primary-800: hsl(H, S%, 28%);
  --color-primary-900: hsl(H, S%, 20%);

  /* Neutral */
  --color-neutral-0: #ffffff;
  --color-neutral-50: hsl(H, S%, 98%);
  --color-neutral-100: hsl(H, S%, 96%);
  --color-neutral-200: hsl(H, S%, 90%);
  --color-neutral-300: hsl(H, S%, 83%);
  --color-neutral-400: hsl(H, S%, 64%);
  --color-neutral-500: hsl(H, S%, 46%);
  --color-neutral-600: hsl(H, S%, 33%);
  --color-neutral-700: hsl(H, S%, 25%);
  --color-neutral-800: hsl(H, S%, 15%);
  --color-neutral-900: hsl(H, S%, 9%);

  /* Semantic */
  --color-success: hsl(142, 71%, 45%);
  --color-warning: hsl(38, 92%, 50%);
  --color-error: hsl(0, 84%, 60%);
  --color-info: hsl(217, 91%, 60%);

  /* ─── Typography ─── */
  --font-heading: 'Font Name', system-ui, sans-serif;
  --font-body: 'Font Name', system-ui, sans-serif;
  --font-mono: 'Font Name', ui-monospace, monospace;

  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 2rem;        /* 32px */
  --text-4xl: 2.5rem;      /* 40px */
  --text-5xl: 3.5rem;      /* 56px */

  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;

  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;

  /* ─── Spacing ─── */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* ─── Border Radius ─── */
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* ─── Shadows ─── */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  /* ─── Transitions ─── */
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);

  /* ─── Layout ─── */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1440px;

  /* ─── Z-Index ─── */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-toast: 1080;
}

/* Dark mode tokens override */
@media (prefers-color-scheme: dark) {
  :root {
    /* Override specific tokens for dark mode */
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-instant: 0ms;
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
  }
}
```

### 2. Component Inventory

Liệt kê tất cả components cần build:

```markdown
## Component Inventory

### Foundation
| Component | Variants | Priority |
|-----------|----------|----------|
| Container | sm, md, lg, xl, 2xl, full | P0 |
| Grid | 2-col, 3-col, 4-col, auto-fit | P0 |
| Section | default, alternate, dark, accent | P0 |
| Divider | horizontal, vertical | P1 |

### Typography
| Component | Variants | Priority |
|-----------|----------|----------|
| Heading | h1-h6, display | P0 |
| Paragraph | default, lead, small | P0 |
| List | ordered, unordered, inline | P0 |
| Blockquote | default, testimonial | P1 |

### Navigation
| Component | Variants | Priority |
|-----------|----------|----------|
| Navbar | default, transparent, sticky | P0 |
| NavLink | default, active, CTA | P0 |
| MobileMenu | slide, overlay | P0 |
| Breadcrumb | default | P1 |
| Footer | default | P0 |

### Actions
| Component | Variants | Priority |
|-----------|----------|----------|
| Button | primary, secondary, ghost, text, icon | P0 |
| Link | default, external, nav | P0 |
| IconButton | default, small, large | P1 |

### Content
| Component | Variants | Priority |
|-----------|----------|----------|
| Card | default, horizontal, image-top, overlay | P0 |
| Badge | default, success, warning, error, info | P1 |
| Tag | default, removable | P1 |
| Avatar | image, initials, sizes | P1 |
| Testimonial | default, card | P1 |

### Forms
| Component | Variants | Priority |
|-----------|----------|----------|
| Input | text, email, tel, search | P0 |
| Textarea | default, auto-resize | P0 |
| Select | default, searchable | P1 |
| Checkbox | default | P1 |
| Radio | default | P1 |
| FormField | with label, error, help text | P0 |

### Feedback
| Component | Variants | Priority |
|-----------|----------|----------|
| Alert | success, warning, error, info | P1 |
| Toast | default, with action | P2 |
| Progress | bar, circular | P2 |
| Skeleton | text, card, image, table | P0 |
| Spinner | default, inline | P1 |

### Layout
| Component | Variants | Priority |
|-----------|----------|----------|
| Hero | full, split, minimal | P0 |
| Modal | default, confirmation, form | P1 |
| Accordion | default, single | P1 |
| Tabs | default, pill | P1 |
```

### 3. Component Specification Template

Mỗi component phải document đầy đủ:

```markdown
## Component: [Name]

### Purpose
[Mô tả ngắn component dùng cho gì]

### Anatomy
[Liệt kê các phần tử bên trong]
- Root element
- [Child element 1]
- [Child element 2]
- [Slot/content area]

### Variants
| Variant | Description | When to use |
|---------|-------------|-------------|
| primary | [Mô tả] | [Context sử dụng] |
| secondary | [Mô tả] | [Context sử dụng] |

### States
| State | Visual change | Interaction |
|-------|--------------|-------------|
| Default | [Style] | — |
| Hover | [Style change] | Mouse over |
| Focus | [Focus ring + style] | Tab/click |
| Active | [Pressed style] | Click/tap |
| Disabled | [Dimmed, no cursor] | Not interactive |
| Loading | [Spinner/skeleton] | Waiting |
| Error | [Error style + message] | Invalid state |

### Responsive Behavior
| Breakpoint | Change |
|-----------|--------|
| Mobile (< 768px) | [Changes] |
| Tablet (768-1024px) | [Changes] |
| Desktop (> 1024px) | [Default] |

### Accessibility
- **Role**: [ARIA role nếu khác default]
- **Keyboard**: [Tab, Enter, Escape behaviors]
- **Screen reader**: [aria-label, aria-describedby, etc.]
- **Focus management**: [Focus trap, focus return]
- **Color contrast**: [Minimum ratios]

### CSS Selectors (BEM hoặc convention)
```css
.component { }
.component--variant { }
.component__element { }
.component__element--modifier { }
.component:hover { }
.component:focus-visible { }
.component[disabled] { }
.component[aria-invalid="true"] { }
```

### Usage Guidelines
✅ DO: [Correct usage examples]
❌ DON'T: [Incorrect usage examples]

### Composition Rules
- [Nesting rules: component A chứa B nhưng không chứa C]
- [Spacing rules: margin/gap khi đặt cạnh nhau]
```

### 4. Button Component (Reference Example)

```css
/* === BUTTON COMPONENT === */
.btn {
  /* Base */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
  min-height: 44px; /* WCAG touch target */
  
  /* Focus */
  &:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
  
  /* Disabled */
  &:disabled,
  &[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

/* Variants */
.btn--primary {
  background: var(--color-primary-500);
  color: var(--color-neutral-0);
  &:hover { background: var(--color-primary-600); }
  &:active { background: var(--color-primary-700); }
}

.btn--secondary {
  background: transparent;
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
  &:hover { background: var(--color-primary-50); }
  &:active { background: var(--color-primary-100); }
}

.btn--ghost {
  background: transparent;
  color: var(--color-neutral-700);
  &:hover { background: var(--color-neutral-100); }
  &:active { background: var(--color-neutral-200); }
}

/* Sizes */
.btn--sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  min-height: 36px;
}

.btn--lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
  min-height: 52px;
}
```

### 5. Naming Convention

```markdown
## Naming Convention: BEM (Block-Element-Modifier)

### Format
- Block: `.component-name`
- Element: `.component-name__element`
- Modifier: `.component-name--modifier`

### Rules
1. Block names: kebab-case, noun (`.card`, `.nav-bar`, `.hero-section`)
2. Element names: describe the role, not the appearance (`.card__title` ✅, `.card__bold-text` ❌)
3. Modifier names: describe the variant or state (`.btn--primary`, `.card--featured`)
4. Maximum nesting: 1 element level (`.card__header__title` ❌ → `.card__title` ✅)
5. State classes: dùng `is-` prefix cho JS states (`.is-active`, `.is-open`, `.is-loading`)

### File Organization
```
styles/
├── tokens.css          # Design tokens (custom properties)
├── reset.css           # CSS reset/normalize
├── base.css            # Base HTML element styles
├── utilities.css       # Utility classes
├── layout.css          # Grid, container, section
├── components/
│   ├── button.css
│   ├── card.css
│   ├── navbar.css
│   ├── hero.css
│   ├── form.css
│   ├── modal.css
│   └── footer.css
└── pages/
    ├── home.css
    ├── about.css
    └── contact.css
```

### 6. Responsive Strategy

```markdown
## Breakpoints
| Name | Value | Target |
|------|-------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1440px | Wide desktop |

## Approach: Mobile-First
```css
/* Mobile base styles */
.component { }

/* Tablet and up */
@media (min-width: 768px) {
  .component { }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component { }
}
```

## Rules
1. Start with mobile layout
2. Add complexity at larger breakpoints
3. Use clamp() for fluid typography: `font-size: clamp(1.5rem, 1rem + 2vw, 3rem)`
4. Test at breakpoint boundaries AND between breakpoints
5. Touch targets ≥ 44px on touch devices
```

## Output bắt buộc

### `docs/design-system.md`
Document tổng hợp:
- Token reference
- Component inventory
- Component specifications
- Naming convention
- Responsive strategy

### CSS files
Tokens và component CSS files theo file organization structure.

## Acceptance Criteria

- [ ] Design tokens cover colors, typography, spacing, radius, shadows, transitions
- [ ] Tất cả visual values sử dụng tokens, KHÔNG hardcode
- [ ] Component inventory liệt kê đầy đủ components cần thiết
- [ ] Mỗi component có: variants, states, responsive, accessibility spec
- [ ] Naming convention consistent (BEM hoặc chọn convention khác)
- [ ] Mobile-first responsive strategy
- [ ] Dark mode tokens (nếu applicable)
- [ ] Reduced motion support
- [ ] File organization rõ ràng

## Anti-patterns cần tránh

❌ Hardcode colors, spacing, shadows trong components
❌ Inconsistent naming giữa components
❌ Components không có tất cả states (especially focus, disabled, error)
❌ Responsive bằng cách ẩn content thay vì reorganize
❌ Quá nhiều breakpoints (>5 thường không cần)
❌ Component quá generic → không đủ opinionated, code everywhere
❌ Component quá specific → không reusable
❌ Không có accessibility contract cho interactive components
