# B.1 Observe a real login

**Depends on:** A.8 · **Next:** B.2

## Why
Before writing the login rule we must see what the Kilonova **website** really sends. The API docs
describe API clients; the website may use a form, JSON, or a cookie.

## Context
- From the API docs (context.md §8): `POST /api/auth/login` with `username`, `password`; success →
  `{"status":"success","data":"<session id>"}`; error → `{"status":"error","data":"<message>"}`;
  logout `POST /api/auth/logout`; current user `/api/user/getSelf`.
- Contest instance: `https://rcpc.kilonova.ro` (in the Squid allowlist). Traffic is HTTPS, but Squid
  decrypts it (`ssl_bump`), so it can be observed on the stick.
- **Privacy rule:** record only method, URL, status code, header *names*, body *field names* and the
  envelope `status`. Never values: no passwords, no session IDs, no cookie values.
- **You** log in with a test account in the VM (via VNC). Nobody else types the password.
- You need a Kilonova test account on `rcpc.kilonova.ro` (open question).

## Small steps
- [ ] **B.1.1** Observation mode: a temporary Squid logformat (method, URL, status) plus a small
  ICAP-based recorder from B.2's prototype that logs field names only – or, simpler first try, the
  browser's developer tools (Network tab) in the VM, writing down what you see.
- [ ] **B.1.2** Scenario 1: log in correctly. Scenario 2: wrong password. Scenario 3: log out.
  Scenario 4: open a page while logged in (which request reveals the user?).
- [ ] **B.1.3** Write `docs/platforms/kilonova.md`: endpoint, method, content type (form/JSON),
  field names, success/failure responses, how the session is kept (cookie name or header),
  which call returns the current user.
- [ ] **B.1.4** Save anonymised samples (values replaced by `<redacted>`) under
  `crates/ck-capture/tests/data/kilonova/` for B.3's tests.

## Done when
`docs/platforms/kilonova.md` is reviewed and the anonymised samples are committed.

## Out of scope
Submissions (D.1).
