---
url: "https://docs.openclaw.ai/start/pairing"
title: "Pairing - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/start/pairing#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Pairing](https://docs.openclaw.ai/start/pairing#pairing)
- [1) DM pairing (inbound chat access)](https://docs.openclaw.ai/start/pairing#1-dm-pairing-inbound-chat-access)
- [Approve a sender](https://docs.openclaw.ai/start/pairing#approve-a-sender)
- [Where the state lives](https://docs.openclaw.ai/start/pairing#where-the-state-lives)
- [2) Node device pairing (iOS/Android/macOS/headless nodes)](https://docs.openclaw.ai/start/pairing#2-node-device-pairing-ios%2Fandroid%2Fmacos%2Fheadless-nodes)
- [Approve a node device](https://docs.openclaw.ai/start/pairing#approve-a-node-device)
- [Where the state lives](https://docs.openclaw.ai/start/pairing#where-the-state-lives-2)
- [Notes](https://docs.openclaw.ai/start/pairing#notes)
- [Related docs](https://docs.openclaw.ai/start/pairing#related-docs)

# [​](https://docs.openclaw.ai/start/pairing\#pairing)  Pairing

“Pairing” is OpenClaw’s explicit **owner approval** step.
It is used in two places:

1. **DM pairing** (who is allowed to talk to the bot)
2. **Node pairing** (which devices/nodes are allowed to join the gateway network)

Security context: [Security](https://docs.openclaw.ai/gateway/security)

## [​](https://docs.openclaw.ai/start/pairing\#1-dm-pairing-inbound-chat-access)  1) DM pairing (inbound chat access)

When a channel is configured with DM policy `pairing`, unknown senders get a short code and their message is **not processed** until you approve.Default DM policies are documented in: [Security](https://docs.openclaw.ai/gateway/security)Pairing codes:

- 8 characters, uppercase, no ambiguous chars (`0O1I`).
- **Expire after 1 hour**. The bot only sends the pairing message when a new request is created (roughly once per hour per sender).
- Pending DM pairing requests are capped at **3 per channel** by default; additional requests are ignored until one expires or is approved.

### [​](https://docs.openclaw.ai/start/pairing\#approve-a-sender)  Approve a sender

Copy

```
openclaw pairing list telegram
openclaw pairing approve telegram <CODE>
```

Supported channels: `telegram`, `whatsapp`, `signal`, `imessage`, `discord`, `slack`.

### [​](https://docs.openclaw.ai/start/pairing\#where-the-state-lives)  Where the state lives

Stored under `~/.openclaw/credentials/`:

- Pending requests: `<channel>-pairing.json`
- Approved allowlist store: `<channel>-allowFrom.json`

Treat these as sensitive (they gate access to your assistant).

## [​](https://docs.openclaw.ai/start/pairing\#2-node-device-pairing-ios/android/macos/headless-nodes)  2) Node device pairing (iOS/Android/macOS/headless nodes)

Nodes connect to the Gateway as **devices** with `role: node`. The Gateway
creates a device pairing request that must be approved.

### [​](https://docs.openclaw.ai/start/pairing\#approve-a-node-device)  Approve a node device

Copy

```
openclaw devices list
openclaw devices approve <requestId>
openclaw devices reject <requestId>
```

### [​](https://docs.openclaw.ai/start/pairing\#where-the-state-lives-2)  Where the state lives

Stored under `~/.openclaw/devices/`:

- `pending.json` (short-lived; pending requests expire)
- `paired.json` (paired devices + tokens)

### [​](https://docs.openclaw.ai/start/pairing\#notes)  Notes

- The legacy `node.pair.*` API (CLI: `openclaw nodes pending/approve`) is a
separate gateway-owned pairing store. WS nodes still require device pairing.

## [​](https://docs.openclaw.ai/start/pairing\#related-docs)  Related docs

- Security model + prompt injection: [Security](https://docs.openclaw.ai/gateway/security)
- Updating safely (run doctor): [Updating](https://docs.openclaw.ai/install/updating)
- Channel configs:
  - Telegram: [Telegram](https://docs.openclaw.ai/channels/telegram)
  - WhatsApp: [WhatsApp](https://docs.openclaw.ai/channels/whatsapp)
  - Signal: [Signal](https://docs.openclaw.ai/channels/signal)
  - iMessage: [iMessage](https://docs.openclaw.ai/channels/imessage)
  - Discord: [Discord](https://docs.openclaw.ai/channels/discord)
  - Slack: [Slack](https://docs.openclaw.ai/channels/slack)

[Setup](https://docs.openclaw.ai/start/setup) [Openclaw](https://docs.openclaw.ai/start/openclaw)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.