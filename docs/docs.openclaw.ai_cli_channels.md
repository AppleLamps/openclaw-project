---
url: "https://docs.openclaw.ai/cli/channels"
title: "Channels - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/channels#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw channels](https://docs.openclaw.ai/cli/channels#openclaw-channels)
- [Common commands](https://docs.openclaw.ai/cli/channels#common-commands)
- [Add / remove accounts](https://docs.openclaw.ai/cli/channels#add-%2F-remove-accounts)
- [Login / logout (interactive)](https://docs.openclaw.ai/cli/channels#login-%2F-logout-interactive)
- [Troubleshooting](https://docs.openclaw.ai/cli/channels#troubleshooting)
- [Capabilities probe](https://docs.openclaw.ai/cli/channels#capabilities-probe)
- [Resolve names to IDs](https://docs.openclaw.ai/cli/channels#resolve-names-to-ids)

# [​](https://docs.openclaw.ai/cli/channels\#openclaw-channels)  `openclaw channels`

Manage chat channel accounts and their runtime status on the Gateway.Related docs:

- Channel guides: [Channels](https://docs.openclaw.ai/channels/index)
- Gateway configuration: [Configuration](https://docs.openclaw.ai/gateway/configuration)

## [​](https://docs.openclaw.ai/cli/channels\#common-commands)  Common commands

Copy

```
openclaw channels list
openclaw channels status
openclaw channels capabilities
openclaw channels capabilities --channel discord --target channel:123
openclaw channels resolve --channel slack "#general" "@jane"
openclaw channels logs --channel all
```

## [​](https://docs.openclaw.ai/cli/channels\#add-/-remove-accounts)  Add / remove accounts

Copy

```
openclaw channels add --channel telegram --token <bot-token>
openclaw channels remove --channel telegram --delete
```

Tip: `openclaw channels add --help` shows per-channel flags (token, app token, signal-cli paths, etc).

## [​](https://docs.openclaw.ai/cli/channels\#login-/-logout-interactive)  Login / logout (interactive)

Copy

```
openclaw channels login --channel whatsapp
openclaw channels logout --channel whatsapp
```

## [​](https://docs.openclaw.ai/cli/channels\#troubleshooting)  Troubleshooting

- Run `openclaw status --deep` for a broad probe.
- Use `openclaw doctor` for guided fixes.
- `openclaw channels list` prints `Claude: HTTP 403 ... user:profile` → usage snapshot needs the `user:profile` scope. Use `--no-usage`, or provide a claude.ai session key (`CLAUDE_WEB_SESSION_KEY` / `CLAUDE_WEB_COOKIE`), or re-auth via Claude Code CLI.

## [​](https://docs.openclaw.ai/cli/channels\#capabilities-probe)  Capabilities probe

Fetch provider capability hints (intents/scopes where available) plus static feature support:

Copy

```
openclaw channels capabilities
openclaw channels capabilities --channel discord --target channel:123
```

Notes:

- `--channel` is optional; omit it to list every channel (including extensions).
- `--target` accepts `channel:<id>` or a raw numeric channel id and only applies to Discord.
- Probes are provider-specific: Discord intents + optional channel permissions; Slack bot + user scopes; Telegram bot flags + webhook; Signal daemon version; MS Teams app token + Graph roles/scopes (annotated where known). Channels without probes report `Probe: unavailable`.

## [​](https://docs.openclaw.ai/cli/channels\#resolve-names-to-ids)  Resolve names to IDs

Resolve channel/user names to IDs using the provider directory:

Copy

```
openclaw channels resolve --channel slack "#general" "@jane"
openclaw channels resolve --channel discord "My Server/#support" "@someone"
openclaw channels resolve --channel matrix "Project Room"
```

Notes:

- Use `--kind user|group|auto` to force the target type.
- Resolution prefers active matches when multiple entries share the same name.

[Sessions](https://docs.openclaw.ai/cli/sessions) [Directory](https://docs.openclaw.ai/cli/directory)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.