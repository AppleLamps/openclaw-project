---
url: "https://docs.openclaw.ai/prose"
title: "Prose - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/prose#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [OpenProse](https://docs.openclaw.ai/prose#openprose)
- [What it can do](https://docs.openclaw.ai/prose#what-it-can-do)
- [Install + enable](https://docs.openclaw.ai/prose#install-%2B-enable)
- [Slash command](https://docs.openclaw.ai/prose#slash-command)
- [Example: a simple .prose file](https://docs.openclaw.ai/prose#example%3A-a-simple-prose-file)
- [File locations](https://docs.openclaw.ai/prose#file-locations)
- [State modes](https://docs.openclaw.ai/prose#state-modes)
- [Remote programs](https://docs.openclaw.ai/prose#remote-programs)
- [OpenClaw runtime mapping](https://docs.openclaw.ai/prose#openclaw-runtime-mapping)
- [Security + approvals](https://docs.openclaw.ai/prose#security-%2B-approvals)

# [​](https://docs.openclaw.ai/prose\#openprose)  OpenProse

OpenProse is a portable, markdown-first workflow format for orchestrating AI sessions. In OpenClaw it ships as a plugin that installs an OpenProse skill pack plus a `/prose` slash command. Programs live in `.prose` files and can spawn multiple sub-agents with explicit control flow.Official site: [https://www.prose.md](https://www.prose.md/)

## [​](https://docs.openclaw.ai/prose\#what-it-can-do)  What it can do

- Multi-agent research + synthesis with explicit parallelism.
- Repeatable approval-safe workflows (code review, incident triage, content pipelines).
- Reusable `.prose` programs you can run across supported agent runtimes.

## [​](https://docs.openclaw.ai/prose\#install-+-enable)  Install + enable

Bundled plugins are disabled by default. Enable OpenProse:

Copy

```
openclaw plugins enable open-prose
```

Restart the Gateway after enabling the plugin.Dev/local checkout: `openclaw plugins install ./extensions/open-prose`Related docs: [Plugins](https://docs.openclaw.ai/plugin), [Plugin manifest](https://docs.openclaw.ai/plugins/manifest), [Skills](https://docs.openclaw.ai/tools/skills).

## [​](https://docs.openclaw.ai/prose\#slash-command)  Slash command

OpenProse registers `/prose` as a user-invocable skill command. It routes to the OpenProse VM instructions and uses OpenClaw tools under the hood.Common commands:

Copy

```
/prose help
/prose run <file.prose>
/prose run <handle/slug>
/prose run <https://example.com/file.prose>
/prose compile <file.prose>
/prose examples
/prose update
```

## [​](https://docs.openclaw.ai/prose\#example:-a-simple-prose-file)  Example: a simple `.prose` file

Copy

```
# Research + synthesis with two agents running in parallel.

input topic: "What should we research?"

agent researcher:
  model: sonnet
  prompt: "You research thoroughly and cite sources."

agent writer:
  model: opus
  prompt: "You write a concise summary."

parallel:
  findings = session: researcher
    prompt: "Research {topic}."
  draft = session: writer
    prompt: "Summarize {topic}."

session "Merge the findings + draft into a final answer."
context: { findings, draft }
```

## [​](https://docs.openclaw.ai/prose\#file-locations)  File locations

OpenProse keeps state under `.prose/` in your workspace:

Copy

```
.prose/
├── .env
├── runs/
│   └── {YYYYMMDD}-{HHMMSS}-{random}/
│       ├── program.prose
│       ├── state.md
│       ├── bindings/
│       └── agents/
└── agents/
```

User-level persistent agents live at:

Copy

```
~/.prose/agents/
```

## [​](https://docs.openclaw.ai/prose\#state-modes)  State modes

OpenProse supports multiple state backends:

- **filesystem** (default): `.prose/runs/...`
- **in-context**: transient, for small programs
- **sqlite** (experimental): requires `sqlite3` binary
- **postgres** (experimental): requires `psql` and a connection string

Notes:

- sqlite/postgres are opt-in and experimental.
- postgres credentials flow into subagent logs; use a dedicated, least-privileged DB.

## [​](https://docs.openclaw.ai/prose\#remote-programs)  Remote programs

`/prose run <handle/slug>` resolves to `https://p.prose.md/<handle>/<slug>`.
Direct URLs are fetched as-is. This uses the `web_fetch` tool (or `exec` for POST).

## [​](https://docs.openclaw.ai/prose\#openclaw-runtime-mapping)  OpenClaw runtime mapping

OpenProse programs map to OpenClaw primitives:

| OpenProse concept | OpenClaw tool |
| --- | --- |
| Spawn session / Task tool | `sessions_spawn` |
| File read/write | `read` / `write` |
| Web fetch | `web_fetch` |

If your tool allowlist blocks these tools, OpenProse programs will fail. See [Skills config](https://docs.openclaw.ai/tools/skills-config).

## [​](https://docs.openclaw.ai/prose\#security-+-approvals)  Security + approvals

Treat `.prose` files like code. Review before running. Use OpenClaw tool allowlists and approval gates to control side effects.For deterministic, approval-gated workflows, compare with [Lobster](https://docs.openclaw.ai/tools/lobster).

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.