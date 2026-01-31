---
url: "https://docs.openclaw.ai/install/installer"
title: "Installer - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/install/installer#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Installer internals](https://docs.openclaw.ai/install/installer#installer-internals)
- [install.sh (recommended)](https://docs.openclaw.ai/install/installer#install-sh-recommended)
- [Discoverability / “git install” prompt](https://docs.openclaw.ai/install/installer#discoverability-%2F-%E2%80%9Cgit-install%E2%80%9D-prompt)
- [Why Git is needed](https://docs.openclaw.ai/install/installer#why-git-is-needed)
- [Why npm hits EACCES on fresh Linux](https://docs.openclaw.ai/install/installer#why-npm-hits-eacces-on-fresh-linux)
- [install-cli.sh (non-root CLI installer)](https://docs.openclaw.ai/install/installer#install-cli-sh-non-root-cli-installer)
- [install.ps1 (Windows PowerShell)](https://docs.openclaw.ai/install/installer#install-ps1-windows-powershell)

# [​](https://docs.openclaw.ai/install/installer\#installer-internals)  Installer internals

OpenClaw ships two installer scripts (served from `openclaw.ai`):

- `https://openclaw.bot/install.sh` — “recommended” installer (global npm install by default; can also install from a GitHub checkout)
- `https://openclaw.bot/install-cli.sh` — non-root-friendly CLI installer (installs into a prefix with its own Node)
- `https://openclaw.ai/install.ps1` — Windows PowerShell installer (npm by default; optional git install)

To see the current flags/behavior, run:

Copy

```
curl -fsSL https://openclaw.bot/install.sh | bash -s -- --help
```

Windows (PowerShell) help:

Copy

```
& ([scriptblock]::Create((iwr -useb https://openclaw.ai/install.ps1))) -?
```

If the installer completes but `openclaw` is not found in a new terminal, it’s usually a Node/npm PATH issue. See: [Install](https://docs.openclaw.ai/install#nodejs--npm-path-sanity).

## [​](https://docs.openclaw.ai/install/installer\#install-sh-recommended)  install.sh (recommended)

What it does (high level):

- Detect OS (macOS / Linux / WSL).
- Ensure Node.js **22+** (macOS via Homebrew; Linux via NodeSource).
- Choose install method:
  - `npm` (default): `npm install -g openclaw@latest`
  - `git`: clone/build a source checkout and install a wrapper script
- On Linux: avoid global npm permission errors by switching npm’s prefix to `~/.npm-global` when needed.
- If upgrading an existing install: runs `openclaw doctor --non-interactive` (best effort).
- For git installs: runs `openclaw doctor --non-interactive` after install/update (best effort).
- Mitigates `sharp` native install gotchas by defaulting `SHARP_IGNORE_GLOBAL_LIBVIPS=1` (avoids building against system libvips).

If you _want_`sharp` to link against a globally-installed libvips (or you’re debugging), set:

Copy

```
SHARP_IGNORE_GLOBAL_LIBVIPS=0 curl -fsSL https://openclaw.bot/install.sh | bash
```

### [​](https://docs.openclaw.ai/install/installer\#discoverability-/-%E2%80%9Cgit-install%E2%80%9D-prompt)  Discoverability / “git install” prompt

If you run the installer while **already inside a OpenClaw source checkout** (detected via `package.json` \+ `pnpm-workspace.yaml`), it prompts:

- update and use this checkout (`git`)
- or migrate to the global npm install (`npm`)

In non-interactive contexts (no TTY / `--no-prompt`), you must pass `--install-method git|npm` (or set `OPENCLAW_INSTALL_METHOD`), otherwise the script exits with code `2`.

### [​](https://docs.openclaw.ai/install/installer\#why-git-is-needed)  Why Git is needed

Git is required for the `--install-method git` path (clone / pull).For `npm` installs, Git is _usually_ not required, but some environments still end up needing it (e.g. when a package or dependency is fetched via a git URL). The installer currently ensures Git is present to avoid `spawn git ENOENT` surprises on fresh distros.

### [​](https://docs.openclaw.ai/install/installer\#why-npm-hits-eacces-on-fresh-linux)  Why npm hits `EACCES` on fresh Linux

On some Linux setups (especially after installing Node via the system package manager or NodeSource), npm’s global prefix points at a root-owned location. Then `npm install -g ...` fails with `EACCES` / `mkdir` permission errors.`install.sh` mitigates this by switching the prefix to:

- `~/.npm-global` (and adding it to `PATH` in `~/.bashrc` / `~/.zshrc` when present)

## [​](https://docs.openclaw.ai/install/installer\#install-cli-sh-non-root-cli-installer)  install-cli.sh (non-root CLI installer)

This script installs `openclaw` into a prefix (default: `~/.openclaw`) and also installs a dedicated Node runtime under that prefix, so it can work on machines where you don’t want to touch the system Node/npm.Help:

Copy

```
curl -fsSL https://openclaw.bot/install-cli.sh | bash -s -- --help
```

## [​](https://docs.openclaw.ai/install/installer\#install-ps1-windows-powershell)  install.ps1 (Windows PowerShell)

What it does (high level):

- Ensure Node.js **22+** (winget/Chocolatey/Scoop or manual).
- Choose install method:
  - `npm` (default): `npm install -g openclaw@latest`
  - `git`: clone/build a source checkout and install a wrapper script
- Runs `openclaw doctor --non-interactive` on upgrades and git installs (best effort).

Examples:

Copy

```
iwr -useb https://openclaw.ai/install.ps1 | iex
```

Copy

```
iwr -useb https://openclaw.ai/install.ps1 | iex -InstallMethod git
```

Copy

```
iwr -useb https://openclaw.ai/install.ps1 | iex -InstallMethod git -GitDir "C:\\openclaw"
```

Environment variables:

- `OPENCLAW_INSTALL_METHOD=git|npm`
- `OPENCLAW_GIT_DIR=...`

Git requirement:If you choose `-InstallMethod git` and Git is missing, the installer will print the
Git for Windows link (`https://git-scm.com/download/win`) and exit.Common Windows issues:

- **npm error spawn git / ENOENT**: install Git for Windows and reopen PowerShell, then rerun the installer.
- **“openclaw” is not recognized**: your npm global bin folder is not on PATH. Most systems use
`%AppData%\\npm`. You can also run `npm config get prefix` and add `\\bin` to PATH, then reopen PowerShell.

[Install](https://docs.openclaw.ai/install) [Updating](https://docs.openclaw.ai/install/updating)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.