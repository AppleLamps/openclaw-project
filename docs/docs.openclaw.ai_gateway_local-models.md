---
url: "https://docs.openclaw.ai/gateway/local-models"
title: "Local models - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/gateway/local-models#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Local models](https://docs.openclaw.ai/gateway/local-models#local-models)
- [Recommended: LM Studio + MiniMax M2.1 (Responses API, full-size)](https://docs.openclaw.ai/gateway/local-models#recommended%3A-lm-studio-%2B-minimax-m2-1-responses-api%2C-full-size)
- [Hybrid config: hosted primary, local fallback](https://docs.openclaw.ai/gateway/local-models#hybrid-config%3A-hosted-primary%2C-local-fallback)
- [Local-first with hosted safety net](https://docs.openclaw.ai/gateway/local-models#local-first-with-hosted-safety-net)
- [Regional hosting / data routing](https://docs.openclaw.ai/gateway/local-models#regional-hosting-%2F-data-routing)
- [Other OpenAI-compatible local proxies](https://docs.openclaw.ai/gateway/local-models#other-openai-compatible-local-proxies)
- [Troubleshooting](https://docs.openclaw.ai/gateway/local-models#troubleshooting)

# [​](https://docs.openclaw.ai/gateway/local-models\#local-models)  Local models

Local is doable, but OpenClaw expects large context + strong defenses against prompt injection. Small cards truncate context and leak safety. Aim high: **≥2 maxed-out Mac Studios or equivalent GPU rig (~$30k+)**. A single **24 GB** GPU works only for lighter prompts with higher latency. Use the **largest / full-size model variant you can run**; aggressively quantized or “small” checkpoints raise prompt-injection risk (see [Security](https://docs.openclaw.ai/gateway/security)).

## [​](https://docs.openclaw.ai/gateway/local-models\#recommended:-lm-studio-+-minimax-m2-1-responses-api,-full-size)  Recommended: LM Studio + MiniMax M2.1 (Responses API, full-size)

Best current local stack. Load MiniMax M2.1 in LM Studio, enable the local server (default `http://127.0.0.1:1234`), and use Responses API to keep reasoning separate from final text.

Copy

```
{
  agents: {
    defaults: {
      model: { primary: "lmstudio/minimax-m2.1-gs32" },
      models: {
        "anthropic/claude-opus-4-5": { alias: "Opus" },
        "lmstudio/minimax-m2.1-gs32": { alias: "Minimax" }
      }
    }
  },
  models: {
    mode: "merge",
    providers: {
      lmstudio: {
        baseUrl: "http://127.0.0.1:1234/v1",
        apiKey: "lmstudio",
        api: "openai-responses",
        models: [\
          {\
            id: "minimax-m2.1-gs32",\
            name: "MiniMax M2.1 GS32",\
            reasoning: false,\
            input: ["text"],\
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },\
            contextWindow: 196608,\
            maxTokens: 8192\
          }\
        ]
      }
    }
  }
}
```

**Setup checklist**

- Install LM Studio: [https://lmstudio.ai](https://lmstudio.ai/)
- In LM Studio, download the **largest MiniMax M2.1 build available** (avoid “small”/heavily quantized variants), start the server, confirm `http://127.0.0.1:1234/v1/models` lists it.
- Keep the model loaded; cold-load adds startup latency.
- Adjust `contextWindow`/`maxTokens` if your LM Studio build differs.
- For WhatsApp, stick to Responses API so only final text is sent.

Keep hosted models configured even when running local; use `models.mode: "merge"` so fallbacks stay available.

### [​](https://docs.openclaw.ai/gateway/local-models\#hybrid-config:-hosted-primary,-local-fallback)  Hybrid config: hosted primary, local fallback

Copy

```
{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-sonnet-4-5",
        fallbacks: ["lmstudio/minimax-m2.1-gs32", "anthropic/claude-opus-4-5"]
      },
      models: {
        "anthropic/claude-sonnet-4-5": { alias: "Sonnet" },
        "lmstudio/minimax-m2.1-gs32": { alias: "MiniMax Local" },
        "anthropic/claude-opus-4-5": { alias: "Opus" }
      }
    }
  },
  models: {
    mode: "merge",
    providers: {
      lmstudio: {
        baseUrl: "http://127.0.0.1:1234/v1",
        apiKey: "lmstudio",
        api: "openai-responses",
        models: [\
          {\
            id: "minimax-m2.1-gs32",\
            name: "MiniMax M2.1 GS32",\
            reasoning: false,\
            input: ["text"],\
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },\
            contextWindow: 196608,\
            maxTokens: 8192\
          }\
        ]
      }
    }
  }
}
```

### [​](https://docs.openclaw.ai/gateway/local-models\#local-first-with-hosted-safety-net)  Local-first with hosted safety net

Swap the primary and fallback order; keep the same providers block and `models.mode: "merge"` so you can fall back to Sonnet or Opus when the local box is down.

### [​](https://docs.openclaw.ai/gateway/local-models\#regional-hosting-/-data-routing)  Regional hosting / data routing

- Hosted MiniMax/Kimi/GLM variants also exist on OpenRouter with region-pinned endpoints (e.g., US-hosted). Pick the regional variant there to keep traffic in your chosen jurisdiction while still using `models.mode: "merge"` for Anthropic/OpenAI fallbacks.
- Local-only remains the strongest privacy path; hosted regional routing is the middle ground when you need provider features but want control over data flow.

## [​](https://docs.openclaw.ai/gateway/local-models\#other-openai-compatible-local-proxies)  Other OpenAI-compatible local proxies

vLLM, LiteLLM, OAI-proxy, or custom gateways work if they expose an OpenAI-style `/v1` endpoint. Replace the provider block above with your endpoint and model ID:

Copy

```
{
  models: {
    mode: "merge",
    providers: {
      local: {
        baseUrl: "http://127.0.0.1:8000/v1",
        apiKey: "sk-local",
        api: "openai-responses",
        models: [\
          {\
            id: "my-local-model",\
            name: "Local Model",\
            reasoning: false,\
            input: ["text"],\
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },\
            contextWindow: 120000,\
            maxTokens: 8192\
          }\
        ]
      }
    }
  }
}
```

Keep `models.mode: "merge"` so hosted models stay available as fallbacks.

## [​](https://docs.openclaw.ai/gateway/local-models\#troubleshooting)  Troubleshooting

- Gateway can reach the proxy? `curl http://127.0.0.1:1234/v1/models`.
- LM Studio model unloaded? Reload; cold start is a common “hanging” cause.
- Context errors? Lower `contextWindow` or raise your server limit.
- Safety: local models skip provider-side filters; keep agents narrow and compaction on to limit prompt injection blast radius.

[Cli backends](https://docs.openclaw.ai/gateway/cli-backends) [Background process](https://docs.openclaw.ai/gateway/background-process)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.