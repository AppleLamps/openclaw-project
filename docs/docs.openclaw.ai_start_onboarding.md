---
url: "https://docs.openclaw.ai/start/onboarding"
title: "Onboarding - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/start/onboarding#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Onboarding (macOS app)](https://docs.openclaw.ai/start/onboarding#onboarding-macos-app)
- [Page order (current)](https://docs.openclaw.ai/start/onboarding#page-order-current)
- [1) Local vs Remote](https://docs.openclaw.ai/start/onboarding#1-local-vs-remote)
- [2) Local-only auth (Anthropic OAuth)](https://docs.openclaw.ai/start/onboarding#2-local-only-auth-anthropic-oauth)
- [3) Setup Wizard (Gateway‑driven)](https://docs.openclaw.ai/start/onboarding#3-setup-wizard-gateway%E2%80%91driven)
- [4) Permissions](https://docs.openclaw.ai/start/onboarding#4-permissions)
- [5) CLI (optional)](https://docs.openclaw.ai/start/onboarding#5-cli-optional)
- [6) Onboarding chat (dedicated session)](https://docs.openclaw.ai/start/onboarding#6-onboarding-chat-dedicated-session)
- [Agent bootstrap ritual](https://docs.openclaw.ai/start/onboarding#agent-bootstrap-ritual)
- [Optional: Gmail hooks (manual)](https://docs.openclaw.ai/start/onboarding#optional%3A-gmail-hooks-manual)
- [Remote mode notes](https://docs.openclaw.ai/start/onboarding#remote-mode-notes)

# [​](https://docs.openclaw.ai/start/onboarding\#onboarding-macos-app)  Onboarding (macOS app)

This doc describes the **current** first‑run onboarding flow. The goal is a
smooth “day 0” experience: pick where the Gateway runs, connect auth, run the
wizard, and let the agent bootstrap itself.

## [​](https://docs.openclaw.ai/start/onboarding\#page-order-current)  Page order (current)

1. Welcome + security notice
2. **Gateway selection** (Local / Remote / Configure later)
3. **Auth (Anthropic OAuth)** — local only
4. **Setup Wizard** (Gateway‑driven)
5. **Permissions** (TCC prompts)
6. **CLI** (optional)
7. **Onboarding chat** (dedicated session)
8. Ready

## [​](https://docs.openclaw.ai/start/onboarding\#1-local-vs-remote)  1) Local vs Remote

Where does the **Gateway** run?

- **Local (this Mac):** onboarding can run OAuth flows and write credentials
locally.
- **Remote (over SSH/Tailnet):** onboarding does **not** run OAuth locally;
credentials must exist on the gateway host.
- **Configure later:** skip setup and leave the app unconfigured.

Gateway auth tip:

- The wizard now generates a **token** even for loopback, so local WS clients must authenticate.
- If you disable auth, any local process can connect; use that only on fully trusted machines.
- Use a **token** for multi‑machine access or non‑loopback binds.

## [​](https://docs.openclaw.ai/start/onboarding\#2-local-only-auth-anthropic-oauth)  2) Local-only auth (Anthropic OAuth)

The macOS app supports Anthropic OAuth (Claude Pro/Max). The flow:

- Opens the browser for OAuth (PKCE)
- Asks the user to paste the `code#state` value
- Writes credentials to `~/.openclaw/credentials/oauth.json`

Other providers (OpenAI, custom APIs) are configured via environment variables
or config files for now.

## [​](https://docs.openclaw.ai/start/onboarding\#3-setup-wizard-gateway%E2%80%91driven)  3) Setup Wizard (Gateway‑driven)

The app can run the same setup wizard as the CLI. This keeps onboarding in sync
with Gateway‑side behavior and avoids duplicating logic in SwiftUI.

## [​](https://docs.openclaw.ai/start/onboarding\#4-permissions)  4) Permissions

Onboarding requests TCC permissions needed for:

- Notifications
- Accessibility
- Screen Recording
- Microphone / Speech Recognition
- Automation (AppleScript)

## [​](https://docs.openclaw.ai/start/onboarding\#5-cli-optional)  5) CLI (optional)

The app can install the global `openclaw` CLI via npm/pnpm so terminal
workflows and launchd tasks work out of the box.

## [​](https://docs.openclaw.ai/start/onboarding\#6-onboarding-chat-dedicated-session)  6) Onboarding chat (dedicated session)

After setup, the app opens a dedicated onboarding chat session so the agent can
introduce itself and guide next steps. This keeps first‑run guidance separate
from your normal conversation.

## [​](https://docs.openclaw.ai/start/onboarding\#agent-bootstrap-ritual)  Agent bootstrap ritual

On the first agent run, OpenClaw bootstraps a workspace (default `~/.openclaw/workspace`):

- Seeds `AGENTS.md`, `BOOTSTRAP.md`, `IDENTITY.md`, `USER.md`
- Runs a short Q&A ritual (one question at a time)
- Writes identity + preferences to `IDENTITY.md`, `USER.md`, `SOUL.md`
- Removes `BOOTSTRAP.md` when finished so it only runs once

## [​](https://docs.openclaw.ai/start/onboarding\#optional:-gmail-hooks-manual)  Optional: Gmail hooks (manual)

Gmail Pub/Sub setup is currently a manual step. Use:

Copy

```
openclaw webhooks gmail setup --account you@gmail.com
```

See [/automation/gmail-pubsub](https://docs.openclaw.ai/automation/gmail-pubsub) for details.

## [​](https://docs.openclaw.ai/start/onboarding\#remote-mode-notes)  Remote mode notes

When the Gateway runs on another machine, credentials and workspace files live
**on that host**. If you need OAuth in remote mode, create:

- `~/.openclaw/credentials/oauth.json`
- `~/.openclaw/agents/<agentId>/agent/auth-profiles.json`

on the gateway host.

[Hubs](https://docs.openclaw.ai/start/hubs) [Lore](https://docs.openclaw.ai/start/lore)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.