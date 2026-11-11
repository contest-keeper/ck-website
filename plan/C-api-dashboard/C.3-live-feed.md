# C.3 Live feed

**Depends on:** C.2 · **Next:** C.4

## Why
Organizers must see problems the moment they happen.

## Context
- Decision: WebSocket from Axum. B.6 used Server-Sent Events for the simple page; the dashboard gets
  WebSocket (two-way, e.g. acknowledging alerts later).
- Messages: stick state changes, logins, warnings/alerts, heartbeat lost/restored.
- Only logged-in organizers may connect (session cookie from C.2).

## Small steps
- [ ] **C.3.1** Internal broadcast channel fed by event intake and alert rules.
- [ ] **C.3.2** WebSocket endpoint `/v1/live` with organizer auth.
- [ ] **C.3.3** Message schema in `ck-protocol` (also exported to TypeScript in C.5).
- [ ] **C.3.4** "Heartbeat lost" detector (no heartbeat for N seconds, N from contest settings).
- [ ] **C.3.5** Reconnect behaviour: client gets a snapshot, then updates.
- [ ] **C.3.6** Tests: connect, receive snapshot, receive update, unauthorised refused.

## Done when
A test client sees a login within a second of the event arriving.

## Out of scope
The dashboard UI (C.4).
