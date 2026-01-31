---
url: "https://docs.openclaw.ai/platforms/mac/webchat"
title: "Webchat - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/platforms/mac/webchat#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [WebChat (macOS app)](https://docs.openclaw.ai/platforms/mac/webchat#webchat-macos-app)
- [Launch & debugging](https://docs.openclaw.ai/platforms/mac/webchat#launch-%26-debugging)
- [How it’s wired](https://docs.openclaw.ai/platforms/mac/webchat#how-it%E2%80%99s-wired)
- [Security surface](https://docs.openclaw.ai/platforms/mac/webchat#security-surface)
- [Known limitations](https://docs.openclaw.ai/platforms/mac/webchat#known-limitations)

# [​](https://docs.openclaw.ai/platforms/mac/webchat\#webchat-macos-app)  WebChat (macOS app)

The macOS menu bar app embeds the WebChat UI as a native SwiftUI view. It
connects to the Gateway and defaults to the **main session** for the selected
agent (with a session switcher for other sessions).

- **Local mode**: connects directly to the local Gateway WebSocket.
- **Remote mode**: forwards the Gateway control port over SSH and uses that
tunnel as the data plane.

## [​](https://docs.openclaw.ai/platforms/mac/webchat\#launch-&-debugging)  Launch & debugging

- Manual: Lobster menu → “Open Chat”.
- Auto‑open for testing:







Copy











```
dist/OpenClaw.app/Contents/MacOS/OpenClaw --webchat
```

- Logs: `./scripts/clawlog.sh` (subsystem `bot.molt`, category `WebChatSwiftUI`).

## [​](https://docs.openclaw.ai/platforms/mac/webchat\#how-it%E2%80%99s-wired)  How it’s wired

- Data plane: Gateway WS methods `chat.history`, `chat.send`, `chat.abort`,
`chat.inject` and events `chat`, `agent`, `presence`, `tick`, `health`.
- Session: defaults to the primary session (`main`, or `global` when scope is
global). The UI can switch between sessions.
- Onboarding uses a dedicated session to keep first‑run setup separate.

## [​](https://docs.openclaw.ai/platforms/mac/webchat\#security-surface)  Security surface

- Remote mode forwards only the Gateway WebSocket control port over SSH.

## [​](https://docs.openclaw.ai/platforms/mac/webchat\#known-limitations)  Known limitations

- The UI is optimized for chat sessions (not a full browser sandbox).

[Voice overlay](https://docs.openclaw.ai/platforms/mac/voice-overlay) [Canvas](https://docs.openclaw.ai/platforms/mac/canvas)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.