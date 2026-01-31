---
url: "https://docs.openclaw.ai/tools/thinking"
title: "Thinking - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/tools/thinking#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Thinking Levels (/think directives)](https://docs.openclaw.ai/tools/thinking#thinking-levels-%2Fthink-directives)
- [What it does](https://docs.openclaw.ai/tools/thinking#what-it-does)
- [Resolution order](https://docs.openclaw.ai/tools/thinking#resolution-order)
- [Setting a session default](https://docs.openclaw.ai/tools/thinking#setting-a-session-default)
- [Application by agent](https://docs.openclaw.ai/tools/thinking#application-by-agent)
- [Verbose directives (/verbose or /v)](https://docs.openclaw.ai/tools/thinking#verbose-directives-%2Fverbose-or-%2Fv)
- [Reasoning visibility (/reasoning)](https://docs.openclaw.ai/tools/thinking#reasoning-visibility-%2Freasoning)
- [Related](https://docs.openclaw.ai/tools/thinking#related)
- [Heartbeats](https://docs.openclaw.ai/tools/thinking#heartbeats)
- [Web chat UI](https://docs.openclaw.ai/tools/thinking#web-chat-ui)

# [​](https://docs.openclaw.ai/tools/thinking\#thinking-levels-/think-directives)  Thinking Levels (/think directives)

## [​](https://docs.openclaw.ai/tools/thinking\#what-it-does)  What it does

- Inline directive in any inbound body: `/t <level>`, `/think:<level>`, or `/thinking <level>`.
- Levels (aliases): `off | minimal | low | medium | high | xhigh` (GPT-5.2 + Codex models only)

  - minimal → “think”
  - low → “think hard”
  - medium → “think harder”
  - high → “ultrathink” (max budget)
  - xhigh → “ultrathink+” (GPT-5.2 + Codex models only)
  - `highest`, `max` map to `high`.
- Provider notes:
  - Z.AI (`zai/*`) only supports binary thinking (`on`/`off`). Any non-`off` level is treated as `on` (mapped to `low`).

## [​](https://docs.openclaw.ai/tools/thinking\#resolution-order)  Resolution order

1. Inline directive on the message (applies only to that message).
2. Session override (set by sending a directive-only message).
3. Global default (`agents.defaults.thinkingDefault` in config).
4. Fallback: low for reasoning-capable models; off otherwise.

## [​](https://docs.openclaw.ai/tools/thinking\#setting-a-session-default)  Setting a session default

- Send a message that is **only** the directive (whitespace allowed), e.g. `/think:medium` or `/t high`.
- That sticks for the current session (per-sender by default); cleared by `/think:off` or session idle reset.
- Confirmation reply is sent (`Thinking level set to high.` / `Thinking disabled.`). If the level is invalid (e.g. `/thinking big`), the command is rejected with a hint and the session state is left unchanged.
- Send `/think` (or `/think:`) with no argument to see the current thinking level.

## [​](https://docs.openclaw.ai/tools/thinking\#application-by-agent)  Application by agent

- **Embedded Pi**: the resolved level is passed to the in-process Pi agent runtime.

## [​](https://docs.openclaw.ai/tools/thinking\#verbose-directives-/verbose-or-/v)  Verbose directives (/verbose or /v)

- Levels: `on` (minimal) \| `full` \| `off` (default).
- Directive-only message toggles session verbose and replies `Verbose logging enabled.` / `Verbose logging disabled.`; invalid levels return a hint without changing state.
- `/verbose off` stores an explicit session override; clear it via the Sessions UI by choosing `inherit`.
- Inline directive affects only that message; session/global defaults apply otherwise.
- Send `/verbose` (or `/verbose:`) with no argument to see the current verbose level.
- When verbose is on, agents that emit structured tool results (Pi, other JSON agents) send each tool call back as its own metadata-only message, prefixed with `<emoji> <tool-name>: <arg>` when available (path/command). These tool summaries are sent as soon as each tool starts (separate bubbles), not as streaming deltas.
- When verbose is `full`, tool outputs are also forwarded after completion (separate bubble, truncated to a safe length). If you toggle `/verbose on|full|off` while a run is in-flight, subsequent tool bubbles honor the new setting.

## [​](https://docs.openclaw.ai/tools/thinking\#reasoning-visibility-/reasoning)  Reasoning visibility (/reasoning)

- Levels: `on|off|stream`.
- Directive-only message toggles whether thinking blocks are shown in replies.
- When enabled, reasoning is sent as a **separate message** prefixed with `Reasoning:`.
- `stream` (Telegram only): streams reasoning into the Telegram draft bubble while the reply is generating, then sends the final answer without reasoning.
- Alias: `/reason`.
- Send `/reasoning` (or `/reasoning:`) with no argument to see the current reasoning level.

## [​](https://docs.openclaw.ai/tools/thinking\#related)  Related

- Elevated mode docs live in [Elevated mode](https://docs.openclaw.ai/tools/elevated).

## [​](https://docs.openclaw.ai/tools/thinking\#heartbeats)  Heartbeats

- Heartbeat probe body is the configured heartbeat prompt (default: `Read HEARTBEAT.md if it exists (workspace context). Follow it strictly. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK.`). Inline directives in a heartbeat message apply as usual (but avoid changing session defaults from heartbeats).
- Heartbeat delivery defaults to the final payload only. To also send the separate `Reasoning:` message (when available), set `agents.defaults.heartbeat.includeReasoning: true` or per-agent `agents.list[].heartbeat.includeReasoning: true`.

## [​](https://docs.openclaw.ai/tools/thinking\#web-chat-ui)  Web chat UI

- The web chat thinking selector mirrors the session’s stored level from the inbound session store/config when the page loads.
- Picking another level applies only to the next message (`thinkingOnce`); after sending, the selector snaps back to the stored session level.
- To change the session default, send a `/think:<level>` directive (as before); the selector will reflect it after the next reload.

[Slash commands](https://docs.openclaw.ai/tools/slash-commands) [Agent send](https://docs.openclaw.ai/tools/agent-send)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.