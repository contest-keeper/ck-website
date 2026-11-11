# H.6 Security review

**Depends on:** H.5 · **Next:** H.7

## Why
An independent look for ways to cheat or to leak data, before a real contest relies on it.

## Context
- Threats to cover: bypassing the proxy, booting the stick elsewhere, copying keys, editing settings,
  forging events, replaying events, account sharing, data leaks from the API, privacy of code and
  recordings.
- Decide how submitted code is stored on the server (hash only vs. encrypted code).

## Small steps
- [ ] **H.6.1** Threat model document (`docs/security/threat-model.md`).
- [ ] **H.6.2** Review of agent, capture, uplink, API, admin app against it.
- [ ] **H.6.3** Fix findings; record accepted risks.
- [ ] **H.6.4** Privacy notice for contestants.

## Done when
No open high-severity findings.
