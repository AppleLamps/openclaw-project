---
url: "https://docs.openclaw.ai/start/getting-started"
title: "Getting started - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/start/getting-started#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Getting Started](https://docs.openclaw.ai/start/getting-started#getting-started)
- [0) Prereqs](https://docs.openclaw.ai/start/getting-started#0-prereqs)
- [1) Install the CLI (recommended)](https://docs.openclaw.ai/start/getting-started#1-install-the-cli-recommended)
- [2) Run the onboarding wizard (and install the service)](https://docs.openclaw.ai/start/getting-started#2-run-the-onboarding-wizard-and-install-the-service)
- [Auth: where it lives (important)](https://docs.openclaw.ai/start/getting-started#auth%3A-where-it-lives-important)
- [3) Start the Gateway](https://docs.openclaw.ai/start/getting-started#3-start-the-gateway)
- [3.5) Quick verify (2 min)](https://docs.openclaw.ai/start/getting-started#3-5-quick-verify-2-min)
- [4) Pair + connect your first chat surface](https://docs.openclaw.ai/start/getting-started#4-pair-%2B-connect-your-first-chat-surface)
- [WhatsApp (QR login)](https://docs.openclaw.ai/start/getting-started#whatsapp-qr-login)
- [Telegram / Discord / others](https://docs.openclaw.ai/start/getting-started#telegram-%2F-discord-%2F-others)
- [5) DM safety (pairing approvals)](https://docs.openclaw.ai/start/getting-started#5-dm-safety-pairing-approvals)
- [From source (development)](https://docs.openclaw.ai/start/getting-started#from-source-development)
- [7) Verify end-to-end](https://docs.openclaw.ai/start/getting-started#7-verify-end-to-end)
- [Next steps (optional, but great)](https://docs.openclaw.ai/start/getting-started#next-steps-optional%2C-but-great)

# [​](https://docs.openclaw.ai/start/getting-started\#getting-started)  Getting Started

Goal: go from **zero** → **first working chat** (with sane defaults) as quickly as possible.Fastest chat: open the Control UI (no channel setup needed). Run `openclaw dashboard`
and chat in the browser, or open `http://127.0.0.1:18789/` on the gateway host.
Docs: [Dashboard](https://docs.openclaw.ai/web/dashboard) and [Control UI](https://docs.openclaw.ai/web/control-ui).Recommended path: use the **CLI onboarding wizard** (`openclaw onboard`). It sets up:

- model/auth (OAuth recommended)
- gateway settings
- channels (WhatsApp/Telegram/Discord/Mattermost (plugin)/…)
- pairing defaults (secure DMs)
- workspace bootstrap + skills
- optional background service

If you want the deeper reference pages, jump to: [Wizard](https://docs.openclaw.ai/start/wizard), [Setup](https://docs.openclaw.ai/start/setup), [Pairing](https://docs.openclaw.ai/start/pairing), [Security](https://docs.openclaw.ai/gateway/security).Sandboxing note: `agents.defaults.sandbox.mode: "non-main"` uses `session.mainKey` (default `"main"`),
so group/channel sessions are sandboxed. If you want the main agent to always
run on host, set an explicit per-agent override:

Copy

```
{
  "routing": {
    "agents": {
      "main": {
        "workspace": "~/.openclaw/workspace",
        "sandbox": { "mode": "off" }
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/start/getting-started\#0-prereqs)  0) Prereqs

- Node `>=22`
- `pnpm` (optional; recommended if you build from source)
- **Recommended:** Brave Search API key for web search. Easiest path:
`openclaw configure --section web` (stores `tools.web.search.apiKey`).
See [Web tools](https://docs.openclaw.ai/tools/web).

macOS: if you plan to build the apps, install Xcode / CLT. For the CLI + gateway only, Node is enough.
Windows: use **WSL2** (Ubuntu recommended). WSL2 is strongly recommended; native Windows is untested, more problematic, and has poorer tool compatibility. Install WSL2 first, then run the Linux steps inside WSL. See [Windows (WSL2)](https://docs.openclaw.ai/platforms/windows).

## [​](https://docs.openclaw.ai/start/getting-started\#1-install-the-cli-recommended)  1) Install the CLI (recommended)

Copy

```
curl -fsSL https://openclaw.bot/install.sh | bash
```

Installer options (install method, non-interactive, from GitHub): [Install](https://docs.openclaw.ai/install).Windows (PowerShell):

Copy

```
iwr -useb https://openclaw.ai/install.ps1 | iex
```

Alternative (global install):

Copy

```
npm install -g openclaw@latest
```

Copy

```
pnpm add -g openclaw@latest
```

## [​](https://docs.openclaw.ai/start/getting-started\#2-run-the-onboarding-wizard-and-install-the-service)  2) Run the onboarding wizard (and install the service)

Copy

```
openclaw onboard --install-daemon
```

What you’ll choose:

- **Local vs Remote** gateway
- **Auth**: OpenAI Code (Codex) subscription (OAuth) or API keys. For Anthropic we recommend an API key; `claude setup-token` is also supported.
- **Providers**: WhatsApp QR login, Telegram/Discord bot tokens, Mattermost plugin tokens, etc.
- **Daemon**: background install (launchd/systemd; WSL2 uses systemd)

  - **Runtime**: Node (recommended; required for WhatsApp/Telegram). Bun is **not recommended**.
- **Gateway token**: the wizard generates one by default (even on loopback) and stores it in `gateway.auth.token`.

Wizard doc: [Wizard](https://docs.openclaw.ai/start/wizard)

### [​](https://docs.openclaw.ai/start/getting-started\#auth:-where-it-lives-important)  Auth: where it lives (important)

- **Recommended Anthropic path:** set an API key (wizard can store it for service use). `claude setup-token` is also supported if you want to reuse Claude Code credentials.
- OAuth credentials (legacy import): `~/.openclaw/credentials/oauth.json`
- Auth profiles (OAuth + API keys): `~/.openclaw/agents/<agentId>/agent/auth-profiles.json`

Headless/server tip: do OAuth on a normal machine first, then copy `oauth.json` to the gateway host.

## [​](https://docs.openclaw.ai/start/getting-started\#3-start-the-gateway)  3) Start the Gateway

If you installed the service during onboarding, the Gateway should already be running:

Copy

```
openclaw gateway status
```

Manual run (foreground):

Copy

```
openclaw gateway --port 18789 --verbose
```

Dashboard (local loopback): `http://127.0.0.1:18789/`
If a token is configured, paste it into the Control UI settings (stored as `connect.params.auth.token`).⚠️ **Bun warning (WhatsApp + Telegram):** Bun has known issues with these
channels. If you use WhatsApp or Telegram, run the Gateway with **Node**.

## [​](https://docs.openclaw.ai/start/getting-started\#3-5-quick-verify-2-min)  3.5) Quick verify (2 min)

Copy

```
openclaw status
openclaw health
openclaw security audit --deep
```

## [​](https://docs.openclaw.ai/start/getting-started\#4-pair-+-connect-your-first-chat-surface)  4) Pair + connect your first chat surface

### [​](https://docs.openclaw.ai/start/getting-started\#whatsapp-qr-login)  WhatsApp (QR login)

Copy

```
openclaw channels login
```

Scan via WhatsApp → Settings → Linked Devices.WhatsApp doc: [WhatsApp](https://docs.openclaw.ai/channels/whatsapp)

### [​](https://docs.openclaw.ai/start/getting-started\#telegram-/-discord-/-others)  Telegram / Discord / others

The wizard can write tokens/config for you. If you prefer manual config, start with:

- Telegram: [Telegram](https://docs.openclaw.ai/channels/telegram)
- Discord: [Discord](https://docs.openclaw.ai/channels/discord)
- Mattermost (plugin): [Mattermost](https://docs.openclaw.ai/channels/mattermost)

**Telegram DM tip:** your first DM returns a pairing code. Approve it (see next step) or the bot won’t respond.

## [​](https://docs.openclaw.ai/start/getting-started\#5-dm-safety-pairing-approvals)  5) DM safety (pairing approvals)

Default posture: unknown DMs get a short code and messages are not processed until approved.
If your first DM gets no reply, approve the pairing:

Copy

```
openclaw pairing list whatsapp
openclaw pairing approve whatsapp <code>
```

Pairing doc: [Pairing](https://docs.openclaw.ai/start/pairing)

## [​](https://docs.openclaw.ai/start/getting-started\#from-source-development)  From source (development)

If you’re hacking on OpenClaw itself, run from source:

Copy

```
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
pnpm ui:build # auto-installs UI deps on first run
pnpm build
openclaw onboard --install-daemon
```

If you don’t have a global install yet, run the onboarding step via `pnpm openclaw ...` from the repo.
`pnpm build` also bundles A2UI assets; if you need to run just that step, use `pnpm canvas:a2ui:bundle`.Gateway (from this repo):

Copy

```
node openclaw.mjs gateway --port 18789 --verbose
```

## [​](https://docs.openclaw.ai/start/getting-started\#7-verify-end-to-end)  7) Verify end-to-end

In a new terminal, send a test message:

Copy

```
openclaw message send --target +15555550123 --message "Hello from OpenClaw"
```

If `openclaw health` shows “no auth configured”, go back to the wizard and set OAuth/key auth — the agent won’t be able to respond without it.Tip: `openclaw status --all` is the best pasteable, read-only debug report.
Health probes: `openclaw health` (or `openclaw status --deep`) asks the running gateway for a health snapshot.

## [​](https://docs.openclaw.ai/start/getting-started\#next-steps-optional,-but-great)  Next steps (optional, but great)

- macOS menu bar app + voice wake: [macOS app](https://docs.openclaw.ai/platforms/macos)
- iOS/Android nodes (Canvas/camera/voice): [Nodes](https://docs.openclaw.ai/nodes)
- Remote access (SSH tunnel / Tailscale Serve): [Remote access](https://docs.openclaw.ai/gateway/remote) and [Tailscale](https://docs.openclaw.ai/gateway/tailscale)
- Always-on / VPN setups: [Remote access](https://docs.openclaw.ai/gateway/remote), [exe.dev](https://docs.openclaw.ai/platforms/exe-dev), [Hetzner](https://docs.openclaw.ai/platforms/hetzner), [macOS remote](https://docs.openclaw.ai/platforms/mac/remote)

[Wizard](https://docs.openclaw.ai/start/wizard)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.