---
url: "https://docs.openclaw.ai/brave-search"
title: "Brave search - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/brave-search#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Brave Search API](https://docs.openclaw.ai/brave-search#brave-search-api)
- [Get an API key](https://docs.openclaw.ai/brave-search#get-an-api-key)
- [Config example](https://docs.openclaw.ai/brave-search#config-example)
- [Notes](https://docs.openclaw.ai/brave-search#notes)

# [​](https://docs.openclaw.ai/brave-search\#brave-search-api)  Brave Search API

OpenClaw uses Brave Search as the default provider for `web_search`.

## [​](https://docs.openclaw.ai/brave-search\#get-an-api-key)  Get an API key

1. Create a Brave Search API account at [https://brave.com/search/api/](https://brave.com/search/api/)
2. In the dashboard, choose the **Data for Search** plan and generate an API key.
3. Store the key in config (recommended) or set `BRAVE_API_KEY` in the Gateway environment.

## [​](https://docs.openclaw.ai/brave-search\#config-example)  Config example

Copy

```
{
  tools: {
    web: {
      search: {
        provider: "brave",
        apiKey: "BRAVE_API_KEY_HERE",
        maxResults: 5,
        timeoutSeconds: 30
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/brave-search\#notes)  Notes

- The Data for AI plan is **not** compatible with `web_search`.
- Brave provides a free tier plus paid plans; check the Brave API portal for current limits.

See [Web tools](https://docs.openclaw.ai/tools/web) for the full web\_search configuration.

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.