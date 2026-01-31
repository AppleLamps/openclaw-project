---
url: "https://docs.openclaw.ai/scripts"
title: "Scripts - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/scripts#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Scripts](https://docs.openclaw.ai/scripts#scripts)
- [Conventions](https://docs.openclaw.ai/scripts#conventions)
- [Git hooks](https://docs.openclaw.ai/scripts#git-hooks)
- [Auth monitoring scripts](https://docs.openclaw.ai/scripts#auth-monitoring-scripts)
- [When adding scripts](https://docs.openclaw.ai/scripts#when-adding-scripts)

# [​](https://docs.openclaw.ai/scripts\#scripts)  Scripts

The `scripts/` directory contains helper scripts for local workflows and ops tasks.
Use these when a task is clearly tied to a script; otherwise prefer the CLI.

## [​](https://docs.openclaw.ai/scripts\#conventions)  Conventions

- Scripts are **optional** unless referenced in docs or release checklists.
- Prefer CLI surfaces when they exist (example: auth monitoring uses `openclaw models status --check`).
- Assume scripts are host‑specific; read them before running on a new machine.

## [​](https://docs.openclaw.ai/scripts\#git-hooks)  Git hooks

- `scripts/setup-git-hooks.js`: best-effort setup for `core.hooksPath` when inside a git repo.
- `scripts/format-staged.js`: pre-commit formatter for staged `src/` and `test/` files.

## [​](https://docs.openclaw.ai/scripts\#auth-monitoring-scripts)  Auth monitoring scripts

Auth monitoring scripts are documented here:
[/automation/auth-monitoring](https://docs.openclaw.ai/automation/auth-monitoring)

## [​](https://docs.openclaw.ai/scripts\#when-adding-scripts)  When adding scripts

- Keep scripts focused and documented.
- Add a short entry in the relevant doc (or create one if missing).

[Testing](https://docs.openclaw.ai/testing) [Session management compaction](https://docs.openclaw.ai/reference/session-management-compaction)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.