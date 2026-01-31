---
url: "https://docs.openclaw.ai/automation/poll"
title: "Poll - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/automation/poll#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Polls](https://docs.openclaw.ai/automation/poll#polls)
- [Supported channels](https://docs.openclaw.ai/automation/poll#supported-channels)
- [CLI](https://docs.openclaw.ai/automation/poll#cli)
- [Gateway RPC](https://docs.openclaw.ai/automation/poll#gateway-rpc)
- [Channel differences](https://docs.openclaw.ai/automation/poll#channel-differences)
- [Agent tool (Message)](https://docs.openclaw.ai/automation/poll#agent-tool-message)

# [​](https://docs.openclaw.ai/automation/poll\#polls)  Polls

## [​](https://docs.openclaw.ai/automation/poll\#supported-channels)  Supported channels

- WhatsApp (web channel)
- Discord
- MS Teams (Adaptive Cards)

## [​](https://docs.openclaw.ai/automation/poll\#cli)  CLI

Copy

```
# WhatsApp
openclaw message poll --target +15555550123 \
  --poll-question "Lunch today?" --poll-option "Yes" --poll-option "No" --poll-option "Maybe"
openclaw message poll --target 123456789@g.us \
  --poll-question "Meeting time?" --poll-option "10am" --poll-option "2pm" --poll-option "4pm" --poll-multi

# Discord
openclaw message poll --channel discord --target channel:123456789 \
  --poll-question "Snack?" --poll-option "Pizza" --poll-option "Sushi"
openclaw message poll --channel discord --target channel:123456789 \
  --poll-question "Plan?" --poll-option "A" --poll-option "B" --poll-duration-hours 48

# MS Teams
openclaw message poll --channel msteams --target conversation:19:abc@thread.tacv2 \
  --poll-question "Lunch?" --poll-option "Pizza" --poll-option "Sushi"
```

Options:

- `--channel`: `whatsapp` (default), `discord`, or `msteams`
- `--poll-multi`: allow selecting multiple options
- `--poll-duration-hours`: Discord-only (defaults to 24 when omitted)

## [​](https://docs.openclaw.ai/automation/poll\#gateway-rpc)  Gateway RPC

Method: `poll`Params:

- `to` (string, required)
- `question` (string, required)
- `options` (string\[\], required)
- `maxSelections` (number, optional)
- `durationHours` (number, optional)
- `channel` (string, optional, default: `whatsapp`)
- `idempotencyKey` (string, required)

## [​](https://docs.openclaw.ai/automation/poll\#channel-differences)  Channel differences

- WhatsApp: 2-12 options, `maxSelections` must be within option count, ignores `durationHours`.
- Discord: 2-10 options, `durationHours` clamped to 1-768 hours (default 24). `maxSelections > 1` enables multi-select; Discord does not support a strict selection count.
- MS Teams: Adaptive Card polls (OpenClaw-managed). No native poll API; `durationHours` is ignored.

## [​](https://docs.openclaw.ai/automation/poll\#agent-tool-message)  Agent tool (Message)

Use the `message` tool with `poll` action (`to`, `pollQuestion`, `pollOption`, optional `pollMulti`, `pollDurationHours`, `channel`).Note: Discord has no “pick exactly N” mode; `pollMulti` maps to multi-select.
Teams polls are rendered as Adaptive Cards and require the gateway to stay online
to record votes in `~/.openclaw/msteams-polls.json`.

[Cron vs heartbeat](https://docs.openclaw.ai/automation/cron-vs-heartbeat) [Tools](https://docs.openclaw.ai/tools)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.