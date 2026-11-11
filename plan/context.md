# Contest Keeper – shared context

Read this before starting any step. Each step file adds only what is specific to that step.
Keep this file up to date: when a step teaches us something, add it here.

---

## 1. What we are building

**Goal:** Contest Keeper helps organizers check that submissions are genuine – written by the
contestant during the contest, without AI or outside help.

**First version:** prove that each submission was sent from an official contest machine (the stick),
by the logged-in contestant, and warn organizers in real time when it wasn't. That's the foundation;
later checks build on it (recordings, code history, typing/editing evidence, similarity – to be planned).

| Part | Who uses it | What it does |
|---|---|---|
| **Admin app** | Organizer, on Windows | Sets up a contest (platform, contest, allowed sites, names and look, recording, …) and makes bootable sticks, each with its own ID and key. |
| **Agent** | Runs on the stick | Applies the settings at boot, detects who logs into the platform (only after a successful login), captures submissions, reports everything signed to the API. |
| **API server** | Runs on a server | Receives stick reports, watches the contest on the platform, matches every submission, raises alerts. |
| **Admin dashboard** | Organizers, in a browser | Live view of sticks, users, submissions and alerts. Served by the API. |

Flow: `Admin app → sticks (agent) → API server ← contest platform` and `API server → dashboard (live)`.

---

## 2. Decisions made (2026-11-10)

| Topic | Decision |
|---|---|
| Name | **Contest Keeper**, with the parts **Keeper OS**, **Keeper Forge**, **Keeper Hub**, **Keeper Extension** (§3). Internal names fixed (`ck-*`, crates `ck-*`). Everything contestants see (contest name, computer names, USB label, wallpaper, bookmarks, welcome text) is chosen by the admin. |
| Language | **Rust** everywhere. Python was rejected; the Python prototype is kept only as a reference. |
| UIs | **Svelte 5 + TypeScript** (latest release, same as the extension) for the admin app (inside **Tauri 2**) and the dashboard. Dashboard is served by the API. |
| API | **Axum** (Tokio), **PostgreSQL** via **SQLx**, WebSocket for live updates, OpenAPI via `utoipa`, Docker Compose, HTTPS via **Caddy** (or the cloud's own HTTPS). |
| Contest machines | **x86 PCs only** (normal Windows laptops/desktops booting the stick). Apple Silicon cannot boot USB Linux – dropped. |
| Admin app OS | **Windows first**, code kept cross-platform (only stick writing differs per OS). |
| Base image | Keep **the same image** the contest already uses; add the contest-keeper agent and fixes with a patch. No rebuild per contest – per-contest settings go on the EFI partition. |
| Capture | Through the image's existing **Squid** proxy + an **ICAP** service (Squid 6.14 in the image supports ICAP). |
| Login detection | Report the username **only after a successful login**. Never store passwords, cookies or session IDs. |
| Recording | Optional: off / snapshots / low / standard. Starts at contest time or after a delay, idle CPU/disk priority. |
| Start order | Phase A (bootable stick) → Phase B (Kilonova login detection). |
| Open source + GitHub | Open-source project in the GitHub organization **`contest-keeper`** (name free on 2026-11-10; you create it in P0.0). |
| Repositories | One per product, `ck-<part>` like Safe Exam Browser's `seb-*` (folder `D:\ck-<part>` = repository name): `ck-protocol` (shared Rust code, version-tagged), `ck-os`, `ck-forge`, `ck-hub`, `ck-hub-setup`, `ck-extension` (moved from `robbertpopa/contest-keeper`), `ck-website` (docs, plan), `ck-backend` (.NET, moved, to retire), `ck-app` (future); plus `contest-keeper/.github` (org front page). See §3 and §12. |
| One server | The new Rust `ck-hub` is the only server long-term: first the stick checks, later the extension moves onto it (phase X) and the .NET backend retires. |
| Focus | The bootable stick and the server that compares submissions with it (phases A–E). |

---

## 3. Naming conventions

Chosen 2026-11-10: **Keeper OS** (bootable system + agent), **Keeper Forge** (admin tool),
**Keeper Hub** (server + dashboard), **Keeper Extension**. The project as a whole is **Contest Keeper**.

| Thing | Name |
|---|---|
| GitHub | Organization `contest-keeper`: `/ck-protocol`, `/ck-os`, `/ck-forge`, `/ck-hub`, `/ck-hub-setup`, `/ck-extension`, `/ck-website`, `/ck-backend` (archived after X), `/ck-app` (future), `/.github` (org front page). |
| Folders on disk | `D:\ck-protocol`, `D:\ck-os`, `D:\ck-forge`, `D:\ck-hub`, `D:\ck-hub-setup`, `D:\ck-extension`, `D:\ck-website`, `D:\ck-backend`, `D:\ck-images` (not Git). Today this plan lives in `D:\contest-keeper-app` (to become `D:\ck-os`). |
| Display names | Contest Keeper; Keeper OS, Keeper Forge, Keeper Hub, Keeper Extension (READMEs start with e.g. "Contest Keeper Hub – …") |
| Rust crates | `ck-protocol`, `ck-crypto`, `ck-image`, `ck-admin-core`, `ck-writer`, `ck-agent-config`, `ck-agent-uplink`, `ck-capture`, `ck-store`, `ck-platform`, `ck-platform-<name>`, `ck-matcher`, `ck-alerts`, `ck-api`, `ck-testkit` |
| Programs | `ck-forge` (admin CLI, later also the Tauri window "Keeper Forge"), `ck-agent` (on the stick), `ck-hub` (server) |
| Services on the stick | `ck-config`, `ck-uplink`, `ck-capture`, `ck-recorder` |
| Files on the stick | `/usr/local/bin/ck-*`, `/etc/ck/`, `/var/lib/ck/recordings/` |
| Settings on the EFI partition | `ck/config.json` (plus assets such as the wallpaper in the same folder) |
| HTTP headers | `X-CK-Stick` (stick ID), `X-CK-Signature` |
| Images | Original `rcpc-2026-original.img`; built bases `ck-os-base-<yyyy.mm>.img`; folder `D:\ck-images\` |
| Not renamed | The image's own ICPC parts: `/icpc/...`, `icpc-team-reset`, `icpc-grow-root` |

---

## 4. The base image (what we know)

**Files**
- Original: `D:\contest-keeper\rcpc-newpass.img` – 29,884,416,000 bytes (27.8 GiB), unpatched, filesystem
  clean (checked 2026-11-10). **The only image kept** – never modify it. (Moves to `D:\ck-images\` in P0.0.)
- All copies, the patched prototype images and the VirtualBox VM were deleted on 2026-11-10.
  Re-create working copies when a step needs them (A.7.7): copy the original to `C:\rcpc\` first –
  **D: is a spinning HDD**, running VMs or patching from D: is very slow.
- UEFI firmware for QEMU: copy `C:\Program Files\qemu\share\edk2-x86_64-code.fd` and
  `edk2-i386-vars.fd` next to the working copy (paths with spaces break QEMU's arguments).

**System:** Ubuntu 24.04.5 LTS, kernels 7.0.0-42 and 6.8.0-147, Xfce (xubuntu session), LightDM
auto-login as `contestant`. Built 2026-10-29, revision `171c4a6`. Boots on UEFI and BIOS.
Based on the ICPC contest image, customised for RCPC 2026 (judge: `rcpc.kilonova.ro`).

**Partitions (GPT, 512-byte sectors)**

| # | Start sector | Size | Type | Contents |
|---|---|---|---|---|
| 1 | 2048 | 1 MiB | BIOS boot | GRUB for legacy boot |
| 2 | 4096 | 128 MiB | EFI system (FAT32, label `EFI`, UUID `4424-D0E6`) | `EFI/ubuntu` (shim, GRUB). **Our settings go here.** Mounted at `/boot/efi`. |
| 3 | 266240 | 192 MiB | Basic data (FAT16, label `ICPC`) | Contestant USB area, mounted at `/mnt/usbdrive`. **Wiped by team reset** – don't store anything here. |
| 4 | 659456 | 27.5 GiB | Linux (ext4, `metadata_csum`, `64bit`) | Root filesystem. Byte offset 337,641,472. |

**Accounts:** `contestant` (auto-login, no password, may run only `refresh-contest-ip.sh` as root),
`icpcadmin` (full sudo, no password prompt), `teamreset` (login that only triggers the team reset).

**Network lockdown in the image**
- Squid on port 3128 with HTTPS interception (`ssl_bump`, CA `/etc/squid/squidCA.crt`), allowlist
  `/etc/squid/acl_allowed_domains.txt`: cppreference, docs.python.org, docs.oracle.com, kotlinlang.org,
  rcpc.kilonova.ro. Proxy set in `/etc/environment` and Firefox policy.
- UFW: incoming denied except SSH; **outgoing allowed** – the proxy is a soft control until Phase D.
- `/icpc/scripts/firewall.sh` is a disabled leftover from the Greek contest (grcpc.gr). Don't enable it.
- Firefox policies: `/usr/lib/firefox/distribution/policies.json` (bookmarks, home page, Squid CA).
- Networking: wired via **systemd-networkd** (netplan `01-netcfg.yaml`), Wi-Fi via NetworkManager.

**Other image parts:** IDEs (VS Code, Eclipse, IntelliJ, PyCharm, CLion, Code::Blocks, Geany, NetBeans),
GCC 13/14, OpenJDK 21, Python 3.12, Kotlin; offline docs in `/opt/localwww`; CUPS + `pcpr` print
script (hard-coded to US Letter); `icpc-grow-root` grows the root partition to fill the stick;
team reset wipes the contestant account and the ICPC partition. cloud-init is disabled.

**Measured in the VM (on SSD):** original boot 12.2 s to desktop; patched 10.9 s. Old recorder
≈3–4 % of one core. The real risk on laptops: `systemd-networkd-wait-online` waits up to 2 minutes
with no cable (patched to 10 s).

---

## 5. What the prototype already proved

Located (until P0.1.3 brings it in) in the planning session's `rcpc-stick/` folder:
`image-patch/` (Linux files + `apply-to-image.sh`), `prototype/` (Python agent, admin tool, test API),
`crates/rcpc-common` (first Rust draft, not compiled).

Verified in the VM on a test image (since deleted; rebuild with the patch if needed):
- Settings written by the admin tool to the EFI partition were applied at boot (team, site, recording, allowlist).
- Signed heartbeats reached the test API 9 s after boot; all accepted.
- Recorder started 60 s after the desktop in `low` mode (1 fps, half resolution, idle class).
- `/boot/efi` became root-only; unneeded services masked; filesystem check clean.

---

## 6. Development machine (this PC)

| Item | State |
|---|---|
| OS / CPU / RAM | Windows 11 Pro, i7-11700 (16 threads), 32 GB RAM (often only ~6 GB free) |
| Disks | C: Kingston NVMe SSD 466 GB · D: WD 1 TB **HDD** |
| Rust | 1.99.1, default toolchain `stable-x86_64-pc-windows-gnu`, target `x86_64-unknown-linux-musl` added |
| Linux builds | Zig 0.17.0 + `cargo-zigbuild` 0.24.1 (`cargo zigbuild --target x86_64-unknown-linux-musl`) |
| C compiler | WinLibs GCC (MinGW, UCRT). **No MSVC C++ tools** (Visual Studio 2026 without the C++ workload). |
| WSL | Ubuntu 24.04 with `debugfs`, `e2fsck`, `sfdisk`. No `gcc`. `sudo` needs your password. |
| QEMU | 11.1, `C:\Program Files\qemu`, acceleration WHPX |
| Viewer | TigerVNC `C:\Program Files\TigerVNC\vncviewer.exe` |
| Also installed | VirtualBox 7.2 (not usable – slow; its test VM was deleted), Node (nvm4w), .NET SDK, Go, Docker Desktop |

**QEMU command that works** (headless; view with TigerVNC at `127.0.0.1:5901`):
```
qemu-system-x86_64 -machine q35 -accel whpx -cpu qemu64 -smp 2 -m 4096
  -drive if=pflash,format=raw,readonly=on,file=C:\rcpc\OVMF_CODE.fd
  -drive if=pflash,format=raw,file=C:\rcpc\OVMF_VARS.fd
  -drive file=C:\rcpc\<image>.img,format=raw,if=none,id=d0,snapshot=on,cache=unsafe,aio=threads
  -device virtio-blk-pci,drive=d0 -device qemu-xhci -device usb-tablet -device usb-kbd
  -device VGA,vgamem_mb=64
  -netdev user,id=n0,hostfwd=tcp:127.0.0.1:2222-:22 -device virtio-net-pci,netdev=n0
  -display none -vnc 127.0.0.1:1 -monitor tcp:127.0.0.1:4444,server,nowait
```
- `snapshot=on` keeps the image unchanged. Inside QEMU's user network the host is `10.0.2.2`.
- Screenshots: QEMU monitor `screendump file.ppm`. Typing: monitor `sendkey`.
- Copy `C:\Program Files\qemu\share\edk2-i386-vars.fd` to a fresh `OVMF_VARS.fd` before each boot.

---

## 7. Gotchas we hit (don't repeat them)

- **debugfs `mkdir` on an existing folder corrupts ext4** (reserves an inode/block, then fails).
  Only create missing folders. Always finish with `e2fsck -fn "<img>?offset=<bytes>"`.
- debugfs `write` puts the file in the *current* folder: `cd` into the folder first.
- Windows line endings break shell scripts on the stick – strip `\r` from text files only, never binaries.
- QEMU arguments with spaces (`C:\Program Files\...`) break firmware paths – copy firmware to `C:\rcpc\`.
- QEMU's own window (GTK and SDL) froze on this PC – run headless and use VNC.
- `-cpu host` and 6 cores hung the firmware; generic `qemu64` with 2 cores is stable.
- VirtualBox falls back to slow Hyper-V mode here (Docker/WSL hold the hypervisor).
- The EFI partition was mounted world-readable (`defaults`); patched to `umask=0077` so contestants
  can't read the stick key.
- PowerShell `rd` is an alias for `Remove-Item` – don't name helper functions `rd`.
- Never run boots or copies from D: (HDD) – use C:.

---

## 8. Platforms

**Kilonova** (`https://kilonova.ro`, contest instance `https://rcpc.kilonova.ro`) – [API docs](https://kilonova.ro/posts/kilonova-api)
- Base path `/api`. Response envelope: `{"status":"success","data":…}` or `{"status":"error","data":"<message>"}`.
- `POST /api/auth/login` with `username`, `password` → success `data` = session ID.
- `POST /api/auth/logout` (authenticated) deletes the session.
- `/api/user/getSelf` → current user. Sessions last 30 days; `/api/auth/extendSession`.
- API clients authenticate with `Authorization: <session id>` (no "Bearer"); guests send `Authorization: guest`.
- To confirm in B.1: what the *website* sends (form vs JSON, cookie name).

**Codeforces** – official API (`contest.status`, …), roughly 1 request per 2 seconds; source code
needs a login (organizer access).

**vJudge** – no official API; scraping or exports.

---

## 9. Security and privacy rules (apply to every step)

- Never store or send passwords, cookies or session IDs. Only usernames, hashes and metadata.
- Contestants must be told the stick reports logins, submissions and (if enabled) records the screen.
- Credentials are always typed by a person, never by a script.
- The stick key lives only on the EFI partition (root-only) and in the admin registry.
- Physical access to a stick can expose its key – accepted for now, reduced in Phase H.
- Writing to disks is destructive: always confirm the target, refuse system disks, verify after writing.

---

## 10. Stick hardware notes

Boot speed depends on the stick's small-write speed. From benchmarks: SanDisk Extreme Fit 64 GB
(≈185 Lei, USB-C, ~85–180 MB/s writes) is the best under 200 Lei; Kingston microDuo 3C 64 GB
(≈105 Lei, USB-A + USB-C) is cheap but writes ~15–55 MB/s. The image needs ≥ 32 GB; 64 GB recommended.
Laptop boot keys: F12 (Dell, Lenovo), F9 (HP), Esc/F8 (ASUS). Some "Secured-core" laptops need
"Allow Microsoft 3rd Party UEFI CA" enabled in the firmware settings.

---

## 11. Open questions

1. Where the server runs. Database: PostgreSQL (the existing backend already uses Neon PostgreSQL + Redis).
2. Organizer API access on Kilonova (needed for Phase E).
3. Internet at the venue during the contest.
4. ~~How organizers log into the dashboard~~ – accounts like the existing backend's (email + Google), built in C.2, extended in X.2.
5. ~~CI~~ – **GitHub Actions** (both existing repositories already use it).
6. ~~License~~ – **Apache-2.0** for every repository.
7. ~~Dashboard UI~~ – **Svelte 5**, same as the extension.

---

## 11b. Conventions (decided 2026-11-10)

All rules live in `contest-keeper/.github` (`CONTRIBUTING.md`) and apply to every repository.

- **Branches:** `feature/`, `fix/`, `chore/`, `docs/`, `epic/` + lowercase-dashed name. Never commit to `main`.
- **Commits / PR titles:** Conventional Commits, no scope, lowercase imperative: `feat: add ESP config reader`.
  Types: feat, fix, perf, refactor, docs, test, build, ci, chore. Breaking: `feat!:`.
- **Merging:** PRs only, squash merge, PR title = commit on `main`. CI check `title / pr-title` validates it.
  `main` is protected by a ruleset (no deletion, no force push, PR required, conversations resolved).
- **Versions:** SemVer per repository. Releases by **release-please** (release PR + changelog from feat/fix;
  merging it tags and runs the release pipeline). No manual release steps.
- **Quality:** Rust: rustfmt, clippy `-D warnings` (+ pedantic via `[workspace.lints]`), cargo-deny.
  TS/Svelte: Prettier, ESLint, svelte-check, strict TypeScript. Every PR also runs typos, shellcheck, actionlint.
- **Code conventions:** `contest-keeper/.github/conventions/` – rust, web, api, database, system (shell/systemd/image),
  testing, security, docs. Key points: pure logic + thin I/O edges; thiserror/anyhow, tracing, tokio;
  API under `/api/v1/`, snake_case JSON, RFC 3339 UTC, RFC 9457 errors, cursor pagination, OpenAPI generated;
  events carry `event_id` (UUIDv7) and are safe to resend; PostgreSQL via sqlx with forward-only migrations.
- **Package manager:** pnpm for all web projects (the extension moves from yarn when it joins, P0.0.3). Node LTS via `.nvmrc`.
- **Rust toolchain:** pinned in `rust-toolchain.toml` (1.99.1 + musl target), edition 2024.
- **Every repo has:** `CLAUDE.md`, `CODEOWNERS`, `.gitignore`, `.editorconfig`, `.gitattributes`, Dependabot,
  shared labels (bug, enhancement, documentation, dependencies, security, breaking, good first issue,
  help wanted, question, blocked, plan), topics, secret scanning with push protection.
- **Dependencies:** Dependabot, weekly, grouped; security alerts and fixes on.
- **Texts:** short and plain, no AI attribution in commits or PRs.
- **Shared CI:** reusable workflows in `contest-keeper/.github/.github/workflows/` (`pr-title`, `rust-ci`,
  `web-ci`, `release-please`); repositories call them with `uses: contest-keeper/.github/.github/workflows/<name>.yml@main`.
  Starter files in `.github/templates/` (rustfmt, deny, CI and release callers, release-please config).
- **Claude Code:** plugin `ck` from the `contest-keeper/.github` marketplace, enabled in each repo's
  `.claude/settings.json`. Skills: `/ck:next-step` (do the next plan step) and `/ck:commit-pr`.
- **Logo:** the extension's pixel monitor icon (`.github/profile/logo.svg`); 512 px PNG in `docs/logo-512.png`.

## 12. Existing Contest Keeper projects

Contest Keeper already exists (today under the GitHub user `robbertpopa`; moving to the organization
`contest-keeper` in P0.0). "Becomes" = the repository name inside the organization:

| Today | Becomes | What it is |
|---|---|---|
| `D:\contest-keeper` → `robbertpopa/contest-keeper` | `ck-extension` | Browser extension: WXT, **Svelte 5**, TypeScript. Chromium first (Firefox/Safari with fewer features). Participants join a **room**; it checks one display and screen sharing, keeps tab and extension history, checks blocked sites/extensions. Accounts and rooms come from the backend. Server address fixed at build time (`VITE_API_BASE_URL`, default `http://localhost:5299`). Tests: `node --test`, `svelte-check`. |
| `D:\contest-keeper-backend` → `robbertpopa/contest-keeper-backend` | retired after phase X | **.NET 10 / ASP.NET Core**, Clean Architecture (Core, UseCases, Infrastructure, Web). PostgreSQL (Neon) via EF Core, Redis. ASP.NET Identity accounts under `/api/auth` (single-use refresh tokens in Redis), Google sign-in with PKCE for the extension, rooms under `/api/rooms` (hosts create; join by code `ABCD-2345`; guests), invitations (`/invite/{token}`), rate limits, `/health`. `ContestScheduleProvider` already reads contest dates from Codeforces, Kilonova and vJudge. Supported sites: `vjudge.net`, `codeforces.com`, `kilonova.ro`. |
| `D:\contest-keeper-app` | `ck-os` | This plan and the stick work (prototype in `rcpc-stick/`). |
| – | `ck-hub` | New Rust server (stick checks first; later also the extension). |
| – | `ck-app` | A possible future app. |
| – | `ck-protocol` | Shared Rust code (settings, events, signing, image tools), version-tagged. |
| – | `ck-forge` | Keeper Forge, the admin tool. |
| – | `ck-hub-setup` | Docker deployment of Keeper Hub. |
| – | `ck-website` | Website, docs, this plan. |
| – | `.github` | Organization front page, contributing guide, code of conduct, security policy, templates. |

**Concepts to keep:** a **room** is a contest (host, participants, website, contest link, times, rules).
The stick work should use rooms rather than inventing a second "contest" concept (see X.3).

**Housekeeping found (2026-11-10):** `D:\contest-keeper` also holds `rcpc-newpass.img` (30 GB), the
old VirtualBox folder `vm\` (26 GB) and an empty nested Git repository – none are git-ignored.
The extension has uncommitted changes. Clean-up is step P0.0.

## 13. Current local workflow (2026-11-11)

- Plans, prototypes, and local Codex instructions stay in `D:\contest-keeper-app`.
  Product repositories are cloned under `D:\contest-keeper\`; the extension is
  separate at `D:\contest-keeper-extension` and its uncommitted work stays untouched.
- New backend implementation uses Rust in `ck-hub`; the .NET backend is not part
  of the new implementation. Extension integration comes later.
- Work branches start from `develop`; feature PRs squash into `develop`, and
  promotion PRs merge `develop` into `main`. Keep branch names short; add the real
  repository issue number once the board is in use. Never add co-author trailers.
- Personal commit identity is `robbertpopa` with
  `95902235+robbertpopa@users.noreply.github.com`, including rewritten past commits
  in the organization repositories. Do not use a work email. Genuine bot authors
  and GitHub's platform committer identity remain unchanged.
- `ck-os` repository basics were merged into `develop` in PR #3. Create folders
  when real files need them; do not add placeholder READMEs to every folder.
- The next local change is `chore/image-patch`: ten reference patch files imported
  into `ck-os/image/patch`, with LF endings, shell formatting, and explanatory lint
  comments. Patch logic is preserved; names and references are generalized to
  `ck-config`, `ck-uplink`, `/etc/ck`, and `/usr/local/lib/ck/ck_agent.py`. No RCPC
  naming remains in the imported patch. Our recorder uses `ck-recorder.service`,
  `/usr/local/bin/ck-recorder`, `/etc/ck/recording.conf`, and `/var/lib/ck/recordings`.
  Legacy ICPC recorder names remain only in the base-image cleanup lists, which
  disable the original service and remove its leftover recordings. Rust integration
  and an actual image/VM test are later work.
- `apply-to-image.sh` is now a short five-stage workflow. Low-level commands live
  in `image/patch/lib/image-tools.sh`, with readable command blocks and named
  partition, permission, and service checks. Nine standard-library Python regression
  tests use simulated image tools and run in PR CI. Eight direct comparisons with
  the previous helper produced identical image command lists and outcomes.
  The real contest image has not been modified or tested for this change.
- Keep `image-version` as the installed image's identification label. Its current
  development text is a placeholder. When image builds are added, the pipeline
  must generate it from the actual release/build identity instead of maintaining
  a hardcoded version string by hand.
