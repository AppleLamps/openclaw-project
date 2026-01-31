---
url: "https://docs.openclaw.ai/cli/onboard"
title: "Onboard - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/onboard#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw onboard](https://docs.openclaw.ai/cli/onboard#openclaw-onboard)
- [Examples](https://docs.openclaw.ai/cli/onboard#examples)

# [​](https://docs.openclaw.ai/cli/onboard\#openclaw-onboard)  `openclaw onboard`

Interactive onboarding wizard (local or remote Gateway setup).Related:

- Wizard guide: [Onboarding](https://docs.openclaw.ai/start/onboarding)

## [​](https://docs.openclaw.ai/cli/onboard\#examples)  Examples

Copy

```
openclaw onboard
openclaw onboard --flow quickstart
openclaw onboard --flow manual
openclaw onboard --mode remote --remote-url ws://gateway-host:18789
```

Flow notes:

- `quickstart`: minimal prompts, auto-generates a gateway token.
- `manual`: full prompts for port/bind/auth (alias of `advanced`).
- Fastest first chat: `openclaw dashboard` (Control UI, no channel setup).

[Setup](https://docs.openclaw.ai/cli/setup) [Configure](https://docs.openclaw.ai/cli/configure)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.