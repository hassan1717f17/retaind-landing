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
| Device identity | Open-source FingerprintJS `visitorId` (free, client-side; more reliable than raw IP). |
| Limit scope | One report per assessment **type** per device (1 agency + 1 in-house). |
| Storage / enforcement | `visitor_id` column on our `assessment_users` + `inhouse_assessment_users` tables; checked server-side. Friend's `lead` table untouched. |
| Server-side verification | None — open-source FingerprintJS is client-side only; the route trusts the client-sent `visitorId`. (Consistent with fail-open + the threat model below.) |
| Fallback | **Fail open** — no/absent fingerprint → allow the submission (logged). |
| Signup link | `NEXT_PUBLIC_SIGNUP_URL` env var (default `#`). |
| Migration home | retaind repo (its CI/CD owns the real DB), hand-authored idempotent SQL + journal entry. |

**Note:** originally scoped for Fingerprint **Pro** (with `requestId` + secret-key server
verification); switched to the **free open-source** library to avoid the paid account.
Trade-off: lower re-identification accuracy and no tamper-proof server verification —
acceptable given we fail open and exclude request-tampering from scope.

## Threat model

Stops the realistic abuse: same person, new email, same browser → same `visitorId` →
blocked. Out of scope: tampering with the raw network request (any client fingerprint is
bypassable that way, and we fail open). This is a deterrent for a marketing lead tool, not
a hard security boundary.

## Architecture

### Client

- `src/lib/fingerprint.ts` — `getVisitor(): Promise<{ visitorId: string } | null>`.
  Lazily loads `@fingerprintjs/fingerprintjs` (open-source, no key) and calls `.get()`.
  Returns `null` on any error (fail open). The loaded agent is cached across calls.
- Assessment pages (`/assessment`, `/inhouse-assessment`) call `getVisitor()` before
  submit and include `visitorId` in the payload.
- `client-api.ts` throws a typed `ApiError` carrying `code` on a non-OK response; pages
  detect `ALREADY_SUBMITTED` and render the signup message + CTA (`NEXT_PUBLIC_SIGNUP_URL`)
  instead of the generic error toast.

### Server

- No server-side fingerprint verification (open-source library is client-side only); the
  route uses `input.visitorId` directly.
- **api-contract**: both submit schemas gain optional `visitorId?: string`.
- **storage**:
  - `findAssessmentUserByVisitorId(visitorId): Promise<{ id: number } | undefined>`
  - `findInhouseAssessmentUserByVisitorId(visitorId)`
  - `createAssessmentUser` / `createInhouseAssessmentUser` persist `visitorId` (nullable).
- **submit routes** (`/api/assessment/submit`, `/api/inhouse-assessment/submit`):
  1. `const visitorId = input.visitorId ?? null`.
  2. If `visitorId` and an existing user row for that type has it → return
     `409 { message, code: "ALREADY_SUBMITTED" }`. No report, no rows written.
  3. Else proceed as today, storing `visitor_id = visitorId` on the user row.

### Data flow

```
client: getVisitor() → { visitorId } | null
  → POST /api/<type>/submit { user, responses, visitorId? }
server: visitorId = input.visitorId ?? null
  if visitorId && findUserByVisitorId(visitorId) → 409 ALREADY_SUBMITTED   (UI → signup message)
  else create user (visitor_id=visitorId) → scores → Bedrock report → report → lead → 201
```

### Failure handling

Fails open: an ad-blocker/error on the client yields no `visitorId`, and the server skips
the check. The limit only applies when a `visitorId` is present.

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

## Env vars

| Var | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SIGNUP_URL` | repeat-user CTA target | `#` |

The fingerprint library needs no key/region/secret (open-source, client-side).

## Testing

- Unit-test the limit decision: existing `visitorId` for the type → blocked; absent → allowed;
  `null` id (fail open) → allowed.
- Schema accepts submit payloads without `visitorId`/`requestId`.

## Coordination (friend / retaind repo)

`0067` only adds nullable columns + indexes to the landing-owned assessment tables — no
change to `lead`. Review and commit it so CI/CD applies it to the real DB.
