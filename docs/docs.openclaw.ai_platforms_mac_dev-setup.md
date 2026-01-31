---
url: "https://docs.openclaw.ai/platforms/mac/dev-setup"
title: "Dev setup - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/platforms/mac/dev-setup#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [macOS Developer Setup](https://docs.openclaw.ai/platforms/mac/dev-setup#macos-developer-setup)
- [Prerequisites](https://docs.openclaw.ai/platforms/mac/dev-setup#prerequisites)
- [1\. Install Dependencies](https://docs.openclaw.ai/platforms/mac/dev-setup#1-install-dependencies)
- [2\. Build and Package the App](https://docs.openclaw.ai/platforms/mac/dev-setup#2-build-and-package-the-app)
- [3\. Install the CLI](https://docs.openclaw.ai/platforms/mac/dev-setup#3-install-the-cli)
- [Troubleshooting](https://docs.openclaw.ai/platforms/mac/dev-setup#troubleshooting)
- [Build Fails: Toolchain or SDK Mismatch](https://docs.openclaw.ai/platforms/mac/dev-setup#build-fails%3A-toolchain-or-sdk-mismatch)
- [App Crashes on Permission Grant](https://docs.openclaw.ai/platforms/mac/dev-setup#app-crashes-on-permission-grant)
- [Gateway “Starting…” indefinitely](https://docs.openclaw.ai/platforms/mac/dev-setup#gateway-%E2%80%9Cstarting%E2%80%A6%E2%80%9D-indefinitely)

# [​](https://docs.openclaw.ai/platforms/mac/dev-setup\#macos-developer-setup)  macOS Developer Setup

This guide covers the necessary steps to build and run the OpenClaw macOS application from source.

## [​](https://docs.openclaw.ai/platforms/mac/dev-setup\#prerequisites)  Prerequisites

Before building the app, ensure you have the following installed:

1. **Xcode 26.2+**: Required for Swift development.
2. **Node.js 22+ & pnpm**: Required for the gateway, CLI, and packaging scripts.

## [​](https://docs.openclaw.ai/platforms/mac/dev-setup\#1-install-dependencies)  1\. Install Dependencies

Install the project-wide dependencies:

Copy

```
pnpm install
```

## [​](https://docs.openclaw.ai/platforms/mac/dev-setup\#2-build-and-package-the-app)  2\. Build and Package the App

To build the macOS app and package it into `dist/OpenClaw.app`, run:

Copy

```
./scripts/package-mac-app.sh
```

If you don’t have an Apple Developer ID certificate, the script will automatically use **ad-hoc signing** (`-`).For dev run modes, signing flags, and Team ID troubleshooting, see the macOS app README:
[https://github.com/openclaw/openclaw/blob/main/apps/macos/README.md](https://github.com/openclaw/openclaw/blob/main/apps/macos/README.md)

> **Note**: Ad-hoc signed apps may trigger security prompts. If the app crashes immediately with “Abort trap 6”, see the [Troubleshooting](https://docs.openclaw.ai/platforms/mac/dev-setup#troubleshooting) section.

## [​](https://docs.openclaw.ai/platforms/mac/dev-setup\#3-install-the-cli)  3\. Install the CLI

The macOS app expects a global `openclaw` CLI install to manage background tasks.**To install it (recommended):**

1. Open the OpenClaw app.
2. Go to the **General** settings tab.
3. Click **“Install CLI”**.

Alternatively, install it manually:

Copy

```
npm install -g openclaw@<version>
```

## [​](https://docs.openclaw.ai/platforms/mac/dev-setup\#troubleshooting)  Troubleshooting

### [​](https://docs.openclaw.ai/platforms/mac/dev-setup\#build-fails:-toolchain-or-sdk-mismatch)  Build Fails: Toolchain or SDK Mismatch

The macOS app build expects the latest macOS SDK and Swift 6.2 toolchain.**System dependencies (required):**

- **Latest macOS version available in Software Update** (required by Xcode 26.2 SDKs)
- **Xcode 26.2** (Swift 6.2 toolchain)

**Checks:**

Copy

```
xcodebuild -version
xcrun swift --version
```

If versions don’t match, update macOS/Xcode and re-run the build.

### [​](https://docs.openclaw.ai/platforms/mac/dev-setup\#app-crashes-on-permission-grant)  App Crashes on Permission Grant

If the app crashes when you try to allow **Speech Recognition** or **Microphone** access, it may be due to a corrupted TCC cache or signature mismatch.**Fix:**

1. Reset the TCC permissions:







Copy











```
tccutil reset All bot.molt.mac.debug
```

2. If that fails, change the `BUNDLE_ID` temporarily in [`scripts/package-mac-app.sh`](https://github.com/openclaw/openclaw/blob/main/scripts/package-mac-app.sh) to force a “clean slate” from macOS.

### [​](https://docs.openclaw.ai/platforms/mac/dev-setup\#gateway-%E2%80%9Cstarting%E2%80%A6%E2%80%9D-indefinitely)  Gateway “Starting…” indefinitely

If the gateway status stays on “Starting…”, check if a zombie process is holding the port:

Copy

```
openclaw gateway status
openclaw gateway stop

# If you’re not using a LaunchAgent (dev mode / manual runs), find the listener:
lsof -nP -iTCP:18789 -sTCP:LISTEN
```

If a manual run is holding the port, stop that process (Ctrl+C). As a last resort, kill the PID you found above.

[Exe dev](https://docs.openclaw.ai/platforms/exe-dev) [Menu bar](https://docs.openclaw.ai/platforms/mac/menu-bar)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.