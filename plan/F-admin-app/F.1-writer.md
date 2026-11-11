# F.1 ck-writer – stick writer

**Depends on:** A.3 · **Next:** F.2 · **Crate:** `crates/ck-writer`

## Why
Write images to USB sticks directly from Keeper Forge, safely, instead of using Rufus.

## Context
- Windows first; macOS/Linux later behind the same interface (only this crate is OS-specific).
- Windows: list disks (WMI / `IOCTL_STORAGE_*`), lock and dismount the stick's volumes, write to
  `\\.\PhysicalDriveN`, needs administrator rights (UAC prompt).
- **Destructive operation.** Refuse the system disk and any non-removable disk; show model, size and
  serial; require typing a confirmation; verify by reading back (hash).
- Sticks are slow writers (context.md §10) – show realistic progress and time estimates.

## Small steps
- [ ] **F.1.1** List removable disks with model, size, serial, bus type.
- [ ] **F.1.2** Safety checks (system disk, size ≥ image, not mounted as Windows' own volume).
- [ ] **F.1.3** Lock/dismount volumes; raw write in large aligned blocks; progress.
- [ ] **F.1.4** Read-back verification (SHA-256).
- [ ] **F.1.5** Write the per-stick settings after the image (via A.3 on the device, or patch the image
  bytes before writing).
- [ ] **F.1.6** Elevation: a small helper process started with UAC; the GUI itself stays unelevated.
- [ ] **F.1.7** Manual test on real sticks; never in CI.

## Done when
A stick written by `ck-writer` boots and passes the A.9 checks.

## Out of scope
macOS/Linux writers.
