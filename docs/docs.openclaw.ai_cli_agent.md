---
url: "https://docs.openclaw.ai/cli/agent"
title: "Agent - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/agent#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw agent](https://docs.openclaw.ai/cli/agent#openclaw-agent)
- [Examples](https://docs.openclaw.ai/cli/agent#examples)

# [​](https://docs.openclaw.ai/cli/agent\#openclaw-agent)  `openclaw agent`

Run an agent turn via the Gateway (use `--local` for embedded).
Use `--agent <id>` to target a configured agent directly.Related:

- Agent send tool: [Agent send](https://docs.openclaw.ai/tools/agent-send)

## [​](https://docs.openclaw.ai/cli/agent\#examples)  Examples

Copy

```
openclaw agent --to +15555550123 --message "status update" --deliver
openclaw agent --agent ops --message "Summarize logs"
openclaw agent --session-id 1234 --message "Summarize inbox" --thinking medium
openclaw agent --agent ops --message "Generate report" --deliver --reply-channel slack --reply-to "#reports"
```

[Message](https://docs.openclaw.ai/cli/message) [Agents](https://docs.openclaw.ai/cli/agents)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.