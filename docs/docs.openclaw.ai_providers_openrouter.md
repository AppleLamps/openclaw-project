---
url: "https://docs.openclaw.ai/providers/openrouter"
title: "Openrouter - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/openrouter#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [OpenRouter](https://docs.openclaw.ai/providers/openrouter#openrouter)
- [CLI setup](https://docs.openclaw.ai/providers/openrouter#cli-setup)
- [Config snippet](https://docs.openclaw.ai/providers/openrouter#config-snippet)
- [Notes](https://docs.openclaw.ai/providers/openrouter#notes)

# [​](https://docs.openclaw.ai/providers/openrouter\#openrouter)  OpenRouter

OpenRouter provides a **unified API** that routes requests to many models behind a single
endpoint and API key. It is OpenAI-compatible, so most OpenAI SDKs work by switching the base URL.

## [​](https://docs.openclaw.ai/providers/openrouter\#cli-setup)  CLI setup

Copy

```
openclaw onboard --auth-choice apiKey --token-provider openrouter --token "$OPENROUTER_API_KEY"
```

## [​](https://docs.openclaw.ai/providers/openrouter\#config-snippet)  Config snippet

Copy

```
{
  env: { OPENROUTER_API_KEY: "sk-or-..." },
  agents: {
    defaults: {
      model: { primary: "openrouter/anthropic/claude-sonnet-4-5" }
    }
  }
}
```

## [​](https://docs.openclaw.ai/providers/openrouter\#notes)  Notes

- Model refs are `openrouter/<provider>/<model>`.
- For more model/provider options, see [/concepts/model-providers](https://docs.openclaw.ai/concepts/model-providers).
- OpenRouter uses a Bearer token with your API key under the hood.

[Vercel AI Gateway](https://docs.openclaw.ai/providers/vercel-ai-gateway) [Synthetic](https://docs.openclaw.ai/providers/synthetic)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.