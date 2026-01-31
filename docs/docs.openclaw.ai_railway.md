---
url: "https://docs.openclaw.ai/railway"
title: "Deploy on Railway - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/railway#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

Install & Updates

Deploy on Railway

On this page

- [Quick checklist (new users)](https://docs.openclaw.ai/railway#quick-checklist-new-users)
- [One-click deploy](https://docs.openclaw.ai/railway#one-click-deploy)
- [What you get](https://docs.openclaw.ai/railway#what-you-get)
- [Required Railway settings](https://docs.openclaw.ai/railway#required-railway-settings)
- [Public Networking](https://docs.openclaw.ai/railway#public-networking)
- [Volume (required)](https://docs.openclaw.ai/railway#volume-required)
- [Variables](https://docs.openclaw.ai/railway#variables)
- [Setup flow](https://docs.openclaw.ai/railway#setup-flow)
- [Getting chat tokens](https://docs.openclaw.ai/railway#getting-chat-tokens)
- [Telegram bot token](https://docs.openclaw.ai/railway#telegram-bot-token)
- [Discord bot token](https://docs.openclaw.ai/railway#discord-bot-token)
- [Backups & migration](https://docs.openclaw.ai/railway#backups-%26-migration)

Deploy OpenClaw on Railway with a one-click template and finish setup in your browser.
This is the easiest “no terminal on the server” path: Railway runs the Gateway for you,
and you configure everything via the `/setup` web wizard.

## [​](https://docs.openclaw.ai/railway\#quick-checklist-new-users)  Quick checklist (new users)

1. Click **Deploy on Railway** (below).
2. Add a **Volume** mounted at `/data`.
3. Set the required **Variables** (at least `SETUP_PASSWORD`).
4. Enable **HTTP Proxy** on port `8080`.
5. Open `https://<your-railway-domain>/setup` and finish the wizard.

## [​](https://docs.openclaw.ai/railway\#one-click-deploy)  One-click deploy

[Deploy on Railway](https://railway.com/deploy/clawdbot-railway-template) After deploy, find your public URL in **Railway → your service → Settings → Domains**.Railway will either:

- give you a generated domain (often `https://<something>.up.railway.app`), or
- use your custom domain if you attached one.

Then open:

- `https://<your-railway-domain>/setup` — setup wizard (password protected)
- `https://<your-railway-domain>/openclaw` — Control UI

## [​](https://docs.openclaw.ai/railway\#what-you-get)  What you get

- Hosted OpenClaw Gateway + Control UI
- Web setup wizard at `/setup` (no terminal commands)
- Persistent storage via Railway Volume (`/data`) so config/credentials/workspace survive redeploys
- Backup export at `/setup/export` to migrate off Railway later

## [​](https://docs.openclaw.ai/railway\#required-railway-settings)  Required Railway settings

### [​](https://docs.openclaw.ai/railway\#public-networking)  Public Networking

Enable **HTTP Proxy** for the service.

- Port: `8080`

### [​](https://docs.openclaw.ai/railway\#volume-required)  Volume (required)

Attach a volume mounted at:

- `/data`

### [​](https://docs.openclaw.ai/railway\#variables)  Variables

Set these variables on the service:

- `SETUP_PASSWORD` (required)
- `PORT=8080` (required — must match the port in Public Networking)
- `OPENCLAW_STATE_DIR=/data/.openclaw` (recommended)
- `OPENCLAW_WORKSPACE_DIR=/data/workspace` (recommended)
- `OPENCLAW_GATEWAY_TOKEN` (recommended; treat as an admin secret)

## [​](https://docs.openclaw.ai/railway\#setup-flow)  Setup flow

1. Visit `https://<your-railway-domain>/setup` and enter your `SETUP_PASSWORD`.
2. Choose a model/auth provider and paste your key.
3. (Optional) Add Telegram/Discord/Slack tokens.
4. Click **Run setup**.

If Telegram DMs are set to pairing, the setup wizard can approve the pairing code.

## [​](https://docs.openclaw.ai/railway\#getting-chat-tokens)  Getting chat tokens

### [​](https://docs.openclaw.ai/railway\#telegram-bot-token)  Telegram bot token

1. Message `@BotFather` in Telegram
2. Run `/newbot`
3. Copy the token (looks like `123456789:AA...`)
4. Paste it into `/setup`

### [​](https://docs.openclaw.ai/railway\#discord-bot-token)  Discord bot token

1. Go to [https://discord.com/developers/applications](https://discord.com/developers/applications)
2. **New Application** → choose a name
3. **Bot** → **Add Bot**
4. **Enable MESSAGE CONTENT INTENT** under Bot → Privileged Gateway Intents (required or the bot will crash on startup)
5. Copy the **Bot Token** and paste into `/setup`
6. Invite the bot to your server (OAuth2 URL Generator; scopes: `bot`, `applications.commands`)

## [​](https://docs.openclaw.ai/railway\#backups-&-migration)  Backups & migration

Download a backup at:

- `https://<your-railway-domain>/setup/export`

This exports your OpenClaw state + workspace so you can migrate to another host without losing config or memory.

[Docker](https://docs.openclaw.ai/install/docker) [Deploy on Render](https://docs.openclaw.ai/render)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.