---
url: "https://docs.openclaw.ai/cli/hooks"
title: "Hooks - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/hooks#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw hooks](https://docs.openclaw.ai/cli/hooks#openclaw-hooks)
- [List All Hooks](https://docs.openclaw.ai/cli/hooks#list-all-hooks)
- [Get Hook Information](https://docs.openclaw.ai/cli/hooks#get-hook-information)
- [Check Hooks Eligibility](https://docs.openclaw.ai/cli/hooks#check-hooks-eligibility)
- [Enable a Hook](https://docs.openclaw.ai/cli/hooks#enable-a-hook)
- [Disable a Hook](https://docs.openclaw.ai/cli/hooks#disable-a-hook)
- [Install Hooks](https://docs.openclaw.ai/cli/hooks#install-hooks)
- [Update Hooks](https://docs.openclaw.ai/cli/hooks#update-hooks)
- [Bundled Hooks](https://docs.openclaw.ai/cli/hooks#bundled-hooks)
- [session-memory](https://docs.openclaw.ai/cli/hooks#session-memory)
- [command-logger](https://docs.openclaw.ai/cli/hooks#command-logger)
- [soul-evil](https://docs.openclaw.ai/cli/hooks#soul-evil)
- [boot-md](https://docs.openclaw.ai/cli/hooks#boot-md)

# [​](https://docs.openclaw.ai/cli/hooks\#openclaw-hooks)  `openclaw hooks`

Manage agent hooks (event-driven automations for commands like `/new`, `/reset`, and gateway startup).Related:

- Hooks: [Hooks](https://docs.openclaw.ai/hooks)
- Plugin hooks: [Plugins](https://docs.openclaw.ai/plugin#plugin-hooks)

## [​](https://docs.openclaw.ai/cli/hooks\#list-all-hooks)  List All Hooks

Copy

```
openclaw hooks list
```

List all discovered hooks from workspace, managed, and bundled directories.**Options:**

- `--eligible`: Show only eligible hooks (requirements met)
- `--json`: Output as JSON
- `-v, --verbose`: Show detailed information including missing requirements

**Example output:**

Copy

```
Hooks (4/4 ready)

Ready:
  🚀 boot-md ✓ - Run BOOT.md on gateway startup
  📝 command-logger ✓ - Log all command events to a centralized audit file
  💾 session-memory ✓ - Save session context to memory when /new command is issued
  😈 soul-evil ✓ - Swap injected SOUL content during a purge window or by random chance
```

**Example (verbose):**

Copy

```
openclaw hooks list --verbose
```

Shows missing requirements for ineligible hooks.**Example (JSON):**

Copy

```
openclaw hooks list --json
```

Returns structured JSON for programmatic use.

## [​](https://docs.openclaw.ai/cli/hooks\#get-hook-information)  Get Hook Information

Copy

```
openclaw hooks info <name>
```

Show detailed information about a specific hook.**Arguments:**

- `<name>`: Hook name (e.g., `session-memory`)

**Options:**

- `--json`: Output as JSON

**Example:**

Copy

```
openclaw hooks info session-memory
```

**Output:**

Copy

```
💾 session-memory ✓ Ready

Save session context to memory when /new command is issued

Details:
  Source: openclaw-bundled
  Path: /path/to/openclaw/hooks/bundled/session-memory/HOOK.md
  Handler: /path/to/openclaw/hooks/bundled/session-memory/handler.ts
  Homepage: https://docs.openclaw.ai/hooks#session-memory
  Events: command:new

Requirements:
  Config: ✓ workspace.dir
```

## [​](https://docs.openclaw.ai/cli/hooks\#check-hooks-eligibility)  Check Hooks Eligibility

Copy

```
openclaw hooks check
```

Show summary of hook eligibility status (how many are ready vs. not ready).**Options:**

- `--json`: Output as JSON

**Example output:**

Copy

```
Hooks Status

Total hooks: 4
Ready: 4
Not ready: 0
```

## [​](https://docs.openclaw.ai/cli/hooks\#enable-a-hook)  Enable a Hook

Copy

```
openclaw hooks enable <name>
```

Enable a specific hook by adding it to your config (`~/.openclaw/config.json`).**Note:** Hooks managed by plugins show `plugin:<id>` in `openclaw hooks list` and
can’t be enabled/disabled here. Enable/disable the plugin instead.**Arguments:**

- `<name>`: Hook name (e.g., `session-memory`)

**Example:**

Copy

```
openclaw hooks enable session-memory
```

**Output:**

Copy

```
✓ Enabled hook: 💾 session-memory
```

**What it does:**

- Checks if hook exists and is eligible
- Updates `hooks.internal.entries.<name>.enabled = true` in your config
- Saves config to disk

**After enabling:**

- Restart the gateway so hooks reload (menu bar app restart on macOS, or restart your gateway process in dev).

## [​](https://docs.openclaw.ai/cli/hooks\#disable-a-hook)  Disable a Hook

Copy

```
openclaw hooks disable <name>
```

Disable a specific hook by updating your config.**Arguments:**

- `<name>`: Hook name (e.g., `command-logger`)

**Example:**

Copy

```
openclaw hooks disable command-logger
```

**Output:**

Copy

```
⏸ Disabled hook: 📝 command-logger
```

**After disabling:**

- Restart the gateway so hooks reload

## [​](https://docs.openclaw.ai/cli/hooks\#install-hooks)  Install Hooks

Copy

```
openclaw hooks install <path-or-spec>
```

Install a hook pack from a local folder/archive or npm.**What it does:**

- Copies the hook pack into `~/.openclaw/hooks/<id>`
- Enables the installed hooks in `hooks.internal.entries.*`
- Records the install under `hooks.internal.installs`

**Options:**

- `-l, --link`: Link a local directory instead of copying (adds it to `hooks.internal.load.extraDirs`)

**Supported archives:**`.zip`, `.tgz`, `.tar.gz`, `.tar`**Examples:**

Copy

```
# Local directory
openclaw hooks install ./my-hook-pack

# Local archive
openclaw hooks install ./my-hook-pack.zip

# NPM package
openclaw hooks install @openclaw/my-hook-pack

# Link a local directory without copying
openclaw hooks install -l ./my-hook-pack
```

## [​](https://docs.openclaw.ai/cli/hooks\#update-hooks)  Update Hooks

Copy

```
openclaw hooks update <id>
openclaw hooks update --all
```

Update installed hook packs (npm installs only).**Options:**

- `--all`: Update all tracked hook packs
- `--dry-run`: Show what would change without writing

## [​](https://docs.openclaw.ai/cli/hooks\#bundled-hooks)  Bundled Hooks

### [​](https://docs.openclaw.ai/cli/hooks\#session-memory)  session-memory

Saves session context to memory when you issue `/new`.**Enable:**

Copy

```
openclaw hooks enable session-memory
```

**Output:**`~/.openclaw/workspace/memory/YYYY-MM-DD-slug.md`**See:** [session-memory documentation](https://docs.openclaw.ai/hooks#session-memory)

### [​](https://docs.openclaw.ai/cli/hooks\#command-logger)  command-logger

Logs all command events to a centralized audit file.**Enable:**

Copy

```
openclaw hooks enable command-logger
```

**Output:**`~/.openclaw/logs/commands.log`**View logs:**

Copy

```
# Recent commands
tail -n 20 ~/.openclaw/logs/commands.log

# Pretty-print
cat ~/.openclaw/logs/commands.log | jq .

# Filter by action
grep '"action":"new"' ~/.openclaw/logs/commands.log | jq .
```

**See:** [command-logger documentation](https://docs.openclaw.ai/hooks#command-logger)

### [​](https://docs.openclaw.ai/cli/hooks\#soul-evil)  soul-evil

Swaps injected `SOUL.md` content with `SOUL_EVIL.md` during a purge window or by random chance.**Enable:**

Copy

```
openclaw hooks enable soul-evil
```

**See:** [SOUL Evil Hook](https://docs.openclaw.ai/hooks/soul-evil)

### [​](https://docs.openclaw.ai/cli/hooks\#boot-md)  boot-md

Runs `BOOT.md` when the gateway starts (after channels start).**Events**: `gateway:startup`**Enable**:

Copy

```
openclaw hooks enable boot-md
```

**See:** [boot-md documentation](https://docs.openclaw.ai/hooks#boot-md)

[Docs](https://docs.openclaw.ai/cli/docs) [Pairing](https://docs.openclaw.ai/cli/pairing)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.