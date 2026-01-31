---
url: "https://docs.openclaw.ai/hooks/soul-evil"
title: "Soul evil - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/hooks/soul-evil#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [SOUL Evil Hook](https://docs.openclaw.ai/hooks/soul-evil#soul-evil-hook)
- [How It Works](https://docs.openclaw.ai/hooks/soul-evil#how-it-works)
- [Enable](https://docs.openclaw.ai/hooks/soul-evil#enable)
- [Options](https://docs.openclaw.ai/hooks/soul-evil#options)
- [Notes](https://docs.openclaw.ai/hooks/soul-evil#notes)
- [See Also](https://docs.openclaw.ai/hooks/soul-evil#see-also)

# [​](https://docs.openclaw.ai/hooks/soul-evil\#soul-evil-hook)  SOUL Evil Hook

The SOUL Evil hook swaps the **injected**`SOUL.md` content with `SOUL_EVIL.md` during
a purge window or by random chance. It does **not** modify files on disk.

## [​](https://docs.openclaw.ai/hooks/soul-evil\#how-it-works)  How It Works

When `agent:bootstrap` runs, the hook can replace the `SOUL.md` content in memory
before the system prompt is assembled. If `SOUL_EVIL.md` is missing or empty,
OpenClaw logs a warning and keeps the normal `SOUL.md`.Sub-agent runs do **not** include `SOUL.md` in their bootstrap files, so this hook
has no effect on sub-agents.

## [​](https://docs.openclaw.ai/hooks/soul-evil\#enable)  Enable

Copy

```
openclaw hooks enable soul-evil
```

Then set the config:

Copy

```
{
  "hooks": {
    "internal": {
      "enabled": true,
      "entries": {
        "soul-evil": {
          "enabled": true,
          "file": "SOUL_EVIL.md",
          "chance": 0.1,
          "purge": { "at": "21:00", "duration": "15m" }
        }
      }
    }
  }
}
```

Create `SOUL_EVIL.md` in the agent workspace root (next to `SOUL.md`).

## [​](https://docs.openclaw.ai/hooks/soul-evil\#options)  Options

- `file` (string): alternate SOUL filename (default: `SOUL_EVIL.md`)
- `chance` (number 0–1): random chance per run to use `SOUL_EVIL.md`
- `purge.at` (HH:mm): daily purge start (24-hour clock)
- `purge.duration` (duration): window length (e.g. `30s`, `10m`, `1h`)

**Precedence:** purge window wins over chance.**Timezone:** uses `agents.defaults.userTimezone` when set; otherwise host timezone.

## [​](https://docs.openclaw.ai/hooks/soul-evil\#notes)  Notes

- No files are written or modified on disk.
- If `SOUL.md` is not in the bootstrap list, the hook does nothing.

## [​](https://docs.openclaw.ai/hooks/soul-evil\#see-also)  See Also

- [Hooks](https://docs.openclaw.ai/hooks)

[Hooks](https://docs.openclaw.ai/hooks) [Auth monitoring](https://docs.openclaw.ai/automation/auth-monitoring)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.