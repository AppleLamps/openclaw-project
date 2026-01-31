---
url: "https://docs.openclaw.ai/concepts/usage-tracking"
title: "Usage tracking - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/concepts/usage-tracking#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Usage tracking](https://docs.openclaw.ai/concepts/usage-tracking#usage-tracking)
- [What it is](https://docs.openclaw.ai/concepts/usage-tracking#what-it-is)
- [Where it shows up](https://docs.openclaw.ai/concepts/usage-tracking#where-it-shows-up)
- [Providers + credentials](https://docs.openclaw.ai/concepts/usage-tracking#providers-%2B-credentials)

# [​](https://docs.openclaw.ai/concepts/usage-tracking\#usage-tracking)  Usage tracking

## [​](https://docs.openclaw.ai/concepts/usage-tracking\#what-it-is)  What it is

- Pulls provider usage/quota directly from their usage endpoints.
- No estimated costs; only the provider-reported windows.

## [​](https://docs.openclaw.ai/concepts/usage-tracking\#where-it-shows-up)  Where it shows up

- `/status` in chats: emoji‑rich status card with session tokens + estimated cost (API key only). Provider usage shows for the **current model provider** when available.
- `/usage off|tokens|full` in chats: per-response usage footer (OAuth shows tokens only).
- `/usage cost` in chats: local cost summary aggregated from OpenClaw session logs.
- CLI: `openclaw status --usage` prints a full per-provider breakdown.
- CLI: `openclaw channels list` prints the same usage snapshot alongside provider config (use `--no-usage` to skip).
- macOS menu bar: “Usage” section under Context (only if available).

## [​](https://docs.openclaw.ai/concepts/usage-tracking\#providers-+-credentials)  Providers + credentials

- **Anthropic (Claude)**: OAuth tokens in auth profiles.
- **GitHub Copilot**: OAuth tokens in auth profiles.
- **Gemini CLI**: OAuth tokens in auth profiles.
- **Antigravity**: OAuth tokens in auth profiles.
- **OpenAI Codex**: OAuth tokens in auth profiles (accountId used when present).
- **MiniMax**: API key (coding plan key; `MINIMAX_CODE_PLAN_KEY` or `MINIMAX_API_KEY`); uses the 5‑hour coding plan window.
- **z.ai**: API key via env/config/auth store.

Usage is hidden if no matching OAuth/API credentials exist.

[Model failover](https://docs.openclaw.ai/concepts/model-failover) [Timezone](https://docs.openclaw.ai/concepts/timezone)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.