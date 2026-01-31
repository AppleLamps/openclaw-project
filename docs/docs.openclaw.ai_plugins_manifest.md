---
url: "https://docs.openclaw.ai/plugins/manifest"
title: "Manifest - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/plugins/manifest#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Plugin manifest (openclaw.plugin.json)](https://docs.openclaw.ai/plugins/manifest#plugin-manifest-openclaw-plugin-json)
- [Required fields](https://docs.openclaw.ai/plugins/manifest#required-fields)
- [JSON Schema requirements](https://docs.openclaw.ai/plugins/manifest#json-schema-requirements)
- [Validation behavior](https://docs.openclaw.ai/plugins/manifest#validation-behavior)
- [Notes](https://docs.openclaw.ai/plugins/manifest#notes)

# [​](https://docs.openclaw.ai/plugins/manifest\#plugin-manifest-openclaw-plugin-json)  Plugin manifest (openclaw.plugin.json)

Every plugin **must** ship a `openclaw.plugin.json` file in the **plugin root**.
OpenClaw uses this manifest to validate configuration **without executing plugin**
**code**. Missing or invalid manifests are treated as plugin errors and block
config validation.See the full plugin system guide: [Plugins](https://docs.openclaw.ai/plugin).

## [​](https://docs.openclaw.ai/plugins/manifest\#required-fields)  Required fields

Copy

```
{
  "id": "voice-call",
  "configSchema": {
    "type": "object",
    "additionalProperties": false,
    "properties": {}
  }
}
```

Required keys:

- `id` (string): canonical plugin id.
- `configSchema` (object): JSON Schema for plugin config (inline).

Optional keys:

- `kind` (string): plugin kind (example: `"memory"`).
- `channels` (array): channel ids registered by this plugin (example: `["matrix"]`).
- `providers` (array): provider ids registered by this plugin.
- `skills` (array): skill directories to load (relative to the plugin root).
- `name` (string): display name for the plugin.
- `description` (string): short plugin summary.
- `uiHints` (object): config field labels/placeholders/sensitive flags for UI rendering.
- `version` (string): plugin version (informational).

## [​](https://docs.openclaw.ai/plugins/manifest\#json-schema-requirements)  JSON Schema requirements

- **Every plugin must ship a JSON Schema**, even if it accepts no config.
- An empty schema is acceptable (for example, `{ "type": "object", "additionalProperties": false }`).
- Schemas are validated at config read/write time, not at runtime.

## [​](https://docs.openclaw.ai/plugins/manifest\#validation-behavior)  Validation behavior

- Unknown `channels.*` keys are **errors**, unless the channel id is declared by
a plugin manifest.
- `plugins.entries.<id>`, `plugins.allow`, `plugins.deny`, and `plugins.slots.*`
must reference **discoverable** plugin ids. Unknown ids are **errors**.
- If a plugin is installed but has a broken or missing manifest or schema,
validation fails and Doctor reports the plugin error.
- If plugin config exists but the plugin is **disabled**, the config is kept and
a **warning** is surfaced in Doctor + logs.

## [​](https://docs.openclaw.ai/plugins/manifest\#notes)  Notes

- The manifest is **required for all plugins**, including local filesystem loads.
- Runtime still loads the plugin module separately; the manifest is only for
discovery + validation.
- If your plugin depends on native modules, document the build steps and any
package-manager allowlist requirements (for example, pnpm `allow-build-scripts`
  - `pnpm rebuild <package>`).

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.