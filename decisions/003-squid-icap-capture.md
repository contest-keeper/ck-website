# 003 Capture through the existing Squid proxy and an ICAP service

- **Status:** accepted
- **Date:** 2026-11-10

## Context
We need to see logins and submissions to the contest platform without storing passwords, cookies or
session IDs. The image already runs Squid (port 3128) with HTTPS interception (`ssl_bump`) and an
allowlist. The proxy is set in `/etc/environment` and in the Firefox policy. Squid 6.14 supports ICAP.
Outgoing traffic is allowed by the firewall today, so the proxy is a soft control that a contestant
could bypass.

## Decision
`ck-capture` is an ICAP service attached to the image's Squid. It reads the platform's login and submit
requests and reports only the username (after a successful login) and submission metadata and hashes.
It never keeps credentials. The capture can only be trusted once the network lock (D.4) blocks direct
outgoing connections.

## Consequences
- No replacement proxy and no browser extension on the stick, so it works with the image as it is.
- Capture depends on Squid's HTTPS interception and on the platform's request format, so each platform
  needs its own rule (B.3 and D.2 for Kilonova).
- Until D.4 is done, a login or submission that bypasses the proxy is not seen.
- Credentials pass through the proxy in memory. The service must never log or store them
  (see the security rules in the plan's `context.md`).

## Alternatives considered
- **Replace Squid with our own proxy:** more code to build and maintain, and it throws away a working setup.
- **Browser extension on the stick:** easy for a contestant to disable, and tied to one browser.
- **Platform API only:** the platforms do not show which machine a submission came from.
