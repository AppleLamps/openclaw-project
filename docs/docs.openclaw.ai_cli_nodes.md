---
url: "https://docs.openclaw.ai/cli/nodes"
title: "Nodes - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/nodes#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw nodes](https://docs.openclaw.ai/cli/nodes#openclaw-nodes)
- [Common commands](https://docs.openclaw.ai/cli/nodes#common-commands)
- [Invoke / run](https://docs.openclaw.ai/cli/nodes#invoke-%2F-run)
- [Exec-style defaults](https://docs.openclaw.ai/cli/nodes#exec-style-defaults)

# [​](https://docs.openclaw.ai/cli/nodes\#openclaw-nodes)  `openclaw nodes`

Manage paired nodes (devices) and invoke node capabilities.Related:

- Nodes overview: [Nodes](https://docs.openclaw.ai/nodes)
- Camera: [Camera nodes](https://docs.openclaw.ai/nodes/camera)
- Images: [Image nodes](https://docs.openclaw.ai/nodes/images)

Common options:

- `--url`, `--token`, `--timeout`, `--json`

## [​](https://docs.openclaw.ai/cli/nodes\#common-commands)  Common commands

Copy

```
openclaw nodes list
openclaw nodes list --connected
openclaw nodes list --last-connected 24h
openclaw nodes pending
openclaw nodes approve <requestId>
openclaw nodes status
openclaw nodes status --connected
openclaw nodes status --last-connected 24h
```

`nodes list` prints pending/paired tables. Paired rows include the most recent connect age (Last Connect).
Use `--connected` to only show currently-connected nodes. Use `--last-connected <duration>` to
filter to nodes that connected within a duration (e.g. `24h`, `7d`).

## [​](https://docs.openclaw.ai/cli/nodes\#invoke-/-run)  Invoke / run

Copy

```
openclaw nodes invoke --node <id|name|ip> --command <command> --params <json>
openclaw nodes run --node <id|name|ip> <command...>
openclaw nodes run --raw "git status"
openclaw nodes run --agent main --node <id|name|ip> --raw "git status"
```

Invoke flags:

- `--params <json>`: JSON object string (default `{}`).
- `--invoke-timeout <ms>`: node invoke timeout (default `15000`).
- `--idempotency-key <key>`: optional idempotency key.

### [​](https://docs.openclaw.ai/cli/nodes\#exec-style-defaults)  Exec-style defaults

`nodes run` mirrors the model’s exec behavior (defaults + approvals):

- Reads `tools.exec.*` (plus `agents.list[].tools.exec.*` overrides).
- Uses exec approvals (`exec.approval.request`) before invoking `system.run`.
- `--node` can be omitted when `tools.exec.node` is set.
- Requires a node that advertises `system.run` (macOS companion app or headless node host).

Flags:

- `--cwd <path>`: working directory.
- `--env <key=val>`: env override (repeatable).
- `--command-timeout <ms>`: command timeout.
- `--invoke-timeout <ms>`: node invoke timeout (default `30000`).
- `--needs-screen-recording`: require screen recording permission.
- `--raw <command>`: run a shell string (`/bin/sh -lc` or `cmd.exe /c`).
- `--agent <id>`: agent-scoped approvals/allowlists (defaults to configured agent).
- `--ask <off|on-miss|always>`, `--security <deny|allowlist|full>`: overrides.

[System](https://docs.openclaw.ai/cli/system) [Approvals](https://docs.openclaw.ai/cli/approvals)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.