---
url: "https://docs.openclaw.ai/providers/minimax"
title: "Minimax - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/minimax#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [MiniMax](https://docs.openclaw.ai/providers/minimax#minimax)
- [Model overview (M2.1)](https://docs.openclaw.ai/providers/minimax#model-overview-m2-1)
- [MiniMax M2.1 vs MiniMax M2.1 Lightning](https://docs.openclaw.ai/providers/minimax#minimax-m2-1-vs-minimax-m2-1-lightning)
- [Choose a setup](https://docs.openclaw.ai/providers/minimax#choose-a-setup)
- [MiniMax M2.1 — recommended](https://docs.openclaw.ai/providers/minimax#minimax-m2-1-%E2%80%94-recommended)
- [MiniMax M2.1 as fallback (Opus primary)](https://docs.openclaw.ai/providers/minimax#minimax-m2-1-as-fallback-opus-primary)
- [Optional: Local via LM Studio (manual)](https://docs.openclaw.ai/providers/minimax#optional%3A-local-via-lm-studio-manual)
- [Configure via openclaw configure](https://docs.openclaw.ai/providers/minimax#configure-via-openclaw-configure)
- [Configuration options](https://docs.openclaw.ai/providers/minimax#configuration-options)
- [Notes](https://docs.openclaw.ai/providers/minimax#notes)
- [Troubleshooting](https://docs.openclaw.ai/providers/minimax#troubleshooting)
- [“Unknown model: minimax/MiniMax-M2.1”](https://docs.openclaw.ai/providers/minimax#%E2%80%9Cunknown-model%3A-minimax%2Fminimax-m2-1%E2%80%9D)

# [​](https://docs.openclaw.ai/providers/minimax\#minimax)  MiniMax

MiniMax is an AI company that builds the **M2/M2.1** model family. The current
coding-focused release is **MiniMax M2.1** (December 23, 2025), built for
real-world complex tasks.Source: [MiniMax M2.1 release note](https://www.minimax.io/news/minimax-m21)

## [​](https://docs.openclaw.ai/providers/minimax\#model-overview-m2-1)  Model overview (M2.1)

MiniMax highlights these improvements in M2.1:

- Stronger **multi-language coding** (Rust, Java, Go, C++, Kotlin, Objective-C, TS/JS).
- Better **web/app development** and aesthetic output quality (including native mobile).
- Improved **composite instruction** handling for office-style workflows, building on
interleaved thinking and integrated constraint execution.
- **More concise responses** with lower token usage and faster iteration loops.
- Stronger **tool/agent framework** compatibility and context management (Claude Code,
Droid/Factory AI, Cline, Kilo Code, Roo Code, BlackBox).
- Higher-quality **dialogue and technical writing** outputs.

## [​](https://docs.openclaw.ai/providers/minimax\#minimax-m2-1-vs-minimax-m2-1-lightning)  MiniMax M2.1 vs MiniMax M2.1 Lightning

- **Speed:** Lightning is the “fast” variant in MiniMax’s pricing docs.
- **Cost:** Pricing shows the same input cost, but Lightning has higher output cost.
- **Coding plan routing:** The Lightning back-end isn’t directly available on the MiniMax
coding plan. MiniMax auto-routes most requests to Lightning, but falls back to the
regular M2.1 back-end during traffic spikes.

## [​](https://docs.openclaw.ai/providers/minimax\#choose-a-setup)  Choose a setup

### [​](https://docs.openclaw.ai/providers/minimax\#minimax-m2-1-%E2%80%94-recommended)  MiniMax M2.1 — recommended

**Best for:** hosted MiniMax with Anthropic-compatible API.Configure via CLI:

- Run `openclaw configure`
- Select **Model/auth**
- Choose **MiniMax M2.1**

Copy

```
{
  env: { MINIMAX_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "minimax/MiniMax-M2.1" } } },
  models: {
    mode: "merge",
    providers: {
      minimax: {
        baseUrl: "https://api.minimax.io/anthropic",
        apiKey: "${MINIMAX_API_KEY}",
        api: "anthropic-messages",
        models: [\
          {\
            id: "MiniMax-M2.1",\
            name: "MiniMax M2.1",\
            reasoning: false,\
            input: ["text"],\
            cost: { input: 15, output: 60, cacheRead: 2, cacheWrite: 10 },\
            contextWindow: 200000,\
            maxTokens: 8192\
          }\
        ]
      }
    }
  }
}
```

### [​](https://docs.openclaw.ai/providers/minimax\#minimax-m2-1-as-fallback-opus-primary)  MiniMax M2.1 as fallback (Opus primary)

**Best for:** keep Opus 4.5 as primary, fail over to MiniMax M2.1.

Copy

```
{
  env: { MINIMAX_API_KEY: "sk-..." },
  agents: {
    defaults: {
      models: {
        "anthropic/claude-opus-4-5": { alias: "opus" },
        "minimax/MiniMax-M2.1": { alias: "minimax" }
      },
      model: {
        primary: "anthropic/claude-opus-4-5",
        fallbacks: ["minimax/MiniMax-M2.1"]
      }
    }
  }
}
```

### [​](https://docs.openclaw.ai/providers/minimax\#optional:-local-via-lm-studio-manual)  Optional: Local via LM Studio (manual)

**Best for:** local inference with LM Studio.
We have seen strong results with MiniMax M2.1 on powerful hardware (e.g. a
desktop/server) using LM Studio’s local server.Configure manually via `openclaw.json`:

Copy

```
{
  agents: {
    defaults: {
      model: { primary: "lmstudio/minimax-m2.1-gs32" },
      models: { "lmstudio/minimax-m2.1-gs32": { alias: "Minimax" } }
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

## [​](https://docs.openclaw.ai/providers/minimax\#configure-via-openclaw-configure)  Configure via `openclaw configure`

Use the interactive config wizard to set MiniMax without editing JSON:

1. Run `openclaw configure`.
2. Select **Model/auth**.
3. Choose **MiniMax M2.1**.
4. Pick your default model when prompted.

## [​](https://docs.openclaw.ai/providers/minimax\#configuration-options)  Configuration options

- `models.providers.minimax.baseUrl`: prefer `https://api.minimax.io/anthropic` (Anthropic-compatible); `https://api.minimax.io/v1` is optional for OpenAI-compatible payloads.
- `models.providers.minimax.api`: prefer `anthropic-messages`; `openai-completions` is optional for OpenAI-compatible payloads.
- `models.providers.minimax.apiKey`: MiniMax API key (`MINIMAX_API_KEY`).
- `models.providers.minimax.models`: define `id`, `name`, `reasoning`, `contextWindow`, `maxTokens`, `cost`.
- `agents.defaults.models`: alias models you want in the allowlist.
- `models.mode`: keep `merge` if you want to add MiniMax alongside built-ins.

## [​](https://docs.openclaw.ai/providers/minimax\#notes)  Notes

- Model refs are `minimax/<model>`.
- Coding Plan usage API: `https://api.minimaxi.com/v1/api/openplatform/coding_plan/remains` (requires a coding plan key).
- Update pricing values in `models.json` if you need exact cost tracking.
- Referral link for MiniMax Coding Plan (10% off): [https://platform.minimax.io/subscribe/coding-plan?code=DbXJTRClnb&source=link](https://platform.minimax.io/subscribe/coding-plan?code=DbXJTRClnb&source=link)
- See [/concepts/model-providers](https://docs.openclaw.ai/concepts/model-providers) for provider rules.
- Use `openclaw models list` and `openclaw models set minimax/MiniMax-M2.1` to switch.

## [​](https://docs.openclaw.ai/providers/minimax\#troubleshooting)  Troubleshooting

### [​](https://docs.openclaw.ai/providers/minimax\#%E2%80%9Cunknown-model:-minimax/minimax-m2-1%E2%80%9D)  “Unknown model: minimax/MiniMax-M2.1”

This usually means the **MiniMax provider isn’t configured** (no provider entry
and no MiniMax auth profile/env key found). A fix for this detection is in
**2026.1.12** (unreleased at the time of writing). Fix by:

- Upgrading to **2026.1.12** (or run from source `main`), then restarting the gateway.
- Running `openclaw configure` and selecting **MiniMax M2.1**, or
- Adding the `models.providers.minimax` block manually, or
- Setting `MINIMAX_API_KEY` (or a MiniMax auth profile) so the provider can be injected.

Make sure the model id is **case‑sensitive**:

- `minimax/MiniMax-M2.1`
- `minimax/MiniMax-M2.1-lightning`

Then recheck with:

Copy

```
openclaw models list
```

[Moonshot](https://docs.openclaw.ai/providers/moonshot) [Vercel AI Gateway](https://docs.openclaw.ai/providers/vercel-ai-gateway)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.