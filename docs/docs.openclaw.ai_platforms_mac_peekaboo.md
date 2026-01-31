---
url: "https://docs.openclaw.ai/platforms/mac/peekaboo"
title: "Peekaboo - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/platforms/mac/peekaboo#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Peekaboo Bridge (macOS UI automation)](https://docs.openclaw.ai/platforms/mac/peekaboo#peekaboo-bridge-macos-ui-automation)
- [What this is (and isn’t)](https://docs.openclaw.ai/platforms/mac/peekaboo#what-this-is-and-isn%E2%80%99t)
- [Enable the bridge](https://docs.openclaw.ai/platforms/mac/peekaboo#enable-the-bridge)
- [Client discovery order](https://docs.openclaw.ai/platforms/mac/peekaboo#client-discovery-order)
- [Security & permissions](https://docs.openclaw.ai/platforms/mac/peekaboo#security-%26-permissions)
- [Snapshot behavior (automation)](https://docs.openclaw.ai/platforms/mac/peekaboo#snapshot-behavior-automation)
- [Troubleshooting](https://docs.openclaw.ai/platforms/mac/peekaboo#troubleshooting)

# [​](https://docs.openclaw.ai/platforms/mac/peekaboo\#peekaboo-bridge-macos-ui-automation)  Peekaboo Bridge (macOS UI automation)

OpenClaw can host **PeekabooBridge** as a local, permission‑aware UI automation
broker. This lets the `peekaboo` CLI drive UI automation while reusing the
macOS app’s TCC permissions.

## [​](https://docs.openclaw.ai/platforms/mac/peekaboo\#what-this-is-and-isn%E2%80%99t)  What this is (and isn’t)

- **Host**: OpenClaw.app can act as a PeekabooBridge host.
- **Client**: use the `peekaboo` CLI (no separate `openclaw ui ...` surface).
- **UI**: visual overlays stay in Peekaboo.app; OpenClaw is a thin broker host.

## [​](https://docs.openclaw.ai/platforms/mac/peekaboo\#enable-the-bridge)  Enable the bridge

In the macOS app:

- Settings → **Enable Peekaboo Bridge**

When enabled, OpenClaw starts a local UNIX socket server. If disabled, the host
is stopped and `peekaboo` will fall back to other available hosts.

## [​](https://docs.openclaw.ai/platforms/mac/peekaboo\#client-discovery-order)  Client discovery order

Peekaboo clients typically try hosts in this order:

1. Peekaboo.app (full UX)
2. Claude.app (if installed)
3. OpenClaw.app (thin broker)

Use `peekaboo bridge status --verbose` to see which host is active and which
socket path is in use. You can override with:

Copy

```
export PEEKABOO_BRIDGE_SOCKET=/path/to/bridge.sock
```

## [​](https://docs.openclaw.ai/platforms/mac/peekaboo\#security-&-permissions)  Security & permissions

- The bridge validates **caller code signatures**; an allowlist of TeamIDs is
enforced (Peekaboo host TeamID + OpenClaw app TeamID).
- Requests time out after ~10 seconds.
- If required permissions are missing, the bridge returns a clear error message
rather than launching System Settings.

## [​](https://docs.openclaw.ai/platforms/mac/peekaboo\#snapshot-behavior-automation)  Snapshot behavior (automation)

Snapshots are stored in memory and expire automatically after a short window.
If you need longer retention, re‑capture from the client.

## [​](https://docs.openclaw.ai/platforms/mac/peekaboo\#troubleshooting)  Troubleshooting

- If `peekaboo` reports “bridge client is not authorized”, ensure the client is
properly signed or run the host with `PEEKABOO_ALLOW_UNSIGNED_SOCKET_CLIENTS=1`
in **debug** mode only.
- If no hosts are found, open one of the host apps (Peekaboo.app or OpenClaw.app)
and confirm permissions are granted.

[Skills](https://docs.openclaw.ai/platforms/mac/skills) [Testing](https://docs.openclaw.ai/testing)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.