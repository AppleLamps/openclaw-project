---
url: "https://docs.openclaw.ai/plugins/voice-call"
title: "Voice call - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/plugins/voice-call#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Voice Call (plugin)](https://docs.openclaw.ai/plugins/voice-call#voice-call-plugin)
- [Where it runs (local vs remote)](https://docs.openclaw.ai/plugins/voice-call#where-it-runs-local-vs-remote)
- [Install](https://docs.openclaw.ai/plugins/voice-call#install)
- [Option A: install from npm (recommended)](https://docs.openclaw.ai/plugins/voice-call#option-a%3A-install-from-npm-recommended)
- [Option B: install from a local folder (dev, no copying)](https://docs.openclaw.ai/plugins/voice-call#option-b%3A-install-from-a-local-folder-dev%2C-no-copying)
- [Config](https://docs.openclaw.ai/plugins/voice-call#config)
- [TTS for calls](https://docs.openclaw.ai/plugins/voice-call#tts-for-calls)
- [More examples](https://docs.openclaw.ai/plugins/voice-call#more-examples)
- [Inbound calls](https://docs.openclaw.ai/plugins/voice-call#inbound-calls)
- [CLI](https://docs.openclaw.ai/plugins/voice-call#cli)
- [Agent tool](https://docs.openclaw.ai/plugins/voice-call#agent-tool)
- [Gateway RPC](https://docs.openclaw.ai/plugins/voice-call#gateway-rpc)

# [​](https://docs.openclaw.ai/plugins/voice-call\#voice-call-plugin)  Voice Call (plugin)

Voice calls for OpenClaw via a plugin. Supports outbound notifications and
multi-turn conversations with inbound policies.Current providers:

- `twilio` (Programmable Voice + Media Streams)
- `telnyx` (Call Control v2)
- `plivo` (Voice API + XML transfer + GetInput speech)
- `mock` (dev/no network)

Quick mental model:

- Install plugin
- Restart Gateway
- Configure under `plugins.entries.voice-call.config`
- Use `openclaw voicecall ...` or the `voice_call` tool

## [​](https://docs.openclaw.ai/plugins/voice-call\#where-it-runs-local-vs-remote)  Where it runs (local vs remote)

The Voice Call plugin runs **inside the Gateway process**.If you use a remote Gateway, install/configure the plugin on the **machine running the Gateway**, then restart the Gateway to load it.

## [​](https://docs.openclaw.ai/plugins/voice-call\#install)  Install

### [​](https://docs.openclaw.ai/plugins/voice-call\#option-a:-install-from-npm-recommended)  Option A: install from npm (recommended)

Copy

```
openclaw plugins install @openclaw/voice-call
```

Restart the Gateway afterwards.

### [​](https://docs.openclaw.ai/plugins/voice-call\#option-b:-install-from-a-local-folder-dev,-no-copying)  Option B: install from a local folder (dev, no copying)

Copy

```
openclaw plugins install ./extensions/voice-call
cd ./extensions/voice-call && pnpm install
```

Restart the Gateway afterwards.

## [​](https://docs.openclaw.ai/plugins/voice-call\#config)  Config

Set config under `plugins.entries.voice-call.config`:

Copy

```
{
  plugins: {
    entries: {
      "voice-call": {
        enabled: true,
        config: {
          provider: "twilio", // or "telnyx" | "plivo" | "mock"
          fromNumber: "+15550001234",
          toNumber: "+15550005678",

          twilio: {
            accountSid: "ACxxxxxxxx",
            authToken: "..."
          },

          plivo: {
            authId: "MAxxxxxxxxxxxxxxxxxxxx",
            authToken: "..."
          },

          // Webhook server
          serve: {
            port: 3334,
            path: "/voice/webhook"
          },

          // Public exposure (pick one)
          // publicUrl: "https://example.ngrok.app/voice/webhook",
          // tunnel: { provider: "ngrok" },
          // tailscale: { mode: "funnel", path: "/voice/webhook" }

          outbound: {
            defaultMode: "notify" // notify | conversation
          },

          streaming: {
            enabled: true,
            streamPath: "/voice/stream"
          }
        }
      }
    }
  }
}
```

Notes:

- Twilio/Telnyx require a **publicly reachable** webhook URL.
- Plivo requires a **publicly reachable** webhook URL.
- `mock` is a local dev provider (no network calls).
- `skipSignatureVerification` is for local testing only.
- If you use ngrok free tier, set `publicUrl` to the exact ngrok URL; signature verification is always enforced.
- `tunnel.allowNgrokFreeTierLoopbackBypass: true` allows Twilio webhooks with invalid signatures **only** when `tunnel.provider="ngrok"` and `serve.bind` is loopback (ngrok local agent). Use for local dev only.
- Ngrok free tier URLs can change or add interstitial behavior; if `publicUrl` drifts, Twilio signatures will fail. For production, prefer a stable domain or Tailscale funnel.

## [​](https://docs.openclaw.ai/plugins/voice-call\#tts-for-calls)  TTS for calls

Voice Call uses the core `messages.tts` configuration (OpenAI or ElevenLabs) for
streaming speech on calls. You can override it under the plugin config with the
**same shape** — it deep‑merges with `messages.tts`.

Copy

```
{
  tts: {
    provider: "elevenlabs",
    elevenlabs: {
      voiceId: "pMsXgVXv3BLzUgSXRplE",
      modelId: "eleven_multilingual_v2"
    }
  }
}
```

Notes:

- **Edge TTS is ignored for voice calls** (telephony audio needs PCM; Edge output is unreliable).
- Core TTS is used when Twilio media streaming is enabled; otherwise calls fall back to provider native voices.

### [​](https://docs.openclaw.ai/plugins/voice-call\#more-examples)  More examples

Use core TTS only (no override):

Copy

```
{
  messages: {
    tts: {
      provider: "openai",
      openai: { voice: "alloy" }
    }
  }
}
```

Override to ElevenLabs just for calls (keep core default elsewhere):

Copy

```
{
  plugins: {
    entries: {
      "voice-call": {
        config: {
          tts: {
            provider: "elevenlabs",
            elevenlabs: {
              apiKey: "elevenlabs_key",
              voiceId: "pMsXgVXv3BLzUgSXRplE",
              modelId: "eleven_multilingual_v2"
            }
          }
        }
      }
    }
  }
}
```

Override only the OpenAI model for calls (deep‑merge example):

Copy

```
{
  plugins: {
    entries: {
      "voice-call": {
        config: {
          tts: {
            openai: {
              model: "gpt-4o-mini-tts",
              voice: "marin"
            }
          }
        }
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/plugins/voice-call\#inbound-calls)  Inbound calls

Inbound policy defaults to `disabled`. To enable inbound calls, set:

Copy

```
{
  inboundPolicy: "allowlist",
  allowFrom: ["+15550001234"],
  inboundGreeting: "Hello! How can I help?"
}
```

Auto-responses use the agent system. Tune with:

- `responseModel`
- `responseSystemPrompt`
- `responseTimeoutMs`

## [​](https://docs.openclaw.ai/plugins/voice-call\#cli)  CLI

Copy

```
openclaw voicecall call --to "+15555550123" --message "Hello from OpenClaw"
openclaw voicecall continue --call-id <id> --message "Any questions?"
openclaw voicecall speak --call-id <id> --message "One moment"
openclaw voicecall end --call-id <id>
openclaw voicecall status --call-id <id>
openclaw voicecall tail
openclaw voicecall expose --mode funnel
```

## [​](https://docs.openclaw.ai/plugins/voice-call\#agent-tool)  Agent tool

Tool name: `voice_call`Actions:

- `initiate_call` (message, to?, mode?)
- `continue_call` (callId, message)
- `speak_to_user` (callId, message)
- `end_call` (callId)
- `get_status` (callId)

This repo ships a matching skill doc at `skills/voice-call/SKILL.md`.

## [​](https://docs.openclaw.ai/plugins/voice-call\#gateway-rpc)  Gateway RPC

- `voicecall.initiate` (`to?`, `message`, `mode?`)
- `voicecall.continue` (`callId`, `message`)
- `voicecall.speak` (`callId`, `message`)
- `voicecall.end` (`callId`)
- `voicecall.status` (`callId`)

[Plugin](https://docs.openclaw.ai/plugin) [Zalouser](https://docs.openclaw.ai/plugins/zalouser)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.