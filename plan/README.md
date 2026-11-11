# Contest Keeper – step-by-step plan

**Short version:** [EASY-PLAN.md](EASY-PLAN.md) – every step in one line, in plain words.

Work through the steps one at a time, in order. Each step has its own file with:

- **Why** – what the step is for
- **Context** – what you need to know for this step (on top of [context.md](context.md))
- **Small steps** – a checklist, each item about one pull request
- **Done when** – the check that closes the step
- **Out of scope** – what not to do yet

Before starting any step, read [context.md](context.md). When you finish a step, tick it below and
add anything new you learned to `context.md`.

## Where each phase's code lives

| Phases | Repository |
|---|---|
| P0.0 | all repositories (renames and clean-up) |
| P0, A, B.1–B.5, D.1–D.5 (stick side) – Keeper OS | `ck-os` |
| A.4, A.5, F – Keeper Forge | `ck-forge` |
| A.1–A.3 shared code (protocol, crypto, image tools) | `ck-protocol` |
| C.6 deployment | `ck-hub-setup` |
| B.6, C, D.3 (server side), E, G (watchers) – Keeper Hub | `ck-hub` |
| X | `ck-hub` + `ck-extension` (+ retiring `ck-backend`) |
| Plan and shared docs | `ck-website` (after P0.0) |

## Status

### P0 – Foundations
- [ ] [P0.0 Repositories](P0-foundations/P0.0-repositories.md)
- [ ] [P0.1 Repository](P0-foundations/P0.1-repository.md)
- [x] [P0.2 Toolchain](P0-foundations/P0.2-toolchain.md)
- [ ] [P0.3 Continuous integration](P0-foundations/P0.3-ci.md)
- [x] [P0.4 Decision records](P0-foundations/P0.4-decision-records.md)

### A – Bootable stick
- [ ] [A.1 ck-protocol – shared types](A-bootable-stick/A.1-ck-protocol.md)
- [ ] [A.2 ck-crypto – keys and signatures](A-bootable-stick/A.2-ck-crypto.md)
- [ ] [A.3 ck-image – work with image files](A-bootable-stick/A.3-ck-image.md)
- [ ] [A.4 ck-admin-core – admin logic](A-bootable-stick/A.4-ck-admin-core.md)
- [ ] [A.5 ck-forge – admin command line](A-bootable-stick/A.5-admin-cli.md)
- [ ] [A.6 Agent – apply settings](A-bootable-stick/A.6-agent-config.md)
- [ ] [A.7 Image patch](A-bootable-stick/A.7-image-patch.md)
- [ ] [A.8 Automatic VM test](A-bootable-stick/A.8-vm-test.md)
- [ ] [A.9 Real hardware](A-bootable-stick/A.9-real-hardware.md)

### B – Login detection (Kilonova)
- [ ] [B.1 Observe a real login](B-login-detection/B.1-observe-login.md)
- [ ] [B.2 ck-capture – ICAP service](B-login-detection/B.2-ck-capture.md)
- [ ] [B.3 Kilonova login rule](B-login-detection/B.3-kilonova-login-rule.md)
- [ ] [B.4 Fresh login on every boot](B-login-detection/B.4-fresh-login.md)
- [ ] [B.5 Uplink](B-login-detection/B.5-uplink.md)
- [ ] [B.6 Minimal API](B-login-detection/B.6-minimal-api.md)
- [ ] [B.7 End-to-end test](B-login-detection/B.7-end-to-end-test.md)

### C – Real API and live dashboard
- [ ] [C.1 ck-store – PostgreSQL](C-api-dashboard/C.1-store.md)
- [ ] [C.2 Organizer accounts](C-api-dashboard/C.2-organizer-accounts.md)
- [ ] [C.3 Live feed](C-api-dashboard/C.3-live-feed.md)
- [ ] [C.4 Dashboard](C-api-dashboard/C.4-dashboard.md)
- [ ] [C.5 OpenAPI and TypeScript client](C-api-dashboard/C.5-openapi.md)
- [ ] [C.6 Deployment](C-api-dashboard/C.6-deployment.md)

### D – Submission capture and network lock
- [ ] [D.1 Observe a real submission](D-submission-capture/D.1-observe-submission.md)
- [ ] [D.2 Kilonova submit rule](D-submission-capture/D.2-kilonova-submit-rule.md)
- [ ] [D.3 Submission events](D-submission-capture/D.3-submission-events.md)
- [ ] [D.4 Network lock](D-submission-capture/D.4-network-lock.md)
- [ ] [D.5 API-unreachable mode](D-submission-capture/D.5-unreachable-mode.md)

### E – Contest watcher and matching
- [ ] [E.1 ck-platform – watcher framework](E-watcher-matching/E.1-platform-framework.md)
- [ ] [E.2 Kilonova adapter](E-watcher-matching/E.2-kilonova-adapter.md)
- [ ] [E.3 ck-matcher](E-watcher-matching/E.3-matcher.md)
- [ ] [E.4 ck-alerts](E-watcher-matching/E.4-alerts.md)
- [ ] [E.5 Dashboard views](E-watcher-matching/E.5-dashboard-views.md)

### F – Admin app and stick writer
- [ ] [F.1 ck-writer – stick writer](F-admin-app/F.1-writer.md)
- [ ] [F.2 Tauri admin app](F-admin-app/F.2-tauri-app.md)
- [ ] [F.3 Batch mode](F-admin-app/F.3-batch-mode.md)
- [ ] [F.4 Extra options](F-admin-app/F.4-extra-options.md)
- [ ] [F.5 Installer and signing](F-admin-app/F.5-installer.md)

### G – More platforms
- [ ] [G.1 Codeforces](G-more-platforms/G.1-codeforces.md)
- [ ] [G.2 vJudge](G-more-platforms/G.2-vjudge.md)

### X – Extension moves to the Rust server
- [ ] [X.1 List what the old backend does](X-extension-on-server/X.1-inventory.md)
- [ ] [X.2 Accounts](X-extension-on-server/X.2-accounts.md)
- [ ] [X.3 Rooms and invitations](X-extension-on-server/X.3-rooms.md)
- [ ] [X.4 Switch the extension](X-extension-on-server/X.4-switch-extension.md)
- [ ] [X.5 Move the data and retire the old backend](X-extension-on-server/X.5-migrate-and-retire.md)

### H – Hardening and release
- [ ] [H.1 Ed25519 keys](H-hardening/H.1-ed25519-keys.md)
- [ ] [H.2 Signed settings](H-hardening/H.2-signed-settings.md)
- [ ] [H.3 Certificate pinning](H-hardening/H.3-certificate-pinning.md)
- [ ] [H.4 Keys per contest](H-hardening/H.4-keys-per-contest.md)
- [ ] [H.5 Recordings upload](H-hardening/H.5-recordings-upload.md)
- [ ] [H.6 Security review](H-hardening/H.6-security-review.md)
- [ ] [H.7 Guides](H-hardening/H.7-guides.md)
- [ ] [H.8 Releases](H-hardening/H.8-releases.md)
