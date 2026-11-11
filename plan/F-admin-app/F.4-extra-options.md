# F.4 Extra options

**Depends on:** F.2 · **Next:** F.5

## Why
The options organizers asked for beyond the basics (agreed list, ⭐ items first).

## Context
- Each option = a settings field (`ck-protocol`) + an agent "apply" step (A.6 pattern) + a UI control.
- Some touch the image itself (Wi-Fi drivers, paper size defaults) – note those in `image/patch`.

## Small steps (each one is its own small task)
- [ ] **F.4.1** Wi-Fi network and password (NetworkManager connection written at boot).
- [ ] **F.4.2** Block other USB storage (udev rule; the stick itself stays allowed).
- [ ] **F.4.3** Programming languages offered (`/icpc/supported_languages`, desktop icons).
- [ ] **F.4.4** Keyboard layouts and system language (e.g. Romanian + US).
- [ ] **F.4.5** Admin password per contest for `icpcadmin` (hashed in settings, applied at boot).
- [ ] **F.4.6** Printing: A4 instead of Letter (fix `pcpr`), printer address, page limit.
- [ ] **F.4.7** Welcome / rules message at login (if not already done in A.6).
- [ ] **F.4.8** No sleep, screen lock or screensaver during the contest.
- [ ] **F.4.9** Bluetooth, webcam, microphone off.
- [ ] **F.4.10** Organizer SSH access on/off with organizer keys.

## Done when
Each option works in the VM test and on one real laptop.

## Out of scope
Per-team wallpaper with generated team name (nice-to-have, later).
