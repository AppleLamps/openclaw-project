---
url: "https://docs.openclaw.ai/cli/approvals"
title: "Approvals - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/approvals#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw approvals](https://docs.openclaw.ai/cli/approvals#openclaw-approvals)
- [Common commands](https://docs.openclaw.ai/cli/approvals#common-commands)
- [Replace approvals from a file](https://docs.openclaw.ai/cli/approvals#replace-approvals-from-a-file)
- [Allowlist helpers](https://docs.openclaw.ai/cli/approvals#allowlist-helpers)
- [Notes](https://docs.openclaw.ai/cli/approvals#notes)

# [​](https://docs.openclaw.ai/cli/approvals\#openclaw-approvals)  `openclaw approvals`

Manage exec approvals for the **local host**, **gateway host**, or a **node host**.
By default, commands target the local approvals file on disk. Use `--gateway` to target the gateway, or `--node` to target a specific node.Related:

- Exec approvals: [Exec approvals](https://docs.openclaw.ai/tools/exec-approvals)
- Nodes: [Nodes](https://docs.openclaw.ai/nodes)

## [​](https://docs.openclaw.ai/cli/approvals\#common-commands)  Common commands

Copy

```
openclaw approvals get
openclaw approvals get --node <id|name|ip>
openclaw approvals get --gateway
```

## [​](https://docs.openclaw.ai/cli/approvals\#replace-approvals-from-a-file)  Replace approvals from a file

Copy

```
openclaw approvals set --file ./exec-approvals.json
openclaw approvals set --node <id|name|ip> --file ./exec-approvals.json
openclaw approvals set --gateway --file ./exec-approvals.json
```

## [​](https://docs.openclaw.ai/cli/approvals\#allowlist-helpers)  Allowlist helpers

Copy

```
openclaw approvals allowlist add "~/Projects/**/bin/rg"
openclaw approvals allowlist add --agent main --node <id|name|ip> "/usr/bin/uptime"
openclaw approvals allowlist add --agent "*" "/usr/bin/uname"

openclaw approvals allowlist remove "~/Projects/**/bin/rg"
```

## [​](https://docs.openclaw.ai/cli/approvals\#notes)  Notes

- `--node` uses the same resolver as `openclaw nodes` (id, name, ip, or id prefix).
- `--agent` defaults to `"*"`, which applies to all agents.
- The node host must advertise `system.execApprovals.get/set` (macOS app or headless node host).
- Approvals files are stored per host at `~/.openclaw/exec-approvals.json`.

[Nodes](https://docs.openclaw.ai/cli/nodes) [Gateway](https://docs.openclaw.ai/cli/gateway)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.