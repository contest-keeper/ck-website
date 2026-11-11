# H.3 Certificate pinning

**Depends on:** H.2 · **Next:** H.4

## Why
The uplink should talk only to the real API, even if someone on the venue network tries to intercept it.

## Context
- Pin the API's certificate authority (Let's Encrypt intermediates or Caddy's own CA), not the leaf
  certificate – leaf keys change on renewal.
- The pin goes into the settings (signed, H.2).

## Small steps
- [ ] **H.3.1** Pin configuration in settings and the admin app.
- [ ] **H.3.2** Uplink TLS with the pinned CA only.
- [ ] **H.3.3** Test with a man-in-the-middle proxy in the VM → connection refused, alert raised.

## Done when
The interception test fails as expected.
