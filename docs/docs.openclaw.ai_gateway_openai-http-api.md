---
url: "https://docs.openclaw.ai/gateway/openai-http-api"
title: "Openai http api - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/gateway/openai-http-api#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [OpenAI Chat Completions (HTTP)](https://docs.openclaw.ai/gateway/openai-http-api#openai-chat-completions-http)
- [Authentication](https://docs.openclaw.ai/gateway/openai-http-api#authentication)
- [Choosing an agent](https://docs.openclaw.ai/gateway/openai-http-api#choosing-an-agent)
- [Enabling the endpoint](https://docs.openclaw.ai/gateway/openai-http-api#enabling-the-endpoint)
- [Disabling the endpoint](https://docs.openclaw.ai/gateway/openai-http-api#disabling-the-endpoint)
- [Session behavior](https://docs.openclaw.ai/gateway/openai-http-api#session-behavior)
- [Streaming (SSE)](https://docs.openclaw.ai/gateway/openai-http-api#streaming-sse)
- [Examples](https://docs.openclaw.ai/gateway/openai-http-api#examples)

# [​](https://docs.openclaw.ai/gateway/openai-http-api\#openai-chat-completions-http)  OpenAI Chat Completions (HTTP)

OpenClaw’s Gateway can serve a small OpenAI-compatible Chat Completions endpoint.This endpoint is **disabled by default**. Enable it in config first.

- `POST /v1/chat/completions`
- Same port as the Gateway (WS + HTTP multiplex): `http://<gateway-host>:<port>/v1/chat/completions`

Under the hood, requests are executed as a normal Gateway agent run (same codepath as `openclaw agent`), so routing/permissions/config match your Gateway.

## [​](https://docs.openclaw.ai/gateway/openai-http-api\#authentication)  Authentication

Uses the Gateway auth configuration. Send a bearer token:

- `Authorization: Bearer <token>`

Notes:

- When `gateway.auth.mode="token"`, use `gateway.auth.token` (or `OPENCLAW_GATEWAY_TOKEN`).
- When `gateway.auth.mode="password"`, use `gateway.auth.password` (or `OPENCLAW_GATEWAY_PASSWORD`).

## [​](https://docs.openclaw.ai/gateway/openai-http-api\#choosing-an-agent)  Choosing an agent

No custom headers required: encode the agent id in the OpenAI `model` field:

- `model: "openclaw:<agentId>"` (example: `"openclaw:main"`, `"openclaw:beta"`)
- `model: "agent:<agentId>"` (alias)

Or target a specific OpenClaw agent by header:

- `x-openclaw-agent-id: <agentId>` (default: `main`)

Advanced:

- `x-openclaw-session-key: <sessionKey>` to fully control session routing.

## [​](https://docs.openclaw.ai/gateway/openai-http-api\#enabling-the-endpoint)  Enabling the endpoint

Set `gateway.http.endpoints.chatCompletions.enabled` to `true`:

Copy

```
{
  gateway: {
    http: {
      endpoints: {
        chatCompletions: { enabled: true }
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/gateway/openai-http-api\#disabling-the-endpoint)  Disabling the endpoint

Set `gateway.http.endpoints.chatCompletions.enabled` to `false`:

Copy

```
{
  gateway: {
    http: {
      endpoints: {
        chatCompletions: { enabled: false }
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/gateway/openai-http-api\#session-behavior)  Session behavior

By default the endpoint is **stateless per request** (a new session key is generated each call).If the request includes an OpenAI `user` string, the Gateway derives a stable session key from it, so repeated calls can share an agent session.

## [​](https://docs.openclaw.ai/gateway/openai-http-api\#streaming-sse)  Streaming (SSE)

Set `stream: true` to receive Server-Sent Events (SSE):

- `Content-Type: text/event-stream`
- Each event line is `data: <json>`
- Stream ends with `data: [DONE]`

## [​](https://docs.openclaw.ai/gateway/openai-http-api\#examples)  Examples

Non-streaming:

Copy

```
curl -sS http://127.0.0.1:18789/v1/chat/completions \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'x-openclaw-agent-id: main' \
  -d '{
    "model": "openclaw",
    "messages": [{"role":"user","content":"hi"}]
  }'
```

Streaming:

Copy

```
curl -N http://127.0.0.1:18789/v1/chat/completions \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'x-openclaw-agent-id: main' \
  -d '{
    "model": "openclaw",
    "stream": true,
    "messages": [{"role":"user","content":"hi"}]
  }'
```

[Authentication](https://docs.openclaw.ai/gateway/authentication) [Tools invoke http api](https://docs.openclaw.ai/gateway/tools-invoke-http-api)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.