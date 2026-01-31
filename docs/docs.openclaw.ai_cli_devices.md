---
url: "https://docs.openclaw.ai/cli/devices"
title: "Devices - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/devices#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw devices](https://docs.openclaw.ai/cli/devices#openclaw-devices)
- [Commands](https://docs.openclaw.ai/cli/devices#commands)
- [openclaw devices list](https://docs.openclaw.ai/cli/devices#openclaw-devices-list)
- [openclaw devices approve <requestId>](https://docs.openclaw.ai/cli/devices#openclaw-devices-approve-%3Crequestid%3E)
- [openclaw devices reject <requestId>](https://docs.openclaw.ai/cli/devices#openclaw-devices-reject-%3Crequestid%3E)
- [openclaw devices rotate --device <id> --role <role> \[--scope <scope...>\]](https://docs.openclaw.ai/cli/devices#openclaw-devices-rotate-device-%3Cid%3E-role-%3Crole%3E-%5B-scope-%3Cscope-%3E%5D)
- [openclaw devices revoke --device <id> --role <role>](https://docs.openclaw.ai/cli/devices#openclaw-devices-revoke-device-%3Cid%3E-role-%3Crole%3E)
- [Common options](https://docs.openclaw.ai/cli/devices#common-options)
- [Notes](https://docs.openclaw.ai/cli/devices#notes)

# [​](https://docs.openclaw.ai/cli/devices\#openclaw-devices)  `openclaw devices`

Manage device pairing requests and device-scoped tokens.

## [​](https://docs.openclaw.ai/cli/devices\#commands)  Commands

### [​](https://docs.openclaw.ai/cli/devices\#openclaw-devices-list)  `openclaw devices list`

List pending pairing requests and paired devices.

Copy

```
openclaw devices list
openclaw devices list --json
```

### [​](https://docs.openclaw.ai/cli/devices\#openclaw-devices-approve-%3Crequestid%3E)  `openclaw devices approve <requestId>`

Approve a pending device pairing request.

Copy

```
openclaw devices approve <requestId>
```

### [​](https://docs.openclaw.ai/cli/devices\#openclaw-devices-reject-%3Crequestid%3E)  `openclaw devices reject <requestId>`

Reject a pending device pairing request.

Copy

```
openclaw devices reject <requestId>
```

### [​](https://docs.openclaw.ai/cli/devices\#openclaw-devices-rotate-device-%3Cid%3E-role-%3Crole%3E-[-scope-%3Cscope-%3E])  `openclaw devices rotate --device <id> --role <role> [--scope <scope...>]`

Rotate a device token for a specific role (optionally updating scopes).

Copy

```
openclaw devices rotate --device <deviceId> --role operator --scope operator.read --scope operator.write
```

### [​](https://docs.openclaw.ai/cli/devices\#openclaw-devices-revoke-device-%3Cid%3E-role-%3Crole%3E)  `openclaw devices revoke --device <id> --role <role>`

Revoke a device token for a specific role.

Copy

```
openclaw devices revoke --device <deviceId> --role node
```

## [​](https://docs.openclaw.ai/cli/devices\#common-options)  Common options

- `--url <url>`: Gateway WebSocket URL (defaults to `gateway.remote.url` when configured).
- `--token <token>`: Gateway token (if required).
- `--password <password>`: Gateway password (password auth).
- `--timeout <ms>`: RPC timeout.
- `--json`: JSON output (recommended for scripting).

## [​](https://docs.openclaw.ai/cli/devices\#notes)  Notes

- Token rotation returns a new token (sensitive). Treat it like a secret.
- These commands require `operator.pairing` (or `operator.admin`) scope.

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.