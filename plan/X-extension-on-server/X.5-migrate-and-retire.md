# X.5 Move the data and retire the old backend

**Depends on:** X.4 · **Next:** H.1 · **Repositories:** `ck-hub`, `ck-backend`

## Why
One server, one database, one place to maintain.

## Context
- The .NET backend uses PostgreSQL (Neon) and Redis. Users, rooms, members, invitations and archives
  must move; Redis data (sessions, codes) can expire instead of moving – users sign in again.
- Run both servers side by side until most users have the new extension version.

## Small steps
- [ ] **X.5.1** Migration script: users (with their password hashes), rooms, members, invitations, archives.
- [ ] **X.5.2** Dry run on a copy of the production database; compare counts and sample records.
- [ ] **X.5.3** Final migration in a quiet window; old backend read-only during it.
- [ ] **X.5.4** Watch errors for a week; then stop the .NET backend.
- [ ] **X.5.5** Archive the `ck-backend` repository (read-only on GitHub) with a README
  pointing to `ck-hub`.

## Done when
No traffic reaches the old backend for a week and its repository is archived.

## Out of scope
The future app (`ck-app`).
