# C.2 Organizer accounts

**Depends on:** C.1 · **Next:** C.3

## Why
Only organizers may see the dashboard and manage contests.

## Context
- Open question 4 (how organizers log in). Plan: start with simple accounts (Argon2 password hashes,
  session cookies, HTTPS only); add single sign-on (OIDC) later if needed.
- Stick endpoints (`/v1/events`, `/v1/heartbeat`) keep using stick signatures, not organizer accounts.
- Roles: `admin` (manage contests, sticks, users) and `viewer` (dashboard only).

## Small steps
- [ ] **C.2.1** Users table + migration; Argon2 hashing.
- [ ] **C.2.2** Login / logout endpoints, session cookies (`HttpOnly`, `Secure`, `SameSite=Strict`).
- [ ] **C.2.3** Role checks on organizer endpoints.
- [ ] **C.2.4** First-admin bootstrap command (`ck-hub create-admin`).
- [ ] **C.2.5** Rate limit on login attempts.
- [ ] **C.2.6** Tests: login, wrong password, role denied, session expiry.

## Done when
Organizer endpoints refuse anonymous access and the tests pass.

## Out of scope
Single sign-on.
