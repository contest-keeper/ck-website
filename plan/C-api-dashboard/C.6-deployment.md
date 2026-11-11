# C.6 Deployment

**Depends on:** C.4 · **Next:** D.1

## Why
Organizers need to run the API somewhere reachable by the sticks, with HTTPS.

## Context
- Decision: Docker Compose with the API, PostgreSQL and Caddy (automatic HTTPS via Let's Encrypt, or
  Caddy's own certificate authority for an offline venue). If hosted in Azure/another cloud, the cloud's
  HTTPS replaces Caddy.
- Open questions 1 (where it runs) and 3 (internet at the venue) decide the default setup.
- Sticks need the API URL in their settings, so the URL must be stable before sticks are written.

## Small steps
- [ ] **C.6.1** Dockerfile for the API (multi-stage, static binary, includes the dashboard files).
- [ ] **C.6.2** `deploy/docker-compose.yml`: API, PostgreSQL (volume), Caddy.
- [ ] **C.6.3** `deploy/Caddyfile` for a public domain and for an offline venue (internal CA).
- [ ] **C.6.4** Backups of PostgreSQL (nightly dump; before/after each contest).
- [ ] **C.6.5** `docs/deployment.md`: server setup, offline venue setup, checklist before a contest.
- [ ] **C.6.6** Trial run on a cheap server or a venue laptop; sticks in the VM report to it.

## Done when
A fresh server runs the stack from the guide and a VM stick reports to it over HTTPS.

## Out of scope
High availability, multiple regions.
