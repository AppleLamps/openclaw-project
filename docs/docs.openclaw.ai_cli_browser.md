---
url: "https://docs.openclaw.ai/cli/browser"
title: "Browser - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/browser#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw browser](https://docs.openclaw.ai/cli/browser#openclaw-browser)
- [Common flags](https://docs.openclaw.ai/cli/browser#common-flags)
- [Quick start (local)](https://docs.openclaw.ai/cli/browser#quick-start-local)
- [Profiles](https://docs.openclaw.ai/cli/browser#profiles)
- [Tabs](https://docs.openclaw.ai/cli/browser#tabs)
- [Snapshot / screenshot / actions](https://docs.openclaw.ai/cli/browser#snapshot-%2F-screenshot-%2F-actions)
- [Chrome extension relay (attach via toolbar button)](https://docs.openclaw.ai/cli/browser#chrome-extension-relay-attach-via-toolbar-button)
- [Remote browser control (node host proxy)](https://docs.openclaw.ai/cli/browser#remote-browser-control-node-host-proxy)

# [​](https://docs.openclaw.ai/cli/browser\#openclaw-browser)  `openclaw browser`

Manage OpenClaw’s browser control server and run browser actions (tabs, snapshots, screenshots, navigation, clicks, typing).Related:

- Browser tool + API: [Browser tool](https://docs.openclaw.ai/tools/browser)
- Chrome extension relay: [Chrome extension](https://docs.openclaw.ai/tools/chrome-extension)

## [​](https://docs.openclaw.ai/cli/browser\#common-flags)  Common flags

- `--url <gatewayWsUrl>`: Gateway WebSocket URL (defaults to config).
- `--token <token>`: Gateway token (if required).
- `--timeout <ms>`: request timeout (ms).
- `--browser-profile <name>`: choose a browser profile (default from config).
- `--json`: machine-readable output (where supported).

## [​](https://docs.openclaw.ai/cli/browser\#quick-start-local)  Quick start (local)

Copy

```
openclaw browser --browser-profile chrome tabs
openclaw browser --browser-profile openclaw start
openclaw browser --browser-profile openclaw open https://example.com
openclaw browser --browser-profile openclaw snapshot
```

## [​](https://docs.openclaw.ai/cli/browser\#profiles)  Profiles

Profiles are named browser routing configs. In practice:

- `openclaw`: launches/attaches to a dedicated OpenClaw-managed Chrome instance (isolated user data dir).
- `chrome`: controls your existing Chrome tab(s) via the Chrome extension relay.

Copy

```
openclaw browser profiles
openclaw browser create-profile --name work --color "#FF5A36"
openclaw browser delete-profile --name work
```

Use a specific profile:

Copy

```
openclaw browser --browser-profile work tabs
```

## [​](https://docs.openclaw.ai/cli/browser\#tabs)  Tabs

Copy

```
openclaw browser tabs
openclaw browser open https://docs.openclaw.ai
openclaw browser focus <targetId>
openclaw browser close <targetId>
```

## [​](https://docs.openclaw.ai/cli/browser\#snapshot-/-screenshot-/-actions)  Snapshot / screenshot / actions

Snapshot:

Copy

```
openclaw browser snapshot
```

Screenshot:

Copy

```
openclaw browser screenshot
```

Navigate/click/type (ref-based UI automation):

Copy

```
openclaw browser navigate https://example.com
openclaw browser click <ref>
openclaw browser type <ref> "hello"
```

## [​](https://docs.openclaw.ai/cli/browser\#chrome-extension-relay-attach-via-toolbar-button)  Chrome extension relay (attach via toolbar button)

This mode lets the agent control an existing Chrome tab that you attach manually (it does not auto-attach).Install the unpacked extension to a stable path:

Copy

```
openclaw browser extension install
openclaw browser extension path
```

Then Chrome → `chrome://extensions` → enable “Developer mode” → “Load unpacked” → select the printed folder.Full guide: [Chrome extension](https://docs.openclaw.ai/tools/chrome-extension)

## [​](https://docs.openclaw.ai/cli/browser\#remote-browser-control-node-host-proxy)  Remote browser control (node host proxy)

If the Gateway runs on a different machine than the browser, run a **node host** on the machine that has Chrome/Brave/Edge/Chromium. The Gateway will proxy browser actions to that node (no separate browser control server required).Use `gateway.nodes.browser.mode` to control auto-routing and `gateway.nodes.browser.node` to pin a specific node if multiple are connected.Security + remote setup: [Browser tool](https://docs.openclaw.ai/tools/browser), [Remote access](https://docs.openclaw.ai/gateway/remote), [Tailscale](https://docs.openclaw.ai/gateway/tailscale), [Security](https://docs.openclaw.ai/gateway/security)

[Uninstall](https://docs.openclaw.ai/cli/uninstall) [Message](https://docs.openclaw.ai/cli/message)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.