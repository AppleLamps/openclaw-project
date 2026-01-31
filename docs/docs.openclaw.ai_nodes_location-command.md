---
url: "https://docs.openclaw.ai/nodes/location-command"
title: "Location command - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/nodes/location-command#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Location command (nodes)](https://docs.openclaw.ai/nodes/location-command#location-command-nodes)
- [TL;DR](https://docs.openclaw.ai/nodes/location-command#tl%3Bdr)
- [Why a selector (not just a switch)](https://docs.openclaw.ai/nodes/location-command#why-a-selector-not-just-a-switch)
- [Settings model](https://docs.openclaw.ai/nodes/location-command#settings-model)
- [Permissions mapping (node.permissions)](https://docs.openclaw.ai/nodes/location-command#permissions-mapping-node-permissions)
- [Command: location.get](https://docs.openclaw.ai/nodes/location-command#command%3A-location-get)
- [Background behavior (future)](https://docs.openclaw.ai/nodes/location-command#background-behavior-future)
- [Model/tooling integration](https://docs.openclaw.ai/nodes/location-command#model%2Ftooling-integration)
- [UX copy (suggested)](https://docs.openclaw.ai/nodes/location-command#ux-copy-suggested)

# [​](https://docs.openclaw.ai/nodes/location-command\#location-command-nodes)  Location command (nodes)

## [​](https://docs.openclaw.ai/nodes/location-command\#tl;dr)  TL;DR

- `location.get` is a node command (via `node.invoke`).
- Off by default.
- Settings use a selector: Off / While Using / Always.
- Separate toggle: Precise Location.

## [​](https://docs.openclaw.ai/nodes/location-command\#why-a-selector-not-just-a-switch)  Why a selector (not just a switch)

OS permissions are multi-level. We can expose a selector in-app, but the OS still decides the actual grant.

- iOS/macOS: user can choose **While Using** or **Always** in system prompts/Settings. App can request upgrade, but OS may require Settings.
- Android: background location is a separate permission; on Android 10+ it often requires a Settings flow.
- Precise location is a separate grant (iOS 14+ “Precise”, Android “fine” vs “coarse”).

Selector in UI drives our requested mode; actual grant lives in OS settings.

## [​](https://docs.openclaw.ai/nodes/location-command\#settings-model)  Settings model

Per node device:

- `location.enabledMode`: `off | whileUsing | always`
- `location.preciseEnabled`: bool

UI behavior:

- Selecting `whileUsing` requests foreground permission.
- Selecting `always` first ensures `whileUsing`, then requests background (or sends user to Settings if required).
- If OS denies requested level, revert to the highest granted level and show status.

## [​](https://docs.openclaw.ai/nodes/location-command\#permissions-mapping-node-permissions)  Permissions mapping (node.permissions)

Optional. macOS node reports `location` via the permissions map; iOS/Android may omit it.

## [​](https://docs.openclaw.ai/nodes/location-command\#command:-location-get)  Command: `location.get`

Called via `node.invoke`.Params (suggested):

Copy

```
{
  "timeoutMs": 10000,
  "maxAgeMs": 15000,
  "desiredAccuracy": "coarse|balanced|precise"
}
```

Response payload:

Copy

```
{
  "lat": 48.20849,
  "lon": 16.37208,
  "accuracyMeters": 12.5,
  "altitudeMeters": 182.0,
  "speedMps": 0.0,
  "headingDeg": 270.0,
  "timestamp": "2026-01-03T12:34:56.000Z",
  "isPrecise": true,
  "source": "gps|wifi|cell|unknown"
}
```

Errors (stable codes):

- `LOCATION_DISABLED`: selector is off.
- `LOCATION_PERMISSION_REQUIRED`: permission missing for requested mode.
- `LOCATION_BACKGROUND_UNAVAILABLE`: app is backgrounded but only While Using allowed.
- `LOCATION_TIMEOUT`: no fix in time.
- `LOCATION_UNAVAILABLE`: system failure / no providers.

## [​](https://docs.openclaw.ai/nodes/location-command\#background-behavior-future)  Background behavior (future)

Goal: model can request location even when node is backgrounded, but only when:

- User selected **Always**.
- OS grants background location.
- App is allowed to run in background for location (iOS background mode / Android foreground service or special allowance).

Push-triggered flow (future):

1. Gateway sends a push to the node (silent push or FCM data).
2. Node wakes briefly and requests location from the device.
3. Node forwards payload to Gateway.

Notes:

- iOS: Always permission + background location mode required. Silent push may be throttled; expect intermittent failures.
- Android: background location may require a foreground service; otherwise, expect denial.

## [​](https://docs.openclaw.ai/nodes/location-command\#model/tooling-integration)  Model/tooling integration

- Tool surface: `nodes` tool adds `location_get` action (node required).
- CLI: `openclaw nodes location get --node <id>`.
- Agent guidelines: only call when user enabled location and understands the scope.

## [​](https://docs.openclaw.ai/nodes/location-command\#ux-copy-suggested)  UX copy (suggested)

- Off: “Location sharing is disabled.”
- While Using: “Only when OpenClaw is open.”
- Always: “Allow background location. Requires system permission.”
- Precise: “Use precise GPS location. Toggle off to share approximate location.”

[Audio](https://docs.openclaw.ai/nodes/audio) [Voicewake](https://docs.openclaw.ai/nodes/voicewake)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.