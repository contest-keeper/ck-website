# X.2 Accounts on the Rust server

**Depends on:** X.1 · **Next:** X.3 · **Repository:** `ck-hub`

## Why
The extension's users must be able to sign in to the new server with the same accounts and
passwords.

## Context
- Phase C.2 already gives the Rust server organizer accounts. This step extends them to everything
  the extension needs (contract from X.1).
- Existing passwords are stored as ASP.NET Core Identity hashes. The new server must **verify that
  format** (PBKDF2, format described in ASP.NET Core's `PasswordHasher`) so nobody has to reset their
  password, and re-hash with Argon2 on the next successful sign-in.
- Google sign-in uses PKCE with a redirect to the extension's own `chromiumapp.org` /
  `extensions.allizom.org` address and a one-time code. Keep that security property.
- Refresh tokens are single use; sign-out and password changes end sessions (Redis today).
- Emails (confirmation, reset codes, invitations) need a real email sender in production.

## Small steps
- [ ] **X.2.1** Register, confirm email, sign in, sign out, refresh (single-use tokens).
- [ ] **X.2.2** Verify ASP.NET Identity password hashes; re-hash to Argon2 on sign-in. Tests with real
  sample hashes made by the .NET backend.
- [ ] **X.2.3** Password reset and change (email codes).
- [ ] **X.2.4** Google sign-in with PKCE and the extension redirect.
- [ ] **X.2.5** Rate limits matching the old backend.
- [ ] **X.2.6** Contract tests from X.1.5 for accounts – all green.

## Done when
All account contract tests pass against the Rust server.

## Out of scope
Rooms (X.3).
