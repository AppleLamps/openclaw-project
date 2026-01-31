---
url: "https://docs.openclaw.ai/platforms/mac/bundled-gateway"
title: "Bundled gateway - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/platforms/mac/bundled-gateway#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Gateway on macOS (external launchd)](https://docs.openclaw.ai/platforms/mac/bundled-gateway#gateway-on-macos-external-launchd)
- [Install the CLI (required for local mode)](https://docs.openclaw.ai/platforms/mac/bundled-gateway#install-the-cli-required-for-local-mode)
- [Launchd (Gateway as LaunchAgent)](https://docs.openclaw.ai/platforms/mac/bundled-gateway#launchd-gateway-as-launchagent)
- [Version compatibility](https://docs.openclaw.ai/platforms/mac/bundled-gateway#version-compatibility)
- [Smoke check](https://docs.openclaw.ai/platforms/mac/bundled-gateway#smoke-check)

# [​](https://docs.openclaw.ai/platforms/mac/bundled-gateway\#gateway-on-macos-external-launchd)  Gateway on macOS (external launchd)

OpenClaw.app no longer bundles Node/Bun or the Gateway runtime. The macOS app
expects an **external**`openclaw` CLI install, does not spawn the Gateway as a
child process, and manages a per‑user launchd service to keep the Gateway
running (or attaches to an existing local Gateway if one is already running).

## [​](https://docs.openclaw.ai/platforms/mac/bundled-gateway\#install-the-cli-required-for-local-mode)  Install the CLI (required for local mode)

You need Node 22+ on the Mac, then install `openclaw` globally:

Copy

```
npm install -g openclaw@<version>
```

The macOS app’s **Install CLI** button runs the same flow via npm/pnpm (bun not recommended for Gateway runtime).

## [​](https://docs.openclaw.ai/platforms/mac/bundled-gateway\#launchd-gateway-as-launchagent)  Launchd (Gateway as LaunchAgent)

Label:

- `bot.molt.gateway` (or `bot.molt.<profile>`; legacy `com.openclaw.*` may remain)

Plist location (per‑user):

- `~/Library/LaunchAgents/bot.molt.gateway.plist`
(or `~/Library/LaunchAgents/bot.molt.<profile>.plist`)

Manager:

- The macOS app owns LaunchAgent install/update in Local mode.
- The CLI can also install it: `openclaw gateway install`.

Behavior:

- “OpenClaw Active” enables/disables the LaunchAgent.
- App quit does **not** stop the gateway (launchd keeps it alive).
- If a Gateway is already running on the configured port, the app attaches to
it instead of starting a new one.

Logging:

- launchd stdout/err: `/tmp/openclaw/openclaw-gateway.log`

## [​](https://docs.openclaw.ai/platforms/mac/bundled-gateway\#version-compatibility)  Version compatibility

The macOS app checks the gateway version against its own version. If they’re
incompatible, update the global CLI to match the app version.

## [​](https://docs.openclaw.ai/platforms/mac/bundled-gateway\#smoke-check)  Smoke check

Copy

```
openclaw --version

OPENCLAW_SKIP_CHANNELS=1 \
OPENCLAW_SKIP_CANVAS_HOST=1 \
openclaw gateway --port 18999 --bind loopback
```

Then:

Copy

```
openclaw gateway call health --url ws://127.0.0.1:18999 --timeout 3000
```

[Release](https://docs.openclaw.ai/platforms/mac/release) [Xpc](https://docs.openclaw.ai/platforms/mac/xpc)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.