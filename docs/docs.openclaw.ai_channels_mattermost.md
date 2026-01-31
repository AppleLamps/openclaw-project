---
url: "https://docs.openclaw.ai/channels/mattermost"
title: "Mattermost - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/channels/mattermost#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Mattermost (plugin)](https://docs.openclaw.ai/channels/mattermost#mattermost-plugin)
- [Plugin required](https://docs.openclaw.ai/channels/mattermost#plugin-required)
- [Quick setup](https://docs.openclaw.ai/channels/mattermost#quick-setup)
- [Environment variables (default account)](https://docs.openclaw.ai/channels/mattermost#environment-variables-default-account)
- [Chat modes](https://docs.openclaw.ai/channels/mattermost#chat-modes)
- [Access control (DMs)](https://docs.openclaw.ai/channels/mattermost#access-control-dms)
- [Channels (groups)](https://docs.openclaw.ai/channels/mattermost#channels-groups)
- [Targets for outbound delivery](https://docs.openclaw.ai/channels/mattermost#targets-for-outbound-delivery)
- [Multi-account](https://docs.openclaw.ai/channels/mattermost#multi-account)
- [Troubleshooting](https://docs.openclaw.ai/channels/mattermost#troubleshooting)

# [​](https://docs.openclaw.ai/channels/mattermost\#mattermost-plugin)  Mattermost (plugin)

Status: supported via plugin (bot token + WebSocket events). Channels, groups, and DMs are supported.
Mattermost is a self-hostable team messaging platform; see the official site at
[mattermost.com](https://mattermost.com/) for product details and downloads.

## [​](https://docs.openclaw.ai/channels/mattermost\#plugin-required)  Plugin required

Mattermost ships as a plugin and is not bundled with the core install.Install via CLI (npm registry):

Copy

```
openclaw plugins install @openclaw/mattermost
```

Local checkout (when running from a git repo):

Copy

```
openclaw plugins install ./extensions/mattermost
```

If you choose Mattermost during configure/onboarding and a git checkout is detected,
OpenClaw will offer the local install path automatically.Details: [Plugins](https://docs.openclaw.ai/plugin)

## [​](https://docs.openclaw.ai/channels/mattermost\#quick-setup)  Quick setup

1. Install the Mattermost plugin.
2. Create a Mattermost bot account and copy the **bot token**.
3. Copy the Mattermost **base URL** (e.g., `https://chat.example.com`).
4. Configure OpenClaw and start the gateway.

Minimal config:

Copy

```
{
  channels: {
    mattermost: {
      enabled: true,
      botToken: "mm-token",
      baseUrl: "https://chat.example.com",
      dmPolicy: "pairing"
    }
  }
}
```

## [​](https://docs.openclaw.ai/channels/mattermost\#environment-variables-default-account)  Environment variables (default account)

Set these on the gateway host if you prefer env vars:

- `MATTERMOST_BOT_TOKEN=...`
- `MATTERMOST_URL=https://chat.example.com`

Env vars apply only to the **default** account (`default`). Other accounts must use config values.

## [​](https://docs.openclaw.ai/channels/mattermost\#chat-modes)  Chat modes

Mattermost responds to DMs automatically. Channel behavior is controlled by `chatmode`:

- `oncall` (default): respond only when @mentioned in channels.
- `onmessage`: respond to every channel message.
- `onchar`: respond when a message starts with a trigger prefix.

Config example:

Copy

```
{
  channels: {
    mattermost: {
      chatmode: "onchar",
      oncharPrefixes: [">", "!"]
    }
  }
}
```

Notes:

- `onchar` still responds to explicit @mentions.
- `channels.mattermost.requireMention` is honored for legacy configs but `chatmode` is preferred.

## [​](https://docs.openclaw.ai/channels/mattermost\#access-control-dms)  Access control (DMs)

- Default: `channels.mattermost.dmPolicy = "pairing"` (unknown senders get a pairing code).
- Approve via:
  - `openclaw pairing list mattermost`
  - `openclaw pairing approve mattermost <CODE>`
- Public DMs: `channels.mattermost.dmPolicy="open"` plus `channels.mattermost.allowFrom=["*"]`.

## [​](https://docs.openclaw.ai/channels/mattermost\#channels-groups)  Channels (groups)

- Default: `channels.mattermost.groupPolicy = "allowlist"` (mention-gated).
- Allowlist senders with `channels.mattermost.groupAllowFrom` (user IDs or `@username`).
- Open channels: `channels.mattermost.groupPolicy="open"` (mention-gated).

## [​](https://docs.openclaw.ai/channels/mattermost\#targets-for-outbound-delivery)  Targets for outbound delivery

Use these target formats with `openclaw message send` or cron/webhooks:

- `channel:<id>` for a channel
- `user:<id>` for a DM
- `@username` for a DM (resolved via the Mattermost API)

Bare IDs are treated as channels.

## [​](https://docs.openclaw.ai/channels/mattermost\#multi-account)  Multi-account

Mattermost supports multiple accounts under `channels.mattermost.accounts`:

Copy

```
{
  channels: {
    mattermost: {
      accounts: {
        default: { name: "Primary", botToken: "mm-token", baseUrl: "https://chat.example.com" },
        alerts: { name: "Alerts", botToken: "mm-token-2", baseUrl: "https://alerts.example.com" }
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/channels/mattermost\#troubleshooting)  Troubleshooting

- No replies in channels: ensure the bot is in the channel and mention it (oncall), use a trigger prefix (onchar), or set `chatmode: "onmessage"`.
- Auth errors: check the bot token, base URL, and whether the account is enabled.
- Multi-account issues: env vars only apply to the `default` account.

[Googlechat](https://docs.openclaw.ai/channels/googlechat) [Signal](https://docs.openclaw.ai/channels/signal)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.