---
url: "https://docs.openclaw.ai/cli/plugins"
title: "Plugins - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/plugins#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw plugins](https://docs.openclaw.ai/cli/plugins#openclaw-plugins)
- [Commands](https://docs.openclaw.ai/cli/plugins#commands)
- [Install](https://docs.openclaw.ai/cli/plugins#install)
- [Update](https://docs.openclaw.ai/cli/plugins#update)

# [​](https://docs.openclaw.ai/cli/plugins\#openclaw-plugins)  `openclaw plugins`

Manage Gateway plugins/extensions (loaded in-process).Related:

- Plugin system: [Plugins](https://docs.openclaw.ai/plugin)
- Plugin manifest + schema: [Plugin manifest](https://docs.openclaw.ai/plugins/manifest)
- Security hardening: [Security](https://docs.openclaw.ai/gateway/security)

## [​](https://docs.openclaw.ai/cli/plugins\#commands)  Commands

Copy

```
openclaw plugins list
openclaw plugins info <id>
openclaw plugins enable <id>
openclaw plugins disable <id>
openclaw plugins doctor
openclaw plugins update <id>
openclaw plugins update --all
```

Bundled plugins ship with OpenClaw but start disabled. Use `plugins enable` to
activate them.All plugins must ship a `openclaw.plugin.json` file with an inline JSON Schema
(`configSchema`, even if empty). Missing/invalid manifests or schemas prevent
the plugin from loading and fail config validation.

### [​](https://docs.openclaw.ai/cli/plugins\#install)  Install

Copy

```
openclaw plugins install <path-or-spec>
```

Security note: treat plugin installs like running code. Prefer pinned versions.Supported archives: `.zip`, `.tgz`, `.tar.gz`, `.tar`.Use `--link` to avoid copying a local directory (adds to `plugins.load.paths`):

Copy

```
openclaw plugins install -l ./my-plugin
```

### [​](https://docs.openclaw.ai/cli/plugins\#update)  Update

Copy

```
openclaw plugins update <id>
openclaw plugins update --all
openclaw plugins update <id> --dry-run
```

Updates only apply to plugins installed from npm (tracked in `plugins.installs`).

[Skills](https://docs.openclaw.ai/cli/skills) [Memory](https://docs.openclaw.ai/cli/memory)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.