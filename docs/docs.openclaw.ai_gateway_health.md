---
url: "https://docs.openclaw.ai/gateway/health"
title: "Health - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/gateway/health#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Health Checks (CLI)](https://docs.openclaw.ai/gateway/health#health-checks-cli)
- [Quick checks](https://docs.openclaw.ai/gateway/health#quick-checks)
- [Deep diagnostics](https://docs.openclaw.ai/gateway/health#deep-diagnostics)
- [When something fails](https://docs.openclaw.ai/gateway/health#when-something-fails)
- [Dedicated “health” command](https://docs.openclaw.ai/gateway/health#dedicated-%E2%80%9Chealth%E2%80%9D-command)

# [​](https://docs.openclaw.ai/gateway/health\#health-checks-cli)  Health Checks (CLI)

Short guide to verify channel connectivity without guessing.

## [​](https://docs.openclaw.ai/gateway/health\#quick-checks)  Quick checks

- `openclaw status` — local summary: gateway reachability/mode, update hint, linked channel auth age, sessions + recent activity.
- `openclaw status --all` — full local diagnosis (read-only, color, safe to paste for debugging).
- `openclaw status --deep` — also probes the running Gateway (per-channel probes when supported).
- `openclaw health --json` — asks the running Gateway for a full health snapshot (WS-only; no direct Baileys socket).
- Send `/status` as a standalone message in WhatsApp/WebChat to get a status reply without invoking the agent.
- Logs: tail `/tmp/openclaw/openclaw-*.log` and filter for `web-heartbeat`, `web-reconnect`, `web-auto-reply`, `web-inbound`.

## [​](https://docs.openclaw.ai/gateway/health\#deep-diagnostics)  Deep diagnostics

- Creds on disk: `ls -l ~/.openclaw/credentials/whatsapp/<accountId>/creds.json` (mtime should be recent).
- Session store: `ls -l ~/.openclaw/agents/<agentId>/sessions/sessions.json` (path can be overridden in config). Count and recent recipients are surfaced via `status`.
- Relink flow: `openclaw channels logout && openclaw channels login --verbose` when status codes 409–515 or `loggedOut` appear in logs. (Note: the QR login flow auto-restarts once for status 515 after pairing.)

## [​](https://docs.openclaw.ai/gateway/health\#when-something-fails)  When something fails

- `logged out` or status 409–515 → relink with `openclaw channels logout` then `openclaw channels login`.
- Gateway unreachable → start it: `openclaw gateway --port 18789` (use `--force` if the port is busy).
- No inbound messages → confirm linked phone is online and the sender is allowed (`channels.whatsapp.allowFrom`); for group chats, ensure allowlist + mention rules match (`channels.whatsapp.groups`, `agents.list[].groupChat.mentionPatterns`).

## [​](https://docs.openclaw.ai/gateway/health\#dedicated-%E2%80%9Chealth%E2%80%9D-command)  Dedicated “health” command

`openclaw health --json` asks the running Gateway for its health snapshot (no direct channel sockets from the CLI). It reports linked creds/auth age when available, per-channel probe summaries, session-store summary, and a probe duration. It exits non-zero if the Gateway is unreachable or the probe fails/timeouts. Use `--timeout <ms>` to override the 10s default.

[Background process](https://docs.openclaw.ai/gateway/background-process) [Heartbeat](https://docs.openclaw.ai/gateway/heartbeat)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.