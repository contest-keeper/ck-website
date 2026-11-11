# D.1 Observe a real submission

**Depends on:** C.6 · **Next:** D.2

## Why
As with logins (B.1): see exactly what the Kilonova website sends when a solution is submitted.

## Context
- Use the B.1 observation setup. Same privacy rule, but the **code itself is fine to keep** in
  anonymised samples (it's test code you write).
- Kilonova's API docs list submission endpoints (base `/api`); confirm what the website uses and how
  the response identifies the new submission (submission ID?).
- The submission ID in the response is valuable: matching (E.3) becomes exact when stick events carry it.

## Small steps
- [ ] **D.1.1** Submit a small solution to a test problem (editor paste and file upload, if both exist).
- [ ] **D.1.2** Record endpoint, content type, field names (problem, language, code), response fields
  (submission ID, status).
- [ ] **D.1.3** Add the findings to `docs/platforms/kilonova.md`; save anonymised samples for D.2 tests.

## Done when
Documented and samples committed.

## Out of scope
Judging results (only the submission itself matters here).
