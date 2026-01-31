---
url: "https://docs.openclaw.ai/concepts/retry"
title: "Retry - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/concepts/retry#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Retry policy](https://docs.openclaw.ai/concepts/retry#retry-policy)
- [Goals](https://docs.openclaw.ai/concepts/retry#goals)
- [Defaults](https://docs.openclaw.ai/concepts/retry#defaults)
- [Behavior](https://docs.openclaw.ai/concepts/retry#behavior)
- [Discord](https://docs.openclaw.ai/concepts/retry#discord)
- [Telegram](https://docs.openclaw.ai/concepts/retry#telegram)
- [Configuration](https://docs.openclaw.ai/concepts/retry#configuration)
- [Notes](https://docs.openclaw.ai/concepts/retry#notes)

# [​](https://docs.openclaw.ai/concepts/retry\#retry-policy)  Retry policy

## [​](https://docs.openclaw.ai/concepts/retry\#goals)  Goals

- Retry per HTTP request, not per multi-step flow.
- Preserve ordering by retrying only the current step.
- Avoid duplicating non-idempotent operations.

## [​](https://docs.openclaw.ai/concepts/retry\#defaults)  Defaults

- Attempts: 3
- Max delay cap: 30000 ms
- Jitter: 0.1 (10 percent)
- Provider defaults:
  - Telegram min delay: 400 ms
  - Discord min delay: 500 ms

## [​](https://docs.openclaw.ai/concepts/retry\#behavior)  Behavior

### [​](https://docs.openclaw.ai/concepts/retry\#discord)  Discord

- Retries only on rate-limit errors (HTTP 429).
- Uses Discord `retry_after` when available, otherwise exponential backoff.

### [​](https://docs.openclaw.ai/concepts/retry\#telegram)  Telegram

- Retries on transient errors (429, timeout, connect/reset/closed, temporarily unavailable).
- Uses `retry_after` when available, otherwise exponential backoff.
- Markdown parse errors are not retried; they fall back to plain text.

## [​](https://docs.openclaw.ai/concepts/retry\#configuration)  Configuration

Set retry policy per provider in `~/.openclaw/openclaw.json`:

Copy

```
{
  channels: {
    telegram: {
      retry: {
        attempts: 3,
        minDelayMs: 400,
        maxDelayMs: 30000,
        jitter: 0.1
      }
    },
    discord: {
      retry: {
        attempts: 3,
        minDelayMs: 500,
        maxDelayMs: 30000,
        jitter: 0.1
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/concepts/retry\#notes)  Notes

- Retries apply per request (message send, media upload, reaction, poll, sticker).
- Composite flows do not retry completed steps.

[Queue](https://docs.openclaw.ai/concepts/queue) [Model providers](https://docs.openclaw.ai/concepts/model-providers)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.