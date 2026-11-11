# B.2 ck-capture – ICAP service for Squid

**Depends on:** B.1 · **Next:** B.3 · **Crates:** `crates/ck-capture`, binary inside `ck-agent`

## Why
Squid already sees every decrypted request on the stick. ICAP lets Squid hand selected requests and
responses to our service, which turns them into events – without changing any traffic.

## Context
- ADR-003. Squid in the image is 6.14, built with ICAP support (`icap_enable`, `icap_service`,
  `adaptation_access` present in the binary).
- Current Squid config: `http_port 3128 ssl-bump …`, allowlist ACL, `ssl_bump bump all`.
- ICAP (RFC 3507) basics: `OPTIONS` (capabilities), `REQMOD` (request), `RESPMOD` (response);
  encapsulated HTTP headers + chunked body; "preview"; reply `204 No Content` = "unchanged".
- The service must **never modify** traffic and must be fast; if it is down, Squid's `bypass` setting
  decides whether traffic continues (choose `bypass=on` for B; strictness comes in D.5).
- Run as a dedicated system user, listen only on `127.0.0.1:1344`.
- Squid can pass a transaction ID header so a request and its response can be paired.

## Small steps
- [ ] **B.2.1** ICAP message parser (request line, ICAP headers, `Encapsulated` offsets, chunked body,
  preview) – pure code, tested on recorded messages.
- [ ] **B.2.2** Async server (Tokio): answer `OPTIONS`; for `REQMOD`/`RESPMOD` read, hand to rules,
  reply `204`. Size and time limits.
- [ ] **B.2.3** Rule interface: `fn on_request(…) -> Vec<Event>` and `fn on_response(…)`, with pairing
  by transaction ID.
- [ ] **B.2.4** `ck-capture.service` (system user, `127.0.0.1:1344`).
- [ ] **B.2.5** Squid config snippet in the image patch: ICAP services for request and response,
  `adaptation_access` only for the platform's auth URLs (from the settings).
- [ ] **B.2.6** VM check: a login request passes through Squid to the service (log line), and the page
  still works normally.

## Done when
Parser tests pass and the VM check shows the service seeing login traffic without breaking the site.

## Out of scope
Platform rules (B.3), sending events anywhere (B.5).
