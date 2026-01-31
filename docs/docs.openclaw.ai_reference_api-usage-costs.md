---
url: "https://docs.openclaw.ai/reference/api-usage-costs"
title: "Api usage costs - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/reference/api-usage-costs#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [API usage & costs](https://docs.openclaw.ai/reference/api-usage-costs#api-usage-%26-costs)
- [Where costs show up (chat + CLI)](https://docs.openclaw.ai/reference/api-usage-costs#where-costs-show-up-chat-%2B-cli)
- [How keys are discovered](https://docs.openclaw.ai/reference/api-usage-costs#how-keys-are-discovered)
- [Features that can spend keys](https://docs.openclaw.ai/reference/api-usage-costs#features-that-can-spend-keys)
- [1) Core model responses (chat + tools)](https://docs.openclaw.ai/reference/api-usage-costs#1-core-model-responses-chat-%2B-tools)
- [2) Media understanding (audio/image/video)](https://docs.openclaw.ai/reference/api-usage-costs#2-media-understanding-audio%2Fimage%2Fvideo)
- [3) Memory embeddings + semantic search](https://docs.openclaw.ai/reference/api-usage-costs#3-memory-embeddings-%2B-semantic-search)
- [4) Web search tool (Brave / Perplexity via OpenRouter)](https://docs.openclaw.ai/reference/api-usage-costs#4-web-search-tool-brave-%2F-perplexity-via-openrouter)
- [5) Web fetch tool (Firecrawl)](https://docs.openclaw.ai/reference/api-usage-costs#5-web-fetch-tool-firecrawl)
- [6) Provider usage snapshots (status/health)](https://docs.openclaw.ai/reference/api-usage-costs#6-provider-usage-snapshots-status%2Fhealth)
- [7) Compaction safeguard summarization](https://docs.openclaw.ai/reference/api-usage-costs#7-compaction-safeguard-summarization)
- [8) Model scan / probe](https://docs.openclaw.ai/reference/api-usage-costs#8-model-scan-%2F-probe)
- [9) Talk (speech)](https://docs.openclaw.ai/reference/api-usage-costs#9-talk-speech)
- [10) Skills (third-party APIs)](https://docs.openclaw.ai/reference/api-usage-costs#10-skills-third-party-apis)

# [​](https://docs.openclaw.ai/reference/api-usage-costs\#api-usage-&-costs)  API usage & costs

This doc lists **features that can invoke API keys** and where their costs show up. It focuses on
OpenClaw features that can generate provider usage or paid API calls.

## [​](https://docs.openclaw.ai/reference/api-usage-costs\#where-costs-show-up-chat-+-cli)  Where costs show up (chat + CLI)

**Per-session cost snapshot**

- `/status` shows the current session model, context usage, and last response tokens.
- If the model uses **API-key auth**, `/status` also shows **estimated cost** for the last reply.

**Per-message cost footer**

- `/usage full` appends a usage footer to every reply, including **estimated cost** (API-key only).
- `/usage tokens` shows tokens only; OAuth flows hide dollar cost.

**CLI usage windows (provider quotas)**

- `openclaw status --usage` and `openclaw channels list` show provider **usage windows**
(quota snapshots, not per-message costs).

See [Token use & costs](https://docs.openclaw.ai/token-use) for details and examples.

## [​](https://docs.openclaw.ai/reference/api-usage-costs\#how-keys-are-discovered)  How keys are discovered

OpenClaw can pick up credentials from:

- **Auth profiles** (per-agent, stored in `auth-profiles.json`).
- **Environment variables** (e.g. `OPENAI_API_KEY`, `BRAVE_API_KEY`, `FIRECRAWL_API_KEY`).
- **Config** (`models.providers.*.apiKey`, `tools.web.search.*`, `tools.web.fetch.firecrawl.*`,
`memorySearch.*`, `talk.apiKey`).
- **Skills** (`skills.entries.<name>.apiKey`) which may export keys to the skill process env.

## [​](https://docs.openclaw.ai/reference/api-usage-costs\#features-that-can-spend-keys)  Features that can spend keys

### [​](https://docs.openclaw.ai/reference/api-usage-costs\#1-core-model-responses-chat-+-tools)  1) Core model responses (chat + tools)

Every reply or tool call uses the **current model provider** (OpenAI, Anthropic, etc). This is the
primary source of usage and cost.See [Models](https://docs.openclaw.ai/providers/models) for pricing config and [Token use & costs](https://docs.openclaw.ai/token-use) for display.

### [​](https://docs.openclaw.ai/reference/api-usage-costs\#2-media-understanding-audio/image/video)  2) Media understanding (audio/image/video)

Inbound media can be summarized/transcribed before the reply runs. This uses model/provider APIs.

- Audio: OpenAI / Groq / Deepgram (now **auto-enabled** when keys exist).
- Image: OpenAI / Anthropic / Google.
- Video: Google.

See [Media understanding](https://docs.openclaw.ai/nodes/media-understanding).

### [​](https://docs.openclaw.ai/reference/api-usage-costs\#3-memory-embeddings-+-semantic-search)  3) Memory embeddings + semantic search

Semantic memory search uses **embedding APIs** when configured for remote providers:

- `memorySearch.provider = "openai"` → OpenAI embeddings
- `memorySearch.provider = "gemini"` → Gemini embeddings
- Optional fallback to OpenAI if local embeddings fail

You can keep it local with `memorySearch.provider = "local"` (no API usage).See [Memory](https://docs.openclaw.ai/concepts/memory).

### [​](https://docs.openclaw.ai/reference/api-usage-costs\#4-web-search-tool-brave-/-perplexity-via-openrouter)  4) Web search tool (Brave / Perplexity via OpenRouter)

`web_search` uses API keys and may incur usage charges:

- **Brave Search API**: `BRAVE_API_KEY` or `tools.web.search.apiKey`
- **Perplexity** (via OpenRouter): `PERPLEXITY_API_KEY` or `OPENROUTER_API_KEY`

**Brave free tier (generous):**

- **2,000 requests/month**
- **1 request/second**
- **Credit card required** for verification (no charge unless you upgrade)

See [Web tools](https://docs.openclaw.ai/tools/web).

### [​](https://docs.openclaw.ai/reference/api-usage-costs\#5-web-fetch-tool-firecrawl)  5) Web fetch tool (Firecrawl)

`web_fetch` can call **Firecrawl** when an API key is present:

- `FIRECRAWL_API_KEY` or `tools.web.fetch.firecrawl.apiKey`

If Firecrawl isn’t configured, the tool falls back to direct fetch + readability (no paid API).See [Web tools](https://docs.openclaw.ai/tools/web).

### [​](https://docs.openclaw.ai/reference/api-usage-costs\#6-provider-usage-snapshots-status/health)  6) Provider usage snapshots (status/health)

Some status commands call **provider usage endpoints** to display quota windows or auth health.
These are typically low-volume calls but still hit provider APIs:

- `openclaw status --usage`
- `openclaw models status --json`

See [Models CLI](https://docs.openclaw.ai/cli/models).

### [​](https://docs.openclaw.ai/reference/api-usage-costs\#7-compaction-safeguard-summarization)  7) Compaction safeguard summarization

The compaction safeguard can summarize session history using the **current model**, which
invokes provider APIs when it runs.See [Session management + compaction](https://docs.openclaw.ai/reference/session-management-compaction).

### [​](https://docs.openclaw.ai/reference/api-usage-costs\#8-model-scan-/-probe)  8) Model scan / probe

`openclaw models scan` can probe OpenRouter models and uses `OPENROUTER_API_KEY` when
probing is enabled.See [Models CLI](https://docs.openclaw.ai/cli/models).

### [​](https://docs.openclaw.ai/reference/api-usage-costs\#9-talk-speech)  9) Talk (speech)

Talk mode can invoke **ElevenLabs** when configured:

- `ELEVENLABS_API_KEY` or `talk.apiKey`

See [Talk mode](https://docs.openclaw.ai/nodes/talk).

### [​](https://docs.openclaw.ai/reference/api-usage-costs\#10-skills-third-party-apis)  10) Skills (third-party APIs)

Skills can store `apiKey` in `skills.entries.<name>.apiKey`. If a skill uses that key for external
APIs, it can incur costs according to the skill’s provider.See [Skills](https://docs.openclaw.ai/tools/skills).

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.