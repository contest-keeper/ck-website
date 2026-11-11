# X.3 Rooms and invitations on the Rust server

**Depends on:** X.2 · **Next:** X.4 · **Repository:** `ck-hub`

## Why
Rooms are Contest Keeper's contests. Once they live on the Rust server, the stick and the extension
share the same contests, hosts and participants.

## Context
- .NET rooms (context.md §12): name, website (Kilonova/Codeforces/vJudge), contest link, start/end,
  rules (one display, screen sharing, tab/extension tracking), blocked sites and extensions, guests,
  join code like `ABCD-2345`, archive, invitations by email with `/invite/{token}`.
- **Join with the stick work:** a room becomes the contest a stick is written for. If phase C already
  introduced "contests" on the Rust server, merge them into rooms here (one concept, not two).
- Contest dates come from the platforms (`ContestScheduleProvider`); the Rust watcher (E.1/E.2)
  already talks to the same platforms – reuse it.

## Small steps
- [ ] **X.3.1** Rooms: create, edit, archive, list, join by code, guests.
- [ ] **X.3.2** Rules and blocked lists (same validation as `RoomSettings.Validate`).
- [ ] **X.3.3** Invitations and the invite page.
- [ ] **X.3.4** Contest dates from the platforms (reuse the watcher's adapters).
- [ ] **X.3.5** Room ↔ stick link: a room can have "stick mode"; sticks are registered to a room.
- [ ] **X.3.6** Contract tests for rooms – all green.

## Done when
All room contract tests pass against the Rust server.

## Out of scope
Switching the extension (X.4).
