---
url: "https://docs.openclaw.ai/install/development-channels"
title: "Development channels - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/install/development-channels#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Development channels](https://docs.openclaw.ai/install/development-channels#development-channels)
- [Switching channels](https://docs.openclaw.ai/install/development-channels#switching-channels)
- [Plugins and channels](https://docs.openclaw.ai/install/development-channels#plugins-and-channels)
- [Tagging best practices](https://docs.openclaw.ai/install/development-channels#tagging-best-practices)
- [macOS app availability](https://docs.openclaw.ai/install/development-channels#macos-app-availability)

# [​](https://docs.openclaw.ai/install/development-channels\#development-channels)  Development channels

Last updated: 2026-01-21OpenClaw ships three update channels:

- **stable**: npm dist-tag `latest`.
- **beta**: npm dist-tag `beta` (builds under test).
- **dev**: moving head of `main` (git). npm dist-tag: `dev` (when published).

We ship builds to **beta**, test them, then **promote a vetted build to `latest`**
without changing the version number — dist-tags are the source of truth for npm installs.

## [​](https://docs.openclaw.ai/install/development-channels\#switching-channels)  Switching channels

Git checkout:

Copy

```
openclaw update --channel stable
openclaw update --channel beta
openclaw update --channel dev
```

- `stable`/`beta` check out the latest matching tag (often the same tag).
- `dev` switches to `main` and rebases on the upstream.

npm/pnpm global install:

Copy

```
openclaw update --channel stable
openclaw update --channel beta
openclaw update --channel dev
```

This updates via the corresponding npm dist-tag (`latest`, `beta`, `dev`).When you **explicitly** switch channels with `--channel`, OpenClaw also aligns
the install method:

- `dev` ensures a git checkout (default `~/openclaw`, override with `OPENCLAW_GIT_DIR`),
updates it, and installs the global CLI from that checkout.
- `stable`/`beta` installs from npm using the matching dist-tag.

Tip: if you want stable + dev in parallel, keep two clones and point your gateway at the stable one.

## [​](https://docs.openclaw.ai/install/development-channels\#plugins-and-channels)  Plugins and channels

When you switch channels with `openclaw update`, OpenClaw also syncs plugin sources:

- `dev` prefers bundled plugins from the git checkout.
- `stable` and `beta` restore npm-installed plugin packages.

## [​](https://docs.openclaw.ai/install/development-channels\#tagging-best-practices)  Tagging best practices

- Tag releases you want git checkouts to land on (`vYYYY.M.D` or `vYYYY.M.D-<patch>`).
- Keep tags immutable: never move or reuse a tag.
- npm dist-tags remain the source of truth for npm installs:
  - `latest` → stable
  - `beta` → candidate build
  - `dev` → main snapshot (optional)

## [​](https://docs.openclaw.ai/install/development-channels\#macos-app-availability)  macOS app availability

Beta and dev builds may **not** include a macOS app release. That’s OK:

- The git tag and npm dist-tag can still be published.
- Call out “no macOS build for this beta” in release notes or changelog.

[Updating](https://docs.openclaw.ai/install/updating) [Uninstall](https://docs.openclaw.ai/install/uninstall)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.