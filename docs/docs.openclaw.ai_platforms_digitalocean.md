---
url: "https://docs.openclaw.ai/platforms/digitalocean"
title: "Digitalocean - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/platforms/digitalocean#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [OpenClaw on DigitalOcean](https://docs.openclaw.ai/platforms/digitalocean#openclaw-on-digitalocean)
- [Goal](https://docs.openclaw.ai/platforms/digitalocean#goal)
- [Cost Comparison (2026)](https://docs.openclaw.ai/platforms/digitalocean#cost-comparison-2026)
- [Prerequisites](https://docs.openclaw.ai/platforms/digitalocean#prerequisites)
- [1) Create a Droplet](https://docs.openclaw.ai/platforms/digitalocean#1-create-a-droplet)
- [2) Connect via SSH](https://docs.openclaw.ai/platforms/digitalocean#2-connect-via-ssh)
- [3) Install OpenClaw](https://docs.openclaw.ai/platforms/digitalocean#3-install-openclaw)
- [4) Run Onboarding](https://docs.openclaw.ai/platforms/digitalocean#4-run-onboarding)
- [5) Verify the Gateway](https://docs.openclaw.ai/platforms/digitalocean#5-verify-the-gateway)
- [6) Access the Dashboard](https://docs.openclaw.ai/platforms/digitalocean#6-access-the-dashboard)
- [7) Connect Your Channels](https://docs.openclaw.ai/platforms/digitalocean#7-connect-your-channels)
- [Telegram](https://docs.openclaw.ai/platforms/digitalocean#telegram)
- [WhatsApp](https://docs.openclaw.ai/platforms/digitalocean#whatsapp)
- [Optimizations for 1GB RAM](https://docs.openclaw.ai/platforms/digitalocean#optimizations-for-1gb-ram)
- [Add swap (recommended)](https://docs.openclaw.ai/platforms/digitalocean#add-swap-recommended)
- [Use a lighter model](https://docs.openclaw.ai/platforms/digitalocean#use-a-lighter-model)
- [Monitor memory](https://docs.openclaw.ai/platforms/digitalocean#monitor-memory)
- [Persistence](https://docs.openclaw.ai/platforms/digitalocean#persistence)
- [Oracle Cloud Free Alternative](https://docs.openclaw.ai/platforms/digitalocean#oracle-cloud-free-alternative)
- [Troubleshooting](https://docs.openclaw.ai/platforms/digitalocean#troubleshooting)
- [Gateway won’t start](https://docs.openclaw.ai/platforms/digitalocean#gateway-won%E2%80%99t-start)
- [Port already in use](https://docs.openclaw.ai/platforms/digitalocean#port-already-in-use)
- [Out of memory](https://docs.openclaw.ai/platforms/digitalocean#out-of-memory)
- [See Also](https://docs.openclaw.ai/platforms/digitalocean#see-also)

# [​](https://docs.openclaw.ai/platforms/digitalocean\#openclaw-on-digitalocean)  OpenClaw on DigitalOcean

## [​](https://docs.openclaw.ai/platforms/digitalocean\#goal)  Goal

Run a persistent OpenClaw Gateway on DigitalOcean for \*\*6/month∗∗(or6/month\*\* (or 6/month∗∗(or4/mo with reserved pricing).If you want a $0/month option and don’t mind ARM + provider-specific setup, see the [Oracle Cloud guide](https://docs.openclaw.ai/platforms/oracle).

## [​](https://docs.openclaw.ai/platforms/digitalocean\#cost-comparison-2026)  Cost Comparison (2026)

| Provider | Plan | Specs | Price/mo | Notes |
| --- | --- | --- | --- | --- |
| Oracle Cloud | Always Free ARM | up to 4 OCPU, 24GB RAM | $0 | ARM, limited capacity / signup quirks |
| Hetzner | CX22 | 2 vCPU, 4GB RAM | €3.79 (~$4) | Cheapest paid option |
| DigitalOcean | Basic | 1 vCPU, 1GB RAM | $6 | Easy UI, good docs |
| Vultr | Cloud Compute | 1 vCPU, 1GB RAM | $6 | Many locations |
| Linode | Nanode | 1 vCPU, 1GB RAM | $5 | Now part of Akamai |

**Picking a provider:**

- DigitalOcean: simplest UX + predictable setup (this guide)
- Hetzner: good price/perf (see [Hetzner guide](https://docs.openclaw.ai/platforms/hetzner))
- Oracle Cloud: can be $0/month, but is more finicky and ARM-only (see [Oracle guide](https://docs.openclaw.ai/platforms/oracle))

* * *

## [​](https://docs.openclaw.ai/platforms/digitalocean\#prerequisites)  Prerequisites

- DigitalOcean account ( [signup with $200 free credit](https://m.do.co/c/signup))
- SSH key pair (or willingness to use password auth)
- ~20 minutes

## [​](https://docs.openclaw.ai/platforms/digitalocean\#1-create-a-droplet)  1) Create a Droplet

1. Log into [DigitalOcean](https://cloud.digitalocean.com/)
2. Click **Create → Droplets**
3. Choose:
   - **Region:** Closest to you (or your users)
   - **Image:** Ubuntu 24.04 LTS
   - **Size:** Basic → Regular → **$6/mo** (1 vCPU, 1GB RAM, 25GB SSD)
   - **Authentication:** SSH key (recommended) or password
4. Click **Create Droplet**
5. Note the IP address

## [​](https://docs.openclaw.ai/platforms/digitalocean\#2-connect-via-ssh)  2) Connect via SSH

Copy

```
ssh root@YOUR_DROPLET_IP
```

## [​](https://docs.openclaw.ai/platforms/digitalocean\#3-install-openclaw)  3) Install OpenClaw

Copy

```
# Update system
apt update && apt upgrade -y

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# Install OpenClaw
curl -fsSL https://openclaw.bot/install.sh | bash

# Verify
openclaw --version
```

## [​](https://docs.openclaw.ai/platforms/digitalocean\#4-run-onboarding)  4) Run Onboarding

Copy

```
openclaw onboard --install-daemon
```

The wizard will walk you through:

- Model auth (API keys or OAuth)
- Channel setup (Telegram, WhatsApp, Discord, etc.)
- Gateway token (auto-generated)
- Daemon installation (systemd)

## [​](https://docs.openclaw.ai/platforms/digitalocean\#5-verify-the-gateway)  5) Verify the Gateway

Copy

```
# Check status
openclaw status

# Check service
systemctl --user status openclaw-gateway.service

# View logs
journalctl --user -u openclaw-gateway.service -f
```

## [​](https://docs.openclaw.ai/platforms/digitalocean\#6-access-the-dashboard)  6) Access the Dashboard

The gateway binds to loopback by default. To access the Control UI:**Option A: SSH Tunnel (recommended)**

Copy

```
# From your local machine
ssh -L 18789:localhost:18789 root@YOUR_DROPLET_IP

# Then open: http://localhost:18789
```

**Option B: Tailscale Serve (HTTPS, loopback-only)**

Copy

```
# On the droplet
curl -fsSL https://tailscale.com/install.sh | sh
tailscale up

# Configure Gateway to use Tailscale Serve
openclaw config set gateway.tailscale.mode serve
openclaw gateway restart
```

Open: `https://<magicdns>/`Notes:

- Serve keeps the Gateway loopback-only and authenticates via Tailscale identity headers.
- To require token/password instead, set `gateway.auth.allowTailscale: false` or use `gateway.auth.mode: "password"`.

**Option C: Tailnet bind (no Serve)**

Copy

```
openclaw config set gateway.bind tailnet
openclaw gateway restart
```

Open: `http://<tailscale-ip>:18789` (token required).

## [​](https://docs.openclaw.ai/platforms/digitalocean\#7-connect-your-channels)  7) Connect Your Channels

### [​](https://docs.openclaw.ai/platforms/digitalocean\#telegram)  Telegram

Copy

```
openclaw pairing list telegram
openclaw pairing approve telegram <CODE>
```

### [​](https://docs.openclaw.ai/platforms/digitalocean\#whatsapp)  WhatsApp

Copy

```
openclaw channels login whatsapp
# Scan QR code
```

See [Channels](https://docs.openclaw.ai/channels) for other providers.

* * *

## [​](https://docs.openclaw.ai/platforms/digitalocean\#optimizations-for-1gb-ram)  Optimizations for 1GB RAM

The $6 droplet only has 1GB RAM. To keep things running smoothly:

### [​](https://docs.openclaw.ai/platforms/digitalocean\#add-swap-recommended)  Add swap (recommended)

Copy

```
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### [​](https://docs.openclaw.ai/platforms/digitalocean\#use-a-lighter-model)  Use a lighter model

If you’re hitting OOMs, consider:

- Using API-based models (Claude, GPT) instead of local models
- Setting `agents.defaults.model.primary` to a smaller model

### [​](https://docs.openclaw.ai/platforms/digitalocean\#monitor-memory)  Monitor memory

Copy

```
free -h
htop
```

* * *

## [​](https://docs.openclaw.ai/platforms/digitalocean\#persistence)  Persistence

All state lives in:

- `~/.openclaw/` — config, credentials, session data
- `~/.openclaw/workspace/` — workspace (SOUL.md, memory, etc.)

These survive reboots. Back them up periodically:

Copy

```
tar -czvf openclaw-backup.tar.gz ~/.openclaw ~/.openclaw/workspace
```

* * *

## [​](https://docs.openclaw.ai/platforms/digitalocean\#oracle-cloud-free-alternative)  Oracle Cloud Free Alternative

Oracle Cloud offers **Always Free** ARM instances that are significantly more powerful than any paid option here — for $0/month.

| What you get | Specs |
| --- | --- |
| **4 OCPUs** | ARM Ampere A1 |
| **24GB RAM** | More than enough |
| **200GB storage** | Block volume |
| **Forever free** | No credit card charges |

**Caveats:**

- Signup can be finicky (retry if it fails)
- ARM architecture — most things work, but some binaries need ARM builds

For the full setup guide, see [Oracle Cloud](https://docs.openclaw.ai/platforms/oracle). For signup tips and troubleshooting the enrollment process, see this [community guide](https://gist.github.com/rssnyder/51e3cfedd730e7dd5f4a816143b25dbd).

* * *

## [​](https://docs.openclaw.ai/platforms/digitalocean\#troubleshooting)  Troubleshooting

### [​](https://docs.openclaw.ai/platforms/digitalocean\#gateway-won%E2%80%99t-start)  Gateway won’t start

Copy

```
openclaw gateway status
openclaw doctor --non-interactive
journalctl -u openclaw --no-pager -n 50
```

### [​](https://docs.openclaw.ai/platforms/digitalocean\#port-already-in-use)  Port already in use

Copy

```
lsof -i :18789
kill <PID>
```

### [​](https://docs.openclaw.ai/platforms/digitalocean\#out-of-memory)  Out of memory

Copy

```
# Check memory
free -h

# Add more swap
# Or upgrade to $12/mo droplet (2GB RAM)
```

* * *

## [​](https://docs.openclaw.ai/platforms/digitalocean\#see-also)  See Also

- [Hetzner guide](https://docs.openclaw.ai/platforms/hetzner) — cheaper, more powerful
- [Docker install](https://docs.openclaw.ai/install/docker) — containerized setup
- [Tailscale](https://docs.openclaw.ai/gateway/tailscale) — secure remote access
- [Configuration](https://docs.openclaw.ai/gateway/configuration) — full config reference

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.