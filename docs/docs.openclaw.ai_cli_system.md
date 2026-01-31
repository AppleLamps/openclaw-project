---
url: "https://docs.openclaw.ai/cli/system"
title: "System - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/system#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw system](https://docs.openclaw.ai/cli/system#openclaw-system)
- [Common commands](https://docs.openclaw.ai/cli/system#common-commands)
- [system event](https://docs.openclaw.ai/cli/system#system-event)
- [system heartbeat last\|enable\|disable](https://docs.openclaw.ai/cli/system#system-heartbeat-last%7Cenable%7Cdisable)
- [system presence](https://docs.openclaw.ai/cli/system#system-presence)
- [Notes](https://docs.openclaw.ai/cli/system#notes)

# [​](https://docs.openclaw.ai/cli/system\#openclaw-system)  `openclaw system`

System-level helpers for the Gateway: enqueue system events, control heartbeats,
and view presence.

## [​](https://docs.openclaw.ai/cli/system\#common-commands)  Common commands

Copy

```
openclaw system event --text "Check for urgent follow-ups" --mode now
openclaw system heartbeat enable
openclaw system heartbeat last
openclaw system presence
```

## [​](https://docs.openclaw.ai/cli/system\#system-event)  `system event`

Enqueue a system event on the **main** session. The next heartbeat will inject
it as a `System:` line in the prompt. Use `--mode now` to trigger the heartbeat
immediately; `next-heartbeat` waits for the next scheduled tick.Flags:

- `--text <text>`: required system event text.
- `--mode <mode>`: `now` or `next-heartbeat` (default).
- `--json`: machine-readable output.

## [​](https://docs.openclaw.ai/cli/system\#system-heartbeat-last|enable|disable)  `system heartbeat last|enable|disable`

Heartbeat controls:

- `last`: show the last heartbeat event.
- `enable`: turn heartbeats back on (use this if they were disabled).
- `disable`: pause heartbeats.

Flags:

- `--json`: machine-readable output.

## [​](https://docs.openclaw.ai/cli/system\#system-presence)  `system presence`

List the current system presence entries the Gateway knows about (nodes,
instances, and similar status lines).Flags:

- `--json`: machine-readable output.

## [​](https://docs.openclaw.ai/cli/system\#notes)  Notes

- Requires a running Gateway reachable by your current config (local or remote).
- System events are ephemeral and not persisted across restarts.

[Logs](https://docs.openclaw.ai/cli/logs) [Nodes](https://docs.openclaw.ai/cli/nodes)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.