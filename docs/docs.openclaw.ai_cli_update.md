---
url: "https://docs.openclaw.ai/cli/update"
title: "Update - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/update#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw update](https://docs.openclaw.ai/cli/update#openclaw-update)
- [Usage](https://docs.openclaw.ai/cli/update#usage)
- [Options](https://docs.openclaw.ai/cli/update#options)
- [update status](https://docs.openclaw.ai/cli/update#update-status)
- [update wizard](https://docs.openclaw.ai/cli/update#update-wizard)
- [What it does](https://docs.openclaw.ai/cli/update#what-it-does)
- [Git checkout flow](https://docs.openclaw.ai/cli/update#git-checkout-flow)
- [--update shorthand](https://docs.openclaw.ai/cli/update#update-shorthand)
- [See also](https://docs.openclaw.ai/cli/update#see-also)

# [​](https://docs.openclaw.ai/cli/update\#openclaw-update)  `openclaw update`

Safely update OpenClaw and switch between stable/beta/dev channels.If you installed via **npm/pnpm** (global install, no git metadata), updates happen via the package manager flow in [Updating](https://docs.openclaw.ai/install/updating).

## [​](https://docs.openclaw.ai/cli/update\#usage)  Usage

Copy

```
openclaw update
openclaw update status
openclaw update wizard
openclaw update --channel beta
openclaw update --channel dev
openclaw update --tag beta
openclaw update --no-restart
openclaw update --json
openclaw --update
```

## [​](https://docs.openclaw.ai/cli/update\#options)  Options

- `--no-restart`: skip restarting the Gateway service after a successful update.
- `--channel <stable|beta|dev>`: set the update channel (git + npm; persisted in config).
- `--tag <dist-tag|version>`: override the npm dist-tag or version for this update only.
- `--json`: print machine-readable `UpdateRunResult` JSON.
- `--timeout <seconds>`: per-step timeout (default is 1200s).

Note: downgrades require confirmation because older versions can break configuration.

## [​](https://docs.openclaw.ai/cli/update\#update-status)  `update status`

Show the active update channel + git tag/branch/SHA (for source checkouts), plus update availability.

Copy

```
openclaw update status
openclaw update status --json
openclaw update status --timeout 10
```

Options:

- `--json`: print machine-readable status JSON.
- `--timeout <seconds>`: timeout for checks (default is 3s).

## [​](https://docs.openclaw.ai/cli/update\#update-wizard)  `update wizard`

Interactive flow to pick an update channel and confirm whether to restart the Gateway
after updating (default is to restart). If you select `dev` without a git checkout, it
offers to create one.

## [​](https://docs.openclaw.ai/cli/update\#what-it-does)  What it does

When you switch channels explicitly (`--channel ...`), OpenClaw also keeps the
install method aligned:

- `dev` → ensures a git checkout (default: `~/openclaw`, override with `OPENCLAW_GIT_DIR`),
updates it, and installs the global CLI from that checkout.
- `stable`/`beta` → installs from npm using the matching dist-tag.

## [​](https://docs.openclaw.ai/cli/update\#git-checkout-flow)  Git checkout flow

Channels:

- `stable`: checkout the latest non-beta tag, then build + doctor.
- `beta`: checkout the latest `-beta` tag, then build + doctor.
- `dev`: checkout `main`, then fetch + rebase.

High-level:

1. Requires a clean worktree (no uncommitted changes).
2. Switches to the selected channel (tag or branch).
3. Fetches upstream (dev only).
4. Dev only: preflight lint + TypeScript build in a temp worktree; if the tip fails, walks back up to 10 commits to find the newest clean build.
5. Rebases onto the selected commit (dev only).
6. Installs deps (pnpm preferred; npm fallback).
7. Builds + builds the Control UI.
8. Runs `openclaw doctor` as the final “safe update” check.
9. Syncs plugins to the active channel (dev uses bundled extensions; stable/beta uses npm) and updates npm-installed plugins.

## [​](https://docs.openclaw.ai/cli/update\#update-shorthand)  `--update` shorthand

`openclaw --update` rewrites to `openclaw update` (useful for shells and launcher scripts).

## [​](https://docs.openclaw.ai/cli/update\#see-also)  See also

- `openclaw doctor` (offers to run update first on git checkouts)
- [Development channels](https://docs.openclaw.ai/install/development-channels)
- [Updating](https://docs.openclaw.ai/install/updating)
- [CLI reference](https://docs.openclaw.ai/cli)

[Security](https://docs.openclaw.ai/cli/security) [Sandbox CLI](https://docs.openclaw.ai/cli/sandbox)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.