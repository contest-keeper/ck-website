# A.1 ck-protocol – shared types

**Depends on:** P0.2 · **Next:** A.2 · **Crate:** `crates/ck-protocol`

## Why
One definition of the settings and messages used by the admin app, the agent and the API, so they
can never disagree about the format.

## Context
- The settings file lives at `ck/config.json` on the stick's EFI partition (ADR-001).
- The prototype's draft is `crates/rcpc-common/src/lib.rs` (from the planning session): types,
  defaults, validation and tests. Reuse its ideas, rename to `ck-protocol`, and extend with branding.
- The prototype's JSON field names already work end to end – keep them unless there's a reason
  (contest, team, site, allowed_domains, recording{mode,start_delay_s,start_at}, api{url,heartbeat_s,token}).
- Options the admin will set (context.md §2 and the option list): contest, branding, network,
  recording, API. Later steps add: Wi-Fi, USB storage block, languages, keyboard, printing (F.4).
- Only data types and pure functions here – no file or network access.

## Small steps
- [ ] **A.1.1** `Contest` – platform (kilonova/codeforces/vjudge/other), contest ID, display name,
  start and end time (local, ISO 8601), practice flag.
- [ ] **A.1.2** `Branding` – display name, computer-name pattern (`{team}`, `{site}`, `{n}`
  placeholders), USB label (max 11 chars, FAT rules), wallpaper file name, bookmarks (title + URL),
  home page, welcome text.
- [ ] **A.1.3** `Network` (allowed sites), `Recording` (mode off/snapshots/low/standard, start delay,
  start time, snapshot interval), `Api` (URL, heartbeat interval).
- [ ] **A.1.4** `Settings` = all of the above with sensible defaults; `StickConfig` = settings +
  `schema` (1) + `stick_id` + `created_at` + `token`.
- [ ] **A.1.5** `validate()` → list of plain-language problems (bad time, bad URL, bad site name,
  USB label too long, unknown placeholder…).
- [ ] **A.1.6** `Heartbeat` message (stick ID, boot ID, sequence, sent time, uptime, image version,
  settings hash, team, site, recorder status). Login/submission events come in B.5 / D.3.
- [ ] **A.1.7** Tests: JSON round trip; defaults; every validation rule; reading the prototype's
  `config.json` sample.

## Done when
`cargo test -p ck-protocol` passes and the crate has no I/O dependencies.

## Out of scope
Signing (A.2), reading/writing images (A.3).
