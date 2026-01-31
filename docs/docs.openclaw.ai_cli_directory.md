---
url: "https://docs.openclaw.ai/cli/directory"
title: "Directory - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/directory#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw directory](https://docs.openclaw.ai/cli/directory#openclaw-directory)
- [Common flags](https://docs.openclaw.ai/cli/directory#common-flags)
- [Notes](https://docs.openclaw.ai/cli/directory#notes)
- [Using results with message send](https://docs.openclaw.ai/cli/directory#using-results-with-message-send)
- [ID formats (by channel)](https://docs.openclaw.ai/cli/directory#id-formats-by-channel)
- [Self (“me”)](https://docs.openclaw.ai/cli/directory#self-%E2%80%9Cme%E2%80%9D)
- [Peers (contacts/users)](https://docs.openclaw.ai/cli/directory#peers-contacts%2Fusers)
- [Groups](https://docs.openclaw.ai/cli/directory#groups)

# [​](https://docs.openclaw.ai/cli/directory\#openclaw-directory)  `openclaw directory`

Directory lookups for channels that support it (contacts/peers, groups, and “me”).

## [​](https://docs.openclaw.ai/cli/directory\#common-flags)  Common flags

- `--channel <name>`: channel id/alias (required when multiple channels are configured; auto when only one is configured)
- `--account <id>`: account id (default: channel default)
- `--json`: output JSON

## [​](https://docs.openclaw.ai/cli/directory\#notes)  Notes

- `directory` is meant to help you find IDs you can paste into other commands (especially `openclaw message send --target ...`).
- For many channels, results are config-backed (allowlists / configured groups) rather than a live provider directory.
- Default output is `id` (and sometimes `name`) separated by a tab; use `--json` for scripting.

## [​](https://docs.openclaw.ai/cli/directory\#using-results-with-message-send)  Using results with `message send`

Copy

```
openclaw directory peers list --channel slack --query "U0"
openclaw message send --channel slack --target user:U012ABCDEF --message "hello"
```

## [​](https://docs.openclaw.ai/cli/directory\#id-formats-by-channel)  ID formats (by channel)

- WhatsApp: `+15551234567` (DM), `1234567890-1234567890@g.us` (group)
- Telegram: `@username` or numeric chat id; groups are numeric ids
- Slack: `user:U…` and `channel:C…`
- Discord: `user:<id>` and `channel:<id>`
- Matrix (plugin): `user:@user:server`, `room:!roomId:server`, or `#alias:server`
- Microsoft Teams (plugin): `user:<id>` and `conversation:<id>`
- Zalo (plugin): user id (Bot API)
- Zalo Personal / `zalouser` (plugin): thread id (DM/group) from `zca` (`me`, `friend list`, `group list`)

## [​](https://docs.openclaw.ai/cli/directory\#self-%E2%80%9Cme%E2%80%9D)  Self (“me”)

Copy

```
openclaw directory self --channel zalouser
```

## [​](https://docs.openclaw.ai/cli/directory\#peers-contacts/users)  Peers (contacts/users)

Copy

```
openclaw directory peers list --channel zalouser
openclaw directory peers list --channel zalouser --query "name"
openclaw directory peers list --channel zalouser --limit 50
```

## [​](https://docs.openclaw.ai/cli/directory\#groups)  Groups

Copy

```
openclaw directory groups list --channel zalouser
openclaw directory groups list --channel zalouser --query "work"
openclaw directory groups members --channel zalouser --group-id <id>
```

[Channels](https://docs.openclaw.ai/cli/channels) [Skills](https://docs.openclaw.ai/cli/skills)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.