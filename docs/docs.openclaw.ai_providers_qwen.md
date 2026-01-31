---
url: "https://docs.openclaw.ai/providers/qwen"
title: "Qwen - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/qwen#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Qwen](https://docs.openclaw.ai/providers/qwen#qwen)
- [Enable the plugin](https://docs.openclaw.ai/providers/qwen#enable-the-plugin)
- [Authenticate](https://docs.openclaw.ai/providers/qwen#authenticate)
- [Model IDs](https://docs.openclaw.ai/providers/qwen#model-ids)
- [Reuse Qwen Code CLI login](https://docs.openclaw.ai/providers/qwen#reuse-qwen-code-cli-login)
- [Notes](https://docs.openclaw.ai/providers/qwen#notes)

# [​](https://docs.openclaw.ai/providers/qwen\#qwen)  Qwen

Qwen provides a free-tier OAuth flow for Qwen Coder and Qwen Vision models
(2,000 requests/day, subject to Qwen rate limits).

## [​](https://docs.openclaw.ai/providers/qwen\#enable-the-plugin)  Enable the plugin

Copy

```
openclaw plugins enable qwen-portal-auth
```

Restart the Gateway after enabling.

## [​](https://docs.openclaw.ai/providers/qwen\#authenticate)  Authenticate

Copy

```
openclaw models auth login --provider qwen-portal --set-default
```

This runs the Qwen device-code OAuth flow and writes a provider entry to your
`models.json` (plus a `qwen` alias for quick switching).

## [​](https://docs.openclaw.ai/providers/qwen\#model-ids)  Model IDs

- `qwen-portal/coder-model`
- `qwen-portal/vision-model`

Switch models with:

Copy

```
openclaw models set qwen-portal/coder-model
```

## [​](https://docs.openclaw.ai/providers/qwen\#reuse-qwen-code-cli-login)  Reuse Qwen Code CLI login

If you already logged in with the Qwen Code CLI, OpenClaw will sync credentials
from `~/.qwen/oauth_creds.json` when it loads the auth store. You still need a
`models.providers.qwen-portal` entry (use the login command above to create one).

## [​](https://docs.openclaw.ai/providers/qwen\#notes)  Notes

- Tokens auto-refresh; re-run the login command if refresh fails or access is revoked.
- Default base URL: `https://portal.qwen.ai/v1` (override with
`models.providers.qwen-portal.baseUrl` if Qwen provides a different endpoint).
- See [Model providers](https://docs.openclaw.ai/concepts/model-providers) for provider-wide rules.

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.