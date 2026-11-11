# C.5 OpenAPI and TypeScript client

**Depends on:** C.2 · **Can run in parallel with:** C.3 · **Next:** C.4

## Why
The dashboard and admin app always use the same types as the server – no drift.

## Context
- Decision: OpenAPI generated from the Rust code with `utoipa`; TypeScript client generated from it
  (e.g. `openapi-typescript` or `orval`). You already use NSwag on other projects – any generator works.
- Live messages (C.3) aren't in OpenAPI; export their types with `ts-rs` or `specta`.

## Small steps
- [ ] **C.5.1** Annotate API routes and types with `utoipa`; serve `/v1/openapi.json`.
- [ ] **C.5.2** Script `tools/gen-client.ps1` → `apps/dashboard/src/api/`.
- [ ] **C.5.3** Export live-message types to TypeScript.
- [ ] **C.5.4** CI check: generated client is up to date.

## Done when
The dashboard builds only against generated types, and CI fails if they're stale.

## Out of scope
Public API documentation site.
