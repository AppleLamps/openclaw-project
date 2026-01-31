---
url: "https://docs.openclaw.ai/perplexity"
title: "Perplexity - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/perplexity#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Perplexity Sonar](https://docs.openclaw.ai/perplexity#perplexity-sonar)
- [API options](https://docs.openclaw.ai/perplexity#api-options)
- [Perplexity (direct)](https://docs.openclaw.ai/perplexity#perplexity-direct)
- [OpenRouter (alternative)](https://docs.openclaw.ai/perplexity#openrouter-alternative)
- [Config example](https://docs.openclaw.ai/perplexity#config-example)
- [Switching from Brave](https://docs.openclaw.ai/perplexity#switching-from-brave)
- [Models](https://docs.openclaw.ai/perplexity#models)

# [​](https://docs.openclaw.ai/perplexity\#perplexity-sonar)  Perplexity Sonar

OpenClaw can use Perplexity Sonar for the `web_search` tool. You can connect
through Perplexity’s direct API or via OpenRouter.

## [​](https://docs.openclaw.ai/perplexity\#api-options)  API options

### [​](https://docs.openclaw.ai/perplexity\#perplexity-direct)  Perplexity (direct)

- Base URL: [https://api.perplexity.ai](https://api.perplexity.ai/)
- Environment variable: `PERPLEXITY_API_KEY`

### [​](https://docs.openclaw.ai/perplexity\#openrouter-alternative)  OpenRouter (alternative)

- Base URL: [https://openrouter.ai/api/v1](https://openrouter.ai/api/v1)
- Environment variable: `OPENROUTER_API_KEY`
- Supports prepaid/crypto credits.

## [​](https://docs.openclaw.ai/perplexity\#config-example)  Config example

Copy

```
{
  tools: {
    web: {
      search: {
        provider: "perplexity",
        perplexity: {
          apiKey: "pplx-...",
          baseUrl: "https://api.perplexity.ai",
          model: "perplexity/sonar-pro"
        }
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/perplexity\#switching-from-brave)  Switching from Brave

Copy

```
{
  tools: {
    web: {
      search: {
        provider: "perplexity",
        perplexity: {
          apiKey: "pplx-...",
          baseUrl: "https://api.perplexity.ai"
        }
      }
    }
  }
}
```

If both `PERPLEXITY_API_KEY` and `OPENROUTER_API_KEY` are set, set
`tools.web.search.perplexity.baseUrl` (or `tools.web.search.perplexity.apiKey`)
to disambiguate.If no base URL is set, OpenClaw chooses a default based on the API key source:

- `PERPLEXITY_API_KEY` or `pplx-...` → direct Perplexity (`https://api.perplexity.ai`)
- `OPENROUTER_API_KEY` or `sk-or-...` → OpenRouter (`https://openrouter.ai/api/v1`)
- Unknown key formats → OpenRouter (safe fallback)

## [​](https://docs.openclaw.ai/perplexity\#models)  Models

- `perplexity/sonar` — fast Q&A with web search
- `perplexity/sonar-pro` (default) — multi-step reasoning + web search
- `perplexity/sonar-reasoning-pro` — deep research

See [Web tools](https://docs.openclaw.ai/tools/web) for the full web\_search configuration.

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.