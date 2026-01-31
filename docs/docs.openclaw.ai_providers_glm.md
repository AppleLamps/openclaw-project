---
url: "https://docs.openclaw.ai/providers/glm"
title: "Glm - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/glm#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [GLM models](https://docs.openclaw.ai/providers/glm#glm-models)
- [CLI setup](https://docs.openclaw.ai/providers/glm#cli-setup)
- [Config snippet](https://docs.openclaw.ai/providers/glm#config-snippet)
- [Notes](https://docs.openclaw.ai/providers/glm#notes)

# [​](https://docs.openclaw.ai/providers/glm\#glm-models)  GLM models

GLM is a **model family** (not a company) available through the Z.AI platform. In OpenClaw, GLM
models are accessed via the `zai` provider and model IDs like `zai/glm-4.7`.

## [​](https://docs.openclaw.ai/providers/glm\#cli-setup)  CLI setup

Copy

```
openclaw onboard --auth-choice zai-api-key
```

## [​](https://docs.openclaw.ai/providers/glm\#config-snippet)  Config snippet

Copy

```
{
  env: { ZAI_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "zai/glm-4.7" } } }
}
```

## [​](https://docs.openclaw.ai/providers/glm\#notes)  Notes

- GLM versions and availability can change; check Z.AI’s docs for the latest.
- Example model IDs include `glm-4.7` and `glm-4.6`.
- For provider details, see [/providers/zai](https://docs.openclaw.ai/providers/zai).

[Opencode](https://docs.openclaw.ai/providers/opencode) [Zai](https://docs.openclaw.ai/providers/zai)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.