---
url: "https://docs.openclaw.ai/providers/openai"
title: "Openai - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/openai#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [OpenAI](https://docs.openclaw.ai/providers/openai#openai)
- [Option A: OpenAI API key (OpenAI Platform)](https://docs.openclaw.ai/providers/openai#option-a%3A-openai-api-key-openai-platform)
- [CLI setup](https://docs.openclaw.ai/providers/openai#cli-setup)
- [Config snippet](https://docs.openclaw.ai/providers/openai#config-snippet)
- [Option B: OpenAI Code (Codex) subscription](https://docs.openclaw.ai/providers/openai#option-b%3A-openai-code-codex-subscription)
- [CLI setup](https://docs.openclaw.ai/providers/openai#cli-setup-2)
- [Config snippet](https://docs.openclaw.ai/providers/openai#config-snippet-2)
- [Notes](https://docs.openclaw.ai/providers/openai#notes)

# [​](https://docs.openclaw.ai/providers/openai\#openai)  OpenAI

OpenAI provides developer APIs for GPT models. Codex supports **ChatGPT sign-in** for subscription
access or **API key** sign-in for usage-based access. Codex cloud requires ChatGPT sign-in.

## [​](https://docs.openclaw.ai/providers/openai\#option-a:-openai-api-key-openai-platform)  Option A: OpenAI API key (OpenAI Platform)

**Best for:** direct API access and usage-based billing.
Get your API key from the OpenAI dashboard.

### [​](https://docs.openclaw.ai/providers/openai\#cli-setup)  CLI setup

Copy

```
openclaw onboard --auth-choice openai-api-key
# or non-interactive
openclaw onboard --openai-api-key "$OPENAI_API_KEY"
```

### [​](https://docs.openclaw.ai/providers/openai\#config-snippet)  Config snippet

Copy

```
{
  env: { OPENAI_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "openai/gpt-5.2" } } }
}
```

## [​](https://docs.openclaw.ai/providers/openai\#option-b:-openai-code-codex-subscription)  Option B: OpenAI Code (Codex) subscription

**Best for:** using ChatGPT/Codex subscription access instead of an API key.
Codex cloud requires ChatGPT sign-in, while the Codex CLI supports ChatGPT or API key sign-in.

### [​](https://docs.openclaw.ai/providers/openai\#cli-setup-2)  CLI setup

Copy

```
# Run Codex OAuth in the wizard
openclaw onboard --auth-choice openai-codex

# Or run OAuth directly
openclaw models auth login --provider openai-codex
```

### [​](https://docs.openclaw.ai/providers/openai\#config-snippet-2)  Config snippet

Copy

```
{
  agents: { defaults: { model: { primary: "openai-codex/gpt-5.2" } } }
}
```

## [​](https://docs.openclaw.ai/providers/openai\#notes)  Notes

- Model refs always use `provider/model` (see [/concepts/models](https://docs.openclaw.ai/concepts/models)).
- Auth details + reuse rules are in [/concepts/oauth](https://docs.openclaw.ai/concepts/oauth).

[Models](https://docs.openclaw.ai/providers/models) [Anthropic](https://docs.openclaw.ai/providers/anthropic)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.