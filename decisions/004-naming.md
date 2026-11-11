# 004 Fixed `ck-*` internal names, admin-chosen display names

- **Status:** accepted
- **Date:** 2026-11-10

## Context
The prototype used `rcpc` names, taken from the first contest. The tool must work for any contest, and
contestants see names on the machine (computer name, USB label, wallpaper, bookmarks, welcome text).

## Decision
Internal names are fixed and use the `ck-` prefix: crates, programs (`ck-agent`, `ck-forge`, `ck-hub`),
services on the stick (`ck-config`, `ck-uplink`, `ck-capture`, `ck-recorder`), files (`/usr/local/bin/ck-*`,
`/etc/ck/`, `/var/lib/ck/recordings/`), HTTP headers (`X-CK-*`) and the EFI folder `ck/`. Everything a
contestant sees is chosen by the admin per contest. The image's own ICPC parts (`/icpc/...`,
`icpc-team-reset`, `icpc-grow-root`) keep their names. Contest data such as `rcpc.kilonova.ro` stays as it is.

## Consequences
- Code and docs never depend on a particular contest's name.
- The prototype's `rcpc` names must be renamed when imported (done for the image patch).
- A search for `rcpc` should find only contest data and notes about the prototype.

## Alternatives considered
- **Keep `rcpc` names:** ties the tool to one contest.
- **Let admins rename internals:** makes every script, path and log different per contest.
