# B.4 Fresh login on every boot

**Depends on:** B.3 · **Next:** B.5

## Why
If Firefox remembers the platform login from a previous boot, no login happens, and the stick never
learns who is using it. Forcing a fresh login keeps "only on successful login" reliable.

## Context
- Firefox is configured by `/usr/lib/firefox/distribution/policies.json`; the agent already edits it
  (A.6). Firefox policies can clear cookies and site data on shutdown (`SanitizeOnShutdown`) or block
  cookies for chosen sites from persisting (`Cookies` → `Session`).
- The contestant's Firefox profile is in `/home/contestant/` (wiped by team reset, but not between
  normal reboots).
- Kilonova sessions last 30 days, so without this a login could survive across days.
- Prefer limiting it to the platform's sites, so other preferences are kept.

## Small steps
- [ ] **B.4.1** Choose the policy (`Cookies.Session` for the platform hosts, or `SanitizeOnShutdown`)
  and add it to the agent's Firefox policy edit, driven by the settings' platform hosts.
- [ ] **B.4.2** Belt and braces: at boot the agent removes the platform's cookies from the contestant's
  Firefox profile if present.
- [ ] **B.4.3** VM check: log in, reboot, open the judge → you must log in again.

## Done when
After a reboot the judge always asks for a login.

## Out of scope
Other browsers (only Firefox is in the image).
