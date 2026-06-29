# Limit AI Report Generation Per Device (Fingerprint Pro) — Design

**Date:** 2026-06-29
**Status:** Approved (design)

## Problem

The AI report generation (both assessments) is gated only by an email field. A user
can submit unlimited reports by entering different emails, abusing the Bedrock cost and
the lead funnel. We want to limit report generation per *device*, not per email, and
push repeat users to sign up.

## Goal

A device may generate **one agency report and one in-house report**. On a repeat attempt
for the same assessment type, the submit API blocks before generating a report or writing
any row, and the UI shows a "you've already generated this — sign up to continue" message.

## Decisions (from brainstorming)

| Decision | Choice |
|---|---|
| Device identity | Fingerprint Pro `visitorId` (more reliable than raw IP). |
| Limit scope | One report per assessment **type** per device (1 agency + 1 in-house). |
| Storage / enforcement | `visitor_id` column on our `assessment_users` + `inhouse_assessment_users` tables; checked server-side. Friend's `lead` table untouched. |
| Server-side verification | Verify `requestId` → authoritative `visitorId` via Fingerprint Server API when `FINGERPRINT_SECRET_KEY` is set; otherwise trust the client `visitorId`. |
| Fallback | **Fail open** — no/failed fingerprint → allow the submission (logged). |
| Signup link | `NEXT_PUBLIC_SIGNUP_URL` env var (default `#`). |
| Migration home | retaind repo (its CI/CD owns the real DB), hand-authored idempotent SQL + journal entry. |

## Threat model

Stops the realistic abuse: same person, new email, same browser → same `visitorId` →
blocked. Out of scope: tampering with the raw network request (any client fingerprint is
bypassable that way, and we fail open). This is a deterrent for a marketing lead tool, not
a hard security boundary.

## Architecture

### Client

- `src/lib/fingerprint.ts` — `getVisitor(): Promise<{ visitorId: string; requestId: string } | null>`.
  Lazily loads `@fingerprintjs/fingerprintjs-pro` with `NEXT_PUBLIC_FINGERPRINT_API_KEY`
  and `NEXT_PUBLIC_FINGERPRINT_REGION` (default `us`), calls `.get()`. Returns `null` on
  any error or missing key (fail open). The loaded agent is cached across calls.
- Assessment pages (`/assessment`, `/inhouse-assessment`) call `getVisitor()` before
  submit and include `visitorId` + `requestId` in the payload.
- `client-api.ts` throws a typed error carrying `code` on a non-OK response; pages detect
  `ALREADY_SUBMITTED` and render the signup message + CTA (`NEXT_PUBLIC_SIGNUP_URL`)
  instead of the generic error toast.

### Server

- `src/lib/fingerprint-server.ts` — `resolveVisitorId({ requestId, visitorId }): Promise<string | null>`.
  If `FINGERPRINT_SECRET_KEY` is set and a `requestId` is provided, call the Fingerprint
  Server API (`https://<region>.api.fpjs.io/events/{requestId}` with `Auth-API-Key`) and
  return the authoritative `products.identification.data.visitorId`. Otherwise return the
  client `visitorId`. Returns `null` on any error / missing inputs (fail open).
- **api-contract**: both submit schemas gain optional `visitorId?: string`,
  `requestId?: string`.
- **storage**:
  - `findAssessmentUserByVisitorId(visitorId): Promise<{ id: number } | undefined>`
  - `findInhouseAssessmentUserByVisitorId(visitorId)`
  - `createAssessmentUser` / `createInhouseAssessmentUser` persist `visitorId` (nullable).
- **submit routes** (`/api/assessment/submit`, `/api/inhouse-assessment/submit`):
  1. `const id = await resolveVisitorId(input)`.
  2. If `id` and an existing user row for that type has it → return
     `409 { message, code: "ALREADY_SUBMITTED" }`. No report, no rows written.
  3. Else proceed as today, storing `visitor_id = id` on the user row.

### Data flow

```
client: getVisitor() → { visitorId, requestId } | null
  → POST /api/<type>/submit { user, responses, visitorId?, requestId? }
server: resolveVisitorId() → id | null
  if id && findUserByVisitorId(id) → 409 ALREADY_SUBMITTED   (UI → signup message)
  else create user (visitor_id=id) → scores → Bedrock report → report → lead → 201
```

### Failure handling

Every fingerprint path fails open: missing keys, network errors, ad-blockers, or a `null`
id all let the submission through (logged via `console.warn`). The limit only applies when
a usable id is resolved.

## Schema change (retaind migration)

`retaind/drizzle/0067_assessment_visitor_id.sql` (hand-authored, idempotent), + journal
entry (idx 89), left for the friend to commit:

```sql
ALTER TABLE "assessment_users"         ADD COLUMN IF NOT EXISTS "visitor_id" text;
ALTER TABLE "inhouse_assessment_users" ADD COLUMN IF NOT EXISTS "visitor_id" text;
CREATE INDEX IF NOT EXISTS "assessment_users_visitor_id_idx"         ON "assessment_users" ("visitor_id");
CREATE INDEX IF NOT EXISTS "inhouse_assessment_users_visitor_id_idx" ON "inhouse_assessment_users" ("visitor_id");
```

Landing's `src/lib/db/schema.ts` adds `visitorId: text("visitor_id")` to both user tables
for ORM typing.

## Env vars (all optional; feature degrades gracefully)

| Var | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_FINGERPRINT_API_KEY` | client public key | unset → fail open |
| `NEXT_PUBLIC_FINGERPRINT_REGION` | `us` / `eu` / `ap` | `us` |
| `FINGERPRINT_SECRET_KEY` | server verification | unset → trust client id |
| `NEXT_PUBLIC_SIGNUP_URL` | repeat-user CTA target | `#` |

## Testing

- Unit-test the limit decision: existing `visitorId` for the type → blocked; absent → allowed;
  `null` id (fail open) → allowed.
- Schema accepts submit payloads without `visitorId`/`requestId`.

## Coordination (friend / retaind repo)

`0067` only adds nullable columns + indexes to the landing-owned assessment tables — no
change to `lead`. Review and commit it so CI/CD applies it to the real DB.
