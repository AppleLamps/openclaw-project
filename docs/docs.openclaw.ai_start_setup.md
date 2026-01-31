---
url: "https://docs.openclaw.ai/start/setup"
title: "Setup - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/start/setup#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Setup](https://docs.openclaw.ai/start/setup#setup)
- [TL;DR](https://docs.openclaw.ai/start/setup#tl%3Bdr)
- [Prereqs (from source)](https://docs.openclaw.ai/start/setup#prereqs-from-source)
- [Tailoring strategy (so updates don’t hurt)](https://docs.openclaw.ai/start/setup#tailoring-strategy-so-updates-don%E2%80%99t-hurt)
- [Stable workflow (macOS app first)](https://docs.openclaw.ai/start/setup#stable-workflow-macos-app-first)
- [Bleeding edge workflow (Gateway in a terminal)](https://docs.openclaw.ai/start/setup#bleeding-edge-workflow-gateway-in-a-terminal)
- [0) (Optional) Run the macOS app from source too](https://docs.openclaw.ai/start/setup#0-optional-run-the-macos-app-from-source-too)
- [1) Start the dev Gateway](https://docs.openclaw.ai/start/setup#1-start-the-dev-gateway)
- [2) Point the macOS app at your running Gateway](https://docs.openclaw.ai/start/setup#2-point-the-macos-app-at-your-running-gateway)
- [3) Verify](https://docs.openclaw.ai/start/setup#3-verify)
- [Common footguns](https://docs.openclaw.ai/start/setup#common-footguns)
- [Credential storage map](https://docs.openclaw.ai/start/setup#credential-storage-map)
- [Updating (without wrecking your setup)](https://docs.openclaw.ai/start/setup#updating-without-wrecking-your-setup)
- [Linux (systemd user service)](https://docs.openclaw.ai/start/setup#linux-systemd-user-service)
- [Related docs](https://docs.openclaw.ai/start/setup#related-docs)

# [​](https://docs.openclaw.ai/start/setup\#setup)  Setup

Last updated: 2026-01-01

## [​](https://docs.openclaw.ai/start/setup\#tl;dr)  TL;DR

- **Tailoring lives outside the repo:**`~/.openclaw/workspace` (workspace) + `~/.openclaw/openclaw.json` (config).
- **Stable workflow:** install the macOS app; let it run the bundled Gateway.
- **Bleeding edge workflow:** run the Gateway yourself via `pnpm gateway:watch`, then let the macOS app attach in Local mode.

## [​](https://docs.openclaw.ai/start/setup\#prereqs-from-source)  Prereqs (from source)

- Node `>=22`
- `pnpm`
- Docker (optional; only for containerized setup/e2e — see [Docker](https://docs.openclaw.ai/install/docker))

## [​](https://docs.openclaw.ai/start/setup\#tailoring-strategy-so-updates-don%E2%80%99t-hurt)  Tailoring strategy (so updates don’t hurt)

If you want “100% tailored to me” _and_ easy updates, keep your customization in:

- **Config:**`~/.openclaw/openclaw.json` (JSON/JSON5-ish)
- **Workspace:**`~/.openclaw/workspace` (skills, prompts, memories; make it a private git repo)

Bootstrap once:

Copy

```
openclaw setup
```

From inside this repo, use the local CLI entry:

Copy

```
openclaw setup
```

If you don’t have a global install yet, run it via `pnpm openclaw setup`.

## [​](https://docs.openclaw.ai/start/setup\#stable-workflow-macos-app-first)  Stable workflow (macOS app first)

1. Install + launch **OpenClaw.app** (menu bar).
2. Complete the onboarding/permissions checklist (TCC prompts).
3. Ensure Gateway is **Local** and running (the app manages it).
4. Link surfaces (example: WhatsApp):

Copy

```
openclaw channels login
```

5. Sanity check:

Copy

```
openclaw health
```

If onboarding is not available in your build:

- Run `openclaw setup`, then `openclaw channels login`, then start the Gateway manually (`openclaw gateway`).

## [​](https://docs.openclaw.ai/start/setup\#bleeding-edge-workflow-gateway-in-a-terminal)  Bleeding edge workflow (Gateway in a terminal)

Goal: work on the TypeScript Gateway, get hot reload, keep the macOS app UI attached.

### [​](https://docs.openclaw.ai/start/setup\#0-optional-run-the-macos-app-from-source-too)  0) (Optional) Run the macOS app from source too

If you also want the macOS app on the bleeding edge:

Copy

```
./scripts/restart-mac.sh
```

### [​](https://docs.openclaw.ai/start/setup\#1-start-the-dev-gateway)  1) Start the dev Gateway

Copy

```
pnpm install
pnpm gateway:watch
```

`gateway:watch` runs the gateway in watch mode and reloads on TypeScript changes.

### [​](https://docs.openclaw.ai/start/setup\#2-point-the-macos-app-at-your-running-gateway)  2) Point the macOS app at your running Gateway

In **OpenClaw.app**:

- Connection Mode: **Local**
The app will attach to the running gateway on the configured port.

### [​](https://docs.openclaw.ai/start/setup\#3-verify)  3) Verify

- In-app Gateway status should read **“Using existing gateway …”**
- Or via CLI:

Copy

```
openclaw health
```

### [​](https://docs.openclaw.ai/start/setup\#common-footguns)  Common footguns

- **Wrong port:** Gateway WS defaults to `ws://127.0.0.1:18789`; keep app + CLI on the same port.
- **Where state lives:**
  - Credentials: `~/.openclaw/credentials/`
  - Sessions: `~/.openclaw/agents/<agentId>/sessions/`
  - Logs: `/tmp/openclaw/`

## [​](https://docs.openclaw.ai/start/setup\#credential-storage-map)  Credential storage map

Use this when debugging auth or deciding what to back up:

- **WhatsApp**: `~/.openclaw/credentials/whatsapp/<accountId>/creds.json`
- **Telegram bot token**: config/env or `channels.telegram.tokenFile`
- **Discord bot token**: config/env (token file not yet supported)
- **Slack tokens**: config/env (`channels.slack.*`)
- **Pairing allowlists**: `~/.openclaw/credentials/<channel>-allowFrom.json`
- **Model auth profiles**: `~/.openclaw/agents/<agentId>/agent/auth-profiles.json`
- **Legacy OAuth import**: `~/.openclaw/credentials/oauth.json`
More detail: [Security](https://docs.openclaw.ai/gateway/security#credential-storage-map).

## [​](https://docs.openclaw.ai/start/setup\#updating-without-wrecking-your-setup)  Updating (without wrecking your setup)

- Keep `~/.openclaw/workspace` and `~/.openclaw/` as “your stuff”; don’t put personal prompts/config into the `openclaw` repo.
- Updating source: `git pull` \+ `pnpm install` (when lockfile changed) + keep using `pnpm gateway:watch`.

## [​](https://docs.openclaw.ai/start/setup\#linux-systemd-user-service)  Linux (systemd user service)

Linux installs use a systemd **user** service. By default, systemd stops user
services on logout/idle, which kills the Gateway. Onboarding attempts to enable
lingering for you (may prompt for sudo). If it’s still off, run:

Copy

```
sudo loginctl enable-linger $USER
```

For always-on or multi-user servers, consider a **system** service instead of a
user service (no lingering needed). See [Gateway runbook](https://docs.openclaw.ai/gateway) for the systemd notes.

## [​](https://docs.openclaw.ai/start/setup\#related-docs)  Related docs

- [Gateway runbook](https://docs.openclaw.ai/gateway) (flags, supervision, ports)
- [Gateway configuration](https://docs.openclaw.ai/gateway/configuration) (config schema + examples)
- [Discord](https://docs.openclaw.ai/channels/discord) and [Telegram](https://docs.openclaw.ai/channels/telegram) (reply tags + replyToMode settings)
- [OpenClaw assistant setup](https://docs.openclaw.ai/start/openclaw)
- [macOS app](https://docs.openclaw.ai/platforms/macos) (gateway lifecycle)

[Wizard](https://docs.openclaw.ai/start/wizard) [Pairing](https://docs.openclaw.ai/start/pairing)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.