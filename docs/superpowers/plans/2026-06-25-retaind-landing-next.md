# Retaind Landing — Next.js Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing Retaind marketing site as a standalone Next.js app in a new repo (`retaind-landing-next`), section- and functionality-for-functionality identical, re-skinned to the CRM's strict-monochrome theme, with the backend wired but no DB connection and a dummy OpenAI key.

**Architecture:** Next.js 16 App Router app mirroring the CRM (`retaind-next`) stack and design tokens. The 1,591-line source `Home` monolith is decomposed into focused section components driven by a single audience state machine. Backend (newsletter + two AI assessment flows) is reproduced as route handlers over a lazy data layer (`db = null` when no `DATABASE_URL`) and an OpenAI client that falls back to a static report when the key is a dummy.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, next-themes, lucide-react, framer-motion, drizzle-orm, zod, openai, pnpm. Fonts: Inter (body) + Outfit (headings).

## Global Constraints

- **Source repo (read-only reference):** `D:/Work/Retained/V2-Retaind-Landing-Page (2)/V2-Retaind-Landing-Page` — referred to below as `SRC`.
- **CRM repo (theme reference):** `D:/Work/Retained/retaind` — referred to below as `CRM`.
- **Target repo:** `D:/Work/Retained/retaind-landing-next` — all paths below are relative to this unless prefixed `SRC/` or `CRM/`.
- **Package manager:** pnpm. **Next.js:** 16.x. **React:** 19.x. **Tailwind:** v4 (CSS-first, no `tailwind.config.js`).
- **Fonts:** Inter (`--font-inter`) + Outfit (`--font-outfit`) via `next/font/google`, exactly as `CRM/src/app/layout.tsx`.
- **Theme = strict CRM monochrome.** Copy `CRM/src/app/globals.css` verbatim. When porting UI, apply this mapping (no blue/indigo/green/violet/rose/yellow brand colors survive):

  | Source (blue brand) | Target (monochrome) |
  |---|---|
  | `retAInd.ai` wordmark, blue `AI` span | All `text-foreground`; differentiate `AI` with `font-extrabold` or `text-muted-foreground`, never color |
  | `variant="accent"` buttons, `bg-blue-*`/`bg-indigo-*` CTAs | `variant="default"` (primary, near-black) |
  | `text-blue-600`, gradient `from-blue-600 to-indigo-600` text | `text-foreground` (drop gradient) |
  | Agency banner `from-blue-900…`, in-house `from-emerald-900…` | `bg-foreground text-background` (neutral dark) |
  | Pricing `from-blue-600 to-blue-700` cards | `bg-card border` cards; featured plan → `ring-2 ring-primary` + `bg-secondary` |
  | Feature icon chips `bg-violet-500`/`bg-blue-500`/`bg-rose-400` | `bg-muted` with `text-foreground` icons |
  | `bg-slate-900` dark sections | `bg-foreground text-background` |
  | `bg-slate-50`, `bg-blue-50` light sections | `bg-muted` / `bg-card` |
  | Post-it `bg-yellow-300`, red play triangle | `bg-muted border` note; `text-foreground` play glyph |
  | `text-blue-200`/`text-emerald-200` on dark | `text-background/70` |
- **Do not** modify `SRC` or `CRM`. Read from them; write only in the target repo.
- **No DB connection.** Persistence is a no-op when `db === null`. **Dummy OpenAI key** → report generation must fall back, never crash.
- **Commit after every task** with a clear message.

---

### Task 1: Scaffold the Next.js app (config, theme, layout)

**Files:**
- Create: `package.json`, `pnpm-workspace.yaml`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `.env.example`, `.env.local`, `components.json`
- Create: `src/app/globals.css` (copy of `CRM/src/app/globals.css`)
- Create: `src/app/layout.tsx`, `src/app/page.tsx` (temporary placeholder), `src/components/theme-provider.tsx`
- Create: `src/lib/utils.ts`

**Interfaces:**
- Produces: `cn(...inputs)` from `src/lib/utils.ts`; CSS tokens (`--primary`, `--muted`, `--font-inter`, `--font-outfit`, etc.); `<ThemeProvider>` wrapper.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "retaind-landing-next",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "16.2.3",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "next-themes": "^0.4.6",
    "lucide-react": "^0.453.0",
    "framer-motion": "^12.38.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.5.0",
    "tw-animate-css": "^1.4.0",
    "sonner": "^2.0.7",
    "zod": "^3.25.76",
    "drizzle-orm": "^0.45.2",
    "postgres": "^3.4.9",
    "openai": "^6.27.0",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-progress": "^1.1.3",
    "@radix-ui/react-radio-group": "^1.2.4"
  },
  "devDependencies": {
    "typescript": "5.6.3",
    "@types/node": "^20.19.27",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4.1.18",
    "@tailwindcss/postcss": "^4.1.18",
    "@playwright/test": "^1.59.1"
  },
  "packageManager": "pnpm@10.28.2"
}
```

- [ ] **Step 2: Create config files**

`tsconfig.json` (copy `CRM/tsconfig.json`; ensure `"paths": { "@/*": ["./src/*"] }` and `"moduleResolution": "bundler"`).

`next.config.ts`:
```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
};
export default nextConfig;
```

`postcss.config.mjs`:
```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

`pnpm-workspace.yaml`: `packages: []`

`.gitignore`: include `node_modules`, `.next`, `.env.local`, `out`, `playwright-report`, `test-results`.

`components.json` (copy `CRM/components.json`).

- [ ] **Step 3: Copy theme + env**

Copy `CRM/src/app/globals.css` → `src/app/globals.css` verbatim.

`.env.example`:
```
# Required for real AI assessment reports; with a dummy value the app returns the static fallback report.
OPENAI_API_KEY=sk-dummy-replace-me
# Optional. Leave empty to run with no database (persistence is skipped).
DATABASE_URL=
```
`.env.local`: same as `.env.example` (dummy key, empty DATABASE_URL).

- [ ] **Step 4: Create `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 5: Create `theme-provider.tsx` and `layout.tsx`**

`src/components/theme-provider.tsx`:
```tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

`src/app/layout.tsx` (adapt `CRM/src/app/layout.tsx`; the marketing site scrolls, so do NOT use the CRM's `overflow-hidden`/`h-dvh` body):
```tsx
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Retaind.ai - AI-Powered Recruitment Platform | Win Retained Business",
  description: "Hire with confidence. Retain with certainty.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster position="top-right" closeButton />
      </body>
    </html>
  );
}
```

`src/app/page.tsx` (temporary placeholder, replaced in Task 11):
```tsx
export default function Home() {
  return <main className="p-10 font-heading text-3xl font-bold">retaind-landing-next</main>;
}
```

- [ ] **Step 6: Install and verify build**

Run: `pnpm install` then `pnpm build`
Expected: build succeeds. (The `Toaster` import resolves after Task 2 adds `src/components/ui/sonner.tsx`; if building before Task 2, temporarily comment the Toaster import/usage, then restore.)

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next 16 app with CRM theme and layout"
```

---

### Task 2: shadcn UI primitives + assets

**Files:**
- Create under `src/components/ui/`: `button.tsx`, `card.tsx`, `accordion.tsx`, `input.tsx`, `label.tsx`, `dropdown-menu.tsx`, `progress.tsx`, `radio-group.tsx`, `badge.tsx`, `sonner.tsx`
- Create: `public/assets/` (copied images), `src/components/landing/section.tsx`
- Source: copy each primitive from `CRM/src/components/ui/<name>.tsx` (already monochrome-themed). For any not present in CRM, copy from `SRC/client/src/components/ui/<name>.tsx`.

**Interfaces:**
- Produces: `Button` (variants `default | secondary | outline | ghost | destructive`), `Card`/`CardHeader`/`CardTitle`/`CardContent`, `Accordion*`, `Input`, `Label`, `DropdownMenu*`, `Progress`, `RadioGroup`/`RadioGroupItem`, `Badge`, `Toaster`, and `Section`/`SectionHeader`/`SectionBadge`.

- [ ] **Step 1: Copy UI primitives from the CRM**

For each of `button, card, accordion, input, label, dropdown-menu, progress, radio-group, badge, sonner`: copy `CRM/src/components/ui/<name>.tsx` → `src/components/ui/<name>.tsx`. These use `@/lib/utils` `cn` and the monochrome tokens already. **Note:** the source landing uses `variant="accent"` on `Button`; the CRM `button.tsx` has no `accent` variant — that is intentional (the mapping turns those into `default`).

- [ ] **Step 2: Create the `Section` primitive**

Port `SRC/client/src/components/ui/section.tsx` to `src/components/landing/section.tsx`, replacing brand colors per the mapping (the `SectionBadge` blue pill → `bg-muted text-muted-foreground`):
```tsx
import { cn } from "@/lib/utils";

export function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
export function SectionHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("max-w-3xl mx-auto text-center mb-12 [&>h2]:font-heading [&>h2]:font-bold", className)}>{children}</div>;
}
export function SectionBadge({ children }: { children: React.ReactNode }) {
  return <span className="inline-block px-3 py-1 mb-4 rounded-full bg-muted text-muted-foreground text-sm font-semibold tracking-wide uppercase">{children}</span>;
}
```
(Confirm the exact spacing/typography against the source `section.tsx`; keep its layout, swap only colors.)

- [ ] **Step 3: Copy image assets**

Copy all of `SRC/attached_assets/*` and `SRC/client/public/assets/*` into `public/assets/`. In ported components, every `@assets/<file>` import and `/assets/<file>` URL becomes `/assets/<file>`.

Run: `ls public/assets | wc -l` — Expected: ≥ 70 files.

- [ ] **Step 4: Verify build**

Run: `pnpm build` — Expected: success. Restore the `Toaster` import in `layout.tsx` if it was commented in Task 1.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add shadcn primitives, Section, and image assets"
```

---

### Task 3: Data layer — Drizzle schema + lazy client + no-op storage

**Files:**
- Create: `src/lib/db/schema.ts`, `src/lib/db/client.ts`, `src/lib/storage.ts`
- Test: `src/lib/__tests__/storage.test.ts` (vitest optional; if vitest not installed, skip the test file and verify via typecheck)

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `db` (Drizzle instance or `null`) from `src/lib/db/client.ts`.
  - schema tables + insert types from `src/lib/db/schema.ts` (port `SRC/shared/schema.ts` verbatim — table defs, `createInsertSchema` zod schemas, and exported types).
  - `storage` object from `src/lib/storage.ts` implementing the same method names as `SRC/server/storage.ts`: `subscribeToNewsletter`, `createAssessmentUser`, `createAssessmentResponses`, `createAssessmentScore`, `createAssessmentReport`, `createInhouseAssessmentUser`, `createInhouseAssessmentResponses`, `createInhouseAssessmentScore`, `createInhouseAssessmentReport`.

- [ ] **Step 1: Port schema**

Copy `SRC/shared/schema.ts` → `src/lib/db/schema.ts` verbatim (it is portable Drizzle pg-core + drizzle-zod). Fix any import paths if needed.

- [ ] **Step 2: Lazy client**

`src/lib/db/client.ts`:
```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
// No DB configured (or dummy) → run without persistence. Never throw at import time.
const sql = url ? postgres(url) : null;
export const db = sql ? drizzle(sql, { schema }) : null;
```

- [ ] **Step 3: No-op-capable storage**

`src/lib/storage.ts` — mirror `SRC/server/storage.ts` method-for-method, but guard every DB call on `db`. When `db === null`, skip persistence and return a synthesized object so callers still work. Example shape (apply the same pattern to all methods):
```ts
import { db } from "./db/client";
import {
  newsletterSubscribers, assessmentUsers, assessmentResponses, assessmentScores, assessmentReports,
  inhouseAssessmentUsers, inhouseAssessmentResponses, inhouseAssessmentScores, inhouseAssessmentReports,
  type InsertSubscriber, type InsertAssessmentUser, type InsertAssessmentResponse, type InsertAssessmentScore,
  type InsertAssessmentReport, type AssessmentUser, type AssessmentScore, type AssessmentReport,
  type InsertInhouseAssessmentUser, type InsertInhouseAssessmentResponse, type InsertInhouseAssessmentScore,
  type InsertInhouseAssessmentReport, type InhouseAssessmentUser, type InhouseAssessmentScore, type InhouseAssessmentReport,
} from "./db/schema";

export const storage = {
  async subscribeToNewsletter(sub: InsertSubscriber): Promise<void> {
    if (!db) return;
    await db.insert(newsletterSubscribers).values(sub).onConflictDoNothing();
  },
  async createAssessmentUser(user: InsertAssessmentUser): Promise<AssessmentUser> {
    if (!db) return { id: 0, ...user, createdAt: new Date() } as AssessmentUser;
    const [created] = await db.insert(assessmentUsers).values(user).returning();
    return created;
  },
  async createAssessmentResponses(responses: InsertAssessmentResponse[]): Promise<void> {
    if (!db || responses.length === 0) return;
    await db.insert(assessmentResponses).values(responses);
  },
  async createAssessmentScore(score: InsertAssessmentScore): Promise<AssessmentScore> {
    if (!db) return { id: 0, ...score } as AssessmentScore;
    const [created] = await db.insert(assessmentScores).values(score).returning();
    return created;
  },
  async createAssessmentReport(report: InsertAssessmentReport): Promise<AssessmentReport> {
    if (!db) return { id: 0, ...report, createdAt: new Date() } as AssessmentReport;
    const [created] = await db.insert(assessmentReports).values(report).returning();
    return created;
  },
  // ...repeat the identical pattern for the four inhouse* methods, returning synthesized
  //    objects ({ id: 0, ...input, createdAt: new Date() }) when db is null.
};
```
Implement the four `inhouse*` methods following the same guard pattern (do not leave them as comments).

- [ ] **Step 4: Verify**

Run: `pnpm typecheck` — Expected: no errors. (Synthesized return objects must satisfy the schema types; adjust fields to match `schema.ts` exactly — e.g. include every non-null column with a default.)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: lazy Drizzle client + no-op-capable storage layer"
```

---

### Task 4: AI layer — OpenAI client + report generators + fallback

**Files:**
- Create: `src/lib/ai/openai.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `generateReport(responses, scores, revenue, userName): Promise<string>`
  - `generateInhouseReport(responses, scores, userName): Promise<string>`
  - `generateFallbackReport(name, scores, revenue): string`
  - `generateInhouseFallbackReport(name, scores): string`
  - types `QuestionResponse = { questionId: string; responseValue: string }`

- [ ] **Step 1: Port the AI module**

Create `src/lib/ai/openai.ts` by porting from `SRC/server/routes.ts`:
- The OpenAI client construction (lines ~9-16), but make it resilient: build the client lazily so a dummy/missing key never throws at import:
```ts
import OpenAI from "openai";
let _client: OpenAI | null = null;
function client(): OpenAI {
  if (!_client) _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "sk-dummy" });
  return _client;
}
```
- Copy `generateReport` (SRC lines ~254-331), `generateInhouseReport` (~476-567), `generateFallbackReport` (~736-769), and `generateInhouseFallbackReport` (~569-605) **verbatim** (prompts unchanged), changing `openai.chat...` to `client().chat...`. Export all four plus the `QuestionResponse` type.

Because the key is a dummy, `client().chat.completions.create(...)` will reject; callers (Task 6) wrap it in `try/catch` and use the fallback.

- [ ] **Step 2: Verify**

Run: `pnpm typecheck` — Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: OpenAI report generators with static fallbacks"
```

---

### Task 5: Assessment scoring logic + unit tests

**Files:**
- Create: `src/features/assessment/scoring.ts`
- Test: `src/features/assessment/__tests__/scoring.test.ts`
- Modify: `package.json` (add `vitest` dev dep + `"test": "vitest run"` script), create `vitest.config.ts`

**Interfaces:**
- Consumes: `QuestionResponse` (re-declare locally or import from `@/lib/ai/openai`).
- Produces:
  - `calculateScores(responses): { experienceScore, commercialScore, ambitionScore, readinessScore, barrierScore, totalScore, category }`
  - `calculateRevenue(responses, scores): { currentRevenueEstimate, hybridRevenueEstimate, scaledRevenueEstimate, ownerTeamRevenueEstimate, avgRetainedFee }`
  - `calculateInhouseScores(responses): { roleDefinitionScore, candidateAttractionScore, sourcingStrengthScore, candidateEvaluationScore, decisionQualityScore, totalScore, category, topWeaknesses }`

- [ ] **Step 1: Port scoring functions**

Copy `calculateScores` (SRC `server/routes.ts` ~23-180), `calculateRevenue` (~182-252), and `calculateInhouseScores` (~333-474) **verbatim** into `src/features/assessment/scoring.ts`. These are pure functions — no changes beyond `export`.

- [ ] **Step 2: Add vitest**

Add to `package.json` devDeps `"vitest": "^2"` and script `"test": "vitest run"`. Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
export default defineConfig({ test: { environment: "node" } });
```
Run: `pnpm install`.

- [ ] **Step 3: Write tests (deterministic golden values)**

`src/features/assessment/__tests__/scoring.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { calculateScores, calculateRevenue, calculateInhouseScores } from "../scoring";

const top = [
  ["q1","15+ years"],["q2","Technology Services / SaaS / Cyber"],["q3","Agency owner / founder"],
  ["q4","50+"],["q5","£200k+"],["q6","25%+"],["q7","76–100%"],["q8","More than 50%"],
  ["q9","£500k+"],["q10","Significantly grow my revenue"],["q11","20+"],["q12","Significant time and effort"],
  ["q13","10"],["q14","Yes, regularly"],["q15","10"],["q16","Yes, I use a structured methodology"],
  ["q17","None"],["q18","retained"],["q19","guarantee"],["q20","retainer"],
].map(([questionId, responseValue]) => ({ questionId, responseValue }));

describe("calculateScores", () => {
  it("scores a top-tier recruiter as a Retained Leader with maxed dimensions", () => {
    const s = calculateScores(top);
    expect(s.experienceScore).toBe(20);
    expect(s.commercialScore).toBe(20);
    expect(s.totalScore).toBeGreaterThanOrEqual(81);
    expect(s.category).toBe("Retained Leader");
  });
  it("clamps each dimension at 20 and total at 100", () => {
    const s = calculateScores(top);
    for (const k of ["experienceScore","commercialScore","ambitionScore","readinessScore","barrierScore"] as const) {
      expect(s[k]).toBeLessThanOrEqual(20);
    }
    expect(s.totalScore).toBeLessThanOrEqual(100);
  });
});

describe("calculateRevenue", () => {
  it("returns positive monotonic estimates (current ≤ scaled)", () => {
    const s = calculateScores(top);
    const r = calculateRevenue(top, s);
    expect(r.currentRevenueEstimate).toBeGreaterThan(0);
    expect(r.scaledRevenueEstimate).toBeGreaterThan(0);
    expect(r.avgRetainedFee).toBeGreaterThan(0);
  });
});

describe("calculateInhouseScores", () => {
  it("categorises an all-best in-house responder and returns ≤5 weaknesses", () => {
    const resp = [
      ["q5","10"],["q6","Almost always"],["q7","We define behavioural success factors and outcomes before recruiting"],
      ["q8","10"],["q9","Highly tailored role marketing campaigns"],["q10","10"],
      ["q11","Multi-channel campaigns"],["q12","10"],["q13","Targeted multi-channel campaign sourcing"],
      ["q14","Always"],["q15","10"],["q16","Behavioural benchmarks & questionnaires, Final Fit & Risk analysis"],
      ["q17","10"],["q18","Fully structured and aligned to the benchmark and early assessment outputs"],
      ["q19","Almost always"],["q20","Always structured and evidence-led"],
    ].map(([questionId, responseValue]) => ({ questionId, responseValue }));
    const s = calculateInhouseScores(resp);
    expect(s.totalScore).toBeLessThanOrEqual(100);
    expect(s.category).toBe("Hiring Leader");
    expect(s.topWeaknesses.length).toBeLessThanOrEqual(5);
  });
});
```

- [ ] **Step 4: Run tests**

Run: `pnpm test` — Expected: all pass. If a golden assertion is off, correct the *test expectation* to match the ported (unchanged) function — never edit the scoring logic.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: port assessment scoring with unit tests"
```

---

### Task 6: API route handlers + client API helper

**Files:**
- Create: `src/lib/api-contract.ts` (port `SRC/shared/routes.ts`)
- Create: `src/app/api/newsletter/route.ts`, `src/app/api/assessment/submit/route.ts`, `src/app/api/inhouse-assessment/submit/route.ts`
- Create: `src/lib/client-api.ts` (browser fetch helpers + result types)

**Interfaces:**
- Consumes: `storage` (Task 3), scoring fns (Task 5), report fns (Task 4), zod schemas (Task 3 schema + this task's contract).
- Produces:
  - Route handlers matching `SRC/server/routes.ts` behavior and response shapes.
  - `subscribeNewsletter(email)`, `submitAssessment(payload)`, `submitInhouseAssessment(payload)` from `client-api.ts`, plus the result types the results pages consume.

- [ ] **Step 1: Port the API contract**

Copy `SRC/shared/routes.ts` → `src/lib/api-contract.ts`, fixing the schema import to `./db/schema`.

- [ ] **Step 2: Newsletter route**

`src/app/api/newsletter/route.ts`:
```ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { insertSubscriberSchema } from "@/lib/db/schema";
import { storage } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const input = insertSubscriberSchema.parse(await req.json());
    await storage.subscribeToNewsletter(input);
    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ message: err.errors[0].message }, { status: 400 });
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
```

- [ ] **Step 3: Assessment submit route**

`src/app/api/assessment/submit/route.ts` — port the `assessment.submit` handler (SRC `server/routes.ts` ~672-731): parse with `assessmentSubmitSchema`, `createAssessmentUser`, `calculateScores`, `calculateRevenue`, persist responses + score, then `try generateReport / catch → generateFallbackReport`, persist report, return `{ userId, scores, revenue, report }`. Use `NextResponse.json(...)`. Wrap the whole body in `try/catch` returning 400 on `ZodError`, 500 otherwise — identical to source.

- [ ] **Step 4: In-house submit route**

`src/app/api/inhouse-assessment/submit/route.ts` — port the `inhouseAssessment.submit` handler (SRC ~625-670) the same way using `inhouseAssessmentSubmitSchema`, `calculateInhouseScores`, `generateInhouseReport`/`generateInhouseFallbackReport`, returning `{ userId, scores, report }`.

- [ ] **Step 5: Client API helper**

`src/lib/client-api.ts` — typed `fetch` wrappers posting to the three routes, returning parsed JSON. Export result types `AssessmentResult` and `InhouseAssessmentResult` matching the route response shapes (inferred from the persisted score record + `revenue`/`report`), for the results pages.

- [ ] **Step 6: Verify (dummy key path)**

Run: `pnpm build` then `pnpm dev` in background. With curl:
```bash
curl -s -X POST localhost:3000/api/newsletter -H 'content-type: application/json' -d '{"email":"a@b.co"}'
```
Expected: `{"message":"Subscribed successfully"}` (no DB, no crash).
Then POST a minimal assessment payload and expect a 201 with a `report` string (the **fallback** report, since the key is dummy). Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: newsletter + assessment API routes over no-op storage and fallback AI"
```

---

### Task 7: Landing — Navbar + Hero

**Files:**
- Create: `src/components/landing/navbar.tsx`, `src/components/landing/hero.tsx`
- Create: `src/components/landing/types.ts` (`export type Audience = "agency" | "inhouse" | null;`)

**Interfaces:**
- Consumes: `Button`, `DropdownMenu*`, `Card`, lucide icons, `Audience`.
- Produces: `<Navbar mobileMenuOpen … onSelectAudience … />` and `<Hero selectedAudience onSelectAudience />`. Both are `"use client"`. `onSelectAudience(a: Audience)` sets state in the page container (Task 11).

- [ ] **Step 1: Port Navbar**

Port `SRC/client/src/pages/Home.tsx` lines 207-313 (header + mobile menu) into `navbar.tsx`. Replace `wouter`'s `Link` with `next/link` (`import Link from "next/link"`). Apply theme mapping: wordmark monochrome (`ret` + `AI` `font-extrabold` + `nd.ai`, all `text-foreground`), `variant="accent"` → `variant="default"`. Keep nav links, Login dropdown (Agency/In-House/Candidate), and the `onClick` that defaults audience to `agency`. Accept `mobileMenuOpen`, `setMobileMenuOpen`, `selectedAudience`, `onSelectAudience` as props.

- [ ] **Step 2: Port Hero**

Port lines 315-452 into `hero.tsx`. Replace `@assets/...` imports with `<img src="/assets/<file>" />` (or `next/image`). Background image, headline (drop the blue→indigo gradient → `text-foreground`), post-it image, the two audience `Card`s (buttons `variant="default"`), "no system changes" copy, "Recruiting For Retention", the workflow video placeholder (red play triangle → `text-foreground` glyph), and the second audience toggle row. Keep all `onSelectAudience` + `scrollIntoView("features")` behaviors. Keep `framer-motion` animations.

- [ ] **Step 3: Verify visually**

Temporarily render `<Navbar/>` + `<Hero/>` in `src/app/page.tsx` with local state. Run `pnpm dev`, load `localhost:3000`, screenshot. Expected: monochrome navbar + hero, no blue. Revert the temporary page edit (Task 11 owns it) or leave a minimal harness.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: monochrome Navbar and Hero sections"
```

---

### Task 8: Landing — Features grid, Assessment CTA, Journey

**Files:**
- Create: `src/components/landing/features-grid.tsx`, `src/components/landing/assessment-cta.tsx`, `src/components/landing/journey.tsx`, `src/components/landing/free-access.tsx`

**Interfaces:**
- Consumes: `Section*`, `Card`, `Accordion`-not-needed-here, lucide icons, `Audience`.
- Produces: `<FreeAccess/>` (agency post-it), `<FeaturesGrid selectedAudience/>`, `<AssessmentCta selectedAudience/>`, `<Journey selectedAudience/>`. The `agencyFeatures`/`inhouseFeatures` arrays move into `features-grid.tsx`; icon chips → `bg-muted`.

- [ ] **Step 1: Free Access + post-it**

Port lines 457-496 into `free-access.tsx` (render only when agency). Post-it yellow → `bg-muted border`, keep the rotate/clip styling but neutral.

- [ ] **Step 2: Features grid**

Port lines 124-200 (the `agencyFeatures`/`inhouseFeatures` data) + 500-536 (render) into `features-grid.tsx`. `feature.iconBg` values all become `bg-muted`; icons `text-foreground`.

- [ ] **Step 3: Assessment CTA**

Port lines 538-632 into `assessment-cta.tsx`. Both agency (blue) and in-house (green) banners → `bg-foreground text-background`. `Link` → `next/link` to `/agency-recruiter` and `/in-house-hiring`. Keep the badge, headline, sub copy, CTA button (`bg-background text-foreground`), and the "5 minutes / Personalised report" row.

- [ ] **Step 4: Journey**

Port lines 634-771 into `journey.tsx`: agency 3-phase (shown when `agency` or `null`) and in-house 2-stage (shown when `inhouse`). Phase number circles `bg-primary text-primary-foreground`; connector line `bg-border`; bullet dots `bg-foreground`.

- [ ] **Step 5: Verify + commit**

Run `pnpm build` (Expected: success), then:
```bash
git add -A
git commit -m "feat: Features, Free Access, Assessment CTA, Journey sections"
```

---

### Task 9: Landing — mid sections (agency/in-house content)

**Files:**
- Create: `src/components/landing/sales-marketing.tsx`, `bad-hires.tsx`, `sales-collateral.tsx`, `ai-materials.tsx`, `benchmarking.tsx`, `video-interviews.tsx`, `fair-assessment.tsx`, `integrations.tsx`

**Interfaces:**
- Consumes: `Section*`, `Card`, `Accordion*`, lucide icons, `Audience`.
- Produces: the eight section components, each `"use client"` where it holds state (only `sales-collateral` needs `currentSlide` state).

- [ ] **Step 1: Sales & Marketing Engine (agency/null)**

Port lines 773-820 → `sales-marketing.tsx`. `text-accent` icons → `text-foreground`; gradient backdrop → `bg-muted`.

- [ ] **Step 2: Cost of Bad Hires (in-house)**

Port lines 822-874 → `bad-hires.tsx`. Red cards → `bg-muted border`; the blue "retAInd Solution" callout → `bg-secondary border`, wordmark monochrome.

- [ ] **Step 3: Sales Collateral carousel (agency/null)**

Port lines 876-949 → `sales-collateral.tsx`. Holds `currentSlide` state; the six `slide-0X` images come from `/assets/`. Dots active state `bg-foreground` vs `bg-muted-foreground/40`.

- [ ] **Step 4: AI-Generated Materials**

Port lines 951-989 → `ai-materials.tsx`. `bg-slate-900 text-white` → `bg-foreground text-background`; check circles `bg-background text-foreground`.

- [ ] **Step 5: Benchmarking + Video Interviews + Fair Assessment + Integrations**

Port lines 991-1033 → `benchmarking.tsx` (accordion), 1035-1071 → `video-interviews.tsx`, 1073-1086 → `fair-assessment.tsx` (`bg-blue-900` → `bg-foreground text-background`), 1088-1130 → `integrations.tsx` (logo wall neutral). Apply the mapping throughout; replace external Unsplash/cloudfront image URLs as-is (keep the URLs).

- [ ] **Step 6: Verify + commit**

Run `pnpm build` — Expected: success.
```bash
git add -A
git commit -m "feat: mid landing sections (marketing, bad-hires, collateral, materials, benchmarking, interviews, fair assessment, integrations)"
```

---

### Task 10: Landing — Pricing, FAQ, Portals, Footer

**Files:**
- Create: `src/components/landing/pricing.tsx`, `faq.tsx`, `portals.tsx`, `footer.tsx`
- Create: `src/components/landing/faq-data.ts` (the `agencyFaqs`/`inhouseFaqs` arrays, lines 80-108)

**Interfaces:**
- Consumes: `Section*`, `Accordion*`, `Button`, `Input`, `Card`, `Audience`, `subscribeNewsletter` (Task 6).
- Produces: `<Pricing selectedAudience/>` (holds `agencyPricingTab`, `billingPeriod`), `<Faq selectedAudience/>` (holds `faqExpanded`), `<Portals/>`, `<Footer selectedAudience/>` (holds newsletter `email` state).

- [ ] **Step 1: Pricing**

Port lines 1132-1456 → `pricing.tsx`. Agency (tabbed Retaind/Marketing) + in-house variants, monthly/annual toggle. All blue gradient cards → `bg-card border`; the featured/subscription plan → `ring-2 ring-primary bg-secondary`; toggles use `bg-primary text-primary-foreground` for the active pill. Keep `agencyPricingTab` and `billingPeriod` state and the plan data arrays verbatim (text unchanged).

- [ ] **Step 2: FAQ**

Move the FAQ arrays (lines 80-108) → `faq-data.ts`. Port lines 1458-1503 → `faq.tsx`: audience-specific set, accordion, expand 3→all via `faqExpanded`.

- [ ] **Step 3: Portals**

Port lines 1505-1531 → `portals.tsx`. Icon circles `bg-muted`, icons `text-foreground`.

- [ ] **Step 4: Footer + newsletter**

Port lines 1536-1587 → `footer.tsx`. `bg-slate-900 text-white` → `bg-foreground text-background`. Newsletter form posts via `subscribeNewsletter(email)` (Task 6) and toasts via `sonner`. `Link` → `next/link` for `/privacy`, `/terms`. Wordmark monochrome.

- [ ] **Step 5: Verify + commit**

Run `pnpm build` — Expected: success.
```bash
git add -A
git commit -m "feat: Pricing, FAQ, Portals, Footer sections"
```

---

### Task 11: Landing page composition (audience state machine)

**Files:**
- Create: `src/components/landing/landing-page.tsx` (client component holding all shared state)
- Modify: `src/app/page.tsx` (render `<LandingPage/>`)

**Interfaces:**
- Consumes: every section component from Tasks 7-10.
- Produces: the assembled `/` route. Holds `mobileMenuOpen`, `selectedAudience`, and composes sections in the exact source order, replicating every `selectedAudience`-gating and `AnimatePresence` wrapper from `Home.tsx`.

- [ ] **Step 1: Build the container**

`landing-page.tsx` (`"use client"`): hold `selectedAudience`/`mobileMenuOpen` state, render in source order:
`<Navbar/>`, `<Hero/>`, `<div id="features"/>`, `{agency && <FreeAccess/>}`, then `{selectedAudience && <> … </>}` wrapping `<FeaturesGrid/>`, `<AssessmentCta/>`, `<Journey/>`, `<SalesMarketing/>`/`<BadHires/>`, `<SalesCollateral/>`, `<AiMaterials/>`, `<Benchmarking/>`, `<VideoInterviews/>`, `<FairAssessment/>`, `<Integrations/>`, `<Pricing/>`, `<Faq/>`, `<Portals/>` — matching the exact agency/in-house/null conditions in `Home.tsx` (lines 454-1534). `<Footer/>` always renders. Preserve `AnimatePresence mode="wait"` wrappers.

- [ ] **Step 2: Wire the page**

`src/app/page.tsx`:
```tsx
import { LandingPage } from "@/components/landing/landing-page";
export default function Home() {
  return <LandingPage />;
}
```

- [ ] **Step 3: Verify against source behavior**

Run `pnpm dev`. Load `/`. Screenshot the initial state (agency+null sections visible). Click "For In-House Teams" → screenshot (in-house sections swap in). Confirm the gating matches `Home.tsx`. Expected: monochrome throughout, no blue/green, all sections present.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: compose landing page with audience state machine"
```

---

### Task 12: Assessment landing pages + pathway

**Files:**
- Create: `src/app/agency-recruiter/page.tsx`, `src/app/in-house-hiring/page.tsx`, `src/app/choose-assessment/page.tsx`
- Create supporting components as needed under `src/features/assessment/`

**Interfaces:**
- Consumes: UI primitives, `next/link`, `Audience` not required here.
- Produces: three routes mirroring `SRC` `AssessmentLanding.tsx` (exports `AgencyLanding` + `InHouseLanding`) and `AssessmentPathway.tsx`.

- [ ] **Step 1: Agency + In-House landing**

Port `SRC/client/src/pages/AssessmentLanding.tsx` (530 lines; two exports). Split into `agency-recruiter/page.tsx` (`AgencyLanding`) and `in-house-hiring/page.tsx` (`InHouseLanding`), sharing any common subcomponent. Apply the theme mapping. `Link`→`next/link`; CTA routes to `/assessment` and `/inhouse-assessment`.

- [ ] **Step 2: Pathway**

Port `SRC/client/src/pages/AssessmentPathway.tsx` → `choose-assessment/page.tsx`. Mapping applied.

- [ ] **Step 3: Verify + commit**

Run `pnpm build`. Load each route, screenshot. Expected: monochrome, parity with source layout.
```bash
git add -A
git commit -m "feat: assessment landing + pathway pages"
```

---

### Task 13: Agency assessment quiz + results

**Files:**
- Create: `src/app/assessment/page.tsx`, `src/app/assessment/results/page.tsx`
- Create: `src/features/assessment/agency-questions.ts` (question data extracted from `Assessment.tsx`)

**Interfaces:**
- Consumes: `submitAssessment` + `AssessmentResult` (Task 6), UI primitives, `Progress`, `RadioGroup`.
- Produces: the multi-step agency quiz and its results renderer.

- [ ] **Step 1: Port the quiz**

Port `SRC/client/src/pages/Assessment.tsx` (651 lines) → `assessment/page.tsx`. Extract the question array into `agency-questions.ts`. Replace `wouter` navigation with `next/navigation` (`useRouter().push("/assessment/results")`) and the react-query mutation with a direct `submitAssessment(payload)` call (or keep TanStack Query if you add it — simpler to use the plain helper). Persist the returned result to `sessionStorage` for the results page to read (the source passes it via query client/router state). Apply theme mapping.

- [ ] **Step 2: Port results**

Port `SRC/client/src/pages/AssessmentResults.tsx` (528 lines) → `assessment/results/page.tsx`. Read the result from `sessionStorage`; render scores, revenue estimates, and the markdown `report`. If markdown rendering was done by a lib in source, replicate it (or render with a minimal markdown component). Mapping applied (charts/score bars use neutral tokens / `--chart-*`).

- [ ] **Step 3: Verify + commit**

Run `pnpm dev`. Complete the quiz end-to-end; confirm the results page shows the (fallback) report. Screenshot.
```bash
git add -A
git commit -m "feat: agency assessment quiz + results"
```

---

### Task 14: In-house assessment quiz + results

**Files:**
- Create: `src/app/inhouse-assessment/page.tsx`, `src/app/inhouse-assessment/results/page.tsx`
- Create: `src/features/assessment/inhouse-questions.ts`

**Interfaces:**
- Consumes: `submitInhouseAssessment` + `InhouseAssessmentResult` (Task 6), UI primitives.
- Produces: the in-house quiz + results, mirroring Task 13.

- [ ] **Step 1: Port quiz**

Port `SRC/client/src/pages/InHouseAssessment.tsx` (687 lines) → `inhouse-assessment/page.tsx`, extracting questions to `inhouse-questions.ts`. Same navigation/submit/sessionStorage pattern as Task 13. Mapping applied.

- [ ] **Step 2: Port results**

Port `SRC/client/src/pages/InHouseAssessmentResults.tsx` (426 lines) → `inhouse-assessment/results/page.tsx`. Same approach as Task 13 results.

- [ ] **Step 3: Verify + commit**

Run `pnpm dev`. Complete the in-house quiz; confirm results render. Screenshot.
```bash
git add -A
git commit -m "feat: in-house assessment quiz + results"
```

---

### Task 15: Terms, Privacy, not-found

**Files:**
- Create: `src/app/terms/page.tsx`, `src/app/privacy/page.tsx`, `src/app/not-found.tsx`

**Interfaces:**
- Consumes: UI primitives, `next/link`.
- Produces: three static routes.

- [ ] **Step 1: Port legal + 404**

Port `SRC/client/src/pages/Terms.tsx` (183), `Privacy.tsx` (586), and `not-found.tsx` (21) into the respective App Router files. Mapping applied; `Link`→`next/link`.

- [ ] **Step 2: Verify + commit**

Run `pnpm build`. Load `/terms`, `/privacy`, and a bad URL. Expected: render correctly.
```bash
git add -A
git commit -m "feat: terms, privacy, and 404 pages"
```

---

### Task 16: Final verification (typecheck, build, Playwright smoke)

**Files:**
- Create: `playwright.config.ts`, `e2e/smoke.spec.ts`

**Interfaces:**
- Consumes: the full running app.

- [ ] **Step 1: Playwright config**

`playwright.config.ts`:
```ts
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  webServer: { command: "pnpm dev", url: "http://localhost:3000", reuseExistingServer: true, timeout: 120_000 },
  use: { baseURL: "http://localhost:3000" },
});
```

- [ ] **Step 2: Smoke test**

`e2e/smoke.spec.ts`:
```ts
import { test, expect } from "@playwright/test";

test("landing renders and audience toggle reveals sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Recruiting For Retention")).toBeVisible();
  await page.getByRole("button", { name: /For In-House Teams/i }).click();
  await expect(page.getByRole("heading", { name: /Streamlined Hiring Workflow|Two-Stage Hiring Process/i })).toBeVisible();
});

test("newsletter endpoint works without a database", async ({ request }) => {
  const res = await request.post("/api/newsletter", { data: { email: "smoke@test.co" } });
  expect(res.status()).toBe(201);
});

test("agency assessment submit returns a report (fallback)", async ({ request }) => {
  const responses = Array.from({ length: 20 }, (_, i) => ({ questionId: `q${i + 1}`, responseValue: "test" }));
  const res = await request.post("/api/assessment/submit", {
    data: { user: { name: "Smoke", email: "smoke@test.co" }, responses },
  });
  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(typeof body.report).toBe("string");
  expect(body.report.length).toBeGreaterThan(0);
});
```
(Adjust the assessment `user` payload fields to match `insertAssessmentUserSchema` exactly.)

- [ ] **Step 3: Run the full gate**

Run: `pnpm typecheck` — Expected: clean.
Run: `pnpm build` — Expected: success.
Run: `pnpm exec playwright install --with-deps chromium` then `pnpm exec playwright test` — Expected: 3 passed.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "test: playwright smoke for landing, newsletter, and assessment"
```

---

## Self-Review notes

- **Spec coverage:** §4 pages → Tasks 11-15; §4 sections → Tasks 7-10; §4 backend → Tasks 3,4,6; §5 stack → Task 1; §6 structure → all; §7 theme map → Global Constraints (applied per UI task); §8 functionality → Tasks 7-14; §9 no-DB/dummy AI → Tasks 3,4,6; §10 verification → Task 16.
- **No placeholders:** UI port steps reference exact `SRC` files and line ranges plus the verbatim theme-map; backend steps include full code. The four `inhouse*` storage methods and the two submit routes are explicitly "implement, do not stub."
- **Type consistency:** storage method names match `SRC/server/storage.ts`; scoring return shapes match the route handlers' usage; `Audience` type shared via `landing/types.ts`; client-api result types feed the results pages.
