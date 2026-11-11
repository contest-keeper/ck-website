# G.1 Codeforces

**Depends on:** E.5 · **Next:** G.2

## Why
Support contests run on Codeforces (including gyms/groups).

## Context
- Official API (`contest.status` etc.), about one request every 2 seconds; viewing other users' code
  needs organizer (gym/group manager) access.
- Same pattern as Kilonova: observe login and submit (B.1/D.1 style), capture rules, watcher adapter, tests.
- Codeforces may use anti-bot protection on the website; capture is passive (we only read traffic),
  the watcher uses the official API.

## Small steps
- [ ] **G.1.1** Observe login + submission in the VM; document in `docs/platforms/codeforces.md`.
- [ ] **G.1.2** Login rule (success only) + tests.
- [ ] **G.1.3** Submit rule + tests.
- [ ] **G.1.4** Watcher adapter (`ck-platform-codeforces`) with the API rate limit + tests.
- [ ] **G.1.5** End-to-end trial in a test gym.

## Done when
The E.5 trial passes on Codeforces.
