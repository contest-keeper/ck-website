# A.9 Real hardware

**Depends on:** A.5, A.7 · **Can run in parallel with:** A.8 · **Next:** B.1

## Why
A VM is not a laptop. Real boot keys, Secure Boot, Wi-Fi chips and USB stick speed only show up on
real machines.

## Context
- Stick notes in context.md §10 (64 GB recommended; SanDisk Extreme Fit is the best under 200 Lei).
- Until our writer exists (F.1), write images with Rufus ("DD image" mode) or balenaEtcher.
  Double-check the target drive – writing destroys its contents.
- Laptop boot menu keys: F12 (Dell, Lenovo), F9 (HP), Esc/F8 (ASUS). Secured-core laptops may need
  "Allow Microsoft 3rd Party UEFI CA".
- `icpc-grow-root` expands the root partition to fill the stick on first boot.
- Boot-time check on the stick: `systemd-analyze; systemd-analyze blame | head -30;
  systemd-analyze critical-chain` (as `contestant`).

## Small steps
- [ ] **A.9.1** Build a test image with `ck-forge image build` and write it to a real stick.
- [ ] **A.9.2** Boot on 2–3 different laptops (different brands, at least one with no Ethernet).
- [ ] **A.9.3** Per laptop record: boot key, Secure Boot OK?, time to desktop, Wi-Fi works?, settings
  applied (computer name, wallpaper, bookmarks)?, recorder mode.
- [ ] **A.9.4** Run the boot-time commands; save the output.
- [ ] **A.9.5** Write findings to `docs/hardware.md`; add surprises to context.md.

## Done when
At least two laptops boot the stick with all settings applied, and the results are documented.

## Out of scope
Fixing driver gaps for exotic hardware (note them, decide later).
