# H.5 Recordings upload

**Depends on:** H.4 · **Next:** H.6

## Why
Organizers may want recordings on the server rather than collecting sticks after the contest.

## Context
- Recordings stay on the stick by default (`/var/lib/ck/recordings/`, root-only).
- Upload option: after the contest, or slowly during it at idle priority; bandwidth limit; resumable.
- Privacy: tell contestants; keep recordings only as long as needed (retention setting).

## Small steps
- [ ] **H.5.1** Settings: keep / upload after contest / upload during contest; retention days.
- [ ] **H.5.2** Uplink file transfer (resumable, signed, rate-limited).
- [ ] **H.5.3** API storage + per-team viewer link from alerts.
- [ ] **H.5.4** Retention clean-up job.

## Done when
A VM recording appears on the server and plays from an alert.
