---
url: "https://docs.openclaw.ai/gateway/authentication"
title: "Authentication - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/gateway/authentication#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Authentication](https://docs.openclaw.ai/gateway/authentication#authentication)
- [Recommended Anthropic setup (API key)](https://docs.openclaw.ai/gateway/authentication#recommended-anthropic-setup-api-key)
- [Anthropic: setup-token (subscription auth)](https://docs.openclaw.ai/gateway/authentication#anthropic%3A-setup-token-subscription-auth)
- [Checking model auth status](https://docs.openclaw.ai/gateway/authentication#checking-model-auth-status)
- [Controlling which credential is used](https://docs.openclaw.ai/gateway/authentication#controlling-which-credential-is-used)
- [Per-session (chat command)](https://docs.openclaw.ai/gateway/authentication#per-session-chat-command)
- [Per-agent (CLI override)](https://docs.openclaw.ai/gateway/authentication#per-agent-cli-override)
- [Troubleshooting](https://docs.openclaw.ai/gateway/authentication#troubleshooting)
- [“No credentials found”](https://docs.openclaw.ai/gateway/authentication#%E2%80%9Cno-credentials-found%E2%80%9D)
- [Token expiring/expired](https://docs.openclaw.ai/gateway/authentication#token-expiring%2Fexpired)
- [Requirements](https://docs.openclaw.ai/gateway/authentication#requirements)

# [​](https://docs.openclaw.ai/gateway/authentication\#authentication)  Authentication

OpenClaw supports OAuth and API keys for model providers. For Anthropic
accounts, we recommend using an **API key**. For Claude subscription access,
use the long‑lived token created by `claude setup-token`.See [/concepts/oauth](https://docs.openclaw.ai/concepts/oauth) for the full OAuth flow and storage
layout.

## [​](https://docs.openclaw.ai/gateway/authentication\#recommended-anthropic-setup-api-key)  Recommended Anthropic setup (API key)

If you’re using Anthropic directly, use an API key.

1. Create an API key in the Anthropic Console.
2. Put it on the **gateway host** (the machine running `openclaw gateway`).

Copy

```
export ANTHROPIC_API_KEY="..."
openclaw models status
```

3. If the Gateway runs under systemd/launchd, prefer putting the key in
`~/.openclaw/.env` so the daemon can read it:

Copy

```
cat >> ~/.openclaw/.env <<'EOF'
ANTHROPIC_API_KEY=...
EOF
```

Then restart the daemon (or restart your Gateway process) and re-check:

Copy

```
openclaw models status
openclaw doctor
```

If you’d rather not manage env vars yourself, the onboarding wizard can store
API keys for daemon use: `openclaw onboard`.See [Help](https://docs.openclaw.ai/help) for details on env inheritance (`env.shellEnv`,
`~/.openclaw/.env`, systemd/launchd).

## [​](https://docs.openclaw.ai/gateway/authentication\#anthropic:-setup-token-subscription-auth)  Anthropic: setup-token (subscription auth)

For Anthropic, the recommended path is an **API key**. If you’re using a Claude
subscription, the setup-token flow is also supported. Run it on the **gateway host**:

Copy

```
claude setup-token
```

Then paste it into OpenClaw:

Copy

```
openclaw models auth setup-token --provider anthropic
```

If the token was created on another machine, paste it manually:

Copy

```
openclaw models auth paste-token --provider anthropic
```

If you see an Anthropic error like:

Copy

```
This credential is only authorized for use with Claude Code and cannot be used for other API requests.
```

…use an Anthropic API key instead.Manual token entry (any provider; writes `auth-profiles.json` \+ updates config):

Copy

```
openclaw models auth paste-token --provider anthropic
openclaw models auth paste-token --provider openrouter
```

Automation-friendly check (exit `1` when expired/missing, `2` when expiring):

Copy

```
openclaw models status --check
```

Optional ops scripts (systemd/Termux) are documented here:
[/automation/auth-monitoring](https://docs.openclaw.ai/automation/auth-monitoring)

> `claude setup-token` requires an interactive TTY.

## [​](https://docs.openclaw.ai/gateway/authentication\#checking-model-auth-status)  Checking model auth status

Copy

```
openclaw models status
openclaw doctor
```

## [​](https://docs.openclaw.ai/gateway/authentication\#controlling-which-credential-is-used)  Controlling which credential is used

### [​](https://docs.openclaw.ai/gateway/authentication\#per-session-chat-command)  Per-session (chat command)

Use `/model <alias-or-id>@<profileId>` to pin a specific provider credential for the current session (example profile ids: `anthropic:default`, `anthropic:work`).Use `/model` (or `/model list`) for a compact picker; use `/model status` for the full view (candidates + next auth profile, plus provider endpoint details when configured).

### [​](https://docs.openclaw.ai/gateway/authentication\#per-agent-cli-override)  Per-agent (CLI override)

Set an explicit auth profile order override for an agent (stored in that agent’s `auth-profiles.json`):

Copy

```
openclaw models auth order get --provider anthropic
openclaw models auth order set --provider anthropic anthropic:default
openclaw models auth order clear --provider anthropic
```

Use `--agent <id>` to target a specific agent; omit it to use the configured default agent.

## [​](https://docs.openclaw.ai/gateway/authentication\#troubleshooting)  Troubleshooting

### [​](https://docs.openclaw.ai/gateway/authentication\#%E2%80%9Cno-credentials-found%E2%80%9D)  “No credentials found”

If the Anthropic token profile is missing, run `claude setup-token` on the
**gateway host**, then re-check:

Copy

```
openclaw models status
```

### [​](https://docs.openclaw.ai/gateway/authentication\#token-expiring/expired)  Token expiring/expired

Run `openclaw models status` to confirm which profile is expiring. If the profile
is missing, rerun `claude setup-token` and paste the token again.

## [​](https://docs.openclaw.ai/gateway/authentication\#requirements)  Requirements

- Claude Max or Pro subscription (for `claude setup-token`)
- Claude Code CLI installed (`claude` command available)

[Configuration examples](https://docs.openclaw.ai/gateway/configuration-examples) [Openai http api](https://docs.openclaw.ai/gateway/openai-http-api)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.