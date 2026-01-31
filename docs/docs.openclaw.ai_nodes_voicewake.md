---
url: "https://docs.openclaw.ai/nodes/voicewake"
title: "Voicewake - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/nodes/voicewake#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Voice Wake (Global Wake Words)](https://docs.openclaw.ai/nodes/voicewake#voice-wake-global-wake-words)
- [Storage (Gateway host)](https://docs.openclaw.ai/nodes/voicewake#storage-gateway-host)
- [Protocol](https://docs.openclaw.ai/nodes/voicewake#protocol)
- [Methods](https://docs.openclaw.ai/nodes/voicewake#methods)
- [Events](https://docs.openclaw.ai/nodes/voicewake#events)
- [Client behavior](https://docs.openclaw.ai/nodes/voicewake#client-behavior)
- [macOS app](https://docs.openclaw.ai/nodes/voicewake#macos-app)
- [iOS node](https://docs.openclaw.ai/nodes/voicewake#ios-node)
- [Android node](https://docs.openclaw.ai/nodes/voicewake#android-node)

# [​](https://docs.openclaw.ai/nodes/voicewake\#voice-wake-global-wake-words)  Voice Wake (Global Wake Words)

OpenClaw treats **wake words as a single global list** owned by the **Gateway**.

- There are **no per-node custom wake words**.
- **Any node/app UI may edit** the list; changes are persisted by the Gateway and broadcast to everyone.
- Each device still keeps its own **Voice Wake enabled/disabled** toggle (local UX + permissions differ).

## [​](https://docs.openclaw.ai/nodes/voicewake\#storage-gateway-host)  Storage (Gateway host)

Wake words are stored on the gateway machine at:

- `~/.openclaw/settings/voicewake.json`

Shape:

Copy

```
{ "triggers": ["openclaw", "claude", "computer"], "updatedAtMs": 1730000000000 }
```

## [​](https://docs.openclaw.ai/nodes/voicewake\#protocol)  Protocol

### [​](https://docs.openclaw.ai/nodes/voicewake\#methods)  Methods

- `voicewake.get` → `{ triggers: string[] }`
- `voicewake.set` with params `{ triggers: string[] }` → `{ triggers: string[] }`

Notes:

- Triggers are normalized (trimmed, empties dropped). Empty lists fall back to defaults.
- Limits are enforced for safety (count/length caps).

### [​](https://docs.openclaw.ai/nodes/voicewake\#events)  Events

- `voicewake.changed` payload `{ triggers: string[] }`

Who receives it:

- All WebSocket clients (macOS app, WebChat, etc.)
- All connected nodes (iOS/Android), and also on node connect as an initial “current state” push.

## [​](https://docs.openclaw.ai/nodes/voicewake\#client-behavior)  Client behavior

### [​](https://docs.openclaw.ai/nodes/voicewake\#macos-app)  macOS app

- Uses the global list to gate `VoiceWakeRuntime` triggers.
- Editing “Trigger words” in Voice Wake settings calls `voicewake.set` and then relies on the broadcast to keep other clients in sync.

### [​](https://docs.openclaw.ai/nodes/voicewake\#ios-node)  iOS node

- Uses the global list for `VoiceWakeManager` trigger detection.
- Editing Wake Words in Settings calls `voicewake.set` (over the Gateway WS) and also keeps local wake-word detection responsive.

### [​](https://docs.openclaw.ai/nodes/voicewake\#android-node)  Android node

- Exposes a Wake Words editor in Settings.
- Calls `voicewake.set` over the Gateway WS so edits sync everywhere.

[Location command](https://docs.openclaw.ai/nodes/location-command) [Talk](https://docs.openclaw.ai/nodes/talk)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.