# A.7 Image patch

**Depends on:** A.6 · **Next:** A.8 · **Folder:** `image/patch/`

## Why
Turn the contest's existing image into the Keeper OS base image, once, in a repeatable and
verified way.

## Context
- Prototype patch (planning session `rcpc-stick/image-patch/`): `rootfs/` files, `mask-units.txt`,
  `remove-files.txt`, `apply-to-image.sh` (runs in WSL with `debugfs`, `e2fsck`, `sfdisk`; no root needed).
  It was applied to a test copy (since deleted) and verified (all files read back identical; e2fsck clean).
- Root filesystem: partition 4, starts at sector 659456 (byte offset 337,641,472). debugfs addresses it
  as `"<image>?offset=<bytes>"`.
- **Gotchas** (context.md §7): `mkdir` on an existing folder corrupts the filesystem – only create
  missing ones; `write` needs a `cd` first; strip `\r` only from text files.
- What the prototype patch already did and must keep: mask unneeded services (updates, fwupd,
  Performance Co-Pilot, apport, ModemManager, multipath/LVM/iSCSI…); cap network waits at 10 s
  (`systemd-networkd-wait-online --any --timeout=10`, `NM_ONLINE_TIMEOUT=10`); mount `/boot/efi` with
  `umask=0077`; delete the two leftover test recordings; image version stamp.
- Renames (context.md §3): `ck-config.service`, `ck-recorder.service`,
  `/usr/local/bin/ck-recorder`, `/etc/ck/recorder.conf`,
  `/var/lib/ck/recordings/`.

## Small steps
- [ ] **A.7.1** Rename units, scripts and paths; recorder reads `/etc/ck/recorder.conf`.
- [ ] **A.7.2** Remove the old recorder: mask `icpc-screen-record.service`, remove it from
  `graphical.target.wants`, delete `/icpc/scripts/screen-record`.
- [ ] **A.7.3** Add the agent binary (`/usr/local/bin/ck-agent`, built by P0.2.4) and
  `ck-config.service`.
- [ ] **A.7.4** Patch script: binary-safe line endings, folder removal support, idempotent re-runs.
- [ ] **A.7.5** Verification at the end: every file reads back identical; `e2fsck -fn` clean; list of
  masked/enabled units printed.
- [ ] **A.7.6** `tools/patch-image.ps1 -Image C:\rcpc\<copy>.img` – runs the patch through WSL.
- [ ] **A.7.7** Produce the new base: copy `D:\contest-keeper\rcpc-newpass.img` to
  `C:\rcpc\ck-os-base.img`, patch it, record its SHA-256 in `docs/base-images.md`.

## Done when
`ck-os-base.img` passes the verification and its hash is recorded.

## Out of scope
Capture and uplink services (B.2, B.5), network lock (D.4).
