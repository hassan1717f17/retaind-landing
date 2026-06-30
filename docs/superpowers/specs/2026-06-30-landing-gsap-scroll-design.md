# Landing GSAP Scroll Animation — Design

**Date:** 2026-06-30
**Status:** Approved (design); pending implementation plan
**Scope:** Animation layer on the main landing page (`/`) only. No layout, copy, or feature changes.

## Goal

Elevate the main landing from simple fade-in-on-view animations to a set of
**signature scroll-driven moments** that make the page feel intentional and
alive — without a full redesign and without destabilising the existing
audience-gated section flow.

## Decisions (from brainstorming)

- **Ambition:** "Signature scroll moments" — polish all reveals, plus a few
  standout scroll-driven beats (hero timeline, audience-select reveal, pinned
  Journey, number count-ups).
- **Library strategy:** **Coexist.** Add GSAP for scroll/timeline work; leave
  framer-motion where it already works (results pages, gauges, mobile-menu
  height animation, simple card reveals not being upgraded). One landing page,
  two libs, with clear ownership boundaries (below).

## Dependencies

- `gsap` (^3.13) and `@gsap/react` (the `useGSAP` hook). As of GSAP 3.13 the
  full plugin set, including **ScrollTrigger**, is free.
- No build/SSR config changes needed — all landing components are already
  `"use client"`.

## Architecture

### 1. Shared setup module — `src/lib/gsap.ts`

A single module that:
- Registers `ScrollTrigger` and `useGSAP` once (`gsap.registerPlugin(...)`).
- Re-exports `gsap`, `ScrollTrigger`, `useGSAP` so components import from one
  place (consistent registration, no double-register).
- Exports a small set of shared tokens (durations, eases, default stagger) so
  motion feels consistent across sections — mirroring the existing
  `--motion-fast` / `--motion-medium` CSS tokens.

### 2. Reduced-motion + responsive gating — `gsap.matchMedia()`

All GSAP animations are registered inside a `gsap.matchMedia()` context:
- `(prefers-reduced-motion: no-preference)` → animations run.
- `(prefers-reduced-motion: reduce)` → **no-op**; elements render in their
  final state (set via `gsap.set` fallback). This matches the existing CSS
  convention (`.brand-sheen`, `.won-card-sheen` already honour reduced motion).
- Optionally branch desktop vs. mobile timelines where a moment (e.g. pinning)
  is desktop-only.

### 3. Reusable reveal — `useRevealOnScroll` (or a `<Reveal>` wrapper)

A small hook/component encapsulating the standard "fade + rise as it enters the
viewport" using `ScrollTrigger.batch` for staggered groups. This replaces the
repeated `motion.div initial/whileInView` blocks in the sections we're
upgrading, giving consistent staggering and one place to tune timing.

### 4. Per-component integration via `useGSAP`

Each animated section uses `useGSAP(() => {...}, { scope: ref })` scoped to its
own root ref, so selectors are local and cleanup is automatic on unmount
(critical given gated sections mount/unmount — see Gating).

## The signature moments

Mapped to real components:

1. **Hero entrance timeline** (`hero.tsx`)
   Replace the two independent framer-motion fades with one GSAP timeline:
   headline → post-it image → value copy → audience cards (stagger) → video
   panel rises last. One coordinated beat instead of two.

2. **Hero background parallax** (`hero.tsx`)
   The `opacity-60` background image scrubs slightly slower than scroll
   (`yPercent` tied to a `scrub` ScrollTrigger) for depth. Subtle; desktop
   only. Fits the brand's existing decorative-sheen motif.

3. **Audience-select reveal** (`landing-page.tsx` + first gated sections)
   Today, selecting Agency/In-House instantly mounts ~13 sections. Instead:
   smooth-scroll to the `#features` anchor (already wired) while the first
   sections reveal in sequence, so the page feels like it *responds* to the
   choice. Implemented by the reveal hook firing on mount of the gated block.

4. **Pinned "Journey" section** (`journey.tsx`) — the one bold moment
   Pin the Journey section and scrub its phase cards in sequence as the user
   scrolls through it; the horizontal connector line (`agency` variant, the
   `h-0.5 bg-border` rule) draws left-to-right as phases activate. Works for
   the 3-phase agency layout and the 2-stage in-house layout. **Desktop only**
   (pinning is disabled on mobile via `matchMedia`; mobile keeps a simple
   staggered reveal).

5. **Number count-ups** (`bad-hires.tsx`, `benchmarking.tsx`, hero "80%")
   Stat figures (`16`, `4x`, `3x`, `80%`, `2x`, £-figures) count up from 0 when
   scrolled into view, via a ScrollTrigger-driven `gsap.to` on a counter object.
   A small `useCountUp` helper formats suffixes (`x`, `%`, `£…k`).

6. **Section-reveal upgrade** (features grid + other upgraded sections)
   Convert the repeated `whileInView` fades to the shared `ScrollTrigger.batch`
   reveal for consistent staggering across the page.

## Library ownership boundary (coexist)

| Concern | Owner |
|---|---|
| Scroll-driven, pinned, scrubbed, timeline, count-up | **GSAP** |
| Simple in-view fades on sections **not** in the upgrade list | framer-motion (leave as-is) |
| Results pages, score gauge, radar, mobile-menu height | framer-motion (untouched) |

Rule: a given element is animated by exactly one library — never both on the
same element (prevents transform conflicts).

## Gating — the main correctness risk

Most sections render only after `selectedAudience` is set
(`landing-page.tsx` conditional block). ScrollTrigger created before a trigger
element exists attaches to nothing, and stale triggers from unmounted
audience-variant sections leak.

Handled by:
- Each gated section owns its triggers via scoped `useGSAP` → automatic
  `revert()`/cleanup on unmount.
- After the gated block mounts (and after audience **switches**, which swaps
  Journey/Pricing/etc. variants), call `ScrollTrigger.refresh()` so positions
  recalculate against the newly-present DOM.
- Pin spacers are created/destroyed with their section (no orphaned spacing).

## SSR / layout-shift / performance

- Set initial hidden states with `gsap.set()` *inside* `useGSAP` (runs after
  mount) so there's no SSR/client flash and no FOUC; under reduced motion the
  `set` is skipped so content is visible immediately.
- Prefer transforms/opacity only (GPU-friendly); avoid animating layout props.
- One `ScrollTrigger.refresh()` after fonts load / images settle to avoid
  mis-measured pin distances (hero has large images).

## Out of scope

- All audit fixes (email validation, dedupe index, a11y of quiz controls, etc.)
  — tracked separately.
- Results pages and assessment wizards — no animation changes.
- No copy, layout, color, or component-structure changes.
- No migration of framer-motion that already works.

## Testing & verification

- `pnpm typecheck` and `pnpm test` stay green.
- Existing Playwright smoke (`e2e/smoke.spec.ts`): the audience toggle must
  still reveal the in-house section. Because pinning/scrubbing can change when
  elements are in the DOM, verify the smoke test still passes; if ScrollTrigger
  pinning interferes with the assertion, add `data-testid` waits rather than
  weakening the test.
- Manual/Playwright check with `prefers-reduced-motion: reduce` emulation —
  confirm all sections render fully and nothing is stuck hidden.
- Manual scroll pass on desktop + mobile widths (pin disabled on mobile).

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Stale/oprhaned triggers on audience switch | scoped `useGSAP` cleanup + `ScrollTrigger.refresh()` on mount/switch |
| Reduced-motion users see hidden content | skip `gsap.set` hides under reduce; final-state fallback |
| Pin mis-measurement from late-loading images | `refresh()` after load; pin desktop-only |
| Two libs fighting on one element | strict one-element-one-library rule |
| Mobile jank from pinning | `matchMedia` disables pin < md breakpoint |
