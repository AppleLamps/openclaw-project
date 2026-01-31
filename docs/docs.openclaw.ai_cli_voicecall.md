---
url: "https://docs.openclaw.ai/cli/voicecall"
title: "Voicecall - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/voicecall#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw voicecall](https://docs.openclaw.ai/cli/voicecall#openclaw-voicecall)
- [Common commands](https://docs.openclaw.ai/cli/voicecall#common-commands)
- [Exposing webhooks (Tailscale)](https://docs.openclaw.ai/cli/voicecall#exposing-webhooks-tailscale)

# [​](https://docs.openclaw.ai/cli/voicecall\#openclaw-voicecall)  `openclaw voicecall`

`voicecall` is a plugin-provided command. It only appears if the voice-call plugin is installed and enabled.Primary doc:

- Voice-call plugin: [Voice Call](https://docs.openclaw.ai/plugins/voice-call)

## [​](https://docs.openclaw.ai/cli/voicecall\#common-commands)  Common commands

Copy

```
openclaw voicecall status --call-id <id>
openclaw voicecall call --to "+15555550123" --message "Hello" --mode notify
openclaw voicecall continue --call-id <id> --message "Any questions?"
openclaw voicecall end --call-id <id>
```

## [​](https://docs.openclaw.ai/cli/voicecall\#exposing-webhooks-tailscale)  Exposing webhooks (Tailscale)

Copy

```
openclaw voicecall expose --mode serve
openclaw voicecall expose --mode funnel
openclaw voicecall unexpose
```

Security note: only expose the webhook endpoint to networks you trust. Prefer Tailscale Serve over Funnel when possible.

[Tui](https://docs.openclaw.ai/cli/tui) [Cron](https://docs.openclaw.ai/cli/cron)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.