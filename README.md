# neilofneils-astro

Parallel Astro rebuild of neilofneils.com, preservation-first and posts-first.

## Commands

- `npm run dev` — local development
- `npm run build` — clean Astro cache/output, then build
- `npm run preview -- --host 127.0.0.1` — local preview

## Content ordering

Posts are ordered by the `date` field in frontmatter.
Use full timestamps, not date-only values, when multiple posts land on the same day.

Example:

```md
---
date: 2026-04-03T14:30:00-04:00
---
```

## Why clean builds are the default

This repo has occasionally surfaced stale Astro content-cache behavior that produced duplicate-id warnings even when the content directory only contained one file per slug.

To keep that from turning into recurring ambiguity:
- `npm run build` now clears `.astro/` and `dist/` before building
- if ordering looks wrong, check post frontmatter timestamps first
