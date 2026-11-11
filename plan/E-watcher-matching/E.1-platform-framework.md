# E.1 ck-platform – watcher framework

**Depends on:** D.5 · **Next:** E.2 · **Crate:** `crates/ck-platform`

## Why
The API must pull every submission of the contest from the platform. A common framework makes each
platform a small, separate plug-in.

## Context
- Each platform adapter implements one interface: list new submissions since a cursor (with handle,
  problem, language, time, verdict, submission ID and – if available – the code).
- Platforms limit request rates (Codeforces ~1 request / 2 s). The scheduler must respect a per-platform limit.
- Runs inside the API at first; can move to a separate `ck-hub-watcher` program later.

## Small steps
- [ ] **E.1.1** `Platform` trait + `PlatformSubmission` type.
- [ ] **E.1.2** Scheduler: one watcher per contest, cursor saved in the store, rate limiting, back-off on errors.
- [ ] **E.1.3** Fake platform for tests (scripted submissions).
- [ ] **E.1.4** Store: `platform_submissions` table + migration.
- [ ] **E.1.5** Tests with the fake platform: new items, duplicates, outages, rate limits.

## Done when
Tests pass with the fake platform.

## Out of scope
Real platforms (E.2, G).
