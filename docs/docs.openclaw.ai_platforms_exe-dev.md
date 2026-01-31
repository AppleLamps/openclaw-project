---
url: "https://docs.openclaw.ai/platforms/exe-dev"
title: "Exe dev - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/platforms/exe-dev#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [exe.dev](https://docs.openclaw.ai/platforms/exe-dev#exe-dev)
- [Beginner quick path](https://docs.openclaw.ai/platforms/exe-dev#beginner-quick-path)
- [What you need](https://docs.openclaw.ai/platforms/exe-dev#what-you-need)
- [Automated Install with Shelley](https://docs.openclaw.ai/platforms/exe-dev#automated-install-with-shelley)
- [Manual installation](https://docs.openclaw.ai/platforms/exe-dev#manual-installation)
- [1) Create the VM](https://docs.openclaw.ai/platforms/exe-dev#1-create-the-vm)
- [2) Install prerequisites (on the VM)](https://docs.openclaw.ai/platforms/exe-dev#2-install-prerequisites-on-the-vm)
- [3) Install OpenClaw](https://docs.openclaw.ai/platforms/exe-dev#3-install-openclaw)
- [4) Setup nginx to proxy OpenClaw to port 8000](https://docs.openclaw.ai/platforms/exe-dev#4-setup-nginx-to-proxy-openclaw-to-port-8000)
- [5) Access OpenClaw and grant privileges](https://docs.openclaw.ai/platforms/exe-dev#5-access-openclaw-and-grant-privileges)
- [Remote Access](https://docs.openclaw.ai/platforms/exe-dev#remote-access)
- [Updating](https://docs.openclaw.ai/platforms/exe-dev#updating)

# [​](https://docs.openclaw.ai/platforms/exe-dev\#exe-dev)  exe.dev

Goal: OpenClaw Gateway running on an exe.dev VM, reachable from your laptop via: `https://<vm-name>.exe.xyz`This page assumes exe.dev’s default **exeuntu** image. If you picked a different distro, map packages accordingly.

## [​](https://docs.openclaw.ai/platforms/exe-dev\#beginner-quick-path)  Beginner quick path

1. [https://exe.new/openclaw](https://exe.new/openclaw)
2. Fill in your auth key/token as needed
3. Click on “Agent” next to your VM, and wait…
4. ???
5. Profit

## [​](https://docs.openclaw.ai/platforms/exe-dev\#what-you-need)  What you need

- exe.dev account
- `ssh exe.dev` access to [exe.dev](https://exe.dev/) virtual machines (optional)

## [​](https://docs.openclaw.ai/platforms/exe-dev\#automated-install-with-shelley)  Automated Install with Shelley

Shelley, [exe.dev](https://exe.dev/)’s agent, can install OpenClaw instantly with our
prompt. The prompt used is as below:

Copy

```
Set up OpenClaw (https://docs.openclaw.ai/install) on this VM. Use the non-interactive and accept-risk flags for openclaw onboarding. Add the supplied auth or token as needed. Configure nginx to forward from the default port 18789 to the root location on the default enabled site config, making sure to enable Websocket support. Pairing is done by "openclaw devices list" and "openclaw device approve <request id>". Make sure the dashboard shows that OpenClaw's health is OK. exe.dev handles forwarding from port 8000 to port 80/443 and HTTPS for us, so the final "reachable" should be <vm-name>.exe.xyz, without port specification.
```

## [​](https://docs.openclaw.ai/platforms/exe-dev\#manual-installation)  Manual installation

## [​](https://docs.openclaw.ai/platforms/exe-dev\#1-create-the-vm)  1) Create the VM

From your device:

Copy

```
ssh exe.dev new
```

Then connect:

Copy

```
ssh <vm-name>.exe.xyz
```

Tip: keep this VM **stateful**. OpenClaw stores state under `~/.openclaw/` and `~/.openclaw/workspace/`.

## [​](https://docs.openclaw.ai/platforms/exe-dev\#2-install-prerequisites-on-the-vm)  2) Install prerequisites (on the VM)

Copy

```
sudo apt-get update
sudo apt-get install -y git curl jq ca-certificates openssl
```

## [​](https://docs.openclaw.ai/platforms/exe-dev\#3-install-openclaw)  3) Install OpenClaw

Run the OpenClaw install script:

Copy

```
curl -fsSL https://openclaw.bot/install.sh | bash
```

## [​](https://docs.openclaw.ai/platforms/exe-dev\#4-setup-nginx-to-proxy-openclaw-to-port-8000)  4) Setup nginx to proxy OpenClaw to port 8000

Edit `/etc/nginx/sites-enabled/default` with

Copy

```
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    listen 8000;
    listen [::]:8000;

    server_name _;

    location / {
        proxy_pass http://127.0.0.1:18789;
        proxy_http_version 1.1;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeout settings for long-lived connections
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}
```

## [​](https://docs.openclaw.ai/platforms/exe-dev\#5-access-openclaw-and-grant-privileges)  5) Access OpenClaw and grant privileges

Access `https://<vm-name>.exe.xyz/?token=YOUR-TOKEN-FROM-TERMINAL`. Approve
devices with `openclaw devices list` and `openclaw device approve`. When in doubt,
use Shelley from your browser!

## [​](https://docs.openclaw.ai/platforms/exe-dev\#remote-access)  Remote Access

Remote access is handled by [exe.dev](https://exe.dev/)’s authentication. By
default, HTTP traffic from port 8000 is forwarded to `https://<vm-name>.exe.xyz`
with email auth.

## [​](https://docs.openclaw.ai/platforms/exe-dev\#updating)  Updating

Copy

```
npm i -g openclaw@latest
openclaw doctor
openclaw gateway restart
openclaw health
```

Guide: [Updating](https://docs.openclaw.ai/install/updating)

[Gcp](https://docs.openclaw.ai/platforms/gcp) [Dev setup](https://docs.openclaw.ai/platforms/mac/dev-setup)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.