---
url: "https://docs.openclaw.ai/cli/agents"
title: "Agents - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/agents#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw agents](https://docs.openclaw.ai/cli/agents#openclaw-agents)
- [Examples](https://docs.openclaw.ai/cli/agents#examples)
- [Identity files](https://docs.openclaw.ai/cli/agents#identity-files)
- [Set identity](https://docs.openclaw.ai/cli/agents#set-identity)

# [​](https://docs.openclaw.ai/cli/agents\#openclaw-agents)  `openclaw agents`

Manage isolated agents (workspaces + auth + routing).Related:

- Multi-agent routing: [Multi-Agent Routing](https://docs.openclaw.ai/concepts/multi-agent)
- Agent workspace: [Agent workspace](https://docs.openclaw.ai/concepts/agent-workspace)

## [​](https://docs.openclaw.ai/cli/agents\#examples)  Examples

Copy

```
openclaw agents list
openclaw agents add work --workspace ~/.openclaw/workspace-work
openclaw agents set-identity --workspace ~/.openclaw/workspace --from-identity
openclaw agents set-identity --agent main --avatar avatars/openclaw.png
openclaw agents delete work
```

## [​](https://docs.openclaw.ai/cli/agents\#identity-files)  Identity files

Each agent workspace can include an `IDENTITY.md` at the workspace root:

- Example path: `~/.openclaw/workspace/IDENTITY.md`
- `set-identity --from-identity` reads from the workspace root (or an explicit `--identity-file`)

Avatar paths resolve relative to the workspace root.

## [​](https://docs.openclaw.ai/cli/agents\#set-identity)  Set identity

`set-identity` writes fields into `agents.list[].identity`:

- `name`
- `theme`
- `emoji`
- `avatar` (workspace-relative path, http(s) URL, or data URI)

Load from `IDENTITY.md`:

Copy

```
openclaw agents set-identity --workspace ~/.openclaw/workspace --from-identity
```

Override fields explicitly:

Copy

```
openclaw agents set-identity --agent main --name "OpenClaw" --emoji "🦞" --avatar avatars/openclaw.png
```

Config sample:

Copy

```
{
  agents: {
    list: [\
      {\
        id: "main",\
        identity: {\
          name: "OpenClaw",\
          theme: "space lobster",\
          emoji: "🦞",\
          avatar: "avatars/openclaw.png"\
        }\
      }\
    ]
  }
}
```

[Agent](https://docs.openclaw.ai/cli/agent) [Status](https://docs.openclaw.ai/cli/status)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.