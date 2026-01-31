---
url: "https://docs.openclaw.ai/cli/cron"
title: "Cron - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/cron#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw cron](https://docs.openclaw.ai/cli/cron#openclaw-cron)
- [Common edits](https://docs.openclaw.ai/cli/cron#common-edits)

# [​](https://docs.openclaw.ai/cli/cron\#openclaw-cron)  `openclaw cron`

Manage cron jobs for the Gateway scheduler.Related:

- Cron jobs: [Cron jobs](https://docs.openclaw.ai/automation/cron-jobs)

Tip: run `openclaw cron --help` for the full command surface.

## [​](https://docs.openclaw.ai/cli/cron\#common-edits)  Common edits

Update delivery settings without changing the message:

Copy

```
openclaw cron edit <job-id> --deliver --channel telegram --to "123456789"
```

Disable delivery for an isolated job:

Copy

```
openclaw cron edit <job-id> --no-deliver
```

[Voicecall](https://docs.openclaw.ai/cli/voicecall) [Dns](https://docs.openclaw.ai/cli/dns)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.