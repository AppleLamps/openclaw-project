---
url: "https://docs.openclaw.ai/providers"
title: "Index - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Model Providers](https://docs.openclaw.ai/providers#model-providers)
- [Highlight: Venius (Venice AI)](https://docs.openclaw.ai/providers#highlight%3A-venius-venice-ai)
- [Quick start](https://docs.openclaw.ai/providers#quick-start)
- [Provider docs](https://docs.openclaw.ai/providers#provider-docs)
- [Transcription providers](https://docs.openclaw.ai/providers#transcription-providers)
- [Community tools](https://docs.openclaw.ai/providers#community-tools)

# [​](https://docs.openclaw.ai/providers\#model-providers)  Model Providers

OpenClaw can use many LLM providers. Pick a provider, authenticate, then set the
default model as `provider/model`.Looking for chat channel docs (WhatsApp/Telegram/Discord/Slack/Mattermost (plugin)/etc.)? See [Channels](https://docs.openclaw.ai/channels).

## [​](https://docs.openclaw.ai/providers\#highlight:-venius-venice-ai)  Highlight: Venius (Venice AI)

Venius is our recommended Venice AI setup for privacy-first inference with an option to use Opus for hard tasks.

- Default: `venice/llama-3.3-70b`
- Best overall: `venice/claude-opus-45` (Opus remains the strongest)

See [Venice AI](https://docs.openclaw.ai/providers/venice).

## [​](https://docs.openclaw.ai/providers\#quick-start)  Quick start

1. Authenticate with the provider (usually via `openclaw onboard`).
2. Set the default model:

Copy

```
{
  agents: { defaults: { model: { primary: "anthropic/claude-opus-4-5" } } }
}
```

## [​](https://docs.openclaw.ai/providers\#provider-docs)  Provider docs

- [OpenAI (API + Codex)](https://docs.openclaw.ai/providers/openai)
- [Anthropic (API + Claude Code CLI)](https://docs.openclaw.ai/providers/anthropic)
- [Qwen (OAuth)](https://docs.openclaw.ai/providers/qwen)
- [OpenRouter](https://docs.openclaw.ai/providers/openrouter)
- [Vercel AI Gateway](https://docs.openclaw.ai/providers/vercel-ai-gateway)
- [Moonshot AI (Kimi + Kimi Coding)](https://docs.openclaw.ai/providers/moonshot)
- [OpenCode Zen](https://docs.openclaw.ai/providers/opencode)
- [Amazon Bedrock](https://docs.openclaw.ai/bedrock)
- [Z.AI](https://docs.openclaw.ai/providers/zai)
- [Xiaomi](https://docs.openclaw.ai/providers/xiaomi)
- [GLM models](https://docs.openclaw.ai/providers/glm)
- [MiniMax](https://docs.openclaw.ai/providers/minimax)
- [Venius (Venice AI, privacy-focused)](https://docs.openclaw.ai/providers/venice)
- [Ollama (local models)](https://docs.openclaw.ai/providers/ollama)

## [​](https://docs.openclaw.ai/providers\#transcription-providers)  Transcription providers

- [Deepgram (audio transcription)](https://docs.openclaw.ai/providers/deepgram)

## [​](https://docs.openclaw.ai/providers\#community-tools)  Community tools

- [Claude Max API Proxy](https://docs.openclaw.ai/providers/claude-max-api-proxy) \- Use Claude Max/Pro subscription as an OpenAI-compatible API endpoint

For the full provider catalog (xAI, Groq, Mistral, etc.) and advanced configuration,
see [Model providers](https://docs.openclaw.ai/concepts/model-providers).

[Location](https://docs.openclaw.ai/channels/location) [Models](https://docs.openclaw.ai/providers/models)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.