# A.5 ck-forge – admin command line

**Depends on:** A.4 · **Next:** A.6 · **Crate:** `crates/ck-forge` (binary `ck-forge`)

## Why
A working admin tool long before the window (F.2) exists; also useful for scripting and CI.

## Context
- Thin layer over `ck-admin-core` using `clap`. No logic of its own.
- The prototype's commands (`build`, `configure`, `show`) worked; keep the same behaviour.
- Base image to use for testing: a working copy of the original on C: until A.7 produces
  `ck-os-base-<yyyy.mm>.img` (the earlier prototype images were deleted).

## Small steps
- [ ] **A.5.1** `ck-forge profile new <file>` – writes a profile with defaults and comments in a README.
- [ ] **A.5.2** `ck-forge profile check <file>` – prints validation problems.
- [ ] **A.5.3** `ck-forge image build --base <img> --out <img> --profile <file> [--registry <file>]`
  with a progress bar.
- [ ] **A.5.4** `ck-forge image configure <img> --profile <file>`.
- [ ] **A.5.5** `ck-forge image show <img>`.
- [ ] **A.5.6** `ck-forge registry list [--registry <file>]`.
- [ ] **A.5.7** Exit codes and messages in plain words; `--help` text for every command.

## Done when
`ck-forge image build` creates a test image from the real base image, and `image show` prints
its settings.

## Out of scope
Writing to USB sticks (F.1), GUI (F.2).
