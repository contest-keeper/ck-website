# D.2 Kilonova submit rule

**Depends on:** D.1 · **Next:** D.3 · **Module:** `ck-capture::platforms::kilonova`

## Why
Every submission leaving the stick becomes a `Submission` event the API can match.

## Context
- Built on B.2 (ICAP) and next to the B.3 login rule.
- Hash the code after normalising line endings and trailing whitespace, so small platform changes
  don't break matching (E.3 uses the same normalisation – put it in `ck-protocol`).
- Keep the full code in the event? Decide: hash only (privacy, size) or hash + code (evidence).
  Suggest hash + code, encrypted at rest on the server (decide in H.6).

## Small steps
- [ ] **D.2.1** Code normalisation + hash function in `ck-protocol` (shared with the matcher).
- [ ] **D.2.2** Match the submit request; extract problem, language, code; compute hash.
- [ ] **D.2.3** Pair with the response; attach the platform's submission ID when present; mark failed
  submissions (rate limit, error) as such.
- [ ] **D.2.4** Tests on D.1 samples: editor submit, file upload, error responses.

## Done when
Sample tests pass.

## Out of scope
Matching (E.3).
