# F.5 Installer and signing

**Depends on:** F.4 · **Next:** G.1

## Why
Organizers install the admin app without warnings or manual setup.

## Context
- Tauri produces Windows installers (MSI/NSIS).
- A code-signing certificate avoids "unknown publisher" warnings (cost/decision needed).
- The base image is big (~30 GB) – distribute it separately (download link + published SHA-256).

## Small steps
- [ ] **F.5.1** Installer from CI.
- [ ] **F.5.2** Code signing (decide certificate).
- [ ] **F.5.3** Base image download + hash check inside the app.
- [ ] **F.5.4** Auto-update check (optional).

## Done when
A clean Windows PC installs the app and builds a stick with no manual steps.

## Out of scope
macOS/Linux packages.
