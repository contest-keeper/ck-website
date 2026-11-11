# H.2 Signed settings

**Depends on:** H.1 · **Next:** H.3

## Why
Someone who mounts a stick on another PC could edit `ck/config.json` (e.g. turn the
recorder off). A signature from the organizers' key makes edits detectable.

## Context
- Organizer signing key held by the admin app (protected by a passphrase); its public key is built
  into the base image by the patch.
- The agent refuses (or flags to the API) unsigned or altered settings.

## Small steps
- [ ] **H.2.1** Organizer key management in the admin app.
- [ ] **H.2.2** Sign `config.json` (detached signature file next to it).
- [ ] **H.2.3** Agent verifies; reports "settings tampered" in the heartbeat and an alert.
- [ ] **H.2.4** Tests: valid, edited, missing signature, wrong key.

## Done when
An edited settings file raises an alert in the VM test.
