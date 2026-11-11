# F.2 Tauri admin app

**Depends on:** F.1, A.4 · **Next:** F.3 · **Folder:** `apps/admin` (Tauri 2 + Svelte 5 + TypeScript)

## Why
Organizers prepare contests in a window, not a terminal.

## Context
- Decision: Tauri 2 with a Svelte 5 + TypeScript UI (same stack and components as the dashboard).
  Rust side calls `ck-admin-core` and `ck-writer`.
- On this PC the Rust toolchain is GNU (no MSVC); check Tauri builds with it early (F.2.1). If not,
  install the Visual Studio C++ workload for this app only.
- WebView2 is part of Windows 11.

## Small steps
- [ ] **F.2.1** Tauri project builds and opens an empty window on this PC.
- [ ] **F.2.2** Contest page: platform, contest ID, times, practice flag.
- [ ] **F.2.3** Branding page: names, computer-name pattern, USB label, wallpaper (preview), bookmarks, welcome text.
- [ ] **F.2.4** Network page: allowed sites, API URL, unreachable mode.
- [ ] **F.2.5** Recording page: mode, delay, start time.
- [ ] **F.2.6** Validation messages inline (from `ck-protocol::validate`).
- [ ] **F.2.7** Build page: choose base image, build image or write sticks (F.1), progress, log.
- [ ] **F.2.8** Save/open profiles.

## Done when
A contest image and a stick can be produced entirely from the window.

## Out of scope
Batch mode (F.3), extra options (F.4).
