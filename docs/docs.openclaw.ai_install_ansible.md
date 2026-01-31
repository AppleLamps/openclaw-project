---
url: "https://docs.openclaw.ai/install/ansible"
title: "Ansible - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/install/ansible#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Ansible Installation](https://docs.openclaw.ai/install/ansible#ansible-installation)
- [Quick Start](https://docs.openclaw.ai/install/ansible#quick-start)
- [What You Get](https://docs.openclaw.ai/install/ansible#what-you-get)
- [Requirements](https://docs.openclaw.ai/install/ansible#requirements)
- [What Gets Installed](https://docs.openclaw.ai/install/ansible#what-gets-installed)
- [Post-Install Setup](https://docs.openclaw.ai/install/ansible#post-install-setup)
- [Quick commands](https://docs.openclaw.ai/install/ansible#quick-commands)
- [Security Architecture](https://docs.openclaw.ai/install/ansible#security-architecture)
- [4-Layer Defense](https://docs.openclaw.ai/install/ansible#4-layer-defense)
- [Verification](https://docs.openclaw.ai/install/ansible#verification)
- [Docker Availability](https://docs.openclaw.ai/install/ansible#docker-availability)
- [Manual Installation](https://docs.openclaw.ai/install/ansible#manual-installation)
- [Updating OpenClaw](https://docs.openclaw.ai/install/ansible#updating-openclaw)
- [Troubleshooting](https://docs.openclaw.ai/install/ansible#troubleshooting)
- [Firewall blocks my connection](https://docs.openclaw.ai/install/ansible#firewall-blocks-my-connection)
- [Service won’t start](https://docs.openclaw.ai/install/ansible#service-won%E2%80%99t-start)
- [Docker sandbox issues](https://docs.openclaw.ai/install/ansible#docker-sandbox-issues)
- [Provider login fails](https://docs.openclaw.ai/install/ansible#provider-login-fails)
- [Advanced Configuration](https://docs.openclaw.ai/install/ansible#advanced-configuration)
- [Related](https://docs.openclaw.ai/install/ansible#related)

# [​](https://docs.openclaw.ai/install/ansible\#ansible-installation)  Ansible Installation

The recommended way to deploy OpenClaw to production servers is via **[openclaw-ansible](https://github.com/openclaw/openclaw-ansible)** — an automated installer with security-first architecture.

## [​](https://docs.openclaw.ai/install/ansible\#quick-start)  Quick Start

One-command install:

Copy

```
curl -fsSL https://raw.githubusercontent.com/openclaw/openclaw-ansible/main/install.sh | bash
```

> **📦 Full guide: [github.com/openclaw/openclaw-ansible](https://github.com/openclaw/openclaw-ansible)**The openclaw-ansible repo is the source of truth for Ansible deployment. This page is a quick overview.

## [​](https://docs.openclaw.ai/install/ansible\#what-you-get)  What You Get

- 🔒 **Firewall-first security**: UFW + Docker isolation (only SSH + Tailscale accessible)
- 🔐 **Tailscale VPN**: Secure remote access without exposing services publicly
- 🐳 **Docker**: Isolated sandbox containers, localhost-only bindings
- 🛡️ **Defense in depth**: 4-layer security architecture
- 🚀 **One-command setup**: Complete deployment in minutes
- 🔧 **Systemd integration**: Auto-start on boot with hardening

## [​](https://docs.openclaw.ai/install/ansible\#requirements)  Requirements

- **OS**: Debian 11+ or Ubuntu 20.04+
- **Access**: Root or sudo privileges
- **Network**: Internet connection for package installation
- **Ansible**: 2.14+ (installed automatically by quick-start script)

## [​](https://docs.openclaw.ai/install/ansible\#what-gets-installed)  What Gets Installed

The Ansible playbook installs and configures:

1. **Tailscale** (mesh VPN for secure remote access)
2. **UFW firewall** (SSH + Tailscale ports only)
3. **Docker CE + Compose V2** (for agent sandboxes)
4. **Node.js 22.x + pnpm** (runtime dependencies)
5. **OpenClaw** (host-based, not containerized)
6. **Systemd service** (auto-start with security hardening)

Note: The gateway runs **directly on the host** (not in Docker), but agent sandboxes use Docker for isolation. See [Sandboxing](https://docs.openclaw.ai/gateway/sandboxing) for details.

## [​](https://docs.openclaw.ai/install/ansible\#post-install-setup)  Post-Install Setup

After installation completes, switch to the openclaw user:

Copy

```
sudo -i -u openclaw
```

The post-install script will guide you through:

1. **Onboarding wizard**: Configure OpenClaw settings
2. **Provider login**: Connect WhatsApp/Telegram/Discord/Signal
3. **Gateway testing**: Verify the installation
4. **Tailscale setup**: Connect to your VPN mesh

### [​](https://docs.openclaw.ai/install/ansible\#quick-commands)  Quick commands

Copy

```
# Check service status
sudo systemctl status openclaw

# View live logs
sudo journalctl -u openclaw -f

# Restart gateway
sudo systemctl restart openclaw

# Provider login (run as openclaw user)
sudo -i -u openclaw
openclaw channels login
```

## [​](https://docs.openclaw.ai/install/ansible\#security-architecture)  Security Architecture

### [​](https://docs.openclaw.ai/install/ansible\#4-layer-defense)  4-Layer Defense

1. **Firewall (UFW)**: Only SSH (22) + Tailscale (41641/udp) exposed publicly
2. **VPN (Tailscale)**: Gateway accessible only via VPN mesh
3. **Docker Isolation**: DOCKER-USER iptables chain prevents external port exposure
4. **Systemd Hardening**: NoNewPrivileges, PrivateTmp, unprivileged user

### [​](https://docs.openclaw.ai/install/ansible\#verification)  Verification

Test external attack surface:

Copy

```
nmap -p- YOUR_SERVER_IP
```

Should show **only port 22** (SSH) open. All other services (gateway, Docker) are locked down.

### [​](https://docs.openclaw.ai/install/ansible\#docker-availability)  Docker Availability

Docker is installed for **agent sandboxes** (isolated tool execution), not for running the gateway itself. The gateway binds to localhost only and is accessible via Tailscale VPN.See [Multi-Agent Sandbox & Tools](https://docs.openclaw.ai/multi-agent-sandbox-tools) for sandbox configuration.

## [​](https://docs.openclaw.ai/install/ansible\#manual-installation)  Manual Installation

If you prefer manual control over the automation:

Copy

```
# 1. Install prerequisites
sudo apt update && sudo apt install -y ansible git

# 2. Clone repository
git clone https://github.com/openclaw/openclaw-ansible.git
cd openclaw-ansible

# 3. Install Ansible collections
ansible-galaxy collection install -r requirements.yml

# 4. Run playbook
./run-playbook.sh

# Or run directly (then manually execute /tmp/openclaw-setup.sh after)
# ansible-playbook playbook.yml --ask-become-pass
```

## [​](https://docs.openclaw.ai/install/ansible\#updating-openclaw)  Updating OpenClaw

The Ansible installer sets up OpenClaw for manual updates. See [Updating](https://docs.openclaw.ai/install/updating) for the standard update flow.To re-run the Ansible playbook (e.g., for configuration changes):

Copy

```
cd openclaw-ansible
./run-playbook.sh
```

Note: This is idempotent and safe to run multiple times.

## [​](https://docs.openclaw.ai/install/ansible\#troubleshooting)  Troubleshooting

### [​](https://docs.openclaw.ai/install/ansible\#firewall-blocks-my-connection)  Firewall blocks my connection

If you’re locked out:

- Ensure you can access via Tailscale VPN first
- SSH access (port 22) is always allowed
- The gateway is **only** accessible via Tailscale by design

### [​](https://docs.openclaw.ai/install/ansible\#service-won%E2%80%99t-start)  Service won’t start

Copy

```
# Check logs
sudo journalctl -u openclaw -n 100

# Verify permissions
sudo ls -la /opt/openclaw

# Test manual start
sudo -i -u openclaw
cd ~/openclaw
pnpm start
```

### [​](https://docs.openclaw.ai/install/ansible\#docker-sandbox-issues)  Docker sandbox issues

Copy

```
# Verify Docker is running
sudo systemctl status docker

# Check sandbox image
sudo docker images | grep openclaw-sandbox

# Build sandbox image if missing
cd /opt/openclaw/openclaw
sudo -u openclaw ./scripts/sandbox-setup.sh
```

### [​](https://docs.openclaw.ai/install/ansible\#provider-login-fails)  Provider login fails

Make sure you’re running as the `openclaw` user:

Copy

```
sudo -i -u openclaw
openclaw channels login
```

## [​](https://docs.openclaw.ai/install/ansible\#advanced-configuration)  Advanced Configuration

For detailed security architecture and troubleshooting:

- [Security Architecture](https://github.com/openclaw/openclaw-ansible/blob/main/docs/security.md)
- [Technical Details](https://github.com/openclaw/openclaw-ansible/blob/main/docs/architecture.md)
- [Troubleshooting Guide](https://github.com/openclaw/openclaw-ansible/blob/main/docs/troubleshooting.md)

## [​](https://docs.openclaw.ai/install/ansible\#related)  Related

- [openclaw-ansible](https://github.com/openclaw/openclaw-ansible) — full deployment guide
- [Docker](https://docs.openclaw.ai/install/docker) — containerized gateway setup
- [Sandboxing](https://docs.openclaw.ai/gateway/sandboxing) — agent sandbox configuration
- [Multi-Agent Sandbox & Tools](https://docs.openclaw.ai/multi-agent-sandbox-tools) — per-agent isolation

[Uninstall](https://docs.openclaw.ai/install/uninstall) [Nix](https://docs.openclaw.ai/install/nix)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.