---
url: "https://docs.openclaw.ai/platforms/ios"
title: "Ios - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/platforms/ios#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [iOS App (Node)](https://docs.openclaw.ai/platforms/ios#ios-app-node)
- [What it does](https://docs.openclaw.ai/platforms/ios#what-it-does)
- [Requirements](https://docs.openclaw.ai/platforms/ios#requirements)
- [Quick start (pair + connect)](https://docs.openclaw.ai/platforms/ios#quick-start-pair-%2B-connect)
- [Discovery paths](https://docs.openclaw.ai/platforms/ios#discovery-paths)
- [Bonjour (LAN)](https://docs.openclaw.ai/platforms/ios#bonjour-lan)
- [Tailnet (cross-network)](https://docs.openclaw.ai/platforms/ios#tailnet-cross-network)
- [Manual host/port](https://docs.openclaw.ai/platforms/ios#manual-host%2Fport)
- [Canvas + A2UI](https://docs.openclaw.ai/platforms/ios#canvas-%2B-a2ui)
- [Canvas eval / snapshot](https://docs.openclaw.ai/platforms/ios#canvas-eval-%2F-snapshot)
- [Voice wake + talk mode](https://docs.openclaw.ai/platforms/ios#voice-wake-%2B-talk-mode)
- [Common errors](https://docs.openclaw.ai/platforms/ios#common-errors)
- [Related docs](https://docs.openclaw.ai/platforms/ios#related-docs)

# [​](https://docs.openclaw.ai/platforms/ios\#ios-app-node)  iOS App (Node)

Availability: internal preview. The iOS app is not publicly distributed yet.

## [​](https://docs.openclaw.ai/platforms/ios\#what-it-does)  What it does

- Connects to a Gateway over WebSocket (LAN or tailnet).
- Exposes node capabilities: Canvas, Screen snapshot, Camera capture, Location, Talk mode, Voice wake.
- Receives `node.invoke` commands and reports node status events.

## [​](https://docs.openclaw.ai/platforms/ios\#requirements)  Requirements

- Gateway running on another device (macOS, Linux, or Windows via WSL2).
- Network path:
  - Same LAN via Bonjour, **or**
  - Tailnet via unicast DNS-SD (example domain: `openclaw.internal.`), **or**
  - Manual host/port (fallback).

## [​](https://docs.openclaw.ai/platforms/ios\#quick-start-pair-+-connect)  Quick start (pair + connect)

1. Start the Gateway:

Copy

```
openclaw gateway --port 18789
```

2. In the iOS app, open Settings and pick a discovered gateway (or enable Manual Host and enter host/port).
3. Approve the pairing request on the gateway host:

Copy

```
openclaw nodes pending
openclaw nodes approve <requestId>
```

4. Verify connection:

Copy

```
openclaw nodes status
openclaw gateway call node.list --params "{}"
```

## [​](https://docs.openclaw.ai/platforms/ios\#discovery-paths)  Discovery paths

### [​](https://docs.openclaw.ai/platforms/ios\#bonjour-lan)  Bonjour (LAN)

The Gateway advertises `_openclaw-gw._tcp` on `local.`. The iOS app lists these automatically.

### [​](https://docs.openclaw.ai/platforms/ios\#tailnet-cross-network)  Tailnet (cross-network)

If mDNS is blocked, use a unicast DNS-SD zone (choose a domain; example: `openclaw.internal.`) and Tailscale split DNS.
See [Bonjour](https://docs.openclaw.ai/gateway/bonjour) for the CoreDNS example.

### [​](https://docs.openclaw.ai/platforms/ios\#manual-host/port)  Manual host/port

In Settings, enable **Manual Host** and enter the gateway host + port (default `18789`).

## [​](https://docs.openclaw.ai/platforms/ios\#canvas-+-a2ui)  Canvas + A2UI

The iOS node renders a WKWebView canvas. Use `node.invoke` to drive it:

Copy

```
openclaw nodes invoke --node "iOS Node" --command canvas.navigate --params '{"url":"http://<gateway-host>:18793/__openclaw__/canvas/"}'
```

Notes:

- The Gateway canvas host serves `/__openclaw__/canvas/` and `/__openclaw__/a2ui/`.
- The iOS node auto-navigates to A2UI on connect when a canvas host URL is advertised.
- Return to the built-in scaffold with `canvas.navigate` and `{"url":""}`.

### [​](https://docs.openclaw.ai/platforms/ios\#canvas-eval-/-snapshot)  Canvas eval / snapshot

Copy

```
openclaw nodes invoke --node "iOS Node" --command canvas.eval --params '{"javaScript":"(() => { const {ctx} = window.__openclaw; ctx.clearRect(0,0,innerWidth,innerHeight); ctx.lineWidth=6; ctx.strokeStyle=\"#ff2d55\"; ctx.beginPath(); ctx.moveTo(40,40); ctx.lineTo(innerWidth-40, innerHeight-40); ctx.stroke(); return \"ok\"; })()"}'
```

Copy

```
openclaw nodes invoke --node "iOS Node" --command canvas.snapshot --params '{"maxWidth":900,"format":"jpeg"}'
```

## [​](https://docs.openclaw.ai/platforms/ios\#voice-wake-+-talk-mode)  Voice wake + talk mode

- Voice wake and talk mode are available in Settings.
- iOS may suspend background audio; treat voice features as best-effort when the app is not active.

## [​](https://docs.openclaw.ai/platforms/ios\#common-errors)  Common errors

- `NODE_BACKGROUND_UNAVAILABLE`: bring the iOS app to the foreground (canvas/camera/screen commands require it).
- `A2UI_HOST_NOT_CONFIGURED`: the Gateway did not advertise a canvas host URL; check `canvasHost` in [Gateway configuration](https://docs.openclaw.ai/gateway/configuration).
- Pairing prompt never appears: run `openclaw nodes pending` and approve manually.
- Reconnect fails after reinstall: the Keychain pairing token was cleared; re-pair the node.

## [​](https://docs.openclaw.ai/platforms/ios\#related-docs)  Related docs

- [Pairing](https://docs.openclaw.ai/gateway/pairing)
- [Discovery](https://docs.openclaw.ai/gateway/discovery)
- [Bonjour](https://docs.openclaw.ai/gateway/bonjour)

[Macos vm](https://docs.openclaw.ai/platforms/macos-vm) [Android](https://docs.openclaw.ai/platforms/android)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.