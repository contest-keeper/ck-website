# B.6 Minimal API

**Depends on:** B.5 · **Next:** B.7 · **Crate:** `crates/ck-api` (binary `ck-hub`)

## Why
Something to receive the events and show "stick → user" live, so we can test Phase B end to end.
This is the seed of the real API (Phase C).

## Context
- Stack: Axum (Tokio). For now an in-memory store and the admin registry file for stick tokens
  (same format as A.4). PostgreSQL comes in C.1.
- The prototype test API (`prototype/collector/dev_collector.py`) did this for heartbeats: verify
  signature, keep latest state, live page refreshing every 5 s. Same behaviour, in Rust.
- A VM reaches the host as `10.0.2.2`; run the API on `127.0.0.1:8088` during tests.
- Keep the routes final-looking: `POST /v1/events`, `POST /v1/heartbeat`, `GET /v1/sticks`,
  `GET /` (page).

## Small steps
- [ ] **B.6.1** Axum skeleton with config (listen address, registry path, log path).
- [ ] **B.6.2** Intake: verify signature, check sequence/chain, store, append to a log file.
- [ ] **B.6.3** State: per stick – last heartbeat, current user, login history.
- [ ] **B.6.4** Simple live page (Server-Sent Events): sticks, current user, last seen, warnings.
- [ ] **B.6.5** Warning rule: two different users on one stick in one boot.
- [ ] **B.6.6** Tests: signed/unsigned/unknown stick, out-of-order sequence, warning rule.

## Done when
Tests pass and the page shows a stick's heartbeats live.

## Out of scope
Database, organizer login, Svelte dashboard (Phase C).
