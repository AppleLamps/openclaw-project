---
url: "https://docs.openclaw.ai/gateway/gateway-lock"
title: "Gateway lock - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/gateway/gateway-lock#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Gateway lock](https://docs.openclaw.ai/gateway/gateway-lock#gateway-lock)
- [Why](https://docs.openclaw.ai/gateway/gateway-lock#why)
- [Mechanism](https://docs.openclaw.ai/gateway/gateway-lock#mechanism)
- [Error surface](https://docs.openclaw.ai/gateway/gateway-lock#error-surface)
- [Operational notes](https://docs.openclaw.ai/gateway/gateway-lock#operational-notes)

# [​](https://docs.openclaw.ai/gateway/gateway-lock\#gateway-lock)  Gateway lock

Last updated: 2025-12-11

## [​](https://docs.openclaw.ai/gateway/gateway-lock\#why)  Why

- Ensure only one gateway instance runs per base port on the same host; additional gateways must use isolated profiles and unique ports.
- Survive crashes/SIGKILL without leaving stale lock files.
- Fail fast with a clear error when the control port is already occupied.

## [​](https://docs.openclaw.ai/gateway/gateway-lock\#mechanism)  Mechanism

- The gateway binds the WebSocket listener (default `ws://127.0.0.1:18789`) immediately on startup using an exclusive TCP listener.
- If the bind fails with `EADDRINUSE`, startup throws `GatewayLockError("another gateway instance is already listening on ws://127.0.0.1:<port>")`.
- The OS releases the listener automatically on any process exit, including crashes and SIGKILL—no separate lock file or cleanup step is needed.
- On shutdown the gateway closes the WebSocket server and underlying HTTP server to free the port promptly.

## [​](https://docs.openclaw.ai/gateway/gateway-lock\#error-surface)  Error surface

- If another process holds the port, startup throws `GatewayLockError("another gateway instance is already listening on ws://127.0.0.1:<port>")`.
- Other bind failures surface as `GatewayLockError("failed to bind gateway socket on ws://127.0.0.1:<port>: …")`.

## [​](https://docs.openclaw.ai/gateway/gateway-lock\#operational-notes)  Operational notes

- If the port is occupied by _another_ process, the error is the same; free the port or choose another with `openclaw gateway --port <port>`.
- The macOS app still maintains its own lightweight PID guard before spawning the gateway; the runtime lock is enforced by the WebSocket bind.

[Pairing](https://docs.openclaw.ai/gateway/pairing) [Environment](https://docs.openclaw.ai/environment)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.