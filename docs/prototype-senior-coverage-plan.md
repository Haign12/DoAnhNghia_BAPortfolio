# Prototype Senior Coverage Plan

A senior prototype is judged by task/state coverage, not total screen count.

## Minimum task model

For each product, define one recruiter-friendly **Try this task** path that shows where the user starts, what they are trying to finish, what happens when the happy path breaks and how the system state changes.

## Coverage checklist

- first-time and returning user where relevant
- happy path + at least one alternative path
- empty, loading, success and error/recovery states
- confirmation + cancel/undo where consequential
- permission/role differences for B2B/security/admin products
- hover, focus, pressed, disabled and validation states
- modal/drawer/toast/filter/search/sort where product logic needs them
- keyboard behavior for desktop products
- reduced-motion path for motion-heavy experiences
- responsive behavior for web products

## Evidence rule

Case-study text may describe a planned state, but only the working prototype/source proves that the state exists. Keep `PLANNED` separate from `VERIFIED`.
