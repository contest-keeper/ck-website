# G.2 vJudge

**Depends on:** G.1 · **Next:** H.1

## Why
Support contests run on vJudge.

## Context
- No official API: the watcher must read the contest's pages or exports (check vJudge's terms; ask the
  vJudge contest owner for access). Expect it to be the most fragile adapter – keep it isolated.
- vJudge forwards submissions to other judges; the capture rule watches vJudge's own submit request.

## Small steps
- [ ] **G.2.1** Observe login + submission; document in `docs/platforms/vjudge.md`.
- [ ] **G.2.2** Login and submit rules + tests.
- [ ] **G.2.3** Watcher adapter (`ck-platform-vjudge`) based on the contest owner's view + tests.
- [ ] **G.2.4** End-to-end trial.

## Done when
The E.5 trial passes on vJudge.
