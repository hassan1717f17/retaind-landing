# Assessment → Lead Capture — Design

**Date:** 2026-06-29
**Status:** Approved (design)

## Problem

The landing app runs two assessments (Recruiter Readiness / "agency", and In-House
Hiring). On submit it generates an AI report and is meant to persist the user's data.
Two gaps:

1. The persistence tables do not exist in the shared database (`retaind_dev`) — every
   `storage.*` call silently no-ops because `db` is `null` (no `DATABASE_URL`) and,
   even with a URL set, the tables were never created.
2. High-intent assessment completers should appear as **leads** in the friend's Admin
   Control Centre (`/app/admin/leads` in the main `retaind` app), which is currently
   **mock-driven** — `adminLeadsApi.getLeads()` returns an in-memory `MOCK_LEADS`
   array and there is no `lead` table in the database yet.

Both apps share one Postgres database: `postgresql://postgres:password@localhost:5432/retaind_dev`.

## Goals

- Create the landing app's own persistence tables in `retaind_dev`.
- Create the shared `lead` table (from the friend's finalized schema) and write a lead
  row on every assessment submission, so completers surface in the admin leads view.

## Non-goals

- Changing the friend's admin UI (he wires `adminLeadsApi` to the real table and adds
  the new `source` values himself — see Coordination).
- Deduplicating leads, lead activity history, or any field beyond his §13.3 data model.

## Decisions (from brainstorming)

| Decision | Choice |
|---|---|
| `lead` table ownership | **This landing app creates it now** from the friend's exact schema; landing inserts, friend reads. Single owner of the live table. |
| Source values | Two: `agency_assessment`, `inhouse_assessment`. |
| Duplicate submissions | **One lead per submission, no dedup.** |
| Migration mechanism | Idempotent `CREATE TABLE IF NOT EXISTS` SQL, run by a `db:migrate` script. **Not** `drizzle-kit push`. |

### Why not `drizzle-kit push`

`retaind_dev` already holds ~35 tables from the main `retaind` app. `drizzle-kit push`
diffs the schema in this repo against the live DB; tables present in the DB but absent
from this repo's schema (i.e. all of the friend's tables) would be flagged for
**deletion**. That is unacceptable on a shared DB. An additive `CREATE TABLE IF NOT
EXISTS` migration only ever adds tables and never inspects or drops the friend's.

## Architecture

### Tables created (10)

Landing-owned (existing Drizzle definitions in `src/lib/db/schema.ts`):
`newsletter_subscribers`, `assessment_users`, `assessment_responses`,
`assessment_scores`, `assessment_reports`, `inhouse_assessment_users`,
`inhouse_assessment_responses`, `inhouse_assessment_scores`,
`inhouse_assessment_reports`.

Shared `lead` table — created from the friend's exact schema:

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK, `defaultRandom()` | |
| `user_name` | varchar(200) NOT NULL | |
| `user_email` | varchar(255) NOT NULL | |
| `company_name` | varchar(200) | |
| `company_website` | varchar(500) | |
| `job_title` | varchar(200) | |
| `location` | varchar(200) | |
| `salary_band` | varchar(100) | |
| `source` | varchar(30) NOT NULL | |
| `advert_status` | varchar(20) | |
| `payment_attempted` | boolean NOT NULL default false | |
| `follow_up_status` | varchar(20) NOT NULL default `'new'` | |
| `created_at` | timestamptz NOT NULL default now() | |
| `updated_at` | timestamptz NOT NULL default now() | |

Indexes: `lead_email_idx(user_email)`, `lead_follow_up_status_idx(follow_up_status)`,
`lead_source_idx(source)`, `lead_payment_attempted_idx(payment_attempted)`,
`lead_created_at_idx(created_at DESC)`.

The `lead` Drizzle definition is added to `src/lib/db/schema.ts` (landing's single-file
convention) mirroring these columns/types exactly so the ORM and the live table agree.

### Field mapping (assessment user → lead)

`toLead(user, source)` — a pure function — returns an `InsertLead`:

| lead column | agency_assessment | inhouse_assessment |
|---|---|---|
| `userName` | `user.name` | `user.name` |
| `userEmail` | `user.email` | `user.email` |
| `companyName` | `user.company` | `user.company` |
| `jobTitle` | `null` | `user.jobTitle ?? null` |
| `companyWebsite` / `location` / `salaryBand` / `advertStatus` | `null` | `null` |
| `source` | `'agency_assessment'` | `'inhouse_assessment'` |
| `paymentAttempted` | `false` | `false` |
| `followUpStatus` | `'new'` | `'new'` |

`id`, `createdAt`, `updatedAt` use DB defaults.

### Storage

`storage.createLead(lead: InsertLead): Promise<void>` — guarded by `if (!db) return`,
inserts into `lead`. No `.returning()` needed (caller discards the row).

### Data flow (both submit routes)

```
POST /api/assessment/submit
  → createAssessmentUser / Responses / Score
  → generateReport (Bedrock)  ── on error → fallback report
  → createAssessmentReport
  → createLead(toLead(input.user, 'agency_assessment'))   ── try/catch, non-fatal
  → 201 response
```

In-house route mirrors this with `'inhouse_assessment'` and the `jobTitle` field.

### Failure handling

The lead insert is wrapped in its own try/catch (same pattern as the existing report
fallback). On failure it logs via `console.error` and is swallowed — the user still
receives their report and scores. `if (!db) return` keeps no-DB mode working.

## Coordination (for the friend / main retaind app)

1. The `lead` table now physically exists in `retaind_dev`, created by the landing app.
   Do **not** add a second migration that recreates or drops it — the landing app owns
   the live table definition.
2. Add `agency_assessment` and `inhouse_assessment` to the `LeadSource` union, the
   source/status filter UI, and label/colour maps — otherwise assessment leads render
   with an unstyled source tag.
3. Point `adminLeadsApi` at the real `lead` table (replacing `MOCK_LEADS`) when ready;
   assessment leads will already be flowing in.

## Testing

- Unit test for `toLead()` — both sources, jobTitle present/null, correct source and
  defaults.
- Lead insert is additive to the existing route flow; existing Playwright smoke tests
  continue to cover the assessment happy path.

## Env / config

`.env.local` gets `DATABASE_URL=postgresql://postgres:password@localhost:5432/retaind_dev`
(the shared dev DB). `.env.example` documents it.
