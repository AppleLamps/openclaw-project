---
url: "https://docs.openclaw.ai/gateway/multiple-gateways"
title: "Multiple gateways - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/gateway/multiple-gateways#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Multiple Gateways (same host)](https://docs.openclaw.ai/gateway/multiple-gateways#multiple-gateways-same-host)
- [Isolation checklist (required)](https://docs.openclaw.ai/gateway/multiple-gateways#isolation-checklist-required)
- [Recommended: profiles (--profile)](https://docs.openclaw.ai/gateway/multiple-gateways#recommended%3A-profiles-profile)
- [Rescue-bot guide](https://docs.openclaw.ai/gateway/multiple-gateways#rescue-bot-guide)
- [How to install (rescue bot)](https://docs.openclaw.ai/gateway/multiple-gateways#how-to-install-rescue-bot)
- [Port mapping (derived)](https://docs.openclaw.ai/gateway/multiple-gateways#port-mapping-derived)
- [Browser/CDP notes (common footgun)](https://docs.openclaw.ai/gateway/multiple-gateways#browser%2Fcdp-notes-common-footgun)
- [Manual env example](https://docs.openclaw.ai/gateway/multiple-gateways#manual-env-example)
- [Quick checks](https://docs.openclaw.ai/gateway/multiple-gateways#quick-checks)

# [​](https://docs.openclaw.ai/gateway/multiple-gateways\#multiple-gateways-same-host)  Multiple Gateways (same host)

Most setups should use one Gateway because a single Gateway can handle multiple messaging connections and agents. If you need stronger isolation or redundancy (e.g., a rescue bot), run separate Gateways with isolated profiles/ports.

## [​](https://docs.openclaw.ai/gateway/multiple-gateways\#isolation-checklist-required)  Isolation checklist (required)

- `OPENCLAW_CONFIG_PATH` — per-instance config file
- `OPENCLAW_STATE_DIR` — per-instance sessions, creds, caches
- `agents.defaults.workspace` — per-instance workspace root
- `gateway.port` (or `--port`) — unique per instance
- Derived ports (browser/canvas) must not overlap

If these are shared, you will hit config races and port conflicts.

## [​](https://docs.openclaw.ai/gateway/multiple-gateways\#recommended:-profiles-profile)  Recommended: profiles (`--profile`)

Profiles auto-scope `OPENCLAW_STATE_DIR` \+ `OPENCLAW_CONFIG_PATH` and suffix service names.

Copy

```
# main
openclaw --profile main setup
openclaw --profile main gateway --port 18789

# rescue
openclaw --profile rescue setup
openclaw --profile rescue gateway --port 19001
```

Per-profile services:

Copy

```
openclaw --profile main gateway install
openclaw --profile rescue gateway install
```

## [​](https://docs.openclaw.ai/gateway/multiple-gateways\#rescue-bot-guide)  Rescue-bot guide

Run a second Gateway on the same host with its own:

- profile/config
- state dir
- workspace
- base port (plus derived ports)

This keeps the rescue bot isolated from the main bot so it can debug or apply config changes if the primary bot is down.Port spacing: leave at least 20 ports between base ports so the derived browser/canvas/CDP ports never collide.

### [​](https://docs.openclaw.ai/gateway/multiple-gateways\#how-to-install-rescue-bot)  How to install (rescue bot)

Copy

```
# Main bot (existing or fresh, without --profile param)
# Runs on port 18789 + Chrome CDC/Canvas/... Ports
openclaw onboard
openclaw gateway install

# Rescue bot (isolated profile + ports)
openclaw --profile rescue onboard
# Notes:
# - workspace name will be postfixed with -rescue per default
# - Port should be at least 18789 + 20 Ports,
#   better choose completely different base port, like 19789,
# - rest of the onboarding is the same as normal

# To install the service (if not happened automatically during onboarding)
openclaw --profile rescue gateway install
```

## [​](https://docs.openclaw.ai/gateway/multiple-gateways\#port-mapping-derived)  Port mapping (derived)

Base port = `gateway.port` (or `OPENCLAW_GATEWAY_PORT` / `--port`).

- browser control service port = base + 2 (loopback only)
- `canvasHost.port = base + 4`
- Browser profile CDP ports auto-allocate from `browser.controlPort + 9 .. + 108`

If you override any of these in config or env, you must keep them unique per instance.

## [​](https://docs.openclaw.ai/gateway/multiple-gateways\#browser/cdp-notes-common-footgun)  Browser/CDP notes (common footgun)

- Do **not** pin `browser.cdpUrl` to the same values on multiple instances.
- Each instance needs its own browser control port and CDP range (derived from its gateway port).
- If you need explicit CDP ports, set `browser.profiles.<name>.cdpPort` per instance.
- Remote Chrome: use `browser.profiles.<name>.cdpUrl` (per profile, per instance).

## [​](https://docs.openclaw.ai/gateway/multiple-gateways\#manual-env-example)  Manual env example

Copy

```
OPENCLAW_CONFIG_PATH=~/.openclaw/main.json \
OPENCLAW_STATE_DIR=~/.openclaw-main \
openclaw gateway --port 18789

OPENCLAW_CONFIG_PATH=~/.openclaw/rescue.json \
OPENCLAW_STATE_DIR=~/.openclaw-rescue \
openclaw gateway --port 19001
```

## [​](https://docs.openclaw.ai/gateway/multiple-gateways\#quick-checks)  Quick checks

Copy

```
openclaw --profile main status
openclaw --profile rescue status
openclaw --profile rescue browser status
```

[Configuration](https://docs.openclaw.ai/gateway/configuration) [Configuration examples](https://docs.openclaw.ai/gateway/configuration-examples)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.