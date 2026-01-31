---
url: "https://docs.openclaw.ai/environment"
title: "Environment - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/environment#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Environment variables](https://docs.openclaw.ai/environment#environment-variables)
- [Precedence (highest → lowest)](https://docs.openclaw.ai/environment#precedence-highest-%E2%86%92-lowest)
- [Config env block](https://docs.openclaw.ai/environment#config-env-block)
- [Shell env import](https://docs.openclaw.ai/environment#shell-env-import)
- [Env var substitution in config](https://docs.openclaw.ai/environment#env-var-substitution-in-config)
- [Related](https://docs.openclaw.ai/environment#related)

# [​](https://docs.openclaw.ai/environment\#environment-variables)  Environment variables

OpenClaw pulls environment variables from multiple sources. The rule is **never override existing values**.

## [​](https://docs.openclaw.ai/environment\#precedence-highest-%E2%86%92-lowest)  Precedence (highest → lowest)

1. **Process environment** (what the Gateway process already has from the parent shell/daemon).
2. **`.env` in the current working directory** (dotenv default; does not override).
3. **Global `.env`** at `~/.openclaw/.env` (aka `$OPENCLAW_STATE_DIR/.env`; does not override).
4. **Config `env` block** in `~/.openclaw/openclaw.json` (applied only if missing).
5. **Optional login-shell import** (`env.shellEnv.enabled` or `OPENCLAW_LOAD_SHELL_ENV=1`), applied only for missing expected keys.

If the config file is missing entirely, step 4 is skipped; shell import still runs if enabled.

## [​](https://docs.openclaw.ai/environment\#config-env-block)  Config `env` block

Two equivalent ways to set inline env vars (both are non-overriding):

Copy

```
{
  env: {
    OPENROUTER_API_KEY: "sk-or-...",
    vars: {
      GROQ_API_KEY: "gsk-..."
    }
  }
}
```

## [​](https://docs.openclaw.ai/environment\#shell-env-import)  Shell env import

`env.shellEnv` runs your login shell and imports only **missing** expected keys:

Copy

```
{
  env: {
    shellEnv: {
      enabled: true,
      timeoutMs: 15000
    }
  }
}
```

Env var equivalents:

- `OPENCLAW_LOAD_SHELL_ENV=1`
- `OPENCLAW_SHELL_ENV_TIMEOUT_MS=15000`

## [​](https://docs.openclaw.ai/environment\#env-var-substitution-in-config)  Env var substitution in config

You can reference env vars directly in config string values using `${VAR_NAME}` syntax:

Copy

```
{
  models: {
    providers: {
      "vercel-gateway": {
        apiKey: "${VERCEL_GATEWAY_API_KEY}"
      }
    }
  }
}
```

See [Configuration: Env var substitution](https://docs.openclaw.ai/gateway/configuration#env-var-substitution-in-config) for full details.

## [​](https://docs.openclaw.ai/environment\#related)  Related

- [Gateway configuration](https://docs.openclaw.ai/gateway/configuration)
- [FAQ: env vars and .env loading](https://docs.openclaw.ai/help/faq#env-vars-and-env-loading)
- [Models overview](https://docs.openclaw.ai/concepts/models)

[Gateway lock](https://docs.openclaw.ai/gateway/gateway-lock) [Configuration](https://docs.openclaw.ai/gateway/configuration)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.