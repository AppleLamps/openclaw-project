---
url: "https://docs.openclaw.ai/token-use"
title: "Token use - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/token-use#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Token use & costs](https://docs.openclaw.ai/token-use#token-use-%26-costs)
- [How the system prompt is built](https://docs.openclaw.ai/token-use#how-the-system-prompt-is-built)
- [What counts in the context window](https://docs.openclaw.ai/token-use#what-counts-in-the-context-window)
- [How to see current token usage](https://docs.openclaw.ai/token-use#how-to-see-current-token-usage)
- [Cost estimation (when shown)](https://docs.openclaw.ai/token-use#cost-estimation-when-shown)
- [Cache TTL and pruning impact](https://docs.openclaw.ai/token-use#cache-ttl-and-pruning-impact)
- [Example: keep 1h cache warm with heartbeat](https://docs.openclaw.ai/token-use#example%3A-keep-1h-cache-warm-with-heartbeat)
- [Tips for reducing token pressure](https://docs.openclaw.ai/token-use#tips-for-reducing-token-pressure)

# [​](https://docs.openclaw.ai/token-use\#token-use-&-costs)  Token use & costs

OpenClaw tracks **tokens**, not characters. Tokens are model-specific, but most
OpenAI-style models average ~4 characters per token for English text.

## [​](https://docs.openclaw.ai/token-use\#how-the-system-prompt-is-built)  How the system prompt is built

OpenClaw assembles its own system prompt on every run. It includes:

- Tool list + short descriptions
- Skills list (only metadata; instructions are loaded on demand with `read`)
- Self-update instructions
- Workspace + bootstrap files (`AGENTS.md`, `SOUL.md`, `TOOLS.md`, `IDENTITY.md`, `USER.md`, `HEARTBEAT.md`, `BOOTSTRAP.md` when new). Large files are truncated by `agents.defaults.bootstrapMaxChars` (default: 20000).
- Time (UTC + user timezone)
- Reply tags + heartbeat behavior
- Runtime metadata (host/OS/model/thinking)

See the full breakdown in [System Prompt](https://docs.openclaw.ai/concepts/system-prompt).

## [​](https://docs.openclaw.ai/token-use\#what-counts-in-the-context-window)  What counts in the context window

Everything the model receives counts toward the context limit:

- System prompt (all sections listed above)
- Conversation history (user + assistant messages)
- Tool calls and tool results
- Attachments/transcripts (images, audio, files)
- Compaction summaries and pruning artifacts
- Provider wrappers or safety headers (not visible, but still counted)

For a practical breakdown (per injected file, tools, skills, and system prompt size), use `/context list` or `/context detail`. See [Context](https://docs.openclaw.ai/concepts/context).

## [​](https://docs.openclaw.ai/token-use\#how-to-see-current-token-usage)  How to see current token usage

Use these in chat:

- `/status` → **emoji‑rich status card** with the session model, context usage,
last response input/output tokens, and **estimated cost** (API key only).
- `/usage off|tokens|full` → appends a **per-response usage footer** to every reply.

  - Persists per session (stored as `responseUsage`).
  - OAuth auth **hides cost** (tokens only).
- `/usage cost` → shows a local cost summary from OpenClaw session logs.

Other surfaces:

- **TUI/Web TUI:**`/status` \+ `/usage` are supported.
- **CLI:**`openclaw status --usage` and `openclaw channels list` show
provider quota windows (not per-response costs).

## [​](https://docs.openclaw.ai/token-use\#cost-estimation-when-shown)  Cost estimation (when shown)

Costs are estimated from your model pricing config:

Copy

```
models.providers.<provider>.models[].cost
```

These are **USD per 1M tokens** for `input`, `output`, `cacheRead`, and
`cacheWrite`. If pricing is missing, OpenClaw shows tokens only. OAuth tokens
never show dollar cost.

## [​](https://docs.openclaw.ai/token-use\#cache-ttl-and-pruning-impact)  Cache TTL and pruning impact

Provider prompt caching only applies within the cache TTL window. OpenClaw can
optionally run **cache-ttl pruning**: it prunes the session once the cache TTL
has expired, then resets the cache window so subsequent requests can re-use the
freshly cached context instead of re-caching the full history. This keeps cache
write costs lower when a session goes idle past the TTL.Configure it in [Gateway configuration](https://docs.openclaw.ai/gateway/configuration) and see the
behavior details in [Session pruning](https://docs.openclaw.ai/concepts/session-pruning).Heartbeat can keep the cache **warm** across idle gaps. If your model cache TTL
is `1h`, setting the heartbeat interval just under that (e.g., `55m`) can avoid
re-caching the full prompt, reducing cache write costs.For Anthropic API pricing, cache reads are significantly cheaper than input
tokens, while cache writes are billed at a higher multiplier. See Anthropic’s
prompt caching pricing for the latest rates and TTL multipliers:
[https://docs.anthropic.com/docs/build-with-claude/prompt-caching](https://docs.anthropic.com/docs/build-with-claude/prompt-caching)

### [​](https://docs.openclaw.ai/token-use\#example:-keep-1h-cache-warm-with-heartbeat)  Example: keep 1h cache warm with heartbeat

Copy

```
agents:
  defaults:
    model:
      primary: "anthropic/claude-opus-4-5"
    models:
      "anthropic/claude-opus-4-5":
        params:
          cacheControlTtl: "1h"
    heartbeat:
      every: "55m"
```

## [​](https://docs.openclaw.ai/token-use\#tips-for-reducing-token-pressure)  Tips for reducing token pressure

- Use `/compact` to summarize long sessions.
- Trim large tool outputs in your workflows.
- Keep skill descriptions short (skill list is injected into the prompt).
- Prefer smaller models for verbose, exploratory work.

See [Skills](https://docs.openclaw.ai/tools/skills) for the exact skill list overhead formula.

[Context](https://docs.openclaw.ai/concepts/context) [Oauth](https://docs.openclaw.ai/concepts/oauth)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.