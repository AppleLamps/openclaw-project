---
url: "https://docs.openclaw.ai/platforms"
title: "Index - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/platforms#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Platforms](https://docs.openclaw.ai/platforms#platforms)
- [Choose your OS](https://docs.openclaw.ai/platforms#choose-your-os)
- [VPS & hosting](https://docs.openclaw.ai/platforms#vps-%26-hosting)
- [Common links](https://docs.openclaw.ai/platforms#common-links)
- [Gateway service install (CLI)](https://docs.openclaw.ai/platforms#gateway-service-install-cli)

# [​](https://docs.openclaw.ai/platforms\#platforms)  Platforms

OpenClaw core is written in TypeScript. **Node is the recommended runtime**.
Bun is not recommended for the Gateway (WhatsApp/Telegram bugs).Companion apps exist for macOS (menu bar app) and mobile nodes (iOS/Android). Windows and
Linux companion apps are planned, but the Gateway is fully supported today.
Native companion apps for Windows are also planned; the Gateway is recommended via WSL2.

## [​](https://docs.openclaw.ai/platforms\#choose-your-os)  Choose your OS

- macOS: [macOS](https://docs.openclaw.ai/platforms/macos)
- iOS: [iOS](https://docs.openclaw.ai/platforms/ios)
- Android: [Android](https://docs.openclaw.ai/platforms/android)
- Windows: [Windows](https://docs.openclaw.ai/platforms/windows)
- Linux: [Linux](https://docs.openclaw.ai/platforms/linux)

## [​](https://docs.openclaw.ai/platforms\#vps-&-hosting)  VPS & hosting

- VPS hub: [VPS hosting](https://docs.openclaw.ai/vps)
- Fly.io: [Fly.io](https://docs.openclaw.ai/platforms/fly)
- Hetzner (Docker): [Hetzner](https://docs.openclaw.ai/platforms/hetzner)
- GCP (Compute Engine): [GCP](https://docs.openclaw.ai/platforms/gcp)
- exe.dev (VM + HTTPS proxy): [exe.dev](https://docs.openclaw.ai/platforms/exe-dev)

## [​](https://docs.openclaw.ai/platforms\#common-links)  Common links

- Install guide: [Getting Started](https://docs.openclaw.ai/start/getting-started)
- Gateway runbook: [Gateway](https://docs.openclaw.ai/gateway)
- Gateway configuration: [Configuration](https://docs.openclaw.ai/gateway/configuration)
- Service status: `openclaw gateway status`

## [​](https://docs.openclaw.ai/platforms\#gateway-service-install-cli)  Gateway service install (CLI)

Use one of these (all supported):

- Wizard (recommended): `openclaw onboard --install-daemon`
- Direct: `openclaw gateway install`
- Configure flow: `openclaw configure` → select **Gateway service**
- Repair/migrate: `openclaw doctor` (offers to install or fix the service)

The service target depends on OS:

- macOS: LaunchAgent (`bot.molt.gateway` or `bot.molt.<profile>`; legacy `com.openclaw.*`)
- Linux/WSL2: systemd user service (`openclaw-gateway[-<profile>].service`)

[Talk](https://docs.openclaw.ai/nodes/talk) [Macos](https://docs.openclaw.ai/platforms/macos)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.