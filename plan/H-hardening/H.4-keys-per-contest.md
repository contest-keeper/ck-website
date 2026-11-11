# H.4 Keys per contest

**Depends on:** H.3 · **Next:** H.5

## Why
A key copied from a stick during one contest must be useless in the next.

## Context
- Each contest gets fresh stick keys; the API accepts a stick's key only for its contest and time window.
- Re-using physical sticks = re-writing their settings with new keys (admin app, F.2).

## Small steps
- [ ] **H.4.1** Keys bound to a contest ID and validity window in the registry.
- [ ] **H.4.2** API rejects keys outside their contest/window.
- [ ] **H.4.3** Admin app "re-key sticks for a new contest" flow.

## Done when
A key from a past contest is rejected in tests.
