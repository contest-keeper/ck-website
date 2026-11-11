# 006 Rust for the programs, Svelte 5 for the UIs

- **Status:** accepted
- **Date:** 2026-11-10

## Context
We need a program that runs on the stick (small, no extra libraries), an admin tool for Windows and a
server. The first prototype was Python. The existing browser extension uses Svelte 5 and TypeScript.

## Decision
Keeper OS, Keeper Forge and Keeper Hub are written in Rust. The agent is a static binary
(`x86_64-unknown-linux-musl`, built with Zig and `cargo-zigbuild`), so the stick's Ubuntu needs no extra
libraries. The server uses Axum, PostgreSQL with SQLx and OpenAPI generated with `utoipa`. Web UIs (the
dashboard and later the admin window) use Svelte 5 with TypeScript, like the extension. The Python
prototype is kept only as a reference.

## Consequences
- One language for protocol, signing and logic, shared through `ck-protocol` and used by all three programs.
- Windows binaries use the GNU toolchain, so no Visual Studio C++ tools are needed.
- Contributors need Rust and Node.

## Alternatives considered
- **Python everywhere:** quick for the prototype, but needs an interpreter and libraries on the stick.
- **Go:** also gives static binaries, but Rust's type system suits the protocol and parsing code better.
- **React for the UIs:** an earlier draft chose it. Svelte 5 was chosen later so the dashboard and the
  extension share one stack.
