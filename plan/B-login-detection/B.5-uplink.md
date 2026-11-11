# B.5 Uplink – send events to the API

**Depends on:** B.3 · **Next:** B.6 · **Crate:** `crates/ck-agent-uplink`

## Why
Events must reach the API reliably and provably from this stick – even if the network drops for a while.

## Context
- Prototype heartbeat (worked): JSON body, HMAC signature header, sent every 15 s, direct connection
  (not through the contestant's proxy settings), first heartbeat ~9 s after boot.
- Settings provide the API URL, heartbeat interval and the stick token (root-only copy in
  `/etc/ck/config.json`).
- Capture (B.2) and uplink run as separate services; they talk locally (a Unix socket owned by a
  shared group), so capture never waits on the network.
- Every event gets a sequence number and the hash of the previous event (a chain), so the API can spot
  gaps or edits.
- Queue on disk under `/var/lib/ck/queue/` so events survive a reboot or network loss.
- HTTPS client: `ureq` or `reqwest` with rustls (built via Zig for musl).

## Small steps
- [ ] **B.5.1** Event envelope in `ck-protocol`: stick ID, boot ID, sequence, previous hash, time, kind, payload.
- [ ] **B.5.2** Disk queue: append, mark sent, survive restarts; size limit.
- [ ] **B.5.3** Sender: batches, signs (A.2), retries with back-off; never uses proxy settings.
- [ ] **B.5.4** Heartbeat (as in the prototype) through the same path.
- [ ] **B.5.5** Local socket for capture → uplink.
- [ ] **B.5.6** `ck-uplink.service`.
- [ ] **B.5.7** Tests: with a fake server (accepts, rejects, times out, is down then up).

## Done when
Tests pass; in the VM, events arrive at the B.6 API after a network outage is fixed.

## Out of scope
Firewall lock-down (D.4), Ed25519 (H.1).
