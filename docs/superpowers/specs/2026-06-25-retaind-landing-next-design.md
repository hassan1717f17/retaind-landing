# Retaind Landing — Next.js Port (`retaind-landing-next`)

**Date:** 2026-06-25
**Status:** Approved design — pending spec review

## 1. Summary

Rebuild the existing Retaind marketing site (currently a Vite + Express + React app
at `D:/Work/Retained/V2-Retaind-Landing-Page (2)/V2-Retaind-Landing-Page`) as a new,
standalone **Next.js** application in a **new repository parallel to the CRM**
(`D:/Work/Retained/retaind-landing-next`, sibling of `D:/Work/Retained/retaind`).

The rebuild reproduces the landing site **section-for-section and
functionality-for-functionality ("as is")**, but re-skinned to the **CRM's theme**
(`retaind-next`) applied **strictly** — i.e. the CRM's neutral/monochrome design-token
system, not the current blue/indigo branding.

## 2. Goals

- Faithful reproduction of every section and interaction of the current landing site.
- Visual identity = the CRM's design system (strict monochrome), token-for-token.
- Same tech stack as the CRM so the result is consistent and could later fold in.
- Backend (newsletter + two AI assessment flows) reproduced **structurally**, but:
  - **No database connection.** Persistence is a no-op until a real `DATABASE_URL` is supplied.
  - **OpenAI wired with a dummy key.** Report generation falls back to the static
    report until a real `OPENAI_API_KEY` is supplied.

## 3. Non-goals

- No Docker / local Postgres provisioning (explicitly descoped by the user).
- No new features beyond what the current site already does.
- No unrelated refactors of the source landing page or the CRM.
- Not a literal 1:1 copy of the 1,591-line `Home` monolith — it is decomposed (see §6).

## 4. Source inventory (what must be reproduced)

### Pages / routes (from `client/src/App.tsx`, `wouter`)
| Current route | Purpose |
|---|---|
| `/` | Home landing (the large multi-section page) |
| `/assessment`, `/assessment/results` | Agency recruiter readiness quiz + results |
| `/inhouse-assessment`, `/inhouse-assessment/results` | In-house hiring readiness quiz + results |
| `/choose-assessment` | Assessment pathway chooser |
| `/agency-recruiter`, `/in-house-hiring` | Assessment landing pages |
| `/terms`, `/privacy` | Legal pages |

### Landing sections (from `client/src/pages/Home.tsx`)
Audience state machine `selectedAudience: "agency" | "inhouse" | null` gates most
sections. In order:
1. Fixed navbar — logo, nav links (Features/Journey/Pricing), Get Started, Login dropdown, mobile menu.
2. Hero — headline, post-it image, two audience cards, supporting copy, "no system changes" line, "Recruiting For Retention", workflow video placeholder, second audience toggle.
3. "Get Free Access" + post-it note (agency only).
4. Features grid — 6 cards, audience-specific content.
5. Assessment CTA banner — agency (blue) / in-house (green) variants → link to assessment landings.
6. Journey — 3-phase (agency) / 2-stage (in-house).
7. Sales & Marketing Engine (agency) / Cost of Bad Hires (in-house).
8. Sales Collateral carousel (agency).
9. AI-Generated Materials.
10. Behavioral Benchmarking (accordion).
11. AI-Powered Video Interviews.
12. Fair Assessment Methodology.
13. Integrations (logo wall + cards).
14. Pricing — agency (tabbed: Retaind / Marketing) and in-house, monthly/annual toggle.
15. FAQ — accordion, expandable (3 → all), audience-specific question sets.
16. Portals — 3 cards.
17. Footer — CTA, wordmark, newsletter form, legal links.

### Backend (from `server/`)
- `POST /api/newsletter` → subscribe.
- `POST /api/assessment/submit` → `calculateScores` + `calculateRevenue` + OpenAI report (fallback on failure) + persist.
- `POST /api/inhouse-assessment/submit` → `calculateInhouseScores` + OpenAI report (fallback) + persist.
- Drizzle schema in `shared/schema.ts`; API contract in `shared/routes.ts`.
- Scoring logic is deterministic and ported verbatim.

### Assets
~70 files in `attached_assets/` (referenced via `@assets`) plus a few in `public/assets`
and a small number of external image URLs. All local assets are copied into the new
app's `public/`; external URLs are kept as-is.

## 5. Tech stack (mirror the CRM)

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, `next-themes`,
`lucide-react`, `framer-motion`, `drizzle-orm` + `zod`, `openai`. Package manager: pnpm.
Fonts: **Inter** (body / `--font-inter`) + **Outfit** (headings / `--font-outfit`) via
`next/font/google`. The CRM `src/app/globals.css` oklch token system is copied verbatim
(light + dark), giving the strict-monochrome palette.

## 6. Structure

```
src/app/
  layout.tsx              ThemeProvider + Inter/Outfit + Toaster
  globals.css             (CRM tokens, copied)
  page.tsx                Landing — composes <Navbar/> … <Footer/>
  assessment/             page.tsx + results/page.tsx
  inhouse-assessment/     page.tsx + results/page.tsx
  choose-assessment/page.tsx
  agency-recruiter/page.tsx
  in-house-hiring/page.tsx
  terms/page.tsx  privacy/page.tsx
  api/newsletter/route.ts
  api/assessment/submit/route.ts
  api/inhouse-assessment/submit/route.ts
src/components/ui/         shadcn primitives
src/components/landing/    Navbar, Hero, FeaturesGrid, AssessmentCTA, Journey,
                           SalesMarketing, BadHires, SalesCollateral, AIMaterials,
                           Benchmarking, VideoInterviews, FairAssessment,
                           Integrations, Pricing, FAQ, Portals, Footer
src/features/assessment/   questions + scoring (calculateScores, calculateRevenue,
                           calculateInhouseScores) + report prompts
src/lib/db/                schema.ts (Drizzle) + client.ts (lazy)
src/lib/storage.ts         persistence that no-ops when db is null
src/lib/ai/openai.ts       client + report generators (+ static fallback)
public/assets/…            copied images
```

The monolithic `Home` is split so each section component has a single purpose, is
independently understandable, and takes its audience/state via props.

## 7. Theme mapping — strict CRM monochrome

| Current (blue brand) | New (CRM monochrome) |
|---|---|
| `retAInd.ai` wordmark with blue "AI" | Monochrome; contrast via weight / `muted-foreground`, no color |
| Blue/indigo primary CTAs | `primary` (near-black) buttons |
| Agency-blue assessment banner | Neutral dark surface (`bg-foreground text-background` / `card`) |
| In-house-green assessment banner | Same neutral dark surface |
| Pricing blue gradients | Neutral cards; featured plan highlighted via `primary`/ring, not hue |
| Feature icon chips (violet/blue/rose) | `muted` surfaces with `foreground` icons |
| Post-it (yellow) + red play triangle | Neutral note + `foreground` play glyph |

Decorative brand colors are neutralized (confirmed by user). Dark mode is supported
via the copied tokens + `next-themes`.

## 8. Functionality (preserved as-is)

- Audience state machine gating all conditional sections — identical behavior.
- Newsletter form → `POST /api/newsletter`.
- Both multi-step quizzes submit → API computes scores (ported verbatim) → attempts
  OpenAI report → returns scores + markdown report → results pages render them.
- Pricing tabs, monthly/annual billing toggle, FAQ expand/collapse, sales-collateral
  carousel, login dropdown, mobile menu — all preserved.

## 9. Backend without DB / dummy AI

- `src/lib/db/client.ts` — constructs the Drizzle client **only** when a real
  `DATABASE_URL` is present; otherwise exports `db = null`. No connection attempt,
  no boot-time throw.
- `src/lib/storage.ts` — every write checks `db`; when `null`, it **skips persistence
  but still returns the computed objects** so the user-facing result (scores + report)
  works fully without a database.
- `src/lib/ai/openai.ts` — reads `OPENAI_API_KEY` (a dummy default lives in
  `.env.local`); report calls are wrapped in `try/catch` and fall back to the static
  report. With the dummy key, assessments return the fallback until a real key is set.
- `.env.example` documents `OPENAI_API_KEY` (required for real reports) and an
  optional, empty `DATABASE_URL`.

## 10. Verification

This is a port, not new feature work, so no TDD. Verify with:
- `pnpm typecheck` and `pnpm build` succeed.
- Dev server boots and the landing renders.
- Playwright smoke: landing renders; audience toggle reveals agency/in-house sections;
  a quiz submit returns a (fallback) report on the results page.

## 11. Open decisions — resolved

- **Scope:** Full app, backend included.
- **Theme:** Strict CRM monochrome.
- **AI provider:** OpenAI (gpt-4o), prompts ported as-is, dummy key.
- **Database:** None connected; lazy/no-op layer; user supplies `DATABASE_URL` later.
- **Repo name/location:** `retaind-landing-next`, parallel to `retaind`.
- **Decorative elements:** Neutralized to monochrome.
