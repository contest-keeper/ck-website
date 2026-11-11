# E.3 ck-matcher

**Depends on:** E.1 · **Can run in parallel with:** E.2 · **Next:** E.4 · **Crate:** `crates/ck-matcher`

## Why
The core check: every platform submission must have exactly one matching submission sent from a stick.

## Context
- Pure logic: no I/O. Input = stick events (logins, submissions) + platform submissions; output =
  matches and unmatched items.
- Matching keys, strongest first: platform submission ID (if the stick captured it, D.2) → handle +
  problem + code hash within a time window → handle + problem + time (if code isn't available).
- The stick ↔ handle mapping comes from login events (B.3).
- Clock skew: stick clocks may differ; use the API's receive time and a configurable window.
- Duplicates: the same code submitted twice needs two stick events.

## Small steps
- [ ] **E.3.1** Data types and the matching function.
- [ ] **E.3.2** Stick ↔ handle mapping over time (logins/logouts per boot).
- [ ] **E.3.3** Table-driven tests: exact ID match, hash match, time-only match, duplicate code, missing
  stick event, extra stick event, wrong handle, clock skew, late events after an outage.
- [ ] **E.3.4** Run the matcher incrementally inside the API as data arrives.

## Done when
All table cases pass.

## Out of scope
Alert wording and delivery (E.4).
