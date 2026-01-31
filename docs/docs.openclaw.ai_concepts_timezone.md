---
url: "https://docs.openclaw.ai/concepts/timezone"
title: "Timezone - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/concepts/timezone#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Timezones](https://docs.openclaw.ai/concepts/timezone#timezones)
- [Message envelopes (local by default)](https://docs.openclaw.ai/concepts/timezone#message-envelopes-local-by-default)
- [Examples](https://docs.openclaw.ai/concepts/timezone#examples)
- [Tool payloads (raw provider data + normalized fields)](https://docs.openclaw.ai/concepts/timezone#tool-payloads-raw-provider-data-%2B-normalized-fields)
- [User timezone for the system prompt](https://docs.openclaw.ai/concepts/timezone#user-timezone-for-the-system-prompt)

# [​](https://docs.openclaw.ai/concepts/timezone\#timezones)  Timezones

OpenClaw standardizes timestamps so the model sees a **single reference time**.

## [​](https://docs.openclaw.ai/concepts/timezone\#message-envelopes-local-by-default)  Message envelopes (local by default)

Inbound messages are wrapped in an envelope like:

Copy

```
[Provider ... 2026-01-05 16:26 PST] message text
```

The timestamp in the envelope is **host-local by default**, with minutes precision.You can override this with:

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
- `envelopeTimezone: "user"` uses `agents.defaults.userTimezone` (falls back to host timezone).
- Use an explicit IANA timezone (e.g., `"Europe/Vienna"`) for a fixed offset.
- `envelopeTimestamp: "off"` removes absolute timestamps from envelope headers.
- `envelopeElapsed: "off"` removes elapsed time suffixes (the `+2m` style).

### [​](https://docs.openclaw.ai/concepts/timezone\#examples)  Examples

**Local (default):**

Copy

```
[Signal Alice +1555 2026-01-18 00:19 PST] hello
```

**Fixed timezone:**

Copy

```
[Signal Alice +1555 2026-01-18 06:19 GMT+1] hello
```

**Elapsed time:**

Copy

```
[Signal Alice +1555 +2m 2026-01-18T05:19Z] follow-up
```

## [​](https://docs.openclaw.ai/concepts/timezone\#tool-payloads-raw-provider-data-+-normalized-fields)  Tool payloads (raw provider data + normalized fields)

Tool calls (`channels.discord.readMessages`, `channels.slack.readMessages`, etc.) return **raw provider timestamps**.
We also attach normalized fields for consistency:

- `timestampMs` (UTC epoch milliseconds)
- `timestampUtc` (ISO 8601 UTC string)

Raw provider fields are preserved.

## [​](https://docs.openclaw.ai/concepts/timezone\#user-timezone-for-the-system-prompt)  User timezone for the system prompt

Set `agents.defaults.userTimezone` to tell the model the user’s local time zone. If it is
unset, OpenClaw resolves the **host timezone at runtime** (no config write).

Copy

```
{
  agents: { defaults: { userTimezone: "America/Chicago" } }
}
```

The system prompt includes:

- `Current Date & Time` section with local time and timezone
- `Time format: 12-hour` or `24-hour`

You can control the prompt format with `agents.defaults.timeFormat` (`auto` \| `12` \| `24`).See [Date & Time](https://docs.openclaw.ai/date-time) for the full behavior and examples.

[Usage tracking](https://docs.openclaw.ai/concepts/usage-tracking) [Typebox](https://docs.openclaw.ai/concepts/typebox)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.