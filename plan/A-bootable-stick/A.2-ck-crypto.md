# A.2 ck-crypto – keys and signatures

**Depends on:** A.1 · **Next:** A.3 · **Crate:** `crates/ck-crypto`

## Why
Every stick proves its reports are really from that stick. Keeping this in its own crate means we
can switch from HMAC to Ed25519 (H.1) without touching the rest.

## Context
- ADR-002: every stick has its own key; reports are signed; the API checks with the key from the
  admin registry.
- Prototype: HMAC-SHA256 over the exact request body, hex in header `X-RCPC-Signature` (to become
  `X-CK-Signature`). Verified working against the test API.
- Use the `hmac`, `sha2`, `hex` crates and `rand`/`getrandom` for keys; constant-time comparison.

## Small steps
- [ ] **A.2.1** `generate_stick_token()` – 32 random bytes, URL-safe base64 without padding.
- [ ] **A.2.2** `sign(token, body) -> String` and `verify(token, body, signature) -> bool`
  (constant time; false for malformed hex).
- [ ] **A.2.3** `sha256_hex(bytes)` for settings hashes and code hashes.
- [ ] **A.2.4** A `Signer`/`Verifier` trait so Ed25519 can be added later behind the same interface.
- [ ] **A.2.5** Known-answer tests (RFC 4231 HMAC vectors) and tamper tests.

## Done when
`cargo test -p ck-crypto` passes, including the RFC vectors.

## Out of scope
Ed25519 (H.1), certificate handling (H.3).
