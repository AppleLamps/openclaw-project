---
url: "https://docs.openclaw.ai/concepts/compaction"
title: "Compaction - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/concepts/compaction#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Context Window & Compaction](https://docs.openclaw.ai/concepts/compaction#context-window-%26-compaction)
- [What compaction is](https://docs.openclaw.ai/concepts/compaction#what-compaction-is)
- [Configuration](https://docs.openclaw.ai/concepts/compaction#configuration)
- [Auto-compaction (default on)](https://docs.openclaw.ai/concepts/compaction#auto-compaction-default-on)
- [Manual compaction](https://docs.openclaw.ai/concepts/compaction#manual-compaction)
- [Context window source](https://docs.openclaw.ai/concepts/compaction#context-window-source)
- [Compaction vs pruning](https://docs.openclaw.ai/concepts/compaction#compaction-vs-pruning)
- [Tips](https://docs.openclaw.ai/concepts/compaction#tips)

# [​](https://docs.openclaw.ai/concepts/compaction\#context-window-&-compaction)  Context Window & Compaction

Every model has a **context window** (max tokens it can see). Long-running chats accumulate messages and tool results; once the window is tight, OpenClaw **compacts** older history to stay within limits.

## [​](https://docs.openclaw.ai/concepts/compaction\#what-compaction-is)  What compaction is

Compaction **summarizes older conversation** into a compact summary entry and keeps recent messages intact. The summary is stored in the session history, so future requests use:

- The compaction summary
- Recent messages after the compaction point

Compaction **persists** in the session’s JSONL history.

## [​](https://docs.openclaw.ai/concepts/compaction\#configuration)  Configuration

See [Compaction config & modes](https://docs.openclaw.ai/concepts/compaction) for the `agents.defaults.compaction` settings.

## [​](https://docs.openclaw.ai/concepts/compaction\#auto-compaction-default-on)  Auto-compaction (default on)

When a session nears or exceeds the model’s context window, OpenClaw triggers auto-compaction and may retry the original request using the compacted context.You’ll see:

- `🧹 Auto-compaction complete` in verbose mode
- `/status` showing `🧹 Compactions: <count>`

Before compaction, OpenClaw can run a **silent memory flush** turn to store
durable notes to disk. See [Memory](https://docs.openclaw.ai/concepts/memory) for details and config.

## [​](https://docs.openclaw.ai/concepts/compaction\#manual-compaction)  Manual compaction

Use `/compact` (optionally with instructions) to force a compaction pass:

Copy

```
/compact Focus on decisions and open questions
```

## [​](https://docs.openclaw.ai/concepts/compaction\#context-window-source)  Context window source

Context window is model-specific. OpenClaw uses the model definition from the configured provider catalog to determine limits.

## [​](https://docs.openclaw.ai/concepts/compaction\#compaction-vs-pruning)  Compaction vs pruning

- **Compaction**: summarises and **persists** in JSONL.
- **Session pruning**: trims old **tool results** only, **in-memory**, per request.

See [/concepts/session-pruning](https://docs.openclaw.ai/concepts/session-pruning) for pruning details.

## [​](https://docs.openclaw.ai/concepts/compaction\#tips)  Tips

- Use `/compact` when sessions feel stale or context is bloated.
- Large tool outputs are already truncated; pruning can further reduce tool-result buildup.
- If you need a fresh slate, `/new` or `/reset` starts a new session id.

[Multi-Agent Routing](https://docs.openclaw.ai/concepts/multi-agent) [Session](https://docs.openclaw.ai/concepts/session)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.