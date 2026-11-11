# B.3 Kilonova login rule

**Depends on:** B.1, B.2 · **Next:** B.4 · **Module:** `ck-capture::platforms::kilonova`

## Why
Turn Kilonova's login traffic into a trustworthy "user X logged in on this stick" event – only when
the login really succeeded.

## Context
- Exact request/response formats come from B.1 (`docs/platforms/kilonova.md`) and its anonymised
  samples.
- Rule from the user (2026-11-10): **only on a successful login**.
- Hosts come from the settings (e.g. `rcpc.kilonova.ro`, maybe `kilonova.ro`), not hard-coded.
- The password must be dropped immediately after parsing; never logged, never kept in memory longer
  than needed. Same for the session ID in the response.

## Small steps
- [ ] **B.3.1** Match the login request on the configured hosts; read the username (form, JSON or
  multipart – whatever B.1 found); discard the password.
- [ ] **B.3.2** Pair with the response; emit `Login { platform, handle, at }` only if the response is a
  success (status code and envelope `status:"success"`).
- [ ] **B.3.3** Failed login → no event (optionally a counter for "failed attempts", no username).
- [ ] **B.3.4** Logout request + success response → `Logout { platform, handle?, at }`.
- [ ] **B.3.5** Tests on the samples: success, wrong password, unknown user, logout, unrelated requests,
  a response without a matching request.
- [ ] **B.3.6** Event types added to `ck-protocol` (`LoginEvent`, `LogoutEvent`).

## Done when
All sample-based tests pass and no test output contains a password or session ID.

## Out of scope
Detecting users from already-open sessions (B.4 forces a fresh login instead), Codeforces/vJudge (G).
