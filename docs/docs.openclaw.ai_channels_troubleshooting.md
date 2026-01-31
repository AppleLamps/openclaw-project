---
url: "https://docs.openclaw.ai/channels/troubleshooting"
title: "Troubleshooting - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/channels/troubleshooting#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Channel troubleshooting](https://docs.openclaw.ai/channels/troubleshooting#channel-troubleshooting)
- [Channels](https://docs.openclaw.ai/channels/troubleshooting#channels)
- [Telegram quick fixes](https://docs.openclaw.ai/channels/troubleshooting#telegram-quick-fixes)

# [​](https://docs.openclaw.ai/channels/troubleshooting\#channel-troubleshooting)  Channel troubleshooting

Start with:

Copy

```
openclaw doctor
openclaw channels status --probe
```

`channels status --probe` prints warnings when it can detect common channel misconfigurations, and includes small live checks (credentials, some permissions/membership).

## [​](https://docs.openclaw.ai/channels/troubleshooting\#channels)  Channels

- Discord: [/channels/discord#troubleshooting](https://docs.openclaw.ai/channels/discord#troubleshooting)
- Telegram: [/channels/telegram#troubleshooting](https://docs.openclaw.ai/channels/telegram#troubleshooting)
- WhatsApp: [/channels/whatsapp#troubleshooting-quick](https://docs.openclaw.ai/channels/whatsapp#troubleshooting-quick)

## [​](https://docs.openclaw.ai/channels/troubleshooting\#telegram-quick-fixes)  Telegram quick fixes

- Logs show `HttpError: Network request for 'sendMessage' failed` or `sendChatAction` → check IPv6 DNS. If `api.telegram.org` resolves to IPv6 first and the host lacks IPv6 egress, force IPv4 or enable IPv6. See [/channels/telegram#troubleshooting](https://docs.openclaw.ai/channels/telegram#troubleshooting).
- Logs show `setMyCommands failed` → check outbound HTTPS and DNS reachability to `api.telegram.org` (common on locked-down VPS or proxies).

[Broadcast groups](https://docs.openclaw.ai/broadcast-groups) [Location](https://docs.openclaw.ai/channels/location)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.