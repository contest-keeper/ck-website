# C.1 ck-store – PostgreSQL

**Depends on:** B.7 · **Next:** C.2 · **Crate:** `crates/ck-store`

## Why
Contest data must survive restarts and be queryable afterwards (audits, disputes).

## Context
- Decision: PostgreSQL via SQLx (compile-time checked queries, migrations). Open question 1 (where it
  runs) doesn't block this step – develop against a local Docker PostgreSQL.
- B.6 used an in-memory store; keep it as a second implementation for tests behind the same trait.
- Data: contests, sticks (from the registry), boots, events (raw, append-only), logins, submissions
  (later), alerts.
- Events are append-only – never update or delete them; derived tables can be rebuilt from events.

## Small steps
- [ ] **C.1.1** `Store` trait (insert event, current state per stick, history queries).
- [ ] **C.1.2** In-memory implementation (move from B.6).
- [ ] **C.1.3** Migrations: contests, sticks, boots, events, logins, alerts.
- [ ] **C.1.4** PostgreSQL implementation.
- [ ] **C.1.5** Import the admin registry into the `sticks` table (CLI command or API endpoint).
- [ ] **C.1.6** Tests: same test suite against both implementations (PostgreSQL via Docker, local only).
- [ ] **C.1.7** Switch `ck-api` to the trait; choose the implementation from configuration.

## Done when
The B.7 scenarios pass with PostgreSQL, and data survives an API restart.

## Out of scope
Submissions and matching tables (D, E).
