---
url: "https://docs.openclaw.ai/providers/moonshot"
title: "Moonshot - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/moonshot#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Moonshot AI (Kimi)](https://docs.openclaw.ai/providers/moonshot#moonshot-ai-kimi)
- [Config snippet (Moonshot API)](https://docs.openclaw.ai/providers/moonshot#config-snippet-moonshot-api)
- [Kimi Coding](https://docs.openclaw.ai/providers/moonshot#kimi-coding)
- [Notes](https://docs.openclaw.ai/providers/moonshot#notes)

# [​](https://docs.openclaw.ai/providers/moonshot\#moonshot-ai-kimi)  Moonshot AI (Kimi)

Moonshot provides the Kimi API with OpenAI-compatible endpoints. Configure the
provider and set the default model to `moonshot/kimi-k2.5`, or use
Kimi Coding with `kimi-coding/k2p5`.Current Kimi K2 model IDs:

- `kimi-k2.5`
- `kimi-k2-0905-preview`
- `kimi-k2-turbo-preview`
- `kimi-k2-thinking`
- `kimi-k2-thinking-turbo`

Copy

```
openclaw onboard --auth-choice moonshot-api-key
```

Kimi Coding:

Copy

```
openclaw onboard --auth-choice kimi-code-api-key
```

Note: Moonshot and Kimi Coding are separate providers. Keys are not interchangeable, endpoints differ, and model refs differ (Moonshot uses `moonshot/...`, Kimi Coding uses `kimi-coding/...`).

## [​](https://docs.openclaw.ai/providers/moonshot\#config-snippet-moonshot-api)  Config snippet (Moonshot API)

Copy

```
{
  env: { MOONSHOT_API_KEY: "sk-..." },
  agents: {
    defaults: {
      model: { primary: "moonshot/kimi-k2.5" },
      models: {
        // moonshot-kimi-k2-aliases:start
        "moonshot/kimi-k2.5": { alias: "Kimi K2.5" },
        "moonshot/kimi-k2-0905-preview": { alias: "Kimi K2" },
        "moonshot/kimi-k2-turbo-preview": { alias: "Kimi K2 Turbo" },
        "moonshot/kimi-k2-thinking": { alias: "Kimi K2 Thinking" },
        "moonshot/kimi-k2-thinking-turbo": { alias: "Kimi K2 Thinking Turbo" }
        // moonshot-kimi-k2-aliases:end
      }
    }
  },
  models: {
    mode: "merge",
    providers: {
      moonshot: {
        baseUrl: "https://api.moonshot.ai/v1",
        apiKey: "${MOONSHOT_API_KEY}",
        api: "openai-completions",
        models: [\
          // moonshot-kimi-k2-models:start\
          {\
            id: "kimi-k2.5",\
            name: "Kimi K2.5",\
            reasoning: false,\
            input: ["text"],\
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },\
            contextWindow: 256000,\
            maxTokens: 8192\
          },\
          {\
            id: "kimi-k2-0905-preview",\
            name: "Kimi K2 0905 Preview",\
            reasoning: false,\
            input: ["text"],\
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },\
            contextWindow: 256000,\
            maxTokens: 8192\
          },\
          {\
            id: "kimi-k2-turbo-preview",\
            name: "Kimi K2 Turbo",\
            reasoning: false,\
            input: ["text"],\
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },\
            contextWindow: 256000,\
            maxTokens: 8192\
          },\
          {\
            id: "kimi-k2-thinking",\
            name: "Kimi K2 Thinking",\
            reasoning: true,\
            input: ["text"],\
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },\
            contextWindow: 256000,\
            maxTokens: 8192\
          },\
          {\
            id: "kimi-k2-thinking-turbo",\
            name: "Kimi K2 Thinking Turbo",\
            reasoning: true,\
            input: ["text"],\
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },\
            contextWindow: 256000,\
            maxTokens: 8192\
          }\
          // moonshot-kimi-k2-models:end\
        ]
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/providers/moonshot\#kimi-coding)  Kimi Coding

Copy

```
{
  env: { KIMI_API_KEY: "sk-..." },
  agents: {
    defaults: {
      model: { primary: "kimi-coding/k2p5" },
      models: {
        "kimi-coding/k2p5": { alias: "Kimi K2.5" }
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/providers/moonshot\#notes)  Notes

- Moonshot model refs use `moonshot/<modelId>`. Kimi Coding model refs use `kimi-coding/<modelId>`.
- Override pricing and context metadata in `models.providers` if needed.
- If Moonshot publishes different context limits for a model, adjust
`contextWindow` accordingly.
- Use `https://api.moonshot.cn/v1` if you need the China endpoint.

[Bedrock](https://docs.openclaw.ai/bedrock) [Minimax](https://docs.openclaw.ai/providers/minimax)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.