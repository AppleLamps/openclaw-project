---
url: "https://docs.openclaw.ai/cli/sandbox"
title: "Sandbox CLI - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/sandbox#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

CLI

Sandbox CLI

On this page

- [Sandbox CLI](https://docs.openclaw.ai/cli/sandbox#sandbox-cli)
- [Overview](https://docs.openclaw.ai/cli/sandbox#overview)
- [Commands](https://docs.openclaw.ai/cli/sandbox#commands)
- [openclaw sandbox explain](https://docs.openclaw.ai/cli/sandbox#openclaw-sandbox-explain)
- [openclaw sandbox list](https://docs.openclaw.ai/cli/sandbox#openclaw-sandbox-list)
- [openclaw sandbox recreate](https://docs.openclaw.ai/cli/sandbox#openclaw-sandbox-recreate)
- [Use Cases](https://docs.openclaw.ai/cli/sandbox#use-cases)
- [After updating Docker images](https://docs.openclaw.ai/cli/sandbox#after-updating-docker-images)
- [After changing sandbox configuration](https://docs.openclaw.ai/cli/sandbox#after-changing-sandbox-configuration)
- [After changing setupCommand](https://docs.openclaw.ai/cli/sandbox#after-changing-setupcommand)
- [For a specific agent only](https://docs.openclaw.ai/cli/sandbox#for-a-specific-agent-only)
- [Why is this needed?](https://docs.openclaw.ai/cli/sandbox#why-is-this-needed)
- [Configuration](https://docs.openclaw.ai/cli/sandbox#configuration)
- [See Also](https://docs.openclaw.ai/cli/sandbox#see-also)

# [​](https://docs.openclaw.ai/cli/sandbox\#sandbox-cli)  Sandbox CLI

Manage Docker-based sandbox containers for isolated agent execution.

## [​](https://docs.openclaw.ai/cli/sandbox\#overview)  Overview

OpenClaw can run agents in isolated Docker containers for security. The `sandbox` commands help you manage these containers, especially after updates or configuration changes.

## [​](https://docs.openclaw.ai/cli/sandbox\#commands)  Commands

### [​](https://docs.openclaw.ai/cli/sandbox\#openclaw-sandbox-explain)  `openclaw sandbox explain`

Inspect the **effective** sandbox mode/scope/workspace access, sandbox tool policy, and elevated gates (with fix-it config key paths).

Copy

```
openclaw sandbox explain
openclaw sandbox explain --session agent:main:main
openclaw sandbox explain --agent work
openclaw sandbox explain --json
```

### [​](https://docs.openclaw.ai/cli/sandbox\#openclaw-sandbox-list)  `openclaw sandbox list`

List all sandbox containers with their status and configuration.

Copy

```
openclaw sandbox list
openclaw sandbox list --browser  # List only browser containers
openclaw sandbox list --json     # JSON output
```

**Output includes:**

- Container name and status (running/stopped)
- Docker image and whether it matches config
- Age (time since creation)
- Idle time (time since last use)
- Associated session/agent

### [​](https://docs.openclaw.ai/cli/sandbox\#openclaw-sandbox-recreate)  `openclaw sandbox recreate`

Remove sandbox containers to force recreation with updated images/config.

Copy

```
openclaw sandbox recreate --all                # Recreate all containers
openclaw sandbox recreate --session main       # Specific session
openclaw sandbox recreate --agent mybot        # Specific agent
openclaw sandbox recreate --browser            # Only browser containers
openclaw sandbox recreate --all --force        # Skip confirmation
```

**Options:**

- `--all`: Recreate all sandbox containers
- `--session <key>`: Recreate container for specific session
- `--agent <id>`: Recreate containers for specific agent
- `--browser`: Only recreate browser containers
- `--force`: Skip confirmation prompt

**Important:** Containers are automatically recreated when the agent is next used.

## [​](https://docs.openclaw.ai/cli/sandbox\#use-cases)  Use Cases

### [​](https://docs.openclaw.ai/cli/sandbox\#after-updating-docker-images)  After updating Docker images

Copy

```
# Pull new image
docker pull openclaw-sandbox:latest
docker tag openclaw-sandbox:latest openclaw-sandbox:bookworm-slim

# Update config to use new image
# Edit config: agents.defaults.sandbox.docker.image (or agents.list[].sandbox.docker.image)

# Recreate containers
openclaw sandbox recreate --all
```

### [​](https://docs.openclaw.ai/cli/sandbox\#after-changing-sandbox-configuration)  After changing sandbox configuration

Copy

```
# Edit config: agents.defaults.sandbox.* (or agents.list[].sandbox.*)

# Recreate to apply new config
openclaw sandbox recreate --all
```

### [​](https://docs.openclaw.ai/cli/sandbox\#after-changing-setupcommand)  After changing setupCommand

Copy

```
openclaw sandbox recreate --all
# or just one agent:
openclaw sandbox recreate --agent family
```

### [​](https://docs.openclaw.ai/cli/sandbox\#for-a-specific-agent-only)  For a specific agent only

Copy

```
# Update only one agent's containers
openclaw sandbox recreate --agent alfred
```

## [​](https://docs.openclaw.ai/cli/sandbox\#why-is-this-needed)  Why is this needed?

**Problem:** When you update sandbox Docker images or configuration:

- Existing containers continue running with old settings
- Containers are only pruned after 24h of inactivity
- Regularly-used agents keep old containers running indefinitely

**Solution:** Use `openclaw sandbox recreate` to force removal of old containers. They’ll be recreated automatically with current settings when next needed.Tip: prefer `openclaw sandbox recreate` over manual `docker rm`. It uses the
Gateway’s container naming and avoids mismatches when scope/session keys change.

## [​](https://docs.openclaw.ai/cli/sandbox\#configuration)  Configuration

Sandbox settings live in `~/.openclaw/openclaw.json` under `agents.defaults.sandbox` (per-agent overrides go in `agents.list[].sandbox`):

Copy

```
{
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "all",                    // off, non-main, all
        "scope": "agent",                 // session, agent, shared
        "docker": {
          "image": "openclaw-sandbox:bookworm-slim",
          "containerPrefix": "openclaw-sbx-"
          // ... more Docker options
        },
        "prune": {
          "idleHours": 24,               // Auto-prune after 24h idle
          "maxAgeDays": 7                // Auto-prune after 7 days
        }
      }
    }
  }
}
```

## [​](https://docs.openclaw.ai/cli/sandbox\#see-also)  See Also

- [Sandbox Documentation](https://docs.openclaw.ai/gateway/sandboxing)
- [Agent Configuration](https://docs.openclaw.ai/concepts/agent-workspace)
- [Doctor Command](https://docs.openclaw.ai/gateway/doctor) \- Check sandbox setup

[Update](https://docs.openclaw.ai/cli/update) [Architecture](https://docs.openclaw.ai/concepts/architecture)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.