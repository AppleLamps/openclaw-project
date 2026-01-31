---
url: "https://docs.openclaw.ai/concepts/channel-routing"
title: "Channel routing - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/concepts/channel-routing#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Channels & routing](https://docs.openclaw.ai/concepts/channel-routing#channels-%26-routing)
- [Key terms](https://docs.openclaw.ai/concepts/channel-routing#key-terms)
- [Session key shapes (examples)](https://docs.openclaw.ai/concepts/channel-routing#session-key-shapes-examples)
- [Routing rules (how an agent is chosen)](https://docs.openclaw.ai/concepts/channel-routing#routing-rules-how-an-agent-is-chosen)
- [Broadcast groups (run multiple agents)](https://docs.openclaw.ai/concepts/channel-routing#broadcast-groups-run-multiple-agents)
- [Config overview](https://docs.openclaw.ai/concepts/channel-routing#config-overview)
- [Session storage](https://docs.openclaw.ai/concepts/channel-routing#session-storage)
- [WebChat behavior](https://docs.openclaw.ai/concepts/channel-routing#webchat-behavior)
- [Reply context](https://docs.openclaw.ai/concepts/channel-routing#reply-context)

# [​](https://docs.openclaw.ai/concepts/channel-routing\#channels-&-routing)  Channels & routing

OpenClaw routes replies **back to the channel where a message came from**. The
model does not choose a channel; routing is deterministic and controlled by the
host configuration.

## [​](https://docs.openclaw.ai/concepts/channel-routing\#key-terms)  Key terms

- **Channel**: `whatsapp`, `telegram`, `discord`, `slack`, `signal`, `imessage`, `webchat`.
- **AccountId**: per‑channel account instance (when supported).
- **AgentId**: an isolated workspace + session store (“brain”).
- **SessionKey**: the bucket key used to store context and control concurrency.

## [​](https://docs.openclaw.ai/concepts/channel-routing\#session-key-shapes-examples)  Session key shapes (examples)

Direct messages collapse to the agent’s **main** session:

- `agent:<agentId>:<mainKey>` (default: `agent:main:main`)

Groups and channels remain isolated per channel:

- Groups: `agent:<agentId>:<channel>:group:<id>`
- Channels/rooms: `agent:<agentId>:<channel>:channel:<id>`

Threads:

- Slack/Discord threads append `:thread:<threadId>` to the base key.
- Telegram forum topics embed `:topic:<topicId>` in the group key.

Examples:

- `agent:main:telegram:group:-1001234567890:topic:42`
- `agent:main:discord:channel:123456:thread:987654`

## [​](https://docs.openclaw.ai/concepts/channel-routing\#routing-rules-how-an-agent-is-chosen)  Routing rules (how an agent is chosen)

Routing picks **one agent** for each inbound message:

1. **Exact peer match** (`bindings` with `peer.kind` \+ `peer.id`).
2. **Guild match** (Discord) via `guildId`.
3. **Team match** (Slack) via `teamId`.
4. **Account match** (`accountId` on the channel).
5. **Channel match** (any account on that channel).
6. **Default agent** (`agents.list[].default`, else first list entry, fallback to `main`).

The matched agent determines which workspace and session store are used.

## [​](https://docs.openclaw.ai/concepts/channel-routing\#broadcast-groups-run-multiple-agents)  Broadcast groups (run multiple agents)

Broadcast groups let you run **multiple agents** for the same peer **when OpenClaw would normally reply** (for example: in WhatsApp groups, after mention/activation gating).Config:

Copy

```
{
  broadcast: {
    strategy: "parallel",
    "120363403215116621@g.us": ["alfred", "baerbel"],
    "+15555550123": ["support", "logger"]
  }
}
```

See: [Broadcast Groups](https://docs.openclaw.ai/broadcast-groups).

## [​](https://docs.openclaw.ai/concepts/channel-routing\#config-overview)  Config overview

- `agents.list`: named agent definitions (workspace, model, etc.).
- `bindings`: map inbound channels/accounts/peers to agents.

Example:

Copy

```
{
  agents: {
    list: [\
      { id: "support", name: "Support", workspace: "~/.openclaw/workspace-support" }\
    ]
  },
  bindings: [\
    { match: { channel: "slack", teamId: "T123" }, agentId: "support" },\
    { match: { channel: "telegram", peer: { kind: "group", id: "-100123" } }, agentId: "support" }\
  ]
}
```

## [​](https://docs.openclaw.ai/concepts/channel-routing\#session-storage)  Session storage

Session stores live under the state directory (default `~/.openclaw`):

- `~/.openclaw/agents/<agentId>/sessions/sessions.json`
- JSONL transcripts live alongside the store

You can override the store path via `session.store` and `{agentId}` templating.

## [​](https://docs.openclaw.ai/concepts/channel-routing\#webchat-behavior)  WebChat behavior

WebChat attaches to the **selected agent** and defaults to the agent’s main
session. Because of this, WebChat lets you see cross‑channel context for that
agent in one place.

## [​](https://docs.openclaw.ai/concepts/channel-routing\#reply-context)  Reply context

Inbound replies include:

- `ReplyToId`, `ReplyToBody`, and `ReplyToSender` when available.
- Quoted context is appended to `Body` as a `[Replying to ...]` block.

This is consistent across channels.

[Presence](https://docs.openclaw.ai/concepts/presence) [Messages](https://docs.openclaw.ai/concepts/messages)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.