---
url: "https://docs.openclaw.ai/install/docker"
title: "Docker - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/install/docker#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Docker (optional)](https://docs.openclaw.ai/install/docker#docker-optional)
- [Is Docker right for me?](https://docs.openclaw.ai/install/docker#is-docker-right-for-me)
- [Requirements](https://docs.openclaw.ai/install/docker#requirements)
- [Containerized Gateway (Docker Compose)](https://docs.openclaw.ai/install/docker#containerized-gateway-docker-compose)
- [Quick start (recommended)](https://docs.openclaw.ai/install/docker#quick-start-recommended)
- [Manual flow (compose)](https://docs.openclaw.ai/install/docker#manual-flow-compose)
- [Extra mounts (optional)](https://docs.openclaw.ai/install/docker#extra-mounts-optional)
- [Persist the entire container home (optional)](https://docs.openclaw.ai/install/docker#persist-the-entire-container-home-optional)
- [Install extra apt packages (optional)](https://docs.openclaw.ai/install/docker#install-extra-apt-packages-optional)
- [Faster rebuilds (recommended)](https://docs.openclaw.ai/install/docker#faster-rebuilds-recommended)
- [Channel setup (optional)](https://docs.openclaw.ai/install/docker#channel-setup-optional)
- [Health check](https://docs.openclaw.ai/install/docker#health-check)
- [E2E smoke test (Docker)](https://docs.openclaw.ai/install/docker#e2e-smoke-test-docker)
- [QR import smoke test (Docker)](https://docs.openclaw.ai/install/docker#qr-import-smoke-test-docker)
- [Notes](https://docs.openclaw.ai/install/docker#notes)
- [Agent Sandbox (host gateway + Docker tools)](https://docs.openclaw.ai/install/docker#agent-sandbox-host-gateway-%2B-docker-tools)
- [What it does](https://docs.openclaw.ai/install/docker#what-it-does)
- [Per-agent sandbox profiles (multi-agent)](https://docs.openclaw.ai/install/docker#per-agent-sandbox-profiles-multi-agent)
- [Default behavior](https://docs.openclaw.ai/install/docker#default-behavior)
- [Enable sandboxing](https://docs.openclaw.ai/install/docker#enable-sandboxing)
- [Build the default sandbox image](https://docs.openclaw.ai/install/docker#build-the-default-sandbox-image)
- [Sandbox common image (optional)](https://docs.openclaw.ai/install/docker#sandbox-common-image-optional)
- [Sandbox browser image](https://docs.openclaw.ai/install/docker#sandbox-browser-image)
- [Custom sandbox image](https://docs.openclaw.ai/install/docker#custom-sandbox-image)
- [Tool policy (allow/deny)](https://docs.openclaw.ai/install/docker#tool-policy-allow%2Fdeny)
- [Pruning strategy](https://docs.openclaw.ai/install/docker#pruning-strategy)
- [Security notes](https://docs.openclaw.ai/install/docker#security-notes)
- [Troubleshooting](https://docs.openclaw.ai/install/docker#troubleshooting)

# [​](https://docs.openclaw.ai/install/docker\#docker-optional)  Docker (optional)

Docker is **optional**. Use it only if you want a containerized gateway or to validate the Docker flow.

## [​](https://docs.openclaw.ai/install/docker\#is-docker-right-for-me)  Is Docker right for me?

- **Yes**: you want an isolated, throwaway gateway environment or to run OpenClaw on a host without local installs.
- **No**: you’re running on your own machine and just want the fastest dev loop. Use the normal install flow instead.
- **Sandboxing note**: agent sandboxing uses Docker too, but it does **not** require the full gateway to run in Docker. See [Sandboxing](https://docs.openclaw.ai/gateway/sandboxing).

This guide covers:

- Containerized Gateway (full OpenClaw in Docker)
- Per-session Agent Sandbox (host gateway + Docker-isolated agent tools)

Sandboxing details: [Sandboxing](https://docs.openclaw.ai/gateway/sandboxing)

## [​](https://docs.openclaw.ai/install/docker\#requirements)  Requirements

- Docker Desktop (or Docker Engine) + Docker Compose v2
- Enough disk for images + logs

## [​](https://docs.openclaw.ai/install/docker\#containerized-gateway-docker-compose)  Containerized Gateway (Docker Compose)

### [​](https://docs.openclaw.ai/install/docker\#quick-start-recommended)  Quick start (recommended)

From repo root:

Copy

```
./docker-setup.sh
```

This script:

- builds the gateway image
- runs the onboarding wizard
- prints optional provider setup hints
- starts the gateway via Docker Compose
- generates a gateway token and writes it to `.env`

Optional env vars:

- `OPENCLAW_DOCKER_APT_PACKAGES` — install extra apt packages during build
- `OPENCLAW_EXTRA_MOUNTS` — add extra host bind mounts
- `OPENCLAW_HOME_VOLUME` — persist `/home/node` in a named volume

After it finishes:

- Open `http://127.0.0.1:18789/` in your browser.
- Paste the token into the Control UI (Settings → token).

It writes config/workspace on the host:

- `~/.openclaw/`
- `~/.openclaw/workspace`

Running on a VPS? See [Hetzner (Docker VPS)](https://docs.openclaw.ai/platforms/hetzner).

### [​](https://docs.openclaw.ai/install/docker\#manual-flow-compose)  Manual flow (compose)

Copy

```
docker build -t openclaw:local -f Dockerfile .
docker compose run --rm openclaw-cli onboard
docker compose up -d openclaw-gateway
```

### [​](https://docs.openclaw.ai/install/docker\#extra-mounts-optional)  Extra mounts (optional)

If you want to mount additional host directories into the containers, set
`OPENCLAW_EXTRA_MOUNTS` before running `docker-setup.sh`. This accepts a
comma-separated list of Docker bind mounts and applies them to both
`openclaw-gateway` and `openclaw-cli` by generating `docker-compose.extra.yml`.Example:

Copy

```
export OPENCLAW_EXTRA_MOUNTS="$HOME/.codex:/home/node/.codex:ro,$HOME/github:/home/node/github:rw"
./docker-setup.sh
```

Notes:

- Paths must be shared with Docker Desktop on macOS/Windows.
- If you edit `OPENCLAW_EXTRA_MOUNTS`, rerun `docker-setup.sh` to regenerate the
extra compose file.
- `docker-compose.extra.yml` is generated. Don’t hand-edit it.

### [​](https://docs.openclaw.ai/install/docker\#persist-the-entire-container-home-optional)  Persist the entire container home (optional)

If you want `/home/node` to persist across container recreation, set a named
volume via `OPENCLAW_HOME_VOLUME`. This creates a Docker volume and mounts it at
`/home/node`, while keeping the standard config/workspace bind mounts. Use a
named volume here (not a bind path); for bind mounts, use
`OPENCLAW_EXTRA_MOUNTS`.Example:

Copy

```
export OPENCLAW_HOME_VOLUME="openclaw_home"
./docker-setup.sh
```

You can combine this with extra mounts:

Copy

```
export OPENCLAW_HOME_VOLUME="openclaw_home"
export OPENCLAW_EXTRA_MOUNTS="$HOME/.codex:/home/node/.codex:ro,$HOME/github:/home/node/github:rw"
./docker-setup.sh
```

Notes:

- If you change `OPENCLAW_HOME_VOLUME`, rerun `docker-setup.sh` to regenerate the
extra compose file.
- The named volume persists until removed with `docker volume rm <name>`.

### [​](https://docs.openclaw.ai/install/docker\#install-extra-apt-packages-optional)  Install extra apt packages (optional)

If you need system packages inside the image (for example, build tools or media
libraries), set `OPENCLAW_DOCKER_APT_PACKAGES` before running `docker-setup.sh`.
This installs the packages during the image build, so they persist even if the
container is deleted.Example:

Copy

```
export OPENCLAW_DOCKER_APT_PACKAGES="ffmpeg build-essential"
./docker-setup.sh
```

Notes:

- This accepts a space-separated list of apt package names.
- If you change `OPENCLAW_DOCKER_APT_PACKAGES`, rerun `docker-setup.sh` to rebuild
the image.

### [​](https://docs.openclaw.ai/install/docker\#faster-rebuilds-recommended)  Faster rebuilds (recommended)

To speed up rebuilds, order your Dockerfile so dependency layers are cached.
This avoids re-running `pnpm install` unless lockfiles change:

Copy

```
FROM node:22-bookworm

# Install Bun (required for build scripts)
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

RUN corepack enable

WORKDIR /app

# Cache dependencies unless package metadata changes
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY ui/package.json ./ui/package.json
COPY scripts ./scripts

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build
RUN pnpm ui:install
RUN pnpm ui:build

ENV NODE_ENV=production

CMD ["node","dist/index.js"]
```

### [​](https://docs.openclaw.ai/install/docker\#channel-setup-optional)  Channel setup (optional)

Use the CLI container to configure channels, then restart the gateway if needed.WhatsApp (QR):

Copy

```
docker compose run --rm openclaw-cli channels login
```

Telegram (bot token):

Copy

```
docker compose run --rm openclaw-cli channels add --channel telegram --token "<token>"
```

Discord (bot token):

Copy

```
docker compose run --rm openclaw-cli channels add --channel discord --token "<token>"
```

Docs: [WhatsApp](https://docs.openclaw.ai/channels/whatsapp), [Telegram](https://docs.openclaw.ai/channels/telegram), [Discord](https://docs.openclaw.ai/channels/discord)

### [​](https://docs.openclaw.ai/install/docker\#health-check)  Health check

Copy

```
docker compose exec openclaw-gateway node dist/index.js health --token "$OPENCLAW_GATEWAY_TOKEN"
```

### [​](https://docs.openclaw.ai/install/docker\#e2e-smoke-test-docker)  E2E smoke test (Docker)

Copy

```
scripts/e2e/onboard-docker.sh
```

### [​](https://docs.openclaw.ai/install/docker\#qr-import-smoke-test-docker)  QR import smoke test (Docker)

Copy

```
pnpm test:docker:qr
```

### [​](https://docs.openclaw.ai/install/docker\#notes)  Notes

- Gateway bind defaults to `lan` for container use.
- The gateway container is the source of truth for sessions (`~/.openclaw/agents/<agentId>/sessions/`).

## [​](https://docs.openclaw.ai/install/docker\#agent-sandbox-host-gateway-+-docker-tools)  Agent Sandbox (host gateway + Docker tools)

Deep dive: [Sandboxing](https://docs.openclaw.ai/gateway/sandboxing)

### [​](https://docs.openclaw.ai/install/docker\#what-it-does)  What it does

When `agents.defaults.sandbox` is enabled, **non-main sessions** run tools inside a Docker
container. The gateway stays on your host, but the tool execution is isolated:

- scope: `"agent"` by default (one container + workspace per agent)
- scope: `"session"` for per-session isolation
- per-scope workspace folder mounted at `/workspace`
- optional agent workspace access (`agents.defaults.sandbox.workspaceAccess`)
- allow/deny tool policy (deny wins)
- inbound media is copied into the active sandbox workspace (`media/inbound/*`) so tools can read it (with `workspaceAccess: "rw"`, this lands in the agent workspace)

Warning: `scope: "shared"` disables cross-session isolation. All sessions share
one container and one workspace.

### [​](https://docs.openclaw.ai/install/docker\#per-agent-sandbox-profiles-multi-agent)  Per-agent sandbox profiles (multi-agent)

If you use multi-agent routing, each agent can override sandbox + tool settings:
`agents.list[].sandbox` and `agents.list[].tools` (plus `agents.list[].tools.sandbox.tools`). This lets you run
mixed access levels in one gateway:

- Full access (personal agent)
- Read-only tools + read-only workspace (family/work agent)
- No filesystem/shell tools (public agent)

See [Multi-Agent Sandbox & Tools](https://docs.openclaw.ai/multi-agent-sandbox-tools) for examples,
precedence, and troubleshooting.

### [​](https://docs.openclaw.ai/install/docker\#default-behavior)  Default behavior

- Image: `openclaw-sandbox:bookworm-slim`
- One container per agent
- Agent workspace access: `workspaceAccess: "none"` (default) uses `~/.openclaw/sandboxes`
  - `"ro"` keeps the sandbox workspace at `/workspace` and mounts the agent workspace read-only at `/agent` (disables `write`/`edit`/`apply_patch`)
  - `"rw"` mounts the agent workspace read/write at `/workspace`
- Auto-prune: idle > 24h OR age > 7d
- Network: `none` by default (explicitly opt-in if you need egress)
- Default allow: `exec`, `process`, `read`, `write`, `edit`, `sessions_list`, `sessions_history`, `sessions_send`, `sessions_spawn`, `session_status`
- Default deny: `browser`, `canvas`, `nodes`, `cron`, `discord`, `gateway`

### [​](https://docs.openclaw.ai/install/docker\#enable-sandboxing)  Enable sandboxing

If you plan to install packages in `setupCommand`, note:

- Default `docker.network` is `"none"` (no egress).
- `readOnlyRoot: true` blocks package installs.
- `user` must be root for `apt-get` (omit `user` or set `user: "0:0"`).
OpenClaw auto-recreates containers when `setupCommand` (or docker config) changes
unless the container was **recently used** (within ~5 minutes). Hot containers
log a warning with the exact `openclaw sandbox recreate ...` command.

Copy

```
{
  agents: {
    defaults: {
      sandbox: {
        mode: "non-main", // off | non-main | all
        scope: "agent", // session | agent | shared (agent is default)
        workspaceAccess: "none", // none | ro | rw
        workspaceRoot: "~/.openclaw/sandboxes",
        docker: {
          image: "openclaw-sandbox:bookworm-slim",
          workdir: "/workspace",
          readOnlyRoot: true,
          tmpfs: ["/tmp", "/var/tmp", "/run"],
          network: "none",
          user: "1000:1000",
          capDrop: ["ALL"],
          env: { LANG: "C.UTF-8" },
          setupCommand: "apt-get update && apt-get install -y git curl jq",
          pidsLimit: 256,
          memory: "1g",
          memorySwap: "2g",
          cpus: 1,
          ulimits: {
            nofile: { soft: 1024, hard: 2048 },
            nproc: 256
          },
          seccompProfile: "/path/to/seccomp.json",
          apparmorProfile: "openclaw-sandbox",
          dns: ["1.1.1.1", "8.8.8.8"],
          extraHosts: ["internal.service:10.0.0.5"]
        },
        prune: {
          idleHours: 24, // 0 disables idle pruning
          maxAgeDays: 7  // 0 disables max-age pruning
        }
      }
    }
  },
  tools: {
    sandbox: {
      tools: {
        allow: ["exec", "process", "read", "write", "edit", "sessions_list", "sessions_history", "sessions_send", "sessions_spawn", "session_status"],
        deny: ["browser", "canvas", "nodes", "cron", "discord", "gateway"]
      }
    }
  }
}
```

Hardening knobs live under `agents.defaults.sandbox.docker`:
`network`, `user`, `pidsLimit`, `memory`, `memorySwap`, `cpus`, `ulimits`,
`seccompProfile`, `apparmorProfile`, `dns`, `extraHosts`.Multi-agent: override `agents.defaults.sandbox.{docker,browser,prune}.*` per agent via `agents.list[].sandbox.{docker,browser,prune}.*`
(ignored when `agents.defaults.sandbox.scope` / `agents.list[].sandbox.scope` is `"shared"`).

### [​](https://docs.openclaw.ai/install/docker\#build-the-default-sandbox-image)  Build the default sandbox image

Copy

```
scripts/sandbox-setup.sh
```

This builds `openclaw-sandbox:bookworm-slim` using `Dockerfile.sandbox`.

### [​](https://docs.openclaw.ai/install/docker\#sandbox-common-image-optional)  Sandbox common image (optional)

If you want a sandbox image with common build tooling (Node, Go, Rust, etc.), build the common image:

Copy

```
scripts/sandbox-common-setup.sh
```

This builds `openclaw-sandbox-common:bookworm-slim`. To use it:

Copy

```
{
  agents: { defaults: { sandbox: { docker: { image: "openclaw-sandbox-common:bookworm-slim" } } } }
}
```

### [​](https://docs.openclaw.ai/install/docker\#sandbox-browser-image)  Sandbox browser image

To run the browser tool inside the sandbox, build the browser image:

Copy

```
scripts/sandbox-browser-setup.sh
```

This builds `openclaw-sandbox-browser:bookworm-slim` using
`Dockerfile.sandbox-browser`. The container runs Chromium with CDP enabled and
an optional noVNC observer (headful via Xvfb).Notes:

- Headful (Xvfb) reduces bot blocking vs headless.
- Headless can still be used by setting `agents.defaults.sandbox.browser.headless=true`.
- No full desktop environment (GNOME) is needed; Xvfb provides the display.

Use config:

Copy

```
{
  agents: {
    defaults: {
      sandbox: {
        browser: { enabled: true }
      }
    }
  }
}
```

Custom browser image:

Copy

```
{
  agents: {
    defaults: {
      sandbox: { browser: { image: "my-openclaw-browser" } }
    }
  }
}
```

When enabled, the agent receives:

- a sandbox browser control URL (for the `browser` tool)
- a noVNC URL (if enabled and headless=false)

Remember: if you use an allowlist for tools, add `browser` (and remove it from
deny) or the tool remains blocked.
Prune rules (`agents.defaults.sandbox.prune`) apply to browser containers too.

### [​](https://docs.openclaw.ai/install/docker\#custom-sandbox-image)  Custom sandbox image

Build your own image and point config to it:

Copy

```
docker build -t my-openclaw-sbx -f Dockerfile.sandbox .
```

Copy

```
{
  agents: {
    defaults: {
      sandbox: { docker: { image: "my-openclaw-sbx" } }
    }
  }
}
```

### [​](https://docs.openclaw.ai/install/docker\#tool-policy-allow/deny)  Tool policy (allow/deny)

- `deny` wins over `allow`.
- If `allow` is empty: all tools (except deny) are available.
- If `allow` is non-empty: only tools in `allow` are available (minus deny).

### [​](https://docs.openclaw.ai/install/docker\#pruning-strategy)  Pruning strategy

Two knobs:

- `prune.idleHours`: remove containers not used in X hours (0 = disable)
- `prune.maxAgeDays`: remove containers older than X days (0 = disable)

Example:

- Keep busy sessions but cap lifetime:
`idleHours: 24`, `maxAgeDays: 7`
- Never prune:
`idleHours: 0`, `maxAgeDays: 0`

### [​](https://docs.openclaw.ai/install/docker\#security-notes)  Security notes

- Hard wall only applies to **tools** (exec/read/write/edit/apply\_patch).
- Host-only tools like browser/camera/canvas are blocked by default.
- Allowing `browser` in sandbox **breaks isolation** (browser runs on host).

## [​](https://docs.openclaw.ai/install/docker\#troubleshooting)  Troubleshooting

- Image missing: build with [`scripts/sandbox-setup.sh`](https://github.com/openclaw/openclaw/blob/main/scripts/sandbox-setup.sh) or set `agents.defaults.sandbox.docker.image`.
- Container not running: it will auto-create per session on demand.
- Permission errors in sandbox: set `docker.user` to a UID:GID that matches your
mounted workspace ownership (or chown the workspace folder).
- Custom tools not found: OpenClaw runs commands with `sh -lc` (login shell), which
sources `/etc/profile` and may reset PATH. Set `docker.env.PATH` to prepend your
custom tool paths (e.g., `/custom/bin:/usr/local/share/npm-global/bin`), or add
a script under `/etc/profile.d/` in your Dockerfile.

[Nix](https://docs.openclaw.ai/install/nix) [Deploy on Railway](https://docs.openclaw.ai/railway)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.