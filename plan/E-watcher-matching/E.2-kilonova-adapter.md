# E.2 Kilonova adapter

**Depends on:** E.1 · **Next:** E.3 · **Crate:** `crates/ck-platform-kilonova`

## Why
Watch the real contest on Kilonova.

## Context
- Needs **organizer access** to the contest on `rcpc.kilonova.ro` (open question 2) – to list all
  submissions and, ideally, read their code.
- API envelope and auth header are in context.md §8 (`Authorization: <session id>`). The organizer's
  session ID is a secret – stored in the API's configuration, never in logs.
- Use the endpoint documented in Kilonova's API post for listing submissions (confirm during this step,
  record in `docs/platforms/kilonova.md`).

## Small steps
- [ ] **E.2.1** Confirm the list-submissions endpoint and fields (with organizer access).
- [ ] **E.2.2** Implement the adapter; map to `PlatformSubmission`.
- [ ] **E.2.3** Fetch the code for each submission if allowed; hash it with the shared normalisation.
- [ ] **E.2.4** Tests on recorded (anonymised) responses.
- [ ] **E.2.5** Live trial against a small test contest.

## Done when
The trial lists every submission made in the test contest.

## Out of scope
Other platforms (G).
