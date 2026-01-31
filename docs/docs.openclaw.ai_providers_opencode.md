---
url: "https://docs.openclaw.ai/providers/opencode"
title: "Opencode - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/opencode#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [OpenCode Zen](https://docs.openclaw.ai/providers/opencode#opencode-zen)
- [CLI setup](https://docs.openclaw.ai/providers/opencode#cli-setup)
- [Config snippet](https://docs.openclaw.ai/providers/opencode#config-snippet)
- [Notes](https://docs.openclaw.ai/providers/opencode#notes)

# [​](https://docs.openclaw.ai/providers/opencode\#opencode-zen)  OpenCode Zen

OpenCode Zen is a **curated list of models** recommended by the OpenCode team for coding agents.
It is an optional, hosted model access path that uses an API key and the `opencode` provider.
Zen is currently in beta.

## [​](https://docs.openclaw.ai/providers/opencode\#cli-setup)  CLI setup

Copy

```
openclaw onboard --auth-choice opencode-zen
# or non-interactive
openclaw onboard --opencode-zen-api-key "$OPENCODE_API_KEY"
```

## [​](https://docs.openclaw.ai/providers/opencode\#config-snippet)  Config snippet

Copy

```
{
  env: { OPENCODE_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "opencode/claude-opus-4-5" } } }
}
```

## [​](https://docs.openclaw.ai/providers/opencode\#notes)  Notes

- `OPENCODE_ZEN_API_KEY` is also supported.
- You sign in to Zen, add billing details, and copy your API key.
- OpenCode Zen bills per request; check the OpenCode dashboard for details.

[Synthetic](https://docs.openclaw.ai/providers/synthetic) [Glm](https://docs.openclaw.ai/providers/glm)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.