# Landing GSAP Scroll Animation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add GSAP-driven signature scroll moments to the main landing page (hero timeline, parallax, audience-select reveal, pinned Journey, stat count-ups, unified reveals) while coexisting with the existing framer-motion.

**Architecture:** A single `src/lib/gsap.ts` registers ScrollTrigger + useGSAP and exports shared timing tokens. A `useReveal` hook (ScrollTrigger.batch) standardises in-view reveals. Each animated section drives its own animations via scoped `useGSAP`, all wrapped in `gsap.matchMedia()` so reduced-motion is a no-op. Gated sections are handled with scoped cleanup + `ScrollTrigger.refresh()` on audience change.

**Tech Stack:** Next.js 16, React 19, TypeScript, GSAP 3.13 + @gsap/react, framer-motion (existing, untouched where it works), Tailwind v4, vitest, Playwright.

## Global Constraints

- **Coexist rule:** GSAP owns scroll/pin/scrub/timeline/count-up animations; framer-motion keeps simple fades, results pages, score gauge/radar, and the mobile-menu height animation. **One element is animated by exactly one library** — never both.
- **Reduced motion:** every GSAP animation lives inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)", ...)`. Under `reduce`, no `gsap.set` hides run and content renders in its final visible state.
- **Scope only the main landing (`/`)** and its section components under `src/components/landing/`. No results-page, wizard, copy, layout, color, or DB changes.
- **All landing components are already `"use client"`** — keep them so; do not add client directives elsewhere.
- **Import GSAP only from `@/lib/gsap`** (single registration point) — never `import { gsap } from "gsap"` directly in components.
- **Preserve every existing `data-testid`** so Playwright selectors keep resolving.
- **Versions:** `gsap@^3.13.0`, `@gsap/react@^2.1.2`.
- After each task: `pnpm typecheck` and `pnpm test` must pass, and `pnpm build` must succeed.

---

### Task 1: GSAP dependency + foundation module

**Files:**
- Modify: `package.json` (deps via pnpm)
- Create: `src/lib/gsap.ts`

**Interfaces:**
- Produces: from `@/lib/gsap` — `gsap`, `ScrollTrigger`, `useGSAP` (re-exports, plugins registered once); `REVEAL` (`{ y: number; duration: number; ease: string; stagger: number }`); `EASE` (`{ out: string; inOut: string }`); `DUR` (`{ fast: number; base: number; slow: number }`); `NO_REDUCED_MOTION` (string media query constant).

- [ ] **Step 1: Install dependencies**

Run:
```bash
pnpm add gsap@^3.13.0 @gsap/react@^2.1.2
```
Expected: both added under `dependencies` in `package.json`, lockfile updated.

- [ ] **Step 2: Create the foundation module**

Create `src/lib/gsap.ts`:
```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins exactly once for the whole app. Registering useGSAP with
// gsap silences its "missing plugin" warning and enables its internal context.
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Media query gating all motion. Reduced-motion users get a no-op. */
export const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";

/** Durations (seconds) — mirror the CSS --motion-* tokens roughly. */
export const DUR = { fast: 0.25, base: 0.6, slow: 0.9 } as const;

export const EASE = { out: "power2.out", inOut: "power2.inOut" } as const;

/** Shared defaults for the standard "fade + rise" reveal. */
export const REVEAL = {
  y: 24,
  duration: DUR.base,
  ease: EASE.out,
  stagger: 0.12,
} as const;

export { gsap, ScrollTrigger, useGSAP };
```

- [ ] **Step 3: Verify it typechecks and builds**

Run:
```bash
pnpm typecheck && pnpm build
```
Expected: typecheck clean; build succeeds (confirms the new deps resolve under Next 16 / React 19 and `gsap/ScrollTrigger` imports work in the bundle).

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml src/lib/gsap.ts
git commit -m "feat(landing): add GSAP + foundation module with motion tokens"
```

---

### Task 2: Reusable reveal hook + apply to FeaturesGrid

**Files:**
- Create: `src/components/landing/use-reveal.ts`
- Modify: `src/components/landing/features-grid.tsx`

**Interfaces:**
- Consumes: `@/lib/gsap` (`gsap`, `ScrollTrigger`, `useGSAP`, `REVEAL`, `NO_REDUCED_MOTION`).
- Produces: `useReveal<T extends HTMLElement = HTMLDivElement>(): React.RefObject<T | null>` — attach the returned ref to a container; any descendant with a `data-reveal` attribute fades+rises in as it enters the viewport, batched/staggered. Safe to call in a gated component (auto-cleans on unmount).

- [ ] **Step 1: Write the reveal hook**

Create `src/components/landing/use-reveal.ts`:
```ts
"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, REVEAL, NO_REDUCED_MOTION } from "@/lib/gsap";

/**
 * Standardised "fade + rise on scroll into view" for a section.
 * Attach the returned ref to a wrapper; mark animated children with
 * `data-reveal`. Honours reduced-motion (no-op) and cleans up on unmount.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      const targets = q("[data-reveal]");
      if (!targets.length) return;

      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        gsap.set(targets, { opacity: 0, y: REVEAL.y });
        ScrollTrigger.batch(targets, {
          start: "top 85%",
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: REVEAL.duration,
              ease: REVEAL.ease,
              stagger: REVEAL.stagger,
              overwrite: true,
            }),
        });
      });
    },
    { scope }
  );

  return scope;
}
```

- [ ] **Step 2: Apply the hook to FeaturesGrid (replace framer-motion there)**

In `src/components/landing/features-grid.tsx`:
- Remove `import { motion } from "framer-motion";`.
- Add `import { useReveal } from "@/components/landing/use-reveal";`.
- In the component body, before `return`, add: `const scope = useReveal();`.
- Put `ref={scope}` on the grid `<div className="grid ...">`.
- Replace each card's `<motion.div initial/whileInView/...>` wrapper with a plain `<div data-reveal>` (keep the inner content identical).

Resulting card block:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={scope}>
  {features.map((feature, idx) => (
    <Card key={idx} className="p-6 hover-elevate" data-testid={`card-feature-${idx}`}>
      <div data-reveal>
        <div className={`w-11 h-11 rounded-md ${feature.iconBg} flex items-center justify-center mb-5`}>
          {feature.icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
      </div>
    </Card>
  ))}
</div>
```

- [ ] **Step 3: Verify typecheck + build**

Run:
```bash
pnpm typecheck && pnpm build
```
Expected: clean. (No `motion` import left dangling in features-grid.)

- [ ] **Step 4: Manual scroll check**

Run `pnpm dev`, open `/`, select an audience, scroll to the features grid.
Expected: cards fade+rise in a stagger as they enter view. Then emulate
reduced-motion (DevTools → Rendering → "Emulate prefers-reduced-motion: reduce")
and reload: cards are fully visible immediately (no hidden state).

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/use-reveal.ts src/components/landing/features-grid.tsx
git commit -m "feat(landing): reusable GSAP reveal hook; apply to features grid"
```

---

### Task 3: Hero entrance timeline + background parallax

**Files:**
- Modify: `src/components/landing/hero.tsx`

**Interfaces:**
- Consumes: `@/lib/gsap` (`gsap`, `ScrollTrigger`, `useGSAP`, `DUR`, `EASE`, `NO_REDUCED_MOTION`).
- Produces: nothing imported elsewhere (self-contained section animation).

- [ ] **Step 1: Swap framer-motion for GSAP in the hero**

In `src/components/landing/hero.tsx`:
- Remove `import { motion } from "framer-motion";`.
- Add `import { useRef } from "react";` and `import { gsap, ScrollTrigger, useGSAP, DUR, EASE, NO_REDUCED_MOTION } from "@/lib/gsap";`.
- Change the outer `<section ...>` to hold a ref: add `const root = useRef<HTMLElement>(null);` and `ref={root}` on the `<section>`.
- Replace the two `motion.div` wrappers with plain `<div>`s, adding `data-hero="content"` to the first (the headline→cards group wrapper currently `motion.div` with the fade) and `data-hero="video"` to the video panel wrapper.
- Add `data-hero="bg"` to the background image `<div className="absolute inset-0 bg-cover ...">`.

- [ ] **Step 2: Add the entrance timeline + parallax via useGSAP**

Insert this in the component body before `return` (after `scrollToFeatures`):
```tsx
const root = useRef<HTMLElement>(null);

useGSAP(
  () => {
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add(NO_REDUCED_MOTION, () => {
      // Entrance: one coordinated beat for the hero content, video last.
      const content = q('[data-hero="content"]');
      const video = q('[data-hero="video"]');
      gsap.set([content, video], { opacity: 0, y: 30 });

      const tl = gsap.timeline({ defaults: { ease: EASE.out } });
      tl.to(content, { opacity: 1, y: 0, duration: DUR.base })
        .to(video, { opacity: 1, y: 0, duration: DUR.slow }, "-=0.3");

      // Parallax: background drifts slower than scroll for depth.
      const bg = q('[data-hero="bg"]');
      gsap.to(bg, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  },
  { scope: root }
);
```

- [ ] **Step 3: Verify typecheck + build**

Run:
```bash
pnpm typecheck && pnpm build
```
Expected: clean; no leftover `motion` references in `hero.tsx`.

- [ ] **Step 4: Manual check**

`pnpm dev` → `/`: on load, hero content animates in as one beat, then the video panel rises. Scrolling drifts the background image slower than the foreground. Reduced-motion emulation: everything visible immediately, no parallax.

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/hero.tsx
git commit -m "feat(landing): GSAP hero entrance timeline + background parallax"
```

---

### Task 4: Stat count-up helper (TDD) + apply to BadHires

**Files:**
- Create: `src/components/landing/use-count-up.ts`
- Create: `src/components/landing/use-count-up.test.ts`
- Modify: `src/components/landing/bad-hires.tsx`

> **Scope note:** count-ups apply to `bad-hires.tsx` only. `benchmarking.tsx` has no numeric stats, and the hero "80%" is rendered inside an image — both are out of count-up scope (benchmarking still gets the standard reveal in Task 7).

**Interfaces:**
- Consumes: `@/lib/gsap`.
- Produces:
  - `formatStat(value: number, opts: { prefix?: string; suffix?: string }): string` — pure formatter, e.g. `formatStat(80, { suffix: "%" }) === "80%"`, `formatStat(3, { suffix: "x" }) === "3x"`.
  - `useCountUp(): React.RefObject<HTMLSpanElement | null>` — attach to a `<span data-count-to="80" data-count-suffix="%">`; counts 0→target when scrolled into view.

- [ ] **Step 1: Write the failing test for the formatter**

Create `src/components/landing/use-count-up.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { formatStat } from "./use-count-up";

describe("formatStat", () => {
  it("appends a percent suffix", () => {
    expect(formatStat(80, { suffix: "%" })).toBe("80%");
  });
  it("appends a multiplier suffix", () => {
    expect(formatStat(3, { suffix: "x" })).toBe("3x");
  });
  it("rounds to an integer", () => {
    expect(formatStat(5.7, {})).toBe("6");
  });
  it("supports a prefix", () => {
    expect(formatStat(20, { prefix: "£", suffix: "k" })).toBe("£20k");
  });
});
```

- [ ] **Step 2: Run the test, verify it fails**

Run:
```bash
pnpm exec vitest run src/components/landing/use-count-up.test.ts
```
Expected: FAIL — cannot import `formatStat` (module/function not found).

- [ ] **Step 3: Implement the helper module**

Create `src/components/landing/use-count-up.ts`:
```ts
"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE, NO_REDUCED_MOTION } from "@/lib/gsap";

export function formatStat(
  value: number,
  { prefix = "", suffix = "" }: { prefix?: string; suffix?: string }
): string {
  return `${prefix}${Math.round(value)}${suffix}`;
}

/**
 * Counts a number from 0 to its target when scrolled into view.
 * Attach to a <span data-count-to="80" data-count-prefix="£" data-count-suffix="%">.
 * Reduced-motion: the final value is written immediately.
 */
export function useCountUp() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const target = Number(el.dataset.countTo ?? "0");
      const prefix = el.dataset.countPrefix ?? "";
      const suffix = el.dataset.countSuffix ?? "";

      const write = (v: number) => {
        el.textContent = formatStat(v, { prefix, suffix });
      };

      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        const counter = { v: 0 };
        write(0);
        gsap.to(counter, {
          v: target,
          duration: 1.4,
          ease: EASE.out,
          onUpdate: () => write(counter.v),
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      // Reduced-motion branch (no matchMedia match): show final value.
      mm.add("(prefers-reduced-motion: reduce)", () => write(target));
    },
    { scope: ref }
  );

  return ref;
}
```

- [ ] **Step 4: Run the test, verify it passes**

Run:
```bash
pnpm exec vitest run src/components/landing/use-count-up.test.ts
```
Expected: PASS (4 tests).

- [ ] **Step 5: Wire count-ups into BadHires**

In `src/components/landing/bad-hires.tsx`:
- The stat cards array currently uses `title: "3x Salary"` / `"6 Months"`. Add a numeric field so the number can count while the label stays static. Replace the array + its render so the leading number is a count-up span.

Change the data array to:
```tsx
{[
  { count: 3, suffix: "x", unit: "Salary", desc: "Average cost of a bad hire including recruitment, training, and lost productivity" },
  { count: 6, suffix: "", unit: "Months", desc: "Time wasted before a poor hire typically leaves or is let go" },
  { count: null, suffix: "", unit: "Team Impact", desc: "Morale and productivity suffer when cultural fit is wrong" },
].map((item, idx) => (
  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-muted border" data-testid={`card-bad-hire-item-${idx}`}>
    <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2 shrink-0" />
    <div>
      <h4 className="font-bold text-lg text-foreground" data-testid={`text-bad-hire-title-${idx}`}>
        {item.count !== null ? <Stat count={item.count} suffix={item.suffix} /> : null}
        {item.count !== null ? " " : ""}{item.unit}
      </h4>
      <p className="text-muted-foreground text-sm">{item.desc}</p>
    </div>
  </div>
))}
```
- Add a small local `Stat` component at the top of the file (below imports):
```tsx
function Stat({ count, suffix }: { count: number; suffix: string }) {
  const ref = useCountUp();
  return <span ref={ref} data-count-to={count} data-count-suffix={suffix}>{count}{suffix}</span>;
}
```
- Add imports: `import { useCountUp } from "@/components/landing/use-count-up";`.
- For the inline "80%" in the description paragraph, wrap it:
```tsx
<p className="text-lg text-muted-foreground mb-8" data-testid="text-section-bad-hires-desc">
  <StatInline /> of employees who leave in their first year cite behavioral and cultural misalignment as the primary reason.
</p>
```
and add:
```tsx
function StatInline() {
  const ref = useCountUp();
  return <span ref={ref} data-count-to={80} data-count-suffix="%">80%</span>;
}
```
> Keep the existing `AnimatePresence`/`motion.div` mount wrapper in `bad-hires.tsx` as-is — it animates the section's *mount* on audience switch (framer-motion's job per the coexist rule); the count-ups are independent inner elements.

- [ ] **Step 6: Verify full test suite + build**

Run:
```bash
pnpm test && pnpm typecheck && pnpm build
```
Expected: all vitest pass (now includes count-up tests); typecheck clean; build OK.

- [ ] **Step 7: Manual check**

`pnpm dev` → `/` → select **In-House** → scroll to "The Cost of Bad Hires":
the "80%", "3x", and "6" count up from 0 once. Reduced-motion: final values shown immediately.

- [ ] **Step 8: Commit**

```bash
git add src/components/landing/use-count-up.ts src/components/landing/use-count-up.test.ts src/components/landing/bad-hires.tsx
git commit -m "feat(landing): scroll-triggered stat count-ups in bad-hires"
```

---

### Task 5: Pinned Journey (desktop-only, scrubbed phase reveal)

**Files:**
- Modify: `src/components/landing/journey.tsx`

**Interfaces:**
- Consumes: `@/lib/gsap`.
- Produces: self-contained section animation.

- [ ] **Step 1: Add refs + data hooks to the agency journey markup**

In `src/components/landing/journey.tsx`:
- Add `import { useRef } from "react";` and `import { gsap, ScrollTrigger, useGSAP, EASE, NO_REDUCED_MOTION } from "@/lib/gsap";`.
- Keep the existing `AnimatePresence`/`motion.div` mount wrapper (framer-motion owns the audience-swap mount). Inside it, give the agency `<Section id="journey" ...>` an inner wrapper ref and mark animatable parts:
  - Add `const agencyRoot = useRef<HTMLDivElement>(null);` in the component.
  - Wrap the agency grid in `<div ref={agencyRoot} data-journey="agency">`.
  - Add `data-journey-line` to the connector `<div className="hidden md:block absolute top-12 ...">`.
  - Replace each phase card's `<motion.div initial/whileInView>` with `<div data-journey-card>` (keep inner content identical).

- [ ] **Step 2: Add the pin + scrub timeline (desktop only)**

Add in the component body (before `return`):
```tsx
const agencyRoot = useRef<HTMLDivElement>(null);

useGSAP(
  () => {
    const q = gsap.utils.selector(agencyRoot);
    const cards = q("[data-journey-card]");
    const line = q("[data-journey-line]");
    if (!cards.length) return;

    const mm = gsap.matchMedia();

    // Desktop: pin the section and scrub the phases + connector in.
    mm.add("(min-width: 768px) and " + NO_REDUCED_MOTION, () => {
      gsap.set(cards, { opacity: 0, y: 40 });
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: agencyRoot.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.5,
        },
      });
      tl.to(line, { scaleX: 1, ease: "none", duration: 1 }, 0)
        .to(cards, { opacity: 1, y: 0, stagger: 0.5, ease: EASE.out, duration: 1 }, 0);
    });

    // Mobile / reduced-motion: simple non-pinned reveal.
    mm.add(`(max-width: 767px), (prefers-reduced-motion: reduce)`, () => {
      gsap.set([cards, line], { clearProps: "all" });
      gsap.from(cards, {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        ease: EASE.out,
        duration: 0.6,
        scrollTrigger: { trigger: agencyRoot.current, start: "top 80%", once: true },
      });
    });
  },
  { scope: agencyRoot, dependencies: [selectedAudience] }
);
```
> The in-house two-stage variant keeps its current framer-motion reveal (not pinned) — pinning a 2-card layout adds little. Leave that block unchanged.

- [ ] **Step 3: Verify typecheck + build**

Run:
```bash
pnpm typecheck && pnpm build
```
Expected: clean; no leftover `motion` usage on the agency phase cards (the `motion.div` mount wrapper import stays — still used by both variants' outer wrapper and the in-house cards).

- [ ] **Step 4: Manual check (desktop + mobile widths)**

`pnpm dev` → `/` → **Agency** → scroll into "Three-Phase Journey":
section pins, connector line draws left→right, the three phase cards reveal in
sequence as you scroll, then the page continues. Resize to <768px: no pin —
cards just fade in. Reduced-motion: no pin, immediate/simple reveal.

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/journey.tsx
git commit -m "feat(landing): pin + scrub the agency Journey phases on desktop"
```

---

### Task 6: Audience-gating refresh + smooth reveal on selection

**Files:**
- Modify: `src/components/landing/landing-page.tsx`

**Interfaces:**
- Consumes: `@/lib/gsap` (`ScrollTrigger`), `useGSAP`.
- Produces: nothing exported.

**Why:** The gated block (`{selectedAudience && (...)}`) mounts ~13 sections at once, and switching audience swaps variant sections (Journey/Pricing/etc.). ScrollTrigger positions must be recomputed after the DOM changes, or pins/reveals mis-measure or attach to stale nodes.

- [ ] **Step 1: Refresh ScrollTrigger when the gated block mounts / audience changes**

In `src/components/landing/landing-page.tsx`:
- Add `import { ScrollTrigger, useGSAP } from "@/lib/gsap";`.
- Inside the component, after the `useState` calls:
```tsx
useGSAP(
  () => {
    if (!selectedAudience) return;
    // Newly-mounted (or swapped) sections changed document height/positions;
    // recompute all triggers on the next frame after layout settles.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  },
  { dependencies: [selectedAudience] }
);
```
> `useGSAP` with a `dependencies` array re-runs on audience change and reverts the prior run — the right lifecycle hook for this. The per-section scoped `useGSAP`s already clean up their own triggers on unmount, so this only handles re-measurement.

- [ ] **Step 2: Verify typecheck + build**

Run:
```bash
pnpm typecheck && pnpm build
```
Expected: clean.

- [ ] **Step 3: Manual check — audience switch**

`pnpm dev` → `/`: pick **Agency**, scroll through (note pinned Journey position),
scroll back up, switch to **In-House** via the hero toggle. Expected: sections
swap, no broken pin spacing, no console errors, count-ups/reveals still fire on
the in-house sections. Switch back and forth twice to confirm no leaked triggers
(scroll positions stay correct).

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/landing-page.tsx
git commit -m "feat(landing): refresh ScrollTrigger on audience mount/switch"
```

---

### Task 7: Roll out the reveal to remaining sections + verification pass

**Files:**
- Modify: `src/components/landing/benchmarking.tsx`
- Modify: `src/components/landing/sales-marketing.tsx`
- Modify: `src/components/landing/fair-assessment.tsx`
- Modify: `src/components/landing/video-interviews.tsx`
- Modify: `src/components/landing/integrations.tsx`
- Modify: `src/components/landing/ai-materials.tsx`

> Only convert sections that currently have **no** scroll animation (or a redundant one) and are not covered by Tasks 2–5. For each, the change is identical in shape. If a given file already has bespoke framer-motion that works and isn't a simple fade, leave it (coexist rule) and note it in the commit body.

**Interfaces:**
- Consumes: `useReveal` from Task 2.

- [ ] **Step 1: Apply `useReveal` to each listed section**

For each file above, do the same three edits:
1. Add `import { useReveal } from "@/components/landing/use-reveal";`.
2. Add `const scope = useReveal();` in the component body.
3. Put `ref={scope}` on the section's main content wrapper and add `data-reveal` to the heading block and each card/column that should stagger in.

Example (benchmarking.tsx — wrap the two grid columns):
```tsx
const scope = useReveal();
// ...
<div className="grid lg:grid-cols-2 gap-16 items-center" ref={scope}>
  <div data-reveal>
    {/* existing left column (badge, heading, accordion) */}
  </div>
  <div data-reveal className="bg-muted p-8 rounded-3xl border border-border">
    {/* existing right column (image + caption) */}
  </div>
</div>
```
Apply the analogous wrap in the other five files (mark the heading group and the repeating cards/items with `data-reveal`; attach `ref={scope}` to their nearest common container).

- [ ] **Step 2: Verify typecheck + full test suite + build**

Run:
```bash
pnpm typecheck && pnpm test && pnpm build
```
Expected: all clean.

- [ ] **Step 3: Run the Playwright smoke test**

Run:
```bash
pnpm exec playwright test e2e/smoke.spec.ts
```
Expected: PASS — the audience toggle still reveals the in-house section, newsletter POST still 201s, agency submit still returns a report. If a pinned/animated element makes an assertion flaky, prefer adding an explicit `data-testid` wait in the test over weakening the assertion.

- [ ] **Step 4: Reduced-motion full-page audit**

`pnpm dev` → DevTools → Rendering → "Emulate prefers-reduced-motion: reduce" →
reload `/`, select each audience, scroll the entire page. Expected: every
section is fully visible (nothing stuck at `opacity: 0`), no pinning, count-ups
show final values. Then disable emulation and confirm all moments still animate.

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/benchmarking.tsx src/components/landing/sales-marketing.tsx src/components/landing/fair-assessment.tsx src/components/landing/video-interviews.tsx src/components/landing/integrations.tsx src/components/landing/ai-materials.tsx
git commit -m "feat(landing): unify scroll reveals across remaining sections"
```

---

## Self-Review

**Spec coverage:**
- Deps (gsap + @gsap/react, ScrollTrigger free) → Task 1. ✓
- `src/lib/gsap.ts` single registration + tokens → Task 1. ✓
- `gsap.matchMedia()` reduced-motion gating → every task; explicit audits in Tasks 2/3/4/5/7. ✓
- Reusable `useReveal` (ScrollTrigger.batch) → Task 2. ✓
- Per-component scoped `useGSAP` → Tasks 2–6. ✓
- Hero entrance timeline → Task 3. ✓
- Hero background parallax → Task 3. ✓
- Audience-select reveal + `ScrollTrigger.refresh()` on mount/switch → Task 6. ✓
- Pinned Journey (desktop-only, scrubbed, connector draw) → Task 5. ✓
- Number count-ups → Task 4 (scoped to bad-hires; spec's benchmarking/hero-"80%" corrected — documented in Task 4 scope note). ✓
- Section-reveal upgrade rollout → Tasks 2 + 7. ✓
- Coexist boundary (one element / one library) → Global Constraints + reaffirmed in Tasks 4/5. ✓
- SSR/no-FOUC via `gsap.set` inside `useGSAP` → Tasks 2/3/4/5. ✓
- Testing: typecheck/test/build each task; Playwright smoke + reduced-motion audit → Task 7. ✓

**Placeholder scan:** No TBD/TODO; all code steps contain full code; commands have expected output. ✓

**Type consistency:** `useReveal` / `useCountUp` / `formatStat` / `Stat` / `StatInline` signatures match across tasks; all GSAP imports come from `@/lib/gsap` exporting the named tokens used (`REVEAL`, `DUR`, `EASE`, `NO_REDUCED_MOTION`). ✓
