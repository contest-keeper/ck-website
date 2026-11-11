# 001 Settings live on the EFI partition

- **Status:** accepted
- **Date:** 2026-11-10

## Context
Every contest needs its own settings (platform, contest, allowed sites, names, recording) and every
stick needs its own ID and key. The base image is large (about 28 GB) and is the same for every contest.
The image has four partitions: BIOS boot, EFI (FAT32, 128 MiB), `ICPC` (FAT16, the contestant USB
area) and the ext4 root. The team reset wipes the contestant account and the `ICPC` partition.

## Decision
The admin tool writes `ck/config.json` (plus assets such as the wallpaper) to the EFI partition, and the
agent reads it at boot. The stick key lives there too. The image patch mounts `/boot/efi` with
`umask=0077`, so only root can read it.

## Consequences
- Windows can write a FAT partition natively, so the admin app needs no Linux tooling to configure a stick.
- No image rebuild per contest: one patched base image, many configurations.
- The settings survive the team reset, which only touches the `ICPC` partition.
- The key is still on the stick, so someone with physical access can read it. We accept this for now
  and reduce the risk in phase H (per-contest keys, Ed25519).
- The root-only mount is part of the image patch and must be verified after patching.

## Alternatives considered
- **Write settings into the ext4 root:** needs Linux filesystem access from Windows, and the admin
  would need a re-patched image per contest.
- **Use the `ICPC` partition:** the team reset wipes it, and contestants can read and write it.
- **Fetch settings from a server at boot:** needs network at boot and a way to identify the stick
  first. The key would still have to be stored on the stick.
