# E.4 ck-alerts

**Depends on:** E.3 · **Next:** E.5 · **Crate:** `crates/ck-alerts`

## Why
Turn matching results and stick signals into clear alerts that name the stick and the user.

## Context
- Pure rules over the store's data; delivered over the live feed (C.3).
- Alerts agreed so far: submission on the platform with no stick event; one stick with two handles;
  one handle on two sticks; stick heartbeat lost; settings or image version changed; recorder failed or
  off against policy; network lock off (D.4); late events after a gap.
- Each alert type can be switched on/off and given a threshold in the contest profile.

## Small steps
- [ ] **E.4.1** Alert type, severity, message, stick and handle references.
- [ ] **E.4.2** One rule per alert type, each with tests.
- [ ] **E.4.3** De-duplication (one open alert per problem, updated as it continues).
- [ ] **E.4.4** Settings in the contest profile; defaults.
- [ ] **E.4.5** Optional notifications (email/Discord/Telegram) – interface now, one implementation.

## Done when
Every rule has passing tests and alerts reach the live feed.

## Out of scope
Dashboard screens (E.5).
