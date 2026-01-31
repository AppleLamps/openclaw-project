---
url: "https://docs.openclaw.ai/platforms/mac/health"
title: "Health - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/platforms/mac/health#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Health Checks on macOS](https://docs.openclaw.ai/platforms/mac/health#health-checks-on-macos)
- [Menu bar](https://docs.openclaw.ai/platforms/mac/health#menu-bar)
- [Settings](https://docs.openclaw.ai/platforms/mac/health#settings)
- [How the probe works](https://docs.openclaw.ai/platforms/mac/health#how-the-probe-works)
- [When in doubt](https://docs.openclaw.ai/platforms/mac/health#when-in-doubt)

# [​](https://docs.openclaw.ai/platforms/mac/health\#health-checks-on-macos)  Health Checks on macOS

How to see whether the linked channel is healthy from the menu bar app.

## [​](https://docs.openclaw.ai/platforms/mac/health\#menu-bar)  Menu bar

- Status dot now reflects Baileys health:
  - Green: linked + socket opened recently.
  - Orange: connecting/retrying.
  - Red: logged out or probe failed.
- Secondary line reads “linked · auth 12m” or shows the failure reason.
- “Run Health Check” menu item triggers an on-demand probe.

## [​](https://docs.openclaw.ai/platforms/mac/health\#settings)  Settings

- General tab gains a Health card showing: linked auth age, session-store path/count, last check time, last error/status code, and buttons for Run Health Check / Reveal Logs.
- Uses a cached snapshot so the UI loads instantly and falls back gracefully when offline.
- **Channels tab** surfaces channel status + controls for WhatsApp/Telegram (login QR, logout, probe, last disconnect/error).

## [​](https://docs.openclaw.ai/platforms/mac/health\#how-the-probe-works)  How the probe works

- App runs `openclaw health --json` via `ShellExecutor` every ~60s and on demand. The probe loads creds and reports status without sending messages.
- Cache the last good snapshot and the last error separately to avoid flicker; show the timestamp of each.

## [​](https://docs.openclaw.ai/platforms/mac/health\#when-in-doubt)  When in doubt

- You can still use the CLI flow in [Gateway health](https://docs.openclaw.ai/gateway/health) (`openclaw status`, `openclaw status --deep`, `openclaw health --json`) and tail `/tmp/openclaw/openclaw-*.log` for `web-heartbeat` / `web-reconnect`.

[Child process](https://docs.openclaw.ai/platforms/mac/child-process) [Icon](https://docs.openclaw.ai/platforms/mac/icon)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.