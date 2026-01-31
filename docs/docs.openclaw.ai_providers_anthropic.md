---
url: "https://docs.openclaw.ai/providers/anthropic"
title: "Anthropic - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/providers/anthropic#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Anthropic (Claude)](https://docs.openclaw.ai/providers/anthropic#anthropic-claude)
- [Option A: Anthropic API key](https://docs.openclaw.ai/providers/anthropic#option-a%3A-anthropic-api-key)
- [CLI setup](https://docs.openclaw.ai/providers/anthropic#cli-setup)
- [Config snippet](https://docs.openclaw.ai/providers/anthropic#config-snippet)
- [Prompt caching (Anthropic API)](https://docs.openclaw.ai/providers/anthropic#prompt-caching-anthropic-api)
- [Option B: Claude setup-token](https://docs.openclaw.ai/providers/anthropic#option-b%3A-claude-setup-token)
- [Where to get a setup-token](https://docs.openclaw.ai/providers/anthropic#where-to-get-a-setup-token)
- [CLI setup](https://docs.openclaw.ai/providers/anthropic#cli-setup-2)
- [Config snippet](https://docs.openclaw.ai/providers/anthropic#config-snippet-2)
- [Notes](https://docs.openclaw.ai/providers/anthropic#notes)
- [Troubleshooting](https://docs.openclaw.ai/providers/anthropic#troubleshooting)

# [​](https://docs.openclaw.ai/providers/anthropic\#anthropic-claude)  Anthropic (Claude)

Anthropic builds the **Claude** model family and provides access via an API.
In OpenClaw you can authenticate with an API key or a **setup-token**.

## [​](https://docs.openclaw.ai/providers/anthropic\#option-a:-anthropic-api-key)  Option A: Anthropic API key

**Best for:** standard API access and usage-based billing.
Create your API key in the Anthropic Console.

### [​](https://docs.openclaw.ai/providers/anthropic\#cli-setup)  CLI setup

Copy

```
openclaw onboard
# choose: Anthropic API key

# or non-interactive
openclaw onboard --anthropic-api-key "$ANTHROPIC_API_KEY"
```

### [​](https://docs.openclaw.ai/providers/anthropic\#config-snippet)  Config snippet

Copy

```
{
  env: { ANTHROPIC_API_KEY: "sk-ant-..." },
  agents: { defaults: { model: { primary: "anthropic/claude-opus-4-5" } } }
}
```

## [​](https://docs.openclaw.ai/providers/anthropic\#prompt-caching-anthropic-api)  Prompt caching (Anthropic API)

OpenClaw does **not** override Anthropic’s default cache TTL unless you set it.
This is **API-only**; subscription auth does not honor TTL settings.To set the TTL per model, use `cacheControlTtl` in the model `params`:

Copy

```
{
  agents: {
    defaults: {
      models: {
        "anthropic/claude-opus-4-5": {
          params: { cacheControlTtl: "5m" } // or "1h"
        }
      }
    }
  }
}
```

OpenClaw includes the `extended-cache-ttl-2025-04-11` beta flag for Anthropic API
requests; keep it if you override provider headers (see [/gateway/configuration](https://docs.openclaw.ai/gateway/configuration)).

## [​](https://docs.openclaw.ai/providers/anthropic\#option-b:-claude-setup-token)  Option B: Claude setup-token

**Best for:** using your Claude subscription.

### [​](https://docs.openclaw.ai/providers/anthropic\#where-to-get-a-setup-token)  Where to get a setup-token

Setup-tokens are created by the **Claude Code CLI**, not the Anthropic Console. You can run this on **any machine**:

Copy

```
claude setup-token
```

Paste the token into OpenClaw (wizard: **Anthropic token (paste setup-token)**), or run it on the gateway host:

Copy

```
openclaw models auth setup-token --provider anthropic
```

If you generated the token on a different machine, paste it:

Copy

```
openclaw models auth paste-token --provider anthropic
```

### [​](https://docs.openclaw.ai/providers/anthropic\#cli-setup-2)  CLI setup

Copy

```
# Paste a setup-token during onboarding
openclaw onboard --auth-choice setup-token
```

### [​](https://docs.openclaw.ai/providers/anthropic\#config-snippet-2)  Config snippet

Copy

```
{
  agents: { defaults: { model: { primary: "anthropic/claude-opus-4-5" } } }
}
```

## [​](https://docs.openclaw.ai/providers/anthropic\#notes)  Notes

- Generate the setup-token with `claude setup-token` and paste it, or run `openclaw models auth setup-token` on the gateway host.
- If you see “OAuth token refresh failed …” on a Claude subscription, re-auth with a setup-token. See [/gateway/troubleshooting#oauth-token-refresh-failed-anthropic-claude-subscription](https://docs.openclaw.ai/gateway/troubleshooting#oauth-token-refresh-failed-anthropic-claude-subscription).
- Auth details + reuse rules are in [/concepts/oauth](https://docs.openclaw.ai/concepts/oauth).

## [​](https://docs.openclaw.ai/providers/anthropic\#troubleshooting)  Troubleshooting

**401 errors / token suddenly invalid**

- Claude subscription auth can expire or be revoked. Re-run `claude setup-token`
and paste it into the **gateway host**.
- If the Claude CLI login lives on a different machine, use
`openclaw models auth paste-token --provider anthropic` on the gateway host.

**No API key found for provider “anthropic”**

- Auth is **per agent**. New agents don’t inherit the main agent’s keys.
- Re-run onboarding for that agent, or paste a setup-token / API key on the
gateway host, then verify with `openclaw models status`.

**No credentials found for profile `anthropic:default`**

- Run `openclaw models status` to see which auth profile is active.
- Re-run onboarding, or paste a setup-token / API key for that profile.

**No available auth profile (all in cooldown/unavailable)**

- Check `openclaw models status --json` for `auth.unusableProfiles`.
- Add another Anthropic profile or wait for cooldown.

More: [/gateway/troubleshooting](https://docs.openclaw.ai/gateway/troubleshooting) and [/help/faq](https://docs.openclaw.ai/help/faq).

[Openai](https://docs.openclaw.ai/providers/openai) [Bedrock](https://docs.openclaw.ai/bedrock)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.