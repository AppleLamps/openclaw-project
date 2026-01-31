---
url: "https://docs.openclaw.ai/cli/config"
title: "Config - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/config#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw config](https://docs.openclaw.ai/cli/config#openclaw-config)
- [Examples](https://docs.openclaw.ai/cli/config#examples)
- [Paths](https://docs.openclaw.ai/cli/config#paths)
- [Values](https://docs.openclaw.ai/cli/config#values)

# [​](https://docs.openclaw.ai/cli/config\#openclaw-config)  `openclaw config`

Config helpers: get/set/unset values by path. Run without a subcommand to open
the configure wizard (same as `openclaw configure`).

## [​](https://docs.openclaw.ai/cli/config\#examples)  Examples

Copy

```
openclaw config get browser.executablePath
openclaw config set browser.executablePath "/usr/bin/google-chrome"
openclaw config set agents.defaults.heartbeat.every "2h"
openclaw config set agents.list[0].tools.exec.node "node-id-or-name"
openclaw config unset tools.web.search.apiKey
```

## [​](https://docs.openclaw.ai/cli/config\#paths)  Paths

Paths use dot or bracket notation:

Copy

```
openclaw config get agents.defaults.workspace
openclaw config get agents.list[0].id
```

Use the agent list index to target a specific agent:

Copy

```
openclaw config get agents.list
openclaw config set agents.list[1].tools.exec.node "node-id-or-name"
```

## [​](https://docs.openclaw.ai/cli/config\#values)  Values

Values are parsed as JSON5 when possible; otherwise they are treated as strings.
Use `--json` to require JSON5 parsing.

Copy

```
openclaw config set agents.defaults.heartbeat.every "0m"
openclaw config set gateway.port 19001 --json
openclaw config set channels.whatsapp.groups '["*"]' --json
```

Restart the gateway after edits.

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.