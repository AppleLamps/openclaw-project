---
url: "https://docs.openclaw.ai/plugins/zalouser"
title: "Zalouser - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/plugins/zalouser#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Zalo Personal (plugin)](https://docs.openclaw.ai/plugins/zalouser#zalo-personal-plugin)
- [Naming](https://docs.openclaw.ai/plugins/zalouser#naming)
- [Where it runs](https://docs.openclaw.ai/plugins/zalouser#where-it-runs)
- [Install](https://docs.openclaw.ai/plugins/zalouser#install)
- [Option A: install from npm](https://docs.openclaw.ai/plugins/zalouser#option-a%3A-install-from-npm)
- [Option B: install from a local folder (dev)](https://docs.openclaw.ai/plugins/zalouser#option-b%3A-install-from-a-local-folder-dev)
- [Prerequisite: zca-cli](https://docs.openclaw.ai/plugins/zalouser#prerequisite%3A-zca-cli)
- [Config](https://docs.openclaw.ai/plugins/zalouser#config)
- [CLI](https://docs.openclaw.ai/plugins/zalouser#cli)
- [Agent tool](https://docs.openclaw.ai/plugins/zalouser#agent-tool)

# [​](https://docs.openclaw.ai/plugins/zalouser\#zalo-personal-plugin)  Zalo Personal (plugin)

Zalo Personal support for OpenClaw via a plugin, using `zca-cli` to automate a normal Zalo user account.

> **Warning:** Unofficial automation may lead to account suspension/ban. Use at your own risk.

## [​](https://docs.openclaw.ai/plugins/zalouser\#naming)  Naming

Channel id is `zalouser` to make it explicit this automates a **personal Zalo user account** (unofficial). We keep `zalo` reserved for a potential future official Zalo API integration.

## [​](https://docs.openclaw.ai/plugins/zalouser\#where-it-runs)  Where it runs

This plugin runs **inside the Gateway process**.If you use a remote Gateway, install/configure it on the **machine running the Gateway**, then restart the Gateway.

## [​](https://docs.openclaw.ai/plugins/zalouser\#install)  Install

### [​](https://docs.openclaw.ai/plugins/zalouser\#option-a:-install-from-npm)  Option A: install from npm

Copy

```
openclaw plugins install @openclaw/zalouser
```

Restart the Gateway afterwards.

### [​](https://docs.openclaw.ai/plugins/zalouser\#option-b:-install-from-a-local-folder-dev)  Option B: install from a local folder (dev)

Copy

```
openclaw plugins install ./extensions/zalouser
cd ./extensions/zalouser && pnpm install
```

Restart the Gateway afterwards.

## [​](https://docs.openclaw.ai/plugins/zalouser\#prerequisite:-zca-cli)  Prerequisite: zca-cli

The Gateway machine must have `zca` on `PATH`:

Copy

```
zca --version
```

## [​](https://docs.openclaw.ai/plugins/zalouser\#config)  Config

Channel config lives under `channels.zalouser` (not `plugins.entries.*`):

Copy

```
{
  channels: {
    zalouser: {
      enabled: true,
      dmPolicy: "pairing"
    }
  }
}
```

## [​](https://docs.openclaw.ai/plugins/zalouser\#cli)  CLI

Copy

```
openclaw channels login --channel zalouser
openclaw channels logout --channel zalouser
openclaw channels status --probe
openclaw message send --channel zalouser --target <threadId> --message "Hello from OpenClaw"
openclaw directory peers list --channel zalouser --query "name"
```

## [​](https://docs.openclaw.ai/plugins/zalouser\#agent-tool)  Agent tool

Tool name: `zalouser`Actions: `send`, `image`, `link`, `friends`, `groups`, `me`, `status`

[Voice call](https://docs.openclaw.ai/plugins/voice-call) [Exec](https://docs.openclaw.ai/tools/exec)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.