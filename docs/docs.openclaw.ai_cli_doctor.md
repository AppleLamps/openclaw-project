---
url: "https://docs.openclaw.ai/cli/doctor"
title: "Doctor - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/doctor#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw doctor](https://docs.openclaw.ai/cli/doctor#openclaw-doctor)
- [Examples](https://docs.openclaw.ai/cli/doctor#examples)
- [macOS: launchctl env overrides](https://docs.openclaw.ai/cli/doctor#macos%3A-launchctl-env-overrides)

# [​](https://docs.openclaw.ai/cli/doctor\#openclaw-doctor)  `openclaw doctor`

Health checks + quick fixes for the gateway and channels.Related:

- Troubleshooting: [Troubleshooting](https://docs.openclaw.ai/gateway/troubleshooting)
- Security audit: [Security](https://docs.openclaw.ai/gateway/security)

## [​](https://docs.openclaw.ai/cli/doctor\#examples)  Examples

Copy

```
openclaw doctor
openclaw doctor --repair
openclaw doctor --deep
```

Notes:

- Interactive prompts (like keychain/OAuth fixes) only run when stdin is a TTY and `--non-interactive` is **not** set. Headless runs (cron, Telegram, no terminal) will skip prompts.
- `--fix` (alias for `--repair`) writes a backup to `~/.openclaw/openclaw.json.bak` and drops unknown config keys, listing each removal.

## [​](https://docs.openclaw.ai/cli/doctor\#macos:-launchctl-env-overrides)  macOS: `launchctl` env overrides

If you previously ran `launchctl setenv OPENCLAW_GATEWAY_TOKEN ...` (or `...PASSWORD`), that value overrides your config file and can cause persistent “unauthorized” errors.

Copy

```
launchctl getenv OPENCLAW_GATEWAY_TOKEN
launchctl getenv OPENCLAW_GATEWAY_PASSWORD

launchctl unsetenv OPENCLAW_GATEWAY_TOKEN
launchctl unsetenv OPENCLAW_GATEWAY_PASSWORD
```

[Configure](https://docs.openclaw.ai/cli/configure) [Dashboard](https://docs.openclaw.ai/cli/dashboard)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.