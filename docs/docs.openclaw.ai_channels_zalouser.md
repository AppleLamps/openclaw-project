---
url: "https://docs.openclaw.ai/channels/zalouser"
title: "Zalouser - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/channels/zalouser#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Zalo Personal (unofficial)](https://docs.openclaw.ai/channels/zalouser#zalo-personal-unofficial)
- [Plugin required](https://docs.openclaw.ai/channels/zalouser#plugin-required)
- [Prerequisite: zca-cli](https://docs.openclaw.ai/channels/zalouser#prerequisite%3A-zca-cli)
- [Quick setup (beginner)](https://docs.openclaw.ai/channels/zalouser#quick-setup-beginner)
- [What it is](https://docs.openclaw.ai/channels/zalouser#what-it-is)
- [Naming](https://docs.openclaw.ai/channels/zalouser#naming)
- [Finding IDs (directory)](https://docs.openclaw.ai/channels/zalouser#finding-ids-directory)
- [Limits](https://docs.openclaw.ai/channels/zalouser#limits)
- [Access control (DMs)](https://docs.openclaw.ai/channels/zalouser#access-control-dms)
- [Group access (optional)](https://docs.openclaw.ai/channels/zalouser#group-access-optional)
- [Multi-account](https://docs.openclaw.ai/channels/zalouser#multi-account)
- [Troubleshooting](https://docs.openclaw.ai/channels/zalouser#troubleshooting)

# [​](https://docs.openclaw.ai/channels/zalouser\#zalo-personal-unofficial)  Zalo Personal (unofficial)

Status: experimental. This integration automates a **personal Zalo account** via `zca-cli`.

> **Warning:** This is an unofficial integration and may result in account suspension/ban. Use at your own risk.

## [​](https://docs.openclaw.ai/channels/zalouser\#plugin-required)  Plugin required

Zalo Personal ships as a plugin and is not bundled with the core install.

- Install via CLI: `openclaw plugins install @openclaw/zalouser`
- Or from a source checkout: `openclaw plugins install ./extensions/zalouser`
- Details: [Plugins](https://docs.openclaw.ai/plugin)

## [​](https://docs.openclaw.ai/channels/zalouser\#prerequisite:-zca-cli)  Prerequisite: zca-cli

The Gateway machine must have the `zca` binary available in `PATH`.

- Verify: `zca --version`
- If missing, install zca-cli (see `extensions/zalouser/README.md` or the upstream zca-cli docs).

## [​](https://docs.openclaw.ai/channels/zalouser\#quick-setup-beginner)  Quick setup (beginner)

1. Install the plugin (see above).
2. Login (QR, on the Gateway machine):
   - `openclaw channels login --channel zalouser`
   - Scan the QR code in the terminal with the Zalo mobile app.
3. Enable the channel:

Copy

```
{
  channels: {
    zalouser: {
      enabled: true,
      dmPolicy: "pairing"
    }
  }
}
```

4. Restart the Gateway (or finish onboarding).
5. DM access defaults to pairing; approve the pairing code on first contact.

## [​](https://docs.openclaw.ai/channels/zalouser\#what-it-is)  What it is

- Uses `zca listen` to receive inbound messages.
- Uses `zca msg ...` to send replies (text/media/link).
- Designed for “personal account” use cases where Zalo Bot API is not available.

## [​](https://docs.openclaw.ai/channels/zalouser\#naming)  Naming

Channel id is `zalouser` to make it explicit this automates a **personal Zalo user account** (unofficial). We keep `zalo` reserved for a potential future official Zalo API integration.

## [​](https://docs.openclaw.ai/channels/zalouser\#finding-ids-directory)  Finding IDs (directory)

Use the directory CLI to discover peers/groups and their IDs:

Copy

```
openclaw directory self --channel zalouser
openclaw directory peers list --channel zalouser --query "name"
openclaw directory groups list --channel zalouser --query "work"
```

## [​](https://docs.openclaw.ai/channels/zalouser\#limits)  Limits

- Outbound text is chunked to ~2000 characters (Zalo client limits).
- Streaming is blocked by default.

## [​](https://docs.openclaw.ai/channels/zalouser\#access-control-dms)  Access control (DMs)

`channels.zalouser.dmPolicy` supports: `pairing | allowlist | open | disabled` (default: `pairing`).
`channels.zalouser.allowFrom` accepts user IDs or names. The wizard resolves names to IDs via `zca friend find` when available.Approve via:

- `openclaw pairing list zalouser`
- `openclaw pairing approve zalouser <code>`

## [​](https://docs.openclaw.ai/channels/zalouser\#group-access-optional)  Group access (optional)

- Default: `channels.zalouser.groupPolicy = "open"` (groups allowed). Use `channels.defaults.groupPolicy` to override the default when unset.
- Restrict to an allowlist with:
  - `channels.zalouser.groupPolicy = "allowlist"`
  - `channels.zalouser.groups` (keys are group IDs or names)
- Block all groups: `channels.zalouser.groupPolicy = "disabled"`.
- The configure wizard can prompt for group allowlists.
- On startup, OpenClaw resolves group/user names in allowlists to IDs and logs the mapping; unresolved entries are kept as typed.

Example:

Copy

```
{
  channels: {
    zalouser: {
      groupPolicy: "allowlist",
      groups: {
        "123456789": { allow: true },
        "Work Chat": { allow: true }
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/channels/zalouser\#multi-account)  Multi-account

Accounts map to zca profiles. Example:

Copy

```
{
  channels: {
    zalouser: {
      enabled: true,
      defaultAccount: "default",
      accounts: {
        work: { enabled: true, profile: "work" }
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/channels/zalouser\#troubleshooting)  Troubleshooting

**`zca` not found:**

- Install zca-cli and ensure it’s on `PATH` for the Gateway process.

**Login doesn’t stick:**

- `openclaw channels status --probe`
- Re-login: `openclaw channels logout --channel zalouser && openclaw channels login --channel zalouser`

[Zalo](https://docs.openclaw.ai/channels/zalo) [Broadcast groups](https://docs.openclaw.ai/broadcast-groups)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.