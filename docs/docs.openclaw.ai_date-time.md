---
url: "https://docs.openclaw.ai/date-time"
title: "Date time - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/date-time#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Date & Time](https://docs.openclaw.ai/date-time#date-%26-time)
- [Message envelopes (local by default)](https://docs.openclaw.ai/date-time#message-envelopes-local-by-default)
- [Examples](https://docs.openclaw.ai/date-time#examples)
- [System prompt: Current Date & Time](https://docs.openclaw.ai/date-time#system-prompt%3A-current-date-%26-time)
- [System event lines (local by default)](https://docs.openclaw.ai/date-time#system-event-lines-local-by-default)
- [Configure user timezone + format](https://docs.openclaw.ai/date-time#configure-user-timezone-%2B-format)
- [Time format detection (auto)](https://docs.openclaw.ai/date-time#time-format-detection-auto)
- [Tool payloads + connectors (raw provider time + normalized fields)](https://docs.openclaw.ai/date-time#tool-payloads-%2B-connectors-raw-provider-time-%2B-normalized-fields)
- [Related docs](https://docs.openclaw.ai/date-time#related-docs)

# [​](https://docs.openclaw.ai/date-time\#date-&-time)  Date & Time

OpenClaw defaults to **host-local time for transport timestamps** and **user timezone only in the system prompt**.
Provider timestamps are preserved so tools keep their native semantics (current time is available via `session_status`).

## [​](https://docs.openclaw.ai/date-time\#message-envelopes-local-by-default)  Message envelopes (local by default)

Inbound messages are wrapped with a timestamp (minute precision):

Copy

```
[Provider ... 2026-01-05 16:26 PST] message text
```

This envelope timestamp is **host-local by default**, regardless of the provider timezone.You can override this behavior:

Copy

```
{
  agents: {
    defaults: {
      envelopeTimezone: "local", // "utc" | "local" | "user" | IANA timezone
      envelopeTimestamp: "on", // "on" | "off"
      envelopeElapsed: "on" // "on" | "off"
    }
  }
}
```

- `envelopeTimezone: "utc"` uses UTC.
- `envelopeTimezone: "local"` uses the host timezone.
- `envelopeTimezone: "user"` uses `agents.defaults.userTimezone` (falls back to host timezone).
- Use an explicit IANA timezone (e.g., `"America/Chicago"`) for a fixed zone.
- `envelopeTimestamp: "off"` removes absolute timestamps from envelope headers.
- `envelopeElapsed: "off"` removes elapsed time suffixes (the `+2m` style).

### [​](https://docs.openclaw.ai/date-time\#examples)  Examples

**Local (default):**

Copy

```
[WhatsApp +1555 2026-01-18 00:19 PST] hello
```

**User timezone:**

Copy

```
[WhatsApp +1555 2026-01-18 00:19 CST] hello
```

**Elapsed time enabled:**

Copy

```
[WhatsApp +1555 +30s 2026-01-18T05:19Z] follow-up
```

## [​](https://docs.openclaw.ai/date-time\#system-prompt:-current-date-&-time)  System prompt: Current Date & Time

If the user timezone is known, the system prompt includes a dedicated
**Current Date & Time** section with the **time zone only** (no clock/time format)
to keep prompt caching stable:

Copy

```
Time zone: America/Chicago
```

When the agent needs the current time, use the `session_status` tool; the status
card includes a timestamp line.

## [​](https://docs.openclaw.ai/date-time\#system-event-lines-local-by-default)  System event lines (local by default)

Queued system events inserted into agent context are prefixed with a timestamp using the
same timezone selection as message envelopes (default: host-local).

Copy

```
System: [2026-01-12 12:19:17 PST] Model switched.
```

### [​](https://docs.openclaw.ai/date-time\#configure-user-timezone-+-format)  Configure user timezone + format

Copy

```
{
  agents: {
    defaults: {
      userTimezone: "America/Chicago",
      timeFormat: "auto" // auto | 12 | 24
    }
  }
}
```

- `userTimezone` sets the **user-local timezone** for prompt context.
- `timeFormat` controls **12h/24h display** in the prompt. `auto` follows OS prefs.

## [​](https://docs.openclaw.ai/date-time\#time-format-detection-auto)  Time format detection (auto)

When `timeFormat: "auto"`, OpenClaw inspects the OS preference (macOS/Windows)
and falls back to locale formatting. The detected value is **cached per process**
to avoid repeated system calls.

## [​](https://docs.openclaw.ai/date-time\#tool-payloads-+-connectors-raw-provider-time-+-normalized-fields)  Tool payloads + connectors (raw provider time + normalized fields)

Channel tools return **provider-native timestamps** and add normalized fields for consistency:

- `timestampMs`: epoch milliseconds (UTC)
- `timestampUtc`: ISO 8601 UTC string

Raw provider fields are preserved so nothing is lost.

- Slack: epoch-like strings from the API
- Discord: UTC ISO timestamps
- Telegram/WhatsApp: provider-specific numeric/ISO timestamps

If you need local time, convert it downstream using the known timezone.

## [​](https://docs.openclaw.ai/date-time\#related-docs)  Related docs

- [System Prompt](https://docs.openclaw.ai/concepts/system-prompt)
- [Timezones](https://docs.openclaw.ai/concepts/timezone)
- [Messages](https://docs.openclaw.ai/concepts/messages)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.