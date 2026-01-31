---
url: "https://docs.openclaw.ai/web/dashboard"
title: "Dashboard - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/web/dashboard#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Dashboard (Control UI)](https://docs.openclaw.ai/web/dashboard#dashboard-control-ui)
- [Fast path (recommended)](https://docs.openclaw.ai/web/dashboard#fast-path-recommended)
- [Token basics (local vs remote)](https://docs.openclaw.ai/web/dashboard#token-basics-local-vs-remote)
- [If you see “unauthorized” / 1008](https://docs.openclaw.ai/web/dashboard#if-you-see-%E2%80%9Cunauthorized%E2%80%9D-%2F-1008)

# [​](https://docs.openclaw.ai/web/dashboard\#dashboard-control-ui)  Dashboard (Control UI)

The Gateway dashboard is the browser Control UI served at `/` by default
(override with `gateway.controlUi.basePath`).Quick open (local Gateway):

- [http://127.0.0.1:18789/](http://127.0.0.1:18789/) (or [http://localhost:18789/](http://localhost:18789/))

Key references:

- [Control UI](https://docs.openclaw.ai/web/control-ui) for usage and UI capabilities.
- [Tailscale](https://docs.openclaw.ai/gateway/tailscale) for Serve/Funnel automation.
- [Web surfaces](https://docs.openclaw.ai/web) for bind modes and security notes.

Authentication is enforced at the WebSocket handshake via `connect.params.auth`
(token or password). See `gateway.auth` in [Gateway configuration](https://docs.openclaw.ai/gateway/configuration).Security note: the Control UI is an **admin surface** (chat, config, exec approvals).
Do not expose it publicly. The UI stores the token in `localStorage` after first load.
Prefer localhost, Tailscale Serve, or an SSH tunnel.

## [​](https://docs.openclaw.ai/web/dashboard\#fast-path-recommended)  Fast path (recommended)

- After onboarding, the CLI now auto-opens the dashboard with your token and prints the same tokenized link.
- Re-open anytime: `openclaw dashboard` (copies link, opens browser if possible, shows SSH hint if headless).
- The token stays local (query param only); the UI strips it after first load and saves it in localStorage.

## [​](https://docs.openclaw.ai/web/dashboard\#token-basics-local-vs-remote)  Token basics (local vs remote)

- **Localhost**: open `http://127.0.0.1:18789/`. If you see “unauthorized,” run `openclaw dashboard` and use the tokenized link (`?token=...`).
- **Token source**: `gateway.auth.token` (or `OPENCLAW_GATEWAY_TOKEN`); the UI stores it after first load.
- **Not localhost**: use Tailscale Serve (tokenless if `gateway.auth.allowTailscale: true`), tailnet bind with a token, or an SSH tunnel. See [Web surfaces](https://docs.openclaw.ai/web).

## [​](https://docs.openclaw.ai/web/dashboard\#if-you-see-%E2%80%9Cunauthorized%E2%80%9D-/-1008)  If you see “unauthorized” / 1008

- Run `openclaw dashboard` to get a fresh tokenized link.
- Ensure the gateway is reachable (local: `openclaw status`; remote: SSH tunnel `ssh -N -L 18789:127.0.0.1:18789 user@host` then open `http://127.0.0.1:18789/?token=...`).
- In the dashboard settings, paste the same token you configured in `gateway.auth.token` (or `OPENCLAW_GATEWAY_TOKEN`).

[Control ui](https://docs.openclaw.ai/web/control-ui) [Webchat](https://docs.openclaw.ai/web/webchat)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.