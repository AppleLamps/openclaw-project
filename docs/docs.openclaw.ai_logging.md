---
url: "https://docs.openclaw.ai/logging"
title: "Logging - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/logging#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Logging](https://docs.openclaw.ai/logging#logging)
- [Where logs live](https://docs.openclaw.ai/logging#where-logs-live)
- [How to read logs](https://docs.openclaw.ai/logging#how-to-read-logs)
- [CLI: live tail (recommended)](https://docs.openclaw.ai/logging#cli%3A-live-tail-recommended)
- [Control UI (web)](https://docs.openclaw.ai/logging#control-ui-web)
- [Channel-only logs](https://docs.openclaw.ai/logging#channel-only-logs)
- [Log formats](https://docs.openclaw.ai/logging#log-formats)
- [File logs (JSONL)](https://docs.openclaw.ai/logging#file-logs-jsonl)
- [Console output](https://docs.openclaw.ai/logging#console-output)
- [Configuring logging](https://docs.openclaw.ai/logging#configuring-logging)
- [Log levels](https://docs.openclaw.ai/logging#log-levels)
- [Console styles](https://docs.openclaw.ai/logging#console-styles)
- [Redaction](https://docs.openclaw.ai/logging#redaction)
- [Diagnostics + OpenTelemetry](https://docs.openclaw.ai/logging#diagnostics-%2B-opentelemetry)
- [OpenTelemetry vs OTLP](https://docs.openclaw.ai/logging#opentelemetry-vs-otlp)
- [Signals exported](https://docs.openclaw.ai/logging#signals-exported)
- [Diagnostic event catalog](https://docs.openclaw.ai/logging#diagnostic-event-catalog)
- [Enable diagnostics (no exporter)](https://docs.openclaw.ai/logging#enable-diagnostics-no-exporter)
- [Diagnostics flags (targeted logs)](https://docs.openclaw.ai/logging#diagnostics-flags-targeted-logs)
- [Export to OpenTelemetry](https://docs.openclaw.ai/logging#export-to-opentelemetry)
- [Exported metrics (names + types)](https://docs.openclaw.ai/logging#exported-metrics-names-%2B-types)
- [Exported spans (names + key attributes)](https://docs.openclaw.ai/logging#exported-spans-names-%2B-key-attributes)
- [Sampling + flushing](https://docs.openclaw.ai/logging#sampling-%2B-flushing)
- [Protocol notes](https://docs.openclaw.ai/logging#protocol-notes)
- [Log export behavior](https://docs.openclaw.ai/logging#log-export-behavior)
- [Troubleshooting tips](https://docs.openclaw.ai/logging#troubleshooting-tips)

# [​](https://docs.openclaw.ai/logging\#logging)  Logging

OpenClaw logs in two places:

- **File logs** (JSON lines) written by the Gateway.
- **Console output** shown in terminals and the Control UI.

This page explains where logs live, how to read them, and how to configure log
levels and formats.

## [​](https://docs.openclaw.ai/logging\#where-logs-live)  Where logs live

By default, the Gateway writes a rolling log file under:`/tmp/openclaw/openclaw-YYYY-MM-DD.log`The date uses the gateway host’s local timezone.You can override this in `~/.openclaw/openclaw.json`:

Copy

```
{
  "logging": {
    "file": "/path/to/openclaw.log"
  }
}
```

## [​](https://docs.openclaw.ai/logging\#how-to-read-logs)  How to read logs

### [​](https://docs.openclaw.ai/logging\#cli:-live-tail-recommended)  CLI: live tail (recommended)

Use the CLI to tail the gateway log file via RPC:

Copy

```
openclaw logs --follow
```

Output modes:

- **TTY sessions**: pretty, colorized, structured log lines.
- **Non-TTY sessions**: plain text.
- `--json`: line-delimited JSON (one log event per line).
- `--plain`: force plain text in TTY sessions.
- `--no-color`: disable ANSI colors.

In JSON mode, the CLI emits `type`-tagged objects:

- `meta`: stream metadata (file, cursor, size)
- `log`: parsed log entry
- `notice`: truncation / rotation hints
- `raw`: unparsed log line

If the Gateway is unreachable, the CLI prints a short hint to run:

Copy

```
openclaw doctor
```

### [​](https://docs.openclaw.ai/logging\#control-ui-web)  Control UI (web)

The Control UI’s **Logs** tab tails the same file using `logs.tail`.
See [/web/control-ui](https://docs.openclaw.ai/web/control-ui) for how to open it.

### [​](https://docs.openclaw.ai/logging\#channel-only-logs)  Channel-only logs

To filter channel activity (WhatsApp/Telegram/etc), use:

Copy

```
openclaw channels logs --channel whatsapp
```

## [​](https://docs.openclaw.ai/logging\#log-formats)  Log formats

### [​](https://docs.openclaw.ai/logging\#file-logs-jsonl)  File logs (JSONL)

Each line in the log file is a JSON object. The CLI and Control UI parse these
entries to render structured output (time, level, subsystem, message).

### [​](https://docs.openclaw.ai/logging\#console-output)  Console output

Console logs are **TTY-aware** and formatted for readability:

- Subsystem prefixes (e.g. `gateway/channels/whatsapp`)
- Level coloring (info/warn/error)
- Optional compact or JSON mode

Console formatting is controlled by `logging.consoleStyle`.

## [​](https://docs.openclaw.ai/logging\#configuring-logging)  Configuring logging

All logging configuration lives under `logging` in `~/.openclaw/openclaw.json`.

Copy

```
{
  "logging": {
    "level": "info",
    "file": "/tmp/openclaw/openclaw-YYYY-MM-DD.log",
    "consoleLevel": "info",
    "consoleStyle": "pretty",
    "redactSensitive": "tools",
    "redactPatterns": [\
      "sk-.*"\
    ]
  }
}
```

### [​](https://docs.openclaw.ai/logging\#log-levels)  Log levels

- `logging.level`: **file logs** (JSONL) level.
- `logging.consoleLevel`: **console** verbosity level.

`--verbose` only affects console output; it does not change file log levels.

### [​](https://docs.openclaw.ai/logging\#console-styles)  Console styles

`logging.consoleStyle`:

- `pretty`: human-friendly, colored, with timestamps.
- `compact`: tighter output (best for long sessions).
- `json`: JSON per line (for log processors).

### [​](https://docs.openclaw.ai/logging\#redaction)  Redaction

Tool summaries can redact sensitive tokens before they hit the console:

- `logging.redactSensitive`: `off` \| `tools` (default: `tools`)
- `logging.redactPatterns`: list of regex strings to override the default set

Redaction affects **console output only** and does not alter file logs.

## [​](https://docs.openclaw.ai/logging\#diagnostics-+-opentelemetry)  Diagnostics + OpenTelemetry

Diagnostics are structured, machine-readable events for model runs **and**
message-flow telemetry (webhooks, queueing, session state). They do **not**
replace logs; they exist to feed metrics, traces, and other exporters.Diagnostics events are emitted in-process, but exporters only attach when
diagnostics + the exporter plugin are enabled.

### [​](https://docs.openclaw.ai/logging\#opentelemetry-vs-otlp)  OpenTelemetry vs OTLP

- **OpenTelemetry (OTel)**: the data model + SDKs for traces, metrics, and logs.
- **OTLP**: the wire protocol used to export OTel data to a collector/backend.
- OpenClaw exports via **OTLP/HTTP (protobuf)** today.

### [​](https://docs.openclaw.ai/logging\#signals-exported)  Signals exported

- **Metrics**: counters + histograms (token usage, message flow, queueing).
- **Traces**: spans for model usage + webhook/message processing.
- **Logs**: exported over OTLP when `diagnostics.otel.logs` is enabled. Log
volume can be high; keep `logging.level` and exporter filters in mind.

### [​](https://docs.openclaw.ai/logging\#diagnostic-event-catalog)  Diagnostic event catalog

Model usage:

- `model.usage`: tokens, cost, duration, context, provider/model/channel, session ids.

Message flow:

- `webhook.received`: webhook ingress per channel.
- `webhook.processed`: webhook handled + duration.
- `webhook.error`: webhook handler errors.
- `message.queued`: message enqueued for processing.
- `message.processed`: outcome + duration + optional error.

Queue + session:

- `queue.lane.enqueue`: command queue lane enqueue + depth.
- `queue.lane.dequeue`: command queue lane dequeue + wait time.
- `session.state`: session state transition + reason.
- `session.stuck`: session stuck warning + age.
- `run.attempt`: run retry/attempt metadata.
- `diagnostic.heartbeat`: aggregate counters (webhooks/queue/session).

### [​](https://docs.openclaw.ai/logging\#enable-diagnostics-no-exporter)  Enable diagnostics (no exporter)

Use this if you want diagnostics events available to plugins or custom sinks:

Copy

```
{
  "diagnostics": {
    "enabled": true
  }
}
```

### [​](https://docs.openclaw.ai/logging\#diagnostics-flags-targeted-logs)  Diagnostics flags (targeted logs)

Use flags to turn on extra, targeted debug logs without raising `logging.level`.
Flags are case-insensitive and support wildcards (e.g. `telegram.*` or `*`).

Copy

```
{
  "diagnostics": {
    "flags": ["telegram.http"]
  }
}
```

Env override (one-off):

Copy

```
OPENCLAW_DIAGNOSTICS=telegram.http,telegram.payload
```

Notes:

- Flag logs go to the standard log file (same as `logging.file`).
- Output is still redacted according to `logging.redactSensitive`.
- Full guide: [/diagnostics/flags](https://docs.openclaw.ai/diagnostics/flags).

### [​](https://docs.openclaw.ai/logging\#export-to-opentelemetry)  Export to OpenTelemetry

Diagnostics can be exported via the `diagnostics-otel` plugin (OTLP/HTTP). This
works with any OpenTelemetry collector/backend that accepts OTLP/HTTP.

Copy

```
{
  "plugins": {
    "allow": ["diagnostics-otel"],
    "entries": {
      "diagnostics-otel": {
        "enabled": true
      }
    }
  },
  "diagnostics": {
    "enabled": true,
    "otel": {
      "enabled": true,
      "endpoint": "http://otel-collector:4318",
      "protocol": "http/protobuf",
      "serviceName": "openclaw-gateway",
      "traces": true,
      "metrics": true,
      "logs": true,
      "sampleRate": 0.2,
      "flushIntervalMs": 60000
    }
  }
}
```

Notes:

- You can also enable the plugin with `openclaw plugins enable diagnostics-otel`.
- `protocol` currently supports `http/protobuf` only. `grpc` is ignored.
- Metrics include token usage, cost, context size, run duration, and message-flow
counters/histograms (webhooks, queueing, session state, queue depth/wait).
- Traces/metrics can be toggled with `traces` / `metrics` (default: on). Traces
include model usage spans plus webhook/message processing spans when enabled.
- Set `headers` when your collector requires auth.
- Environment variables supported: `OTEL_EXPORTER_OTLP_ENDPOINT`,
`OTEL_SERVICE_NAME`, `OTEL_EXPORTER_OTLP_PROTOCOL`.

### [​](https://docs.openclaw.ai/logging\#exported-metrics-names-+-types)  Exported metrics (names + types)

Model usage:

- `openclaw.tokens` (counter, attrs: `openclaw.token`, `openclaw.channel`,
`openclaw.provider`, `openclaw.model`)
- `openclaw.cost.usd` (counter, attrs: `openclaw.channel`, `openclaw.provider`,
`openclaw.model`)
- `openclaw.run.duration_ms` (histogram, attrs: `openclaw.channel`,
`openclaw.provider`, `openclaw.model`)
- `openclaw.context.tokens` (histogram, attrs: `openclaw.context`,
`openclaw.channel`, `openclaw.provider`, `openclaw.model`)

Message flow:

- `openclaw.webhook.received` (counter, attrs: `openclaw.channel`,
`openclaw.webhook`)
- `openclaw.webhook.error` (counter, attrs: `openclaw.channel`,
`openclaw.webhook`)
- `openclaw.webhook.duration_ms` (histogram, attrs: `openclaw.channel`,
`openclaw.webhook`)
- `openclaw.message.queued` (counter, attrs: `openclaw.channel`,
`openclaw.source`)
- `openclaw.message.processed` (counter, attrs: `openclaw.channel`,
`openclaw.outcome`)
- `openclaw.message.duration_ms` (histogram, attrs: `openclaw.channel`,
`openclaw.outcome`)

Queues + sessions:

- `openclaw.queue.lane.enqueue` (counter, attrs: `openclaw.lane`)
- `openclaw.queue.lane.dequeue` (counter, attrs: `openclaw.lane`)
- `openclaw.queue.depth` (histogram, attrs: `openclaw.lane` or
`openclaw.channel=heartbeat`)
- `openclaw.queue.wait_ms` (histogram, attrs: `openclaw.lane`)
- `openclaw.session.state` (counter, attrs: `openclaw.state`, `openclaw.reason`)
- `openclaw.session.stuck` (counter, attrs: `openclaw.state`)
- `openclaw.session.stuck_age_ms` (histogram, attrs: `openclaw.state`)
- `openclaw.run.attempt` (counter, attrs: `openclaw.attempt`)

### [​](https://docs.openclaw.ai/logging\#exported-spans-names-+-key-attributes)  Exported spans (names + key attributes)

- `openclaw.model.usage`
  - `openclaw.channel`, `openclaw.provider`, `openclaw.model`
  - `openclaw.sessionKey`, `openclaw.sessionId`
  - `openclaw.tokens.*` (input/output/cache\_read/cache\_write/total)
- `openclaw.webhook.processed`
  - `openclaw.channel`, `openclaw.webhook`, `openclaw.chatId`
- `openclaw.webhook.error`
  - `openclaw.channel`, `openclaw.webhook`, `openclaw.chatId`,
    `openclaw.error`
- `openclaw.message.processed`
  - `openclaw.channel`, `openclaw.outcome`, `openclaw.chatId`,
    `openclaw.messageId`, `openclaw.sessionKey`, `openclaw.sessionId`,
    `openclaw.reason`
- `openclaw.session.stuck`
  - `openclaw.state`, `openclaw.ageMs`, `openclaw.queueDepth`,
    `openclaw.sessionKey`, `openclaw.sessionId`

### [​](https://docs.openclaw.ai/logging\#sampling-+-flushing)  Sampling + flushing

- Trace sampling: `diagnostics.otel.sampleRate` (0.0–1.0, root spans only).
- Metric export interval: `diagnostics.otel.flushIntervalMs` (min 1000ms).

### [​](https://docs.openclaw.ai/logging\#protocol-notes)  Protocol notes

- OTLP/HTTP endpoints can be set via `diagnostics.otel.endpoint` or
`OTEL_EXPORTER_OTLP_ENDPOINT`.
- If the endpoint already contains `/v1/traces` or `/v1/metrics`, it is used as-is.
- If the endpoint already contains `/v1/logs`, it is used as-is for logs.
- `diagnostics.otel.logs` enables OTLP log export for the main logger output.

### [​](https://docs.openclaw.ai/logging\#log-export-behavior)  Log export behavior

- OTLP logs use the same structured records written to `logging.file`.
- Respect `logging.level` (file log level). Console redaction does **not** apply
to OTLP logs.
- High-volume installs should prefer OTLP collector sampling/filtering.

## [​](https://docs.openclaw.ai/logging\#troubleshooting-tips)  Troubleshooting tips

- **Gateway not reachable?** Run `openclaw doctor` first.
- **Logs empty?** Check that the Gateway is running and writing to the file path
in `logging.file`.
- **Need more detail?** Set `logging.level` to `debug` or `trace` and retry.

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.