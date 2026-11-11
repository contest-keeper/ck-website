# F.3 Batch mode

**Depends on:** F.2 · **Next:** F.4

## Why
Contests have many teams; writing sticks one by one by hand is slow and error-prone.

## Context
- Input: a team list (CSV: team, site, optional pre-assigned handle).
- Each stick gets its own ID/key and the team's name pre-filled; the registry and a **manifest**
  (stick ID, team, serial number of the USB stick, image hash, written at) are updated.
- USB hubs allow several sticks at once; writing in parallel is limited by USB bandwidth.

## Small steps
- [ ] **F.3.1** Team list import and validation.
- [ ] **F.3.2** Queue of sticks to write; one-at-a-time first, parallel later.
- [ ] **F.3.3** Manifest file + export; label printing (team name ↔ stick serial).
- [ ] **F.3.4** Resume after interruption.

## Done when
Five sticks are written from a team list in one run and match the manifest.

## Out of scope
Pre-assigned handles enforcement (alert rule exists in E.4).
