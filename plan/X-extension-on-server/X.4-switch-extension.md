# X.4 Switch the extension

**Depends on:** X.3 · **Next:** X.5 · **Repository:** `ck-extension`

## Why
Point the extension at the new server and prove every screen still works.

## Context
- The server address is set at build time: `VITE_API_BASE_URL=https://… yarn build:chromium`; anything
  but `localhost` must be `https`. It is also the extension's only host permission.
- Extension tests run with `node --test`; typecheck with `svelte-check`. Chromium is the main target.
- Users with the old extension version keep talking to the old backend until they update – run both
  servers in parallel for a while (X.5).

## Small steps
- [ ] **X.4.1** Build the extension against a local Rust server; run its tests and typecheck.
- [ ] **X.4.2** Manual pass over every screen: welcome, sign-in (email + Google), register, password,
  rooms list, room page, join by code, join as guest, history, privacy.
- [ ] **X.4.3** Fix any contract differences (in the server, not by bending the extension, unless agreed).
- [ ] **X.4.4** Release a new extension version pointing at the production Rust server.

## Done when
The new extension version works end to end against the Rust server.

## Out of scope
Turning the old backend off (X.5).
