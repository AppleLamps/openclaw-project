---
url: "https://docs.openclaw.ai/providers/vercel-ai-gateway"
title: "Vercel AI Gateway - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/vercel-ai-gateway#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

Providers

Vercel AI Gateway

On this page

- [Vercel AI Gateway](https://docs.openclaw.ai/providers/vercel-ai-gateway#vercel-ai-gateway)
- [Quick start](https://docs.openclaw.ai/providers/vercel-ai-gateway#quick-start)
- [Non-interactive example](https://docs.openclaw.ai/providers/vercel-ai-gateway#non-interactive-example)
- [Environment note](https://docs.openclaw.ai/providers/vercel-ai-gateway#environment-note)

# [​](https://docs.openclaw.ai/providers/vercel-ai-gateway\#vercel-ai-gateway)  Vercel AI Gateway

The [Vercel AI Gateway](https://vercel.com/ai-gateway) provides a unified API to access hundreds of models through a single endpoint.

- Provider: `vercel-ai-gateway`
- Auth: `AI_GATEWAY_API_KEY`
- API: Anthropic Messages compatible

## [​](https://docs.openclaw.ai/providers/vercel-ai-gateway\#quick-start)  Quick start

1. Set the API key (recommended: store it for the Gateway):

Copy

```
openclaw onboard --auth-choice ai-gateway-api-key
```

2. Set a default model:

Copy

```
{
  agents: {
    defaults: {
      model: { primary: "vercel-ai-gateway/anthropic/claude-opus-4.5" }
    }
  }
}
```

## [​](https://docs.openclaw.ai/providers/vercel-ai-gateway\#non-interactive-example)  Non-interactive example

Copy

```
openclaw onboard --non-interactive \
  --mode local \
  --auth-choice ai-gateway-api-key \
  --ai-gateway-api-key "$AI_GATEWAY_API_KEY"
```

## [​](https://docs.openclaw.ai/providers/vercel-ai-gateway\#environment-note)  Environment note

If the Gateway runs as a daemon (launchd/systemd), make sure `AI_GATEWAY_API_KEY`
is available to that process (for example, in `~/.openclaw/.env` or via
`env.shellEnv`).

[Minimax](https://docs.openclaw.ai/providers/minimax) [Openrouter](https://docs.openclaw.ai/providers/openrouter)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.