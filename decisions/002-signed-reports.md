# 002 Every report is signed with the stick's own key

- **Status:** accepted
- **Date:** 2026-11-10

## Context
The server must trust that a login or submission report came from an official stick and not from a
contestant's own machine. A shared key would let one leaked stick forge reports for all of them.

## Decision
Each stick has its own ID and key, created by the admin tool. The agent signs every report. The first
version uses HMAC-SHA256 over the exact request body, sent in a signature header with the stick ID in
another header (`X-CK-Signature` and `X-CK-Stick`). The server records its own receive time and does
not trust the stick's clock. The signing code sits behind a `Signer`/`Verifier` interface in
`ck-crypto`, so Ed25519 can replace HMAC in phase H (H.1) without changes elsewhere.

## Consequences
- One stolen key only impersonates one stick.
- With HMAC the server holds every stick's secret, so a server leak exposes all keys. Ed25519
  fixes this, because the server then holds only public keys.
- Events carry an `event_id` and are safe to resend, so retries after a network failure do not duplicate data.
- The server's receive time, not the stick's, is the evidence for when something happened.

## Alternatives considered
- **One shared key for all sticks:** simplest, but one leak breaks everything.
- **Ed25519 from the start:** better, but more work before the first end-to-end test. Planned as H.1.
- **No signing, only HTTPS:** HTTPS proves the server, not which stick sent the report.
