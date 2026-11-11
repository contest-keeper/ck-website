# C.4 Dashboard

**Depends on:** C.3, C.5 · **Next:** C.6 · **Folder:** `apps/dashboard` (React + TypeScript)

## Why
The organizers' live view: every stick, every user, every problem.

## Context
- Decision: React + TypeScript (Vite, Tailwind, shadcn/ui), TanStack Query for data, WebSocket for live
  updates; built as static files and served by the API.
- Uses the generated TypeScript client (C.5) – no hand-written API types.
- Must stay readable on a projector and usable on a phone.

## Small steps
- [ ] **C.4.1** Project setup (Vite, TypeScript strict, lint, Tailwind, shadcn/ui).
- [ ] **C.4.2** Login page (C.2 endpoints).
- [ ] **C.4.3** Sticks view: stick, team, user, status (online/silent), last seen, recorder state.
- [ ] **C.4.4** Users view: handle → stick(s), login history.
- [ ] **C.4.5** Alerts feed with severity, stick and user named; acknowledge button.
- [ ] **C.4.6** Stick detail: timeline of boots, logins, warnings.
- [ ] **C.4.7** API serves the built files at `/`.
- [ ] **C.4.8** Component tests for the views.

## Done when
During a B.7-style test, logins and warnings appear live on the dashboard.

## Out of scope
Submission and matching views (E.5).
