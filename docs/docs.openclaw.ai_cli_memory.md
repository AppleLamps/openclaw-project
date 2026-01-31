---
url: "https://docs.openclaw.ai/cli/memory"
title: "Memory - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/memory#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw memory](https://docs.openclaw.ai/cli/memory#openclaw-memory)
- [Examples](https://docs.openclaw.ai/cli/memory#examples)
- [Options](https://docs.openclaw.ai/cli/memory#options)

# [​](https://docs.openclaw.ai/cli/memory\#openclaw-memory)  `openclaw memory`

Manage semantic memory indexing and search.
Provided by the active memory plugin (default: `memory-core`; set `plugins.slots.memory = "none"` to disable).Related:

- Memory concept: [Memory](https://docs.openclaw.ai/concepts/memory)
- Plugins: [Plugins](https://docs.openclaw.ai/plugins)

## [​](https://docs.openclaw.ai/cli/memory\#examples)  Examples

Copy

```
openclaw memory status
openclaw memory status --deep
openclaw memory status --deep --index
openclaw memory status --deep --index --verbose
openclaw memory index
openclaw memory index --verbose
openclaw memory search "release checklist"
openclaw memory status --agent main
openclaw memory index --agent main --verbose
```

## [​](https://docs.openclaw.ai/cli/memory\#options)  Options

Common:

- `--agent <id>`: scope to a single agent (default: all configured agents).
- `--verbose`: emit detailed logs during probes and indexing.

Notes:

- `memory status --deep` probes vector + embedding availability.
- `memory status --deep --index` runs a reindex if the store is dirty.
- `memory index --verbose` prints per-phase details (provider, model, sources, batch activity).
- `memory status` includes any extra paths configured via `memorySearch.extraPaths`.

[Plugins](https://docs.openclaw.ai/cli/plugins) [Models](https://docs.openclaw.ai/cli/models)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.