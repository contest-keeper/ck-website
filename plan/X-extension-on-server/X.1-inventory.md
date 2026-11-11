# X.1 List what the old backend does

**Depends on:** C.6 (the Rust server runs in production) · **Next:** X.2
**Repositories:** `ck-backend` (read), `ck-extension` (read), `ck-hub` (docs)

## Why
Before moving the extension, we need a complete, written list of what it expects from a server –
otherwise something breaks silently after the switch.

## Context
- The .NET backend (context.md §12): accounts via ASP.NET Core Identity under `/api/auth`
  (register, email confirmation, login, password reset, bearer tokens; single-use refresh tokens in
  Redis), Google sign-in for the extension (PKCE + `identity.launchWebAuthFlow`, redirect to
  `https://<id>.chromiumapp.org/`), rooms under `/api/rooms` (hosts create/edit; join by code;
  guests), invitations (`/invite/{token}` page), `/health`, `/health/database`, rate limits
  (sign-in 10/min, join 30/min), contest dates from Codeforces/Kilonova/vJudge (`ContestScheduleProvider`).
- The extension's server address is fixed at build time (`VITE_API_BASE_URL`), and it is the
  extension's only host permission.
- The backend has integration tests (`tests/ContestKeeper.Web.Tests`) – they describe the expected
  behaviour and can be reused as a checklist.

## Small steps
- [ ] **X.1.1** List every endpoint: method, path, request, response, error cases, auth needed.
- [ ] **X.1.2** List every call the extension makes (`src/browser/*`, `src/entrypoints/popup/state/*`).
- [ ] **X.1.3** List stored data (tables, Redis keys) and what must be migrated.
- [ ] **X.1.4** Write `ck-hub/docs/extension-contract.md`; mark anything we'd like to
  change while moving (and agree on it with the extension).
- [ ] **X.1.5** Turn the backend's integration tests into a contract test list for X.2–X.4.

## Done when
The contract document is reviewed and nothing the extension uses is missing from it.

## Out of scope
Writing server code (X.2+).
