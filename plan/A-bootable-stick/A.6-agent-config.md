# A.6 Agent – apply settings at boot

**Depends on:** A.1 · **Next:** A.7 · **Crates:** `crates/ck-agent-config`, `crates/ck-agent`

## Why
The stick turns the admin's settings into a configured contest machine at every boot.

## Context
- The settings are at `/boot/efi/ck/config.json` (EFI partition, mounted root-only).
- Runs as root from `ck-config.service`, early: after `/boot/efi` is mounted, before Squid,
  the display manager and the recorder (unit in A.7).
- What the prototype applied (worked in the VM): copy to `/etc/ck/config.json` (0600) and
  its hash; `/icpc/TEAM`, `/icpc/SITE` (used by the print script); recorder settings; Squid allowlist
  `/etc/squid/acl_allowed_domains.txt` (one site per line, leading dot).
- New in this step: branding –
  - computer name: `/etc/hostname` + the `127.0.1.1` line in `/etc/hosts`;
  - wallpaper: copy from the EFI folder to `/icpc/teamWallpaper.png` (the image's `firstLogin.sh`
    already prefers that file);
  - Firefox bookmarks and home page: rewrite those keys in `/usr/lib/firefox/distribution/policies.json`
    (keep everything else, especially the Squid certificate entry);
  - welcome text: a file shown at login (autostart entry).
- If the settings file is missing or invalid: keep the image defaults, log it, exit with an error code.
- The agent is a static musl binary (P0.2.4); no Python needed on the stick.

## Small steps
- [ ] **A.6.1** Read + validate settings; keep the root-only copy and SHA-256.
- [ ] **A.6.2** All paths relative to a configurable root (`/` on the stick, a temp folder in tests).
- [ ] **A.6.3** Apply team/site and Squid allowlist.
- [ ] **A.6.4** Write `/etc/ck/recorder.conf` (mode, delay, start time, interval).
- [ ] **A.6.5** Apply computer name.
- [ ] **A.6.6** Apply wallpaper.
- [ ] **A.6.7** Apply Firefox bookmarks and home page (JSON edit, keep the rest).
- [ ] **A.6.8** Welcome text.
- [ ] **A.6.9** Binary `ck-agent apply-config` with clear log lines (go to the journal).
- [ ] **A.6.10** Tests: each "apply" against a temp folder seeded with copies of the image's real files.

## Done when
Tests pass and the static binary runs `apply-config` successfully inside the VM (A.8).

## Out of scope
Heartbeats/uplink (B.5), capture (B.2).
