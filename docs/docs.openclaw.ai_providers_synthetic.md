---
url: "https://docs.openclaw.ai/providers/synthetic"
title: "Synthetic - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/synthetic#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Synthetic](https://docs.openclaw.ai/providers/synthetic#synthetic)
- [Quick setup](https://docs.openclaw.ai/providers/synthetic#quick-setup)
- [Config example](https://docs.openclaw.ai/providers/synthetic#config-example)
- [Model catalog](https://docs.openclaw.ai/providers/synthetic#model-catalog)
- [Notes](https://docs.openclaw.ai/providers/synthetic#notes)

# [​](https://docs.openclaw.ai/providers/synthetic\#synthetic)  Synthetic

Synthetic exposes Anthropic-compatible endpoints. OpenClaw registers it as the
`synthetic` provider and uses the Anthropic Messages API.

## [​](https://docs.openclaw.ai/providers/synthetic\#quick-setup)  Quick setup

1. Set `SYNTHETIC_API_KEY` (or run the wizard below).
2. Run onboarding:

Copy

```
openclaw onboard --auth-choice synthetic-api-key
```

The default model is set to:

Copy

```
synthetic/hf:MiniMaxAI/MiniMax-M2.1
```

## [​](https://docs.openclaw.ai/providers/synthetic\#config-example)  Config example

Copy

```
{
  env: { SYNTHETIC_API_KEY: "sk-..." },
  agents: {
    defaults: {
      model: { primary: "synthetic/hf:MiniMaxAI/MiniMax-M2.1" },
      models: { "synthetic/hf:MiniMaxAI/MiniMax-M2.1": { alias: "MiniMax M2.1" } }
    }
  },
  models: {
    mode: "merge",
    providers: {
      synthetic: {
        baseUrl: "https://api.synthetic.new/anthropic",
        apiKey: "${SYNTHETIC_API_KEY}",
        api: "anthropic-messages",
        models: [\
          {\
            id: "hf:MiniMaxAI/MiniMax-M2.1",\
            name: "MiniMax M2.1",\
            reasoning: false,\
            input: ["text"],\
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },\
            contextWindow: 192000,\
            maxTokens: 65536\
          }\
        ]
      }
    }
  }
}
```

Note: OpenClaw’s Anthropic client appends `/v1` to the base URL, so use
`https://api.synthetic.new/anthropic` (not `/anthropic/v1`). If Synthetic changes
its base URL, override `models.providers.synthetic.baseUrl`.

## [​](https://docs.openclaw.ai/providers/synthetic\#model-catalog)  Model catalog

All models below use cost `0` (input/output/cache).

| Model ID | Context window | Max tokens | Reasoning | Input |
| --- | --- | --- | --- | --- |
| `hf:MiniMaxAI/MiniMax-M2.1` | 192000 | 65536 | false | text |
| `hf:moonshotai/Kimi-K2-Thinking` | 256000 | 8192 | true | text |
| `hf:zai-org/GLM-4.7` | 198000 | 128000 | false | text |
| `hf:deepseek-ai/DeepSeek-R1-0528` | 128000 | 8192 | false | text |
| `hf:deepseek-ai/DeepSeek-V3-0324` | 128000 | 8192 | false | text |
| `hf:deepseek-ai/DeepSeek-V3.1` | 128000 | 8192 | false | text |
| `hf:deepseek-ai/DeepSeek-V3.1-Terminus` | 128000 | 8192 | false | text |
| `hf:deepseek-ai/DeepSeek-V3.2` | 159000 | 8192 | false | text |
| `hf:meta-llama/Llama-3.3-70B-Instruct` | 128000 | 8192 | false | text |
| `hf:meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8` | 524000 | 8192 | false | text |
| `hf:moonshotai/Kimi-K2-Instruct-0905` | 256000 | 8192 | false | text |
| `hf:openai/gpt-oss-120b` | 128000 | 8192 | false | text |
| `hf:Qwen/Qwen3-235B-A22B-Instruct-2507` | 256000 | 8192 | false | text |
| `hf:Qwen/Qwen3-Coder-480B-A35B-Instruct` | 256000 | 8192 | false | text |
| `hf:Qwen/Qwen3-VL-235B-A22B-Instruct` | 250000 | 8192 | false | text + image |
| `hf:zai-org/GLM-4.5` | 128000 | 128000 | false | text |
| `hf:zai-org/GLM-4.6` | 198000 | 128000 | false | text |
| `hf:deepseek-ai/DeepSeek-V3` | 128000 | 8192 | false | text |
| `hf:Qwen/Qwen3-235B-A22B-Thinking-2507` | 256000 | 8192 | true | text |

## [​](https://docs.openclaw.ai/providers/synthetic\#notes)  Notes

- Model refs use `synthetic/<modelId>`.
- If you enable a model allowlist (`agents.defaults.models`), add every model you
plan to use.
- See [Model providers](https://docs.openclaw.ai/concepts/model-providers) for provider rules.

[Openrouter](https://docs.openclaw.ai/providers/openrouter) [Opencode](https://docs.openclaw.ai/providers/opencode)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.