---
url: "https://docs.openclaw.ai/reference/rpc"
title: "Rpc - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/reference/rpc#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [RPC adapters](https://docs.openclaw.ai/reference/rpc#rpc-adapters)
- [Pattern A: HTTP daemon (signal-cli)](https://docs.openclaw.ai/reference/rpc#pattern-a%3A-http-daemon-signal-cli)
- [Pattern B: stdio child process (imsg)](https://docs.openclaw.ai/reference/rpc#pattern-b%3A-stdio-child-process-imsg)
- [Adapter guidelines](https://docs.openclaw.ai/reference/rpc#adapter-guidelines)

# [​](https://docs.openclaw.ai/reference/rpc\#rpc-adapters)  RPC adapters

OpenClaw integrates external CLIs via JSON-RPC. Two patterns are used today.

## [​](https://docs.openclaw.ai/reference/rpc\#pattern-a:-http-daemon-signal-cli)  Pattern A: HTTP daemon (signal-cli)

- `signal-cli` runs as a daemon with JSON-RPC over HTTP.
- Event stream is SSE (`/api/v1/events`).
- Health probe: `/api/v1/check`.
- OpenClaw owns lifecycle when `channels.signal.autoStart=true`.

See [Signal](https://docs.openclaw.ai/channels/signal) for setup and endpoints.

## [​](https://docs.openclaw.ai/reference/rpc\#pattern-b:-stdio-child-process-imsg)  Pattern B: stdio child process (imsg)

- OpenClaw spawns `imsg rpc` as a child process.
- JSON-RPC is line-delimited over stdin/stdout (one JSON object per line).
- No TCP port, no daemon required.

Core methods used:

- `watch.subscribe` → notifications (`method: "message"`)
- `watch.unsubscribe`
- `send`
- `chats.list` (probe/diagnostics)

See [iMessage](https://docs.openclaw.ai/channels/imessage) for setup and addressing (`chat_id` preferred).

## [​](https://docs.openclaw.ai/reference/rpc\#adapter-guidelines)  Adapter guidelines

- Gateway owns the process (start/stop tied to provider lifecycle).
- Keep RPC clients resilient: timeouts, restart on exit.
- Prefer stable IDs (e.g., `chat_id`) over display strings.

[Session management compaction](https://docs.openclaw.ai/reference/session-management-compaction) [Device models](https://docs.openclaw.ai/reference/device-models)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.