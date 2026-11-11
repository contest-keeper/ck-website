# B.7 End-to-end test

**Depends on:** B.4, B.6 · **Next:** C.1

## Why
Prove the key question: the system knows which user is on which stick – only after a real login.

## Context
- Runs in the VM (A.8 setup) against the B.6 API on the host (`10.0.2.2:8088` from inside the VM).
- **You** type the Kilonova credentials in the VM via VNC.
- Use a test image built with a profile whose API URL is `http://10.0.2.2:8088`.

## Small steps
- [ ] **B.7.1** Successful login → the page shows the stick with your username within seconds.
- [ ] **B.7.2** Wrong password → nothing changes on the page.
- [ ] **B.7.3** Log out, log in as a second account → two logins and a warning for that stick.
- [ ] **B.7.4** Reboot → the stick shows no user until a new login.
- [ ] **B.7.5** Network cut during login (disconnect QEMU's network), then restore → the login event
  arrives late, marked as delayed.
- [ ] **B.7.6** Check the stick's logs and the API log: no password or session ID anywhere.
- [ ] **B.7.7** Repeat B.7.1–B.7.4 on a real laptop (A.9 stick).
- [ ] **B.7.8** Record the results in `docs/test-reports/phase-b.md`.

## Done when
All cases pass in the VM and B.7.1–B.7.4 pass on a real laptop.

## Out of scope
Submissions (Phase D).
