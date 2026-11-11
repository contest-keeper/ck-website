# A.4 ck-admin-core – admin logic

**Depends on:** A.1, A.2, A.3 · **Next:** A.5 · **Crate:** `crates/ck-admin-core`

## Why
All admin behaviour in one library, so the command line (A.5) and the window (F.2) do exactly the same thing.

## Context
- A **contest profile** = the admin's settings for one contest, saved as a JSON file.
- A **stick registry** = stick ID → token, team, site, contest, image, created time. The API uses it to
  check signatures (B.6). The prototype used `registry.json` next to the image – same idea.
- Building a contest image = copy the patched base image, give it a new stick ID and token, write the
  settings to its EFI partition, add it to the registry.
- Safety rules: never overwrite the base image; check free space first (images are ~30 GB);
  refuse to continue if validation fails.

## Small steps
- [ ] **A.4.1** `Profile` load/save/validate (wraps `ck-protocol::Settings` with a name and file path).
- [ ] **A.4.2** `Registry` load/save, add stick, list, find by ID; atomic writes (write temp, rename).
- [ ] **A.4.3** `make_stick_config(settings)` – new stick ID (UUID v4), token, creation time.
- [ ] **A.4.4** `build(base, out, profile, registry)` – checks, copy with progress, write settings, register.
- [ ] **A.4.5** `configure(image, profile, registry)` – same, on an existing copy (no 30 GB copy).
- [ ] **A.4.6** `show(image)` – read settings from an image, hiding the token.
- [ ] **A.4.7** Progress and log callbacks (used by both CLI and GUI).
- [ ] **A.4.8** Tests on the fixture image: build, configure, show, registry contents, error cases.

## Done when
`cargo test -p ck-admin-core` passes.

## Out of scope
User interface (A.5, F.2), writing to USB sticks (F.1), batch mode (F.3).
