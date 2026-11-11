# D.3 Submission events

**Depends on:** D.2 · **Next:** D.4

## Why
Submissions reach the API and the dashboard, through the same reliable uplink as logins.

## Context
- Uplink (B.5) already queues, signs and retries. Store (C.1) needs a `submissions` table.
- Dashboard (C.4) gets a submissions list per stick and per user.

## Small steps
- [ ] **D.3.1** `SubmissionEvent` in `ck-protocol`.
- [ ] **D.3.2** Capture → uplink for submissions.
- [ ] **D.3.3** Store: `submissions` table + migration.
- [ ] **D.3.4** Dashboard: submissions per stick/user (live).
- [ ] **D.3.5** VM test: submit → appears on the dashboard within seconds.

## Done when
The VM test passes.

## Out of scope
Comparing with the platform (E).
