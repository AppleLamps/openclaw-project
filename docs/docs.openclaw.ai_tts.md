---
url: "https://docs.openclaw.ai/tts"
title: "Tts - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/tts#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Text-to-speech (TTS)](https://docs.openclaw.ai/tts#text-to-speech-tts)
- [Supported services](https://docs.openclaw.ai/tts#supported-services)
- [Edge TTS notes](https://docs.openclaw.ai/tts#edge-tts-notes)
- [Optional keys](https://docs.openclaw.ai/tts#optional-keys)
- [Service links](https://docs.openclaw.ai/tts#service-links)
- [Is it enabled by default?](https://docs.openclaw.ai/tts#is-it-enabled-by-default)
- [Config](https://docs.openclaw.ai/tts#config)
- [Minimal config (enable + provider)](https://docs.openclaw.ai/tts#minimal-config-enable-%2B-provider)
- [OpenAI primary with ElevenLabs fallback](https://docs.openclaw.ai/tts#openai-primary-with-elevenlabs-fallback)
- [Edge TTS primary (no API key)](https://docs.openclaw.ai/tts#edge-tts-primary-no-api-key)
- [Disable Edge TTS](https://docs.openclaw.ai/tts#disable-edge-tts)
- [Custom limits + prefs path](https://docs.openclaw.ai/tts#custom-limits-%2B-prefs-path)
- [Only reply with audio after an inbound voice note](https://docs.openclaw.ai/tts#only-reply-with-audio-after-an-inbound-voice-note)
- [Disable auto-summary for long replies](https://docs.openclaw.ai/tts#disable-auto-summary-for-long-replies)
- [Notes on fields](https://docs.openclaw.ai/tts#notes-on-fields)
- [Model-driven overrides (default on)](https://docs.openclaw.ai/tts#model-driven-overrides-default-on)
- [Per-user preferences](https://docs.openclaw.ai/tts#per-user-preferences)
- [Output formats (fixed)](https://docs.openclaw.ai/tts#output-formats-fixed)
- [Auto-TTS behavior](https://docs.openclaw.ai/tts#auto-tts-behavior)
- [Flow diagram](https://docs.openclaw.ai/tts#flow-diagram)
- [Slash command usage](https://docs.openclaw.ai/tts#slash-command-usage)
- [Agent tool](https://docs.openclaw.ai/tts#agent-tool)
- [Gateway RPC](https://docs.openclaw.ai/tts#gateway-rpc)

# [​](https://docs.openclaw.ai/tts\#text-to-speech-tts)  Text-to-speech (TTS)

OpenClaw can convert outbound replies into audio using ElevenLabs, OpenAI, or Edge TTS.
It works anywhere OpenClaw can send audio; Telegram gets a round voice-note bubble.

## [​](https://docs.openclaw.ai/tts\#supported-services)  Supported services

- **ElevenLabs** (primary or fallback provider)
- **OpenAI** (primary or fallback provider; also used for summaries)
- **Edge TTS** (primary or fallback provider; uses `node-edge-tts`, default when no API keys)

### [​](https://docs.openclaw.ai/tts\#edge-tts-notes)  Edge TTS notes

Edge TTS uses Microsoft Edge’s online neural TTS service via the `node-edge-tts`
library. It’s a hosted service (not local), uses Microsoft’s endpoints, and does
not require an API key. `node-edge-tts` exposes speech configuration options and
output formats, but not all options are supported by the Edge service. citeturn2search0Because Edge TTS is a public web service without a published SLA or quota, treat it
as best-effort. If you need guaranteed limits and support, use OpenAI or ElevenLabs.
Microsoft’s Speech REST API documents a 10‑minute audio limit per request; Edge TTS
does not publish limits, so assume similar or lower limits. citeturn0search3

## [​](https://docs.openclaw.ai/tts\#optional-keys)  Optional keys

If you want OpenAI or ElevenLabs:

- `ELEVENLABS_API_KEY` (or `XI_API_KEY`)
- `OPENAI_API_KEY`

Edge TTS does **not** require an API key. If no API keys are found, OpenClaw defaults
to Edge TTS (unless disabled via `messages.tts.edge.enabled=false`).If multiple providers are configured, the selected provider is used first and the others are fallback options.
Auto-summary uses the configured `summaryModel` (or `agents.defaults.model.primary`),
so that provider must also be authenticated if you enable summaries.

## [​](https://docs.openclaw.ai/tts\#service-links)  Service links

- [OpenAI Text-to-Speech guide](https://platform.openai.com/docs/guides/text-to-speech)
- [OpenAI Audio API reference](https://platform.openai.com/docs/api-reference/audio)
- [ElevenLabs Text to Speech](https://elevenlabs.io/docs/api-reference/text-to-speech)
- [ElevenLabs Authentication](https://elevenlabs.io/docs/api-reference/authentication)
- [node-edge-tts](https://github.com/SchneeHertz/node-edge-tts)
- [Microsoft Speech output formats](https://learn.microsoft.com/azure/ai-services/speech-service/rest-text-to-speech#audio-outputs)

## [​](https://docs.openclaw.ai/tts\#is-it-enabled-by-default)  Is it enabled by default?

No. Auto‑TTS is **off** by default. Enable it in config with
`messages.tts.auto` or per session with `/tts always` (alias: `/tts on`).Edge TTS **is** enabled by default once TTS is on, and is used automatically
when no OpenAI or ElevenLabs API keys are available.

## [​](https://docs.openclaw.ai/tts\#config)  Config

TTS config lives under `messages.tts` in `openclaw.json`.
Full schema is in [Gateway configuration](https://docs.openclaw.ai/gateway/configuration).

### [​](https://docs.openclaw.ai/tts\#minimal-config-enable-+-provider)  Minimal config (enable + provider)

Copy

```
{
  messages: {
    tts: {
      auto: "always",
      provider: "elevenlabs"
    }
  }
}
```

### [​](https://docs.openclaw.ai/tts\#openai-primary-with-elevenlabs-fallback)  OpenAI primary with ElevenLabs fallback

Copy

```
{
  messages: {
    tts: {
      auto: "always",
      provider: "openai",
      summaryModel: "openai/gpt-4.1-mini",
      modelOverrides: {
        enabled: true
      },
      openai: {
        apiKey: "openai_api_key",
        model: "gpt-4o-mini-tts",
        voice: "alloy"
      },
      elevenlabs: {
        apiKey: "elevenlabs_api_key",
        baseUrl: "https://api.elevenlabs.io",
        voiceId: "voice_id",
        modelId: "eleven_multilingual_v2",
        seed: 42,
        applyTextNormalization: "auto",
        languageCode: "en",
        voiceSettings: {
          stability: 0.5,
          similarityBoost: 0.75,
          style: 0.0,
          useSpeakerBoost: true,
          speed: 1.0
        }
      }
    }
  }
}
```

### [​](https://docs.openclaw.ai/tts\#edge-tts-primary-no-api-key)  Edge TTS primary (no API key)

Copy

```
{
  messages: {
    tts: {
      auto: "always",
      provider: "edge",
      edge: {
        enabled: true,
        voice: "en-US-MichelleNeural",
        lang: "en-US",
        outputFormat: "audio-24khz-48kbitrate-mono-mp3",
        rate: "+10%",
        pitch: "-5%"
      }
    }
  }
}
```

### [​](https://docs.openclaw.ai/tts\#disable-edge-tts)  Disable Edge TTS

Copy

```
{
  messages: {
    tts: {
      edge: {
        enabled: false
      }
    }
  }
}
```

### [​](https://docs.openclaw.ai/tts\#custom-limits-+-prefs-path)  Custom limits + prefs path

Copy

```
{
  messages: {
    tts: {
      auto: "always",
      maxTextLength: 4000,
      timeoutMs: 30000,
      prefsPath: "~/.openclaw/settings/tts.json"
    }
  }
}
```

### [​](https://docs.openclaw.ai/tts\#only-reply-with-audio-after-an-inbound-voice-note)  Only reply with audio after an inbound voice note

Copy

```
{
  messages: {
    tts: {
      auto: "inbound"
    }
  }
}
```

### [​](https://docs.openclaw.ai/tts\#disable-auto-summary-for-long-replies)  Disable auto-summary for long replies

Copy

```
{
  messages: {
    tts: {
      auto: "always"
    }
  }
}
```

Then run:

Copy

```
/tts summary off
```

### [​](https://docs.openclaw.ai/tts\#notes-on-fields)  Notes on fields

- `auto`: auto‑TTS mode (`off`, `always`, `inbound`, `tagged`).

  - `inbound` only sends audio after an inbound voice note.
  - `tagged` only sends audio when the reply includes `[[tts]]` tags.
- `enabled`: legacy toggle (doctor migrates this to `auto`).
- `mode`: `"final"` (default) or `"all"` (includes tool/block replies).
- `provider`: `"elevenlabs"`, `"openai"`, or `"edge"` (fallback is automatic).
- If `provider` is **unset**, OpenClaw prefers `openai` (if key), then `elevenlabs` (if key),
otherwise `edge`.
- `summaryModel`: optional cheap model for auto-summary; defaults to `agents.defaults.model.primary`.

  - Accepts `provider/model` or a configured model alias.
- `modelOverrides`: allow the model to emit TTS directives (on by default).
- `maxTextLength`: hard cap for TTS input (chars). `/tts audio` fails if exceeded.
- `timeoutMs`: request timeout (ms).
- `prefsPath`: override the local prefs JSON path (provider/limit/summary).
- `apiKey` values fall back to env vars (`ELEVENLABS_API_KEY`/`XI_API_KEY`, `OPENAI_API_KEY`).
- `elevenlabs.baseUrl`: override ElevenLabs API base URL.
- `elevenlabs.voiceSettings`:

  - `stability`, `similarityBoost`, `style`: `0..1`
  - `useSpeakerBoost`: `true|false`
  - `speed`: `0.5..2.0` (1.0 = normal)
- `elevenlabs.applyTextNormalization`: `auto|on|off`
- `elevenlabs.languageCode`: 2-letter ISO 639-1 (e.g. `en`, `de`)
- `elevenlabs.seed`: integer `0..4294967295` (best-effort determinism)
- `edge.enabled`: allow Edge TTS usage (default `true`; no API key).
- `edge.voice`: Edge neural voice name (e.g. `en-US-MichelleNeural`).
- `edge.lang`: language code (e.g. `en-US`).
- `edge.outputFormat`: Edge output format (e.g. `audio-24khz-48kbitrate-mono-mp3`).

  - See Microsoft Speech output formats for valid values; not all formats are supported by Edge.
- `edge.rate` / `edge.pitch` / `edge.volume`: percent strings (e.g. `+10%`, `-5%`).
- `edge.saveSubtitles`: write JSON subtitles alongside the audio file.
- `edge.proxy`: proxy URL for Edge TTS requests.
- `edge.timeoutMs`: request timeout override (ms).

## [​](https://docs.openclaw.ai/tts\#model-driven-overrides-default-on)  Model-driven overrides (default on)

By default, the model **can** emit TTS directives for a single reply.
When `messages.tts.auto` is `tagged`, these directives are required to trigger audio.When enabled, the model can emit `[[tts:...]]` directives to override the voice
for a single reply, plus an optional `[[tts:text]]...[[/tts:text]]` block to
provide expressive tags (laughter, singing cues, etc) that should only appear in
the audio.Example reply payload:

Copy

```
Here you go.

[[tts:provider=elevenlabs voiceId=pMsXgVXv3BLzUgSXRplE model=eleven_v3 speed=1.1]]
[[tts:text]](laughs) Read the song once more.[[/tts:text]]
```

Available directive keys (when enabled):

- `provider` (`openai` \| `elevenlabs` \| `edge`)
- `voice` (OpenAI voice) or `voiceId` (ElevenLabs)
- `model` (OpenAI TTS model or ElevenLabs model id)
- `stability`, `similarityBoost`, `style`, `speed`, `useSpeakerBoost`
- `applyTextNormalization` (`auto|on|off`)
- `languageCode` (ISO 639-1)
- `seed`

Disable all model overrides:

Copy

```
{
  messages: {
    tts: {
      modelOverrides: {
        enabled: false
      }
    }
  }
}
```

Optional allowlist (disable specific overrides while keeping tags enabled):

Copy

```
{
  messages: {
    tts: {
      modelOverrides: {
        enabled: true,
        allowProvider: false,
        allowSeed: false
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/tts\#per-user-preferences)  Per-user preferences

Slash commands write local overrides to `prefsPath` (default:
`~/.openclaw/settings/tts.json`, override with `OPENCLAW_TTS_PREFS` or
`messages.tts.prefsPath`).Stored fields:

- `enabled`
- `provider`
- `maxLength` (summary threshold; default 1500 chars)
- `summarize` (default `true`)

These override `messages.tts.*` for that host.

## [​](https://docs.openclaw.ai/tts\#output-formats-fixed)  Output formats (fixed)

- **Telegram**: Opus voice note (`opus_48000_64` from ElevenLabs, `opus` from OpenAI).

  - 48kHz / 64kbps is a good voice-note tradeoff and required for the round bubble.
- **Other channels**: MP3 (`mp3_44100_128` from ElevenLabs, `mp3` from OpenAI).

  - 44.1kHz / 128kbps is the default balance for speech clarity.
- **Edge TTS**: uses `edge.outputFormat` (default `audio-24khz-48kbitrate-mono-mp3`).

  - `node-edge-tts` accepts an `outputFormat`, but not all formats are available
    from the Edge service. citeturn2search0
  - Output format values follow Microsoft Speech output formats (including Ogg/WebM Opus). citeturn1search0
  - Telegram `sendVoice` accepts OGG/MP3/M4A; use OpenAI/ElevenLabs if you need
    guaranteed Opus voice notes. citeturn1search1
  - If the configured Edge output format fails, OpenClaw retries with MP3.

OpenAI/ElevenLabs formats are fixed; Telegram expects Opus for voice-note UX.

## [​](https://docs.openclaw.ai/tts\#auto-tts-behavior)  Auto-TTS behavior

When enabled, OpenClaw:

- skips TTS if the reply already contains media or a `MEDIA:` directive.
- skips very short replies (< 10 chars).
- summarizes long replies when enabled using `agents.defaults.model.primary` (or `summaryModel`).
- attaches the generated audio to the reply.

If the reply exceeds `maxLength` and summary is off (or no API key for the
summary model), audio
is skipped and the normal text reply is sent.

## [​](https://docs.openclaw.ai/tts\#flow-diagram)  Flow diagram

Copy

```
Reply -> TTS enabled?
  no  -> send text
  yes -> has media / MEDIA: / short?
          yes -> send text
          no  -> length > limit?
                   no  -> TTS -> attach audio
                   yes -> summary enabled?
                            no  -> send text
                            yes -> summarize (summaryModel or agents.defaults.model.primary)
                                      -> TTS -> attach audio
```

## [​](https://docs.openclaw.ai/tts\#slash-command-usage)  Slash command usage

There is a single command: `/tts`.
See [Slash commands](https://docs.openclaw.ai/tools/slash-commands) for enablement details.Discord note: `/tts` is a built-in Discord command, so OpenClaw registers
`/voice` as the native command there. Text `/tts ...` still works.

Copy

```
/tts off
/tts always
/tts inbound
/tts tagged
/tts status
/tts provider openai
/tts limit 2000
/tts summary off
/tts audio Hello from OpenClaw
```

Notes:

- Commands require an authorized sender (allowlist/owner rules still apply).
- `commands.text` or native command registration must be enabled.
- `off|always|inbound|tagged` are per‑session toggles (`/tts on` is an alias for `/tts always`).
- `limit` and `summary` are stored in local prefs, not the main config.
- `/tts audio` generates a one-off audio reply (does not toggle TTS on).

## [​](https://docs.openclaw.ai/tts\#agent-tool)  Agent tool

The `tts` tool converts text to speech and returns a `MEDIA:` path. When the
result is Telegram-compatible, the tool includes `[[audio_as_voice]]` so
Telegram sends a voice bubble.

## [​](https://docs.openclaw.ai/tts\#gateway-rpc)  Gateway RPC

Gateway methods:

- `tts.status`
- `tts.enable`
- `tts.disable`
- `tts.convert`
- `tts.setProvider`
- `tts.providers`

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.