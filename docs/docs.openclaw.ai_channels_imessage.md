---
url: "https://docs.openclaw.ai/channels/imessage"
title: "Imessage - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/channels/imessage#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [iMessage (imsg)](https://docs.openclaw.ai/channels/imessage#imessage-imsg)
- [Quick setup (beginner)](https://docs.openclaw.ai/channels/imessage#quick-setup-beginner)
- [What it is](https://docs.openclaw.ai/channels/imessage#what-it-is)
- [Config writes](https://docs.openclaw.ai/channels/imessage#config-writes)
- [Requirements](https://docs.openclaw.ai/channels/imessage#requirements)
- [Setup (fast path)](https://docs.openclaw.ai/channels/imessage#setup-fast-path)
- [Dedicated bot macOS user (for isolated identity)](https://docs.openclaw.ai/channels/imessage#dedicated-bot-macos-user-for-isolated-identity)
- [Remote/SSH variant (optional)](https://docs.openclaw.ai/channels/imessage#remote%2Fssh-variant-optional)
- [Remote Mac via Tailscale (example)](https://docs.openclaw.ai/channels/imessage#remote-mac-via-tailscale-example)
- [Access control (DMs + groups)](https://docs.openclaw.ai/channels/imessage#access-control-dms-%2B-groups)
- [How it works (behavior)](https://docs.openclaw.ai/channels/imessage#how-it-works-behavior)
- [Group-ish threads (is\_group=false)](https://docs.openclaw.ai/channels/imessage#group-ish-threads-is_group%3Dfalse)
- [Media + limits](https://docs.openclaw.ai/channels/imessage#media-%2B-limits)
- [Limits](https://docs.openclaw.ai/channels/imessage#limits)
- [Addressing / delivery targets](https://docs.openclaw.ai/channels/imessage#addressing-%2F-delivery-targets)
- [Configuration reference (iMessage)](https://docs.openclaw.ai/channels/imessage#configuration-reference-imessage)

# [​](https://docs.openclaw.ai/channels/imessage\#imessage-imsg)  iMessage (imsg)

Status: external CLI integration. Gateway spawns `imsg rpc` (JSON-RPC over stdio).

## [​](https://docs.openclaw.ai/channels/imessage\#quick-setup-beginner)  Quick setup (beginner)

1. Ensure Messages is signed in on this Mac.
2. Install `imsg`:

   - `brew install steipete/tap/imsg`
3. Configure OpenClaw with `channels.imessage.cliPath` and `channels.imessage.dbPath`.
4. Start the gateway and approve any macOS prompts (Automation + Full Disk Access).

Minimal config:

Copy

```
{
  channels: {
    imessage: {
      enabled: true,
      cliPath: "/usr/local/bin/imsg",
      dbPath: "/Users/<you>/Library/Messages/chat.db"
    }
  }
}
```

## [​](https://docs.openclaw.ai/channels/imessage\#what-it-is)  What it is

- iMessage channel backed by `imsg` on macOS.
- Deterministic routing: replies always go back to iMessage.
- DMs share the agent’s main session; groups are isolated (`agent:<agentId>:imessage:group:<chat_id>`).
- If a multi-participant thread arrives with `is_group=false`, you can still isolate it by `chat_id` using `channels.imessage.groups` (see “Group-ish threads” below).

## [​](https://docs.openclaw.ai/channels/imessage\#config-writes)  Config writes

By default, iMessage is allowed to write config updates triggered by `/config set|unset` (requires `commands.config: true`).Disable with:

Copy

```
{
  channels: { imessage: { configWrites: false } }
}
```

## [​](https://docs.openclaw.ai/channels/imessage\#requirements)  Requirements

- macOS with Messages signed in.
- Full Disk Access for OpenClaw + `imsg` (Messages DB access).
- Automation permission when sending.
- `channels.imessage.cliPath` can point to any command that proxies stdin/stdout (for example, a wrapper script that SSHes to another Mac and runs `imsg rpc`).

## [​](https://docs.openclaw.ai/channels/imessage\#setup-fast-path)  Setup (fast path)

1. Ensure Messages is signed in on this Mac.
2. Configure iMessage and start the gateway.

### [​](https://docs.openclaw.ai/channels/imessage\#dedicated-bot-macos-user-for-isolated-identity)  Dedicated bot macOS user (for isolated identity)

If you want the bot to send from a **separate iMessage identity** (and keep your personal Messages clean), use a dedicated Apple ID + a dedicated macOS user.

1. Create a dedicated Apple ID (example: `my-cool-bot@icloud.com`).

   - Apple may require a phone number for verification / 2FA.
2. Create a macOS user (example: `openclawhome`) and sign into it.
3. Open Messages in that macOS user and sign into iMessage using the bot Apple ID.
4. Enable Remote Login (System Settings → General → Sharing → Remote Login).
5. Install `imsg`:

   - `brew install steipete/tap/imsg`
6. Set up SSH so `ssh <bot-macos-user>@localhost true` works without a password.
7. Point `channels.imessage.accounts.bot.cliPath` at an SSH wrapper that runs `imsg` as the bot user.

First-run note: sending/receiving may require GUI approvals (Automation + Full Disk Access) in the _bot macOS user_. If `imsg rpc` looks stuck or exits, log into that user (Screen Sharing helps), run a one-time `imsg chats --limit 1` / `imsg send ...`, approve prompts, then retry.Example wrapper (`chmod +x`). Replace `<bot-macos-user>` with your actual macOS username:

Copy

```
#!/usr/bin/env bash
set -euo pipefail

# Run an interactive SSH once first to accept host keys:
#   ssh <bot-macos-user>@localhost true
exec /usr/bin/ssh -o BatchMode=yes -o ConnectTimeout=5 -T <bot-macos-user>@localhost \
  "/usr/local/bin/imsg" "$@"
```

Example config:

Copy

```
{
  channels: {
    imessage: {
      enabled: true,
      accounts: {
        bot: {
          name: "Bot",
          enabled: true,
          cliPath: "/path/to/imsg-bot",
          dbPath: "/Users/<bot-macos-user>/Library/Messages/chat.db"
        }
      }
    }
  }
}
```

For single-account setups, use flat options (`channels.imessage.cliPath`, `channels.imessage.dbPath`) instead of the `accounts` map.

### [​](https://docs.openclaw.ai/channels/imessage\#remote/ssh-variant-optional)  Remote/SSH variant (optional)

If you want iMessage on another Mac, set `channels.imessage.cliPath` to a wrapper that runs `imsg` on the remote macOS host over SSH. OpenClaw only needs stdio.Example wrapper:

Copy

```
#!/usr/bin/env bash
exec ssh -T gateway-host imsg "$@"
```

**Remote attachments:** When `cliPath` points to a remote host via SSH, attachment paths in the Messages database reference files on the remote machine. OpenClaw can automatically fetch these over SCP by setting `channels.imessage.remoteHost`:

Copy

```
{
  channels: {
    imessage: {
      cliPath: "~/imsg-ssh",                     // SSH wrapper to remote Mac
      remoteHost: "user@gateway-host",           // for SCP file transfer
      includeAttachments: true
    }
  }
}
```

If `remoteHost` is not set, OpenClaw attempts to auto-detect it by parsing the SSH command in your wrapper script. Explicit configuration is recommended for reliability.

#### [​](https://docs.openclaw.ai/channels/imessage\#remote-mac-via-tailscale-example)  Remote Mac via Tailscale (example)

If the Gateway runs on a Linux host/VM but iMessage must run on a Mac, Tailscale is the simplest bridge: the Gateway talks to the Mac over the tailnet, runs `imsg` via SSH, and SCPs attachments back.Architecture:

Copy

```
┌──────────────────────────────┐          SSH (imsg rpc)          ┌──────────────────────────┐
│ Gateway host (Linux/VM)      │──────────────────────────────────▶│ Mac with Messages + imsg │
│ - openclaw gateway           │          SCP (attachments)        │ - Messages signed in     │
│ - channels.imessage.cliPath  │◀──────────────────────────────────│ - Remote Login enabled   │
└──────────────────────────────┘                                   └──────────────────────────┘
              ▲
              │ Tailscale tailnet (hostname or 100.x.y.z)
              ▼
        user@gateway-host
```

Concrete config example (Tailscale hostname):

Copy

```
{
  channels: {
    imessage: {
      enabled: true,
      cliPath: "~/.openclaw/scripts/imsg-ssh",
      remoteHost: "bot@mac-mini.tailnet-1234.ts.net",
      includeAttachments: true,
      dbPath: "/Users/bot/Library/Messages/chat.db"
    }
  }
}
```

Example wrapper (`~/.openclaw/scripts/imsg-ssh`):

Copy

```
#!/usr/bin/env bash
exec ssh -T bot@mac-mini.tailnet-1234.ts.net imsg "$@"
```

Notes:

- Ensure the Mac is signed in to Messages, and Remote Login is enabled.
- Use SSH keys so `ssh bot@mac-mini.tailnet-1234.ts.net` works without prompts.
- `remoteHost` should match the SSH target so SCP can fetch attachments.

Multi-account support: use `channels.imessage.accounts` with per-account config and optional `name`. See [`gateway/configuration`](https://docs.openclaw.ai/gateway/configuration#telegramaccounts--discordaccounts--slackaccounts--signalaccounts--imessageaccounts) for the shared pattern. Don’t commit `~/.openclaw/openclaw.json` (it often contains tokens).

## [​](https://docs.openclaw.ai/channels/imessage\#access-control-dms-+-groups)  Access control (DMs + groups)

DMs:

- Default: `channels.imessage.dmPolicy = "pairing"`.
- Unknown senders receive a pairing code; messages are ignored until approved (codes expire after 1 hour).
- Approve via:
  - `openclaw pairing list imessage`
  - `openclaw pairing approve imessage <CODE>`
- Pairing is the default token exchange for iMessage DMs. Details: [Pairing](https://docs.openclaw.ai/start/pairing)

Groups:

- `channels.imessage.groupPolicy = open | allowlist | disabled`.
- `channels.imessage.groupAllowFrom` controls who can trigger in groups when `allowlist` is set.
- Mention gating uses `agents.list[].groupChat.mentionPatterns` (or `messages.groupChat.mentionPatterns`) because iMessage has no native mention metadata.
- Multi-agent override: set per-agent patterns on `agents.list[].groupChat.mentionPatterns`.

## [​](https://docs.openclaw.ai/channels/imessage\#how-it-works-behavior)  How it works (behavior)

- `imsg` streams message events; the gateway normalizes them into the shared channel envelope.
- Replies always route back to the same chat id or handle.

## [​](https://docs.openclaw.ai/channels/imessage\#group-ish-threads-is_group=false)  Group-ish threads (`is_group=false`)

Some iMessage threads can have multiple participants but still arrive with `is_group=false` depending on how Messages stores the chat identifier.If you explicitly configure a `chat_id` under `channels.imessage.groups`, OpenClaw treats that thread as a “group” for:

- session isolation (separate `agent:<agentId>:imessage:group:<chat_id>` session key)
- group allowlisting / mention gating behavior

Example:

Copy

```
{
  channels: {
    imessage: {
      groupPolicy: "allowlist",
      groupAllowFrom: ["+15555550123"],
      groups: {
        "42": { "requireMention": false }
      }
    }
  }
}
```

This is useful when you want an isolated personality/model for a specific thread (see [Multi-agent routing](https://docs.openclaw.ai/concepts/multi-agent)). For filesystem isolation, see [Sandboxing](https://docs.openclaw.ai/gateway/sandboxing).

## [​](https://docs.openclaw.ai/channels/imessage\#media-+-limits)  Media + limits

- Optional attachment ingestion via `channels.imessage.includeAttachments`.
- Media cap via `channels.imessage.mediaMaxMb`.

## [​](https://docs.openclaw.ai/channels/imessage\#limits)  Limits

- Outbound text is chunked to `channels.imessage.textChunkLimit` (default 4000).
- Optional newline chunking: set `channels.imessage.chunkMode="newline"` to split on blank lines (paragraph boundaries) before length chunking.
- Media uploads are capped by `channels.imessage.mediaMaxMb` (default 16).

## [​](https://docs.openclaw.ai/channels/imessage\#addressing-/-delivery-targets)  Addressing / delivery targets

Prefer `chat_id` for stable routing:

- `chat_id:123` (preferred)
- `chat_guid:...`
- `chat_identifier:...`
- direct handles: `imessage:+1555` / `sms:+1555` / `user@example.com`

List chats:

Copy

```
imsg chats --limit 20
```

## [​](https://docs.openclaw.ai/channels/imessage\#configuration-reference-imessage)  Configuration reference (iMessage)

Full configuration: [Configuration](https://docs.openclaw.ai/gateway/configuration)Provider options:

- `channels.imessage.enabled`: enable/disable channel startup.
- `channels.imessage.cliPath`: path to `imsg`.
- `channels.imessage.dbPath`: Messages DB path.
- `channels.imessage.remoteHost`: SSH host for SCP attachment transfer when `cliPath` points to a remote Mac (e.g., `user@gateway-host`). Auto-detected from SSH wrapper if not set.
- `channels.imessage.service`: `imessage | sms | auto`.
- `channels.imessage.region`: SMS region.
- `channels.imessage.dmPolicy`: `pairing | allowlist | open | disabled` (default: pairing).
- `channels.imessage.allowFrom`: DM allowlist (handles, emails, E.164 numbers, or `chat_id:*`). `open` requires `"*"`. iMessage has no usernames; use handles or chat targets.
- `channels.imessage.groupPolicy`: `open | allowlist | disabled` (default: allowlist).
- `channels.imessage.groupAllowFrom`: group sender allowlist.
- `channels.imessage.historyLimit` / `channels.imessage.accounts.*.historyLimit`: max group messages to include as context (0 disables).
- `channels.imessage.dmHistoryLimit`: DM history limit in user turns. Per-user overrides: `channels.imessage.dms["<handle>"].historyLimit`.
- `channels.imessage.groups`: per-group defaults + allowlist (use `"*"` for global defaults).
- `channels.imessage.includeAttachments`: ingest attachments into context.
- `channels.imessage.mediaMaxMb`: inbound/outbound media cap (MB).
- `channels.imessage.textChunkLimit`: outbound chunk size (chars).
- `channels.imessage.chunkMode`: `length` (default) or `newline` to split on blank lines (paragraph boundaries) before length chunking.

Related global options:

- `agents.list[].groupChat.mentionPatterns` (or `messages.groupChat.mentionPatterns`).
- `messages.responsePrefix`.

[Signal](https://docs.openclaw.ai/channels/signal) [Msteams](https://docs.openclaw.ai/channels/msteams)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.