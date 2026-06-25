# Task 15 Report: Terms, Privacy, and not-found Pages

## Files Created

| File | Route | Source |
|------|-------|--------|
| `src/app/terms/page.tsx` | `/terms` | `client/src/pages/Terms.tsx` (183 lines) |
| `src/app/privacy/page.tsx` | `/privacy` | `client/src/pages/Privacy.tsx` (586 lines) |
| `src/app/not-found.tsx` | 404 catch-all | `client/src/pages/not-found.tsx` (21 lines) |

## Theme Swaps Applied

| Original class | Replacement |
|----------------|-------------|
| `bg-white` | `bg-background` |
| `text-blue-600 hover:underline` | `text-foreground hover:underline` |
| `text-slate-900` | `text-foreground` |
| `text-slate-600` | `text-muted-foreground` |
| `text-slate-500` | `text-muted-foreground` |
| `border-slate-300` | `border-border` |
| `text-red-500` (AlertCircle) | `text-foreground` |
| `text-gray-900` | `text-foreground` |
| `text-gray-600` | `text-muted-foreground` |
| `bg-gray-50` | `bg-muted` |

## Prose Handling

Both Terms and Privacy used `prose prose-slate max-w-none` as the wrapper div class. The `@tailwindcss/typography` plugin is not installed in the target repo, so the `prose` classes were replaced with `max-w-none` only. Headings and paragraph spacing are preserved via explicit utility classes already present in the source (`text-3xl font-bold`, `text-xl font-bold mt-8 mb-3`, etc.).

## Routing Changes

- Replaced `import { Link } from "wouter"` with `import Link from "next/link"` in Terms and Privacy.
- Refactored the back-home button pattern from `<Link href="/"><Button>` (wouter wraps anchor around button, invalid in Next.js) to `<Button asChild><Link href="/">` using shadcn's `asChild` prop for correct `<a>` rendering.
- `data-testid` attributes on the back-button preserved: `link-terms-back-home`, `link-privacy-back-home`, `text-privacy-title`.
- `not-found.tsx` has no links; no routing changes needed. No `"use client"` directive needed on any of the three files (all static, no hooks/state/onClick).

## Build / Typecheck / Curl Results

```
pnpm build   → ✓ Compiled successfully, 15 static pages generated (including /privacy, /terms, /_not-found)
pnpm typecheck → clean (no errors)

curl /terms  → 200
curl /privacy → 200
curl /some-nonexistent-route → 404

curl /privacy | grep -oE 'bg-blue-[0-9]+|text-blue-[0-9]+' → (no output — no brand leak)
```

## Self-Review

- [x] Routes resolve: `/terms` 200, `/privacy` 200
- [x] 404 wired: `src/app/not-found.tsx` triggers on unknown routes (returns 404)
- [x] Monochrome: no `bg-blue-*`, `text-blue-*`, `bg-white`, `text-gray-*`, `text-red-*` remaining
- [x] Legal copy verbatim: all text preserved character-for-character from source
- [x] `next/link` used; no wouter import remaining
- [x] No `prose` or `prose-slate` dependency (not installed)
- [x] `data-testids` preserved
- [x] No `"use client"` directive (pages are pure static JSX)

## Commit

`45c5e51` — feat: terms, privacy, and 404 pages

---

## Post-merge Fix: Restore Legal-Page Typography (prose-neutral)

**Date:** 2026-06-26

### Problem
After the initial task-15 commit, both `src/app/terms/page.tsx` and `src/app/privacy/page.tsx` had the `prose` class stripped from the content wrapper (left as `max-w-none` only). Tailwind's preflight reset meant `<ul>`/`<ol>` had no bullets or indentation, and `<p>` tags had no spacing — legal text rendered flat.

### Changes Made

**1. Plugin installed**
```
pnpm add -D @tailwindcss/typography   →  @tailwindcss/typography 0.5.20
```

**2. Plugin registered in `src/app/globals.css` (Tailwind v4 syntax)**
Added after existing `@import` lines:
```css
@plugin "@tailwindcss/typography";
```

**3. Content wrapper updated in both legal pages**
In `src/app/terms/page.tsx` and `src/app/privacy/page.tsx`, changed:
```jsx
<div className="max-w-none">
```
to:
```jsx
<div className="prose prose-neutral dark:prose-invert max-w-none">
```
`prose-neutral` is grayscale (monochrome-safe); `dark:prose-invert` handles dark mode. No hued variants (`prose-blue`/`prose-slate`) used.

### Build Result
```
pnpm build → ✓ Compiled successfully in 13.2s — 15 static pages generated (including /privacy, /terms)
```

### Verification
```
curl http://localhost:3000/privacy | grep -oE '<ul|<ol|prose' | head
→ prose, prose, prose, <ul, <ul, <ul ... (prose class present in rendered HTML)

curl http://localhost:3000/terms | grep -oE '<ul|<ol|prose' | head
→ prose, prose, prose, <ul, <ul, <ul ... (prose class present in rendered HTML)
```

### No Brand Color Introduced
Only `prose-neutral` variant used — confirmed no `prose-blue` or `prose-slate`.

### Commit
`2ffcbb8` — fix: restore legal-page typography via @tailwindcss/typography (prose-neutral)
