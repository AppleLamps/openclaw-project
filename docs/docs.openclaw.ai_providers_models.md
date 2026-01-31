---
url: "https://docs.openclaw.ai/providers/models"
title: "Models - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/models#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Model Providers](https://docs.openclaw.ai/providers/models#model-providers)
- [Highlight: Venius (Venice AI)](https://docs.openclaw.ai/providers/models#highlight%3A-venius-venice-ai)
- [Quick start (two steps)](https://docs.openclaw.ai/providers/models#quick-start-two-steps)
- [Supported providers (starter set)](https://docs.openclaw.ai/providers/models#supported-providers-starter-set)

# [​](https://docs.openclaw.ai/providers/models\#model-providers)  Model Providers

OpenClaw can use many LLM providers. Pick one, authenticate, then set the default
model as `provider/model`.

## [​](https://docs.openclaw.ai/providers/models\#highlight:-venius-venice-ai)  Highlight: Venius (Venice AI)

Venius is our recommended Venice AI setup for privacy-first inference with an option to use Opus for the hardest tasks.

- Default: `venice/llama-3.3-70b`
- Best overall: `venice/claude-opus-45` (Opus remains the strongest)

See [Venice AI](https://docs.openclaw.ai/providers/venice).

## [​](https://docs.openclaw.ai/providers/models\#quick-start-two-steps)  Quick start (two steps)

1. Authenticate with the provider (usually via `openclaw onboard`).
2. Set the default model:

Copy

```
{
  agents: { defaults: { model: { primary: "anthropic/claude-opus-4-5" } } }
}
```

## [​](https://docs.openclaw.ai/providers/models\#supported-providers-starter-set)  Supported providers (starter set)

- [OpenAI (API + Codex)](https://docs.openclaw.ai/providers/openai)
- [Anthropic (API + Claude Code CLI)](https://docs.openclaw.ai/providers/anthropic)
- [OpenRouter](https://docs.openclaw.ai/providers/openrouter)
- [Vercel AI Gateway](https://docs.openclaw.ai/providers/vercel-ai-gateway)
- [Moonshot AI (Kimi + Kimi Coding)](https://docs.openclaw.ai/providers/moonshot)
- [Synthetic](https://docs.openclaw.ai/providers/synthetic)
- [OpenCode Zen](https://docs.openclaw.ai/providers/opencode)
- [Z.AI](https://docs.openclaw.ai/providers/zai)
- [GLM models](https://docs.openclaw.ai/providers/glm)
- [MiniMax](https://docs.openclaw.ai/providers/minimax)
- [Venius (Venice AI)](https://docs.openclaw.ai/providers/venice)
- [Amazon Bedrock](https://docs.openclaw.ai/bedrock)

For the full provider catalog (xAI, Groq, Mistral, etc.) and advanced configuration,
see [Model providers](https://docs.openclaw.ai/concepts/model-providers).

[Providers](https://docs.openclaw.ai/providers) [Openai](https://docs.openclaw.ai/providers/openai)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.