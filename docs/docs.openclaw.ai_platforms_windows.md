---
url: "https://docs.openclaw.ai/platforms/windows"
title: "Windows - OpenClaw"
---

[Skip to main content](https://docs.openclaw.ai/platforms/windows#content-area)

[OpenClaw home page![light logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)![dark logo](https://mintcdn.com/clawdhub/4rYvG-uuZrMK_URE/assets/pixel-lobster.svg?fit=max&auto=format&n=4rYvG-uuZrMK_URE&q=85&s=da2032e9eac3b5d9bfe7eb96ca6a8a26)](https://docs.openclaw.ai/)

Search...

Ctrl K

Search...

Navigation

On this page

- [Windows (WSL2)](https://docs.openclaw.ai/platforms/windows#windows-wsl2)
- [Install (WSL2)](https://docs.openclaw.ai/platforms/windows#install-wsl2)
- [Gateway](https://docs.openclaw.ai/platforms/windows#gateway)
- [Gateway service install (CLI)](https://docs.openclaw.ai/platforms/windows#gateway-service-install-cli)
- [Advanced: expose WSL services over LAN (portproxy)](https://docs.openclaw.ai/platforms/windows#advanced%3A-expose-wsl-services-over-lan-portproxy)
- [Step-by-step WSL2 install](https://docs.openclaw.ai/platforms/windows#step-by-step-wsl2-install)
- [1) Install WSL2 + Ubuntu](https://docs.openclaw.ai/platforms/windows#1-install-wsl2-%2B-ubuntu)
- [2) Enable systemd (required for gateway install)](https://docs.openclaw.ai/platforms/windows#2-enable-systemd-required-for-gateway-install)
- [3) Install OpenClaw (inside WSL)](https://docs.openclaw.ai/platforms/windows#3-install-openclaw-inside-wsl)
- [Windows companion app](https://docs.openclaw.ai/platforms/windows#windows-companion-app)

# [​](https://docs.openclaw.ai/platforms/windows\#windows-wsl2)  Windows (WSL2)

OpenClaw on Windows is recommended **via WSL2** (Ubuntu recommended). The
CLI + Gateway run inside Linux, which keeps the runtime consistent and makes
tooling far more compatible (Node/Bun/pnpm, Linux binaries, skills). Native
Windows installs are untested and more problematic.Native Windows companion apps are planned.

## [​](https://docs.openclaw.ai/platforms/windows\#install-wsl2)  Install (WSL2)

- [Getting Started](https://docs.openclaw.ai/start/getting-started) (use inside WSL)
- [Install & updates](https://docs.openclaw.ai/install/updating)
- Official WSL2 guide (Microsoft): [https://learn.microsoft.com/windows/wsl/install](https://learn.microsoft.com/windows/wsl/install)

## [​](https://docs.openclaw.ai/platforms/windows\#gateway)  Gateway

- [Gateway runbook](https://docs.openclaw.ai/gateway)
- [Configuration](https://docs.openclaw.ai/gateway/configuration)

## [​](https://docs.openclaw.ai/platforms/windows\#gateway-service-install-cli)  Gateway service install (CLI)

Inside WSL2:

Copy

```
openclaw onboard --install-daemon
```

Or:

Copy

```
openclaw gateway install
```

Or:

Copy

```
openclaw configure
```

Select **Gateway service** when prompted.Repair/migrate:

Copy

```
openclaw doctor
```

## [​](https://docs.openclaw.ai/platforms/windows\#advanced:-expose-wsl-services-over-lan-portproxy)  Advanced: expose WSL services over LAN (portproxy)

WSL has its own virtual network. If another machine needs to reach a service
running **inside WSL** (SSH, a local TTS server, or the Gateway), you must
forward a Windows port to the current WSL IP. The WSL IP changes after restarts,
so you may need to refresh the forwarding rule.Example (PowerShell **as Administrator**):

Copy

```
$Distro = "Ubuntu-24.04"
$ListenPort = 2222
$TargetPort = 22

$WslIp = (wsl -d $Distro -- hostname -I).Trim().Split(" ")[0]
if (-not $WslIp) { throw "WSL IP not found." }

netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=$ListenPort `
  connectaddress=$WslIp connectport=$TargetPort
```

Allow the port through Windows Firewall (one-time):

Copy

```
New-NetFirewallRule -DisplayName "WSL SSH $ListenPort" -Direction Inbound `
  -Protocol TCP -LocalPort $ListenPort -Action Allow
```

Refresh the portproxy after WSL restarts:

Copy

```
netsh interface portproxy delete v4tov4 listenport=$ListenPort listenaddress=0.0.0.0 | Out-Null
netsh interface portproxy add v4tov4 listenport=$ListenPort listenaddress=0.0.0.0 `
  connectaddress=$WslIp connectport=$TargetPort | Out-Null
```

Notes:

- SSH from another machine targets the **Windows host IP** (example: `ssh user@windows-host -p 2222`).
- Remote nodes must point at a **reachable** Gateway URL (not `127.0.0.1`); use
`openclaw status --all` to confirm.
- Use `listenaddress=0.0.0.0` for LAN access; `127.0.0.1` keeps it local only.
- If you want this automatic, register a Scheduled Task to run the refresh
step at login.

## [​](https://docs.openclaw.ai/platforms/windows\#step-by-step-wsl2-install)  Step-by-step WSL2 install

### [​](https://docs.openclaw.ai/platforms/windows\#1-install-wsl2-+-ubuntu)  1) Install WSL2 + Ubuntu

Open PowerShell (Admin):

Copy

```
wsl --install
# Or pick a distro explicitly:
wsl --list --online
wsl --install -d Ubuntu-24.04
```

Reboot if Windows asks.

### [​](https://docs.openclaw.ai/platforms/windows\#2-enable-systemd-required-for-gateway-install)  2) Enable systemd (required for gateway install)

In your WSL terminal:

Copy

```
sudo tee /etc/wsl.conf >/dev/null <<'EOF'
[boot]
systemd=true
EOF
```

Then from PowerShell:

Copy

```
wsl --shutdown
```

Re-open Ubuntu, then verify:

Copy

```
systemctl --user status
```

### [​](https://docs.openclaw.ai/platforms/windows\#3-install-openclaw-inside-wsl)  3) Install OpenClaw (inside WSL)

Follow the Linux Getting Started flow inside WSL:

Copy

```
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
pnpm ui:build # auto-installs UI deps on first run
pnpm build
openclaw onboard
```

Full guide: [Getting Started](https://docs.openclaw.ai/start/getting-started)

## [​](https://docs.openclaw.ai/platforms/windows\#windows-companion-app)  Windows companion app

We do not have a Windows companion app yet. Contributions are welcome if you want
contributions to make it happen.

[Android](https://docs.openclaw.ai/platforms/android) [Linux](https://docs.openclaw.ai/platforms/linux)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.