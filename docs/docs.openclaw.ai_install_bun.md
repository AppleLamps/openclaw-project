---
url: "https://docs.openclaw.ai/install/bun"
title: "Bun - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/install/bun#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Bun (experimental)](https://docs.openclaw.ai/install/bun#bun-experimental)
- [Status](https://docs.openclaw.ai/install/bun#status)
- [Install](https://docs.openclaw.ai/install/bun#install)
- [Build / Test (Bun)](https://docs.openclaw.ai/install/bun#build-%2F-test-bun)
- [Bun lifecycle scripts (blocked by default)](https://docs.openclaw.ai/install/bun#bun-lifecycle-scripts-blocked-by-default)
- [Caveats](https://docs.openclaw.ai/install/bun#caveats)

# [​](https://docs.openclaw.ai/install/bun\#bun-experimental)  Bun (experimental)

Goal: run this repo with **Bun** (optional, not recommended for WhatsApp/Telegram)
without diverging from pnpm workflows.⚠️ **Not recommended for Gateway runtime** (WhatsApp/Telegram bugs). Use Node for production.

## [​](https://docs.openclaw.ai/install/bun\#status)  Status

- Bun is an optional local runtime for running TypeScript directly (`bun run …`, `bun --watch …`).
- `pnpm` is the default for builds and remains fully supported (and used by some docs tooling).
- Bun cannot use `pnpm-lock.yaml` and will ignore it.

## [​](https://docs.openclaw.ai/install/bun\#install)  Install

Default:

Copy

```
bun install
```

Note: `bun.lock`/`bun.lockb` are gitignored, so there’s no repo churn either way. If you want _no lockfile writes_:

Copy

```
bun install --no-save
```

## [​](https://docs.openclaw.ai/install/bun\#build-/-test-bun)  Build / Test (Bun)

Copy

```
bun run build
bun run vitest run
```

## [​](https://docs.openclaw.ai/install/bun\#bun-lifecycle-scripts-blocked-by-default)  Bun lifecycle scripts (blocked by default)

Bun may block dependency lifecycle scripts unless explicitly trusted (`bun pm untrusted` / `bun pm trust`).
For this repo, the commonly blocked scripts are not required:

- `@whiskeysockets/baileys``preinstall`: checks Node major >= 20 (we run Node 22+).
- `protobufjs``postinstall`: emits warnings about incompatible version schemes (no build artifacts).

If you hit a real runtime issue that requires these scripts, trust them explicitly:

Copy

```
bun pm trust @whiskeysockets/baileys protobufjs
```

## [​](https://docs.openclaw.ai/install/bun\#caveats)  Caveats

- Some scripts still hardcode pnpm (e.g. `docs:build`, `ui:*`, `protocol:check`). Run those via pnpm for now.

[Deploy on Northflank](https://docs.openclaw.ai/northflank) [Cli](https://docs.openclaw.ai/cli)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.