---
url: "https://docs.openclaw.ai/help/troubleshooting#/model-says-model-not-allowed"
title: "Troubleshooting - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/help/troubleshooting#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Troubleshooting](https://docs.openclaw.ai/help/troubleshooting#troubleshooting)
- [First 60 seconds](https://docs.openclaw.ai/help/troubleshooting#first-60-seconds)
- [Common “it broke” cases](https://docs.openclaw.ai/help/troubleshooting#common-%E2%80%9Cit-broke%E2%80%9D-cases)
- [openclaw: command not found](https://docs.openclaw.ai/help/troubleshooting#openclaw%3A-command-not-found)
- [Installer fails (or you need full logs)](https://docs.openclaw.ai/help/troubleshooting#installer-fails-or-you-need-full-logs)
- [Gateway “unauthorized”, can’t connect, or keeps reconnecting](https://docs.openclaw.ai/help/troubleshooting#gateway-%E2%80%9Cunauthorized%E2%80%9D%2C-can%E2%80%99t-connect%2C-or-keeps-reconnecting)
- [Control UI fails on HTTP (device identity required)](https://docs.openclaw.ai/help/troubleshooting#control-ui-fails-on-http-device-identity-required)
- [docs.openclaw.ai shows an SSL error (Comcast/Xfinity)](https://docs.openclaw.ai/help/troubleshooting#docs-openclaw-ai-shows-an-ssl-error-comcast%2Fxfinity)
- [Service says running, but RPC probe fails](https://docs.openclaw.ai/help/troubleshooting#service-says-running%2C-but-rpc-probe-fails)
- [Model/auth failures (rate limit, billing, “all models failed”)](https://docs.openclaw.ai/help/troubleshooting#model%2Fauth-failures-rate-limit%2C-billing%2C-%E2%80%9Call-models-failed%E2%80%9D)
- [/model says model not allowed](https://docs.openclaw.ai/help/troubleshooting#%2Fmodel-says-model-not-allowed)
- [When filing an issue](https://docs.openclaw.ai/help/troubleshooting#when-filing-an-issue)

# [​](https://docs.openclaw.ai/help/troubleshooting\#troubleshooting)  Troubleshooting

## [​](https://docs.openclaw.ai/help/troubleshooting\#first-60-seconds)  First 60 seconds

Run these in order:

Copy

```
openclaw status
openclaw status --all
openclaw gateway probe
openclaw logs --follow
openclaw doctor
```

If the gateway is reachable, deep probes:

Copy

```
openclaw status --deep
```

## [​](https://docs.openclaw.ai/help/troubleshooting\#common-%E2%80%9Cit-broke%E2%80%9D-cases)  Common “it broke” cases

### [​](https://docs.openclaw.ai/help/troubleshooting\#openclaw:-command-not-found)  `openclaw: command not found`

Almost always a Node/npm PATH issue. Start here:

- [Install (Node/npm PATH sanity)](https://docs.openclaw.ai/install#nodejs--npm-path-sanity)

### [​](https://docs.openclaw.ai/help/troubleshooting\#installer-fails-or-you-need-full-logs)  Installer fails (or you need full logs)

Re-run the installer in verbose mode to see the full trace and npm output:

Copy

```
curl -fsSL https://openclaw.bot/install.sh | bash -s -- --verbose
```

For beta installs:

Copy

```
curl -fsSL https://openclaw.bot/install.sh | bash -s -- --beta --verbose
```

You can also set `OPENCLAW_VERBOSE=1` instead of the flag.

### [​](https://docs.openclaw.ai/help/troubleshooting\#gateway-%E2%80%9Cunauthorized%E2%80%9D,-can%E2%80%99t-connect,-or-keeps-reconnecting)  Gateway “unauthorized”, can’t connect, or keeps reconnecting

- [Gateway troubleshooting](https://docs.openclaw.ai/gateway/troubleshooting)
- [Gateway authentication](https://docs.openclaw.ai/gateway/authentication)

### [​](https://docs.openclaw.ai/help/troubleshooting\#control-ui-fails-on-http-device-identity-required)  Control UI fails on HTTP (device identity required)

- [Gateway troubleshooting](https://docs.openclaw.ai/gateway/troubleshooting)
- [Control UI](https://docs.openclaw.ai/web/control-ui#insecure-http)

### [​](https://docs.openclaw.ai/help/troubleshooting\#docs-openclaw-ai-shows-an-ssl-error-comcast/xfinity)  `docs.openclaw.ai` shows an SSL error (Comcast/Xfinity)

Some Comcast/Xfinity connections block `docs.openclaw.ai` via Xfinity Advanced Security.
Disable Advanced Security or add `docs.openclaw.ai` to the allowlist, then retry.

- Xfinity Advanced Security help: [https://www.xfinity.com/support/articles/using-xfinity-xfi-advanced-security](https://www.xfinity.com/support/articles/using-xfinity-xfi-advanced-security)
- Quick sanity checks: try a mobile hotspot or VPN to confirm it’s ISP-level filtering

### [​](https://docs.openclaw.ai/help/troubleshooting\#service-says-running,-but-rpc-probe-fails)  Service says running, but RPC probe fails

- [Gateway troubleshooting](https://docs.openclaw.ai/gateway/troubleshooting)
- [Background process / service](https://docs.openclaw.ai/gateway/background-process)

### [​](https://docs.openclaw.ai/help/troubleshooting\#model/auth-failures-rate-limit,-billing,-%E2%80%9Call-models-failed%E2%80%9D)  Model/auth failures (rate limit, billing, “all models failed”)

- [Models](https://docs.openclaw.ai/cli/models)
- [OAuth / auth concepts](https://docs.openclaw.ai/concepts/oauth)

### [​](https://docs.openclaw.ai/help/troubleshooting\#/model-says-model-not-allowed)  `/model` says `model not allowed`

This usually means `agents.defaults.models` is configured as an allowlist. When it’s non-empty,
only those provider/model keys can be selected.

- Check the allowlist: `openclaw config get agents.defaults.models`
- Add the model you want (or clear the allowlist) and retry `/model`
- Use `/models` to browse the allowed providers/models

### [​](https://docs.openclaw.ai/help/troubleshooting\#when-filing-an-issue)  When filing an issue

Paste a safe report:

Copy

```
openclaw status --all
```

If you can, include the relevant log tail from `openclaw logs --follow`.

[Help](https://docs.openclaw.ai/help) [Faq](https://docs.openclaw.ai/help/faq)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.