---
url: "https://docs.openclaw.ai/cli/security"
title: "Security - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/security#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw security](https://docs.openclaw.ai/cli/security#openclaw-security)
- [Audit](https://docs.openclaw.ai/cli/security#audit)

# [​](https://docs.openclaw.ai/cli/security\#openclaw-security)  `openclaw security`

Security tools (audit + optional fixes).Related:

- Security guide: [Security](https://docs.openclaw.ai/gateway/security)

## [​](https://docs.openclaw.ai/cli/security\#audit)  Audit

Copy

```
openclaw security audit
openclaw security audit --deep
openclaw security audit --fix
```

The audit warns when multiple DM senders share the main session and recommends `session.dmScope="per-channel-peer"` (or `per-account-channel-peer` for multi-account channels) for shared inboxes.
It also warns when small models (`<=300B`) are used without sandboxing and with web/browser tools enabled.

[Pairing](https://docs.openclaw.ai/cli/pairing) [Update](https://docs.openclaw.ai/cli/update)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.