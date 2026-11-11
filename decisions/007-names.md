# 007 Product names and the repository rule

- **Status:** accepted
- **Date:** 2026-11-10

## Context
The project has several parts that need clear names. The repositories live in the GitHub organization
`contest-keeper`, whose name was free on 2026-11-10.

## Decision
The whole project is **Contest Keeper**. The parts are **Keeper OS** (the image and the agent),
**Keeper Forge** (the admin tool that makes sticks), **Keeper Hub** (the server and dashboard) and
**Keeper Extension** (the browser extension). Each product has one repository named `ck-<part>`, all
lowercase: `ck-os`, `ck-forge`, `ck-hub`, `ck-hub-setup`, `ck-protocol`, `ck-extension`, `ck-website`,
`ck-backend` (to be retired) and `ck-app` (reserved), plus the organization's `.github`. Folder names on
disk match.

## Consequences
- Names are predictable: a program, crate or repository can be guessed from the part's name.
- Shared code lives in `ck-protocol` with version tags. A protocol change means a new `ck-protocol`
  release first, then updates in OS, Forge and Hub.
- Display names stay friendly in READMEs and the UI.

## Alternatives considered
- **A single repository for everything:** simpler at first, but it mixes three release cycles and three
  toolchains (image, Windows app, server).
- **Other prefixes:** `ck-` follows the pattern of projects such as Safe Exam Browser (`seb-*`).
