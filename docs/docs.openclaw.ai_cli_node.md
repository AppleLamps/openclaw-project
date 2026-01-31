---
url: "https://docs.openclaw.ai/cli/node"
title: "Node - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/cli/node#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [openclaw node](https://docs.openclaw.ai/cli/node#openclaw-node)
- [Why use a node host?](https://docs.openclaw.ai/cli/node#why-use-a-node-host)
- [Browser proxy (zero-config)](https://docs.openclaw.ai/cli/node#browser-proxy-zero-config)
- [Run (foreground)](https://docs.openclaw.ai/cli/node#run-foreground)
- [Service (background)](https://docs.openclaw.ai/cli/node#service-background)
- [Pairing](https://docs.openclaw.ai/cli/node#pairing)
- [Exec approvals](https://docs.openclaw.ai/cli/node#exec-approvals)

# [​](https://docs.openclaw.ai/cli/node\#openclaw-node)  `openclaw node`

Run a **headless node host** that connects to the Gateway WebSocket and exposes
`system.run` / `system.which` on this machine.

## [​](https://docs.openclaw.ai/cli/node\#why-use-a-node-host)  Why use a node host?

Use a node host when you want agents to **run commands on other machines** in your
network without installing a full macOS companion app there.Common use cases:

- Run commands on remote Linux/Windows boxes (build servers, lab machines, NAS).
- Keep exec **sandboxed** on the gateway, but delegate approved runs to other hosts.
- Provide a lightweight, headless execution target for automation or CI nodes.

Execution is still guarded by **exec approvals** and per‑agent allowlists on the
node host, so you can keep command access scoped and explicit.

## [​](https://docs.openclaw.ai/cli/node\#browser-proxy-zero-config)  Browser proxy (zero-config)

Node hosts automatically advertise a browser proxy if `browser.enabled` is not
disabled on the node. This lets the agent use browser automation on that node
without extra configuration.Disable it on the node if needed:

Copy

```
{
  nodeHost: {
    browserProxy: {
      enabled: false
    }
  }
}
```

## [​](https://docs.openclaw.ai/cli/node\#run-foreground)  Run (foreground)

Copy

```
openclaw node run --host <gateway-host> --port 18789
```

Options:

- `--host <host>`: Gateway WebSocket host (default: `127.0.0.1`)
- `--port <port>`: Gateway WebSocket port (default: `18789`)
- `--tls`: Use TLS for the gateway connection
- `--tls-fingerprint <sha256>`: Expected TLS certificate fingerprint (sha256)
- `--node-id <id>`: Override node id (clears pairing token)
- `--display-name <name>`: Override the node display name

## [​](https://docs.openclaw.ai/cli/node\#service-background)  Service (background)

Install a headless node host as a user service.

Copy

```
openclaw node install --host <gateway-host> --port 18789
```

Options:

- `--host <host>`: Gateway WebSocket host (default: `127.0.0.1`)
- `--port <port>`: Gateway WebSocket port (default: `18789`)
- `--tls`: Use TLS for the gateway connection
- `--tls-fingerprint <sha256>`: Expected TLS certificate fingerprint (sha256)
- `--node-id <id>`: Override node id (clears pairing token)
- `--display-name <name>`: Override the node display name
- `--runtime <runtime>`: Service runtime (`node` or `bun`)
- `--force`: Reinstall/overwrite if already installed

Manage the service:

Copy

```
openclaw node status
openclaw node stop
openclaw node restart
openclaw node uninstall
```

Use `openclaw node run` for a foreground node host (no service).Service commands accept `--json` for machine-readable output.

## [​](https://docs.openclaw.ai/cli/node\#pairing)  Pairing

The first connection creates a pending node pair request on the Gateway.
Approve it via:

Copy

```
openclaw nodes pending
openclaw nodes approve <requestId>
```

The node host stores its node id, token, display name, and gateway connection info in
`~/.openclaw/node.json`.

## [​](https://docs.openclaw.ai/cli/node\#exec-approvals)  Exec approvals

`system.run` is gated by local exec approvals:

- `~/.openclaw/exec-approvals.json`
- [Exec approvals](https://docs.openclaw.ai/tools/exec-approvals)
- `openclaw approvals --node <id|name|ip>` (edit from the Gateway)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.