# A.8 Automatic VM test

**Depends on:** A.5, A.7 · **Next:** B.1 · **Folder:** `tools/vmtest` (Rust binary)

## Why
One command that boots a test image and tells you PASS or FAIL – used after every change to the
patch or the agent.

## Context
- The QEMU setup that works on this PC is in context.md §6 (headless, WHPX, `qemu64`, 2 cores, virtio
  disk, VNC on 5901, monitor on 4444, `snapshot=on`).
- During planning we drove the VM through the QEMU monitor: `screendump` for screenshots and `sendkey`
  to type into a terminal (Ctrl+Alt+T opens one; the contestant is auto-logged in). Use **QMP** (QEMU's
  JSON control protocol) from Rust instead of the text monitor.
- Useful checks inside the guest (as `contestant`, no root needed): `systemd-analyze`,
  `systemctl is-active / is-enabled`, `cat` of the applied files, `ps -C ffmpeg`.
- Getting results out: either read the screen (fragile) or have the agent write a status report the
  test reads back – preferred: a `ck-agent self-test` that prints a JSON report, read via
  QEMU's serial console (`-serial` to a file) – no screen reading needed.
- Always boot from C:, never D:.

## Small steps
- [ ] **A.8.1** `ck-agent self-test` – checks services, applied settings, boot time; prints JSON.
- [ ] **A.8.2** A unit that runs the self-test at boot and writes it to the serial console (test images only,
  switched on by a flag in the settings).
- [ ] **A.8.3** `vmtest` launcher: fresh UEFI vars, start QEMU headless with serial to a file, wait for the
  report or time out, stop QEMU.
- [ ] **A.8.4** Compare the report with the expected settings → PASS/FAIL with reasons.
- [ ] **A.8.5** Screenshot on failure (QMP `screendump`) saved next to the report.
- [ ] **A.8.6** `docs/testing.md`: how to run it.

## Done when
`vmtest --image C:\rcpc\<test>.img --profile <file>` prints PASS for a correct image and FAIL with a
reason for a broken one.

## Out of scope
Running in CI (needs the big image and virtualization).
