---
url: "https://docs.openclaw.ai/platforms/linux"
title: "Linux - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/platforms/linux#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Linux App](https://docs.openclaw.ai/platforms/linux#linux-app)
- [Beginner quick path (VPS)](https://docs.openclaw.ai/platforms/linux#beginner-quick-path-vps)
- [Install](https://docs.openclaw.ai/platforms/linux#install)
- [Gateway](https://docs.openclaw.ai/platforms/linux#gateway)
- [Gateway service install (CLI)](https://docs.openclaw.ai/platforms/linux#gateway-service-install-cli)
- [System control (systemd user unit)](https://docs.openclaw.ai/platforms/linux#system-control-systemd-user-unit)

# [​](https://docs.openclaw.ai/platforms/linux\#linux-app)  Linux App

The Gateway is fully supported on Linux. **Node is the recommended runtime**.
Bun is not recommended for the Gateway (WhatsApp/Telegram bugs).Native Linux companion apps are planned. Contributions are welcome if you want to help build one.

## [​](https://docs.openclaw.ai/platforms/linux\#beginner-quick-path-vps)  Beginner quick path (VPS)

1. Install Node 22+
2. `npm i -g openclaw@latest`
3. `openclaw onboard --install-daemon`
4. From your laptop: `ssh -N -L 18789:127.0.0.1:18789 <user>@<host>`
5. Open `http://127.0.0.1:18789/` and paste your token

Step-by-step VPS guide: [exe.dev](https://docs.openclaw.ai/platforms/exe-dev)

## [​](https://docs.openclaw.ai/platforms/linux\#install)  Install

- [Getting Started](https://docs.openclaw.ai/start/getting-started)
- [Install & updates](https://docs.openclaw.ai/install/updating)
- Optional flows: [Bun (experimental)](https://docs.openclaw.ai/install/bun), [Nix](https://docs.openclaw.ai/install/nix), [Docker](https://docs.openclaw.ai/install/docker)

## [​](https://docs.openclaw.ai/platforms/linux\#gateway)  Gateway

- [Gateway runbook](https://docs.openclaw.ai/gateway)
- [Configuration](https://docs.openclaw.ai/gateway/configuration)

## [​](https://docs.openclaw.ai/platforms/linux\#gateway-service-install-cli)  Gateway service install (CLI)

Use one of these:

Copy

```
openclaw onboard --install-daemon
```

Or:

Copy

```
openclaw gateway install
```

Or:

Copy

```
openclaw configure
```

Select **Gateway service** when prompted.Repair/migrate:

Copy

```
openclaw doctor
```

## [​](https://docs.openclaw.ai/platforms/linux\#system-control-systemd-user-unit)  System control (systemd user unit)

OpenClaw installs a systemd **user** service by default. Use a **system**
service for shared or always-on servers. The full unit example and guidance
live in the [Gateway runbook](https://docs.openclaw.ai/gateway).Minimal setup:Create `~/.config/systemd/user/openclaw-gateway[-<profile>].service`:

Copy

```
[Unit]
Description=OpenClaw Gateway (profile: <profile>, v<version>)
After=network-online.target
Wants=network-online.target

[Service]
ExecStart=/usr/local/bin/openclaw gateway --port 18789
Restart=always
RestartSec=5

[Install]
WantedBy=default.target
```

Enable it:

Copy

```
systemctl --user enable --now openclaw-gateway[-<profile>].service
```

[Windows](https://docs.openclaw.ai/platforms/windows) [Fly.io](https://docs.openclaw.ai/platforms/fly)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.