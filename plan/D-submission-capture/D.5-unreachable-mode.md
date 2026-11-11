# D.5 API-unreachable mode

**Depends on:** D.4 · **Next:** E.1

## Why
The admin decides what happens to a submission if the API can't be reached at that moment.

## Context
- Options agreed earlier: **strict** (hold the submission until the API confirms it has the event;
  if the API is down, submissions are blocked) or **best-effort** (wait ~2 s, then let it through and
  record the gap). Default suggested: best-effort.
- Strict mode needs ICAP to delay the request until the uplink confirms – the capture service waits on
  the uplink with a timeout.
- Setting lives in the contest profile (`network.unreachable_mode`).

## Small steps
- [ ] **D.5.1** Setting in `ck-protocol` and the admin CLI.
- [ ] **D.5.2** Best-effort: never block; gap recorded and flagged by the API.
- [ ] **D.5.3** Strict: capture holds the request until uplink acknowledgement or timeout → reject with a
  clear page ("contest server unreachable, call a proctor").
- [ ] **D.5.4** VM tests for both modes with the API stopped.

## Done when
Both modes behave as described in the VM.

## Out of scope
Offline venues where no API exists at all (logs collected after – a later option).
