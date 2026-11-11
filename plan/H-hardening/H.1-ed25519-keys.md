# H.1 Ed25519 keys

**Depends on:** G.2 (or earlier if a real contest comes first) · **Next:** H.2

## Why
With HMAC the API holds every stick's secret; with Ed25519 the API holds only public keys, so a leak of
the API's data can't be used to forge stick reports.

## Context
- `ck-crypto` already has a `Signer`/`Verifier` interface (A.2.4). Add an Ed25519 implementation
  (`ed25519-dalek`). Registry stores public keys; the stick keeps the private key on the EFI partition.

## Small steps
- [ ] **H.1.1** Ed25519 signer/verifier + tests.
- [ ] **H.1.2** Admin generates key pairs; registry stores public keys.
- [ ] **H.1.3** Agent signs with Ed25519; API verifies; support both during a transition.
- [ ] **H.1.4** Remove HMAC once all sticks are rewritten.

## Done when
A full B.7/E.5 trial runs on Ed25519 only.
