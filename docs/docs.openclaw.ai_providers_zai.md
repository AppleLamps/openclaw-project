---
url: "https://docs.openclaw.ai/providers/zai"
title: "Zai - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/zai#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Z.AI](https://docs.openclaw.ai/providers/zai#z-ai)
- [CLI setup](https://docs.openclaw.ai/providers/zai#cli-setup)
- [Config snippet](https://docs.openclaw.ai/providers/zai#config-snippet)
- [Notes](https://docs.openclaw.ai/providers/zai#notes)

# [​](https://docs.openclaw.ai/providers/zai\#z-ai)  Z.AI

Z.AI is the API platform for **GLM** models. It provides REST APIs for GLM and uses API keys
for authentication. Create your API key in the Z.AI console. OpenClaw uses the `zai` provider
with a Z.AI API key.

## [​](https://docs.openclaw.ai/providers/zai\#cli-setup)  CLI setup

Copy

```
openclaw onboard --auth-choice zai-api-key
# or non-interactive
openclaw onboard --zai-api-key "$ZAI_API_KEY"
```

## [​](https://docs.openclaw.ai/providers/zai\#config-snippet)  Config snippet

Copy

```
{
  env: { ZAI_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "zai/glm-4.7" } } }
}
```

## [​](https://docs.openclaw.ai/providers/zai\#notes)  Notes

- GLM models are available as `zai/<model>` (example: `zai/glm-4.7`).
- See [/providers/glm](https://docs.openclaw.ai/providers/glm) for the model family overview.
- Z.AI uses Bearer auth with your API key.

[Glm](https://docs.openclaw.ai/providers/glm) [Hooks](https://docs.openclaw.ai/hooks)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.